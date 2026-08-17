"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, useTransform, useSpring as useSpringVal } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Hand,
  Layers,
  Minus,
  Phone,
  Plus,
  ShoppingCart,
  Sparkles,
  Trash2,
  Truck,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";

const EASE = [0.22, 1, 0.36, 1] as const;

const BG = "#EDE4D5";
const INK = "#1A1520";
const PURPLE = "#2D2238";
const PURPLE_DEEP = "#1E1528";
const SAGE = "#7A9A75";
const SAGE_DEEP = "#5A6E58";
const SAGE_TINT = "#E8E2D8";
const WARM_YELLOW = "#C4A76C";
const WARM_YELLOW_DEEP = "#B89A62";
const MUTED = "#5A5568";
const BORDER = "#D4CCBE";
const CREAM = "#F5EDE0";
const CHAMPAGNE = "#D4C09A";
const LAVENDER = "#9B8FB4";
const TERRACOTTA = "#C49A7C";

const label = "text-[11px] font-semibold uppercase tracking-[0.16em]";
const container = "mx-auto max-w-6xl px-5 md:px-8";
const serif = "font-[family-name:var(--font-heading)]";
const sans = "font-[family-name:var(--font-sans)]";

const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay: i * 0.08 },
  }),
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

const staggerSlow = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
};

const blurIn = {
  hidden: { opacity: 0, filter: "blur(8px)", y: 20 },
  show: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.8, ease: EASE } },
};

/* ─── Awwwards-level animation components ─── */

function MagneticElement({ children, className = "", strength = 0.3 }: { children: React.ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  }, [x, y, strength]);

  const handleLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <motion.div ref={ref} style={{ x: springX, y: springY }} onMouseMove={handleMouse} onMouseLeave={handleLeave} className={className}>
      {children}
    </motion.div>
  );
}

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(springY, [0, 1], [8, -8]);
  const rotateY = useTransform(springX, [0, 1], [-8, 8]);

  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }, [x, y]);

  const handleLeave = useCallback(() => { x.set(0.5); y.set(0.5); }, [x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function BlurRevealText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, filter: "blur(12px)", y: 10 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {text}
    </motion.span>
  );
}

function SplitText({ text, className = "", staggerDelay = 0.03, initialDelay = 0 }: { text: string; className?: string; staggerDelay?: number; initialDelay?: number }) {
  const letters = text.split("");
  return (
    <span className="inline-flex flex-wrap" aria-label={text}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30, rotateX: -60, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: initialDelay + i * staggerDelay, ease: EASE }}
          style={{ display: "inline-block", transformOrigin: "bottom" }}
          aria-hidden="true"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
}

function MagneticButton({ children, className = "", ...props }: { children: React.ReactNode; className?: string; [key: string]: unknown }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.25);
    y.set((e.clientY - cy) * 0.25);
  }, [x, y]);

  const handleLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={className}
      {...(props as Record<string, unknown>)}
    >
      {children}
    </motion.button>
  );
}

function ParallaxImage({ src, alt, className = "", intensity = 15 }: { src: string; alt: string; className?: string; intensity?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 20 });
  const springY = useSpring(y, { stiffness: 100, damping: 20 });
  const moveX = useTransform(springX, [-1, 1], [-intensity, intensity]);
  const moveY = useTransform(springY, [-1, 1], [-intensity, intensity]);

  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    x.set(nx);
    y.set(ny);
  }, [x, y]);

  const handleLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <div ref={ref} onMouseMove={handleMouse} onMouseLeave={handleLeave} className={className}>
      <motion.div style={{ x: moveX, y: moveY }} className="h-full w-full">
        <Image src={src} alt={alt} fill className="object-contain" sizes="(min-width: 1024px) 28vw, 70vw" priority />
      </motion.div>
    </div>
  );
}

type Box = {
  id: string;
  name: string;
  label: string;
  price: number;
  contents: string[];
  image: string;
  accent: string;
  glow: string;
  note: string;
  blurb: string;
};

