import React from "react";
import type { projects } from "@/lib/projectsData";

type Project = (typeof projects)[number];

// Raw <img>, not next/image: there is no Images binding on the Worker, so
// /_next/image would add a subrequest and still serve the original bytes, and
// CloudFront 403s the optimizer's User-Agent-less fetch anyway.
//
// A website capture is never cropped, so a caption at the bottom of one
// screenshot or a headline at the top of another stays in the picture. On its
// own it shows at its natural shape; in a grid of cards `aspect` gives every
// frame the same height and the capture sits whole inside it. A phone app gets
// three of its App Store cards standing in a well, cut off at the bottom the
// way a shelf would be.
function Screenshot({
  project,
  aspect,
  eager = false,
  className = "",
}: {
  project: Project;
  /** CSS aspect-ratio for the frame, e.g. "16 / 10". Omit for the image's own. */
  aspect?: string;
  eager?: boolean;
  className?: string;
}) {
  const frame = `overflow-hidden rounded-[18px] bg-surface shadow-[0_30px_60px_-30px_rgba(16,19,26,.35)] ${className}`;
  const [w, h] = project.imageSize ?? [16, 9];

  if (project.category === "mobile" && project.images?.length) {
    return (
      <div
        className={`${frame} flex items-start justify-center gap-[5%] px-[8%] pt-[6%]`}
        style={{ aspectRatio: aspect ?? "16 / 9" }}
      >
        {project.images.slice(0, 3).map((src, i) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={src}
            src={src}
            alt=""
            width={w}
            height={h}
            loading={eager && i === 0 ? "eager" : "lazy"}
            decoding="async"
            className="w-[27%] rounded-t-md bg-background"
          />
        ))}
      </div>
    );
  }

  return (
    <div className={frame} style={aspect ? { aspectRatio: aspect } : undefined}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={project.image}
        alt=""
        width={w}
        height={h}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        decoding="async"
        className={aspect ? "h-full w-full object-contain" : "block h-auto w-full"}
      />
    </div>
  );
}

export default Screenshot;
