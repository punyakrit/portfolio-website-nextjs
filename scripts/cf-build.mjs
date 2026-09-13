#!/usr/bin/env node
/**
 * Builds the Worker with @opennextjs/cloudflare WITHOUT baking secrets into the
 * shipped bundle.
 *
 * The problem this solves
 * ----------------------
 * OpenNext's `compileEnvFiles` reads the .env FILES off disk
 * (.env, .env.<mode>, .env.local, .env.<mode>.local) and writes every key it
 * finds into `.open-next/cloudflare/next-env.mjs`, which is then bundled into
 * the Worker and uploaded. DATABASE_URL, UPSTASH_REDIS_REST_TOKEN and
 * NOTION_API_KEY would all ship inside the deployed script. It never reads
 * `process.env`, so anything passed through the shell is NOT snapshotted.
 *
 * But the build genuinely needs those values: NEXT_PUBLIC_* are inlined into the
 * client bundle at build time, and any page that fetches during prerender bakes
 * whatever it got - including an error state - as static output. So it is not
 * enough to simply remove the file; the values have to still be present, just by
 * a route that isn't snapshotted.
 *
 * What it does
 * ------------
 * 1. Parse the .env files with the same parser OpenNext uses, so semantics match
 *    exactly (quoting, escapes, multiline).
 * 2. Merge them into process.env WITHOUT overriding anything the real shell or
 *    CI already set - CI sets secrets directly and must win.
 * 3. Move the .env files aside for the duration of the build, so the snapshot
 *    finds nothing and emits `{}`.
 * 4. Run the build with the values inherited through the environment.
 * 5. Restore the files, whatever happens - including Ctrl-C and crashes.
 *
 * In CI there are no .env files at all, so steps 1/3/5 are no-ops and the
 * secrets arrive from the shell only. Same code path, nothing special-cased.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { parse } from "@dotenvx/dotenvx";

const root = process.cwd();
const MODE = "production";

// Same precedence order OpenNext/Next apply: later entries win.
const ENV_FILES = [".env", `.env.${MODE}`, ".env.local", `.env.${MODE}.local`];

const stash = fs.mkdtempSync(path.join(os.tmpdir(), "cf-build-env-"));
const moved = [];

function restore() {
  for (const { from, to } of moved) {
    try {
      if (fs.existsSync(from)) fs.renameSync(from, to);
    } catch (err) {
      console.error(`\n!! Could not restore ${to} from ${from}: ${err.message}`);
      console.error("!! Restore it by hand before running anything else.\n");
    }
  }
  moved.length = 0;
  try {
    fs.rmSync(stash, { recursive: true, force: true });
  } catch {
    /* best effort */
  }
}

// Restore on every exit path, not just the happy one.
process.on("exit", restore);
for (const sig of ["SIGINT", "SIGTERM", "SIGHUP"]) {
  process.on(sig, () => {
    restore();
    process.exit(1);
  });
}
process.on("uncaughtException", (err) => {
  restore();
  console.error(err);
  process.exit(1);
});

// 1 + 2. Load file values into the environment, letting the real shell win.
const fromFiles = {};
for (const name of ENV_FILES) {
  const p = path.join(root, name);
  if (!fs.existsSync(p) || !fs.statSync(p).isFile()) continue;
  Object.assign(fromFiles, parse(fs.readFileSync(p, "utf-8")));
}

const injected = [];
for (const [key, value] of Object.entries(fromFiles)) {
  if (process.env[key] === undefined) {
    process.env[key] = value;
    injected.push(key);
  }
}

// 3. Hide the files so compileEnvFiles has nothing to snapshot.
for (const name of ENV_FILES) {
  const from = path.join(root, name);
  if (!fs.existsSync(from)) continue;
  const to = path.join(stash, name);
  fs.renameSync(from, to);
  moved.push({ from: to, to: from });
}

console.log(
  `cf-build: ${moved.length} env file(s) hidden from the bundle; ` +
    `${injected.length} value(s) passed through the shell instead` +
    (injected.length ? ` (${injected.join(", ")})` : "")
);

// 4. Build. `opennextjs-cloudflare build` runs `next build` itself.
const args = process.argv.slice(2);
const res = spawnSync(
  "npx",
  ["opennextjs-cloudflare", "build", ...args],
  { stdio: "inherit", env: process.env, cwd: root }
);

restore();

if (res.error) {
  console.error(res.error);
  process.exit(1);
}
process.exit(res.status ?? 1);
