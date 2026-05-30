"use client";

import { type FaithShrine } from "./sanatani-data";
import { motion } from "framer-motion";

interface CosmicShrineCardProps {
  shrine: FaithShrine;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  index: number;
  onClick?: () => void;
}

export default function CosmicShrineCard({ shrine, position, index, onClick }: CosmicShrineCardProps) {
  if (!shrine) return null;
  const glowColor = shrine.cosmicGlow || shrine.accentColor || "#E8A020";

  return (
    <motion.div
      initial={{ opacity: 0, y: position.includes("top") ? -30 : 30, x: position.includes("left") ? -20 : 20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 1.2, delay: 0.6 + index * 0.15, ease: [0.25, 1, 0.5, 1] }}
      whileHover={{ y: -12, scale: 1.03 }}
      onClick={onClick}
      className="group cursor-pointer relative"
      style={{
        width: 240,
        height: 340,
        borderRadius: 30,
        perspective: 800,
      }}
    >
      {/* Outer glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle at center, ${glowColor}25, transparent 70%)`,
          filter: "blur(20px)",
          transform: "translateY(8px) scale(1.05)",
        }}
      />

      {/* Main card */}
      <div
        className="relative w-full h-full overflow-hidden cursor-pointer"
        style={{
          borderRadius: 30,
          background: `linear-gradient(180deg, rgba(14,20,40,0.72) 0%, rgba(5,8,20,0.92) 100%)`,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,210,120,0.22)",
          boxShadow: `
            0 0 30px rgba(255,170,80,0.12),
            0 20px 80px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.04)
          `,
        }}
      >
        {/* Image Area — top 58% */}
        <div className="absolute top-0 left-0 right-0 overflow-hidden" style={{ height: "58%", borderRadius: "30px 30px 0 0" }}>
          <motion.img
            src={shrine.image}
            alt={shrine.name}
            className="w-full h-full object-cover"
            style={{
              transition: "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
            whileHover={{ scale: 1.08 }}
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.82) 100%)",
            }}
          />
          {/* Warm light overlay */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at 50% 30%, ${glowColor}30, transparent 70%)`,
              mixBlendMode: "overlay",
            }}
          />
        </div>

        {/* Glow border accent on hover */}
        <div
          className="absolute inset-0 rounded-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: `inset 0 0 40px ${glowColor}18, 0 0 50px ${glowColor}10`,
          }}
        />

        {/* Card Content — bottom 42% */}
        <div className="absolute bottom-0 left-0 right-0 p-5 pt-6" style={{ height: "42%" }}>
          {/* Deity line */}
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-1 h-1 rounded-full"
              style={{
                backgroundColor: glowColor,
                boxShadow: `0 0 6px ${glowColor}`,
              }}
            />
            <span
              className="text-[9px] uppercase tracking-[0.3em] font-light"
              style={{ color: "rgba(255,220,160,0.45)" }}
            >
              {shrine.energyType || "Divine"}
            </span>
          </div>

          {/* Temple Name — Gold Gradient */}
          <h3
            className="font-heading"
            style={{
              fontSize: "1.6rem",
              fontWeight: 500,
              lineHeight: 1.1,
              marginBottom: 3,
              background: "linear-gradient(135deg, #FFE7B0 0%, #FFC56A 40%, #E8A84B 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "0.02em",
              filter: "drop-shadow(0 0 10px rgba(255,200,100,0.15))",
            }}
          >
            {shrine.name}
          </h3>

          {/* Location */}
          <p
            className="text-[11px] tracking-wide mb-0.5"
            style={{ color: "rgba(255,235,200,0.5)" }}
          >
            {shrine.location}, {shrine.state}
          </p>

          {/* Deity */}
          <p
            className="text-[10px] leading-relaxed font-serif"
            style={{ color: "rgba(255,210,150,0.5)" }}
          >
            {shrine.deity.split("—")[0]?.trim() || shrine.deity}
          </p>

          {/* Hover accent line */}
          <div
            className="mt-3 h-[1px] w-0 group-hover:w-full transition-all duration-700 ease-out"
            style={{
              background: `linear-gradient(90deg, ${glowColor}50, transparent)`,
            }}
          />
        </div>

        {/* Corner glow accent */}
        <div
          className="absolute -top-px -right-px w-20 h-20 opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at top right, ${glowColor}25, transparent 70%)`,
          }}
        />
      </div>
    </motion.div>
  );
}