const weddingBoxes: Box[] = [
  {
    id: "bridal-blessings",
    name: "Bridal Blessings",
    label: "Signature",
    price: 3299,
    contents: ["Pink laddu", "Sacred sindoor", "Dry-fruit tins"],
    image: "/images/wedb2.png",
    accent: "#D4A5A5",
    glow: "#B8A7CF",
    note: "A curated box of blessings for the bride.",
    blurb: "Celebrate the bride with a curated selection of sacred sweets and blessings.",
  },
  {
    id: "gulkand-delight",
    name: "Gulkand Delight",
    label: "Classic",
    price: 1899,
    contents: ["Rose gulkand", "Mishri", "Dry fruits"],
    image: "/images/webb3.png",
    accent: "#E8B4B8",
    glow: "#C9B98B",
    note: "Rose-infused sweetness for new beginnings.",
    blurb: "Rose-infused sweetness to bless new beginnings with divine fragrance.",
  },
  {
    id: "coconut-blessings",
    name: "Coconut Blessings",
    label: "Deluxe",
    price: 2499,
    contents: ["Coconut laddu", "Supari", "Roli"],
    image: "/images/weddingbox.png",
    accent: "#C9B98B",
    glow: "#7E9A7D",
    note: "Traditional coconut prasad for the ceremony.",
    blurb: "Traditional coconut prasad to sanctify the ceremony with ancient blessings.",
  },
  {
    id: "panjiri-thali",
    name: "Panjiri Thali",
    label: "Curated",
    price: 2199,
    contents: ["Panjiri", "Mathri", "Dry-fruit mix"],
    image: "/images/wedb3.png",
    accent: "#A8C6A7",
    glow: "#B8A7CF",
    note: "Wholesome panjiri thali for post-partum blessings.",
    blurb: "Wholesome panjiri thali for post-partum blessings and nourishment.",
  },
];

const corporateBoxes: Box[] = [
  {
    id: "festive-hamper",
    name: "Festive Hamper",
    label: "Signature",
    price: 2999,
    contents: ["Dry-fruit box", "Saffron", "Dry fruits"],
    image: "/images/corp1.png",
    accent: "#C9B98B",
    glow: "#C9B98B",
    note: "Premium festive hamper for corporate gifting.",
    blurb: "Premium festive hamper to express gratitude and celebrate success.",
  },
  {
    id: "millet-kheer",
    name: "Millet Kheer Box",
    label: "Deluxe",
    price: 1999,
    contents: ["Millet kheer", "Dry-fruit mix", "Saffron"],
    image: "/images/corp4.png",
    accent: "#E8B4B8",
    glow: "#B8A7CF",
    note: "Healthy millet kheer for wellness gifting.",
    blurb: "Healthy millet kheer to promote wellness and share goodness.",
  },
  {
    id: "festive-special",
    name: "Festive Special",
    label: "Premium",
    price: 3499,
    contents: ["Dry-fruit assortment", "Saffron", "Premium sweets"],
    image: "/images/corps3.png",
    accent: "#B8A7CF",
    glow: "#D4A5A5",
    note: "Premium festive special for high-value gifting.",
    blurb: "Premium festive special to make every occasion unforgettable.",
  },
  {
    id: "besan-laddu",
    name: "Besan Laddu Box",
    label: "Curated",
    price: 1299,
    contents: ["Besan laddu", "Mathri", "Namkeen"],
    image: "/images/corps2.png",
    accent: "#D4A5A5",
    glow: "#C9B98B",
    note: "Classic besan laddu box for celebrations.",
    blurb: "Classic besan laddu box to sweeten every celebration.",
  },
];

const marqueeWords = [
  "Sacred Blessings",
  "Temple Prasad",
  "Handcrafted",
  "Divine Sweets",
  "Pure Ingredients",
  "Blessed & Delivered",
  "Authentic Recipes",
  "Traditional Flavours",
  "Made with Devotion",
  "Gifting with Grace",
];

const features = [
  { icon: Sparkles, title: "Temple-blessed", desc: "Every box is sanctified at a sacred shrine before dispatch." },
  { icon: Truck, title: "Pan-India delivery", desc: "Free tracked shipping in 4–6 business days." },
  { icon: Layers, title: "Fully customisable", desc: "Add your monogram, message card, or choose the contents." },
  { icon: Hand, title: "Handcrafted with care", desc: "Small-batch prasad made with traditional recipes." },
];

const steps = [
  { n: "01", title: "Choose your box", desc: "Pick from wedding, corporate, or create a bespoke edition." },
  { n: "02", title: "We bless & pack", desc: "Prasad is sanctified and packed in our studio." },
  { n: "03", title: "Delivered to you", desc: "Tracked shipping right to your doorstep." },
];

const AUTOPLAY_MS = 5000;

