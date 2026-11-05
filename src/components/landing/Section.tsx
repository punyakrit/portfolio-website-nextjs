import React from "react";

export const WRAP = "mx-auto w-full max-w-[78rem] px-5 sm:px-8 lg:px-12";

// The title stays in the left rail while its section scrolls past.
// `tight` is for pages that stack several short sections, like a case study.
function Section({
  id,
  title,
  tight = false,
  children,
}: {
  id?: string;
  title: string;
  tight?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`${WRAP} scroll-mt-16`}>
      <div
        className={`grid gap-x-8 border-t border-border lg:grid-cols-12 ${
          tight ? "gap-y-4 py-10 sm:py-12" : "gap-y-8 py-14 sm:py-20"
        }`}
      >
        <h2 className="font-display text-2xl leading-tight sm:text-3xl lg:sticky lg:top-24 lg:col-span-3 lg:self-start">
          {title}
        </h2>
        <div className="min-w-0 lg:col-span-9">{children}</div>
      </div>
    </section>
  );
}

export default Section;
