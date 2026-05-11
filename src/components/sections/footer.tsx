import React from "react";

export const Footer = () => {
  return (
    <footer className="relative py-24 bg-[#12120F] text-[#F6EFE3] overflow-hidden border-t border-white/5">
      {/* Saffron Top Accent */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D97A1D]/40 to-transparent" />
      
      <div className="container mx-auto px-8 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24">
          <div className="max-w-xs">
            <div className="text-2xl font-bold tracking-[0.3em] text-white mb-8 font-[family-name:var(--font-eb-garamond)]">
              PARSHADAM<span className="text-[#D97A1D]">.</span>
            </div>
            <p className="text-xs text-[#F6EFE3]/50 leading-relaxed font-light tracking-wide italic">
              Dedicated to the art of sacred beginnings. We curate experiences that blend 
              timeless tradition with modern elegance, carrying blessings from the heart of India to your home.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 sm:gap-24">
            <div className="flex flex-col gap-6">
              <h4 className="text-[10px] uppercase tracking-[0.4em] text-white font-bold opacity-80">Discovery</h4>
              <ul className="flex flex-col gap-4 text-[10px] uppercase tracking-[0.2em] text-[#F6EFE3]/40">
                <li><a href="#" className="hover:text-[#D97A1D] transition-colors duration-300">The Vision</a></li>
                <li><a href="#" className="hover:text-[#D97A1D] transition-colors duration-300">Ceremonies</a></li>
                <li><a href="#" className="hover:text-[#D97A1D] transition-colors duration-300">Sacred Map</a></li>
              </ul>
            </div>
            
            <div className="flex flex-col gap-6">
              <h4 className="text-[10px] uppercase tracking-[0.4em] text-white font-bold opacity-80">Connect</h4>
              <ul className="flex flex-col gap-4 text-[10px] uppercase tracking-[0.2em] text-[#F6EFE3]/40">
                <li><a href="#" className="hover:text-[#D97A1D] transition-colors duration-300">Instagram</a></li>
                <li><a href="#" className="hover:text-[#D97A1D] transition-colors duration-300">LinkedIn</a></li>
                <li><a href="#" className="hover:text-[#D97A1D] transition-colors duration-300">Enquire</a></li>
              </ul>
            </div>
            
            <div className="flex flex-col gap-6">
              <h4 className="text-[10px] uppercase tracking-[0.4em] text-white font-bold opacity-80">Office</h4>
              <address className="not-italic text-[10px] uppercase tracking-[0.2em] text-[#F6EFE3]/40 leading-loose">
                Heritage Square<br />
                New Delhi, India<br />
                <span className="text-[#D97A1D]/80 mt-2 block lowercase tracking-normal">hello@parshadam.com</span>
              </address>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <span className="text-[#D97A1D] text-lg">✦</span>
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#F6EFE3]/30">© 2026 Parshadam. Crafted with Devotion.</p>
          </div>
          <div className="flex gap-10 text-[9px] uppercase tracking-[0.4em] text-[#F6EFE3]/30">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
      
      {/* Subtle Background Accent */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#D97A1D]/5 blur-[120px] rounded-full -mb-80 -mr-80 pointer-events-none" />
    </footer>
  );
};
