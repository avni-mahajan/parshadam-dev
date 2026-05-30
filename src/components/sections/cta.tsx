"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Flame, Heart, Home } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";

const journeySteps = [
  { icon: Flame, label: "The Temple Flame", sub: "Blessed at the sanctum", num: "01" },
  { icon: Heart, label: "Devotional Custody", sub: "Hand-carried with prayer", num: "02" },
  { icon: Home, label: "Your Threshold", sub: "The blessing arrives", num: "03" },
];

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
};

function FloatingEmbers() {
  const [embers, setEmbers] = React.useState<any[]>([]);

  React.useEffect(() => {
    setEmbers(
      [...Array(12)].map((_, i) => ({
        id: i,
        size: Math.random() * 3 + 1.5,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 6 + 4,
        x1: Math.random() * 40 - 20,
        x2: Math.random() * 60 - 30,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {embers.map((ember) => (
        <motion.div
          key={ember.id}
          className="absolute rounded-full bg-accent"
          style={{
            width: ember.size,
            height: ember.size,
            left: `${ember.left}%`,
            bottom: "-5%",
            filter: "blur(0.5px)",
            boxShadow: "0 0 6px #D97A1D, 0 0 10px #E5B93D",
          }}
          initial={{ y: 0, opacity: 0, scale: 0.5 }}
          animate={{
            y: ["0%", "-115%"],
            x: ["0%", `${ember.x1}px`, `${ember.x2}px`],
            opacity: [0, 0.7, 0.7, 0],
            scale: [0.5, 1.2, 0.8, 0.1],
          }}
          transition={{
            duration: ember.duration,
            repeat: Infinity,
            delay: ember.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

function JourneyTimeline({ animate }: { animate: boolean }) {
  return (
    <div className="relative w-full">
      {/* Watermark */}
      <span
        className="pointer-events-none absolute -top-6 right-0 select-none font-[family-name:var(--font-eb-garamond)] text-[7rem] leading-none text-white/[0.015]"
        aria-hidden
      >
        03
      </span>

      <div className="relative grid grid-cols-3 gap-2 md:gap-4">
        {/* Track */}
        <div className="absolute top-[22px] left-[16%] right-[16%] h-px bg-white/10" aria-hidden />
        <motion.div
          className="absolute top-[22px] left-[16%] right-[16%] h-px origin-left"
          style={{
            background: "linear-gradient(90deg, #D97A1D 0%, #E5B93D 55%, #D97A1D 100%)",
            boxShadow: "0 0 8px rgba(229,185,61,0.3)",
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease, delay: 0.25 }}
          aria-hidden
        />
        {animate && (
          <motion.div
            className="absolute top-[19px] h-[7px] w-[7px] bg-accent ring-2 ring-[#0B1511]"
            initial={{ left: "16%", opacity: 0 }}
            animate={{ left: ["16%", "50%", "84%"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
            aria-hidden
          />
        )}

        {journeySteps.map((step, i) => (
          <motion.div
            key={step.label}
            className="relative flex flex-col items-center text-center pt-1"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.35 + i * 0.15, ease }}
          >
            <motion.div
              className="relative z-10 flex h-11 w-11 items-center justify-center border border-accent/20 bg-[#12231C]/90 shadow-[0_4px_20px_rgba(229,185,61,0.08)] rounded-full transition-colors duration-500 hover:border-accent/50"
              whileInView={
                animate
                  ? {
                      borderColor: [
                        "rgba(217,122,29,0.2)",
                        "rgba(229,185,61,0.5)",
                        "rgba(217,122,29,0.2)",
                      ],
                      boxShadow: [
                        "0 4px 20px rgba(229,185,61,0.08)",
                        "0 4px 25px rgba(229,185,61,0.25)",
                        "0 4px 20px rgba(229,185,61,0.08)",
                      ],
                    }
                  : undefined
              }
              transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.9 }}
              viewport={{ once: false }}
            >
              <span className="absolute -top-5 text-[8px] font-semibold tracking-[0.25em] text-accent/80">
                {step.num}
              </span>
              <step.icon className="h-4.5 w-4.5 text-[#E5B93D]" strokeWidth={1.5} />
            </motion.div>
            <p className="mt-3 text-[9px] font-medium uppercase tracking-[0.22em] text-[#F6EFE3]/90">
              {step.label}
            </p>
            <p className="mt-0.5 hidden text-[8px] tracking-wide text-[#7A9278]/80 sm:block">
              {step.sub}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export const CTA = () => {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setMounted(true);
  }, []);

  const reduceMotion = mounted && Boolean(prefersReducedMotion);
  const canAnimate = mounted && !reduceMotion;

  return (
    <section className="relative z-10 isolate overflow-hidden bg-background py-16 md:py-24">
      {/* Section atmosphere */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(229,185,61,0.06)_0%,transparent_28%,transparent_72%,rgba(30,77,61,0.04)_100%)]"
        aria-hidden
      />
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease }}
        className="absolute top-0 left-0 right-0 h-[2px] origin-center bg-gradient-to-r from-transparent via-accent to-transparent"
        aria-hidden
      />

      <motion.div
        variants={stagger}
        initial={false}
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="container relative z-10 mx-auto max-w-5xl px-6"
      >
        <motion.article
          variants={fadeUp}
          className="relative overflow-hidden rounded-[2.5rem] border border-accent/15 bg-[linear-gradient(145deg,#060D0A_0%,#11221B_50%,#091310_100%)] shadow-[0_40px_100px_-30px_rgba(6,13,10,0.85),0_0_60px_rgba(217,122,29,0.06)]"
        >
          {/* Top accent bar */}
          <motion.div
            className="h-[3px] w-full origin-left bg-gradient-to-r from-primary via-accent to-glow"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease, delay: 0.1 }}
            aria-hidden
          />

          {/* Floating Embers Background */}
          {canAnimate && <FloatingEmbers />}

          {/* Divine ambient glow */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-25 z-0"
            style={{
              background: "radial-gradient(circle, rgba(217,122,29,0.22) 0%, rgba(229,185,61,0.08) 60%, transparent 100%)",
            }}
            animate={canAnimate ? {
              scale: [1, 1.12, 1],
              opacity: [0.18, 0.28, 0.18],
            } : undefined}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            aria-hidden
          />

          <motion.div
            className="pointer-events-none absolute inset-0 motion-reduce:hidden z-0"
            initial={{ x: "-120%" }}
            whileInView={{ x: "220%" }}
            viewport={{ once: false }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 8, ease: "easeInOut" }}
            style={{
              background:
                "linear-gradient(100deg, transparent 42%, rgba(255,255,255,0.05) 50%, transparent 58%)",
            }}
            aria-hidden
          />

          <motion.div
            className="pointer-events-none absolute inset-0 border border-white/[0.03] rounded-[2.5rem] z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            aria-hidden
          />

          <motion.div
            className="pointer-events-none absolute -left-px top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-accent/20 to-transparent z-10"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease }}
            aria-hidden
          />

          <div className="grid gap-10 p-8 md:grid-cols-[1fr_1.05fr] md:gap-12 md:p-10 lg:p-12 relative z-10">
            {/* Copy column */}
            <div className="flex flex-col justify-center text-left">
              <motion.div variants={fadeUp} className="mb-5 flex items-center gap-3">
                <motion.span
                  className="h-px bg-accent/40"
                  initial={{ width: 0 }}
                  whileInView={{ width: 32 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease }}
                />
                <span className="text-[9px] font-bold uppercase tracking-[0.55em] text-accent">
                  ✦ RECEIVE THE BLESSING ✦
                </span>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="mb-4 font-[family-name:var(--font-eb-garamond)] text-[1.85rem] leading-[1.12] tracking-tight text-white md:text-[2.35rem]"
              >
                A bridge of fire and faith,
                <br />
                <span className="italic text-glow font-light">from shrine to threshold.</span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mb-8 max-w-sm text-sm font-light leading-relaxed tracking-wide text-[#F6EFE3]/70"
              >
                Every offering is hand-carried by Unati Behan directly from the sacred flame of India&apos;s ancient shrines. No warehouses, no middlemen. Just pure devotion delivered directly to your threshold.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Magnetic strength={0.28}>
                  <Link href="/journey" className="group relative block w-full sm:w-auto">
                    <motion.span
                      whileHover={reduceMotion ? undefined : { y: -2 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.99 }}
                      className="relative flex w-full items-center justify-center gap-3 overflow-hidden border border-glow/30 bg-gradient-to-r from-accent to-glow px-8 py-4 text-[10px] font-bold uppercase tracking-[0.36em] text-white shadow-[0_4px_20px_rgba(217,122,29,0.22)] transition-shadow duration-500 hover:shadow-[0_8px_30px_rgba(229,185,61,0.45)] sm:min-w-[260px]"
                    >
                      <motion.span
                        className="absolute inset-0 origin-left bg-gradient-to-r from-glow to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 motion-reduce:hidden"
                        aria-hidden
                      />
                      <span className="relative z-10">Step Into the Journey</span>
                      <motion.span
                        className="relative z-10"
                        animate={canAnimate ? { x: [0, 4, 0] } : undefined}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <ArrowRight className="h-4 w-4" strokeWidth={2} />
                      </motion.span>
                    </motion.span>
                  </Link>
                </Magnetic>

                <Link
                  href="#sacred-origins"
                  className="group flex w-full items-center justify-center gap-2 border border-white/10 bg-white/5 px-8 py-4 text-[10px] uppercase tracking-[0.36em] text-white/80 transition-all duration-500 hover:border-accent/40 hover:bg-white/10 hover:text-white sm:w-auto"
                >
                  Sacred Map
                  <ArrowRight className="h-3 w-3 opacity-40 transition-transform group-hover:translate-x-0.5 group-hover:opacity-80" />
                </Link>
              </motion.div>

              <motion.ul
                variants={fadeUp}
                className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-6"
              >
                {["Shrine to doorstep", "Hand-carried", "No middlemen"].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-[9px] uppercase tracking-[0.22em] text-[#7A9278]"
                  >
                    <span className="h-1.5 w-1.5 bg-[#E5B93D] rounded-full" aria-hidden />
                    {item}
                  </li>
                ))}
              </motion.ul>
            </div>

            {/* Journey column */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col justify-center border-t border-[#1E4D3D]/10 pt-8 md:border-t-0 md:border-l md:border-white/10 md:pl-10 md:pt-0"
            >
              <motion.p
                variants={fadeUp}
                className="mb-6 text-center text-[9px] uppercase tracking-[0.45em] text-[#7A9278] md:text-left"
              >
                Your path unfolds
              </motion.p>
              <JourneyTimeline animate={canAnimate} />
            </motion.div>
          </div>
        </motion.article>
      </motion.div>
    </section>
  );
};
