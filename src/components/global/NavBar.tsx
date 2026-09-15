"use client";

import React from "react";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { socials } from "@/lib/socials";

// The old bar also carried { href: "/work", label: "Work" }. src/app/work/** was
// deleted with the rest of the hire funnel and next.config.ts now 308s /work back
// to /, so the link was a guaranteed round trip to the page you were already on.
// /world is deliberately absent too: it is a noindex test page kept out of the
// sitemap.
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/pow", label: "Projects" },
];

function NavBar() {
  const pathname = usePathname();
  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <nav className="fixed top-0 left-0 right-0 z-20 mx-auto flex h-16 max-w-4xl items-center justify-between bg-background/60 px-4 backdrop-blur-md sm:px-6 md:px-8">
      <div className="flex items-center gap-4 sm:gap-6">
        {navLinks.map((link) => {
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-sm no-underline transition-colors sm:text-base ${
                active
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
              {active && (
                <motion.span
                  layoutId="navbar-active-indicator"
                  className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-foreground"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
        <Link
          href={socials.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground no-underline transition-colors hover:text-foreground sm:text-base"
        >
          Resume
        </Link>
      </div>
      <ModeToggle />
    </nav>
  );
}

export default NavBar;
