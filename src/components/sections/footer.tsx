import React from "react";

export const Footer = () => {
  return (
    <footer className="py-20 bg-background border-t border-border/50">
      <div className="container mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-20">
          <div className="max-w-xs">
            <div className="text-xl font-bold tracking-[0.2em] text-foreground mb-6">
              PARSHADAM<span className="text-primary/80">.</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed font-light tracking-wide">
              Dedicated to the art of sacred beginnings. We curate experiences that blend 
              timeless tradition with modern elegance.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 sm:gap-24">
            <div className="flex flex-col gap-6">
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-foreground font-semibold">Discovery</h4>
              <ul className="flex flex-col gap-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">The Vision</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Ceremonies</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Spaces</a></li>
              </ul>
            </div>
            
            <div className="flex flex-col gap-6">
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-foreground font-semibold">Connect</h4>
              <ul className="flex flex-col gap-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Enquire</a></li>
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-foreground font-semibold">Office</h4>
              <address className="not-italic text-[10px] uppercase tracking-[0.2em] text-muted-foreground leading-loose">
                Heritage Square<br />
                New Delhi, India<br />
                hello@parshadam.com
              </address>
            </div>
          </div>
        </div>
        
        <div className="pt-10 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground">© 2026 Parshadam. Crafted with Devotion.</p>
          <div className="flex gap-8 text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
