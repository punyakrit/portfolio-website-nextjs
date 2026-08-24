import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// The /hire and /services funnels (222 programmatic pages) were removed when the
// site was repositioned from client acquisition to AI engineering work. Anything
// still indexed gets a 308 to a real page instead of a 404, so existing link
// equity lands somewhere useful rather than being thrown away.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skill and role pages described what I build -> the project write-ups do that now.
  if (/^\/hire\/(?!location\b)[^/]+/.test(pathname)) {
    return NextResponse.redirect(new URL("/pow", req.url), 308);
  }

  // Everything else under /hire or /services was positioning copy -> homepage.
  if (pathname === "/hire" || pathname.startsWith("/hire/") ||
      pathname === "/services" || pathname.startsWith("/services/")) {
    return NextResponse.redirect(new URL("/", req.url), 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/hire", "/hire/:path*", "/services", "/services/:path*"],
};
