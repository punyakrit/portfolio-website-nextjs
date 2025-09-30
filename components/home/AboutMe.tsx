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
        I&apos;m Punyakrit, a full-stack developer who loves taking ideas from 0 →
        100 and turning them into products people actually use. When I&apos;m not
        buried in commits or spinning up APIs, you&apos;ll catch me tinkering with
        side projects, experimenting with new frameworks, or building tools just
        for the fun of it. Always curious, always building — let&apos;s create
        something exceptional.
      </motion.p>
    </motion.div>
  );
}

export default AboutMe;
