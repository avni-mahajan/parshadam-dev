"use client";

import { useState, useEffect, useMemo } from "react";

// --- Gradient Orbs ---
const orbs = [
  { x: "12%", y: "10%", w: 380, h: 380, color: "rgba(170,140,210,0.5)" },
  { x: "68%", y: "25%", w: 320, h: 320, color: "rgba(230,195,100,0.55)" },
  { x: "38%", y: "52%", w: 400, h: 400, color: "rgba(170,140,210,0.4)" },
  { x: "82%", y: "62%", w: 300, h: 300, color: "rgba(230,195,100,0.5)" },
  { x: "8%", y: "78%", w: 360, h: 360, color: "rgba(170,140,210,0.45)" },
];

// --- Mandala positions (fixed, sparse) ---
const mandalas = [
  { x: "20%", y: "18%", size: 260, rot: 0, opacity: 0.18 },
  { x: "75%", y: "42%", size: 200, rot: 30, opacity: 0.15 },
  { x: "35%", y: "72%", size: 280, rot: 15, opacity: 0.14 },
  { x: "85%", y: "88%", size: 180, rot: 45, opacity: 0.15 },
];

// --- Floating Particles ---
type Particle = {
  id: number;
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
  opacity: number;
};

function generateParticles(): Particle[] {
  return Array.from({ length: 16 }, (_, i) => ({
    id: i,
    left: `${5 + ((i * 37 + 13) % 90)}%`,
    top: `${10 + ((i * 53 + 7) % 80)}%`,
    size: 3 + ((i * 11) % 4),
    duration: 14 + ((i * 7) % 16),
    delay: ((i * 13) % 12),
    driftX: -25 + ((i * 19) % 50),
    driftY: -70 - ((i * 11) % 50),
    opacity: 0.2 + ((i * 3) % 5) * 0.06,
  }));
}

// --- Inline Mandala SVG (pre-computed coordinates, no Math in render) ---
const lines = [
  { x1: 135, y1: 100, x2: 175, y2: 100 },
  { x1: 130.31, y1: 117.5, x2: 164.95, y2: 137.5 },
  { x1: 117.5, y1: 130.31, x2: 137.5, y2: 164.95 },
  { x1: 100, y1: 135, x2: 100, y2: 175 },
  { x1: 82.5, y1: 130.31, x2: 62.5, y2: 164.95 },
  { x1: 69.69, y1: 117.5, x2: 35.05, y2: 137.5 },
  { x1: 65, y1: 100, x2: 25, y2: 100 },
  { x1: 69.69, y1: 82.5, x2: 35.05, y2: 62.5 },
  { x1: 82.5, y1: 69.69, x2: 62.5, y2: 35.05 },
  { x1: 100, y1: 65, x2: 100, y2: 25 },
  { x1: 117.5, y1: 69.69, x2: 137.5, y2: 35.05 },
  { x1: 130.31, y1: 82.5, x2: 164.95, y2: 62.5 },
];
const petals = [
  { cx: 150, cy: 100, rot: 0 },
  { cx: 135.36, cy: 135.36, rot: 45 },
  { cx: 100, cy: 150, rot: 90 },
  { cx: 64.64, cy: 135.36, rot: 135 },
  { cx: 50, cy: 100, rot: 180 },
  { cx: 64.64, cy: 64.64, rot: 225 },
  { cx: 100, cy: 50, rot: 270 },
  { cx: 135.36, cy: 64.64, rot: 315 },
];

function MandalaSVG({ size, opacity }: { size: number; opacity: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.3" />
      {lines.map((l, i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="currentColor" strokeWidth="0.3" />
      ))}
      {petals.map((p, i) => (
        <ellipse
          key={i}
          cx={p.cx}
          cy={p.cy}
          rx="12"
          ry="6"
          stroke="currentColor"
          strokeWidth="0.4"
          transform={`rotate(${p.rot} ${p.cx} ${p.cy})`}
        />
      ))}
      <circle cx="100" cy="100" r="4" stroke="currentColor" strokeWidth="0.4" />
      <circle cx="100" cy="100" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function SacredBackdrop() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);

  const particles = useMemo(() => generateParticles(), []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {/* Layer 1: Gradient Orbs */}
      {orbs.map((orb, i) => (
        <div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.w,
            height: orb.h,
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: "blur(10px)",
          }}
        />
      ))}

      {/* Layer 2: Mandala SVGs */}
      {mandalas.map((m, i) => (
        <div
          key={`mandala-${i}`}
          className="absolute"
          style={{
            left: m.x,
            top: m.y,
            transform: `translate(-50%, -50%) rotate(${m.rot}deg)`,
            color: "rgba(100,80,65,1)",
          }}
        >
          <MandalaSVG size={m.size} opacity={m.opacity} />
        </div>
      ))}

      {/* Layer 3: Floating Particles */}
      {ready &&
        particles.map((p) => (
          <div
            key={`particle-${p.id}`}
            className="absolute rounded-full"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background: `radial-gradient(circle, rgba(220,200,170,${p.opacity}) 0%, rgba(200,184,232,${p.opacity * 0.4}) 100%)`,
              animation: `sacredDrift ${p.duration}s ease-in-out ${p.delay}s infinite`,
              ["--drift-x" as string]: `${p.driftX}px`,
              ["--drift-y" as string]: `${p.driftY}px`,
            }}
          />
        ))}
    </div>
  );
}
