import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    // SupportPageLayout no longer supplies horizontal padding - each page
    // brings its own, the way the restored sections do.
    <div className="px-4 sm:px-6 md:px-8 py-12">
      <h1 className="text-[1.4rem] font-semibold tracking-tight">
        Page not found
      </h1>
      <p className="mt-2 leading-relaxed">
        That page doesn&apos;t exist. Try{" "}
        <Link href="/">the homepage</Link> or{" "}
        <Link href="/pow">what i&apos;ve built</Link>.
      </p>
    </div>
  );
}
