import React from "react";
import { MAP } from "@/lib/startupMap";
import { socials } from "@/lib/socials";
import NightMap from "./NightMap";
import { Magnetic, Rise } from "./Motion";
import { Reveal } from "./Reveal";
import { WRAP } from "./Section";

const linkClass = "no-underline transition-opacity hover:opacity-70";

function Close() {
  return (
    <footer id="contact" className="relative scroll-mt-16 overflow-hidden bg-ink text-ink-foreground">
      <div
        className="pointer-events-none absolute right-[-6%] top-1/2 hidden w-[78%] -translate-y-1/2 opacity-90 lg:block"
        style={{ aspectRatio: `${MAP.cols} / ${MAP.rows}` }}
      >
        <NightMap />
      </div>
      <div className="absolute inset-y-0 left-0 hidden w-1/2 bg-gradient-to-r from-ink via-ink/85 to-transparent lg:block" />

      <div className={`${WRAP} relative py-20 sm:py-28`}>
        <Reveal>
          <Rise
            text="Hiring an engineer?"
            className="font-display max-w-[11ch] text-[clamp(2.75rem,6vw,5rem)] leading-[1] tracking-[-0.03em]"
          />
          <p className="mt-5 max-w-[34ch] text-lg leading-relaxed opacity-80">
            Remote, on IST, working US hours. I reply within 24 hours.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Magnetic>
              <a
                href={socials.cal}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center rounded-full bg-signal px-6 font-medium text-ink no-underline"
              >
                Book a 15-minute call
              </a>
            </Magnetic>
            <a href={`mailto:${socials.email}`} className="underline-offset-4">
              Email me
            </a>
          </div>
        </Reveal>

        <div
          className="mt-10 w-full lg:hidden"
          style={{ aspectRatio: `${MAP.cols} / ${MAP.rows}` }}
        >
          <NightMap />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 text-sm lg:mt-28">
          <div className="flex gap-5">
            <a href={socials.github} target="_blank" rel="noopener noreferrer" className={linkClass}>GitHub</a>
            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>LinkedIn</a>
            <a href={socials.x} target="_blank" rel="noopener noreferrer" className={linkClass}>X</a>
            <a href={socials.resume} target="_blank" rel="noopener noreferrer" className={linkClass}>Resume</a>
          </div>
          <p className="opacity-70">Designed and built by Punyakrit</p>
        </div>
      </div>
    </footer>
  );
}

export default Close;
