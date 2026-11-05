"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useCalm } from "./useCalm";

const STEPS = [
  { name: "Screen recording", ai: false },
  { name: "Interfaze perceives the video", ai: true },
  { name: "Reconcile, zero model calls", ai: false },
  { name: "Gemini 3.1 Pro directs the edit", ai: true },
  { name: "32 checks on the plan", ai: false },
  { name: "ElevenLabs and HeyGen render", ai: true },
  { name: "ffmpeg composites", ai: false },
  { name: "Verify, revise if needed", ai: false },
];

// The AI Demo Video Builder as a running diagram: a signal walks the stages.
function Pipeline() {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduced = useCalm();
  const [lit, setLit] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    const timer = setInterval(() => setLit((i) => (i + 1) % STEPS.length), 700);
    return () => clearInterval(timer);
  }, [inView, reduced]);

  return (
    <ol ref={ref} className="relative flex flex-1 flex-col justify-between gap-1">
      <span className="absolute bottom-3 left-[5px] top-3 w-px bg-white/15" aria-hidden="true" />
      {STEPS.map((step, i) => {
        const on = !reduced && i === lit;
        return (
          <li
            key={step.name}
            className={`relative flex items-center gap-3 py-1 text-sm leading-tight transition-colors duration-300 ${
              on ? "text-white" : "text-white/55"
            }`}
          >
            <span
              className={`relative z-10 h-[11px] w-[11px] shrink-0 rounded-full border-2 transition-all duration-300 ${
                on ? "scale-125 border-signal bg-signal" : "border-white/30 bg-[#15132a]"
              }`}
              aria-hidden="true"
            />
            <span className="min-w-0 flex-1">{step.name}</span>
            <span className="shrink-0 text-[11px] text-white/40">{step.ai ? "model" : "code"}</span>
          </li>
        );
      })}
    </ol>
  );
}

export default Pipeline;
