"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Copy, Check } from "lucide-react";

export default function EmailCopy({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — no-op
    }
  };

  return (
    <span className="inline-flex items-center gap-1.5 align-middle">
      <Link
        href={`mailto:${email}`}
        className="text-indigo-600 dark:text-indigo-400 underline decoration-indigo-500/30 underline-offset-4 hover:decoration-indigo-500 transition-colors"
      >
        {email}
      </Link>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Email copied" : "Copy email address"}
        className="inline-flex items-center justify-center rounded p-0.5 text-muted-foreground/60 hover:text-foreground transition-colors"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-emerald-500" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>
    </span>
  );
}
