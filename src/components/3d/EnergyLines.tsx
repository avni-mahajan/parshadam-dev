"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface EnergyLinesProps {
  nodePositions: THREE.Vector3[];
  color?: string;
}

export default function EnergyLines({ nodePositions, color = "#E8A020" }: EnergyLinesProps) {
  const ref = useRef<THREE.LineSegments>(null);
  const materialRef = useRef<THREE.LineBasicMaterial>(null);

  const { positions, lineColors } = useMemo(() => {
    if (nodePositions.length < 2) {
      return { positions: new Float32Array(0), lineColors: new Float32Array(0) };
    }

    // Connect each node to its 2 nearest neighbors for a web-like constellation
    const connections: [number, number][] = [];
    for (let i = 0; i < nodePositions.length; i++) {
      const distances: { index: number; dist: number }[] = [];
      for (let j = 0; j < nodePositions.length; j++) {
        if (i === j) continue;
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        distances.push({ index: j, dist });
      }
      distances.sort((a, b) => a.dist - b.dist);
      // Connect to 2 nearest
      for (let k = 0; k < Math.min(2, distances.length); k++) {
        const j = distances[k].index;
        // Avoid duplicates by only adding if i < j
        if (i < j) {
          connections.push([i, j]);
        }
      }
    }

    const col = new THREE.Color(color);
    const pos = new Float32Array(connections.length * 6);
    const cols = new Float32Array(connections.length * 6);

    connections.forEach(([i, j], idx) => {
      const p1 = nodePositions[i];
      const p2 = nodePositions[j];
      pos[idx * 6] = p1.x;
      pos[idx * 6 + 1] = p1.y;
      pos[idx * 6 + 2] = p1.z;
      pos[idx * 6 + 3] = p2.x;
      pos[idx * 6 + 4] = p2.y;
      pos[idx * 6 + 5] = p2.z;

      // Fade color
      const alpha = 0.15 + Math.random() * 0.2;
      cols[idx * 6] = col.r * alpha;
      cols[idx * 6 + 1] = col.g * alpha;
      cols[idx * 6 + 2] = col.b * alpha;
      cols[idx * 6 + 3] = col.r * alpha;
      cols[idx * 6 + 4] = col.g * alpha;
      cols[idx * 6 + 5] = col.b * alpha;
    });

    return { positions: pos, lineColors: cols };
  }, [nodePositions, color]);

  useFrame(() => {
    if (materialRef.current) {
      // Subtle pulse
      materialRef.current.opacity = 0.2 + Math.sin(Date.now() * 0.0005) * 0.08;
    }
  });

  if (positions.length === 0) return null;

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[lineColors, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        ref={materialRef}
        vertexColors
        transparent
        opacity={0.25}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}