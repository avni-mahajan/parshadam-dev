"use client";

import { useState, useEffect } from "react";

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
  return Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${5 + Math.random() * 90}%`,
    top: `${10 + Math.random() * 80}%`,
    size: 2 + Math.random() * 4,
    duration: 12 + Math.random() * 20,
    delay: Math.random() * 15,
    driftX: -30 + Math.random() * 60,
    driftY: -80 - Math.random() * 60,
    opacity: 0.15 + Math.random() * 0.25,
  }));
}

export function AmbientParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(generateParticles());
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, rgba(232,224,240,${p.opacity}) 0%, rgba(245,230,200,${p.opacity * 0.5}) 100%)`,
            animation: `sacredDrift ${p.duration}s ease-in-out ${p.delay}s infinite`,
            ["--drift-x" as string]: `${p.driftX}px`,
            ["--drift-y" as string]: `${p.driftY}px`,
          }}
        />
      ))}
    </div>
  );
}