function Quantity({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-[#E3DEE8] bg-white">
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={() => onChange(Math.max(1, value - 1))}
        className="flex h-10 w-10 items-center justify-center text-[#6F6A78] transition-colors hover:text-[#3B2E4E]"
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </motion.button>
      <span className="w-8 text-center text-[15px] font-semibold text-[#262032]">{value}</span>
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={() => onChange(value + 1)}
        className="flex h-10 w-10 items-center justify-center text-[#6F6A78] transition-colors hover:text-[#3B2E4E]"
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </motion.button>
    </div>
  );
}

function FullScreenShowcase({
  boxes,
  tab,
  onTab,
  cartCount,
  onOpenCart,
  onSelect,
  onQuickAdd,
}: {
  boxes: Box[];
  tab: "wedding" | "corporate";
  onTab: (t: "wedding" | "corporate") => void;
  cartCount: number;
  onOpenCart: () => void;
  onSelect: (b: Box) => void;
  onQuickAdd: (b: Box) => void;
}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const tabs = [
    { id: "wedding", label: "Wedding", count: weddingBoxes.length },
    { id: "corporate", label: "Corporate", count: corporateBoxes.length },
  ] as const;

  const go = (dir: number) => {
    setDirection(dir);
    setIndex((i) => (i + dir + boxes.length) % boxes.length);
  };

  useEffect(() => {
    if (paused) return;
    timer.current = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused, tab]);

  const active = boxes[index];
  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <section
      className="relative flex h-[65svh] w-full flex-col overflow-hidden bg-[#2C2340] text-white min-h-[520px] lg:min-h-[560px] lg:grid lg:grid-cols-2"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image src="/images/gifts2.png" alt="" fill className="object-cover object-center" sizes="100vw" priority />
        <div className="absolute inset-0 bg-[#2C2340]/20" />
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(#A8C6A7 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      <div className="pointer-events-none absolute -left-32 top-[30%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(126,154,125,0.18),transparent_60%)] blur-3xl" />

      {/* ---------- LEFT : all the details ---------- */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={staggerSlow}
        className="relative z-10 flex flex-col justify-between gap-3 px-6 pb-4 pt-14 md:px-8 md:pt-16 lg:pb-5 lg:pr-0 lg:pt-18"
      >
        <motion.div variants={slideInLeft} initial="hidden" animate="show">
          <nav className="flex items-center gap-2 text-[11px] text-white/40">
            <Link href="/" className="transition-colors hover:text-[#A8C6A7]">
              Home
            </Link>
            <span className="text-[#7E9A7D]">/</span>
            <span className="font-medium text-white/70">Gift Boxes</span>
          </nav>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => onTab(t.id)}
                className={`rounded-full border px-4 py-2 text-[12px] font-medium transition-colors ${
                  tab === t.id
                    ? "border-white bg-white text-[#2C2340]"
                    : "border-white/20 text-white/60 hover:border-white/50 hover:text-white"
                }`}
              >
                {t.label}
                <span className={`ml-1.5 text-[10px] ${tab === t.id ? "text-[#7E9A7D]" : "text-white/40"}`}>{t.count}</span>
              </button>
            ))}
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenCart}
              className="relative ml-1 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-white hover:bg-white hover:text-[#2C2340]"
              aria-label="Open cart"
            >
              <ShoppingCart className="h-4 w-4" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span key="cart-count" initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.4, opacity: 0 }} transition={{ type: "spring", stiffness: 400, damping: 20 }} className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#7E9A7D] px-1 text-[10px] font-semibold text-white">
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`${tab}-${active.id}`}
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -34 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="max-w-lg"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
              className="flex items-center gap-2.5"
            >
              <span className="rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.18em]" style={{ background: `${active.glow}33`, color: "#DCE8DB" }}>
                {active.label}
              </span>
              <span className="text-[11px] tracking-wide text-white/40">
                {String(index + 1).padStart(2, "0")} / {String(boxes.length).padStart(2, "0")}
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
              className={`${serif} mt-2 text-[clamp(1.6rem,3.5vw,2.8rem)] font-medium leading-[1.05] tracking-tight`}
            >
              <SplitText text={active.name} initialDelay={0.15} />
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22, ease: EASE }}
              className="mt-3 text-sm leading-relaxed text-white/60 md:text-[15px]"
            >
              {active.blurb}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28, ease: EASE }}
              className="mt-3"
            >
              <p className={`${label} text-white/40`}>What&rsquo;s inside</p>
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.06, delayChildren: 0.35 } },
                }}
                className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1"
              >
                {active.contents.map((c) => (
                  <motion.li
                    key={c}
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE } },
                    }}
                    className="flex items-center gap-1.5 text-[11px] text-white/75"
                  >
                    <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded bg-white/10 text-[#A8C6A7]">
                      <Check className="h-2.5 w-2.5" />
                    </span>
                    {c}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.38, ease: EASE }}
              className="mt-4 flex items-center gap-2.5"
            >
              <MagneticButton
                onClick={() => onQuickAdd(active)}
                className="flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-[11px] font-semibold text-[#2C2340] transition-colors hover:bg-[#E8E2D8]"
              >
                <ShoppingCart className="h-3.5 w-3.5" /> Add to cart
              </MagneticButton>
              <MagneticButton
                onClick={() => onSelect(active)}
                className="flex items-center gap-1.5 rounded-lg border border-white/25 px-3.5 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-white/10"
              >
                View details <ArrowUpRight className="h-3 w-3" />
              </MagneticButton>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease: EASE }}
          className="flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2">
            <button onClick={() => go(-1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white hover:text-[#2C2340]" aria-label="Previous box">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button onClick={() => go(1)} className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#2C2340] transition-colors hover:bg-[#E8E2D8]" aria-label="Next box">
              <ChevronRight className="h-4 w-4" />
            </button>
            <span className="ml-3 hidden text-[11px] uppercase tracking-[0.18em] text-white/35 md:inline">Autoplay {paused ? "paused" : "playing"}</span>
          </div>
          <div className="hidden h-[3px] w-28 overflow-hidden rounded-full bg-white/10 md:block">
            {!paused && (
              <motion.div
                key={`${tab}-${index}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                className="h-full w-full origin-left rounded-full bg-[#A8C6A7]"
              />
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* ---------- RIGHT : the product card ---------- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        className="relative z-10 flex items-center justify-center px-4 pb-6 pt-6 md:px-8 lg:px-12 lg:py-0"
      >
        <div className="relative w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[380px]">
          <div className="relative aspect-[3/4]">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={`${tab}-${active.id}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.65, ease: EASE }}
                className="absolute inset-0"
              >
                <motion.div
                  initial={{ scale: 1.12 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2, ease: EASE }}
                  className="absolute inset-0"
                  style={{ background: `radial-gradient(70% 55% at 50% 42%, ${active.glow}30, transparent 72%)` }}
                />
                <span className={`${serif} absolute right-0 top-0 select-none text-[3rem] leading-none text-white/[0.05] md:text-[3.5rem]`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="absolute inset-0 flex items-center justify-center p-4 pl-2 pt-12">
                  <motion.div initial={{ opacity: 0, scale: 0.96, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15, ease: EASE }} className="relative h-full w-full translate-x-[-28%] translate-y-[20%] scale-110 drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
                    <ParallaxImage src={active.image} alt={active.name} intensity={18} className="h-full w-full" />
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Marquee() {
  const row = [...marqueeWords, ...marqueeWords];
  return (
    <div className="marquee-hover overflow-hidden border-y border-[#B8C4A8] bg-[#E8E2D8] py-4">
      <div className="animate-marquee flex w-max items-center gap-10">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className={`${serif} text-sm uppercase tracking-[0.25em] text-[#3B2E4E]/70`}>{w}</span>
            <span className="h-1.5 w-1.5 rotate-45 bg-[#7E9A7D]" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Catalogue({
  boxes,
  tab,
  onTab,
  onSelect,
  onQuickAdd,
}: {
  boxes: Box[];
  tab: "wedding" | "corporate";
  onTab: (t: "wedding" | "corporate") => void;
  onSelect: (b: Box) => void;
  onQuickAdd: (b: Box) => void;
}) {
  return (
    <section className="bg-[#E8E2D8] py-10 md:py-14">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerSlow}
          className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end"
        >
          <div className="max-w-xl">
            <motion.p variants={slideInLeft} className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B7355]">The full collection</motion.p>
            <motion.h2 variants={slideInLeft} className={`${serif} mt-1.5 text-2xl leading-tight text-[#3B2E4E] md:text-3xl`}>
              Every {tab === "wedding" ? "wedding" : "corporate"} box
            </motion.h2>
          </div>
          <motion.div variants={slideInRight} className="flex gap-2">
            <button
              onClick={() => onTab("wedding")}
              className={`rounded-full border px-5 py-2 text-[12px] font-medium transition-colors ${
                tab === "wedding"
                  ? "border-[#3B2E4E] bg-[#3B2E4E] text-white"
                  : "border-[#B8C4A8] text-[#6F6A78] hover:border-[#3B2E4E] hover:text-[#3B2E4E]"
              }`}
            >
              Wedding
            </button>
            <button
              onClick={() => onTab("corporate")}
              className={`rounded-full border px-5 py-2 text-[12px] font-medium transition-colors ${
                tab === "corporate"
                  ? "border-[#3B2E4E] bg-[#3B2E4E] text-white"
                  : "border-[#B8C4A8] text-[#6F6A78] hover:border-[#3B2E4E] hover:text-[#3B2E4E]"
              }`}
            >
              Corporate
            </button>
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -12, transition: { duration: 0.22, ease: EASE } }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
            }}
            className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
          >
            {boxes.map((box, i) => (
              <motion.div
                key={box.id}
                variants={{
                  hidden: { opacity: 0, y: 40, scale: 0.95 },
                  show: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.6, ease: EASE, delay: i * 0.08 },
                  },
                }}
                className="group relative cursor-pointer"
                onClick={() => onSelect(box)}
              >
                <TiltCard className="h-full">
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#2C2340]">
                    <Image
                      src={box.image}
                      alt={box.name}
                      fill
                      className="object-contain p-6 transition-all duration-700 ease-out group-hover:scale-110 group-hover:drop-shadow-[0_12px_32px_rgba(0,0,0,0.25)]"
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2C2340] via-[#2C2340]/30 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100" />
                    <span className="absolute left-3 top-3 bg-[#E8D5A3] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#3B2E4E]">
                      {box.label}
                    </span>
                    <div className="absolute inset-x-4 bottom-4 flex translate-y-6 flex-col gap-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="text-[14px] font-semibold text-white drop-shadow-lg">{box.name}</p>
                      <p className="text-[12px] text-white/80">{box.contents.slice(0, 2).join(" · ")}</p>
                      <p className={`${serif} text-[18px] font-medium text-[#E8D5A3] drop-shadow-lg`}>{inr(box.price)}</p>
                      <div className="mt-2 flex gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); onQuickAdd(box); }}
                          className="flex flex-1 items-center justify-center gap-1.5 bg-[#E8D5A3] px-3 py-2.5 text-[11px] font-bold text-[#3B2E4E] transition-transform hover:scale-[1.02]"
                        >
                          <ShoppingCart className="h-3 w-3" /> Add to cart
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); onSelect(box); }}
                          className="flex flex-1 items-center justify-center gap-1.5 border border-white/30 bg-white/10 px-3 py-2.5 text-[11px] font-semibold text-white backdrop-blur-sm transition-transform hover:scale-[1.02]"
                        >
                          Details <ArrowUpRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function FeatureStrip() {
  return (
    <section className="border-y border-[#B8C4A8] bg-[#E8E2D8] py-10">
      <div className={`${container} grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4`}>
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
            className="group flex items-start gap-3"
          >
            <MagneticElement strength={0.4} className="shrink-0">
              <motion.span whileHover={{ rotate: -6, scale: 1.06 }} className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E8D5A3]/20 text-[#5E7A5D] transition-colors group-hover:bg-[#E8D5A3] group-hover:text-[#3B2E4E]">
                <f.icon className="h-5 w-5" />
              </motion.span>
            </MagneticElement>
            <div>
              <p className="text-sm font-semibold text-[#262032]">{f.title}</p>
              <p className="mt-0.5 text-[12px] leading-relaxed text-[#6F6A78]">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-[#E8E2D8] py-16 md:py-20">
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(126,154,125,0.10),transparent_70%)] blur-2xl" />
      <div className={container}>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerSlow}
          className="mb-9 max-w-2xl"
        >
          <motion.p variants={slideInLeft} className={`${label} text-[#8B7355]`}>How it works</motion.p>
          <motion.h2 variants={slideInLeft} className={`${serif} mt-2 text-2xl text-[#3B2E4E] md:text-3xl`}>
            From our studio to your doorstep
          </motion.h2>
        </motion.div>
        <div className="relative grid gap-5 md:grid-cols-3">
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: EASE }}
            className="absolute left-[12%] right-[12%] top-8 hidden h-px origin-left bg-gradient-to-r from-transparent via-[#7E9A7D]/40 to-transparent md:block"
          />
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: EASE }}
              className="relative"
            >
              <TiltCard className="h-full border border-[#B8C4A8] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(44,35,64,0.12)]">
                <MagneticElement strength={0.3} className="shrink-0">
                  <motion.span whileHover={{ rotate: 8 }} className={`${serif} flex h-14 w-14 items-center bg-[#E8D5A3]/20 text-lg text-[#5E7A5D] transition-colors hover:bg-[#3B2E4E] hover:text-white`}>
                    {s.n}
                  </motion.span>
                </MagneticElement>
                <h3 className={`${sans} mt-4 text-[15px] font-semibold text-[#262032]`}>{s.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#6F6A78]">{s.desc}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BespokeBand() {
  return (
    <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8, ease: EASE }} className="relative overflow-hidden bg-[#2C2340] py-14 md:py-16">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(#A8C6A7 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(126,154,125,0.25),transparent_60%)] blur-2xl" />
      <div className="relative z-[2] mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 md:flex-row md:items-center md:px-8">
        <div className="max-w-xl">
          <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE }} className={`${label} text-[#A8C6A7]`}>
            Bespoke &amp; bulk
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 16, filter: "blur(4px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08, ease: EASE }} className={`${serif} mt-2 text-2xl text-white md:text-[28px]`}>
            Need 50+ boxes or a branded edition?
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.16, ease: EASE }} className="mt-2 text-sm leading-relaxed text-white/65">
            Wedding favours for every guest, corporate welcome kits, festive bulk orders — with your monogram on the sleeve, card and keepsake.
          </motion.p>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.24, ease: EASE }} className="flex flex-col items-start gap-3">
          <MagneticButton
            href="mailto:hello@parshadam.com"
            className="flex items-center gap-2 rounded-lg bg-[#E8D5A3] px-6 py-3 text-[12px] font-semibold text-[#3B2E4E] transition-colors hover:bg-[#D4C49A]"
          >
            Talk to us <ArrowRight className="h-4 w-4" />
          </MagneticButton>
          <a href="tel:+919876543210" className="flex items-center gap-2 text-[12px] text-white/55 transition-colors hover:text-white">
            <Phone className="h-3.5 w-3.5" /> +91 98765 43210
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}

