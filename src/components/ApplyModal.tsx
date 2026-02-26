/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTier?: string;
}

export const ApplyModal = ({ isOpen, onClose, initialTier }: ApplyModalProps) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    handle: '',
    mrr: '',
    tier: initialTier || 'Signature',
    goals: '',
    location: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl glass-dark border-white/10 rounded-[3rem] overflow-hidden shadow-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-8 md:p-12">
              {step === 'form' ? (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-sm font-mono uppercase tracking-[0.4em] text-gold-clay mb-4">Application Protocol</h2>
                    <h3 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tighter leading-none">
                      Join the <span className="text-gold-clay italic font-serif">Collective.</span>
                    </h3>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 ml-4">Full Name</label>
                        <input 
                          required
                          type="text"
                          placeholder="Olivia Bancroft"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-gold-clay/50 transition-colors"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 ml-4">Primary Handle</label>
                        <input 
                          required
                          type="text"
                          placeholder="@username"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-gold-clay/50 transition-colors"
                          value={formData.handle}
                          onChange={(e) => setFormData({...formData, handle: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 ml-4">Current Monthly Revenue</label>
                        <select 
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-gold-clay/50 transition-colors appearance-none"
                          value={formData.mrr}
                          onChange={(e) => setFormData({...formData, mrr: e.target.value})}
                        >
                          <option value="" className="bg-obsidian">Select Range</option>
                          <option value="10-50" className="bg-obsidian">£10k - £50k</option>
                          <option value="50-250" className="bg-obsidian">£50k - £250k</option>
                          <option value="250+" className="bg-obsidian">£250k+</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 ml-4">Target Tier</label>
                        <select 
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-gold-clay/50 transition-colors appearance-none"
                          value={formData.tier}
                          onChange={(e) => setFormData({...formData, tier: e.target.value})}
                        >
                          <option value="Essential" className="bg-obsidian">Essential</option>
                          <option value="Signature" className="bg-obsidian">Signature</option>
                          <option value="Dominion" className="bg-obsidian">Dominion</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 ml-4">Primary Goal</label>
                      <textarea 
                        placeholder="Scaling, Discretion, Global Expansion..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-gold-clay/50 transition-colors h-32 resize-none"
                        value={formData.goals}
                        onChange={(e) => setFormData({...formData, goals: e.target.value})}
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-gold-clay text-white py-6 rounded-full font-bold uppercase tracking-[0.2em] text-sm shadow-[0_0_40px_rgba(255,0,150,0.2)] hover:shadow-[0_0_60px_rgba(255,0,150,0.4)] transition-all flex items-center justify-center gap-3 group"
                    >
                      Submit Application <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <p className="text-[10px] font-mono text-white/20 text-center uppercase tracking-widest">
                      Your data is encrypted and protected by our privacy protocol.
                    </p>
                  </form>
                </div>
              ) : (
                <div className="py-20 text-center space-y-8">
                  <div className="w-24 h-24 bg-gold-clay/20 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-12 h-12 text-gold-clay" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-4xl font-display font-bold text-white tracking-tighter">Protocol Initiated.</h3>
                    <p className="text-white/40 text-lg font-light max-w-md mx-auto leading-relaxed">
                      We have received your details. Our vetting team will review your application and reach out via encrypted channels within 24 hours.
                    </p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="glass px-12 py-4 rounded-full text-sm font-bold uppercase tracking-widest text-white hover:bg-white/10 transition-colors"
                  >
                    Close Terminal
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
