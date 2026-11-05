"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { ModeToggle } from "@/components/global/ModeToggle";
import { socials } from "@/lib/socials";
import { CursorDot, ScrollBar } from "./Motion";

const link =
  "no-underline text-muted-foreground transition-colors hover:text-foreground";

// One bar for the whole site. On the home page the links are anchors into the
// page; everywhere else they lead back to it. Once the page moves, the bar
// lifts off into a floating pill.
function LandingNav({ home = false }: { home?: boolean }) {
  const { scrollY } = useScroll();
  const [lifted, setLifted] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setLifted(y > 40));

  return (
    <>
      <ScrollBar />
      <CursorDot />
      <nav className="fixed inset-x-0 top-0 z-40 px-3 pt-2 sm:px-5">
        <div
          className={`mx-auto flex h-12 items-center justify-between gap-4 rounded-full px-4 text-sm transition-all duration-300 sm:px-5 ${
            lifted
              ? "max-w-[46rem] border border-border bg-background/80 shadow-[0_14px_34px_-18px_rgba(16,19,26,.4)] backdrop-blur-md"
              : "max-w-[75rem] border border-transparent"
          }`}
        >
          <Link
            href={home ? "#top" : "/"}
            className="flex items-center gap-2 font-medium no-underline"
          >
            <span className="h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
            Punyakrit
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href={home ? "#work" : "/pow"} className={link}>
              Work
            </Link>
            <Link
              href={home ? "#experience" : "/#experience"}
              className={`${link} hidden sm:inline`}
            >
              Experience
            </Link>
            <a
              href={socials.resume}
              target="_blank"
              rel="noopener noreferrer"
              className={link}
            >
              Resume
            </a>
            <span className="text-muted-foreground">
              <ModeToggle />
            </span>
          </div>
        </div>
      </nav>
      <div className="h-14" aria-hidden="true" />
    </>
  );
}

export default LandingNav;
