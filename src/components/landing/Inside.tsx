"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Rise } from "./Motion";
import { WRAP } from "./Section";
import { useCalm } from "./useCalm";

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub?: string;
  lead?: boolean;
}

const WIDE_BOXES: Box[] = [
  ...["Greenhouse", "Ashby", "Lever", "Workable", "and more"].map((title, i) => ({
    x: 0,
    y: 8 + i * 64,
    w: 140,
    h: 46,
    title,
  })),
  { x: 230, y: 110, w: 190, h: 110, title: "Cloudflare container", sub: "reads every public board" },
  { x: 490, y: 110, w: 180, h: 110, title: "Classify", sub: "role, location, remote scope" },
  { x: 740, y: 110, w: 190, h: 110, title: "Index in memory", sub: "search in 8-16 ms", lead: true },
  { x: 1000, y: 48, w: 160, h: 96, title: "remjobs.works", sub: "map and search" },
  { x: 1000, y: 186, w: 160, h: 96, title: "MCP server", sub: "Claude, ChatGPT, Cursor" },
];

const WIDE_PATHS = [
  ...[31, 95, 159, 223, 287].map((y) => `M140 ${y} C 190 ${y}, 185 165, 230 165`),
  "M420 165 L490 165",
  "M670 165 L740 165",
  "M930 165 C 965 165, 965 96, 1000 96",
  "M930 165 C 965 165, 965 234, 1000 234",
];

const TALL_BOXES: Box[] = [
  { x: 0, y: 0, w: 360, h: 84, title: "Hiring systems", sub: "Greenhouse, Ashby, Lever, Workable and more" },
  { x: 40, y: 134, w: 280, h: 84, title: "Cloudflare container", sub: "reads every public board" },
  { x: 40, y: 268, w: 280, h: 84, title: "Classify", sub: "role, location, remote scope" },
  { x: 40, y: 402, w: 280, h: 84, title: "Index in memory", sub: "search in 8-16 ms", lead: true },
  { x: 0, y: 546, w: 170, h: 96, title: "remjobs.works", sub: "map and search" },
  { x: 190, y: 546, w: 170, h: 96, title: "MCP server", sub: "Claude, ChatGPT, Cursor" },
];

const TALL_PATHS = [
  "M180 84 L180 134",
  "M180 218 L180 268",
  "M180 352 L180 402",
  "M180 486 C 180 516, 85 516, 85 546",
  "M180 486 C 180 516, 275 516, 275 546",
];

function Diagram({
  boxes,
  paths,
  viewBox,
  className,
  shown,
}: {
  boxes: Box[];
  paths: string[];
  viewBox: string;
  className: string;
  shown: boolean;
}) {
  const reduced = useCalm();
  return (
    <svg viewBox={viewBox} className={className} role="img" aria-label="RemJobs reads public job boards in a Cloudflare container, classifies every job, holds the index in memory, and serves it to the website and to AI assistants through an MCP server.">
      {paths.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke="var(--rule)"
          strokeWidth="2"
          initial={{ pathLength: reduced ? 1 : 0 }}
          animate={{ pathLength: shown || reduced ? 1 : 0 }}
          transition={{ duration: 0.9, delay: 0.15 + i * 0.06, ease: "easeInOut" }}
        />
      ))}

      {shown &&
        !reduced &&
        paths.map((d, i) => (
          <circle key={`p-${d}`} r="4.5" fill="var(--signal)">
            <animateMotion
              dur={`${1.7 + (i % 3) * 0.35}s`}
              begin={`${1 + i * 0.28}s`}
              repeatCount="indefinite"
              path={d}
            />
          </circle>
        ))}

      {boxes.map((box, i) => (
        <motion.g
          key={box.title}
          initial={{ opacity: reduced ? 1 : 0 }}
          animate={{ opacity: shown || reduced ? 1 : 0 }}
          transition={{ duration: 0.5, delay: i * 0.07 }}
        >
          <rect
            x={box.x}
            y={box.y}
            width={box.w}
            height={box.h}
            rx="16"
            fill={box.lead ? "var(--ink)" : "var(--background)"}
            stroke={box.lead ? "var(--signal)" : "var(--rule)"}
            strokeWidth={box.lead ? 2 : 1.5}
          />
          <text
            x={box.x + box.w / 2}
            y={box.y + (box.sub ? box.h / 2 - 5 : box.h / 2 + 5)}
            textAnchor="middle"
            fontSize={box.sub ? 16 : 14.5}
            fontWeight="600"
            fill={box.lead ? "var(--ink-foreground)" : "var(--foreground)"}
          >
            {box.title}
          </text>
          {box.sub && (
            <text
              x={box.x + box.w / 2}
              y={box.y + box.h / 2 + 17}
              textAnchor="middle"
              fontSize="12.5"
              fill={box.lead ? "var(--ink-foreground)" : "var(--muted-foreground)"}
            >
              {box.sub}
            </text>
          )}
        </motion.g>
      ))}
    </svg>
  );
}

// RemJobs from the inside: jobs flowing from public boards to the people and
// assistants searching them.
function Inside() {
  const ref = useRef<HTMLDivElement>(null);
  const shown = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <section id="inside" className={`${WRAP} scroll-mt-20 pb-20 sm:pb-28`}>
      <Rise
        text="How RemJobs works"
        className="font-display text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.05] tracking-[-0.02em]"
      />
      <p className="mt-3 max-w-[52ch] text-lg leading-snug text-muted-foreground">
        One person, one data pipeline. A crashed run writes nothing, so the site
        never reads a half-written index.
      </p>
      <div ref={ref} className="mt-8 rounded-3xl bg-surface p-5 sm:mt-10 sm:p-8">
        <Diagram
          boxes={WIDE_BOXES}
          paths={WIDE_PATHS}
          viewBox="0 0 1160 330"
          className="hidden h-auto w-full lg:block"
          shown={shown}
        />
        <Diagram
          boxes={TALL_BOXES}
          paths={TALL_PATHS}
          viewBox="0 0 360 642"
          className="mx-auto h-auto w-full max-w-md lg:hidden"
          shown={shown}
        />
      </div>
    </section>
  );
}

export default Inside;
