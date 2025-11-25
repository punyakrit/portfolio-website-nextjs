import React from "react";
import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import HorizontalLine from "@/components/global/HorizontalLine";
import Experience from "@/components/home/Experience";
import Projects from "@/components/pow/Projects";
import Github from "@/components/home/Github";
import Stack from "@/components/home/Stack";
import MainBlogs from "@/components/blogs/MainBlogs";
export const metadata: Metadata = {
  title: "Punyakrit Singh Makhni | Full-Stack Developer Portfolio",
  description:
    "Welcome to my portfolio. I'm Punyakrit Singh Makhni, a full-stack developer specializing in React, Next.js, TypeScript, and modern web technologies. Explore my projects, experience, and skills.",
  keywords: [
    "Punyakrit Singh Makhni",
    "full-stack developer",
    "web developer portfolio",
    "React developer",
    "Next.js developer",
    "TypeScript developer",
    "software engineer",
    "portfolio website",
  ],
  alternates: {
    canonical: "/",
  },

};

function page() {
  return (
    <div>
      <Hero />
      <About />
      <HorizontalLine />
      <Experience completeView={false} />
      <HorizontalLine />  
      <Projects showAll={false} />
      <HorizontalLine />
      <Github />
      <HorizontalLine />
      <Stack/>
      <HorizontalLine />
      <MainBlogs/>
      <HorizontalLine />
    </div>
  );
}

export default page;
