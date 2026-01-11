"use client";

import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { env } from "@/lib/env";
import { getUniqueUserCount } from "@/lib/query/query";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const pathname = usePathname();
  const image = env.NEXT_PUBLIC_CLOUDFRONT_URL + "/img.jpg";
  const navRef = useRef<HTMLElement>(null);
  
  const [uniqueVisitors, setUniqueVisitors] = useState(0);
  useEffect(() => {
    const getUniqueVisitors = async () => {
      const uniqueVisitors = await getUniqueUserCount();
      setUniqueVisitors(uniqueVisitors);
    };
    getUniqueVisitors();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const nav = navRef.current;
    if (nav) {
      nav.addEventListener("mousemove", handleMouseMove);
      return () => nav.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  const navLinks = [
    { href: "/pow", label: "projects", mobileLabel: "proof-of-work" },
    { href: "/work", label: "work" },
    { href: "/blogs", label: "blogs" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const mobileMenuVariants = {
    closed: {
      maxHeight: 0,
      opacity: 0,
      transition: {
        maxHeight: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const },
        opacity: { duration: 0.2 },
      },
    },
    open: {
      maxHeight: 500,
      opacity: 1,
      transition: {
        maxHeight: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const },
        opacity: { duration: 0.2 },
      },
    },
  };

  const mobileItemVariants = {
    closed: { 
      opacity: 0, 
      x: -20,
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <motion.nav
      ref={navRef}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="h-20 backdrop-blur-md bg-background/30 border border-border/50 fixed top-0 left-0 right-0 max-w-4xl mx-auto px-4 sm:px-8 md:px-16 py-4 z-20 rounded-b-2xl"
      style={{ fontFamily: "var(--font-fondamento)" }}
      whileHover={{ borderColor: "hsl(var(--border) / 0.7)" }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0 opacity-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary) / 0.1), transparent 40%)`,
        }}
        animate={{
          opacity: mousePosition.x > 0 && mousePosition.y > 0 ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
      <div className="flex justify-between items-center h-full z-10">
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
          <motion.div variants={itemVariants}>
            <Link href="/" className="relative block">
              <motion.div
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  scale: { type: "spring" as const, stiffness: 400, damping: 17 },
                  rotate: { duration: 0.5 },
                }}
                className="relative"
              >
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/30 via-primary/20 to-primary/10 blur-xl -z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  whileHover={{
                    boxShadow: "0 20px 40px -10px hsl(var(--primary) / 0.3)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={image}
                    alt="logo"
                    width={100}
                    height={100}
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl object-cover relative z-0"
                    loading="lazy"
                  />
                </motion.div>
              </motion.div>
            </Link>
          </motion.div>
          <motion.div
            className="hidden md:flex gap-4"
            variants={itemVariants}
          >
            {navLinks.map((link, index) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                isActive={isActive(link.href)}
                index={index}
              />
            ))}
          </motion.div>
        </div>
        <motion.div
          className="flex gap-2 sm:gap-3 md:gap-4 items-center"
          variants={itemVariants}
        >
          <div className="hidden sm:block"></div>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            transition={{
              type: "spring" as const,
              stiffness: 400,
              damping: 17,
            }}
          >
            <ModeToggle />
          </motion.div>
          <motion.div
            className="hidden sm:flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-3 py-1 text-xs sm:text-sm text-muted-foreground cursor-default"
            whileHover={{
              scale: 1.05,
              borderColor: "hsl(var(--border))",
              backgroundColor: "hsl(var(--background) / 0.8)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring" as const,
              stiffness: 400,
              damping: 17,
            }}
          >
            <motion.span
              className="hidden md:inline"
              whileHover={{ color: "hsl(var(--foreground))" }}
              transition={{ duration: 0.2 }}
            >
              Visitors
            </motion.span>
            <motion.span
              className="font-semibold tabular-nums text-foreground inline-block"
              whileHover={{ scale: 1.15 }}
              transition={{
                type: "spring" as const,
                stiffness: 500,
                damping: 15,
              }}
            >
              {uniqueVisitors.toLocaleString()}
            </motion.span>
          </motion.div>
          <motion.button
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg relative"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            whileHover={{ backgroundColor: "hsl(var(--background) / 0.5)" }}
            whileTap={{ scale: 0.9 }}
            transition={{
              type: "spring" as const,
              stiffness: 400,
              damping: 17,
            }}
          >
            <motion.span
              className="w-6 h-0.5 bg-foreground origin-center"
              animate={{
                rotate: isMenuOpen ? 45 : 0,
                y: isMenuOpen ? 8 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            />
            <motion.span
              className="w-6 h-0.5 bg-foreground"
              animate={{
                opacity: isMenuOpen ? 0 : 1,
                x: isMenuOpen ? 10 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            />
            <motion.span
              className="w-6 h-0.5 bg-foreground origin-center"
              animate={{
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? -8 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            />
          </motion.button>
        </motion.div>
      </div>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, maxHeight: 0 }}
          animate={{ opacity: 1, maxHeight: 500 }}
          exit={{ opacity: 0, maxHeight: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden absolute top-full left-0 right-0 backdrop-blur-sm bg-background/95 border-t border-border z-50 shadow-lg"
          style={{ overflow: "hidden" }}
        >
          <div className="flex flex-col px-4 sm:px-8 md:px-16 py-4 gap-4">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  type: "spring" as const,
                  stiffness: 300,
                  damping: 24,
                  delay: index * 0.1 + 0.1,
                }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block"
                >
                  <MobileNavLink
                    label={link.mobileLabel || link.label}
                    isActive={isActive(link.href)}
                  />
                </Link>
              </motion.div>
            ))}
            <motion.div
              className="sm:hidden pt-2 border-t border-border flex items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: navLinks.length * 0.1 + 0.1,
              }}
            >
              <div className="text-sm text-muted-foreground">
                Visitors{" "}
                <span className="font-semibold tabular-nums text-foreground">
                  {uniqueVisitors.toLocaleString()}
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

function NavLink({
  href,
  label,
  isActive,
  index,
}: {
  href: string;
  label: string;
  isActive: boolean;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 500, damping: 30 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7.5, -7.5]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7.5, 7.5]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
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
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 12,
      }}
    >
      <Link
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setHovered(true)}
        className="relative block"
      >
        <motion.span
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className={`relative z-10 inline-block text-base md:text-lg ${
            isActive
              ? "text-foreground font-medium"
              : "text-muted-foreground"
          }`}
          animate={{
            color: hovered || isActive ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
            scale: hovered ? 1.05 : 1,
          }}
          transition={{
            type: "spring" as const,
            stiffness: 400,
            damping: 17,
          }}
        >
          {label}
        </motion.span>
        <motion.span
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary via-primary/80 to-primary origin-left"
          initial={{ scaleX: 0 }}
          animate={{
            scaleX: isActive || hovered ? 1 : 0,
          }}
          transition={{
            type: "spring" as const,
            stiffness: 300,
            damping: 25,
          }}
          style={{ transformOrigin: "left" }}
        />
        {hovered && (
          <motion.div
            className="absolute inset-0 -z-10 rounded-lg bg-primary/5 blur-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </Link>
    </motion.div>
  );
}

function MobileNavLink({
  label,
  isActive,
}: {
  label: string;
  isActive: boolean;
}) {
  return (
    <motion.div
      className={`relative text-lg cursor-pointer py-2 ${
        isActive
          ? "text-foreground font-medium"
          : "text-muted-foreground"
      }`}
      whileHover={{ x: 8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring" as const,
        stiffness: 400,
        damping: 17,
      }}
    >
      <span className="relative z-10 inline-block">{label}</span>
      <motion.span
        className="absolute left-0 top-1/2 h-0.5 bg-gradient-to-r from-primary to-primary/60 origin-left -translate-y-1/2"
        initial={{ scaleX: 0 }}
        animate={{
          scaleX: isActive ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
        style={{ transformOrigin: "left" }}
      />
    </motion.div>
  );
}

export default NavBar;
