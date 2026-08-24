"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ModeToggle } from "@/components/global/ModeToggle";

// One centred column. No nav bar - the links live in the masthead, the way
// they would in a document.
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
  const isHome = pathname === "/";

  if (isCleanPage) return <>{children}</>;

  return (
    <div className="mx-auto w-full max-w-[46rem] px-6 py-14 sm:px-8 sm:py-20">
      {!isHome && (
        <p className="mb-10 text-[0.95rem]">
          <Link href="/">← punyakrit singh makhni</Link>
        </p>
      )}

      {children}

      <footer className="mt-20 flex items-baseline justify-between gap-6 border-t border-rule pt-5 text-[0.9rem] text-muted-foreground">
        <span>punyakrit singh makhni</span>
        <ModeToggle />
      </footer>
    </div>
  );
}
