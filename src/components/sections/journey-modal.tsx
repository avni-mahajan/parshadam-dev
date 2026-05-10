"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type JourneyModalProps = {
  open: boolean;
  onClose: () => void;
};

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

export const JourneyModal = ({ open, onClose }: JourneyModalProps) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 backdrop-blur-sm"
            style={{ backgroundColor: "rgba(44,26,14,0.55)" }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 bottom-0 z-50 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl lg:max-w-3xl"
            role="dialog"
            aria-modal="true"
            aria-label="The Journey Behind Every Blessing"
          >
            <div
              className="relative rounded-t-3xl md:rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto"
              style={{
                background: "#FFFAF3",
                border: "1px solid rgba(160,100,40,0.18)",
                boxShadow: "0 24px 80px rgba(160,100,40,0.18)",
              }}
            >
              {/* Warm top accent band */}
              <div
                className="h-1 w-full"
                style={{
                  background: "linear-gradient(90deg, #C17B2B 0%, #DFA94A 50%, #C17B2B 100%)",
                }}
              />

              {/* Header */}
              <div
                className="sticky top-0 z-10 px-8 py-6 flex items-start justify-between"
                style={{
                  background: "rgba(255,250,243,0.97)",
                  backdropFilter: "blur(8px)",
                  borderBottom: "1px solid rgba(160,100,40,0.12)",
                }}
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="h-[1.5px] w-5 rounded"
                      style={{ background: "#C17B2B" }}
                    />
                    <span
                      className="text-[9px] uppercase tracking-[0.5em]"
                      style={{ color: "#C17B2B" }}
                    >
                      Parshadam · Unati Behan
                    </span>
                  </div>
                  <h2
                    className="text-xl md:text-2xl font-bold leading-tight"
                    style={{ color: "#2C1A0E" }}
                  >
                    The Journey Behind Every Blessing
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 mt-1 hover:opacity-70"
                  style={{
                    border: "1px solid rgba(160,100,40,0.25)",
                    color: "#A07850",
                  }}
                  aria-label="Close"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="px-8 py-10">
                {/* Intro quote */}
                <div
                  className="rounded-2xl p-5 mb-10"
                  style={{ background: "rgba(193,123,43,0.07)", border: "1px solid rgba(193,123,43,0.15)" }}
                >
                  <p
                    className="text-sm leading-relaxed font-light italic"
                    style={{ color: "#6B4226" }}
                  >
                    Behind every blessing that arrives at your celebration lies a sacred journey —
                    from the sanctum sanctorum of India&apos;s most ancient shrines, through the
                    devoted hands of a Unati Behan, to your family&apos;s most meaningful moments.
                  </p>
                </div>

                {/* Steps */}
                <div className="space-y-8">
                  {steps.map((step, i) => (
                    <motion.div
                      key={step.num}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                      className="flex gap-5"
                    >
                      {/* Step number + connector line */}
                      <div className="flex flex-col items-center flex-shrink-0 w-8">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                          style={{
                            background: "rgba(193,123,43,0.12)",
                            color: "#C17B2B",
                            border: "1px solid rgba(193,123,43,0.3)",
                          }}
                        >
                          {step.num}
                        </div>
                        {i < steps.length - 1 && (
                          <div
                            className="w-[1px] flex-1 mt-2 min-h-[32px]"
                            style={{ background: "rgba(193,123,43,0.18)" }}
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div className="pb-2 pt-0.5">
                        <h3
                          className="text-base font-semibold mb-2 leading-snug"
                          style={{ color: "#2C1A0E" }}
                        >
                          {step.title}
                        </h3>
                        <p
                          className="text-sm leading-relaxed font-light"
                          style={{ color: "#6B4226" }}
                        >
                          {step.body}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Closing quote */}
                <div
                  className="mt-12 pt-8 text-center"
                  style={{ borderTop: "1px solid rgba(160,100,40,0.15)" }}
                >
                  <span
                    className="text-lg block mb-3"
                    style={{ color: "#C17B2B" }}
                  >
                    ✦
                  </span>
                  <p
                    className="text-sm italic leading-relaxed max-w-sm mx-auto"
                    style={{ color: "#A07850" }}
                  >
                    &ldquo;A blessing is not a thing — it is a journey. And every
                    journey deserves to be made with intention.&rdquo;
                  </p>
                  <span
                    className="block mt-4 text-[9px] uppercase tracking-[0.5em]"
                    style={{ color: "#C17B2B" }}
                  >
                    Parshadam
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
