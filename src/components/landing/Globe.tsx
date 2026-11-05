"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { env } from "@/lib/env";
import { MAP, MAP_GRID } from "@/lib/startupMap";
import { useCalm } from "./useCalm";

const RAD = Math.PI / 180;
const TILT = -14 * RAD;
const SIZES = [1.25, 1.45, 1.7, 2.0, 2.4, 2.9];
const ME = { lat: 12.97 * RAD, lng: 77.59 * RAD };

interface Point {
  sinLat: number;
  cosLat: number;
  sinLng: number;
  cosLng: number;
}

const toPoint = (lat: number, lng: number): Point => ({
  sinLat: Math.sin(lat),
  cosLat: Math.cos(lat),
  sinLng: Math.sin(lng),
  cosLng: Math.cos(lng),
});

// Every land dot of the map, grouped by how busy it is, placed on a sphere.
const LEVELS: Point[][] = [[], [], [], [], [], []];
MAP_GRID.forEach((row, r) => {
  for (let c = 0; c < row.length; c++) {
    const level = row.charCodeAt(c) - 48;
    if (level < 0 || level > 5) continue;
    LEVELS[level].push(
      toPoint(
        (MAP.lat1 - (r + 0.5) * MAP.latStep) * RAD,
        (MAP.lng0 + (c + 0.5) * MAP.lngStep) * RAD
      )
    );
  }
});
const BUSY = [...LEVELS[3], ...LEVELS[4], ...LEVELS[5]];
const MY_POINT = toPoint(ME.lat, ME.lng);

// The same dots as the desktop map, on a globe, because a flat world map has
// no good shape on a tall screen. It swings between the Americas and Asia and
// can be dragged. His pin rides on it.
function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ on: false, x: 0, offset: 0 });
  const { resolvedTheme } = useTheme();
  const reduced = useCalm();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const styles = getComputedStyle(canvas);
    // One step darker than the flat map: on a sphere the land has to carry the shape.
    const colors = SIZES.map((_, i) =>
      styles.getPropertyValue(`--map-${Math.min(i + 1, 5)}`).trim()
    );
    const sea = styles.getPropertyValue("--globe-sea").trim();
    const edge = styles.getPropertyValue("--globe-edge").trim();
    const ink = colors[5];
    let frame = 0;
    let visible = true;
    let pulses: { p: Point; born: number }[] = [];
    let nextPulse = 0;

    const project = (p: Point, sinS: number, cosS: number) => {
      const sinL = p.sinLng * cosS - p.cosLng * sinS;
      const cosL = p.cosLng * cosS + p.sinLng * sinS;
      const x = p.cosLat * sinL;
      const y0 = p.sinLat;
      const z0 = p.cosLat * cosL;
      return {
        x,
        y: y0 * Math.cos(TILT) - z0 * Math.sin(TILT),
        z: y0 * Math.sin(TILT) + z0 * Math.cos(TILT),
      };
    };

    const render = (now: number) => {
      const box = canvas.getBoundingClientRect();
      if (box.width === 0) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(box.width * ratio);
      if (canvas.width !== w) {
        canvas.width = w;
        canvas.height = w;
      }
      const R = w * 0.47;
      const cx = w / 2;
      const cy = w / 2;
      const unit = w / 430;

      ctx.clearRect(0, 0, w, w);
      const shade = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.35, R * 0.1, cx, cy, R);
      shade.addColorStop(0, sea);
      shade.addColorStop(1, edge);
      ctx.fillStyle = shade;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      const swing = reduced ? 62 : 38 + 88 * Math.sin(now / 11000 + 0.3);
      const spin = (swing + drag.current.offset) * RAD;
      const sinS = Math.sin(spin);
      const cosS = Math.cos(spin);

      LEVELS.forEach((points, level) => {
        ctx.fillStyle = colors[level];
        for (const p of points) {
          const q = project(p, sinS, cosS);
          if (q.z <= 0.02) continue;
          const size = SIZES[level] * unit * (0.55 + q.z * 0.6);
          ctx.globalAlpha = Math.min(1, 0.35 + q.z * 1.2);
          ctx.beginPath();
          ctx.arc(cx + q.x * R, cy - q.y * R, size, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;

      if (!reduced) {
        if (now > nextPulse) {
          pulses.push({ p: BUSY[Math.floor(Math.random() * BUSY.length)], born: now });
          nextPulse = now + 300;
        }
        pulses = pulses.filter((pulse) => now - pulse.born < 1500);
        ctx.strokeStyle = ink;
        ctx.lineWidth = unit;
        for (const pulse of pulses) {
          const q = project(pulse.p, sinS, cosS);
          if (q.z <= 0.1) continue;
          const age = (now - pulse.born) / 1500;
          ctx.globalAlpha = (1 - age) * 0.5 * q.z;
          ctx.beginPath();
          ctx.arc(cx + q.x * R, cy - q.y * R, (3 + age * 13) * unit, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }

      const me = project(MY_POINT, sinS, cosS);
      const pin = pinRef.current;
      if (pin) {
        const scale = box.width / w;
        pin.style.opacity = String(Math.max(0, Math.min(1, (me.z - 0.08) * 6)));
        pin.style.transform = `translate(${(cx + me.x * R) * scale}px, ${(cy - me.y * R) * scale}px)`;
      }
    };

    const loop = (now: number) => {
      render(now);
      if (visible && !reduced) frame = requestAnimationFrame(loop);
    };

    const seen = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible) frame = requestAnimationFrame(loop);
    });
    seen.observe(canvas);
    const resize = new ResizeObserver(() => render(performance.now()));
    resize.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      seen.disconnect();
      resize.disconnect();
    };
  }, [resolvedTheme, reduced]);

  return (
    <motion.div
      className="relative mx-auto aspect-square w-full max-w-[30rem] touch-pan-y select-none"
      initial={{ opacity: 0, scale: 0.86 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      onPointerDown={(e) => {
        drag.current.on = true;
        drag.current.x = e.clientX;
      }}
      onPointerMove={(e) => {
        if (!drag.current.on) return;
        drag.current.offset -= (e.clientX - drag.current.x) * 0.45;
        drag.current.x = e.clientX;
      }}
      onPointerUp={() => {
        drag.current.on = false;
      }}
      onPointerCancel={() => {
        drag.current.on = false;
      }}
    >
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Dot globe showing where the startups on RemJobs are based, with an orange pin marking Punyakrit in India, on IST."
        className="block h-full w-full"
      />
      <div ref={pinRef} className="pointer-events-none absolute left-0 top-0 opacity-0">
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
        <span className="map-label absolute left-5 top-0 -translate-y-1/2 whitespace-nowrap pl-1.5 text-[13px] font-semibold leading-tight">
          Me, on IST
        </span>
      </div>
    </motion.div>
  );
}

export default Globe;
