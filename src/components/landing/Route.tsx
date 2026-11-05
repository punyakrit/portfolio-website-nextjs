"use client";

import React, { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { experience, type Bullet } from "@/lib/experience";
import { socials } from "@/lib/socials";
import { Rise } from "./Motion";
import { WRAP } from "./Section";
import { useCalm } from "./useCalm";

const date = (value: string) =>
  value === "Present"
    ? "Present"
    : new Date(value).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      });

function BulletText({ bullet }: { bullet: Bullet }) {
  if (typeof bullet === "string") return <>{bullet}</>;
  return (
    <>
      {bullet.map((part, i) =>
        part.type === "highlight" ? (
          <strong key={i} className="font-semibold text-foreground">
            {part.value}
          </strong>
        ) : (
          <React.Fragment key={i}>{part.value}</React.Fragment>
        )
      )}
    </>
  );
}

// Oldest first, so the line runs forward in time toward the open stop.
const ROLES = [...experience].reverse();
const STOPS = [
  ...ROLES.map((r) => ({
    key: r.company,
    name: r.displayName ?? r.company,
    when: date(r.startDate),
  })),
  { key: "next", name: "Your team", when: "Next stop" },
];
const LATEST = ROLES.length - 1;
const COUNT = STOPS.length;

function Details({ stop }: { stop: number }) {
  const role = ROLES[stop];

  if (!role) {
    return (
      <div>
        <h3 className="font-display text-2xl leading-tight sm:text-3xl">This stop is open.</h3>
        <p className="mt-3 max-w-[52ch] text-lg leading-snug text-muted-foreground">
          Looking for a remote full-stack, AI or founding engineer role. I reply
          within 24 hours.
        </p>
        <a
          href={socials.cal}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex h-11 items-center rounded-full bg-foreground px-5 text-sm font-medium text-background no-underline"
        >
          Book a 15-minute call
        </a>
      </div>
    );
  }

  return (
    <div className="grid gap-x-12 gap-y-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <div className="min-w-0">
        <h3 className="font-display text-2xl leading-tight sm:text-3xl">
          {role.position.replace(/ \(Intern.*$/, "")}, {role.displayName ?? role.company}
        </h3>
        <p className="mt-2 text-muted-foreground">
          {date(role.startDate)} to {date(role.endDate)}, {role.location}
          {role.position.includes("Intern") && ". Intern Jun to Aug 2024"}
        </p>
        <p className="mt-4 text-lg leading-snug">{role.oneLiner}</p>
        <p className="mt-4 text-sm text-muted-foreground">
          {role.tech.slice(0, 7).map((s) => s.name).join(", ")}
        </p>
      </div>
      <ul className="min-w-0 space-y-3 leading-relaxed text-muted-foreground">
        {role.bullets.map((bullet, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-signal" aria-hidden="true" />
            <span className="min-w-0">
              <BulletText bullet={bullet} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StopMark({ next }: { next: boolean }) {
  const reduced = useCalm();
  return (
    <span
      className={`block rounded-full transition-transform duration-200 group-hover:scale-125 ${
        next
          ? `h-[17px] w-[17px] border-2 border-dashed border-signal bg-background ${reduced ? "" : "next-stop"}`
          : "h-[11px] w-[11px] border-2 border-foreground bg-background"
      }`}
    />
  );
}

// Wide screens: a line across the page, and the dot rides to the picked stop.
function Across({ stop, pick }: { stop: number; pick: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const reduced = useCalm();
  const at = (i: number) => `${((i + 0.5) / COUNT) * 100}%`;
  const spring = { type: "spring", stiffness: 70, damping: 18 } as const;
  const shown = inView || reduced;

  return (
    <div className="hidden md:block">
      <div ref={ref} className="relative mt-12">
        <div className="absolute left-0 right-0 top-[11px] h-[3px] rounded-full bg-border" />
        <motion.div
          className="absolute left-0 top-[11px] h-[3px] rounded-full bg-signal"
          initial={false}
          animate={{ width: shown ? at(stop) : "0%" }}
          transition={spring}
        />
        <motion.span
          className="absolute top-0 z-10 -ml-[12.5px] h-[25px] w-[25px] rounded-full bg-signal shadow-[0_0_0_5px_var(--background),0_6px_16px_rgba(255,106,31,.55)]"
          initial={false}
          animate={{ left: shown ? at(stop) : "0%" }}
          transition={spring}
          aria-hidden="true"
        />
        <ol className="grid" style={{ gridTemplateColumns: `repeat(${COUNT}, minmax(0, 1fr))` }}>
          {STOPS.map((item, i) => (
            <motion.li
              key={item.key}
              className="min-w-0 text-center"
              initial={{ opacity: 0, y: 12 }}
              animate={shown ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
            >
              <button
                type="button"
                onClick={() => pick(i)}
                aria-pressed={i === stop}
                className="group w-full cursor-pointer px-1 text-center"
              >
                <span className="flex h-[25px] items-center justify-center">
                  <StopMark next={i === COUNT - 1} />
                </span>
                <span
                  className={`mt-3 block text-[15px] font-semibold leading-tight ${
                    i === stop ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  {item.name}
                </span>
                <span className={`mt-0.5 block text-[13px] ${i === COUNT - 1 ? "text-[#d9500b]" : "text-muted-foreground"}`}>
                  {item.when}
                </span>
              </button>
            </motion.li>
          ))}
        </ol>
      </div>

      <div className="mt-10 min-h-[17rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={stop}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <Details stop={stop} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Phones: the same route running down the screen, newest stop first, and each
// stop opens in place.
function Down({ stop, pick }: { stop: number; pick: (i: number) => void }) {
  const reduced = useCalm();
  const order = STOPS.map((_, i) => COUNT - 1 - i);

  return (
    <ol className="relative mt-8 md:hidden">
      <span className="absolute bottom-3 left-[11px] top-3 w-[3px] rounded-full bg-border" aria-hidden="true" />
      {order.map((i, row) => {
        const item = STOPS[i];
        const on = i === stop;
        return (
          <motion.li
            key={item.key}
            className="relative min-w-0 pb-1"
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-6% 0px" }}
            transition={{ duration: 0.5, delay: row * 0.06 }}
          >
            <button
              type="button"
              onClick={() => pick(i)}
              aria-expanded={on}
              className="group flex w-full cursor-pointer items-center gap-4 py-3 text-left"
            >
              <span className="relative z-10 flex h-[25px] w-[25px] shrink-0 items-center justify-center">
                {on ? (
                  <motion.span
                    layoutId="route-dot"
                    className="h-[23px] w-[23px] rounded-full bg-signal shadow-[0_0_0_4px_var(--background),0_6px_16px_rgba(255,106,31,.5)]"
                    transition={{ type: "spring", stiffness: 260, damping: 26 }}
                  />
                ) : (
                  <StopMark next={i === COUNT - 1} />
                )}
              </span>
              <span className="min-w-0">
                <span className={`block font-semibold leading-tight ${on ? "text-foreground" : "text-muted-foreground"}`}>
                  {item.name}
                </span>
                <span className={`block text-[13px] ${i === COUNT - 1 ? "text-[#d9500b]" : "text-muted-foreground"}`}>
                  {item.when}
                </span>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduced ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: "easeOut" }}
                  className="overflow-hidden pl-[41px]"
                >
                  <div className="pb-6 pt-1">
                    <Details stop={i} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        );
      })}
    </ol>
  );
}

// Career as a route, ending at an open stop.
function Route() {
  const [stop, setStop] = useState(LATEST);

  return (
    <section id="experience" className={`${WRAP} scroll-mt-20 pb-20 sm:pb-28`}>
      <Rise
        text="The route so far"
        className="font-display text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.05] tracking-[-0.02em]"
      />
      <Across stop={stop} pick={setStop} />
      <Down stop={stop} pick={setStop} />
    </section>
  );
}

export default Route;
