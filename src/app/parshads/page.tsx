"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { allParshads } from "@/components/parshad-discovery/data";
import { ParshadCanvas } from "@/components/parshad-discovery/parshad-canvas";
import type { ParshadDiscovery } from "@/components/parshad-discovery/types";

export default function ParshadsPage() {
  const router = useRouter();

  const handleSelect = useCallback(
    (p: ParshadDiscovery) => {
      router.push(`/shrine/${p.shrineId}`);
    },
    [router]
  );

  return (
    <main
      className="relative min-h-screen"
      style={{
        background:
          "linear-gradient(160deg, #D8CBE4 0%, #F2EDDA 35%, #F5EFC8 60%, #D0C2E0 100%)",
      }}
    >
      <ParshadCanvas parshads={allParshads} onSelect={handleSelect} />
    </main>
  );
}
