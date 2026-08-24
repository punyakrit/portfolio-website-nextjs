import React from "react";

// Plain prose. Icon grids say "I can install packages"; grouped sentences say
// what someone actually reaches for and why.
const GROUPS: { label: string; items: string }[] = [
  { label: "ai", items: "agents, rag, evals, gemini, openai, claude, pgvector" },
  { label: "backend", items: "python, fastapi, node, postgres, redis" },
  { label: "web", items: "typescript, next.js, react, react native" },
  { label: "infra", items: "docker, aws, kubernetes, ci/cd" },
];

export default function Stack() {
  return (
    <dl className="flex flex-col gap-2.5">
      {GROUPS.map((group) => (
        <div key={group.label} className="sm:flex sm:gap-4">
          <dt className="shrink-0 text-muted-foreground sm:w-20">{group.label}</dt>
          <dd className="leading-relaxed">{group.items}</dd>
        </div>
      ))}
    </dl>
  );
}
