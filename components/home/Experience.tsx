"use client";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import React from "react";

const ExperienceArray = [
  {
    company: "AgentProd",
    position: "Full-Stack Software Engineer",
    date: "2024 - Present",
    description:
      "Part of a lean startup team where I own features from idea to production. Shipped web apps using Next.js, Supabase, and FastAPI, and managed deployments with Docker + EC2. Comfortable wearing multiple hats and moving fast.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

function Experience() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 4.4 }}
    >
      <motion.h1 
        className="text-2xl font-bold mb-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 4.8 }}
      >
        Experience
      </motion.h1>
      <motion.div 
        className="flex flex-col gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {ExperienceArray.map((experience, index) => (
          <motion.div 
            key={`punyakrit-experience-${index}`}
            // variants={cardVariants}
            whileHover={{ 
              scale: 1.02,
              y: -5,
              transition: { duration: 0.2, delay: 5.0 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="group relative overflow-hidden border border-white/20 rounded-xl p-6 hover:border-white/30 transition-all duration-300">
              <div className="relative flex gap-4 items-start">
                <motion.div 
                  className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center border border-white/20"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.3, delay: 5.1 }
                  }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6, delay: 5.3 }}
                  >
                    <Briefcase className="w-6 h-6" />
                  </motion.div>
                </motion.div>
                
                <div className="flex-1 space-y-2">
                  <motion.div 
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 5.4 }}
                  >
                    <motion.h2 
                      className="text-xl font-bold"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2, delay: 5.7 }}
                    >
                      {experience.company}
                    </motion.h2>
                    <motion.span 
                      className="px-3 py-1 rounded-full text-xs font-medium border border-white/20"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2, delay: 5.8 }}
                    >
                      {experience.date}
                    </motion.span>
                  </motion.div>
                  
                  <motion.h3 
                    className="text-lg font-semibold"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 5.9 }}
                  >
                    {experience.position}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-sm leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 6.0 }}
                  >
                    {experience.description}
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Experience;
