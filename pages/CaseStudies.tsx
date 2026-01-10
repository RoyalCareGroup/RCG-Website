
import React from 'react';
import { Shield, ArrowRight, Star, Zap, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DecodingText } from '../components/DecodingText.tsx';
import { COMPANY_DETAILS } from '../config.ts';

const cases = [
  {
    title: "Project: Rapid Scale-Up",
    client: "NSW Regional Support Group",
    challenge: "Provider was failing to keep up with SIL documentation compliance during rapid expansion.",
    result: "Implemented SYNK Auto-Roster & ClaimSYNK. Scaled to 65 participants within 8 months with 100% audit pass.",
    metrics: [
      { label: "Admin Debt", val: "-75%" },
      { label: "Claim Recovery", val: "99.2%" },
      { label: "Audit Result", val: "100%" }
    ],
    color: "text-neon-gold"
  },
  {
    title: "Project: Compliance Recovery",
    client: "QLD Urban Care Solutions",
    challenge: "Non-compliance notice issued by Commission. High risk of registration suspension.",
    result: "Complete infrastructure overhaul. Deployed SYNK Governance layer and staff training modules.",
    metrics: [
      { label: "Risk Factor", val: "LOW" },
      { label: "Audit Re-pass", val: "VERIFIED" },
      { label: "Efficiency", val: "+40%" }
    ],
    color: "text-white"
  },
  {
    title: "Project: Tech-Native Provider",
    client: "Melbourne TechCare Start-up",
    challenge: "New provider wanting to launch as a paperless automated NDIS firm from Day 1.",
    result: "Custom integration of full SYNK suite with bespoke CRM module. 0 staff dedicated to manual billing.",
    metrics: [
      { label: "Launch Speed", val: "4 WEEKS" },
      { label: "Billing Errors", val: "0%" },
      { label: "ROI Node", val: "3.2x" }
    ],
    color: "text-neon-blue"
  }
];

const CaseStudies: React.FC = () => {
  return (
    <div className="flex flex-col bg-transparent overflow-x-hidden min-h-screen px-6 sm:px-16 lg:px-24 font-sans relative">
      <div className="max-w-7xl mx-auto relative z-10 pt-48 pb-32 w-full">
        
        <div className="mb-24 text-center animate-hero-reveal flex flex-col items-center">
          <div className="circuit-capsule border border-neon-gold/30 bg-black/40 text-neon-gold px-10 py-3 shadow-3xl mb-10 inline-flex items-center gap-4">
            <Star size={18} className="animate-pulse" /> 
            <span className="text-[10px] font-black uppercase tracking-[0.6em] font-mono">Transformation_Prototypes</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-black text-white mb-10 uppercase tracking-tighter leading-[0.8] animate-liquid-shimmer">
            <span className="text-chiseled-silver block mb-4 text-stroked-black">Structural</span> 
            <span className="text-chiseled-gold text-stroked-black">Proof.</span>
          </h1>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xl text-slate-400 font-bold leading-relaxed italic opacity-90 tracking-tight uppercase">
               <DecodingText text="Verified Organizational Overhauls // NDIS Case Studies" stagger={10} />
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 mb-32">
          {cases.map((c, idx) => (
            <div key={idx} className="group orbital-tile relative overflow-hidden bg-black/60 hover:border-neon-gold/30 transition-all duration-1000 shadow-[0_60px_120px_rgba(0,0,0,0.8)]">
              <div className="p-12 lg:p-20 flex flex-col lg:flex-row gap-16 lg:gap-24 relative z-10">
                <div className="flex-1 space-y-12">
                  <div className="flex items-center gap-10">
                    <div className="p-6 rounded-2xl bg-royal-950 border border-white/10 shadow-3xl">
                      <Shield size={48} className="text-neon-gold" />
                    </div>
                    <div>
                      <h3 className="text-4xl font-display font-black text-white uppercase tracking-tight mb-3 group-hover:text-chiseled-gold transition-colors">{c.title}</h3>
                      <div className="text-slate-600 text-[11px] font-mono uppercase tracking-[0.5em] font-black">{c.client}</div>
                    </div>
                  </div>
                  <div className="space-y-10 border-l-4 border-neon-gold/20 pl-12">
                    <p className="text-2xl text-slate-400 font-bold italic opacity-80 group-hover:opacity-100 transition-opacity">"{c.challenge}"</p>
                    <p className="text-white text-2xl font-black leading-tight uppercase tracking-tight">{c.result}</p>
                  </div>
                </div>

                <div className="lg:w-[360px] flex flex-col justify-center gap-6">
                  {c.metrics.map((m, midx) => (
                    <div key={midx} className="bg-black/60 border border-white/5 p-10 rounded-2xl flex flex-col gap-3 shadow-inner group-hover:border-neon-gold/20 transition-all">
                      <span className="text-slate-600 text-[9px] font-black uppercase tracking-[0.4em] font-mono">{m.label}</span>
                      <span className={`text-4xl font-display font-black ${c.color} tracking-tighter`}>
                        {m.val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
           <Link to="/contact" className="px-16 py-8 bg-white text-black font-black text-[12px] tracking-[0.6em] uppercase rounded-xl hover:bg-neon-gold transition-all shadow-3xl inline-flex items-center gap-8 group">
             Initialize My Transformation <ArrowRight size={24} className="group-hover:translate-x-3 transition-transform" />
           </Link>
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;
