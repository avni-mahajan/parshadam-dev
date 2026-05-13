"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Faith = "Hindu" | "Sikh" | null;

const products = {
  Hindu: [
    {
      id: "h1",
      name: "Kashi Vishwanath Prasad",
      location: "Varanasi, Uttar Pradesh",
      description: "Sacred vibhuti and dry fruit prasad directly from the spiritual capital of India.",
      image: "/images/products/hindu_prasad.png",
    },
    {
      id: "h2",
      name: "Mata Vaishno Devi Prasad",
      location: "Katra, Jammu & Kashmir",
      description: "Blessed bhog and sacred thread from the holy cave shrine in Trikuta Mountains.",
      image: "/images/products/hindu_prasad.png",
    },
    {
      id: "h3",
      name: "Tirupati Balaji Laddu",
      location: "Tirumala, Andhra Pradesh",
      description: "The world-renowned, deeply sacred Laddu Prasadam of Lord Venkateswara.",
      image: "/images/products/hindu_prasad.png",
    },
  ],
  Sikh: [
    {
      id: "s1",
      name: "Golden Temple Karah Parshad",
      location: "Amritsar, Punjab",
      description: "The divinely blessed, rich and sweet Karah Parshad from Sri Harmandir Sahib.",
      image: "/images/products/sikh_prasad.png",
    },
    {
      id: "s2",
      name: "Bangla Sahib Parshad",
      location: "New Delhi",
      description: "Sacred offering from the historic Gurudwara known for its healing waters.",
      image: "/images/products/sikh_prasad.png",
    },
    {
      id: "s3",
      name: "Hemkund Sahib Parshad",
      location: "Chamoli, Uttarakhand",
      description: "Blessed Parshad from the highest Gurudwara, nestled among the Himalayan peaks.",
      image: "/images/products/sikh_prasad.png",
    },
  ],
};

import { TiltCard } from "@/components/ui/tilt-card";
import { Carousel3D } from "@/components/ui/carousel-3d";

