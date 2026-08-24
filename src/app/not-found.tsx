import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div>
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