function NextSteps() {
  const links = [
    { href: "/parshads", title: "Explore Prasad", desc: "See the offerings behind every box." },
    { href: "/journey", title: "Our Journey", desc: "From temple sanctum to your doorstep." },
    { href: "/shrine/somnath", title: "Sacred Shrines", desc: "Where each blessing begins." },
  ];
  return (
    <section className="bg-[#E8E2D8] py-16 md:py-20">
      <div className={container}>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerSlow}
          className="mb-8 max-w-2xl"
        >
          <motion.p variants={slideInLeft} className={`${label} text-[#8B7355]`}>Keep exploring</motion.p>
          <motion.h2 variants={slideInLeft} className={`${serif} mt-2 text-2xl text-[#3B2E4E] md:text-3xl`}>Continue across Parshadam</motion.h2>
        </motion.div>
        <div className="grid gap-5 sm:grid-cols-3">
          {links.map((l, i) => (
            <motion.div
              key={l.href}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
            >
              <TiltCard className="h-full">
                <Link href={l.href} className="group flex h-full flex-col justify-between rounded-xl border border-[#B8C4A8] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#3B2E4E] hover:shadow-[0_12px_32px_rgba(44,35,64,0.10)]">
                  <div>
                    <motion.span
                      initial={{ width: "2rem" }}
                      whileInView={{ width: "3rem" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                      className="block h-1.5 rounded-full bg-[#E8D5A3] transition-all duration-300 group-hover:w-12 group-hover:bg-[#3B2E4E]"
                    />
                    <h3 className={`${sans} mt-4 text-[15px] font-semibold text-[#262032] transition-colors group-hover:text-[#3B2E4E]`}>{l.title}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-[#6F6A78]">{l.desc}</p>
                  </div>
                  <span className="mt-5 flex items-center gap-1.5 text-[12px] font-medium text-[#7E9A7D]">
                    Visit <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DetailDrawer({ box, onClose, onAdd, initialQty }: { box: Box; onClose: () => void; onAdd: (q: number) => void; initialQty: number }) {
  const [qty, setQty] = useState(initialQty);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-[70] flex items-end justify-end bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="flex h-full w-full max-w-md flex-col bg-[#E8E2D8]"
      >
        <div className="flex items-center justify-between border-b border-[#B8C4A8] px-6 py-4">
          <div>
            <p className={`${label} text-[#7E9A7D]`}>{box.label}</p>
            <h3 className={`${serif} mt-0.5 text-xl text-[#3B2E4E]`}>{box.name}</h3>
          </div>
          <motion.button whileHover={{ rotate: 90 }} whileTap={{ scale: 0.9 }} onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E3DEE8] bg-white text-[#262032] transition-colors hover:bg-[#3B2E4E] hover:text-white" aria-label="Close">
            <X className="h-4 w-4" />
          </motion.button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-xl bg-[#F1EDE4]">
            <Image src={box.image} alt={box.name} fill className="object-contain p-6" sizes="80vw" />
          </div>
          <motion.p variants={fadeUp} initial="hidden" animate="show" className={`${label} mt-6 text-[#3B2E4E]`}>
            What&rsquo;s inside
          </motion.p>
          <ul className="mt-3 space-y-2">
            {box.contents.map((c) => (
              <li key={c} className="flex items-center gap-2 text-[13px] text-[#6F6A78]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#E8E2D8] text-[#5E7A5D]"><Check className="h-3 w-3" /></span>
                {c}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[13px] leading-relaxed text-[#6F6A78]">{box.note}</p>
        </div>
        <div className="border-t border-[#B8C4A8] px-6 py-4">
          <div className="flex items-center justify-between">
            <p className={`${serif} text-2xl text-[#3B2E4E]`}>{inr(box.price)}</p>
            <Quantity value={qty} onChange={setQty} />
          </div>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAdd(qty)}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#3B2E4E] py-3.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#2C2340]"
          >
            <ShoppingCart className="h-4 w-4" /> Add {qty} to cart
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CartDrawer({
  open,
  items,
  onClose,
  onRemove,
  onUpdateQty,
  onClear,
}: {
  open: boolean;
  items: { box: Box; qty: number }[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, qty: number) => void;
  onClear: () => void;
}) {
  const total = items.reduce((s, it) => s + it.box.price * it.qty, 0);
  const [formSent, setFormSent] = useState(false);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col overflow-hidden bg-[#E8E2D8] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#B8C4A8] px-6 py-4">
              <div>
                <p className={`${label} text-[#7E9A7D]`}>Your cart</p>
                <h3 className={`${serif} mt-0.5 text-xl text-[#3B2E4E]`}>Review your selection</h3>
              </div>
              <motion.button whileHover={{ rotate: 90 }} whileTap={{ scale: 0.9 }} onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E3DEE8] bg-white text-[#262032] transition-colors hover:bg-[#3B2E4E] hover:text-white" aria-label="Close cart">
                <X className="h-4 w-4" />
              </motion.button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <ShoppingCart className="mb-4 h-10 w-10 text-[#E7E2D8]" />
                  <p className="text-sm font-medium text-[#3B2E4E]">Your cart is empty</p>
                  <p className="mt-1 text-[13px] text-[#6F6A78]">Add a gift box to get started.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((it) => (
                    <div key={it.box.id} className="flex gap-4 rounded-xl border border-[#B8C4A8] bg-white p-3">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-[#F1EDE4]">
                        <Image src={it.box.image} alt={it.box.name} fill className="object-contain p-2" sizes="80px" />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <p className="text-[11px] text-[#6F6A78]">{it.box.label}</p>
                          <p className="text-[14px] font-medium text-[#262032]">{it.box.name}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <Quantity value={it.qty} onChange={(q) => onUpdateQty(it.box.id, q)} />
                          <motion.button whileTap={{ scale: 0.85 }} onClick={() => onRemove(it.box.id)} className="text-[#9C96A6] transition-colors hover:text-[#3B2E4E]" aria-label={`Remove ${it.box.name}`}>
                            <Trash2 className="h-4 w-4" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="border-t border-[#B8C4A8] bg-[#E8E2D8] px-6 py-4">
              {items.length > 0 && !formSent && (
                <>
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-[13px] text-[#6F6A78]">Total</p>
                    <p className={`${serif} text-xl text-[#3B2E4E]`}>{inr(total)}</p>
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setFormSent(true);
                      setTimeout(() => {
                        onClear();
                        onClose();
                        setFormSent(false);
                      }, 3500);
                    }}
                    className="space-y-3"
                  >
                    {([
                      { k: "name", label: "Full name", type: "text", required: true },
                      { k: "phone", label: "Phone number", type: "tel", required: true },
                    ] as const).map((f) => (
                      <div key={f.k}>
                        <label htmlFor={`gift-${f.k}`} className="mb-1.5 block text-[12px] font-semibold text-[#262032]">
                          {f.label}
                        </label>
                        <input id={`gift-${f.k}`} type={f.type} required className="w-full rounded-lg border border-[#E3DEE8] bg-white px-3.5 py-2.5 text-[13px] text-[#262032] outline-none transition-colors focus:border-[#5E7A5D] focus:ring-2 focus:ring-[#5E7A5D]/20" />
                      </div>
                    ))}
                    <div>
                      <label htmlFor="gift-occasion" className="mb-1.5 block text-[12px] font-semibold text-[#262032]">
                        Occasion
                      </label>
                      <select id="gift-occasion" className="w-full rounded-lg border border-[#E3DEE8] bg-white px-3.5 py-2.5 text-[13px] text-[#262032] outline-none transition-colors focus:border-[#5E7A5D] focus:ring-2 focus:ring-[#5E7A5D]/20">
                        <option>Wedding</option>
                        <option>Corporate</option>
                        <option>Festival</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="gift-message" className="mb-1.5 block text-[12px] font-semibold text-[#262032]">
                        Message (optional)
                      </label>
                      <textarea id="gift-message" rows={3} className="w-full rounded-lg border border-[#E3DEE8] bg-white px-3.5 py-2.5 text-[13px] text-[#262032] outline-none transition-colors focus:border-[#5E7A5D] focus:ring-2 focus:ring-[#5E7A5D]/20" />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3B2E4E] py-3.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#2C2340]"
                    >
                      Submit enquiry <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  </form>
                </>
              )}
              {formSent && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-8 text-center">
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 18 }} className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#E8E2D8] text-[#5E7A5D]">
                    <Check className="h-6 w-6" />
                  </motion.span>
                  <p className="text-[15px] font-semibold text-[#3B2E4E]">Thank you!</p>
                  <p className="mt-1 text-[13px] text-[#6F6A78]">We&rsquo;ll be in touch shortly.</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function FloatingCart({ count, total, onClick }: { count: number; total: number; onClick: () => void }) {
  return (
    <motion.button
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 z-[60] flex items-center gap-3 rounded-full bg-[#3B2E4E] px-5 py-3 text-white shadow-[0_12px_32px_rgba(44,35,64,0.35)]"
    >
      <ShoppingCart className="h-4 w-4" />
      <span className="text-[13px] font-medium">{count} item{count !== 1 && "s"}</span>
      <span className="h-4 w-px bg-white/25" />
      <span className={`${serif} text-[15px]`}>{inr(total)}</span>
    </motion.button>
  );
}

function Toast({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 40, opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="fixed bottom-24 left-1/2 z-[80] -translate-x-1/2 rounded-full bg-[#3B2E4E] px-5 py-2.5 text-[13px] font-medium text-white shadow-[0_8px_24px_rgba(44,35,64,0.3)]"
    >
      {message}
    </motion.div>
  );
}

export default function GiftsPage() {
  const [tab, setTab] = useState<"wedding" | "corporate">("wedding");
  const [selected, setSelected] = useState<Box | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [items, setItems] = useState<{ box: Box; qty: number }[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const count = useMemo(() => items.reduce((s, it) => s + it.qty, 0), [items]);
  const total = useMemo(() => items.reduce((s, it) => s + it.box.price * it.qty, 0), [items]);

  useEffect(() => {
    document.body.style.overflow = selected || cartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected, cartOpen]);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const showToast = (message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  };

  const addToCart = (box: Box, qty: number) => {
    setItems((prev) => {
      const existing = prev.find((it) => it.box.id === box.id);
      if (existing) return prev.map((it) => (it.box.id === box.id ? { ...it, qty: it.qty + qty } : it));
      return [...prev, { box, qty }];
    });
    setSelected(null);
    setCartOpen(true);
    showToast(`${box.name} added to cart`);
  };

  const activeBoxes = tab === "wedding" ? weddingBoxes : corporateBoxes;

  return (
    <main className="min-h-screen bg-[#E8E2D8] text-[#262032] selection:bg-[#E8D5A3]/40 selection:text-[#262032]">
      <motion.div style={{ scaleX: progress }} className="fixed left-0 top-0 z-[90] h-[2.5px] w-full origin-left bg-gradient-to-r from-[#3B2E4E] via-[#E8D5A3] to-[#3B2E4E]" />

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 32s linear infinite; }
        .marquee-hover:hover .animate-marquee { animation-play-state: paused; }
      `}</style>

      <Navbar />

      <FullScreenShowcase
        boxes={activeBoxes}
        tab={tab}
        onTab={setTab}
        cartCount={count}
        onOpenCart={() => setCartOpen(true)}
        onSelect={setSelected}
        onQuickAdd={(b) => addToCart(b, 1)}
      />
      <Marquee />
      <Catalogue boxes={activeBoxes} tab={tab} onTab={setTab} onSelect={setSelected} onQuickAdd={(b) => addToCart(b, 1)} />
      <FeatureStrip />
      <HowItWorks />
      <BespokeBand />
      <NextSteps />
      <Footer />

      <AnimatePresence>
        {selected && (
          <DetailDrawer
            key={selected.id}
            box={selected}
            onClose={() => setSelected(null)}
            onAdd={(qty) => addToCart(selected, qty)}
            initialQty={items.find((it) => it.box.id === selected.id)?.qty ?? 1}
          />
        )}
      </AnimatePresence>

      <CartDrawer
        open={cartOpen}
        items={items}
        onClose={() => setCartOpen(false)}
        onRemove={(id) => setItems((prev) => prev.filter((it) => it.box.id !== id))}
        onUpdateQty={(id, qty) => setItems((prev) => prev.map((it) => (it.box.id === id ? { ...it, qty } : it)))}
        onClear={() => setItems([])}
      />

      <AnimatePresence>
        {items.length > 0 && !cartOpen && !selected && (
          <FloatingCart count={count} total={total} onClick={() => setCartOpen(true)} />
        )}
      </AnimatePresence>

      <AnimatePresence>{toast && <Toast message={toast} />}</AnimatePresence>
    </main>
  );
}
