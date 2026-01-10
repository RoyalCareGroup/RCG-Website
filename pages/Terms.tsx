
import React from 'react';
import { Gavel, Scale, ShieldAlert, FileText, ArrowLeft, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY_DETAILS } from '../config.ts';

const Terms: React.FC = () => {
  return (
    <div className="flex flex-col bg-transparent overflow-x-hidden min-h-screen px-6 sm:px-16 lg:px-24 font-sans relative">
      <div className="max-w-4xl mx-auto relative z-10 pt-48 pb-32 w-full">
        <div className="mb-24 animate-hero-reveal">
          <Link to="/" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 hover:text-neon-gold transition-colors mb-12 group">
            <ArrowLeft size={16} className="mr-3 group-hover:-translate-x-2 transition-transform" /> Back to Mainframe
          </Link>
          
          <div className="circuit-capsule mb-10 border border-neon-gold/30 bg-black/40 text-neon-gold px-10 py-3 shadow-3xl inline-flex items-center gap-4">
            <Gavel size={18} className="animate-pulse" /> 
            <span className="text-[10px] font-black uppercase tracking-[0.6em] font-mono">Operational_Protocol_ENFORCED</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-black text-white mb-6 uppercase tracking-tighter leading-[0.85] heading-wow">
            Terms of<br/><span className="text-chiseled-gold">Service.</span>
          </h1>
          <p className="text-2xl text-slate-400 font-bold leading-relaxed border-l-4 border-neon-gold/40 pl-12 italic opacity-90 mt-10">
            Legal framework governing the use of the {COMPANY_DETAILS.legalName} ecosystem and SYNK assets.
          </p>
        </div>

        <div className="space-y-12">
          <div className="orbital-tile p-12 bg-black/60 border border-white/10 shadow-[0_60px_120px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-8 mb-10 border-b border-white/5 pb-8">
              <div className="p-5 bg-royal-950 rounded-2xl border border-white/10 text-neon-gold shadow-inner">
                <Scale size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-display font-black text-white uppercase tracking-tight">1. Acceptable Use</h2>
                <p className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.5em] mt-2">Protocol: USER_ENGAGEMENT_v1</p>
              </div>
            </div>
            <p className="text-xl text-slate-400 font-bold leading-relaxed italic">
              By accessing the {COMPANY_DETAILS.name} platform, including the Intelligence Hub and SYNK Suite, you agree to utilize these structural assets solely for legitimate organizational improvement. Reverse-engineering proprietary binary logic is a critical protocol violation.
            </p>
          </div>

          <div className="orbital-tile p-12 bg-black/60 border border-white/10 shadow-[0_60px_120px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-8 mb-10 border-b border-white/5 pb-8">
              <div className="p-5 bg-royal-950 rounded-2xl border border-white/10 text-slate-500 shadow-inner">
                <ShieldAlert size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-display font-black text-white uppercase tracking-tight">2. Professional Node</h2>
                <p className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.5em] mt-2">Logic: ADVISORY_ONLY</p>
              </div>
            </div>
            <p className="text-xl text-slate-400 font-bold leading-relaxed italic">
              While our TFix Engine provides high-fidelity logic, ultimate responsibility for NDIS regulatory compliance rests with the provider. Our tools augment organizational governance.
            </p>
          </div>

          <div className="orbital-tile p-12 bg-black/60 border border-white/10 shadow-[0_60px_120px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-8 mb-10 border-b border-white/5 pb-8">
              <div className="p-5 bg-royal-950 rounded-2xl border border-white/10 text-neon-gold shadow-inner">
                <FileText size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-display font-black text-white uppercase tracking-tight">3. IP Ownership</h2>
                <p className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.5em] mt-2">Ownership: SOVEREIGN_ASSETS</p>
              </div>
            </div>
            <p className="text-xl text-slate-400 font-bold leading-relaxed italic">
              The SYNK ecosystem, source code, and structural methodologies remain the exclusive property of {COMPANY_DETAILS.legalName}.
            </p>
          </div>
        </div>

        <div className="mt-32 p-16 orbital-tile !rounded-[4rem] bg-black/80 border-2 border-neon-gold/20 text-center shadow-3xl">
           <h3 className="text-3xl font-display font-black text-white uppercase tracking-tight mb-8">Legal Query?</h3>
           <p className="text-xl text-slate-500 font-bold italic mb-12 max-w-xl mx-auto leading-relaxed">
             If you require clarification on the structural terms, contact our Legal Architect node.
           </p>
           <Link to="/contact" className="px-12 py-6 bg-black border-2 border-neon-gold text-white font-black text-[11px] tracking-[0.5em] uppercase rounded-xl hover:scale-[1.03] active:bg-neon-gold active:text-black transition-all shadow-3xl inline-flex items-center gap-6 group">
             <Zap size={20} className="text-neon-gold group-active:text-black" />
             <span>Contact Legal Node</span>
           </Link>
        </div>
        
        <div className="mt-24 text-center text-[10px] font-mono text-slate-800 uppercase tracking-[1em] font-black">
           Last Revision: 2024.Q4 // v{COMPANY_DETAILS.appVersion}
        </div>
      </div>
    </div>
  );
};

export default Terms;
