"use client";

import * as React from "react";
import { useTheme } from "next-themes";

// A text link, not a button with an icon in a dropdown.
export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="cursor-pointer underline underline-offset-2 hover:decoration-[1.5px]"
      aria-label="Toggle colour theme"
    >
      {mounted ? (isDark ? "light" : "dark") : "theme"}
    </button>
  );
}
