"use client";

import { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import type { FaithShrine } from "@/components/sections/sanatani-data";

interface ShrineNodeProps {
  shrine: FaithShrine;
  position: THREE.Vector3;
  index: number;
  searchQuery: string;
  onHover: (shrine: FaithShrine | null) => void;
  onClick: (shrine: FaithShrine) => void;
}

export default function ShrineNode({ shrine, position, index, searchQuery, onHover, onClick }: ShrineNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Sprite>(null);
  const [hovered, setHovered] = useState(false);

  const glowColor = shrine.cosmicGlow || shrine.accentColor || "#E8A020";

  const searchLower = searchQuery.toLowerCase();
  const matchesSearch = !searchQuery || 
    shrine.name.toLowerCase().includes(searchLower) ||
    shrine.state.toLowerCase().includes(searchLower) ||
    shrine.deity.toLowerCase().includes(searchLower) ||
    shrine.location.toLowerCase().includes(searchLower);

  // Create a canvas texture for the shrine
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;

    // Background circle
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, "#1a1a2e");
    gradient.addColorStop(0.5, "#16213e");
    gradient.addColorStop(1, "#0f0f23");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(128, 128, 124, 0, Math.PI * 2);
    ctx.fill();

    // Border
    ctx.strokeStyle = glowColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(128, 128, 126, 0, Math.PI * 2);
    ctx.stroke();

    // First letter
    ctx.fillStyle = glowColor;
    ctx.font = "bold 64px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(shrine.name.charAt(0), 128, 100);

    // Name below
    ctx.fillStyle = "#ffffff";
    ctx.font = "14px sans-serif";
    const shortName = shrine.name.length > 15 ? shrine.name.substring(0, 14) + "…" : shrine.name;
    ctx.fillText(shortName, 128, 180);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, [shrine, glowColor]);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating
      meshRef.current.position.y = position.y + Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.3;
      meshRef.current.position.x = position.x + Math.sin(state.clock.elapsedTime * 0.3 + index * 1.5) * 0.2;
      meshRef.current.position.z = position.z + Math.cos(state.clock.elapsedTime * 0.4 + index * 2) * 0.2;

      // Rotation
      meshRef.current.rotation.y += 0.005;

      // Scale on hover or search match
      const targetScale = hovered || matchesSearch ? 1.8 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
    }

    if (glowRef.current && meshRef.current) {
      glowRef.current.position.copy(meshRef.current.position);
      glowRef.current.scale.setScalar(hovered || matchesSearch ? 3 : 2);
    }
  });

  // Glow sprite texture
  const glowTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, `${glowColor}${hovered ? "cc" : "66"}`);
    gradient.addColorStop(0.3, `${glowColor}${hovered ? "4d" : "1a"}`);
    gradient.addColorStop(1, `${glowColor}00`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, [hovered, glowColor]);

  const opacity = matchesSearch ? 1 : searchQuery ? 0.2 : 1;

  return (
    <group>
      {/* Glow sprite */}
      <sprite ref={glowRef} scale={[2, 2, 1]}>
        <spriteMaterial 
          map={glowTexture} 
          transparent 
          opacity={opacity} 
          blending={THREE.AdditiveBlending} 
          depthWrite={false} 
        />
      </sprite>

      {/* Main sphere */}
      <mesh
        ref={meshRef}
        position={[position.x, position.y, position.z]}
        onPointerEnter={() => { setHovered(true); onHover(shrine); }}
        onPointerLeave={() => { setHovered(false); onHover(null); }}
        onClick={(e) => { e.stopPropagation(); onClick(shrine); }}
      >
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          map={texture}
          transparent
          opacity={opacity}
          emissive={new THREE.Color(hovered || matchesSearch ? glowColor : "#000000")}
          emissiveIntensity={hovered ? 0.5 : matchesSearch ? 0.3 : 0}
          roughness={0.3}
          metalness={0.7}
        />

        {/* Ring aura */}
        <lineSegments>
          <edgesGeometry args={[new THREE.SphereGeometry(1.1, 16, 16)]} />
          <lineBasicMaterial 
            color={glowColor}
            transparent 
            opacity={(hovered || matchesSearch) ? 0.4 * opacity : 0.1 * opacity} 
          />
        </lineSegments>
      </mesh>

      {/* Hover label */}
      {(hovered || (matchesSearch && searchQuery)) && (
        <Text
          position={[position.x, position.y - 1.8, position.z]}
          fontSize={0.3}
          color="#FFFBF7"
          anchorX="center"
          anchorY="top"
          outlineWidth={0.02}
          outlineColor="#000000"
          maxWidth={3}
          fillOpacity={opacity}
        >
          {shrine.name}
        </Text>
      )}
    </group>
  );
}