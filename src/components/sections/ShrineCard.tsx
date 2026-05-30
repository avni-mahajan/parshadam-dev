"use client";

import { type FaithShrine } from "./sanatani-data";

interface ShrineCardProps {
  shrine: FaithShrine;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}

export default function ShrineCard({ shrine, style, className = "", onClick }: ShrineCardProps) {
  const glowColor = shrine.cosmicGlow || shrine.accentColor || "#E8A020";

  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer ${className}`}
      style={style}
    >
      <div
        className="relative w-[280px] h-[360px] rounded-2xl overflow-hidden border transition-all duration-500"
        style={{
          borderColor: `${glowColor}30`,
          background: `linear-gradient(135deg, rgba(18,8,48,0.75) 0%, rgba(10,5,21,0.85) 100%)`,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: `0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 ${glowColor}20`,
        }}
      >
        {/* Temple Image Background */}
        <div className="absolute inset-0">
          <img
            src={shrine.image}
            alt={shrine.name}
            className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-700"
            loading="lazy"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, rgba(10,5,21,0.6) 0%, rgba(10,5,21,0.9) 60%, rgba(10,5,21,0.95) 100%)`,
            }}
          />
        </div>

        {/* Glow overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
          style={{
            boxShadow: `inset 0 0 60px ${glowColor}15`,
          }}
        />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-5 z-10">
          {/* Deity / Energy */}
          <div className="mb-2 flex items-center gap-2">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: glowColor, boxShadow: `0 0 6px ${glowColor}` }}
            />
            <span className="text-[9px] uppercase tracking-[0.25em] text-white/40 font-light">
              {shrine.energyType || "Divine"}
            </span>
          </div>

          {/* Shrine Name */}
          <h3
            className="font-serif text-xl tracking-wide mb-1 transition-colors duration-300"
            style={{ color: "#FFFBF7" }}
          >
            {shrine.name}
          </h3>

          {/* Deity */}
          <p className="text-[11px] text-white/50 mb-1 leading-relaxed font-light">
            {shrine.deity.split("—")[0]?.trim() || shrine.deity}
          </p>

          {/* Location + State */}
          <div className="flex items-center gap-1.5 mt-1">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/30">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-[10px] text-white/40 tracking-wide">
              {shrine.location}, {shrine.state}
            </span>
          </div>

          {/* Bottom accent line */}
          <div
            className="mt-4 h-[1px] w-0 group-hover:w-full transition-all duration-700 ease-out"
            style={{
              background: `linear-gradient(90deg, ${glowColor}60, transparent)`,
            }}
          />
        </div>

        {/* Corner glow accent */}
        <div
          className="absolute -top-px -right-px w-16 h-16 opacity-0 group-hover:opacity-60 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at top right, ${glowColor}30, transparent 70%)`,
          }}
        />
      </div>
    </div>
  );
}