"use client";

import React, { useEffect, useRef } from "react";
import { MAP, MAP_GRID } from "@/lib/startupMap";

const SHADES = ["#1b2431", "#2c3a4b", "#46586b", "#6f8297", "#a7b6c6", "#e9eff5"];
const RADIUS = [0.15, 0.2, 0.25, 0.31, 0.38, 0.45];
const ME = { lat: 12.97, lng: 77.59 };
const REACH = [
  { lat: 37.78, lng: -122.41 },
  { lat: 40.72, lng: -74.0 },
  { lat: 43.65, lng: -79.38 },
  { lat: 51.5, lng: -0.12 },
  { lat: 52.52, lng: 13.4 },
  { lat: -33.87, lng: 151.21 },
];

// The same map after dark, with routes running out from the one orange dot.
function NightMap() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let visible = false;
    let shownAt = 0;
    let base: HTMLCanvasElement | null = null;

    const place = (p: { lat: number; lng: number }, w: number, h: number) => ({
      x: ((p.lng - MAP.lng0) / (MAP.lngStep * MAP.cols)) * w,
      y: ((MAP.lat1 - p.lat) / (MAP.latStep * MAP.rows)) * h,
    });

    const paintBase = () => {
      const box = canvas.getBoundingClientRect();
      // One copy of this map is hidden at each screen size.
      if (box.width === 0) {
        base = null;
        return;
      }
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(box.width * ratio);
      canvas.height = Math.round(box.height * ratio);
      base = document.createElement("canvas");
      base.width = canvas.width;
      base.height = canvas.height;
      const b = base.getContext("2d");
      if (!b) return;
      const cell = canvas.width / MAP.cols;
      const rowHeight = canvas.height / MAP.rows;
      for (let r = 0; r < MAP.rows; r++) {
        for (let c = 0; c < MAP.cols; c++) {
          const level = MAP_GRID[r].charCodeAt(c) - 48;
          if (level < 0 || level > 5) continue;
          b.fillStyle = SHADES[level];
          b.beginPath();
          b.arc((c + 0.5) * cell, (r + 0.5) * rowHeight, RADIUS[level] * cell, 0, Math.PI * 2);
          b.fill();
        }
      }
    };

    const render = (now: number) => {
      if (!base) return;
      const w = canvas.width;
      const h = canvas.height;
      const unit = w / 900;
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(base, 0, 0);

      const from = place(ME, w, h);
      const elapsed = still ? 99999 : now - shownAt;

      REACH.forEach((target, i) => {
        const to = place(target, w, h);
        const midX = (from.x + to.x) / 2;
        const midY = Math.min(from.y, to.y) - Math.abs(to.x - from.x) * 0.26;
        const grow = Math.min(Math.max((elapsed - i * 220) / 1300, 0), 1);
        if (grow <= 0) return;

        const point = (t: number) => ({
          x: (1 - t) ** 2 * from.x + 2 * (1 - t) * t * midX + t * t * to.x,
          y: (1 - t) ** 2 * from.y + 2 * (1 - t) * t * midY + t * t * to.y,
        });

        ctx.strokeStyle = "rgba(255,106,31,.55)";
        ctx.lineWidth = 1.4 * unit;
        ctx.beginPath();
        for (let s = 0; s <= 48 * grow; s++) {
          const p = point(s / 48);
          if (s === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();

        if (grow >= 1) {
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(to.x, to.y, 2.6 * unit, 0, Math.PI * 2);
          ctx.fill();
          if (!still) {
            const p = point(((now / 2600 + i * 0.37) % 1 + 1) % 1);
            ctx.fillStyle = "#ffb48a";
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2.2 * unit, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      ctx.fillStyle = "rgba(255,106,31,.25)";
      ctx.beginPath();
      ctx.arc(from.x, from.y, (11 + Math.sin(now / 500) * 2.5) * unit, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ff6a1f";
      ctx.beginPath();
      ctx.arc(from.x, from.y, 5.5 * unit, 0, Math.PI * 2);
      ctx.fill();
    };

    const loop = (now: number) => {
      render(now);
      if (visible && !still) frame = requestAnimationFrame(loop);
    };

    paintBase();
    const seen = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        cancelAnimationFrame(frame);
        if (visible) {
          if (!shownAt) shownAt = performance.now();
          frame = requestAnimationFrame(loop);
        }
      },
      { threshold: 0.2 }
    );
    seen.observe(canvas);
    const resize = new ResizeObserver(() => {
      paintBase();
      render(performance.now());
    });
    resize.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      seen.disconnect();
      resize.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="block h-full w-full" />;
}

export default NightMap;
