"use client";

import { usePathname } from "next/navigation";
import LandingNav from "@/components/landing/LandingNav";
import Close from "@/components/landing/Close";

// App-store support / privacy / delete-account pages ship bare: no nav, no
// footer, no theme toggle. Reviewers land on them directly and they must read
// as standalone legal documents. The home page composes its own shell.
const CLEAN_PAGE_PATHS = [
  "/",
  "/craft-trading-support",
  "/craft-trading-privacy",
  "/delete-account",
  "/tap-master",
  "/tap-master/privacy",
  "/privacy",
];

// Every other page gets the same bar and the same closing band as the home
// page, so /pow and a case study read as rooms in one house.
export function SupportPageLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  const isCleanPage = CLEAN_PAGE_PATHS.includes(pathname);

  if (isCleanPage) return <>{children}</>;

  return (
    <>
      <LandingNav />
      <main>{children}</main>
      <Close />
    </>
  );
}
