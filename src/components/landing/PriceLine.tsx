"use client";

import React from "react";
import { motion } from "framer-motion";
import { useCalm } from "./useCalm";

const LINE =
  "M0 92 L22 84 L40 90 L62 66 L84 74 L108 52 L128 60 L150 38 L176 46 L198 24 L224 30 L250 10";

// A price line drawing itself over and over behind the phones.
function PriceLine() {
  const reduced = useCalm();
  return (
    <svg
      viewBox="0 0 250 100"
      aria-hidden="true"
      className="absolute right-0 top-20 w-[78%] opacity-70"
      fill="none"
    >
      <motion.path
        d={LINE}
        stroke="#a7f3d0"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: reduced ? 1 : 0 }}
        animate={reduced ? undefined : { pathLength: [0, 1, 1, 0] }}
        transition={{ duration: 6, times: [0, 0.55, 0.9, 1], repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

export default PriceLine;