export function FaithSelection() {
  const [selectedFaith, setSelectedFaith] = useState<Faith>(null);

  // Flatten all products for the default carousel view
  const allProducts = [...products.Hindu, ...products.Sikh];

  return (
    <section className="pt-4 pb-16 relative overflow-hidden bg-background">
      {/* Sacred ambient background glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-2 flex items-center justify-center gap-4"
          >
            <div className="h-[1px] w-8 bg-accent/30" />
            <span className="text-[10px] uppercase tracking-[0.5em] font-medium text-accent">Discover Your Path</span>
            <div className="h-[1px] w-8 bg-accent/30" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-heading mb-2 text-foreground tracking-tight"
          >
            Connect With Your <span className="text-primary italic">Devotion</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-muted-foreground text-sm md:text-base font-light tracking-[0.1em] max-w-2xl mx-auto leading-relaxed uppercase opacity-70"
          >
            Select your path of faith to discover sacred offerings and parshadam from the most revered shrines.
          </motion.p>
        </div>

        {/* Faith Selection Cards with Cinematic Split Animation */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="relative max-w-5xl mx-auto mb-32 py-12"
        >
          {/* Central Spiritual Intro (Lotus/Devotion) */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8, filter: "blur(10px)" },
              show: {
                opacity: [0, 1, 0],
                scale: [0.8, 1.1, 1.5],
                filter: ["blur(10px)", "blur(0px)", "blur(20px)"],
                transition: { duration: 2.2, times: [0, 0.4, 1], ease: "easeInOut" }
              }
            }}
            className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none"
          >
            <div className="relative">
              <span className="text-9xl text-accent opacity-20 block select-none">🪷</span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-accent/10 rounded-full scale-[1.8]"
              />
            </div>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2.2, times: [0.1, 0.4, 0.9] }}
              className="text-[12px] uppercase tracking-[1.5em] text-accent font-bold mt-8"
            >
              Devotion
            </motion.span>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-12 justify-center perspective-2000 relative z-10">
            {/* Hindu Card */}
            <motion.div
              className="flex-1 max-w-[380px]"
              variants={{
                hidden: { opacity: 0, x: 60, rotateY: 25, scale: 0.9, filter: "blur(10px)" },
                show: {
                  opacity: 1,
                  x: 0,
                  rotateY: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  transition: { delay: 1.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }
                }
              }}
            >
              <TiltCard>
                <motion.button
                  onClick={() => setSelectedFaith(selectedFaith === "Hindu" ? null : "Hindu")}
                  className={`relative w-full aspect-[3/4] rounded-2xl border transition-all duration-1000 overflow-hidden group ${
                    selectedFaith === "Hindu"
                      ? "border-accent/40 shadow-[0_40px_100px_-20px_rgba(217,122,29,0.3)]"
                      : "border-border/40 hover:border-accent/30"
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0">
                    <Image src="/images/hindu.jpg" alt="Hindu" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className={`absolute inset-0 transition-colors duration-1000 ${selectedFaith === "Hindu" ? "bg-black/40" : "bg-black/65 group-hover:bg-black/40"}`} />
                  </div>

                  {/* Inner architectural border */}
                  <div className={`absolute inset-4 z-10 rounded-xl border border-dashed transition-colors duration-1000 ${
                    selectedFaith === "Hindu" ? "border-accent/60" : "border-white/10 group-hover:border-accent/40"
                  }`} />

                  <div className="relative z-20 flex flex-col items-center justify-center h-full px-8 text-center mt-12">
                    <div className={`w-28 h-28 rounded-full flex items-center justify-center mb-12 transition-all duration-1000 backdrop-blur-xl ${
                      selectedFaith === "Hindu" ? "bg-accent/20 shadow-[0_0_50px_rgba(217,122,29,0.4)] border border-accent/40" : "bg-white/5 group-hover:bg-accent/10 border border-white/10"
                    }`}>
                      <span className={`text-7xl transition-all duration-1000 ${
                        selectedFaith === "Hindu" ? "text-accent scale-110 drop-shadow-[0_0_20px_rgba(217,122,29,0.8)]" : "text-white group-hover:text-accent"
                      }`}>ॐ</span>
                    </div>
                    <h3 className={`text-3xl md:text-4xl font-heading mb-6 transition-colors duration-700 tracking-[0.2em] uppercase ${selectedFaith === "Hindu" ? "text-accent" : "text-white"}`}>
                      Sanatan
                    </h3>
                    <div className="w-16 h-[1px] bg-accent/30 mb-8 transition-all duration-700 group-hover:w-32 group-hover:bg-accent/60" />
                    <p className="text-[10px] text-white/70 leading-loose max-w-[240px] font-medium tracking-[0.3em] uppercase">
                      Discover sacred prasadam from ancient, eternal temples.
                    </p>
                  </div>
                </motion.button>
              </TiltCard>
            </motion.div>

            {/* Sikhi Card */}
            <motion.div
              className="flex-1 max-w-[380px]"
              variants={{
                hidden: { opacity: 0, x: -60, rotateY: -25, scale: 0.9, filter: "blur(10px)" },
                show: {
                  opacity: 1,
                  x: 0,
                  rotateY: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  transition: { delay: 1.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }
                }
              }}
            >
              <TiltCard>
                <motion.button
                  onClick={() => setSelectedFaith(selectedFaith === "Sikh" ? null : "Sikh")}
                  className={`relative w-full aspect-[3/4] rounded-2xl border transition-all duration-1000 overflow-hidden group ${
                    selectedFaith === "Sikh"
                      ? "border-secondary/40 shadow-[0_40px_100px_-20px_rgba(122,146,120,0.3)]"
                      : "border-border/40 hover:border-secondary/30"
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0">
                    <Image src="/images/sikh.jpg" alt="Sikhi" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className={`absolute inset-0 transition-colors duration-1000 ${selectedFaith === "Sikh" ? "bg-secondary/40" : "bg-black/65 group-hover:bg-secondary/40"}`} />
                  </div>

                  {/* Inner architectural border */}
                  <div className={`absolute inset-4 z-10 rounded-xl border border-dashed transition-colors duration-1000 ${
                    selectedFaith === "Sikh" ? "border-secondary/60" : "border-white/10 group-hover:border-secondary/40"
                  }`} />

                  <div className="relative z-20 flex flex-col items-center justify-center h-full px-8 text-center mt-12">
                    <div className={`w-28 h-28 rounded-full flex items-center justify-center mb-12 transition-all duration-1000 backdrop-blur-xl ${
                      selectedFaith === "Sikh" ? "bg-secondary/20 shadow-[0_0_50px_rgba(122,146,120,0.4)] border border-secondary/40" : "bg-white/5 group-hover:bg-secondary/10 border border-white/10"
                    }`}>
                      <span className={`text-7xl transition-all duration-1000 ${
                        selectedFaith === "Sikh" ? "text-secondary scale-110 drop-shadow-[0_0_20px_rgba(122,146,120,0.8)]" : "text-white group-hover:text-secondary"
                      }`}>ੴ</span>
                    </div>
                    <h3 className={`text-3xl md:text-4xl font-heading mb-6 transition-colors duration-700 tracking-[0.2em] uppercase ${selectedFaith === "Sikh" ? "text-secondary" : "text-white"}`}>
                      Sikhi
                    </h3>
                    <div className="w-16 h-[1px] bg-secondary/30 mb-8 transition-all duration-700 group-hover:w-32 group-hover:bg-secondary/60" />
                    <p className="text-[10px] text-white/70 leading-loose max-w-[240px] font-medium tracking-[0.3em] uppercase">
                      Receive divine blessings from deeply historic Gurudwaras.
                    </p>
                  </div>
                </motion.button>
              </TiltCard>
            </motion.div>
          </div>
        </motion.div>

        {/* Dynamic Products Section */}
        <AnimatePresence mode="wait">
          {!selectedFaith ? (
            <motion.div
              key="all-products"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-20"
            >
              <div className="text-center mb-4">
                <p className="text-accent text-[10px] uppercase tracking-[0.5em] font-medium mb-4">The Divine Collection</p>
                <h3 className="text-4xl md:text-5xl font-heading text-foreground tracking-tight">A Journey Through Faith</h3>
              </div>
              <Carousel3D products={allProducts} />
            </motion.div>
          ) : (
            <motion.div
              key={selectedFaith}
              initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -40, filter: "blur(20px)" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="pt-20 relative"
            >
              {/* Ornate Divider */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl flex items-center justify-center gap-8">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-accent/30 to-accent/50" />
                <span className="text-accent text-2xl">✦</span>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-accent/30 to-accent/50" />
              </div>
              
              <div className="text-center mb-24 mt-12">
                <h3 className="text-4xl md:text-5xl font-heading text-foreground mb-6">
                  Sacred Offerings for <span className="italic font-light opacity-80">You</span>
                </h3>
                <p className="text-muted-foreground text-[11px] font-medium tracking-[0.3em] uppercase max-w-xl mx-auto leading-relaxed">
                  Carefully sourced and deeply revered parshadam, delivered with absolute purity and devotion.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                {products[selectedFaith].map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative flex flex-col"
                  >
                    {/* Arch shaped image container */}
                    <div className="relative h-[450px] w-full rounded-2xl overflow-hidden mb-8 shadow-2xl border border-border/40 group-hover:border-accent/40 transition-all duration-700">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-10 left-0 right-0 text-center px-8">
                        <p className="text-accent text-[10px] font-bold tracking-[0.4em] uppercase mb-3">
                          {product.location}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-center px-6 flex-1 flex flex-col">
                      <h4 className="text-2xl font-heading text-foreground mb-4 tracking-wide">{product.name}</h4>
                      <p className="text-muted-foreground text-[11px] leading-loose tracking-wider font-light mb-10 flex-1 line-clamp-3">
                        {product.description}
                      </p>
                      <button className="w-full relative py-4 rounded-2xl font-medium tracking-[0.3em] text-[10px] uppercase overflow-hidden group/btn bg-foreground text-background transition-all duration-700 hover:bg-accent hover:text-white">
                        <span className="relative z-10">Request Parshad</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
