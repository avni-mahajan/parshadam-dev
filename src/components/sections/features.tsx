"use client";

import React from "react";
import { motion } from "framer-motion";
import { Video } from "@/components/ui/video";

const features = [
  {
    title: "Sacred Traditions",
    description: "Honoring the timeless rituals that mark our most significant beginnings.",
    video: "https://assets.mixkit.co/videos/preview/mixkit-star-field-in-the-deep-space-34441-large.mp4",
  },
  {
    title: "Artisanal Grace",
    description: "Every element crafted with devotion to reflect the beauty of your journey.",
    video: "https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-308-large.mp4",
  },
  {
    title: "Eternal Memories",
    description: "Preserving the essence of your celebrations for generations to come.",
    video: "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-screen-with-code-42848-large.mp4",
  },
];

export const Features = () => {
  return (
    <section className="section-padding bg-[#0a0a0a] text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.4em] text-primary/60 mb-4 block"
          >
            The Essence
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Crafted with Devotion
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="h-[1px] w-24 bg-primary/40 mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative w-full aspect-[4/5] mb-8 overflow-hidden rounded-sm grayscale group-hover:grayscale-0 transition-all duration-1000">
                <Video
                  src={feature.video}
                  containerClassName="h-full w-full"
                  objectFit="cover"
                  overlay={<div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-all duration-1000" />}
                />
              </div>
              <h3 className="text-xl font-medium tracking-wide mb-4">{feature.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed font-light">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
