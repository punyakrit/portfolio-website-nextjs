"use client"
import { socials } from '@/lib/socials'
import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { X, Github, Linkedin, Mail, FileText, Calendar } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'

function MultiSocials({showAll}:{showAll: boolean}) {
    const socialLinks = [
        {
            name: 'X',
            url: socials.x,
            icon: X,
            
        },
        {
            name: 'GitHub',
            url: socials.github,
            icon: Github,
        },
        {
            name: 'LinkedIn',
            url: socials.linkedin,
            icon: Linkedin,
        },
        {
            name: 'Email',
            url: `mailto:${socials.email}`,
            icon: Mail,
        },
        {
            name: 'Resume',
            url: socials.resume,
            icon: FileText,
            show: !showAll,
        },
        {
            name: 'Cal',
            url: socials.cal,
            icon: Calendar,
            show: !showAll,
        }
    ]
  return (
    <TooltipProvider>
        <div className="flex flex-wrap gap-3 mt-6">
            {socialLinks.map((social, index) => {
                const Icon = social.icon
                if (social.show && !showAll) return null
                return (
                    <SocialIconWithMagnetic
                        key={social.name}
                        social={social}
                        Icon={Icon}
                        index={index}
                    />
                )
            })}
        </div>
    </TooltipProvider>
  )
}

function SocialIconWithMagnetic({
    social,
    Icon,
    index,
}: {
    social: { name: string; url: string };
    Icon: React.ElementType;
    index: number;
}) {
    const [hovered, setHovered] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { stiffness: 500, damping: 30 };
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig);
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) / rect.width);
        y.set((e.clientY - centerY) / rect.height);
    };

    const handleMouseLeave = () => {
        setHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                type: "spring" as const,
                stiffness: 200,
                damping: 20,
                delay: index * 0.08,
            }}
        >
            <Tooltip>
                <TooltipTrigger asChild>
                    <motion.div
                        ref={ref}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        onMouseEnter={() => setHovered(true)}
                        whileHover={{ 
                            scale: 1.2, 
                            y: -5,
                            z: 50,
                        }}
                        whileTap={{ scale: 0.85 }}
                        transition={{
                            type: "spring" as const,
                            stiffness: 400,
                            damping: 17,
                        }}
                        style={{
                            rotateX,
                            rotateY,
                            transformStyle: "preserve-3d",
                        }}
                        className="relative"
                    >
                        <Link
                            href={social.url}
                            target={social.name === 'Email' ? undefined : '_blank'}
                            rel={social.name === 'Email' ? undefined : 'noopener noreferrer'}
                            className="flex items-center justify-center w-10 h-10 rounded-lg relative overflow-hidden group"
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/20 to-primary/10 opacity-0 group-hover:opacity-100 rounded-lg"
                                transition={{ duration: 0.4 }}
                            />
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 rounded-lg"
                                transition={{ duration: 0.4 }}
                            />
                            <AnimatePresence>
                                {hovered && (
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-radial from-primary/40 via-primary/20 to-transparent rounded-lg"
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 2, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        transition={{ duration: 0.6 }}
                                    />
                                )}
                            </AnimatePresence>
                            <motion.div
                                whileHover={{
                                    rotate: [0, -15, 15, -15, 0],
                                    scale: 1.3,
                                }}
                                transition={{
                                    type: "spring" as const,
                                    stiffness: 300,
                                    damping: 15,
                                }}
                                style={{ transformStyle: "preserve-3d" }}
                                className="relative z-10"
                            >
                                <Icon className="w-5 h-5" />
                            </motion.div>
                            <motion.div
                                className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/40 rounded-lg"
                                transition={{ duration: 0.3 }}
                            />
                            <motion.div
                                className="absolute -inset-1 bg-primary/0 group-hover:bg-primary/10 rounded-lg blur-md opacity-0 group-hover:opacity-100"
                                transition={{ duration: 0.4 }}
                            />
                        </Link>
                    </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Visit my {social.name}</p>
                </TooltipContent>
            </Tooltip>
        </motion.div>
    );
}

export default MultiSocials