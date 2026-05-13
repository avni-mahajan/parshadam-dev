"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
        "absolute top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out py-8 bg-transparent"
      )}
    >
      <div className="w-full px-6 md:px-10 flex items-center justify-start">
        <Link href="/">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-2xl md:text-3xl font-medium tracking-[0.3em] uppercase font-[family-name:var(--font-eb-garamond)] text-[#FF8C00] drop-shadow-[0_2px_10px_rgba(255,140,0,0.3)]"
          >
            Parshadam
          </motion.div>
        </Link>
      </div>
    </nav>
  );
};
