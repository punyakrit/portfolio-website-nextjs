import React from "react";
import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <div>
      <h1 className="text-[1.4rem] font-semibold tracking-tight">
        Project not found
      </h1>
      <p className="mt-2 leading-relaxed">
        That project doesn&apos;t exist. See <Link href="/pow">everything i&apos;ve built</Link>.
      </p>
    </div>
  );
}
