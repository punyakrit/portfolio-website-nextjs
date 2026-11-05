import React from "react";
import Link from "next/link";
import { WRAP } from "@/components/landing/Section";

export default function NotFound() {
  return (
    <div className={`${WRAP} py-20 sm:py-32`}>
      <p className="font-serif text-lg italic text-muted-foreground">
        Nothing at this address.
      </p>
      <h1 className="mt-3 font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.02] tracking-[-0.025em]">
        Page not found
      </h1>
      <p className="mt-5 max-w-[48ch] text-lg leading-[1.5] text-muted-foreground">
        The link may be old. Try <Link href="/" className="text-foreground">the home page</Link> or{" "}
        <Link href="/pow" className="text-foreground">what I&apos;ve built</Link>.
      </p>
    </div>
  );
}
