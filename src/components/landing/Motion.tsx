"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useCalm } from "./useCalm";

const EASE = [0.22, 1, 0.36, 1] as const;

// Words rise out of a mask, one after another.
export function Rise({
  text,
  as = "h2",
  className,
  delay = 0,
  onLoad = false,
}: {
  text: string;
  as?: "h1" | "h2" | "p";
  className?: string;
  delay?: number;
  /** Play on page load instead of when scrolled into view. */
  onLoad?: boolean;
}) {
  const reduced = useCalm();
  // Watched on the heading itself: the words start clipped by their masks, so
  // they would never register as in view on their own.
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-6% 0px" });
  const shown = onLoad || inView || Boolean(reduced);
  const Tag = as as React.ElementType;

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <React.Fragment key={`${word}-${i}`}>
          <span
            aria-hidden="true"
            className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-top"
          >
            <motion.span
              className="inline-block"
              initial={{ y: "115%" }}
              animate={shown ? { y: 0 } : undefined}
              transition={
                reduced
                  ? { duration: 0 }
                  : { duration: 0.85, delay: delay + i * 0.07, ease: EASE }
              }
            >
              {word}
            </motion.span>
          </span>{" "}
        </React.Fragment>
      ))}
    </Tag>
  );
}

// A thin orange line across the top that fills as the page is read.
export function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-signal"
      style={{ scaleX }}
    />
  );
}

// The hero map drifts and fades slightly as it scrolls away.
export function Drift({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useCalm();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 70]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 0.95]);
  return (
    <div ref={ref}>
      <motion.div style={{ y, scale }}>{children}</motion.div>
    </div>
  );
}

// A mosaic tile: scales in on scroll, leans toward the mouse, gives under a tap.
export function Tile({
  href,
  label,
  className,
  delay = 0,
  children,
}: {
  href: string;
  label: string;
  className?: string;
  delay?: number;
  children: React.ReactNode;
}) {
  const reduced = useCalm();
  const rx = useSpring(useMotionValue(0), { stiffness: 170, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 170, damping: 20 });

  return (
    <motion.div
      className={`min-w-0 ${className ?? ""}`}
      style={{ perspective: 1400 }}
      initial={{ opacity: 0, y: 34, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      <motion.div
        className="h-full"
        style={{ rotateX: rx, rotateY: ry }}
        whileTap={reduced ? undefined : { scale: 0.985 }}
        onPointerMove={(e) => {
          if (reduced || e.pointerType !== "mouse") return;
          const box = e.currentTarget.getBoundingClientRect();
          ry.set(((e.clientX - box.left) / box.width - 0.5) * 3.5);
          rx.set(-((e.clientY - box.top) / box.height - 0.5) * 3.5);
          e.currentTarget.style.setProperty("--mx", `${e.clientX - box.left}px`);
          e.currentTarget.style.setProperty("--my", `${e.clientY - box.top}px`);
        }}
        onPointerLeave={() => {
          rx.set(0);
          ry.set(0);
        }}
      >
        <Link
          href={href}
          aria-label={label}
          className="group relative block h-full overflow-hidden rounded-3xl no-underline"
        >
          {children}
          <span aria-hidden="true" className="tile-light" />
        </Link>
      </motion.div>
    </motion.div>
  );
}

// A button that leans toward the pointer and springs back.
export function Magnetic({ children }: { children: React.ReactNode }) {
  const reduced = useCalm();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });

  return (
    <motion.span
      className="inline-block"
      style={{ x, y }}
      onPointerMove={(e) => {
        if (reduced || e.pointerType !== "mouse") return;
        const box = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - box.left - box.width / 2) * 0.28);
        y.set((e.clientY - box.top - box.height / 2) * 0.4);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

// The orange dot follows the mouse, and swells over anything clickable.
export function CursorDot() {
  const reduced = useCalm();
  const [on, setOn] = useState(false);
  const [big, setBig] = useState(false);
  const x = useSpring(useMotionValue(-40), { stiffness: 420, damping: 34 });
  const y = useSpring(useMotionValue(-40), { stiffness: 420, damping: 34 });

  useEffect(() => {
    if (reduced || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      setOn(true);
      x.set(e.clientX);
      y.set(e.clientY);
      setBig(Boolean((e.target as Element | null)?.closest?.("a, button")));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduced, x, y]);

  if (!on) return null;
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] -ml-[6px] -mt-[6px] h-3 w-3 rounded-full bg-signal mix-blend-multiply dark:mix-blend-screen"
      style={{ x, y }}
      animate={{ scale: big ? 3 : 1, opacity: big ? 0.45 : 0.85 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    />
  );
}
