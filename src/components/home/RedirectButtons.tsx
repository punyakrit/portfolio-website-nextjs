"use client";
import React, { useState, useRef } from "react";
import { Button } from "../ui/button";
import { FileText, Send } from "lucide-react";
import { socials } from "@/lib/socials";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

function RedirectButtons() {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-4">
      <motion.div
        initial={{ opacity: 0, x: -30, scale: 0.8 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          type: "spring" as const,
          stiffness: 200,
          damping: 20,
        }}
      >
        <ButtonWithMagneticHover
          href={socials.resume}
          icon={FileText}
          text="Resume / CV"
          variant="outline"
          delay={0}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -30, scale: 0.8 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          type: "spring" as const,
          stiffness: 200,
          damping: 20,
          delay: 0.1,
        }}
      >
        <ButtonWithMagneticHover
          href={socials.cal}
          icon={Send}
          text="Contact Me"
          variant="ghost"
          delay={0.1}
        />
      </motion.div>
    </div>
  );
}

function ButtonWithMagneticHover({
  href,
  icon: Icon,
  text,
  variant,
  delay,
}: {
  href: string;
  icon: React.ElementType;
  text: string;
  variant: "outline" | "ghost";
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 500, damping: 30 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7.5, -7.5]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7.5, 7.5]), springConfig);

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
    <Link href={href} target="_blank">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setHovered(true)}
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.95 }}
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
        <Button
          className="flex gap-2 items-center cursor-pointer relative overflow-hidden group"
          variant={variant}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/15 to-primary/10 opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.4 }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.4 }}
          />
          {hovered && (
            <motion.div
              className="absolute inset-0 bg-gradient-radial from-primary/30 via-primary/10 to-transparent opacity-0 group-hover:opacity-100"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          )}
          <motion.div
            whileHover={{
              rotate: [0, -10, 10, -10, 0],
              scale: 1.1,
            }}
            transition={{
              type: "spring" as const,
              stiffness: 300,
              damping: 15,
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <Icon className="relative z-10" />
          </motion.div>
          <motion.span
            className="relative z-10"
            whileHover={{ x: 2 }}
            transition={{
              type: "spring" as const,
              stiffness: 400,
              damping: 17,
            }}
          >
            {text}
          </motion.span>
          <motion.div
            className="absolute inset-0 border border-primary/0 group-hover:border-primary/30 rounded-md"
            transition={{ duration: 0.3 }}
          />
        </Button>
      </motion.div>
    </Link>
  );
}

export default RedirectButtons;
