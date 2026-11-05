"use client";

import React, { useEffect, useRef } from "react";

// A quiet field of dots that swells gently and pushes away from the pointer.
function DotField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    const host = canvas?.parentElement;
    if (!canvas || !ctx || !host) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: -9999, y: -9999, on: 0 };
    let color = "";
    let frame = 0;
    let visible = false;

    const readColor = () => {
      color = getComputedStyle(canvas).getPropertyValue("--map-2").trim();
    };

    const render = (now: number) => {
      const box = canvas.getBoundingClientRect();
      if (box.width === 0) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(box.width * ratio);
      const h = Math.round(box.height * ratio);
      if (canvas.width !== w) canvas.width = w;
      if (canvas.height !== h) canvas.height = h;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color;

      const gap = 26 * ratio;
      const reach = 150 * ratio;
      const px = pointer.x * ratio;
      const py = pointer.y * ratio;
      pointer.on += ((pointer.x > -999 ? 1 : 0) - pointer.on) * 0.08;

      for (let y = gap / 2; y < h; y += gap) {
        for (let x = gap / 2; x < w; x += gap) {
          const wave = Math.sin(x * 0.006 + y * 0.009 + now * 0.0012);
          const dx = x - px;
          const dy = y - py;
          const d = Math.hypot(dx, dy);
          const pull = d < reach ? (1 - d / reach) ** 2 * pointer.on : 0;
          const ox = d > 0 ? (dx / d) * pull * 26 * ratio : 0;
          const oy = d > 0 ? (dy / d) * pull * 26 * ratio : 0;
          ctx.globalAlpha = 0.16 + (wave + 1) * 0.1 + pull * 0.6;
          ctx.beginPath();
          ctx.arc(x + ox, y + oy, (1 + (wave + 1) * 0.35 + pull * 2.2) * ratio, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      render(now);
      if (visible && !still) frame = requestAnimationFrame(loop);
    };

    const move = (e: PointerEvent) => {
      const box = canvas.getBoundingClientRect();
      pointer.x = e.clientX - box.left;
      pointer.y = e.clientY - box.top;
    };
    const leave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);

    readColor();
    const theme = new MutationObserver(() => {
      readColor();
      render(performance.now());
    });
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
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
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      theme.disconnect();
      seen.disconnect();
      resize.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}

export default DotField;
