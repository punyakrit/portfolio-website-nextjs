"use client";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import React from "react";

const ExperienceArray = [
  {
    company: "AgentProd",
    position: "Full-Stack Software Engineer",
    date: "Jun 2024 - Sept 2025",
    description: [
      "Leading feature development in a fast-paced startup environment, shipping production code that increased user engagement by 25%",
      "Built scalable backend systems with FastAPI and PostgreSQL, reducing API latency by 40%",
      "Accelerated deployment cycles from 3 days to <12 hours through CI/CD automation with Docker and AWS",
      "Maintaining 99.9% uptime while improving page load speeds by 35%"
    ],
  },
  {
    company: "Freelance",
    position: "Full-Stack Developer",
    date: "Jan 2023 - May 2024",
    description: [
      "Delivered 10+ production applications for international clients across E-commerce, SaaS, and portfolio domains",
      "Built custom CMS solutions and RESTful APIs that reduced client maintenance costs by 30%",
      "Specialized in React, Next.js, Node.js, and TypeScript with a 95% client retention rate",
      "Managed complete project lifecycles remotely, from requirements to deployment"
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 2.2,
    },
  },
};



function Experience() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 2.0 }}
    >
      <motion.h1 
        className="text-lg sm:text-2xl font-bold mb-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 2.1 }}
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
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="group relative overflow-hidden border border-white/20 rounded-xl p-4 sm:p-6 hover:border-white/30 transition-all duration-300">
              <div className="relative flex gap-3 sm:gap-4 items-start">
                <motion.div 
                  className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center border border-white/20"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.3 }
                  }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Briefcase className="w-6 h-6" />
                  </motion.div>
                </motion.div>
                
                <div className="flex-1 space-y-2">
                  <motion.div 
                    className="flex items-center justify-between gap-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.h2 
                      className="text-lg sm:text-xl font-bold"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {experience.company}
                    </motion.h2>
                    <motion.span 
                      className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium border border-white/20 flex-shrink-0"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {experience.date}
                    </motion.span>
                  </motion.div>
                  
                  <motion.h3 
                    className="text-base sm:text-lg font-semibold"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {experience.position}
                  </motion.h3>
                  
                  <motion.ul 
                    className="text-xs sm:text-sm leading-relaxed space-y-2 list-disc list-inside"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {experience.description.map((point, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: idx * 0.05 }}
                      >
                        {point}
                      </motion.li>
                    ))}
                  </motion.ul>
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
