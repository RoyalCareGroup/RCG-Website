
import React from 'react';
import { Shield, Lock, Database, ShieldCheck, ArrowLeft, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY_DETAILS } from '../config.ts';

const Privacy: React.FC = () => {
  return (
    <div className="flex flex-col bg-transparent overflow-x-hidden min-h-screen px-6 sm:px-16 lg:px-24 font-sans relative">
      <div className="max-w-4xl mx-auto relative z-10 pt-48 pb-32 w-full">
        <div className="mb-24 animate-hero-reveal">
          <Link to="/" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 hover:text-neon-gold transition-colors mb-12 group">
            <ArrowLeft size={16} className="mr-3 group-hover:-translate-x-2 transition-transform" /> Back to Mainframe
          </Link>
          <div className="circuit-capsule mb-10 border border-neon-gold/30 bg-black/40 text-neon-gold px-10 py-3 shadow-3xl inline-flex items-center gap-4">
            <Shield size={18} className="animate-pulse" /> 
            <span className="text-[10px] font-black uppercase tracking-[0.6em] font-mono">Data_Sovereignty_Protocol</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-black text-white mb-6 uppercase tracking-tighter leading-[0.85] animate-liquid-shimmer">
            <span className="text-chiseled-silver block mb-4 text-stroked-black">Privacy</span> 
            <span className="text-chiseled-gold text-stroked-black">Architecture.</span>
          </h1>
        </div>

        <div className="space-y-12">
          {[
            { icon: <ShieldCheck size={28} className="text-neon-gold" />, title: "Commitment Node", desc: "Protecting organizational and personal data in strict accordance with the Privacy Act 1988 (Cth)." },
            { icon: <Database size={28} className="text-slate-500" />, title: "Data Acquisition", desc: "Collecting info necessary for elite business consultancy and high-performance tech engineering." },
            { icon: <Lock size={28} className="text-neon-gold" />, title: "Sovereignty & Security", desc: "AES-256 encrypted sovereign servers with multi-factor hardware authentication nodes." }
          ].map((item, i) => (
            <div key={i} className="orbital-tile p-12 bg-black/60 border-2 border-white/10 shadow-[0_40px_100px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-10 mb-10 border-b border-white/5 pb-8">
                <div className="p-6 bg-royal-950 rounded-2xl border border-white/10 shadow-inner">{item.icon}</div>
                <h2 className="text-3xl font-display font-black text-white uppercase tracking-tight">{item.title}</h2>
              </div>
              <p className="text-xl text-slate-400 font-bold leading-relaxed italic opacity-90">"{item.desc}"</p>
            </div>
          ))}
        </div>
        
        <div className="mt-24 p-16 orbital-tile !rounded-[3rem] bg-black border border-white/5 text-center shadow-3xl">
           <Terminal size={32} className="text-slate-700 mx-auto mb-8" />
           <p className="text-slate-500 text-sm font-black uppercase tracking-[0.8em]">RCG_GRID_ESTABLISHED_2025</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
