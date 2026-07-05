"use client";

import React from "react";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { socials } from "@/lib/socials";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/pow", label: "Projects" },
  { href: "/work", label: "Work" },
];

function NavBar() {
  const pathname = usePathname();
  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <nav className="fixed top-0 left-0 right-0 z-20 max-w-4xl mx-auto h-16 px-4 sm:px-8 md:px-16 flex items-center justify-between bg-background/60 backdrop-blur-md">
      <div className="flex items-center gap-4 sm:gap-6">
        {navLinks.map((link) => {
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-sm sm:text-base transition-colors ${
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
          className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors"
        >
          Resume
        </Link>
      </div>
      <ModeToggle />
    </nav>
  );
}

export default NavBar;
