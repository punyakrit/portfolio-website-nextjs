#!/usr/bin/env node
/**
 * Fills UserLog.latitude/longitude for rows that have none, by looking up the
 * stored IP with geoip-lite.
 *
 * New visits get coordinates from Cloudflare's request.cf when they are written
 * (src/lib/request-geo.ts). Everything recorded before those columns existed
 * only has an IP, and the Worker cannot geolocate it: geoip-lite reads 153 MB
 * of .dat files off disk. So the lookup happens here, once, under Node.
 *
 * Uses `pg` directly because the generated Prisma client targets workerd and
 * imports .wasm?module, which Node cannot load.
 *
 *   node --env-file=.env scripts/backfill-geo.mjs           # dry run
 *   node --env-file=.env scripts/backfill-geo.mjs --write   # save
 *
 * Safe to re-run: it only touches rows whose coordinates are still null.
 */
import geoip from "geoip-lite";
import pg from "pg";

const write = process.argv.includes("--write");

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL is not set. Run with: node --env-file=.env scripts/backfill-geo.mjs");
  process.exit(1);
}

const client = new pg.Client({ connectionString });
await client.connect();

try {
  const { rows } = await client.query(
    'SELECT id, ip FROM "UserLog" WHERE latitude IS NULL OR longitude IS NULL'
  );

  const ids = [];
  const latitudes = [];
  const longitudes = [];

  for (const row of rows) {
    // x-forwarded-for can hold a proxy chain; the client is the first entry.
    const ip = row.ip.split(",")[0].trim();
    const ll = geoip.lookup(ip)?.ll;
    if (!ll || (ll[0] === 0 && ll[1] === 0)) continue;

    ids.push(row.id);
    latitudes.push(ll[0]);
    longitudes.push(ll[1]);
  }

  console.log(
    `${rows.length} row(s) without coordinates, ${ids.length} resolvable by geoip-lite.`
  );

  if (!write) {
    console.log("Dry run - nothing written. Pass --write to save.");
  } else if (ids.length > 0) {
    // One statement for the whole batch rather than a round trip per row.
    const { rowCount } = await client.query(
      `UPDATE "UserLog" AS u
          SET latitude = v.latitude, longitude = v.longitude
         FROM unnest($1::text[], $2::float8[], $3::float8[]) AS v(id, latitude, longitude)
        WHERE u.id = v.id`,
      [ids, latitudes, longitudes]
    );
    console.log(`Updated ${rowCount} row(s).`);
  }
} finally {
  await client.end();
}
