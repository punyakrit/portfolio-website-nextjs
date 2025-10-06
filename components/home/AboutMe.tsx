import React from "react";
import { motion } from "motion/react";

function AboutMe() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className=""
    >
      <motion.h1 
        className="text-lg sm:text-xl font-bold"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        whileHover={{ scale: 1.02 }}
      >
        About Me
      </motion.h1>
      <motion.p 
  className="text-white/70 text-sm sm:text-md leading-relaxed"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1.2, delay: 1.6 }}
  whileHover={{ color: "rgba(255, 255, 255, 0.9)" }}
>
  I&apos;m Punyakrit, a full-stack developer who thrives on turning ambitious 
  ideas into production-ready products. With 2+ years shipping features at 
  startups, I bring expertise in React, Node.js, and cloud technologies to 
  build applications that scale. I believe great code tells a story - clean, 
  efficient, and purposeful. When I&apos;m not solving complex problems, 
  I&apos;m contributing to open source or experimenting with the latest tech. 
  Always curious, always shipping - let&apos;s create something remarkable.
</motion.p>
    </motion.div>
  );
}

export default AboutMe;
