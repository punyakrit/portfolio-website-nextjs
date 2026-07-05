import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Legacy India-location slugs (cities, states, and the generic "india") that
// previously had programmatic /hire pages. Those pages have been removed, so we
// 308-redirect any old, indexed URLs to the relevant parent instead of 404ing.
const INDIA_LOCATION_SLUGS = new Set<string>([
  // Cities
  "mumbai", "delhi", "bangalore", "bengaluru", "hyderabad", "chennai", "kolkata",
  "pune", "ahmedabad", "jaipur", "lucknow", "chandigarh", "noida", "gurgaon",
  "gurugram", "kochi", "thiruvananthapuram", "indore", "bhopal", "nagpur",
  "coimbatore", "visakhapatnam", "surat", "vadodara", "patna", "kanpur", "mysore",
  "mangalore", "trichy", "madurai",
  // States
  "maharashtra", "karnataka", "tamil-nadu", "telangana", "kerala", "gujarat",
  "rajasthan", "west-bengal", "uttar-pradesh", "madhya-pradesh", "punjab",
  "haryana", "andhra-pradesh", "odisha", "bihar",
  // Generic
  "india",
]);

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // /hire/location/[india] -> /hire
  const locationMatch = pathname.match(/^\/hire\/location\/([^/]+)\/?$/);
  if (locationMatch && INDIA_LOCATION_SLUGS.has(locationMatch[1])) {
    return NextResponse.redirect(new URL("/hire", req.url), 308);
  }

  // /hire/[skill]/in/[india] -> /hire/[skill]
  const comboMatch = pathname.match(/^\/hire\/([^/]+)\/in\/([^/]+)\/?$/);
  if (comboMatch && INDIA_LOCATION_SLUGS.has(comboMatch[2])) {
    return NextResponse.redirect(new URL(`/hire/${comboMatch[1]}`, req.url), 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/hire/location/:slug", "/hire/:skill/in/:location"],
};
