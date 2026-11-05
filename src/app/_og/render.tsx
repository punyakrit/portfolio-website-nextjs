import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";
import { MAP, MAP_GRID, mapPosition } from "@/lib/startupMap";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

// The card is the first screen of the site: the name, one line, and the dot
// map of where the startups on RemJobs are, with the one orange dot for him.
// Navy and orange come from the RemJobs mark; the dot colours are the dark
// theme's --map-0 to --map-5.
const NAVY = "#10131A";
const PAPER = "#EEF1F4";
const MUTED = "#97A4B2";
const SIGNAL = "#FF6A1F";
const DOTS = ["#27313e", "#43515f", "#647484", "#8796a5", "#b6c1cc", "#f0f3f6"];
const RADIUS = [0.15, 0.2, 0.25, 0.31, 0.38, 0.45];

// Cached across renders in a single build.
let fontCache: { name: string; regular: Buffer; semibold: Buffer } | null = null;
let mapCache: string | null = null;

async function readLocal(file: string) {
  // Build-time only. process.cwd() and the src/ tree exist while Next
  // prerenders; inside a Worker neither does. Every caller is prerendered, so
  // this is never reached at runtime. If that ever changes, the error below
  // names the real cause instead of surfacing a bare ENOENT from deep in satori.
  const dir = path.join(process.cwd(), "src/app/_og");
  try {
    return await fs.readFile(path.join(dir, file));
  } catch (cause) {
    throw new Error(
      "OG fonts could not be read from " +
        dir +
        ". This read only works at build time - there is no filesystem inside a " +
        "Worker. Reaching it at runtime means an opengraph-image route is being " +
        "rendered on demand instead of being prerendered; check dynamicParams " +
        "and generateStaticParams on that route.",
      { cause }
    );
  }
}

// Archivo, the site's headline face, fetched from Google Fonts at build time
// the same way next/font does. Satori wants a static TTF, so the width axis is
// pinned to the value .font-display uses. If the network is not there, the
// card falls back to the Newsreader files checked in beside this file.
async function fetchGoogleTtf(family: string, axes: string, timeoutMs = 8000) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}:${axes}&display=swap`,
    {
      headers: {
        // An old WebKit UA makes the CSS API return TTF instead of woff2.
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.59.10 (KHTML, like Gecko) Version/5.1.9 Safari/534.59.10",
      },
      signal: AbortSignal.timeout(timeoutMs),
    }
  ).then((r) => (r.ok ? r.text() : Promise.reject(new Error(String(r.status)))));
  // The API answers with one @font-face per width it has an instance for;
  // the one asked for comes last. woff is fine for satori, woff2 is not.
  const urls = [...css.matchAll(/src:\s*url\(([^)]+\.(?:ttf|otf|woff))\)/g)].map((m) => m[1]);
  const url = urls[urls.length - 1];
  if (!url) throw new Error("no usable font source in Google Fonts CSS");
  const buf = await fetch(url, { signal: AbortSignal.timeout(timeoutMs) }).then((r) =>
    r.ok ? r.arrayBuffer() : Promise.reject(new Error(String(r.status)))
  );
  return Buffer.from(buf);
}

async function loadFonts() {
  if (fontCache) return fontCache;
  try {
    const [regular, semibold] = await Promise.all([
      fetchGoogleTtf("Archivo", "wdth,wght@100,400"),
      fetchGoogleTtf("Archivo", "wdth,wght@112,600"),
    ]);
    fontCache = { name: "Archivo", regular, semibold };
  } catch {
    const [regular, semibold] = await Promise.all([
      readLocal("Newsreader-400.ttf"),
      readLocal("Newsreader-600.ttf"),
    ]);
    fontCache = { name: "Newsreader", regular, semibold };
  }
  return fontCache;
}

// The dot map as one SVG, embedded as an image. Satori lays out a few
// thousand <div>s slowly; resvg draws a few thousand circles in no time.
function mapSvg(width: number) {
  if (mapCache) return mapCache;
  const cell = width / MAP.cols;
  const height = cell * MAP.rows;
  let circles = "";
  for (let r = 0; r < MAP.rows; r++) {
    const row = MAP_GRID[r];
    for (let c = 0; c < MAP.cols; c++) {
      const ch = row.charCodeAt(c) - 48;
      if (ch < 0 || ch > 5) continue;
      circles += `<circle cx="${((c + 0.5) * cell).toFixed(1)}" cy="${(
        (r + 0.5) *
        cell
      ).toFixed(1)}" r="${(RADIUS[ch] * cell).toFixed(2)}" fill="${DOTS[ch]}"/>`;
    }
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height.toFixed(
    1
  )}" viewBox="0 0 ${width} ${height.toFixed(1)}">${circles}</svg>`;
  mapCache = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
  return mapCache;
}

export async function renderOgImage({
  title,
  line,
  meta,
}: {
  title: string;
  line: string;
  meta: string;
}) {
  const { name, regular, semibold } = await loadFonts();

  const mapWidth = OG_SIZE.width;
  const mapHeight = (mapWidth / MAP.cols) * MAP.rows;
  // The map sits under the text and runs off the bottom; what is lost is
  // the far south, below Buenos Aires and Cape Town.
  const mapTop = 198;
  const me = mapPosition(12.97, 77.59);
  const meX = (parseFloat(me.left) / 100) * mapWidth;
  const meY = mapTop + (parseFloat(me.top) / 100) * mapHeight;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: NAVY,
          color: PAPER,
          fontFamily: name,
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mapSvg(mapWidth)}
          width={mapWidth}
          height={mapHeight}
          alt=""
          style={{ position: "absolute", left: 0, top: mapTop }}
        />

        <div
          style={{
            position: "absolute",
            left: meX - 8,
            top: meY - 8,
            width: 16,
            height: 16,
            borderRadius: 999,
            background: SIGNAL,
            border: `3px solid ${NAVY}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: meX + 14,
            top: meY - 13,
            fontSize: 20,
            fontWeight: 600,
            color: PAPER,
            textShadow: `0 0 6px ${NAVY}, 0 0 3px ${NAVY}`,
          }}
        >
          Me, on IST
        </div>

        <div
          style={{
            position: "absolute",
            left: 60,
            top: 52,
            right: 60,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: title.length > 24 ? 60 : 70,
                fontWeight: 600,
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 16,
                fontSize: 26,
                lineHeight: 1.3,
                color: MUTED,
                maxWidth: 820,
              }}
            >
              {line}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginTop: 8,
              marginLeft: 40,
              flexShrink: 0,
              whiteSpace: "nowrap",
              fontSize: 22,
              color: MUTED,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: SIGNAL,
              }}
            />
            {meta}
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name, data: regular, weight: 400, style: "normal" },
        { name, data: semibold, weight: 600, style: "normal" },
      ],
    }
  );
}
