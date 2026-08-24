import React from "react";
import type { Activity } from "react-activity-calendar";
import { socials } from "@/lib/socials";
import Commits from "./Commits";

// Fetched on the server so the grid is in the initial HTML. Revalidated every
// 6 hours rather than hitting the API on every request.
async function getContributions(username: string): Promise<Activity[] | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { next: { revalidate: 60 * 60 * 6 } }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { contributions?: Activity[] };
    return Array.isArray(data.contributions) ? data.contributions : null;
  } catch {
    return null;
  }
}

export default async function CommitsSection() {
  const username = socials.github.split("/").pop() || "punyakrit";
  const contributions = await getContributions(username);

  if (!contributions) return null;

  return <Commits data={contributions} />;
}
