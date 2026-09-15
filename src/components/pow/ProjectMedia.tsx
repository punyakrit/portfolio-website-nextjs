"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Autoplay video with image fallback.
// Small client island: the surrounding card is server-rendered, only the
// video's IntersectionObserver-driven play/pause needs the browser.
//
// `still` is for cards that are rendered but deliberately not meant to be
// watched - the blurred teaser on the home page. Those sit in the viewport, so
// the observer would happily stream a multi-megabyte MP4 for a card the reader
// cannot see through the blur. In still mode the <video> keeps its exact box
// and shows the poster frame instead, and nothing is fetched.
function ProjectMedia({
  video,
  image,
  alt,
  isMobile,
  still = false,
}: {
  video: string;
  image: string;
  alt: string;
  isMobile: boolean;
  still?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (still) return;
    const el = videoRef.current;
    if (!el) return;
    // React sets `muted` as a DOM property and never serialises it into the
    // SSR markup, so the prerendered element is autoplay-without-muted and
    // Chrome can refuse the first play() until hydration catches up. Setting
    // it here closes that window.
    el.muted = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [still]);

  if (video) {
    return (
      <video
        ref={videoRef}
        src={video}
        poster={image}
        preload={still ? "none" : "metadata"}
        muted
        loop
        playsInline
        autoPlay={!still}
        className={cn(
          "pointer-events-none w-full h-full transition-transform duration-700 ease-out group-hover:scale-105",
          isMobile ? "object-contain" : "object-cover"
        )}
      />
    );
  }

  return (
    <Image
      src={image}
      alt={alt}
      fill
      className={cn(
        "pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105",
        isMobile ? "object-contain" : "object-cover"
      )}
      sizes="(max-width: 768px) 100vw, 600px"
    />
  );
}

export default ProjectMedia;
