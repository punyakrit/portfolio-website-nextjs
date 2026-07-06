"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Autoplay video with image fallback.
// Small client island: the surrounding card is server-rendered, only the
// video's IntersectionObserver-driven play/pause needs the browser.
function ProjectMedia({
  video,
  image,
  alt,
  isMobile,
}: {
  video: string;
  image: string;
  alt: string;
  isMobile: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
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
  }, []);

  if (video) {
    return (
      <video
        ref={videoRef}
        src={video}
        muted
        loop
        playsInline
        autoPlay
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
