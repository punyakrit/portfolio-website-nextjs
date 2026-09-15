import React from "react";
import { socials } from "@/lib/socials";
import { env } from "@/lib/env";

// The shimmer sweep used to live in globals.css. It is scoped here instead so
// this section carries its own animation rather than depending on a global
// keyframe that the document stylesheet no longer defines. React 19 hoists a
// <style> with href + precedence into <head> and dedupes it.
const SHIMMER_KEYFRAMES = `@keyframes cta-shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}`;

function Cta() {
  const profileImage = env.NEXT_PUBLIC_CLOUDFRONT_URL + "/img.jpg";

  return (
    <section className="px-4 sm:px-6 md:px-8" aria-labelledby="contact-heading">
      <style href="cta-shimmer" precedence="default">
        {SHIMMER_KEYFRAMES}
      </style>
      <div className="flex justify-center border-dashed border-2 border-black/5 dark:border-white/5 rounded-2xl">
        <div className="relative w-full">
          {/* Was p-12 sm:p-16, which made this block taller than the viewport
              on a laptop for the sake of one button. */}
          <div className="relative rounded-2xl px-6 py-10 sm:px-10 sm:py-12 text-center">
            <div className="relative z-10">
              {/* This read "Open to full stack engineer roles", word for word
                  the same as the status line in the hero. A closing section
                  that repeats the opening one wastes the last thing a reader
                  sees, so it now addresses them instead of restating him. */}
              <h2
                id="contact-heading"
                className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground mb-3"
              >
                Hiring for a full stack role?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-7 max-w-md mx-auto leading-relaxed">
                I&apos;m looking for my next one. Happy to walk through any of
                the work above.
              </p>
              <div className="flex justify-center">
                <div className="bg-gradient-to-b from-gray-200 to-gray-300 dark:from-[#252525] dark:to-[#3B3B3B] rounded-[10px] p-[1px] relative overflow-hidden w-auto">
                  <a
                    href={socials.cal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-full bg-white dark:bg-[#1C1C1C] rounded-[10px] no-underline hover:no-underline text-black dark:text-white text-sm sm:text-md px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-center transition-all group relative overflow-hidden touch-manipulation active:opacity-75"
                    style={
                      {
                        "--x": "-90.45457%",
                        "--spread": "90deg",
                        "--shimmer-color": "#ffffff",
                        "--radius": "10px",
                        "--speed": "3s",
                        "--cut": "0.05em",
                        WebkitTapHighlightColor: "transparent",
                        WebkitTouchCallout: "none",
                        WebkitUserSelect: "none",
                        userSelect: "none",
                      } as React.CSSProperties
                    }
                    aria-label="Book a call with Punyakrit"
                  >
                    <div
                      className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500 bg-[linear-gradient(45deg,transparent_30%,rgba(0,0,0,0.1)_50%,transparent_70%)] dark:bg-[linear-gradient(45deg,transparent_30%,rgba(255,255,255,0.3)_50%,transparent_70%)]"
                      style={{
                        backgroundSize: "200% 100%",
                        animation: "cta-shimmer 3s ease-in-out infinite",
                      }}
                    />

                    <div className="flex items-center gap-2 group-hover:gap-6 sm:group-hover:gap-12 transition-all duration-300 relative z-20">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          alt="Punyakrit Singh Makhni"
                          className="w-full h-full object-cover"
                          src={profileImage}
                        />
                      </div>
                      <div className="flex items-center gap-0 absolute left-[28px] sm:left-[30px] transform -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-plus w-2 h-2 sm:w-3 sm:h-3"
                          aria-hidden="true"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center text-[8px] sm:text-[10px]">
                          You
                        </div>
                      </div>
                      <span
                        className="whitespace-nowrap relative block text-sm sm:text-base"
                        style={{
                          maskImage:
                            "linear-gradient(-75deg, rgba(255,255,255,1) calc(var(--x) + 20%), rgba(255,255,255,0.1) calc(var(--x) + 30%), rgba(0,0,0,1) calc(var(--x) + 100%))",
                        }}
                      >
                        Book a call
                      </span>
                    </div>
                    {/* The ring gradient lives in `style` rather than an
                        arbitrary Tailwind value: --primary is a hex, so the old
                        `hsl(var(--primary)/50%)` parsed to nothing and the ring
                        silently disappeared. color-mix works with any colour. */}
                    <span
                      className="absolute inset-0 z-10 block rounded-[inherit] p-px"
                      style={{
                        backgroundImage:
                          "linear-gradient(-75deg, transparent calc(var(--x) + 20%), color-mix(in oklab, var(--primary) 50%, transparent) calc(var(--x) + 25%), transparent calc(var(--x) + 100%))",
                        mask: "linear-gradient(rgb(0, 0, 0), rgb(0, 0, 0)) content-box exclude, linear-gradient(rgb(0, 0, 0), rgb(0, 0, 0))",
                      }}
                    />
                  </a>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Remote • US and European time zones
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cta;
