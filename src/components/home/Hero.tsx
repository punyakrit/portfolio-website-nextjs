"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { bannerImages } from "@/lib/image";
import { env } from "@/lib/env";

export default function Hero() {
  const devMode = env.NEXT_PUBLIC_DEV_MODE === "true";

  // Index 0 on the server AND on the first client render, always.
  //
  // The original version of this component picked the banner with
  // Math.random() in the component body, which meant the server-rendered
  // <img src> and the first client render disagreed on every load - a React 19
  // hydration mismatch, plus a full remount of the <Image> because key={src}
  // changed with it. `/` is also prerendered, so the "random" server pick was
  // frozen in cached HTML anyway and never actually varied per visit.
  //
  // So: render bannerImages[0] deterministically, and let the rotation effect
  // below do the randomising after mount. Math.random() must never run in the
  // component body or at module scope.
  const [index, setIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);

  const containerRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(false);

  const pickRandomDifferent = useCallback((current: number) => {
    if (bannerImages.length <= 1) return current;
    const next = Math.floor(Math.random() * bannerImages.length);
    return next === current ? (current + 1) % bannerImages.length : next;
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (devMode || bannerImages.length <= 1) return;

    let swapTimer: ReturnType<typeof setTimeout> | undefined;

    const rotate = () => {
      if (!visibleRef.current) return;

      setOpacity(0);
      // Swap at the bottom of the fade. Tracked so it can be cleared on
      // unmount - the original let this fire into a dead component.
      swapTimer = setTimeout(() => {
        setIndex(pickRandomDifferent);
        setOpacity(1);
      }, 600);
    };

    const interval = setInterval(rotate, 10000);
    return () => {
      clearInterval(interval);
      if (swapTimer) clearTimeout(swapTimer);
    };
    // Updating the index through the functional form keeps this effect off the
    // index, so the 10s interval is no longer torn down and restarted on every
    // swap the way it used to be.
  }, [devMode, pickRandomDifferent]);

  const currentImage = bannerImages[index];

  // No CDN base URL configured -> src/lib/image.ts hands back an empty list.
  // Render nothing rather than passing undefined to next/image, which throws
  // "Failed to parse src" and turns a missing env var into a 500 on the page.
  if (!currentImage) return null;

  return (
    <div ref={containerRef} className="relative" role="banner">
      <div
        className="relative w-full h-[200px] sm:h-[270px] overflow-hidden rounded-[0.875rem] transition-opacity duration-[600ms] ease-in-out"
        style={{ opacity }}
      >
        <Image
          key={currentImage}
          src={currentImage}
          alt="Punyakrit Singh Makhni - Full Stack Engineer"
          fill
          priority
          sizes="(max-width: 672px) 100vw, 672px"
          className="object-cover rounded-[0.875rem]"
        />
      </div>

      {/* Edge fades. These use the background token rather than the hardcoded
          #121212 / white they used to, so the fade actually lands on the page
          colour in both themes instead of leaving a seam. */}
      <div
        className="absolute top-0 left-0 right-0 h-[60px] bg-linear-to-b from-background to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-[60px] bg-linear-to-t from-background to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-0 w-[20px] sm:w-[60px] h-full bg-linear-to-r from-background/20 sm:from-background to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 right-0 w-[20px] sm:w-[60px] h-full bg-linear-to-l from-background/20 sm:from-background to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}
