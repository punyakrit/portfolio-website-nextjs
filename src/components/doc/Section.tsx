import React from "react";

// A section is a lowercase label, a hairline, and its contents. That is the
// entire layout system.
export default function Section({
  label,
  id,
  children,
  className = "",
}: {
  label: string;
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`mt-14 ${className}`} aria-labelledby={id ? `${id}-label` : undefined}>
      <h2 id={id ? `${id}-label` : undefined} className="doc-label">
        {label}
      </h2>
      {children}
    </section>
  );
}
