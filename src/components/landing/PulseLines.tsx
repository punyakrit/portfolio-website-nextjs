"use client";

import React, { useEffect, useRef } from "react";

const REGIONS = ["us-east", "eu-west", "ap-south"];

// One heartbeat: flat, a small rise, a sharp spike, a dip, flat again.
function beat(p: number) {
  if (p < 0.34) return 0;
  if (p < 0.4) return Math.sin(((p - 0.34) / 0.06) * Math.PI) * 0.14;
  if (p < 0.44) return 0;
  if (p < 0.47) return ((p - 0.44) / 0.03) * 1;
  if (p < 0.5) return 1 - ((p - 0.47) / 0.03) * 1.45;
  if (p < 0.53) return -0.45 + ((p - 0.5) / 0.03) * 0.45;
  return 0;
}

// Regional checks as live traces, each running on its own rhythm.
function PulseLines() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let visible = false;

    const render = (now: number) => {
      const box = canvas.getBoundingClientRect();
      if (box.width === 0) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(box.width * ratio);
      const h = Math.round(box.height * ratio);
      if (canvas.width !== w) canvas.width = w;
      if (canvas.height !== h) canvas.height = h;
      ctx.clearRect(0, 0, w, h);

      const rowH = h / REGIONS.length;
      const amp = rowH * 0.34;
      REGIONS.forEach((region, i) => {
        const base = rowH * (i + 0.62);
        const speed = 0.00012 + i * 0.00002;
        const head = w * 0.9;

        const grad = ctx.createLinearGradient(0, 0, head, 0);
        grad.addColorStop(0, "rgba(74,222,128,0)");
        grad.addColorStop(1, "rgba(74,222,128,1)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2 * ratio;
        ctx.lineJoin = "round";
        ctx.beginPath();
        let lastY = base;
        for (let x = 0; x <= head; x += 2 * ratio) {
          const p = ((x / w) * 1.6 - now * speed + i * 0.37) % 1;
          lastY = base - beat(p < 0 ? p + 1 : p) * amp;
          if (x === 0) ctx.moveTo(x, lastY);
          else ctx.lineTo(x, lastY);
        }
        ctx.stroke();

        ctx.fillStyle = "#4ade80";
        ctx.shadowColor = "#4ade80";
        ctx.shadowBlur = 12 * ratio;
        ctx.beginPath();
        ctx.arc(head, lastY, 3.2 * ratio, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = "rgba(255,255,255,.55)";
        ctx.font = `${12 * ratio}px ui-sans-serif, system-ui, sans-serif`;
        ctx.fillText(region, 20 * ratio, rowH * i + 22 * ratio);
      });
    };

    const loop = (now: number) => {
      render(now);
      if (visible && !still) frame = requestAnimationFrame(loop);
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
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-x-0 top-0 h-[68%] w-full" />;
}

export default PulseLines;
