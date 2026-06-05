"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Flower2 } from "lucide-react";
import { shrines } from "@/components/sections/sacred-map-data";
import { sikhShrines } from "@/components/sections/sikh-data";
import { Carousel3D } from "@/components/ui/carousel-3d";

type Faith = "all" | "hindu" | "sikh";

type ParshadOffer = {
  id: string;
  name: string;
  shrineName: string;
  shrineId: string;
  faith: Exclude<Faith, "all">;
  state: string;
  deity: string;
  shortDesc: string;
  tagline: string;
  legend: string;
  image: string;
  items: string[];
  giftingRecommendation: string;
  prayer: string;
  blessingPower: string;
  sacredConnection: string;
  morningPrayer: string;
};

function buildParshads(): ParshadOffer[] {
  const hindu: ParshadOffer[] = shrines.map((s) => ({
    id: s.id,
    name: s.giftingRecommendation.split(" — ")[0] || s.name + " Prasadam",
    shrineName: s.name,
    shrineId: s.id,
    faith: "hindu" as const,
    state: s.state,
    deity: s.deity,
    shortDesc: s.shortDesc,
    tagline: s.tagline,
    legend: s.legend,
    image: s.image,
    items: s.offerings,
    giftingRecommendation: s.giftingRecommendation,
    prayer: s.morningPrayer,
    blessingPower: s.blessingPower,
    sacredConnection: s.sacredConnection,
    morningPrayer: s.morningPrayer,
  }));

  const sikh: ParshadOffer[] = sikhShrines.map((s) => ({
    id: s.id,
    name: "Karah Parshad — " + s.name,
    shrineName: s.name,
    shrineId: s.id,
    faith: "sikh" as const,
    state: s.state,
    deity: s.guru,
    shortDesc: s.description,
    tagline: s.tagline,
    legend: s.history,
    image: s.image,
    items: s.offerings,
    giftingRecommendation:
      "The 'Waheguru Blessing' Box — Featuring Karah Parshad, Amrit Jal, and a blessed Rumala",
    prayer: "Waheguru Ji Ka Khalsa, Waheguru Ji Ki Fateh",
    blessingPower:
      "Grants inner peace, humility, and connection to the divine light. The sacred energy of the Golden Temple removes ego and fills the heart with selfless love.",
    sacredConnection:
      "Prasadam from Sri Harmandir Sahib carries the boundless grace of Waheguru — shared in the spirit of seva, equality, and divine love that knows no distinction.",
    morningPrayer:
      "Ik Onkar, Sat Nam, Karta Purakh, Nirbhau, Nirvair, Akal Murat, Ajuni, Saibhang, Gur Prasad.",
  }));

  return [...hindu, ...sikh];
}

const allParshads = buildParshads();

const carouselProducts = allParshads.slice(0, 6).map((p) => ({
  id: p.id,
  name: p.name,
  location: p.shrineName,
  description: p.tagline,
  image: p.image,
}));

export function ParshadSection() {
  return (
    <section className="pt-8 pb-20 relative overflow-hidden bg-background">
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <div className="mb-3 flex items-center justify-center gap-4">
            <div className="h-px w-8 bg-amber-400/30" />
            <span className="text-[10px] uppercase tracking-[0.5em] font-medium text-amber-600">
              Blessed Offerings
            </span>
            <div className="h-px w-8 bg-amber-400/30" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-light text-stone-900 mb-3"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Parshadam Offerings
          </h2>
          <p className="text-sm text-stone-500 font-light max-w-2xl mx-auto leading-relaxed">
            Hand-prepared temple prasadam, blessed at the altar and delivered to your home.
            Each offering carries the living energy of its holy origin.
          </p>
        </motion.div>

        {/* 3D Carousel */}
        <div className="-mx-6">
          <Carousel3D products={carouselProducts} autoPlaySpeed={0.004} />
        </div>

        {/* Decorative line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="absolute -bottom-32 left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0 flex flex-col items-center gap-4"
        >
          <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
        </motion.div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            href="/parshads"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-amber-600 hover:text-amber-700 transition-colors group"
          >
            <Flower2 className="w-3.5 h-3.5" />
            <span>View All Offerings</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
