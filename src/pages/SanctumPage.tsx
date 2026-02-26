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
  DollarSign,
  ArrowLeft,
  Eye,
  CheckCircle2,
  Waves
} from 'lucide-react';
import { cn } from '../lib/utils';

gsap.registerPlugin(ScrollTrigger);

// --- Sub-components ---

const GrainOverlay = () => <div className="grain-overlay" />;

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
      className="fixed top-0 left-0 w-4 h-4 bg-hot-pink/60 rounded-full pointer-events-none z-[10000] blur-[2px] mix-blend-screen"
      style={{ transform: 'translate(-50%, -50%)' }}
    />
  );
};

const Navbar = ({ onBack, onApply }: { onBack: () => void, onApply: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-8 left-1/2 -translate-x-1/2 z-[5000] transition-all duration-700 w-[90%] max-w-5xl",
      isScrolled ? "top-4" : "top-8"
    )}>
      <div className={cn(
        "flex items-center justify-between px-8 py-4 rounded-full transition-all duration-700 border border-transparent",
        isScrolled ? "glass-dark border-hot-pink/15" : "bg-transparent"
      )}>
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack}
            className="text-hot-pink/40 hover:text-hot-pink transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-hot-pink rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,0,150,0.4)]">
              <span className="text-white font-display font-bold text-xs">B</span>
            </div>
            <span className={cn(
              "font-display font-bold tracking-tighter text-xl transition-colors duration-700",
              isScrolled ? "text-hot-pink" : "text-champagne"
            )}>
              BARELYY
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {['Vision', 'Protocol', 'Membership'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className={cn(
                "text-sm font-medium transition-colors hover:text-hot-pink tracking-widest uppercase text-[10px]",
                isScrolled ? "text-white/60" : "text-champagne/40"
              )}
            >
              {item}
            </a>
          ))}
          <button 
            onClick={onApply}
            className="magnetic-button bg-hot-pink text-white px-8 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest group shadow-[0_0_20px_rgba(255,0,150,0.2)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Apply <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

const EmpireDiagnosticShuffler = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const stats = [
    { label: "Cumulative Revenue", value: "£17,500,000" },
    { label: "UK Sovereigns Scaled", value: "54" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % stats.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-48 w-full perspective-1000">
      {stats.map((stat, i) => {
        const offset = (i - activeIdx + stats.length) % stats.length;
        return (
          <div 
            key={i}
            className={cn(
              "absolute inset-0 glass-dark rounded-3xl p-8 transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex flex-col justify-center",
              offset === 0 ? "z-30 opacity-100 translate-y-0 scale-100 rotate-0 shadow-[0_0_30px_rgba(255,0,150,0.1)]" :
              offset === 1 ? "z-20 opacity-40 translate-y-8 scale-90 rotate-2" :
              "z-10 opacity-10 translate-y-16 scale-80 rotate-4"
            )}
          >
            <span className="text-[10px] font-mono text-hot-pink uppercase tracking-[0.3em] mb-2">{stat.label}</span>
            <span className="text-4xl font-display font-bold text-white tracking-tighter">{stat.value}</span>
            {offset === 0 && <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-hot-pink animate-pulse" />}
          </div>
        );
      })}
    </div>
  );
};

const IntimacyTelemetryTypewriter = () => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const messages = [
    "Diversifying revenue streams...",
    "Platform sovereignty achieved...",
    "Quiet compounding in motion...",
    "Intimacy algorithm optimized...",
    "Discreet scaling protocol active..."
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
    }, 40);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="glass-dark rounded-3xl p-8 font-mono text-[11px] leading-relaxed flex flex-col gap-6 h-48 border-hot-pink/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-hot-pink animate-[pulse_2s_infinite_ease-in-out]" />
          <span className="text-hot-pink uppercase tracking-widest">Live Empire Pulse</span>
        </div>
        <Activity className="w-3.5 h-3.5 text-hot-pink/40" />
      </div>
      <div className="flex-1 border-l border-hot-pink/20 pl-4 flex items-start">
        <p className="text-white/80 min-h-[3em]">
          <span className="text-hot-pink mr-2">{'>'}</span>{text}
          <span className="inline-block w-1.5 h-3.5 bg-hot-pink ml-1 animate-blink align-middle" />
        </p>
      </div>
    </div>
  );
};

