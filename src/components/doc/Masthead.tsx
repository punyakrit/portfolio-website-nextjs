import React from "react";
import { env } from "@/lib/env";
import { socials } from "@/lib/socials";

// Photo, name, one line about what I do, and the links. Nothing else.
export default function Masthead() {
  const image = env.NEXT_PUBLIC_CLOUDFRONT_URL + "/img.jpg";

  const links = [
    { label: "x", href: socials.x },
    { label: "github", href: socials.github },
    { label: "linkedin", href: socials.linkedin },
    { label: "mail", href: `mailto:${socials.email}` },
    { label: "resume", href: socials.resume },
    { label: "call", href: socials.cal },
  ];

  return (
    <header className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
      <img
        src={image}
        alt="Punyakrit Singh Makhni"
        className="h-24 w-20 shrink-0 object-cover grayscale"
      />

      <div className="min-w-0">
        <h1 className="text-[1.4rem] font-semibold tracking-tight">
          Punyakrit Singh Makhni
        </h1>

        <p className="mt-1.5 leading-relaxed">
          ai engineer. i build multi-model agent systems, and make them reliable
          enough to ship.
        </p>

        <p className="mt-2.5 text-[0.95rem]">
          {links.map((link, i) => (
            <React.Fragment key={link.label}>
              {i > 0 && <span className="text-muted-foreground"> · </span>}
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            </React.Fragment>
          ))}
        </p>

        <p className="mt-2.5 text-[0.95rem] text-muted-foreground">
          open to ai engineer roles · remote
        </p>
      </div>
    </header>
  );
}
