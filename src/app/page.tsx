import React from "react";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import HorizontalLine from "@/components/global/HorizontalLine";
import Experience from "@/components/home/Experience";
import Projects from "@/components/pow/Projects";
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
    </div>
  );
}

export default page;
