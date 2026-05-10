"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out",
        isScrolled 
          ? "py-4 bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm" 
          : "py-8 bg-transparent"
      )}
    >
      <div className="w-full px-6 md:px-10 flex items-center justify-start">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className={cn(
            "text-3xl md:text-4xl transition-colors duration-700",
            isScrolled ? "text-primary" : "text-white"
          )}
          style={{ fontFamily: 'var(--font-lavishly)' }}
        >
          Parshadam
        </motion.div>
      </div>
    </nav>
  );
};
