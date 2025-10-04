import { motion } from "motion/react";
import Link from "next/link";
import React from "react";

function Present() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 2 }}
      className=""
    >
      <motion.h1
        className="text-lg sm:text-xl font-bold"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 2.2 }}
        whileHover={{ scale: 1.02 }}
      >
        Present
      </motion.h1>
      <motion.p
        className="text-white/70 text-sm sm:text-md leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 2.4 }}
        whileHover={{ color: "rgba(255, 255, 255, 0.9)" }}
      >
        Currently I&apos;m focused on building innovative projects like Codelens, Pulse, and Arcane. 
        I love creating full-stack applications that solve real problems and push the boundaries of what&apos;s possible. 
        Always excited to collaborate on new ideas and take on challenging projects.{" "}
        <Link
          href="https://cal.com/punyakrit"
          target="_blank"
          className="text-white/70 text-sm sm:text-md underline leading-relaxed"
        >
          Let&apos;s work together.
        </Link>
      </motion.p>
    </motion.div>
  );
}

export default Present;
