"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface CosmicBackgroundProps {
  count?: number;
}

export default function CosmicBackground({ count = 2000 }: CosmicBackgroundProps) {
  const starRef = useRef<THREE.Points>(null);
  const nebulaRef = useRef<THREE.Points>(null);

  // Stars
  const [starPositions, starColors, starSizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const radius = 30 + Math.random() * 250;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      // Warm cosmic colors
      const warmth = Math.random();
      if (warmth < 0.2) {
        // Deep warm gold
        col[i * 3] = 1;
        col[i * 3 + 1] = 0.8 + Math.random() * 0.2;
        col[i * 3 + 2] = 0.4 + Math.random() * 0.3;
      } else if (warmth < 0.5) {
        // White-gold
        col[i * 3] = 1;
        col[i * 3 + 1] = 0.95 + Math.random() * 0.05;
        col[i * 3 + 2] = 0.7 + Math.random() * 0.3;
      } else if (warmth < 0.7) {
        // Soft blue
        col[i * 3] = 0.6 + Math.random() * 0.3;
        col[i * 3 + 1] = 0.7 + Math.random() * 0.3;
        col[i * 3 + 2] = 1;
      } else {
        // Purple-violet
        col[i * 3] = 0.7 + Math.random() * 0.3;
        col[i * 3 + 1] = 0.4 + Math.random() * 0.3;
        col[i * 3 + 2] = 0.8 + Math.random() * 0.2;
      }

      siz[i] = Math.random() * 1.8 + 0.3;
    }

    return [pos, col, siz];
  }, [count]);

  // Nebula particles (larger, more spread out, purple/violet)
  const [nebulaPos, nebulaCol] = useMemo(() => {
    const pos = new Float32Array(500 * 3);
    const col = new Float32Array(500 * 3);

    for (let i = 0; i < 500; i++) {
      const radius = 20 + Math.random() * 150;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      // Purple/violet nebula colors
      col[i * 3] = 0.3 + Math.random() * 0.2;    // R
      col[i * 3 + 1] = 0.1 + Math.random() * 0.15; // G
      col[i * 3 + 2] = 0.4 + Math.random() * 0.3;  // B
    }

    return [pos, col];
  }, []);

  useFrame((_, delta) => {
    if (starRef.current) {
      starRef.current.rotation.y += delta * 0.005;
      starRef.current.rotation.x += delta * 0.001;
    }
    if (nebulaRef.current) {
      nebulaRef.current.rotation.y += delta * 0.002;
      nebulaRef.current.rotation.x += delta * 0.0005;
    }
  });

  return (
    <group>
      {/* Stars */}
      <points ref={starRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[starPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[starColors, 3]} />
          <bufferAttribute attach="attributes-size" args={[starSizes, 1]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.6}
          vertexColors
          transparent
          opacity={0.7}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Nebula haze */}
      <points ref={nebulaRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nebulaPos, 3]} />
          <bufferAttribute attach="attributes-color" args={[nebulaCol, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={3.5}
          vertexColors
          transparent
          opacity={0.12}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}