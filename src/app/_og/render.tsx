import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

// Cached across renders in a single build.
let fontCache: { regular: Buffer; semibold: Buffer } | null = null;

async function loadFonts() {
  if (fontCache) return fontCache;

  // Deliberately inside the function, not at module scope. A top-level
  // `await readFile(...)` here would throw during *module evaluation*, which
  // takes down every route whose module graph reaches this file - while the OG
  // route that owns it keeps working, because it is served as a prerendered
  // asset. The failure would point at the wrong pages entirely.
  //
  // This path is build-time only. process.cwd() and the src/ tree exist while
  // Next prerenders; inside a Worker neither does. Every caller is prerendered
  // (all opengraph-image routes are static or SSG with dynamicParams = false),
  // so this is never reached at runtime. If that ever changes, the error below
  // names the real cause instead of surfacing a bare ENOENT from deep in satori.
  const dir = path.join(process.cwd(), "src/app/_og");
  try {
    const [regular, semibold] = await Promise.all([
      fs.readFile(path.join(dir, "Newsreader-400.ttf")),
      fs.readFile(path.join(dir, "Newsreader-600.ttf")),
    ]);
    fontCache = { regular, semibold };
    return fontCache;
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

/**
 * The card is the site: black, one serif, a hairline rule, no ornament.
 * Everything is passed in from real page data so the image can't go stale the
 * way a hand-exported JPEG does.
 */
export async function renderOgImage({
  eyebrow,
  title,
  line,
  meta,
}: {
  eyebrow: string;
  title: string;
  line: string;
  meta: string;
}) {
  const { regular, semibold } = await loadFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#100f0e",
          color: "#e9e7e2",
          padding: "76px 84px",
          fontFamily: "Newsreader",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: "0.16em",
            color: "#918e87",
          }}
        >
          {eyebrow}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 34 ? 76 : 92,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 30,
              fontSize: 34,
              lineHeight: 1.4,
              color: "#c4c1ba",
              maxWidth: 940,
            }}
          >
            {line}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              height: 1,
              width: "100%",
              background: "rgba(233,231,226,0.16)",
            }}
          />
          <div
            style={{
              display: "flex",
              marginTop: 22,
              fontSize: 24,
              color: "#918e87",
            }}
          >
            {meta}
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Newsreader", data: regular, weight: 400, style: "normal" },
        { name: "Newsreader", data: semibold, weight: 600, style: "normal" },
      ],
    }
  );
}
