"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, useAnimationFrame, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
}

export const Carousel3D = ({
  products,
  autoPlay = true,
  autoPlaySpeed = 0.12,
}: {
  products: Product[];
  autoPlay?: boolean;
  autoPlaySpeed?: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const count = products.length;

  const progress = useMotionValue(0);
  const targetProgress = useRef(0);

  const parallax = useMotionValue(0);
  const targetParallax = useRef(0);

  const isDragging = useRef(false);
  const isHovering = useRef(false);
  const startX = useRef(0);
  const startProgress = useRef(0);
  const wheelTimeout = useRef<NodeJS.Timeout | null>(null);
  const resumeTimeout = useRef<NodeJS.Timeout | null>(null);
  const dwellTimer = useRef(0);
  const DWELL_MS = 2500;

  const [activeIndex, setActiveIndex] = useState(0);

  // Smooth animation loop with auto-scroll
  useAnimationFrame((time, delta) => {
    const dt = delta || 16.6;

    // Auto-scroll forward when not interacting
    if (autoPlay && !isDragging.current && !isHovering.current) {
      const raw = targetProgress.current;
      const norm = ((raw % count) + count) % count;
      const distToCenter = Math.abs(norm - Math.round(norm));
      if (distToCenter < 0.06) {
        dwellTimer.current += dt;
        if (dwellTimer.current < DWELL_MS) {
          const center = Math.round(norm);
          targetProgress.current = raw + (center - norm);
        } else {
          targetProgress.current += autoPlaySpeed * (dt / 16.6);
        }
      } else {
        dwellTimer.current = 0;
        targetProgress.current += autoPlaySpeed * (dt / 16.6);
      }
    }

    // Smooth lerp
    const lerpFactor = 1 - Math.exp(-dt * 0.008);
    const pLerpFactor = 1 - Math.exp(-dt * 0.005);

    const currentProg = progress.get();
    progress.set(currentProg + (targetProgress.current - currentProg) * lerpFactor);

    const currentParallax = parallax.get();
    parallax.set(currentParallax + (targetParallax.current - currentParallax) * pLerpFactor);

    // Determine active index using wrapped progress
    const raw = progress.get();
    const norm = ((raw % count) + count) % count;
    const closest = Math.round(norm);
    if (closest !== activeIndex) {
      setActiveIndex(closest);
    }
  });

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startProgress.current = targetProgress.current;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging.current) {
      const deltaX = e.clientX - startX.current;
      targetProgress.current = startProgress.current - deltaX * 0.003;
    } else {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const x = (e.clientX - rect.left) / rect.width;
        targetParallax.current = (x - 0.5) * 2;
      }
    }
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    startX.current = 0;

    // Snap to nearest card
    const raw = targetProgress.current;
    const norm = ((raw % count) + count) % count;
    const snapped = Math.round(norm);
    targetProgress.current = targetProgress.current + (snapped - norm);
  };

  const handleWheel = (e: React.WheelEvent) => {
    const delta = (e.deltaX || e.deltaY) * 0.002;
    targetProgress.current += delta;

    if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
    wheelTimeout.current = setTimeout(() => {
      const raw = targetProgress.current;
      const norm = ((raw % count) + count) % count;
      const snapped = Math.round(norm);
      targetProgress.current = targetProgress.current + (snapped - norm);
    }, 150);
  };

  const handleNext = () => {
    targetProgress.current = Math.round(targetProgress.current) + 1;
  };

  const handlePrev = () => {
    targetProgress.current = Math.round(targetProgress.current) - 1;
  };

  const goToIndex = (i: number) => {
    const raw = targetProgress.current;
    const norm = ((raw % count) + count) % count;
    let diff = i - norm;
    if (diff > count / 2) diff -= count;
    if (diff < -count / 2) diff += count;
    targetProgress.current = raw + diff;
  };

  return (
    <div
      ref={containerRef}
      className="relative h-[520px] w-full flex items-center justify-center overflow-visible touch-none select-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onWheel={handleWheel}
      onMouseEnter={() => { isHovering.current = true; }}
      onMouseLeave={() => { isHovering.current = false; }}
      style={{ cursor: isDragging.current ? "grabbing" : "grab", perspective: "2000px" }}
    >
      <motion.div
        className="relative w-full h-full flex items-center justify-center pointer-events-none"
        style={{
          transformStyle: "preserve-3d",
          x: useTransform(parallax, (p) => p * 30),
          rotateY: useTransform(parallax, (p) => p * 3),
        }}
      >
        <AnimatePresence initial={false}>
          {products.map((product, i) => (
            <Card
              key={product.id}
              product={product}
              index={i}
              progress={progress}
              total={count}
              isActive={activeIndex === i}
              onClick={() => goToIndex(i)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Controls */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-10 z-50 pointer-events-auto">
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
              onClick={() => goToIndex(i)}
              className={`h-1 rounded-full transition-all duration-700 ${activeIndex === i ? "w-10 bg-amber-500" : "w-2 bg-white/10 hover:bg-white/20"
                }`}
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


function wrapDist(index: number, progress: number, count: number) {
  const raw = index - progress;
  const wrapped = ((raw % count) + count) % count;
  return wrapped > count / 2 ? wrapped - count : wrapped;
}

const Card = ({ product, index, progress, total, isActive, onClick }: any) => {
  const normDist = useTransform(progress, (p: number) => wrapDist(index, p, total));

  const x = useTransform(normDist, (d) => d * 460);
  const z = useTransform(normDist, (d) => -Math.abs(d) * 350);
  const y = useTransform(normDist, (d) => -Math.abs(d) * 25);
  const scale = useTransform(normDist, (d) => Math.max(0.4, 1 - Math.abs(d) * 0.15));
  const opacity = useTransform(normDist, (d) => Math.max(0, 1 - Math.abs(d) * 0.45));
  const itemZIndex = useTransform(normDist, (d) => Math.round(100 - Math.abs(d) * 10));

  return (
    <motion.div
      style={{
        x: useTransform(x, (xv) => `calc(${xv}px - 50%)`),
        y: useTransform(y, (yv) => `calc(${yv}px - 50%)`),
        z,
        scale,
        opacity,
        zIndex: itemZIndex,
      }}
      className="absolute left-1/2 top-1/2 w-[240px] md:w-[280px] h-[400px] cursor-pointer pointer-events-auto"
      onClick={onClick}
    >
      <div
        className={`relative w-full h-full rounded-2xl overflow-hidden border shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] bg-black/40 backdrop-blur-xl group transition-all duration-700 ${isActive ? 'border-amber-500/40' : 'border-white/5 hover:border-amber-500/20'
          }`}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-cover transition-transform duration-1000 ${isActive ? 'scale-105 opacity-100' : 'scale-100 opacity-50 group-hover:opacity-70 group-hover:scale-105'
            }`}
          sizes="(max-width: 768px) 100vw, 320px"
        />

        <div
          className={`absolute inset-3 rounded-xl border border-dashed transition-colors duration-700 ${isActive ? 'border-amber-500/30' : 'border-white/5 group-hover:border-amber-500/20'
            }`}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/98 via-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
          <motion.p
            initial={false}
            animate={{ opacity: isActive ? 1 : 0.5 }}
            className="text-amber-400 text-[8px] font-bold tracking-[0.4em] uppercase mb-2"
          >
            {product.location}
          </motion.p>
          <h4
            className="text-lg md:text-xl text-white mb-1 tracking-wide leading-tight"
            style={{ fontFamily: "'Cinzel', 'Georgia', serif" }}
          >
            {product.name}
          </h4>
          <p className="text-white/50 text-[10px] font-light leading-relaxed line-clamp-2 max-w-[180px] mx-auto">
            {product.description}
          </p>
        </div>

        {isActive && (
          <motion.div
            layoutId="active-glow"
            className="absolute inset-0 bg-amber-500/[0.06] pointer-events-none"
            transition={{ duration: 0.8 }}
          />
        )}
      </div>
    </motion.div>
  );
};
