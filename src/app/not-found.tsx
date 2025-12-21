import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Briefcase, FileText } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Punyakrit Singh Makhni",
  description:
    "The page you're looking for doesn't exist. Return to Punyakrit Singh Makhni's portfolio to explore web development projects and services.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="space-y-6 max-w-md">
        <h1 className="text-6xl sm:text-8xl font-bold text-muted-foreground/30">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button asChild>
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/pow">
              <Briefcase className="w-4 h-4 mr-2" />
              View Projects
            </Link>
          </Button>
        </div>

        <div className="pt-8 border-t border-border mt-8">
          <p className="text-sm text-muted-foreground mb-4">
            Looking to hire a freelance developer?
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/work">
                <FileText className="w-4 h-4 mr-2" />
                My Experience
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/blogs">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Read Blog
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="https://cal.com/punyakrit" target="_blank">
                Book a Call
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
