import React from "react";
import { skills } from "@/lib/skills";
import DotField from "./DotField";
import { Rise } from "./Motion";
import { WRAP } from "./Section";

const ROWS = [
  ["Claude", "OpenAI", "Gemini", "AI Agents", "MCP", "RAG", "Next.js", "React", "TypeScript", "Tailwind CSS", "React Native", "Expo"],
  ["Node.js", "Express", "Python", "FastAPI", "GraphQL", "WebSockets", "PostgreSQL", "Redis", "Prisma", "MongoDB", "Supabase", "AWS", "Cloudflare", "Docker"],
];

function Strip({ names, reverse }: { names: string[]; reverse?: boolean }) {
  const chips = names.map((name) => {
    const Icon = skills.find((s) => s.name === name)?.icon;
    return { name, Icon };
  });
  return (
    <div className="marquee">
      <ul className={`marquee-track ${reverse ? "marquee-track--back" : ""}`}>
        {[...chips, ...chips].map(({ name, Icon }, i) => (
          <li
            key={`${name}-${i}`}
            aria-hidden={i >= chips.length ? "true" : undefined}
            className="flex shrink-0 items-center gap-2.5 text-[clamp(1.25rem,2.4vw,1.875rem)] font-medium tracking-[-0.01em]"
          >
            {Icon && <Icon className="h-[0.95em] w-[0.95em] shrink-0" />}
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Tools() {
  return (
    <section id="stack" className="relative scroll-mt-20 overflow-hidden py-14 sm:py-20">
      <DotField />
      <div className={`${WRAP} relative`}>
        <Rise
          text="What I build with"
          className="font-display text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.05] tracking-[-0.02em]"
        />
      </div>
      <div className="relative mt-8 space-y-5 sm:mt-10 sm:space-y-7">
        <Strip names={ROWS[0]} />
        <Strip names={ROWS[1]} reverse />
      </div>
    </section>
  );
}

export default Tools;
