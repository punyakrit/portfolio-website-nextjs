"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { env } from "@/lib/env";
import Globe from "./Globe";
import { MAP, MAP_GRID, mapPosition } from "@/lib/startupMap";

const RADIUS = [0.15, 0.2, 0.25, 0.31, 0.38, 0.45];

const CITIES = [
  { name: "San Francisco", lat: 37.78, lng: -122.41, side: "left" },
  { name: "New York", lat: 40.72, lng: -74.0, side: "right" },
  { name: "London", lat: 51.5, lng: -0.12, side: "left" },
  { name: "Berlin", lat: 52.52, lng: 13.4, side: "right" },
  { name: "Singapore", lat: 1.29, lng: 103.85, side: "right" },
  { name: "Sydney", lat: -33.87, lng: 151.21, side: "left" },
] as const;

// Water labels, the way an atlas sets them.
const OCEANS = [
  { text: "250K+ startups", lat: 8, lng: -152 },
  { text: "400K+ live jobs", lat: -22, lng: -14 },
] as const;

const ME = mapPosition(12.97, 77.59);

// The busiest cells, where the activity rings open.
const BUSY: [number, number][] = MAP_GRID.flatMap((row, r) =>
  [...row].flatMap((ch, c) => (ch >= "3" && ch <= "5" ? [[r, c] as [number, number]] : []))
);

