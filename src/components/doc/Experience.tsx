import React from "react";
import { experience } from "@/lib/experience";

function year(value: string) {
  if (value === "Present") return "present";
  return new Date(value)
    .toLocaleDateString("en-US", { month: "short", year: "numeric" })
    .toLowerCase();
}

// Role, where, when, and one line. That's it.
export default function Experience() {
  return (
    <div className="flex flex-col gap-5">
      {experience.map((role) => (
        <article key={role.company}>
          <div className="flex items-baseline justify-between gap-6">
            <h3 className="font-semibold">
              {role.url ? (
                <a href={role.url} target="_blank" rel="noopener noreferrer">
                  {role.position}
                </a>
              ) : (
                role.position
              )}
            </h3>
            <p className="shrink-0 text-[0.9rem] text-muted-foreground">
              {year(role.startDate)} – {year(role.endDate)}
            </p>
          </div>
          <p className="text-[0.9rem] text-muted-foreground">
            {role.company}
          </p>
          <p className="mt-1 leading-relaxed">{role.oneLiner}</p>
        </article>
      ))}
    </div>
  );
}
