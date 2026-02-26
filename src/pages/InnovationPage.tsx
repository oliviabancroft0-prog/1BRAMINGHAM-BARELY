/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { 
  ArrowLeft, 
  Cpu, 
  Globe, 
  Shield, 
  Zap, 
  Layers, 
  Database,
  ArrowUpRight
} from 'lucide-react';
import { cn } from '../lib/utils';

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
      className="fixed top-0 left-0 w-4 h-4 bg-gold-clay/60 rounded-full pointer-events-none z-[10000] blur-[2px] mix-blend-screen"
      style={{ transform: 'translate(-50%, -50%)' }}
    />
  );
};

export default function InnovationPage({ onBack }: { onBack: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from('.animate-item', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-obsidian text-white selection:bg-gold-clay/30 overflow-hidden">
      <GrainOverlay />
      <CustomCursor />

      {/* Navigation */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[5000] w-[90%] max-w-5xl">
        <div className="flex items-center justify-between px-8 py-4 rounded-full glass border-gold-clay/20">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gold-clay hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-mono uppercase tracking-widest">Back</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gold-clay rounded-full flex items-center justify-center">
              <span className="text-white font-display font-bold text-xs">B</span>
            </div>
            <span className="font-display font-bold tracking-tighter text-xl text-gold-clay">
              BARELYY
            </span>
          </div>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </nav>

      <main className="pt-40 pb-32 px-8 md:px-24 max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-24">
          <h1 className="animate-item text-sm font-mono uppercase tracking-[0.5em] text-gold-clay mb-6">Our Innovation</h1>
          <h2 className="animate-item text-5xl md:text-8xl font-display font-bold leading-[0.9] tracking-tighter mb-8">
            The Architecture of <br />
            <span className="text-gold-clay italic font-serif">Sovereign Intelligence.</span>
          </h2>
          <p className="animate-item text-white/60 text-xl max-w-2xl font-light leading-relaxed">
            Founded by <span className="text-white font-medium">Olivia Marella Bancroft</span>, BRAMINGHAM BARELYY is more than an agency. It is a proprietary technology ecosystem engineered for the elite.
          </p>
        </header>

        {/* Funding Section */}
        <section className="animate-item grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          <div className="glass p-12 rounded-[3rem] border-gold-clay/20 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-clay/5 blur-[100px] rounded-full -z-10" />
            <h3 className="text-sm font-mono uppercase tracking-widest text-gold-clay/60 mb-4">Capital Infusion</h3>
            <div className="text-6xl md:text-8xl font-display font-bold text-white mb-4 tracking-tighter">
              £3.4M
            </div>
            <p className="text-white/40 text-lg font-light">
              Seed funding secured to accelerate the development of our proprietary intimacy algorithms and global infrastructure.
            </p>
          </div>
          <div className="glass p-12 rounded-[3rem] border-gold-clay/20 flex flex-col justify-center">
            <h3 className="text-sm font-mono uppercase tracking-widest text-gold-clay/60 mb-8">Visionary Backing</h3>
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-white/5 pb-6">
                <span className="text-3xl font-display font-bold text-white">France Telecom</span>
                <ArrowUpRight className="text-gold-clay w-6 h-6" />
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-6">
                <span className="text-3xl font-display font-bold text-white">Publicis Groupe</span>
                <ArrowUpRight className="text-gold-clay w-6 h-6" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-3xl font-display font-bold text-white">Balderton</span>
                  <span className="text-[10px] font-mono text-gold-clay uppercase tracking-widest mt-1">Tech Partner</span>
                </div>
                <ArrowUpRight className="text-gold-clay w-6 h-6" />
              </div>
            </div>
          </div>
        </section>

        {/* Tech Ecosystem */}
        <section className="mb-32">
          <div className="flex flex-col md:flex-row gap-12 items-start mb-20">
            <div className="md:w-1/2">
              <h3 className="animate-item text-sm font-mono uppercase tracking-widest text-gold-clay mb-6">Proprietary Ecosystem</h3>
              <h4 className="animate-item text-4xl md:text-6xl font-display font-bold text-white leading-tight">
                A Closed-Loop <br />
                <span className="text-gold-clay italic font-serif">Growth Engine.</span>
              </h4>
            </div>
            <div className="md:w-1/2">
              <p className="animate-item text-white/40 text-lg font-light leading-relaxed">
                Our ecosystem operates on a unique, vertically integrated stack developed entirely in-house. We don't use third-party tools; we build the instruments that define the industry.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Cpu className="w-8 h-8" />, 
                title: "Neural Intimacy Engine", 
                desc: "Proprietary AI that maps fan sentiment and predicts high-yield engagement windows with 98% accuracy." 
              },
              { 
                icon: <Database className="w-8 h-8" />, 
                title: "Sovereign Vault", 
                desc: "Encrypted content management system ensuring absolute ownership and zero-leak security for all digital assets." 
              },
              { 
                icon: <Layers className="w-8 h-8" />, 
                title: "Omni-Channel Sync", 
                desc: "Real-time synchronization across all platforms, optimizing revenue velocity through algorithmic cross-pollination." 
              }
            ].map((tech, i) => (
              <div key={i} className="animate-item glass p-10 rounded-[2.5rem] border-gold-clay/10 hover:border-gold-clay/40 transition-colors group">
                <div className="w-16 h-16 rounded-2xl bg-gold-clay/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <div className="text-gold-clay">{tech.icon}</div>
                </div>
                <h5 className="text-2xl font-display font-bold text-white mb-4">{tech.title}</h5>
                <p className="text-white/40 text-sm leading-relaxed font-light">{tech.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Founder Quote */}
        <section className="animate-item relative py-32 px-12 glass rounded-[4rem] border-gold-clay/20 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gold-clay/5 to-transparent -z-10" />
          <div className="max-w-3xl mx-auto">
            <p className="text-3xl md:text-5xl font-serif italic text-white leading-tight mb-12">
              "We are not just managing creators; we are architecting the future of digital sovereignty through uncompromising innovation."
            </p>
            <div className="w-12 h-px bg-gold-clay mx-auto mb-8" />
            <h6 className="text-xl font-display font-bold text-white uppercase tracking-widest">Olivia Marella Bancroft</h6>
            <p className="text-gold-clay font-mono text-xs uppercase tracking-[0.3em] mt-2">Founder & Chief Architect</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-white/5 text-center">
        <p className="text-white/20 text-[10px] font-mono uppercase tracking-[0.4em]">© 2026 BARELYY LTD • INNOVATION PROTOCOL ACTIVE</p>
      </footer>
    </div>
  );
}
