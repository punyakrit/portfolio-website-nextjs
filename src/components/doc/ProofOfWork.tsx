import React from "react";
import Link from "next/link";
import { projects } from "@/lib/projectsData";

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Each entry: what it is, then where to look. One line of description, because
// one line is what someone scanning will actually read.
export default function ProofOfWork() {
  return (
    <div className="flex flex-col gap-5">
      {projects.map((project) => {
        const links: { label: string; href: string; external: boolean }[] = [];
        if (project.link) links.push({ label: "site", href: project.link, external: true });
        if (project.appStoreLink)
          links.push({ label: "app store", href: project.appStoreLink, external: true });
        if (project.github) links.push({ label: "source", href: project.github, external: true });
        links.push({
          label: "case study",
          href: `/pow/${slugify(project.title)}`,
          external: false,
        });

        return (
          <article key={project.title}>
            <div className="flex items-baseline justify-between gap-6">
              <h3 className="font-semibold">{project.title}</h3>
              <p className="shrink-0 text-[0.95rem]">
                {links.map((link, i) => (
                  <React.Fragment key={link.label}>
                    {i > 0 && <span className="text-muted-foreground"> · </span>}
                    {link.external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer">
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href}>{link.label}</Link>
                    )}
                  </React.Fragment>
                ))}
              </p>
            </div>

            <p className="mt-0.5 leading-relaxed">{project.summary}</p>
          </article>
        );
      })}
    </div>
  );
}
