"use client";

import React from "react";
import { MotionConfig } from "framer-motion";

// Follows the visitor's system setting: with reduced motion on, movement is
// skipped and things simply appear.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