const EmpireProtocolScheduler = () => {
  const [activeDay, setActiveDay] = useState(2);
  const [isClicking, setIsClicking] = useState(false);
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  useEffect(() => {
    const interval = setInterval(() => {
      const nextDay = Math.floor(Math.random() * 7);
      setIsClicking(true);
      setTimeout(() => {
        setActiveDay(nextDay);
        setIsClicking(false);
      }, 800);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-dark rounded-3xl p-8 h-48 flex flex-col justify-between overflow-hidden relative">
      <div className="flex justify-between items-center mb-4">
        <span className="text-[10px] font-mono text-hot-pink uppercase tracking-[0.3em]">Protocol Schedule</span>
        <Calendar className="w-4 h-4 text-hot-pink/40" />
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <span className="text-[9px] font-mono text-white/20">{day}</span>
            <div className={cn(
              "w-full aspect-square rounded-lg border border-white/5 transition-all duration-500 flex items-center justify-center",
              i === activeDay ? "bg-hot-pink/20 border-hot-pink/40" : "bg-white/5"
            )}>
              {i === activeDay && <CheckCircle2 className="w-3 h-3 text-hot-pink" />}
            </div>
          </div>
        ))}
      </div>
      
      {/* Animated SVG Cursor */}
      <div 
        className="absolute pointer-events-none transition-all duration-1000 ease-in-out"
        style={{ 
          left: `${(activeDay / 6) * 70 + 15}%`, 
          top: '65%',
          transform: isClicking ? 'scale(0.8) translate(-50%, -50%)' : 'scale(1) translate(-50%, -50%)'
        }}
      >
        <div className="relative">
          <ArrowUpRight className="w-5 h-5 text-hot-pink rotate-[-45deg]" />
          {isClicking && (
            <div className="absolute inset-0 w-10 h-10 bg-hot-pink/20 rounded-full -translate-x-1/4 -translate-y-1/4 animate-ping" />
          )}
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-[9px] font-mono text-white/40 uppercase">Automated Scaling: Active</span>
        <div className="flex gap-1">
          {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-hot-pink/40" />)}
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.artifact-card', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: 'power3.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="vision" ref={containerRef} className="py-40 px-8 md:px-24 bg-obsidian">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-24">
          <h2 className="text-[11px] font-mono uppercase tracking-[0.5em] text-hot-pink mb-6">Interactive Empire Artifacts</h2>
          <h3 className="text-5xl md:text-8xl font-display font-bold text-white leading-[0.9] tracking-tighter">
            Private Control for <span className="text-hot-pink italic font-serif">Discreet Wealth.</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="artifact-card space-y-6">
            <EmpireDiagnosticShuffler />
            <div className="px-4">
              <h4 className="text-xl font-display font-bold text-white mb-2">Empire Diagnostic Shuffler</h4>
              <p className="text-white/40 text-sm leading-relaxed">Real-time telemetry across our 54 UK sovereigns. Precision growth, visualized.</p>
            </div>
          </div>

          <div className="artifact-card space-y-6">
            <IntimacyTelemetryTypewriter />
            <div className="px-4">
              <h4 className="text-xl font-display font-bold text-white mb-2">Intimacy Telemetry Typewriter</h4>
              <p className="text-white/40 text-sm leading-relaxed">Live-feed simulation of platform sovereignty protocols in active motion.</p>
            </div>
          </div>

          <div className="artifact-card space-y-6">
            <EmpireProtocolScheduler />
            <div className="px-4">
              <h4 className="text-xl font-display font-bold text-white mb-2">Empire Protocol Scheduler</h4>
              <p className="text-white/40 text-sm leading-relaxed">Automated, high-yield deployment cycles optimized for global dominance.</p>
            </div>
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
      gsap.from('.pillar', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        y: 30,
        opacity: 0,
        stagger: 0.3,
        duration: 1.5,
        ease: 'power4.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-60 px-8 bg-charcoal overflow-hidden">
      {/* Organic Velvet Texture Parallax */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2400&auto=format&fit=crop" 
          alt="Velvet Texture"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h2 className="text-[11px] font-mono uppercase tracking-[0.5em] text-hot-pink mb-16">The Sovereign Manifesto</h2>
        <div className="space-y-24">
          <p className="text-5xl md:text-8xl font-display font-bold text-white leading-[0.9] tracking-tighter">
            Quietly <span className="text-hot-pink italic font-serif">architect.</span><br />
            Precisely <span className="text-hot-pink italic font-serif">scale.</span><br />
            Profitably <span className="text-hot-pink italic font-serif">own.</span>
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Quietly Architect", desc: "We build in the shadows, ensuring your empire is structurally sound before it goes public." },
              { title: "Precisely Scale", desc: "Algorithmic growth that bypasses noise and focuses on high-ticket conversion." },
              { title: "Profitably Own", desc: "Absolute sovereignty over your content, your data, and your financial future." }
            ].map((pillar, i) => (
              <div key={i} className="pillar space-y-4">
                <div className="w-10 h-px bg-hot-pink/40 mx-auto" />
                <h4 className="text-lg font-display font-bold text-white">{pillar.title}</h4>
                <p className="text-white/40 text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Proof = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.empire-card');
    
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
                filter: `blur(${progress * 18}px)`,
                opacity: 1 - progress * 0.4,
                duration: 0.1,
              });
            }
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const empires = [
    {
      title: "The Intimacy Web",
      desc: "A network of high-value connections architected for long-term compounding.",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute inset-0 border border-hot-pink/10 rounded-full animate-spin-slow" />
          <div className="w-64 h-64 border border-hot-pink/20 rounded-full flex items-center justify-center">
            <div className="w-32 h-32 border-2 border-hot-pink rounded-full animate-pulse flex items-center justify-center">
              <Waves className="w-12 h-12 text-hot-pink" />
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Shadow Optimization",
      desc: "Slow-scanning spotlight over anonymized creator silhouettes. Discretion is absolute.",
      visual: (
        <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-hot-pink/5 to-transparent animate-scan" />
          <div className="grid grid-cols-6 gap-6 opacity-20">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="w-12 h-16 bg-white/10 rounded-xl" />
            ))}
          </div>
          <div className="absolute w-48 h-48 bg-hot-pink/10 blur-[80px] rounded-full animate-float" />
        </div>
      )
    },
    {
      title: "Revenue Sovereignty",
      desc: "Pulsing waveform charting the transition from platform dependence to absolute ownership.",
      visual: (
        <div className="w-full h-full flex items-center justify-center px-20">
          <div className="w-full h-32 flex items-end gap-1">
            {Array.from({ length: 40 }).map((_, i) => (
              <div 
                key={i} 
                className="flex-1 bg-hot-pink/30 rounded-t-sm"
                style={{ 
                  height: `${Math.sin(i * 0.3) * 40 + 60}%`, 
                  animation: `wave 2s infinite ease-in-out ${i * 0.05}s` 
                }}
              />
            ))}
          </div>
        </div>
      )
    },
    {
      title: "The Sovereign Gallery",
      desc: "54 UK sovereigns. Real empires. Real numbers.",
      visual: (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 p-8 w-full h-full overflow-hidden">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-charcoal border border-white/5">
              <img 
                src={`https://images.unsplash.com/photo-${[
                  '1534528741775-53994a69daeb',
                  '1506794778202-cad84cf45f1d',
                  '1531746020798-e6953c6e8e04',
                  '1507003211169-0a1dd7228f2d',
                  '1524504388940-b1c1722653e1',
                  '1539571696357-5a69c17a67c6',
                  '1517841905240-472988babdf9',
                  '1501196356658-26b5879115a6',
                  '1529626455594-4ff0802cfb7e',
                  '1488426862026-3ee34a7d66df',
                  '1544005313-94ddf0286df2',
                  '1521119989659-a83eee488004'
                ][i]}?q=80&w=800&auto=format&fit=crop`}
                alt="Sovereign"
                className="w-full h-full object-cover opacity-40 group-hover:opacity-80 transition-opacity duration-700 grayscale group-hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-hot-pink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                <span className="text-[10px] font-mono text-hot-pink uppercase tracking-widest">£{Math.floor(Math.random() * 500 + 100)}k+ Empire</span>
              </div>
            </div>
          ))}
        </div>
      )
    }
  ];

  return (
    <section id="protocol" ref={containerRef} className="bg-obsidian">
      {empires.map((e, i) => (
        <div key={i} className="empire-card h-screen flex items-center justify-center px-8 md:px-24">
          <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-center bg-charcoal border border-hot-pink/10 rounded-[4rem] p-12 md:p-24 overflow-hidden relative shadow-2xl">
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-hot-pink/5 blur-[150px] rounded-full -z-10" />
             
             <div className="space-y-8">
               <div className="w-16 h-16 rounded-3xl bg-hot-pink/10 flex items-center justify-center">
                 <Lock className="w-8 h-8 text-hot-pink" />
               </div>
               <h3 className="text-[11px] font-mono uppercase tracking-[0.5em] text-hot-pink">Archive Protocol 0{i + 1}</h3>
               <h4 className="text-5xl md:text-7xl font-display font-bold text-white leading-[0.9] tracking-tighter">{e.title}</h4>
               <p className="text-white/40 text-xl max-w-md leading-relaxed font-light">{e.desc}</p>
             </div>

             <div className="h-[400px] md:h-[600px] relative">
               {e.visual}
             </div>
          </div>
        </div>
      ))}
    </section>
  );
};

