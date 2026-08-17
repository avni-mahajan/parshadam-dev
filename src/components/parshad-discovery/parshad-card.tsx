"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { ParshadDiscovery } from "./types";

export function ParshadCanvasItem({
  parshad,
  index,
  onClick,
}: {
  parshad: ParshadDiscovery;
  index: number;
  onClick: () => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 25 });

  const imgScale = useTransform(springX, [0, 1], [1.05, 1.15]);
  const imgX = useTransform(springX, [0, 1], [-8, 8]);
  const imgY = useTransform(springY, [0, 1], [-6, 6]);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setIsHovered(false);
  }

  // Vary sizes for organic feel
  const sizes = [
    { w: "w-[35vw]", h: "h-[35vw]", maxW: "max-w-[420px]", maxH: "max-h-[420px]" },
    { w: "w-[28vw]", h: "h-[28vw]", maxW: "max-w-[340px]", maxH: "max-h-[340px]" },
    { w: "w-[32vw]", h: "h-[32vw]", maxW: "max-w-[380px]", maxH: "max-h-[380px]" },
  ];
  const size = sizes[index % 3];

  return (
    <div
      ref={itemRef}
      data-canvas-item
      className={`relative ${size.w} ${size.h} ${size.maxW} ${size.maxH} cursor-pointer group`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ perspective: "800px" }}
    >
      {/* Image container */}
      <div className="relative w-full h-full overflow-hidden rounded-sm">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${parshad.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            scale: imgScale,
            x: imgX,
            y: imgY,
          }}
        />

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.4 }}
          style={{
            background:
              "linear-gradient(180deg, transparent 30%, rgba(45,35,25,0.7) 100%)",
          }}
        />

        {/* Bottom info — always visible */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
          <p className="text-[9px] uppercase tracking-[0.3em] text-white/50 mb-1">
            {parshad.shrineName}
          </p>
          <h3
            className="text-sm md:text-base text-white/90 leading-snug"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {parshad.name.length > 28
              ? parshad.name.slice(0, 28) + "\u2026"
              : parshad.name}
          </h3>
        </div>

        {/* Hover CTA */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4 md:p-5"
          animate={{
            y: isHovered ? 0 : 20,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="flex items-center gap-2">
            <div className="h-px w-6 bg-white/40" />
            <span className="text-[8px] uppercase tracking-[0.25em] text-white/60">
              Explore
            </span>
          </div>
        </motion.div>
      </div>

      {/* Corner accent */}
      <div
        className="absolute -top-2 -right-2 w-6 h-6 pointer-events-none"
        style={{
          borderTop: "1px solid rgba(200,185,160,0.2)",
          borderRight: "1px solid rgba(200,185,160,0.2)",
        }}
      />
      <div
        className="absolute -bottom-2 -left-2 w-6 h-6 pointer-events-none"
        style={{
          borderBottom: "1px solid rgba(200,185,160,0.2)",
          borderLeft: "1px solid rgba(200,185,160,0.2)",
        }}
      />
    </div>
  );
}
