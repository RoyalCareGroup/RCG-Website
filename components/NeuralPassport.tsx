
import React, { useState } from 'react';
import { Shield, Zap, Loader2, X, Fingerprint, Mail, Building, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useSovereign } from '../context/SovereignContext.tsx';

export const NeuralPassport: React.FC = () => {
  const { showPassportModal, setShowPassportModal, establishPassport } = useSovereign();
  const [step, setStep] = useState<'form' | 'syncing' | 'complete'>('form');
  const [formData, setFormData] = useState({ name: '', email: '', org: '' });

  if (!showPassportModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('syncing');
    
    // Simulate Neural Bond
    setTimeout(() => {
      setStep('complete');
      setTimeout(() => {
        establishPassport({
          ...formData,
          timestamp: Date.now()
        });
      }, 1500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[30000] flex items-center justify-center p-6 bg-[#020617]/90 backdrop-blur-2xl animate-in fade-in duration-500">
      <div className="relative w-full max-w-lg bg-black border-2 border-white/10 rounded-[2.5rem] shadow-[0_80px_160px_rgba(0,0,0,1)] overflow-hidden">
        
        {/* Atmosphere */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-blue animate-pulse" />
        <button 
          onClick={() => setShowPassportModal(false)}
          className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-10 sm:p-14">
          {step === 'form' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="text-center space-y-4">
                 <div className="p-4 bg-neon-gold/10 rounded-2xl border border-neon-gold/20 inline-block mb-4 shadow-3xl">
                    <Fingerprint className="text-neon-gold" size={32} />
                 </div>
                 <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter">Claim Passport.</h2>
                 <p className="text-slate-400 text-sm font-bold italic leading-relaxed">
                   "Establish your permanent node in the Royal Care Grid. Access restricted strategic intelligence and save your laboratory progress."
                 </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2">Human Identity</label>
                  <div className="relative">
                    <input 
                      required type="text" placeholder="Full Name"
                      className="w-full bg-royal-950 border border-white/10 rounded-xl py-4 pl-12 pr-6 text-white text-sm focus:border-neon-blue outline-none transition-all"
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                    <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700" size={16} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2">Uplink Address</label>
                  <div className="relative">
                    <input 
                      required type="email" placeholder="Work Email"
                      className="w-full bg-royal-950 border border-white/10 rounded-xl py-4 pl-12 pr-6 text-white text-sm focus:border-neon-blue outline-none transition-all"
                      value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700" size={16} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2">Provider Node</label>
                  <div className="relative">
                    <input 
                      required type="text" placeholder="Organization Name"
                      className="w-full bg-royal-950 border border-white/10 rounded-xl py-4 pl-12 pr-6 text-white text-sm focus:border-neon-blue outline-none transition-all"
                      value={formData.org} onChange={e => setFormData({...formData, org: e.target.value})}
                    />
                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700" size={16} />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-6 bg-white text-black font-black text-[11px] tracking-[0.5em] uppercase rounded-xl hover:bg-neon-blue hover:text-white transition-all shadow-3xl flex items-center justify-center gap-4 group"
                >
                  <Zap size={16} className="text-amber-500 group-hover:animate-bounce" />
                  Initialize Uplink
                </button>
              </form>
              
              <p className="text-[8px] text-slate-600 text-center font-black uppercase tracking-[0.2em]">
                By joining, you consent to data collection for architectural personalization.
              </p>
            </div>
          )}

          {step === 'syncing' && (
            <div className="flex flex-col items-center justify-center py-20 space-y-10 animate-in fade-in duration-500">
               <div className="relative">
                  <div className="w-32 h-32 border-4 border-dashed border-neon-blue rounded-full animate-spin-slow" />
                  <Loader2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-neon-blue animate-pulse" size={48} />
               </div>
               <div className="text-center space-y-4">
                  <h3 className="text-2xl font-display font-black text-white uppercase tracking-widest">Bonding Identity...</h3>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.5em]">Synchronizing_AU_East_Node</p>
               </div>
            </div>
          )}

          {step === 'complete' && (
            <div className="flex flex-col items-center justify-center py-20 space-y-10 animate-in zoom-in-95 duration-500">
               <div className="p-8 bg-green-500/20 rounded-full border-2 border-green-500/50 shadow-[0_0_50px_rgba(34,197,94,0.3)]">
                  <CheckCircle2 className="text-green-500" size={64} />
               </div>
               <div className="text-center space-y-4">
                  <h3 className="text-3xl font-display font-black text-white uppercase tracking-tighter">Uplink Established.</h3>
                  <p className="text-slate-400 font-bold italic">Welcome to the Grid, {formData.name.split(' ')[0]}.</p>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
