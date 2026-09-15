import React from "react";
import { skills } from "@/lib/skills";

/**
 * Grouped by layer, not by popularity.
 *
 * The previous version rendered nine "core" pills followed by an "also work
 * with" wall of twenty-five more - thirty-four logos in a flat heap. For the
 * one question this section exists to answer ("is this person actually full
 * stack, or a frontend dev who has seen a database?") a flat heap is the worst
 * possible shape: the reader has to know which name belongs to which layer to
 * reconstruct the answer themselves.
 *
 * Labelling the layers makes the claim legible at a glance - interface, mobile,
 * server, data, infrastructure - and the shape of the list becomes the
 * argument. Ordering runs the way a request does: browser to server to
 * database to the machines underneath.
 */
const LAYERS: { label: string; items: string[] }[] = [
  { label: "interface", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
  { label: "mobile", items: ["React Native", "Expo"] },
  { label: "server", items: ["Node.js", "Express", "Python", "FastAPI", "GraphQL", "WebSockets"] },
  { label: "data", items: ["PostgreSQL", "Redis", "Prisma", "MongoDB", "Supabase"] },
  { label: "infrastructure", items: ["AWS", "Docker", "Kubernetes", "Nginx", "Linux"] },
  { label: "testing", items: ["Jest", "Testing Library"] },
];

// Everything real but not load-bearing for the full-stack claim. Kept as plain
// text rather than pills: still on the page for anyone scanning for a keyword,
// but visually subordinate so it cannot dilute the layers above it.
const ALSO = [
  "JavaScript",
  "HTML5",
  "CSS3",
  "Git",
  "GitHub",
  "Bun",
  "Vercel",
  "Clerk",
  "Postman",
  "Figma",
];

const byName = (name: string) => skills.find((s) => s.name === name);

function Stack() {
  return (
    <div className="px-4 sm:px-6 md:px-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Stack</h2>

      <dl className="space-y-5 sm:space-y-6">
        {LAYERS.map((layer) => {
          const resolved = layer.items
            .map(byName)
            .filter((s): s is (typeof skills)[number] => Boolean(s));
          if (resolved.length === 0) return null;

          return (
            <div
              key={layer.label}
              className="sm:flex sm:items-baseline sm:gap-5"
            >
              <dt className="mb-2 shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground/70 sm:mb-0 sm:w-32 sm:text-right">
                {layer.label}
              </dt>
              <dd className="flex flex-wrap gap-1.5 sm:gap-2">
                {resolved.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <span
                      key={skill.name}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-foreground/[0.06] px-2.5 py-1.5 text-[13px] font-medium"
                    >
                      <Icon className="h-3.5 w-3.5 opacity-80" aria-hidden />
                      {skill.name}
                    </span>
                  );
                })}
              </dd>
            </div>
          );
        })}
      </dl>

      <p className="mt-7 max-w-prose text-sm leading-relaxed text-muted-foreground/70 sm:pl-[9.25rem]">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em]">
          also
        </span>{" "}
        {ALSO.join(", ")}
      </p>
    </div>
  );
}

export default Stack;
