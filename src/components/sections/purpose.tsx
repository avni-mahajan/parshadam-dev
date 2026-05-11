"use client";

import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "The Sacred Source",
    body: "Parshadam is not a product — it is a living tradition. At every Jyotirlinga and sacred center across India, prasadam is prepared as an offering to the divine, carrying the energy of ritual, prayer, and centuries of devotion.",
  },
  {
    num: "02",
    title: "Unati Behan — The Sacred Carrier",
    body: "Unati Behan is a network of devoted women who travel to sacred shrines, receive the prasadam with intention, and carry it back with reverence. They are not couriers — they are the living bridge between the shrine and your family.",
  },
  {
    num: "03",
    title: "From Shrine to Your Home",
    body: "When you celebrate a wedding, a birth, a thread ceremony, or any sacred milestone — the prasadam delivered by Unati Behan arrives not as a package, but as a blessing personally carried from the source.",
  },
  {
    num: "04",
    title: "Why This Journey Matters",
    body: "In a world of instant delivery, some things deserve to travel slowly — with intention, with prayer, with love. Parshadam preserves this sacred journey, ensuring that divine blessings from India's holiest shrines reach every family that desires them.",
  },
];

export const Purpose = () => {
  return (
    <section className="relative py-32 overflow-hidden" style={{ backgroundColor: "#FFFAF3" }}>
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C17B2B]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C17B2B]/20 to-transparent" />

      {/* Sacred ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C17B2B]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-start">

          {/* Left Column: Heading & Intro */}
          <div className="lg:w-1/3 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[1px] w-8 bg-[#C17B2B]" />
                <span className="text-[10px] uppercase tracking-[0.5em] font-medium" style={{ color: "#C17B2B" }}>
                  Our Purpose
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-heading mb-8 leading-tight" style={{ color: "#2C1A0E" }}>
                The Journey Behind <br />
                <span className="italic font-light opacity-80 text-[#C17B2B]">Every Blessing</span>
              </h2>

              <p className="text-sm md:text-base leading-relaxed font-light italic mb-10 max-w-md" style={{ color: "#6B4226" }}>
                Behind every blessing that arrives at your celebration lies a sacred journey —
                from the sanctum sanctorum of India's most ancient shrines,
                to your family's most meaningful moments.
              </p>

              <div className="w-20 h-[1px]" style={{ background: "rgba(160,100,40,0.15)" }} />
            </motion.div>
          </div>

          {/* Right Column: Steps */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {steps.map((step, index) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  className="group"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-[11px] font-bold tracking-widest text-[#C17B2B]/40 group-hover:text-[#C17B2B] transition-colors duration-500">
                        {step.num}
                      </span>
                      <div className="h-px flex-1 bg-gradient-to-r from-[#C17B2B]/20 to-transparent" />
                    </div>

                    <h3 className="text-xl font-semibold mb-4 tracking-tight group-hover:translate-x-2 transition-transform duration-500" style={{ color: "#2C1A0E" }}>
                      {step.title}
                    </h3>

                    <p className="text-sm leading-relaxed font-light opacity-80" style={{ color: "#6B4226" }}>
                      {step.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quote Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="mt-24 text-center border-t border-[#C17B2B]/10 pt-16"
            >
              <p className="text-lg md:text-xl italic font-light max-w-2xl mx-auto mb-8" style={{ color: "#A07850" }}>
                &ldquo;A blessing is not a thing — it is a journey. And every journey deserves to be made with intention.&rdquo;
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-12 bg-[#C17B2B]/20" />
                <span className="text-[9px] uppercase tracking-[0.5em]" style={{ color: "#C17B2B" }}>Parshadam Initiative</span>
                <div className="h-px w-12 bg-[#C17B2B]/20" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
