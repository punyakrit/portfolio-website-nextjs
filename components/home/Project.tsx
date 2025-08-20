"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, ChevronDown, ChevronUp } from "lucide-react";

const ProjectArray = [
  {
    name: "Pulse",
    description:
      "Pulse is a website uptime and performance monitoring platform that helps teams keep their services reliable. It continuously checks websites, logs performance metrics, and alerts on downtime — with a clean dashboard for real-time insights and historical trends.",
    url: "https://pulse.punyakrit.dev",
    github: "https://github.com/punyakrit/pulse",
    tech: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "PostgreSQL",
      "EC2",
    ],
  },
  {
    name: "Arcane",
    description:
      "Arcane is a collaborative workspace that lets users create multiple workspaces, organize content into folders and files, and share them seamlessly with teammates. With real-time editing powered by Socket.io, it enables fast, synchronized collaboration across teams.",
    url: "https://arcane.punyakrit.dev",
    github: "https://github.com/punyakrit/arcane",
    tech: [
      "Next.js",
      "Supabase",
      "Tailwind CSS",
      "TypeScript",
      "PostgreSQL",
      "Socket.io",
    ],
  },
  {
    name: "SolBot",
    description:
      "A modern, responsive landing page for SolBot built with Next.js, shadcn/ui, Tailwind CSS, and Framer Motion. Designed with clean layouts, smooth animations, and reusable components, it highlights SolBot's features while staying fast and scalable.",
    url: "https://solbot.punyakrit.dev/",
    github: "https://github.com/punyakrit/solbot",
    tech: ["Next.js", "shadcn/ui", "Tailwind CSS", "Framer Motion", "TypeScript"],
  },
  {
    name: "SolWeb",
    description:
      "SolWeb is a blockchain analytics platform that lets users explore the Solana network through interactive visualizations and real-time insights. By entering any Solana wallet address, users can track transactions, analyze wallet interactions, and discover patterns.",
    url: "https://solweb.punyakrit.dev/",
    github: "https://github.com/punyakrit/solweb",
    tech: ["Next.js", "Tailwind CSS", "TypeScript", "Solana Web3.js"],
  },
  {
    name: "Notexa",
    description:
      "Notexa is a modern note-taking platform with authentication, subscriptions, and theme support. Built with Next.js, Supabase, and Kinde Auth, it lets users create, sort, and organize notes effortlessly. Integrated with Stripe for payments, it's designed as a scalable SaaS-style application with a clean, intuitive UI.",
    url: "https://notes.punyakrit.dev",
    github: "https://github.com/punyakrit/notes-sass",
    tech: ["Next.js", "Supabase", "Kinde Auth", "Stripe", "Tailwind CSS", "TypeScript"],
  }
  
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 6.5,
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
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

function Project() {
  const [showAll, setShowAll] = useState(false);
  
  const displayedProjects = showAll ? ProjectArray : ProjectArray.slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 6.5 }}
    >
      <motion.h1 
        className="text-2xl font-bold mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 6.7 }}
      >
        Projects
      </motion.h1>
      <motion.div 
        className="grid gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {displayedProjects.map((project, index) => (
          <motion.div 
            key={index} 
            className="group relative overflow-hidden border border-white/20 rounded-xl p-6 hover:border-white/30 transition-all duration-300 hover:shadow-lg"
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <motion.h2 
                    className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors duration-300"
                    transition={{ duration: 0.2 , delay: 7}}
                  >
                    {project.name}
                  </motion.h2>
                  <motion.p 
                    className="text-sm leading-relaxed text-white/70 group-hover:text-white/80 transition-colors duration-300"
                    transition={{ duration: 0.4 , delay: 7.3}}
                  >
                    {project.description}
                  </motion.p>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <motion.a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300 group/link"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-4 h-4 group-hover/link:scale-110 transition-transform duration-300" />
                  </motion.a>
                  <motion.a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300 group/link"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-4 h-4 group-hover/link:scale-110 transition-transform duration-300" />
                  </motion.a>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, techIndex) => (
                  <motion.span 
                    key={techIndex}
                    className="px-3 py-1 text-xs font-medium rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                    transition={{ duration: 0.5 , delay: 7.7}}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {ProjectArray.length > 2 && (
        <motion.div 
          className="flex justify-center mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 6.9 }}
        >
          <motion.button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300 group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-sm font-medium">
              {showAll ? "Show Less" : `Show  More`}
            </span>
            <motion.div
              animate={{ rotate: showAll ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            </motion.div>
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Project;