function draw(canvas: HTMLCanvasElement, progress: number) {
  const box = canvas.getBoundingClientRect();
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.round(box.width * ratio);
  const height = Math.round(box.height * ratio);
  if (canvas.width !== width) canvas.width = width;
  if (canvas.height !== height) canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, width, height);

  const styles = getComputedStyle(canvas);
  const colors = RADIUS.map((_, i) =>
    styles.getPropertyValue(`--map-${i}`).trim()
  );
  const cell = width / MAP.cols;
  const rowHeight = height / MAP.rows;

  for (let r = 0; r < MAP.rows; r++) {
    const row = MAP_GRID[r];
    for (let c = 0; c < MAP.cols; c++) {
      const ch = row.charCodeAt(c) - 48;
      if (ch < 0 || ch > 5) continue;

      // One sweep on load, east to west, the way the working day moves.
      if (progress < 1) {
        const start = (1 - c / MAP.cols) * 0.7 + ((r * 31 + c * 17) % 23) / 110;
        const alpha = (progress - start) / 0.12;
        if (alpha <= 0) continue;
        ctx.globalAlpha = Math.min(alpha, 1);
      } else {
        ctx.globalAlpha = 1;
      }

      ctx.fillStyle = colors[ch];
      ctx.beginPath();
      ctx.arc(
        (c + 0.5) * cell,
        (r + 0.5) * rowHeight,
        RADIUS[ch] * cell,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
}

function StartupMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const played = useRef(false);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let frame = 0;
    let visible = true;
    let base: HTMLCanvasElement | null = null;
    let pulses: { c: number; r: number; born: number }[] = [];
    let nextPulse = 0;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const styles = getComputedStyle(canvas);
    const colors = RADIUS.map((_, i) =>
      styles.getPropertyValue(`--map-${i}`).trim()
    );

    // The finished map, kept so later frames only draw what moves.
    const capture = () => {
      if (canvas.getBoundingClientRect().width === 0) return;
      draw(canvas, 1);
      base = document.createElement("canvas");
      base.width = canvas.width;
      base.height = canvas.height;
      base.getContext("2d")?.drawImage(canvas, 0, 0);
    };

    const live = (now: number) => {
      if (!base || canvas.getBoundingClientRect().width === 0) return;
      const cell = canvas.width / MAP.cols;
      const rowHeight = canvas.height / MAP.rows;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(base, 0, 0);

      // New jobs landing: a soft ring opens on a busy dot now and then.
      if (now > nextPulse && BUSY.length) {
        const [r, c] = BUSY[Math.floor(Math.random() * BUSY.length)];
        pulses.push({ c, r, born: now });
        nextPulse = now + 260;
      }
      pulses = pulses.filter((p) => now - p.born < 1700);
      ctx.strokeStyle = colors[5];
      ctx.lineWidth = Math.max(1, cell * 0.12);
      for (const p of pulses) {
        const age = (now - p.born) / 1700;
        ctx.globalAlpha = (1 - age) * 0.5;
        ctx.beginPath();
        ctx.arc(
          (p.c + 0.5) * cell,
          (p.r + 0.5) * rowHeight,
          cell * (0.4 + age * 2.6),
          0,
          Math.PI * 2
        );
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // The dots swell under the pointer.
      const point = pointer.current;
      if (point) {
        const reach = 7;
        const pc = point.x * MAP.cols;
        const pr = point.y * MAP.rows;
        const r0 = Math.max(0, Math.floor(pr - reach));
        const r1 = Math.min(MAP.rows - 1, Math.ceil(pr + reach));
        const c0 = Math.max(0, Math.floor(pc - reach));
        const c1 = Math.min(MAP.cols - 1, Math.ceil(pc + reach));
        for (let r = r0; r <= r1; r++) {
          for (let c = c0; c <= c1; c++) {
            const level = MAP_GRID[r].charCodeAt(c) - 48;
            if (level < 0 || level > 5) continue;
            const distance = Math.hypot(c + 0.5 - pc, r + 0.5 - pr);
            if (distance > reach) continue;
            const lift = 1 - distance / reach;
            ctx.fillStyle = colors[Math.min(5, level + 2)];
            ctx.beginPath();
            ctx.arc(
              (c + 0.5) * cell,
              (r + 0.5) * rowHeight,
              RADIUS[level] * cell * (1 + lift * 1.5),
              0,
              Math.PI * 2
            );
            ctx.fill();
          }
        }
      }
    };

    const loop = (now: number) => {
      live(now);
      if (visible) frame = requestAnimationFrame(loop);
    };

    const start = () => {
      capture();
      if (!still) frame = requestAnimationFrame(loop);
    };

    const begin = () => {
      if (played.current || still) {
        start();
        return;
      }
      played.current = true;
      const started = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - started) / 1500, 1);
        draw(canvas, progress);
        if (progress < 1) frame = requestAnimationFrame(tick);
        else start();
      };
      frame = requestAnimationFrame(tick);
    };

    // Hidden on phones: nothing to draw until the screen is wide enough.
    let begun = false;
    const resize = new ResizeObserver(() => {
      if (canvas.getBoundingClientRect().width === 0) return;
      if (!begun) {
        begun = true;
        begin();
      } else if (base) {
        capture();
      }
    });
    resize.observe(canvas);

    const seen = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && base && !still) {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(loop);
      }
    });
    seen.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      seen.disconnect();
    };
  }, [resolvedTheme]);

  return (
    <>
      <div className="px-4 md:hidden">
        <Globe />
      </div>
      <div
        className="relative hidden w-full md:block"
        style={{ aspectRatio: `${MAP.cols} / ${MAP.rows}` }}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const box = e.currentTarget.getBoundingClientRect();
          pointer.current = {
            x: (e.clientX - box.left) / box.width,
            y: (e.clientY - box.top) / box.height,
          };
        }}
        onPointerLeave={() => {
          pointer.current = null;
        }}
      >
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Dot map of the world showing where the startups on RemJobs are based. They cluster in the US, Europe and India. One orange dot marks Punyakrit, in India on IST."
          className="absolute inset-0 h-full w-full"
        />

        {/* Labels show on the phone map (it is wide enough) and from md up.
            Between the two the map is a single screen wide and too dense. */}
        {CITIES.map((city) => (
          <span
            key={city.name}
            className={`map-label absolute -translate-y-1/2 text-[13px] font-medium ${
              city.side === "left" ? "-translate-x-full pr-2.5" : "pl-2.5"
            }`}
            style={mapPosition(city.lat, city.lng)}
          >
            {city.name}
          </span>
        ))}

        {OCEANS.map((ocean) => (
          <span
            key={ocean.text}
            className="absolute hidden -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-serif text-xl italic tracking-[0.04em] text-muted-foreground lg:block"
            style={mapPosition(ocean.lat, ocean.lng)}
          >
            {ocean.text}
          </span>
        ))}

        <span className="absolute" style={ME}>
          <span className="me-radar" aria-hidden="true" />
          {/* Raw <img>: there is no Images binding on the Worker. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${env.NEXT_PUBLIC_CLOUDFRONT_URL}/img.jpg`}
            alt=""
            width={40}
            height={40}
            className="me-pin"
          />
          <span className="map-label absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap pl-1.5 text-[13px] font-semibold leading-tight sm:left-4 sm:text-sm">
            Me, on IST
          </span>
        </span>
      </div>
    </>
  );
}

export default StartupMap;
