"use client";

import useUsername from "@/hooks/useUsername";

// Records the visit: mints a nanoid in localStorage, then upserts the User and
// increments UserLog.visitCount (with the request IP) via server actions.
// Renders nothing - it exists purely for the side effect, so /world has data.
export default function VisitRecorder() {
  useUsername();
  return null;
}
