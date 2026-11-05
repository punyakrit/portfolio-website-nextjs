"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

// useReducedMotion is null on the server and already true on the browser's
// first render, so markup built from it can differ and break hydration. This
// answers false until the page has mounted, then gives the real preference.
export function useCalm() {
  const preference = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && Boolean(preference);
}
