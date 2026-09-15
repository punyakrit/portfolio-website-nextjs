"use client";

import { usePathname } from "next/navigation";
import NavBar from "@/components/global/NavBar";
import Footer from "@/components/home/Footer";
import HorizontalLine from "@/components/global/HorizontalLine";

// App-store support / privacy / delete-account pages ship bare: no nav, no
// footer, no theme toggle. Reviewers land on them directly and they must read
// as standalone legal documents. Unchanged from the document-UI version.
const CLEAN_PAGE_PATHS = [
  "/craft-trading-support",
  "/craft-trading-privacy",
  "/delete-account",
  "/tap-master",
  "/tap-master/privacy",
  "/privacy",
];

export function SupportPageLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  const isCleanPage = CLEAN_PAGE_PATHS.includes(pathname);

  if (isCleanPage) return <>{children}</>;

  return (
    // max-w-2xl (42rem / 672px), down from max-w-4xl (896px) via max-w-3xl.
    // Sections add px-4 / sm:px-6 / md:px-8 of their own, so the actual measure
    // is ~608px - about 70 characters at the 16px body size, inside the 45-75
    // that reads comfortably. Hero is full-bleed inside this column and its
    // `sizes` attribute encodes this width. NavBar is fixed at h-16 (64px), so
    // the content wrapper reserves pt-20 (80px) - less than the bar height puts
    // the first line underneath it.
    <div className="mx-auto w-full max-w-2xl">
      <NavBar />
      <div className="pt-20">
        {children}
        <HorizontalLine />
        <Footer />
      </div>
    </div>
  );
}
