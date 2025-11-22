"use client";

import { useEffect, useState } from "react";

export default function RefreshOverlay() {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        setShouldRender(false);
      }, 400);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/50 z-[9999] transition-opacity duration-[600ms] ease-in-out backdrop-blur-sm ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}

