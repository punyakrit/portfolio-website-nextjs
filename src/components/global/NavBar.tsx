"use client";

import Image from "next/image";
import React, { useState } from "react";
import { ModeToggle } from "./ModeToggle";
import Music from "./Music";
import Link from "next/link";
import { env } from "@/lib/env";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const image = env.NEXT_PUBLIC_CLOUDFRONT_URL + "/img.jpg";

  return (
    <nav
      className="h-20 backdrop-blur-sm fixed top-0 left-0 right-0 max-w-4xl mx-auto px-4 sm:px-8 md:px-16 py-4 z-20"
      style={{ fontFamily: "var(--font-fondamento)" }}
    >
      <div className="flex justify-between items-center h-full">
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
          <Link href="/" className="cursor-pointer hover:underline delay-700">
            <Image
              src={image}
              alt="logo"
              width={100}
              height={100}
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl object-cover"
            />
          </Link>
          <div className="hidden md:flex gap-4">
            <Link href="/pow" className="text-base md:text-lg cursor-pointer hover:underline delay-700">
              projects
            </Link>
            <Link href="/work" className="text-base md:text-lg cursor-pointer hover:underline delay-700">
              work
            </Link>
            <Link href="/blogs" className="text-base md:text-lg cursor-pointer hover:underline transition duration-700">
              blogs
            </Link>
          </div>
        </div>
        <div className="flex gap-2 sm:gap-3 md:gap-4 items-center">
          <div className="hidden sm:block">
            <Music />
          </div>
          <div>
            <ModeToggle />
          </div>
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-foreground transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-foreground transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-foreground transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 backdrop-blur-sm bg-background/95 border-t border-border">
          <div className="flex flex-col px-4 py-4 gap-4">
            <Link
              href="/pow"
              className="text-lg cursor-pointer hover:underline delay-700"
              onClick={() => setIsMenuOpen(false)}
            >
              proof-of-work
            </Link>
            <Link
              href="/work"
              className="text-lg cursor-pointer hover:underline delay-700"
              onClick={() => setIsMenuOpen(false)}
            >
              work
            </Link>
            <Link
              href="/blogs"
              className="text-lg cursor-pointer hover:underline transition duration-700"
              onClick={() => setIsMenuOpen(false)}
            >
              blogs
            </Link>
            <div className="sm:hidden pt-2 border-t border-border">
              <Music />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
