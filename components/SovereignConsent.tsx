import React, { useState } from 'react';
import { ShieldCheck, Zap, Loader2, Scale, ArrowRight, Activity, Terminal } from 'lucide-react';
import { useSovereign } from '../context/SovereignContext.tsx';
import { BrandLogo } from './BrandLogo.tsx';

interface SovereignConsentProps {
  onAccepted: () => void;
}

export const SovereignConsent: React.FC<SovereignConsentProps> = ({ onAccepted }) => {
  const [isInitializing, setIsInitializing] = useState(false);
  const { initializeAudio, getAudioContext } = useSovereign();

  const handleAccept = async () => {
    if (isInitializing) return;
    setIsInitializing(true);

    try {
      // Initialise audio hardware for all neural/voice features
      await initializeAudio();

      // Capture user gesture for AudioContext
      const ctx = getAudioContext();
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }
      
      const silentBuf = ctx.createBuffer(1, 1, 22050);
      const silentSource = ctx.createBufferSource();
      silentSource.buffer = silentBuf;
      silentSource.connect(ctx.destination);
      silentSource.start(0);

      // We still update storage for logic elsewhere, but App.tsx now handles the primary revelation
      const stamp = Date.now();
      localStorage.setItem('rcg_structural_consent', 'ACCEPTED_' + stamp);
      localStorage.setItem('rcg_legal_v2', 'ENFORCED_PROTOCOL_' + stamp);
      
      // Delay slightly for dramatic effect
      setTimeout(() => {
        onAccepted();
        setIsInitializing(false);
      }, 1000);
    } catch (err) {
      console.warn("Hardware bonding partially failed. Revealing Mainframe anyway...");
      onAccepted();
      setIsInitializing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[20000] flex items-center justify-center p-6 sm:p-12 overflow-hidden bg-black/40 backdrop-blur-md">
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0,transparent_70%)] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent opacity-80" />
      </div>

      <div className="max-w-5xl w-full relative z-10 animate-in fade-in slide-in-from-bottom-10 duration-1000 flex flex-col items-center">
        
        {/* Brand Uplink Header */}
        <div className="mb-20 scale-125 transform transition-transform duration-1000">
           <BrandLogo size="lg" />
        </div>

        <div className="w-full bg-black/80 backdrop-blur-3xl border-2 border-white/10 rounded-[4rem] p-10 sm:p-20 shadow-[0_100px_200px_rgba(0,0,0,1)] relative overflow-hidden flex flex-col items-center text-center gap-12 group">
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue via-white to-neon-purple opacity-40 group-hover:opacity-100 transition-opacity duration-1000" />
          
          {/* Central Status Node */}
          <div className="relative">
             <div className="absolute inset-0 bg-neon-blue/20 blur-3xl rounded-full scale-150 animate-pulse" />
             <div className="relative p-8 bg-royal-950 rounded-full border-2 border-neon-blue/30 shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                <ShieldCheck className="text-neon-blue w-16 h-16" />
             </div>
          </div>

          <div className="space-y-8 max-w-3xl">
             <div className="space-y-3">
                <h2 className="text-white font-display font-black uppercase tracking-tight text-4xl sm:text-7xl leading-none">
                  Sovereign <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-purple drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">Entry Protocol.</span>
                </h2>
                <div className="flex items-center justify-center gap-4 mt-6">
                   <div className="h-[1px] w-12 bg-white/10" />
                   <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.6em] font-mono">Status: Awaiting_Authorization</span>
                   <div className="h-[1px] w-12 bg-white/10" />
                </div>
             </div>

             <p className="text-slate-400 text-lg sm:text-2xl font-bold leading-relaxed italic opacity-90 px-4 sm:px-10">
               "By initializing, you accept our <span className="text-white underline underline-offset-8 decoration-neon-blue/40">Terms of Engagement</span> and authorize hardware bonding for AI assistive tools. You acknowledge that every structural outcome is human-verified to protect your organizational integrity."
             </p>
          </div>

          <div className="w-full flex flex-col items-center gap-12 mt-4">
             <button 
               onClick={handleAccept} 
               disabled={isInitializing} 
               className="w-full max-w-md py-8 sm:py-10 bg-white text-black rounded-[2.5rem] font-black text-[14px] sm:text-[16px] uppercase tracking-[0.6em] hover:bg-neon-blue hover:text-white transition-all shadow-[0_40px_100px_rgba(6,182,212,0.3)] active:scale-95 whitespace-nowrap flex items-center justify-center gap-6 disabled:opacity-50 group/btn"
             >
               {isInitializing ? (
                 <>
                   <Loader2 className="animate-spin" size={24} />
                   <span>Bonding Hardware...</span>
                 </>
               ) : (
                 <>
                   <Zap size={24} className="text-neon-purple group-hover/btn:animate-bounce" />
                   <span>Initialize Grid</span>
                 </>
               )}
             </button>
             
             <div className="flex flex-col sm:flex-row items-center gap-12 opacity-40 hover:opacity-100 transition-opacity duration-500">
                <div className="flex items-center gap-4">
                   <Activity size={16} className="text-neon-blue" />
                   <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Neural Sync Stable</span>
                </div>
                <div className="flex items-center gap-4">
                   <Scale size={16} className="text-neon-purple" />
                   <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">AU Regulatory Adherent</span>
                </div>
                <div className="flex items-center gap-4">
                   <Terminal size={16} className="text-slate-600" />
                   <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">RCG_GND_v10.15</span>
                </div>
             </div>
          </div>
        </div>

        {/* Global Metadata Footer */}
        <div className="mt-16 text-center">
           <p className="text-[9px] font-mono text-slate-700 uppercase tracking-[0.8em] font-black">
             Authorized Access Point // Royal Care Group Technology Division
           </p>
        </div>
      </div>
    </div>
  );
};