"use client";

import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sanataniShrines, type FaithShrine } from "./sanatani-data";
import ShrineCard from "./ShrineCard";

interface SanataniCosmicGridProps {
  searchQuery: string;
  onShrineClick: (shrine: FaithShrine) => void;
  setHoveredShrine: (shrine: FaithShrine | null) => void;
}

interface CardPosition {
  x: number;
  y: number;
  scale: number;
  zIndex: number;
  depth: number; // 0=foreground, 1=midground, 2=distant
  floatSpeed: number;
  floatAmplitude: number;
  floatDelay: number;
}

// Deliberate asymmetric placement spanning the full viewport — no center emptiness
function generateCardPositions(count: number, viewportWidth: number, viewportHeight: number): CardPosition[] {
  const positions: CardPosition[] = [];

  // Define quadrant-based anchor zones that deliberately avoid center
  // Each shrine gets a unique "constellation zone" in the viewport
  const zones = [
    { x: 0.15, y: 0.2, depth: 0 },   // top-left foreground
    { x: 0.78, y: 0.18, depth: 1 },  // top-right midground
    { x: 0.22, y: 0.72, depth: 2 },  // bottom-left distant
    { x: 0.82, y: 0.78, depth: 0 },  // bottom-right foreground
  ];

  // If more shrines than zones, add interstitial positions
  for (let i = 0; i < count; i++) {
    const zone = zones[i % zones.length];

    // Add organic offset within the zone (±5% of viewport)
    const jitterX = (Math.random() - 0.5) * 0.08 * viewportWidth;
    const jitterY = (Math.random() - 0.5) * 0.08 * viewportHeight;

    const scale = zone.depth === 0 ? 0.85 + Math.random() * 0.1 :  // foreground: larger
                  zone.depth === 1 ? 0.65 + Math.random() * 0.1 :  // midground: medium
                  0.45 + Math.random() * 0.1;                       // distant: smaller

    positions.push({
      x: zone.x * viewportWidth + jitterX - viewportWidth / 2,
      y: zone.y * viewportHeight + jitterY - viewportHeight / 2,
      scale,
      zIndex: zone.depth === 0 ? 30 : zone.depth === 1 ? 20 : 10,
      depth: zone.depth,
      floatSpeed: 0.3 + Math.random() * 0.4,
      floatAmplitude: 5 + Math.random() * 6,
      floatDelay: Math.random() * 4,
    });
  }

  return positions;
}

// Constellation lines — connect EVERY pair with distance-based fading for a web-like map
function generateConstellationLines(
  positions: CardPosition[],
  shrines: FaithShrine[]
) {
  const lines: { x1: number; y1: number; x2: number; y2: number; color: string; opacity: number; animDuration: number; animDelay: number }[] = [];

  // Connect all pairs (with a reasonable max distance)
  const maxDist = Math.min(
    Math.abs(positions[0]?.x || 800) + Math.abs(positions[positions.length - 1]?.x || 800),
    1400
  );

  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const dx = positions[i].x - positions[j].x;
      const dy = positions[i].y - positions[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < maxDist) {
        const opacity = (1 - dist / maxDist) * 0.2;
        // Blend the two shrine colors
        const color = shrines[i].cosmicGlow || shrines[i].accentColor || "#E8A020";
        lines.push({
          x1: positions[i].x,
          y1: positions[i].y,
          x2: positions[j].x,
          y2: positions[j].y,
          color,
          opacity: Math.max(opacity, 0.04), // minimum visibility
          animDuration: 3 + Math.random() * 4,
          animDelay: Math.random() * 3,
        });
      }
    }
  }

  return lines;
}

export default function SanataniCosmicGrid({
  searchQuery,
  onShrineClick,
  setHoveredShrine,
}: SanataniCosmicGridProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [windowSize, setWindowSize] = useState({ w: 1920, h: 1080 });

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const cardPositions = useMemo(() => {
    return generateCardPositions(sanataniShrines.length, windowSize.w, windowSize.h);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize]);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const filteredIndices = useMemo(() => {
    if (!searchQuery) return sanataniShrines.map((_, i) => i);
    const q = searchQuery.toLowerCase();
    return sanataniShrines
      .map((s, i) => ({ s, i }))
      .filter(
        ({ s }) =>
          s.name.toLowerCase().includes(q) ||
          s.state.toLowerCase().includes(q) ||
          s.deity.toLowerCase().includes(q) ||
          s.location.toLowerCase().includes(q)
      )
      .map(({ i }) => i);
  }, [searchQuery]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  }, []);

  if (!isReady) return null;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="absolute inset-0 overflow-hidden"
    >
      <style>{`
        @keyframes floatA {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes floatC {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes floatD {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes constellationPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>

      {/* Constellation lines layer — removed */}
      {/* Constellation pulse keyframes — removed */}

      {/* Floating cards */}
      <div className="absolute inset-0" style={{ perspective: "1200px" }}>
        <AnimatePresence>
          {sanataniShrines.map((shrine, index) => {
            const pos = cardPositions[index];
            const isVisible = filteredIndices.includes(index);
            const depthParallaxFactor = pos.depth === 0 ? 1 : pos.depth === 1 ? 0.5 : 0.2;

            // Parallax: foreground moves most, distant moves least
            const parallaxX = pos.x + mousePos.x * (14 * depthParallaxFactor);
            const parallaxY = pos.y + mousePos.y * (14 * depthParallaxFactor);

            const floatAnim = `float${String.fromCharCode(65 + (index % 4))}`;
            const floatDuration = pos.depth === 0 ? 4 + pos.floatSpeed * 1.5 :
                                  pos.depth === 1 ? 5 + pos.floatSpeed * 2 :
                                  6 + pos.floatSpeed * 2;

            return (
              <motion.div
                key={shrine.id}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: isVisible ? 1 : 0.08,
                  scale: isVisible ? pos.scale : pos.scale * 0.5,
                  x: parallaxX,
                  y: parallaxY,
                }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{
                  type: "tween",
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1], // smooth easing
                }}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  zIndex: isVisible ? pos.zIndex : -1,
                  pointerEvents: isVisible ? "auto" : "none",
                  transformStyle: "preserve-3d",
                  animation: isVisible
                    ? `${floatAnim} ${floatDuration}s ease-in-out ${pos.floatDelay}s infinite`
                    : "none",
                }}
                onMouseEnter={() => isVisible && setHoveredShrine(shrine)}
                onMouseLeave={() => setHoveredShrine(null)}
              >
                {/* Depth layer visuals */}
                <div
                  className="transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{
                    filter: pos.depth === 2 ? "blur(1.5px)" : pos.depth === 1 ? "blur(0.5px)" : "none",
                    transition: "filter 0.4s",
                  }}
                >
                  <ShrineCard
                    shrine={shrine}
                    onClick={() => onShrineClick(shrine)}
                    className="will-change-transform"
                  />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}