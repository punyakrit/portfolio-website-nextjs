"use client";
import React from "react";
import IntroSection from "../../components/home/IntroSection";
import { motion } from "motion/react";
import AboutMe from "../../components/home/AboutMe";
import Present from "../../components/home/Present";
import Skills from "../../components/home/Skills";

function page() {
  return (
    <main className="container mx-auto max-w-3xl overflow-hidden px-4">
      <div className="flex flex-col ">
        <section>
          <IntroSection />
        </section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.hr
            className="h-0.5 bg-white/30"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />
        </motion.div>
        <section className="mt-10">
          <AboutMe />
        </section>
        <section className="mt-10">
          <Present />
        </section>
        <section className="mt-10">
          <Skills />
        </section>
        <section className="mt-10">
          
        </section>
      </div>

    </main>
  );
}

export default page;
