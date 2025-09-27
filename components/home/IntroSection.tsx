"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

function IntroSection() {
  const [isHovered, setIsHovered] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const texts = [
    "I'm a software engineer",
    "I'm a product builder",
    "I'm a problem solver",
    "I'm a creative developer",
    "I'm a tech enthusiast",
    "I'm a software engineer",
  ];

  useEffect(() => {
    if (!isHovered) {
      setCurrentTextIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [isHovered, texts.length]);

  return (
    <motion.div
      className="flex flex-col gap-4 py-6 mt-6 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-end gap-4">
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative w-24 h-24 ">
              <Image
                src="/img.jpg"
                alt="Profile"
                fill
                className="rounded-2xl border-2 border-white/20 hover:border-white/40 transition-colors duration-300 object-cover"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="cursor-pointer pr-20"
          >
            <motion.h1
              className="text-2xl font-bold text-nowrap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Hello, I&apos;m Punyakrit
            </motion.h1>
            <motion.p
              className="text-white/70 text-nowrap relative h-6 overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <motion.span
                key={currentTextIndex}
                className="absolute top-0 left-0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                }}
              >
                {texts[currentTextIndex]}
              </motion.span>
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group"
        >
          <Link href={"https://drive.google.com/file/d/1T5euVkJpZwOhrWXoZJZZajqObSU60Nly/view?usp=sharing"} target="_blank">
            <div className="text-md text-white/70 font-semibold md:flex hidden text-nowrap relative">
              <span>Hiring? Check out My CV.</span>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-center" />
            </div>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default IntroSection;
