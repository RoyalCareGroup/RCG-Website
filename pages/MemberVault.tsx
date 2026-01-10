
import React from 'react';
import { Lock, FileText, BarChart, Download, ArrowLeft, ShieldCheck, Zap, Layers, Boxes, Binary } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSovereign } from '../context/SovereignContext.tsx';
import { DecodingText } from '../components/DecodingText.tsx';

const MemberVault: React.FC = () => {
  const { memberData } = useSovereign();

  const resources = [
    { 
      title: "2025 ROI Matrix", 
      type: "CALCULATOR", 
      desc: "Interactive tool to calculate revenue leakage based on current SIL utilization.",
      icon: <BarChart size={24} className="text-neon-gold" />
    },
    { 
      title: "Audit Survival Node", 
      type: "WHITEPAPER", 
      desc: "A structural guide to passing a mid-term Commission audit with zero major findings.",
      icon: <FileText size={24} className="text-neon-blue" />
    },
    { 
      title: "SYNK Deployment Blueprint", 
      type: "ARCHITECTURE", 
      desc: "Detailed technical roadmap for integrating ClaimSYNK into your existing CRM.",
      icon: <Layers size={24} className="text-neon-purple" />
    }
  ];

  return (
    <div className="flex flex-col bg-transparent overflow-x-hidden min-h-screen px-6 sm:px-16 lg:px-24 font-sans relative">
      <div className="max-w-7xl mx-auto relative z-10 pt-48 pb-32 w-full">
        
        <div className="mb-24 animate-hero-reveal">
          <div className="flex items-center justify-between mb-16">
             <div className="space-y-6">
                <div className="circuit-capsule px-6 py-2 border-neon-gold/40 bg-black text-neon-gold text-[9px] font-black uppercase tracking-[0.4em] inline-flex items-center gap-3 shadow-3xl">
                  <Lock size={14} className="animate-pulse" /> Restricted Sovereign Vault
                </div>
                <h1 className="text-5xl sm:text-7xl font-display font-black text-white uppercase tracking-tighter leading-none">
                  Strategic <br/> <span className="text-chiseled-gold">Intelligence.</span>
                </h1>
                <p className="text-xl text-slate-400 font-bold italic border-l-4 border-neon-gold pl-10">
                  "Welcome back, {memberData?.name.split(' ')[0]}. Access to your organization's private strategic nodes is now active."
                </p>
             </div>
             
             <div className="hidden lg:block">
                <div className="orbital-tile p-8 bg-black/60 border-2 border-neon-gold/20 flex flex-col items-center gap-4 text-center">
                   <div className="w-16 h-16 rounded-full bg-royal-950 border border-neon-gold/30 flex items-center justify-center">
                      <Binary className="text-neon-gold" size={24} />
                   </div>
                   <div className="space-y-1">
                      <span className="text-[10px] font-black text-white uppercase tracking-widest block">{memberData?.org}</span>
                      <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Active_Uplink_EST</span>
                   </div>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
             {resources.map((item, i) => (
               <div key={i} className="orbital-tile p-10 group hover:border-neon-gold/30 transition-all shadow-[0_40px_80px_rgba(0,0,0,0.8)] flex flex-col h-full bg-black/40">
                  <div className="flex items-center justify-between mb-8">
                     <div className="p-4 bg-royal-950 rounded-2xl border border-white/5 shadow-inner group-hover:scale-110 transition-all">
                        {item.icon}
                     </div>
                     <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest font-black">{item.type}</span>
                  </div>
                  <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight mb-4 group-hover:text-chiseled-gold transition-colors">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-bold italic opacity-80 mb-10 flex-grow">"{item.desc}"</p>
                  <button className="w-full py-5 bg-royal-950 border border-white/5 rounded-xl text-white font-black text-[10px] tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4">
                     <Download size={16} /> Access Resource
                  </button>
               </div>
             ))}
          </div>

          <div className="orbital-tile !rounded-[4rem] p-16 md:p-32 text-center relative overflow-hidden group shadow-[0_80px_160px_rgba(0,0,0,1)] bg-black/80">
             <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
             <div className="relative z-10 flex flex-col items-center space-y-12">
                <div className="circuit-capsule border border-neon-purple/30 text-neon-purple bg-black px-12 py-4 shadow-3xl">
                  <Zap size={22} className="mr-4 animate-pulse" /> Exclusive Alpha Node
                </div>
                <h2 className="text-4xl md:text-7xl font-display font-black text-white uppercase leading-[0.85] tracking-tighter">
                  ClaimSYNK v6 <br/><span className="text-chiseled-silver">Private Beta.</span>
                </h2>
                <p className="text-xl text-slate-500 font-bold italic max-w-2xl mx-auto leading-relaxed">
                  As a passport holder, you have priority access to test our upcoming neural billing engine before the public 2026 deployment.
                </p>
                <div className="flex flex-wrap justify-center gap-10 pt-10">
                  <button className="px-16 py-8 bg-white text-black font-black text-[12px] tracking-[0.6em] uppercase rounded-xl hover:bg-neon-purple hover:text-white transition-all shadow-3xl inline-flex items-center gap-8 group">
                    <Boxes size={24} className="text-neon-purple group-hover:text-white transition-colors" />
                    Request Beta Access
                  </button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberVault;
