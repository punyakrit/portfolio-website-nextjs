"use client";
import React from "react";
import IntroSection from "../../components/home/IntroSection";
import { motion } from "motion/react";
import AboutMe from "../../components/home/AboutMe";
import Present from "../../components/home/Present";
import Skills from "../../components/home/Skills";
import Experience from "../../components/home/Experience";
import Project from "../../components/home/Project";
import Footer from "../../components/home/Footer";

function page() {
  return (
    <main className="container mx-auto max-w-3xl overflow-hidden px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col ">
        <section>
          <IntroSection />
        </section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <motion.hr
            className="h-0.5 bg-white/30"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />
        </motion.div>
        <section className="mt-8 sm:mt-10">
          <AboutMe />
        </section>
        <section className="mt-8 sm:mt-10">
          <Present />
        </section>
        <section className="mt-8 sm:mt-10">
          <Skills />
        </section>
        <section className="mt-8 sm:mt-10">
          <Experience />
        </section>
        <section className="mt-8 sm:mt-10">
          <Project />
        </section>
        <footer className="mt-8 sm:mt-10 pb-20 sm:pb-10">
          <Footer />
        </footer>

      </div>

    </main>
  );
}

export default page;
