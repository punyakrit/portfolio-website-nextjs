"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useCalm } from "./useCalm";

const POSES = [
  { x: "0%", y: "0%", rotate: -3, scale: 1, zIndex: 3 },
  { x: "9%", y: "-9%", rotate: 3, scale: 0.94, zIndex: 2 },
  { x: "17%", y: "-17%", rotate: 8, scale: 0.88, zIndex: 1 },
];

// Real screens of the product, dealt like cards. The back one comes to the front.
function CardStack({ srcs }: { srcs: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduced = useCalm();
  const [front, setFront] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    const timer = setInterval(() => setFront((f) => (f + 1) % srcs.length), 3600);
    return () => clearInterval(timer);
  }, [inView, reduced, srcs.length]);

  return (
    <div ref={ref} className="relative aspect-video w-full">
      {srcs.map((src, i) => {
        const pose = POSES[(i - front + srcs.length) % srcs.length];
        return (
          <motion.div
            key={src}
            className="absolute inset-0 origin-bottom-left overflow-hidden rounded-xl bg-white shadow-[0_24px_60px_-18px_rgba(0,0,0,.6)]"
            initial={false}
            animate={pose}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            {/* Raw <img>: there is no Images binding on the Worker. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
          </motion.div>
        );
      })}
    </div>
  );
}

export default CardStack;
