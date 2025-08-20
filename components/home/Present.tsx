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
        className="text-xl font-bold"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 2.2 }}
        whileHover={{ scale: 1.02 }}
      >
        Present
      </motion.h1>
      <motion.p
        className="text-white/70 text-md leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 2.4 }}
        whileHover={{ color: "rgba(255, 255, 255, 0.9)" }}
      >
        Currently I work as a Full-Stack Developer at AgentProd, where I build
        and ship production-grade web applications. In my free time I freelance
        & work on my own projects! I&apos;m always looking for new things to work on,
        so if you are hiring, feel free to reach-out.{" "}
        <Link
          href="https://cal.com/punyakrit"
          target="_blank"
          className="text-white/70 text-md underline leading-relaxed"
        >
          Contact me.
        </Link>
      </motion.p>
    </motion.div>
  );
}

export default Present;
