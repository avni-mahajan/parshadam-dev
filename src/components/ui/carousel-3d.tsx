"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
}

export const Carousel3D = ({ products }: { products: Product[] }) => {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-rotate
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % products.length);
    }, 3000); // Optimized for dynamic feel
    return () => clearInterval(interval);
  }, [isHovered, products.length]);

  const handleNext = () => setIndex((prev) => (prev + 1) % products.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + products.length) % products.length);

  return (
    <div 
      ref={containerRef}
      className="relative h-[650px] w-full flex items-center justify-center perspective-2000 overflow-visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-full flex items-center justify-center transform-style-3d">
        <AnimatePresence initial={false}>
          {products.map((product, i) => {
            const offset = (i - index + products.length) % products.length;
            const normalizedOffset = offset > products.length / 2 ? offset - products.length : offset;
            
            // Arched Trigonometry Logic
            // Spread cards consistently regardless of list length
            const angle = (normalizedOffset * Math.PI) / 8; // Increased angle for better spacing
            const radius = 1200; // Larger radius for more even feel
            
            const x = Math.sin(angle) * radius;
            const z = Math.cos(angle) * radius - radius; 
            const y = -Math.abs(Math.sin(angle)) * 80; // Softer arch
            const rotateY = normalizedOffset * -25; // Slightly more rotation for 3D depth
            
            const isActive = normalizedOffset === 0;
            const opacity = Math.max(0, 1 - Math.abs(normalizedOffset) * 0.3);
            const scale = 1 - Math.abs(normalizedOffset) * 0.1;

            return (
              <motion.div
                key={product.id}
                initial={false}
                animate={{
                  x: `calc(${x}px - 50%)`,
                  y: `calc(${y}px - 50%)`,
                  z,
                  scale,
                  rotateY,
                  opacity,
                  zIndex: products.length - Math.abs(normalizedOffset),
                }}
                transition={{
                  type: "spring",
                  stiffness: 70,
                  damping: 18,
                  mass: 1.2
                }}
                className="absolute left-1/2 top-1/2 w-[280px] md:w-[350px] h-[480px] cursor-pointer"
                onClick={() => setIndex(i)}
              >
                {/* Straight Card Shape */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] bg-black/40 backdrop-blur-xl group transition-colors duration-500 hover:border-amber-500/30">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                  
                  {/* Subtle inner border */}
                  <div className="absolute inset-3 rounded-xl border border-dashed border-white/5 group-hover:border-amber-500/20 transition-colors duration-500" />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/98 via-black/40 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                    <motion.p 
                      animate={{ opacity: isActive ? 1 : 0.6 }}
                      className="text-amber-400 text-[9px] font-bold tracking-[0.4em] uppercase mb-3"
                    >
                      {product.location}
                    </motion.p>
                    <h4 className="text-xl md:text-2xl font-heading text-white mb-2 tracking-wide leading-tight">
                      {product.name}
                    </h4>
                    <p className="text-white/50 text-[11px] font-light leading-relaxed line-clamp-2 max-w-[200px] mx-auto">
                      {product.description}
                    </p>
                  </div>

                  {isActive && (
                    <motion.div 
                      layoutId="active-glow"
                      className="absolute inset-0 bg-amber-500/[0.03] pointer-events-none"
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Modern Controls */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-10 z-50">
        <button 
          onClick={handlePrev}
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-amber-500/10 hover:border-amber-500/30 transition-all duration-500 group"
        >
          <span className="text-amber-500/70 text-lg group-hover:-translate-x-0.5 transition-transform">←</span>
        </button>
        
        <div className="flex gap-3">
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1 rounded-full transition-all duration-700 ${index === i ? "w-10 bg-amber-500" : "w-2 bg-white/10 hover:bg-white/20"}`} 
            />
          ))}
        </div>

        <button 
          onClick={handleNext}
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-amber-500/10 hover:border-amber-500/30 transition-all duration-500 group"
        >
          <span className="text-amber-500/70 text-lg group-hover:translate-x-0.5 transition-transform">→</span>
        </button>
      </div>
    </div>
  );
};
