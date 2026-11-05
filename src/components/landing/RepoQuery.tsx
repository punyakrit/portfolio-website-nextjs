"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useCalm } from "./useCalm";

const FILES = [
  "src/auth/session.ts",
  "src/api/webhooks.ts",
  "src/billing/invoice.ts",
  "src/db/migrations.sql",
  "src/search/embed.ts",
];

// Example questions, to show what the product does.
const QUERIES = [
  { text: "where do sessions expire?", hits: [0, 1] },
  { text: "what calls the billing webhook?", hits: [1, 2] },
  { text: "how are repos embedded?", hits: [3, 4] },
];

// A question types itself and the files that answer it light up.
function RepoQuery() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduced = useCalm();
  const [round, setRound] = useState(0);
  const [typed, setTyped] = useState(0);
  const query = QUERIES[round % QUERIES.length];
  const done = typed >= query.text.length;

  // With motion off the question simply sits there, already asked.
  useEffect(() => {
    if (reduced) setTyped(QUERIES[0].text.length);
  }, [reduced]);

  useEffect(() => {
    if (!inView || reduced) return;
    const timer = setTimeout(
      () => {
        if (done) {
          setTyped(0);
          setRound((r) => r + 1);
        } else {
          setTyped((t) => t + 1);
        }
      },
      done ? 2600 : 45
    );
    return () => clearTimeout(timer);
  }, [inView, reduced, done, typed]);

  return (
    <div ref={ref} aria-hidden="true" className="absolute inset-x-0 top-0 p-5 sm:p-6">
      <div className="flex h-10 items-center gap-2 rounded-xl border border-black/10 bg-white px-3 text-[13px] text-black/80 shadow-sm">
        <span className="h-2 w-2 shrink-0 rounded-full bg-[#ff2d6f]" />
        <span className="truncate">{query.text.slice(0, typed)}</span>
        <span className="-ml-1.5 h-4 w-px shrink-0 animate-pulse bg-black/60" />
      </div>
      <ul className="mt-3 space-y-1.5">
        {FILES.map((file, i) => {
          const hit = done && query.hits.includes(i);
          return (
            <li
              key={file}
              className={`relative flex h-7 items-center overflow-hidden rounded-lg px-2.5 font-mono text-[11.5px] transition-colors duration-300 ${
                hit ? "text-black" : "text-black/45"
              }`}
            >
              <motion.span
                className="absolute inset-y-0 left-0 rounded-lg bg-[#ff2d6f]/15"
                initial={false}
                animate={{ width: hit ? "100%" : "0%" }}
                transition={{ duration: 0.45, delay: hit ? query.hits.indexOf(i) * 0.12 : 0 }}
              />
              <span className="relative truncate">{file}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default RepoQuery;
