"use client";

import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { sanataniShrines, type FaithShrine } from "@/components/sections/sanatani-data";
import ShrineNode from "./ShrineNode";
import EnergyLines from "./EnergyLines";
import StarField from "./StarField";

interface ShrineGalaxyProps {
  searchQuery: string;
  setHoveredShrine: (shrine: FaithShrine | null) => void;
  onShrineClick: (shrine: FaithShrine) => void;
}

// Spiral galaxy placement algorithm - scales to ANY number of shrines
function calculateGalaxyPositions(count: number): THREE.Vector3[] {
  const positions: THREE.Vector3[] = [];
  const arms = 2;
  const spiralTightness = 2.5;

  for (let i = 0; i < count; i++) {
    const t = (i / count) * 1.5;
    const arm = i % arms;
    const armOffset = (arm / arms) * Math.PI * 2;
    const radius = 2 + t * 4;
    const angle = t * spiralTightness * Math.PI + armOffset;
    const scatter = 0.3;
    const x = Math.cos(angle) * (radius + (Math.random() - 0.5) * scatter);
    const z = Math.sin(angle) * (radius + (Math.random() - 0.5) * scatter);
    const y = Math.sin(t * Math.PI * 0.8 + arm) * 0.8 + (Math.random() - 0.5) * 0.4;
    positions.push(new THREE.Vector3(x, y, z));
  }

  return positions;
}

function Scene({ searchQuery, setHoveredShrine, onShrineClick }: ShrineGalaxyProps) {
  const positions = useMemo(() => calculateGalaxyPositions(sanataniShrines.length), []);

  const centerGlow = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, "rgba(232, 160, 32, 0.08)");
    gradient.addColorStop(0.3, "rgba(232, 160, 32, 0.04)");
    gradient.addColorStop(1, "rgba(232, 160, 32, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  return (
    <>
      <ambientLight intensity={0.4} color="#E8A020" />
      <directionalLight position={[5, 10, 5]} intensity={0.8} color="#FFE4B5" />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#9B59B6" />

      {/* Center glow */}
      <sprite scale={[15, 15, 1]} position={[0, 0, 0]}>
        <spriteMaterial
          map={centerGlow}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </sprite>

      {/* Center divine rings */}
      <mesh position={[0, 0, 0]}>
        <ringGeometry args={[0.5, 0.8, 32]} />
        <meshBasicMaterial color="#E8A020" transparent opacity={0.15} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <ringGeometry args={[0.9, 1.0, 32]} />
        <meshBasicMaterial color="#E8A020" transparent opacity={0.08} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      <StarField count={3000} />
      <EnergyLines nodePositions={positions} color="#E8A020" />

      {sanataniShrines.map((shrine, index) => (
        <ShrineNode
          key={shrine.id}
          shrine={shrine}
          position={positions[index]}
          index={index}
          searchQuery={searchQuery}
          onHover={setHoveredShrine}
          onClick={onShrineClick}
        />
      ))}

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableDamping={true}
        dampingFactor={0.08}
        autoRotate={!searchQuery}
        autoRotateSpeed={0.5}
        minDistance={3}
        maxDistance={20}
        target={[0, 0, 0]}
      />
    </>
  );
}

export default function ShrineGalaxy(props: ShrineGalaxyProps) {
  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <PerspectiveCamera makeDefault position={[0, 4, 8]} fov={60} />
      <Scene {...props} />
    </Canvas>
  );
}