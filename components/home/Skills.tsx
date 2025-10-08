"use client";
import { motion } from "framer-motion";
import React from "react";

import { FaJs } from "react-icons/fa";
import { FaReact, FaNodeJs, FaDocker, FaAws, FaGithub, FaGitAlt } from "react-icons/fa6";
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiPython, SiCplusplus, SiPostgresql, SiPrisma, SiShadcnui, SiFramer, SiExpress, SiMongodb, SiRedis, SiPostman, SiC, SiSqlite, SiLinux, SiVercel, SiFigma } from "react-icons/si";

const skills = [
  { name: "JavaScript", icon: <FaJs /> },
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "Python", icon: <SiPython /> },
  { name: "C++", icon: <SiCplusplus /> },
  { name: "React", icon: <FaReact /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "Node.js", icon: <FaNodeJs /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss /> },
  { name: "PostgreSQL", icon: <SiPostgresql /> },
  { name: "Prisma", icon: <SiPrisma /> },
  { name: "Docker", icon: <FaDocker /> },
  { name: "AWS", icon: <FaAws /> },
  { name: "shadcn", icon: <SiShadcnui /> },
  { name: "Motion", icon: <SiFramer /> },
  { name: "ExpressJS", icon: <SiExpress /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "Redis", icon: <SiRedis /> },
  { name: "Postman", icon: <SiPostman /> },
  { name: "Git", icon: <FaGitAlt /> },
  { name: "GitHub", icon: <FaGithub /> },
  { name: "C", icon: <SiC /> },
  { name: "SQL", icon: <SiSqlite /> },
  { name: "Linux", icon: <SiLinux /> },
  { name: "Vercel", icon: <SiVercel /> },
  { name: "Figma", icon: <SiFigma /> },
];

function Skills() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 1.1 }}
      className=" "
    >
      <motion.h1 
        className="text-lg sm:text-xl font-bold"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 1.2 }}
      >
        Skills
      </motion.h1>
      <motion.div 
        className="flex flex-wrap gap-2 mt-2"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.03,
              delayChildren: 1.3,
            },
          },
        }}
      >
        {skills.map((skill, index) => (
          <motion.div 
            key={`punyakrit-skill-${index}`} 
            className="flex items-center gap-1 sm:gap-2 border border-white/10 rounded-md p-1.5 sm:p-2 cursor-pointer hover:bg-white/10 transition-colors"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.3, 
              delay: 1.3 + (index * 0.03),
              ease: "easeOut"
            }}
            whileHover={{ 
              scale: 1.08, 
              y: -3,
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
              borderColor: "#60a5fa"
            }}
            
            onHoverStart={() => {
              // Add subtle glow effect
            }}
          >
            <motion.div
              whileHover={{ 
                rotate: 360,
                scale: 1.2,
                color: "#60a5fa"
              }}
              transition={{ duration: 0.6 }}
            >
              {skill.icon}
            </motion.div>
            <motion.span
              className="text-xs sm:text-sm"
              whileHover={{ color: "#60a5fa" }}
              transition={{ duration: 0.2 }}
            >
              {skill.name}
            </motion.span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Skills;
