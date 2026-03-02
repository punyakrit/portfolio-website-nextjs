"use client";

import { usePathname } from "next/navigation";
import NavBar from "@/components/global/NavBar";
import Footer from "@/components/home/Footer";
import HorizontalLine from "@/components/global/HorizontalLine";
import FixedBottomCta from "@/components/global/FixedBottomCta";

const SUPPORT_PAGE_PATH = "/craft-trading-support";

export function SupportPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isSupportPage = pathname === SUPPORT_PAGE_PATH;

  if (isSupportPage) {
    return <>{children}</>;
  }

  return (
    <>
      <FixedBottomCta />
      <div className="max-w-4xl container mx-auto">
        <div
          className="
      h-full w-full
      md:bg-[repeating-linear-gradient(135deg,rgba(0,0,0,0.06)_0_1px,transparent_1px_6px)] md:dark:bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.06)_0_1px,transparent_1px_6px)]
      md:border-x md:dark:border-[#1b1b1b]
      flex overflow-auto
    "
        >
          <div className="flex-1 md:mx-14 h-full dark:bg-[#121212] bg-white border-x dark:border-[#1b1b1b] z-10">
            <NavBar />
            <div className="mt-12">
              {children}
              <HorizontalLine />
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
