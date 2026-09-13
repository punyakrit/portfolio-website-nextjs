import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// The /hire and /services funnels (222 programmatic pages) were removed when the
// site was repositioned from client acquisition to AI engineering work. Anything
// still indexed gets a 308 to a real page instead of a 404, so existing link
// equity lands somewhere useful rather than being thrown away.
//
// Renamed from middleware.ts for Next 16. On Cloudflare this runs through
// OpenNext's Node-runtime proxy path, so it must not export `runtime`.
export function proxy(req: NextRequest) {
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
