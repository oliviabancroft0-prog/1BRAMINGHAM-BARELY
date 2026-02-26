/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowUpRight, 
  ChevronRight, 
  Lock, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Zap, 
  Instagram, 
  Mail,
  Menu,
  X,
  Activity,
  Calendar,
  DollarSign
} from 'lucide-react';
import { cn } from '../lib/utils';

gsap.registerPlugin(ScrollTrigger);

// --- Sub-components ---

const GrainOverlay = () => <div className="grain-overlay" />;

const EngagementTeleprompter = () => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const messages = [
    "New PPV drop performing +47% vs baseline...",
    "Top 0.8% fan re-engagement protocol active...",
    "Sentiment analysis: High Intimacy Score detected...",
    "Revenue velocity exceeding quarterly projection..."
  ];

  useEffect(() => {
    let currentText = '';
    let charIndex = 0;
    const message = messages[index];

    const interval = setInterval(() => {
      if (charIndex < message.length) {
        currentText += message[charIndex];
        setText(currentText);
        charIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIndex((prev) => (prev + 1) % messages.length);
        }, 2000);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="glass rounded-3xl p-6 font-mono text-xs leading-relaxed flex flex-col gap-4 h-40 border-gold-clay/20">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-gold-clay animate-pulse" />
        <span className="text-gold-clay uppercase tracking-tighter">Live Pulse</span>
      </div>
      <div className="space-y-2 flex-1">
        <p className="text-white/80 border-l border-gold-clay/40 pl-3 min-h-[3em]">
          <span className="text-gold-clay">{'>'}</span> {text}
        </p>
      </div>
      <div className="w-2 h-4 bg-gold-clay animate-blink self-start" />
    </div>
  );
};

const DropSchedulerRitual = () => {
  const [activeSlot, setActiveSlot] = useState(5);
  const [isDeploying, setIsDeploying] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsDeploying(true);
      setTimeout(() => {
        setActiveSlot(Math.floor(Math.random() * 12));
        setIsDeploying(false);
      }, 1500);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex-1 flex items-center justify-center w-full">
      <div className="grid grid-cols-4 gap-2 w-full max-w-[200px]">
        {Array.from({ length: 12 }).map((_, i) => (
          <div 
            key={i} 
            className={cn(
              "aspect-square rounded-lg border border-white/10 transition-all duration-500",
              i === activeSlot ? "bg-gold-clay/40 border-gold-clay scale-110 shadow-[0_0_15px_rgba(236,72,153,0.3)]" : "bg-white/5"
            )} 
          />
        ))}
        <div 
          className="absolute transition-all duration-1000 ease-in-out"
          style={{ 
            top: `${Math.floor(activeSlot / 4) * 25 + 12.5}%`, 
            left: `${(activeSlot % 4) * 25 + 12.5}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
           <div className={cn(
             "w-4 h-4 text-gold-clay transition-transform duration-500",
             isDeploying ? "scale-150 rotate-45" : "scale-100"
           )}>
             <ArrowUpRight />
           </div>
        </div>
      </div>
      <button className={cn(
        "absolute bottom-0 w-full glass py-3 rounded-full text-[10px] font-mono uppercase tracking-widest transition-all duration-500",
        isDeploying ? "text-gold-clay border-gold-clay bg-gold-clay/10" : "text-white/40"
      )}>
        {isDeploying ? "Deploying Ritual..." : "System Idle"}
      </button>
    </div>
  );
};

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.6,
          ease: 'power3.out',
        });
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div 
      ref={cursorRef}
      className="fixed top-0 left-0 w-6 h-6 bg-gold-clay/40 rounded-full pointer-events-none z-[10000] blur-sm mix-blend-difference"
      style={{ transform: 'translate(-50%, -50%)' }}
    />
  );
};

const Navbar = ({ onApply }: { onApply: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-8 left-1/2 -translate-x-1/2 z-[5000] transition-all duration-500 w-[90%] max-w-5xl",
      isScrolled ? "top-4" : "top-8"
    )}>
      <div className={cn(
        "flex items-center justify-between px-8 py-4 rounded-5xl transition-all duration-500",
        isScrolled ? "glass py-3 border-gold-clay/20" : "bg-transparent"
      )}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gold-clay rounded-full flex items-center justify-center">
            <span className="text-white font-display font-bold text-xs">B</span>
          </div>
          <span className={cn(
            "font-display font-bold tracking-tighter text-xl",
            isScrolled ? "text-white" : "text-gold-clay"
          )}>
            BARELYY
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Philosophy', 'Protocol', 'Membership'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className={cn(
                "text-sm font-medium transition-colors hover:text-gold-clay",
                isScrolled ? "text-white/70" : "text-gold-clay/80"
              )}
            >
              {item}
            </a>
          ))}
          <button 
            onClick={onApply}
            className="magnetic-button bg-gold-clay text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 group"
          >
            <span>Apply Now</span>
            <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
          </button>
        </div>

        <button 
          className="md:hidden text-gold-clay"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full mt-4 glass-dark rounded-3xl p-6 flex flex-col gap-4 md:hidden animate-in fade-in slide-in-from-top-4">
          {['Philosophy', 'Protocol', 'Membership'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-white text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <button 
            className="bg-gold-clay text-white px-6 py-3 rounded-full font-bold"
            onClick={() => {
              setIsMenuOpen(false);
              onApply();
            }}
          >
            Apply Now
          </button>
        </div>
      )}
    </nav>
  );
};

const Hero = ({ onEnter, onInnovation }: { onEnter: () => void, onInnovation: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title span', {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: 'power4.out',
      });
      gsap.from('.hero-sub', {
        y: 20,
        opacity: 0,
        delay: 0.8,
        duration: 1,
        ease: 'power3.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen min-h-[800px] flex items-end pb-24 px-8 overflow-hidden">
      {/* Solid Black Background */}
      <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-gold-clay)_0%,_transparent_100%)] opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div ref={textRef} className="max-w-4xl">
          <h1 className="hero-title flex flex-col font-display leading-[0.85] tracking-tighter">
            <span className="text-6xl md:text-8xl text-white font-bold">Intimacy is the</span>
            <span className="text-8xl md:text-[12rem] text-gold-clay font-serif italic">Currency.</span>
          </h1>
          <p className="hero-sub mt-8 text-xl md:text-2xl text-white/80 max-w-2xl font-light leading-relaxed">
            We architect sovereign creator empires — <span className="text-gold-clay italic">quietly, precisely, profitably.</span>
          </p>
          <div className="hero-sub mt-12 flex flex-wrap gap-4">
            <button 
              onClick={onEnter}
              className="magnetic-button bg-gold-clay text-white px-10 py-5 rounded-full text-lg font-bold"
            >
              <span>Enter the Collective</span>
            </button>
            <button 
              onClick={onInnovation}
              className="glass px-10 py-5 rounded-full text-lg font-bold text-white hover:bg-white/20 transition-colors"
            >
              Our Innovation
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-[10px] uppercase tracking-[0.3em] text-gold-clay font-mono">Scroll to explore</span>
        <div className="w-px h-12 bg-gradient-to-b from-gold-clay to-transparent" />
      </div>
    </section>
  );
};

const Features = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophy" ref={containerRef} className="py-32 px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <h2 className="text-sm font-mono uppercase tracking-[0.4em] text-gold-clay mb-4">The Toolkit</h2>
            <h3 className="text-5xl md:text-7xl font-display font-bold leading-tight text-white">
              Elite Instruments for <span className="text-gold-clay italic font-serif">Digital Sovereignty.</span>
            </h3>
          </div>
          <p className="text-white/60 max-w-sm text-lg">
            Proprietary systems designed to maximize your influence while minimizing your operational friction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Revenue Intelligence */}
          <div className="feature-card group relative bg-charcoal border border-gold-clay/10 rounded-6xl p-10 h-[500px] overflow-hidden flex flex-col justify-between shadow-sm">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-gold-clay/10 flex items-center justify-center mb-6">
                <TrendingUp className="text-gold-clay w-6 h-6" />
              </div>
              <h4 className="text-2xl font-display font-bold text-white mb-2">Earnings Oracle</h4>
              <p className="text-white/40 text-sm">Real-time revenue telemetry and predictive growth modeling.</p>
            </div>
            
            {/* Interactive Micro-UI */}
            <div className="relative h-48 mt-8">
              {[0, 1, 2].map((i) => (
                <div 
                  key={i}
                  className={cn(
                    "absolute w-full glass p-4 rounded-2xl transition-all duration-700",
                    i === 0 ? "top-0 z-30 opacity-100 scale-100" : 
                    i === 1 ? "top-8 z-20 opacity-60 scale-95" : 
                    "top-16 z-10 opacity-30 scale-90"
                  )}
                  style={{ animation: `float ${4 + i}s infinite ease-in-out` }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-mono text-gold-clay uppercase tracking-widest">
                      {['Monthly Recurring', 'Tips Velocity', 'Conversion Lift'][i]}
                    </span>
                    <Activity className="w-3 h-3 text-gold-clay" />
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-xl font-mono text-white">
                      {['£42,800', '+12.4%', '8.2%'][i]}
                    </span>
                    <div className="flex-1 h-px bg-gold-clay/20 mb-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Engagement Teleprompter */}
          <div className="feature-card group relative bg-charcoal border border-gold-clay/10 rounded-6xl p-10 h-[500px] overflow-hidden flex flex-col justify-between">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-gold-clay/20 flex items-center justify-center mb-6">
                <Users className="text-gold-clay w-6 h-6" />
              </div>
              <h4 className="text-2xl font-display font-bold text-white mb-2">Engagement Teleprompter</h4>
              <p className="text-white/60 text-sm">Automated fan-base segmentation and high-conversion messaging.</p>
            </div>

            <EngagementTeleprompter />
          </div>

          {/* Card 3: Content Protocol */}
          <div className="feature-card group relative bg-charcoal border border-gold-clay/10 rounded-6xl p-10 h-[500px] overflow-hidden flex flex-col justify-between shadow-sm">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-gold-clay/10 flex items-center justify-center mb-6">
                <Calendar className="text-gold-clay w-6 h-6" />
              </div>
              <h4 className="text-2xl font-display font-bold text-white mb-2">Drop Scheduler Ritual</h4>
              <p className="text-white/40 text-sm">Algorithmic posting schedules optimized for UK & Global timezones.</p>
            </div>

            <DropSchedulerRitual />
          </div>
        </div>
      </div>
    </section>
  );
};

const Philosophy = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.philosophy-text', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
        y: 40,
        opacity: 0,
        stagger: 0.3,
        duration: 1.5,
        ease: 'power4.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-40 px-8 bg-black overflow-hidden">
      {/* Parallax Texture */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2000&auto=format&fit=crop" 
          alt="Pink Texture"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h2 className="philosophy-text text-sm font-mono uppercase tracking-[0.5em] text-gold-clay mb-12">The Sovereign Manifesto</h2>
        <div className="space-y-12">
          <p className="philosophy-text text-4xl md:text-6xl font-display font-medium text-white/40 leading-tight">
            Traditional agencies ask: <br />
            <span className="text-white">"How much can we take?"</span>
          </p>
          <div className="philosophy-text w-16 h-px bg-gold-clay mx-auto" />
          <p className="philosophy-text text-4xl md:text-7xl font-display font-bold text-white leading-tight">
            We ask: <br />
            <span className="text-gold-clay italic font-serif">"How sovereign can we make you?"</span>
          </p>
        </div>
      </div>
    </section>
  );
};

const Protocol = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.protocol-card');
    
    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          pin: true,
          pinSpacing: false,
          endTrigger: containerRef.current,
          end: 'bottom bottom',
          onUpdate: (self) => {
            const progress = self.progress;
            if (i < cards.length - 1) {
              gsap.to(card, {
                scale: 1 - progress * 0.08,
                filter: `blur(${progress * 20}px)`,
                opacity: 1 - progress * 0.6,
                duration: 0.1,
              });
            }
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const protocols = [
    {
      title: "The Ouroboros Cycle",
      desc: "A self-sustaining content ecosystem where every interaction feeds the next, creating infinite engagement loops.",
      icon: <Activity className="w-8 h-8" />,
      visual: (
        <div className="relative w-64 h-64 flex items-center justify-center">
          <div className="absolute inset-0 border-2 border-dashed border-gold-clay/20 rounded-full animate-spin-slow" />
          <div className="w-32 h-32 border-2 border-gold-clay rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-gold-clay/20 rounded-full animate-pulse" />
          </div>
        </div>
      )
    },
    {
      title: "Shadow Optimization",
      desc: "Discreet, high-precision account growth that bypasses platform restrictions and maximizes organic reach.",
      icon: <ShieldCheck className="w-8 h-8" />,
      visual: (
        <div className="w-full max-w-md h-48 glass-dark rounded-3xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-clay/10 to-transparent animate-scan" />
          <div className="p-8 grid grid-cols-8 gap-4">
            {Array.from({ length: 32 }).map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-gold-clay/20" />
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Revenue Rhythm",
      desc: "Harmonizing subscription flow with high-ticket PPV drops to create a consistent, predictable wealth stream.",
      icon: <DollarSign className="w-8 h-8" />,
      visual: (
        <div className="w-full max-w-md h-48 flex items-end gap-2 px-8">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i} 
              className="flex-1 bg-gold-clay/40 rounded-t-lg"
              style={{ height: `${Math.sin(i * 0.5) * 40 + 60}%`, animation: `wave 2s infinite ease-in-out ${i * 0.1}s` }}
            />
          ))}
        </div>
      )
    }
  ];

  return (
    <section id="protocol" ref={containerRef} className="bg-black">
      {protocols.map((p, i) => (
        <div key={i} className="protocol-card h-screen flex items-center justify-center px-8">
          <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-center bg-charcoal border border-gold-clay/10 rounded-[4rem] p-12 md:p-24 overflow-hidden relative shadow-xl">
             {/* Background Glow */}
             <div className="absolute top-0 right-0 w-96 h-96 bg-gold-clay/5 blur-[120px] rounded-full" />
             
             <div>
               <div className="w-16 h-16 rounded-3xl bg-gold-clay/10 flex items-center justify-center mb-8">
                 {p.icon}
               </div>
               <h3 className="text-sm font-mono uppercase tracking-[0.4em] text-gold-clay mb-4">Protocol 0{i + 1}</h3>
               <h4 className="text-5xl md:text-7xl font-display font-bold text-white mb-8 leading-tight">{p.title}</h4>
               <p className="text-white/60 text-xl max-w-md leading-relaxed">{p.desc}</p>
             </div>

             <div className="flex justify-center">
               {p.visual}
             </div>
          </div>
        </div>
      ))}
    </section>
  );
};

const Membership = ({ onApply }: { onApply: (tier: string) => void }) => {
  return (
    <section id="membership" className="py-32 px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-sm font-mono uppercase tracking-[0.4em] text-gold-clay mb-4">The Tiers</h2>
          <h3 className="text-5xl md:text-7xl font-display font-bold text-white">Choose Your <span className="text-gold-clay italic font-serif">Dominion.</span></h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Essential", price: "15%", features: ["Account Management", "Basic Strategy", "24/7 Support"] },
            { name: "Signature", price: "20%", features: ["Full Production", "Advanced Analytics", "PR & Branding", "Legal Protection"], featured: true },
            { name: "Dominion", price: "25%", features: ["Global Expansion", "Private Concierge", "Venture Capital Access", "Estate Management"] }
          ].map((tier, i) => (
            <div 
              key={i}
              className={cn(
                "rounded-[3rem] p-12 flex flex-col justify-between transition-transform hover:-translate-y-2 duration-500",
                tier.featured ? "bg-charcoal text-white ring-2 ring-gold-clay" : "bg-white text-obsidian"
              )}
            >
              <div>
                <h4 className="text-2xl font-display font-bold mb-2">{tier.name}</h4>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-display font-bold text-gold-clay">{tier.price}</span>
                  <span className="text-sm opacity-60">Revenue Share</span>
                </div>
                <ul className="space-y-4">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm">
                      <ShieldCheck className="w-4 h-4 text-gold-clay" />
                      <span className="opacity-80">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button 
                onClick={() => onApply(tier.name)}
                className={cn(
                  "mt-12 w-full py-4 rounded-full font-bold transition-all",
                  tier.featured ? "bg-gold-clay text-white" : "bg-obsidian text-white"
                )}
              >
                Apply for {tier.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white pt-32 pb-12 px-8 rounded-t-[5rem]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-gold-clay rounded-full flex items-center justify-center">
                <span className="text-white font-display font-bold">B</span>
              </div>
              <span className="font-display font-bold tracking-tighter text-2xl">BARELYY</span>
            </div>
            <p className="text-white/40 max-w-sm text-lg leading-relaxed">
              The premier London agency for high-end creators seeking absolute discretion and exponential growth.
            </p>
          </div>
          
          <div>
            <h5 className="text-gold-clay font-mono text-xs uppercase tracking-widest mb-8">System Status</h5>
            <div className="flex items-center gap-3 glass px-4 py-2 rounded-full w-fit border-white/10">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-tighter">Creator System: Operational</span>
            </div>
            <p className="mt-4 text-[10px] font-mono text-white/20">Uptime: 99.98% • London</p>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-white/20 text-xs font-mono">© 2026 BARELYY LTD. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8 text-white/20 text-xs font-mono">
            <a href="#" className="hover:text-gold-clay transition-colors">NDA PROTECTED</a>
            <a href="#" className="hover:text-gold-clay transition-colors">PRIVACY PROTOCOL</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function LandingPage({ onEnter, onInnovation, onApply }: { onEnter: () => void, onInnovation: () => void, onApply: (tier?: string) => void }) {
  return (
    <div className="relative selection:bg-gold-clay selection:text-white bg-black">
      <GrainOverlay />
      <CustomCursor />
      <Navbar onApply={() => onApply()} />
      <Hero onEnter={onEnter} onInnovation={onInnovation} />
      <Features />
      <Philosophy />
      <Protocol />
      <Membership onApply={onApply} />
      <Footer />
    </div>
  );
}