const VCMarquee = () => {
  return (
    <section className="py-32 bg-obsidian overflow-hidden border-y border-white/5">
      <div className="max-w-7xl mx-auto px-8 mb-16 text-center">
        <p className="text-champagne/40 text-sm font-light tracking-widest uppercase">Architected with visionary capital • Public results, quiet scale</p>
      </div>
      <div className="flex whitespace-nowrap animate-marquee">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex items-center gap-20 px-10 opacity-20 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0">
            {['FRANCE TELECOM', 'BALDERTON', 'EPISODE 1', 'LOCALGLOBE', 'PUBLICIS'].map((name) => (
              <span key={name} className="text-4xl font-display font-black tracking-tighter text-white">{name}</span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

const Membership = ({ onApply }: { onApply: (tier: string) => void }) => {
  return (
    <section id="membership" className="py-40 px-8 md:px-24 bg-obsidian">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-32">
          <h2 className="text-[11px] font-mono uppercase tracking-[0.5em] text-hot-pink mb-6">The Tiers</h2>
          <h3 className="text-5xl md:text-8xl font-display font-bold text-white tracking-tighter">Choose Your <span className="text-hot-pink italic font-serif">Dominion.</span></h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { name: "Sovereign", price: "15%", stats: "£10k - £50k MRR", desc: "Discreet management for rising creators." },
            { name: "Empire", price: "20%", stats: "£50k - £250k MRR", desc: "Full-scale production and global expansion.", featured: true },
            { name: "Collective", price: "25%", stats: "£250k+ MRR", desc: "Venture capital access and estate management." }
          ].map((tier, i) => (
            <div 
              key={i}
              className={cn(
                "rounded-[4rem] p-12 flex flex-col justify-between transition-all duration-700 border group",
                tier.featured ? "bg-hot-pink text-white border-hot-pink shadow-[0_0_50px_rgba(255,0,150,0.2)] scale-105 z-10" : "bg-charcoal text-white border-white/5 hover:border-hot-pink/30"
              )}
            >
              <div>
                <h4 className="text-3xl font-display font-bold mb-4">{tier.name}</h4>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className={cn("text-6xl font-display font-bold", tier.featured ? "text-white" : "text-hot-pink")}>{tier.price}</span>
                  <span className="text-xs opacity-40 uppercase tracking-widest">Rev Share</span>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 opacity-40" />
                    <span className="text-sm font-mono opacity-80">{tier.stats}</span>
                  </div>
                  <p className="text-sm opacity-60 leading-relaxed font-light">{tier.desc}</p>
                </div>
              </div>
              <button 
                onClick={() => onApply(tier.name)}
                className={cn(
                  "magnetic-button mt-16 w-full py-6 rounded-full font-bold uppercase tracking-widest text-sm transition-all shadow-xl",
                  tier.featured ? "bg-white text-hot-pink" : "bg-hot-pink text-white"
                )}
              >
                <span className="relative z-10">Apply Now</span>
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
    <footer className="bg-charcoal text-white pt-40 pb-16 px-8 md:px-24 rounded-t-[6rem] border-t border-hot-pink/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
          <div className="col-span-2 space-y-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-hot-pink rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,0,150,0.4)]">
                <span className="text-white font-display font-bold text-lg">B</span>
              </div>
              <span className="font-display font-bold tracking-tighter text-4xl">BARELYY</span>
            </div>
            <p className="text-white/40 max-w-md text-xl leading-relaxed font-light">
              The premier London inner sanctum for high-end creators seeking absolute discretion and sovereign wealth.
            </p>
          </div>
          
          <div className="space-y-10">
            <h5 className="text-hot-pink font-mono text-xs uppercase tracking-[0.5em]">Sanctum</h5>
            <div className="flex flex-col gap-6">
              {['Vision', 'Protocol', 'Archive', 'Membership'].map(link => (
                <a key={link} href="#" className="text-white/40 hover:text-hot-pink transition-colors text-lg font-light">{link}</a>
              ))}
            </div>
          </div>

          <div className="space-y-10">
            <h5 className="text-hot-pink font-mono text-xs uppercase tracking-[0.5em]">Status</h5>
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-4 glass px-6 py-3 rounded-full w-fit border-hot-pink/20">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-widest">Collective Operational</span>
              </div>
              <div className="space-y-2">
                <p className="text-white/60 text-sm font-light">54 Empires Active</p>
                <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Uptime: 99.998% • London</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <p className="text-white/10 text-[10px] font-mono uppercase tracking-[0.4em]">© 2026 BARELYY LTD • SOVEREIGNTY ENGINEERED</p>
          <div className="flex gap-12 text-white/10 text-[10px] font-mono uppercase tracking-[0.4em]">
            <a href="#" className="hover:text-hot-pink transition-colors">NDA PROTECTED</a>
            <a href="#" className="hover:text-hot-pink transition-colors">PRIVACY PROTOCOL</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function SanctumPage({ onBack, onApply }: { onBack: () => void, onApply: (tier?: string) => void }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative selection:bg-hot-pink/30 selection:text-white bg-obsidian animate-in fade-in duration-1000">
      <GrainOverlay />
      <CustomCursor />
      <Navbar onBack={onBack} onApply={() => onApply()} />
      <Features />
      <Philosophy />
      <Proof />
      <Membership onApply={onApply} />
      <VCMarquee />
      <Footer />
    </div>
  );
}
