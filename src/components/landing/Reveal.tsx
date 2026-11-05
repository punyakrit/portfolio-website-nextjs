"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useCalm } from "./useCalm";

const EASE = [0.22, 1, 0.36, 1] as const;

// Rises into place the first time it scrolls into view.
export function Reveal({
  children,
  className,
  delay = 0,
  x = 0,
  y = 26,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  x?: number;
  y?: number;
}) {
  const reduced = useCalm();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// Counts up to the number at the front of a value like "400K+" or "32 checks".
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useCalm();
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const [shown, setShown] = useState(target);

  useEffect(() => {
    if (!match || !inView || reduced) return;
    let frame = 0;
    const started = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - started) / 1100, 1);
      setShown(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {match ? `${shown}${match[2]}` : value}
    </span>
  );
}
