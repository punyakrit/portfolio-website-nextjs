"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { AppleHelloEffectEnglish } from "@/components/apple-hello-effect/apple-hello-effect-english";
import { AppleHelloEffectHindi } from "@/components/apple-hello-effect/apple-hello-effect-hindi";
import { AppleHelloEffectSpanish } from "@/components/apple-hello-effect/apple-hello-effect-spanish";

const IDLE_MS = 30_000;
const UNLOCK_SCROLL = 420;
const PHASE_FADE_MS = 480;
const HOLD_AFTER_DRAW_MS = 600;

const HELLO_LANGS = ["english", "hindi", "spanish"] as const;
type HelloLang = (typeof HELLO_LANGS)[number];

export default function IdleSurpriseOverlay() {
  const [open, setOpen] = useState(false);
  const [langIndex, setLangIndex] = useState(0);
  const [phaseFadeOut, setPhaseFadeOut] = useState(false);
  const [sequenceKey, setSequenceKey] = useState(0);
  const overlayOpenRef = useRef(false);
  const scrollAccum = useRef(0);
  const titleBeforeRef = useRef("");
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchLastY = useRef(0);
  const holdAfterDrawTimerRef = useRef<number | null>(null);

  const currentLang: HelloLang = HELLO_LANGS[langIndex] ?? "english";

  const clearIdle = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = null;
  }, []);

  const clearHoldTimer = useCallback(() => {
    if (holdAfterDrawTimerRef.current) {
      clearTimeout(holdAfterDrawTimerRef.current);
      holdAfterDrawTimerRef.current = null;
    }
  }, []);

  const scheduleIdle = useCallback(() => {
    clearIdle();
    if (overlayOpenRef.current) return;
    idleTimerRef.current = setTimeout(() => {
      titleBeforeRef.current = document.title;
      document.title = "Surprise for you";
      overlayOpenRef.current = true;
      setLangIndex(0);
      setPhaseFadeOut(false);
      setSequenceKey(0);
      clearHoldTimer();
      setOpen(true);
      scrollAccum.current = 0;
    }, IDLE_MS);
  }, [clearIdle, clearHoldTimer]);

  const dismiss = useCallback(() => {
    const prev = titleBeforeRef.current;
    overlayOpenRef.current = false;
    clearHoldTimer();
    setOpen(false);
    if (prev) document.title = prev;
    scrollAccum.current = 0;
    clearIdle();
    scheduleIdle();
  }, [clearHoldTimer, clearIdle, scheduleIdle]);

  const onStrokeComplete = useCallback(() => {
    clearHoldTimer();
    holdAfterDrawTimerRef.current = window.setTimeout(() => {
      holdAfterDrawTimerRef.current = null;
      setPhaseFadeOut(true);
    }, HOLD_AFTER_DRAW_MS);
  }, [clearHoldTimer]);

  useEffect(() => {
    const onActivity = () => {
      if (!open) scheduleIdle();
    };
    const opts: AddEventListenerOptions = { passive: true };
    window.addEventListener("mousemove", onActivity, opts);
    window.addEventListener("mousedown", onActivity, opts);
    window.addEventListener("keydown", onActivity, opts);
    window.addEventListener("scroll", onActivity, opts);
    window.addEventListener("touchstart", onActivity, opts);
    window.addEventListener("click", onActivity, opts);
    scheduleIdle();
    return () => {
      window.removeEventListener("mousemove", onActivity);
      window.removeEventListener("mousedown", onActivity);
      window.removeEventListener("keydown", onActivity);
      window.removeEventListener("scroll", onActivity);
      window.removeEventListener("touchstart", onActivity);
      window.removeEventListener("click", onActivity);
      clearIdle();
    };
  }, [open, scheduleIdle, clearIdle]);

  useEffect(() => {
    if (!open) {
      clearHoldTimer();
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, clearHoldTimer]);

  useEffect(() => {
    if (!open || !phaseFadeOut) return;
    const t = window.setTimeout(() => {
      setLangIndex((i) => (i + 1) % HELLO_LANGS.length);
      setSequenceKey((k) => k + 1);
      setPhaseFadeOut(false);
    }, PHASE_FADE_MS);
    return () => window.clearTimeout(t);
  }, [open, phaseFadeOut]);

  useEffect(() => {
    if (!open) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      scrollAccum.current += Math.abs(e.deltaY);
      if (scrollAccum.current >= UNLOCK_SCROLL) dismiss();
    };
    const onTouchStart = (e: TouchEvent) => {
      touchLastY.current = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY ?? touchLastY.current;
      const dy = touchLastY.current - y;
      if (dy > 0) scrollAccum.current += dy;
      touchLastY.current = y;
      if (scrollAccum.current >= UNLOCK_SCROLL) dismiss();
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [open, dismiss]);

  if (!open) return null;

  const slideKey = `${currentLang}-${sequenceKey}`;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Idle greeting"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
    >
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[40px] backdrop-saturate-150" />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-black/50"
        aria-hidden
      />
      <div className="relative z-10 flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-6 pb-36 pt-16">
        <div className="flex min-h-[min(40vh,16rem)] w-full flex-col items-center justify-center md:min-h-[min(45vh,20rem)]">
          {currentLang === "english" && (
            <motion.div
              key={slideKey}
              className="flex w-full justify-center"
              initial={{ opacity: 1 }}
              animate={{ opacity: phaseFadeOut ? 0 : 1 }}
              transition={{
                duration: phaseFadeOut ? PHASE_FADE_MS / 1000 : 0.15,
                ease: "easeInOut",
              }}
            >
              <AppleHelloEffectEnglish
                className="h-24 w-auto max-w-full text-white drop-shadow-[0_0_24px_rgba(255,255,255,0.15)] md:h-32"
                durationScale={1.1}
                onAnimationComplete={onStrokeComplete}
              />
            </motion.div>
          )}
          {currentLang === "hindi" && (
            <motion.div
              key={slideKey}
              className="flex w-full justify-center"
              initial={{ opacity: 1 }}
              animate={{ opacity: phaseFadeOut ? 0 : 1 }}
              transition={{
                duration: phaseFadeOut ? PHASE_FADE_MS / 1000 : 0.15,
                ease: "easeInOut",
              }}
            >
              <AppleHelloEffectHindi
                className="h-28 w-auto max-w-full text-white drop-shadow-[0_0_24px_rgba(255,255,255,0.15)] md:h-40"
                durationScale={0.95}
                onAnimationComplete={onStrokeComplete}
              />
            </motion.div>
          )}
          {currentLang === "spanish" && (
            <motion.div
              key={slideKey}
              className="flex w-full justify-center"
              initial={{ opacity: 1 }}
              animate={{ opacity: phaseFadeOut ? 0 : 1 }}
              transition={{
                duration: phaseFadeOut ? PHASE_FADE_MS / 1000 : 0.15,
                ease: "easeInOut",
              }}
            >
              <AppleHelloEffectSpanish
                className="h-24 w-auto max-w-full text-white drop-shadow-[0_0_24px_rgba(255,255,255,0.15)] md:h-32"
                durationScale={1.05}
                onAnimationComplete={onStrokeComplete}
              />
            </motion.div>
          )}
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-10 left-1/2 z-10 w-[min(90vw,20rem)] -translate-x-1/2">
        <div className="relative overflow-hidden rounded-full border border-white/25 bg-white/[0.07] px-8 py-3.5 shadow-[0_8px_40px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-2xl">
          <motion.div
            className="pointer-events-none absolute inset-y-0 left-0 w-2/5 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: "-120%" }}
            animate={{ x: "320%" }}
            transition={{
              repeat: Infinity,
              duration: 2.8,
              ease: "linear",
            }}
            aria-hidden
          />
          <motion.p
            className="relative text-center text-[0.8125rem] font-medium tracking-[0.2em] text-white/85 md:text-sm"
            animate={{ opacity: [0.65, 1, 0.65] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          >
            scroll to unlock
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
