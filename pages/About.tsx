import React from 'react';
import { COMPANY_DETAILS } from '../config.ts';
import { CheckCircle2, Globe, Users, ShieldCheck, Zap } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#01040f] text-slate-300 py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-neon-purple/20 bg-neon-purple/5 text-neon-purple text-[10px] font-black tracking-[0.4em] uppercase mb-8">
            <Users size={14} className="mr-3" /> Organizational DNA
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-black text-white mb-10 uppercase tracking-tighter leading-[0.85]">
            Experience-Led <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Intelligence.</span>
          </h1>
          <p className="text-2xl text-slate-400 font-light leading-relaxed border-l-4 border-royal-800 pl-8">
            Royal Care Group is a national NDIS Business Management Consultancy and Tech Division, built on a foundation of direct industry immersion.
          </p>
        </div>
        
        <div className="orbital-tile p-10 md:p-16 mb-16 shadow-2xl relative">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
            <Users size={200} />
          </div>
          <div className="orbital-content space-y-8 text-lg leading-relaxed font-light">
            <p>We identified a critical failure in the industry: most "solutions" were built by tech people who didn't understand the work. We reversed that model.</p>
            
            <p>Our team transitioned from front-line care delivery into structural engineering. We've spent years in the living rooms of participants and the boardrooms of national providers.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-10">
               {[
                 "Plan Management",
                 "Support Coordination",
                 "Allied Health & Psychology",
                 "High-Intensity Care Delivery",
                 "Direct Care Provision",
                 "Operational Auditing"
               ].map((item, i) => (
                 <div key={i} className="flex items-center space-x-4 p-4 bg-royal-950/50 border border-royal-800 rounded-2xl group hover:border-neon-blue transition-colors">
                    <CheckCircle2 className="text-neon-blue shrink-0 group-hover:scale-110 transition-transform" size={20} />
                    <span className="text-[11px] font-black text-white uppercase tracking-widest">{item}</span>
                 </div>
               ))}
            </div>

            <div className="border-l-4 border-neon-purple pl-10 py-6 bg-royal-950/40 italic text-white rounded-r-3xl shadow-inner text-xl">
              "We aren't just tech people; we are industry veterans. We've managed the plans, coordinated the supports, and delivered the care. Now, we build the architectural solutions we know the industry actually needs."
            </div>
            
            <p className="text-slate-400">
              Today, we empower NDIS providers to reclaim their efficiency, find lost revenue through auditing, and deploy high-performance staff training protocols using the SYNK Suite.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="orbital-tile p-8 group">
            <div className="orbital-content">
              <div className="p-4 bg-neon-blue/10 rounded-2xl border border-neon-blue/20 w-fit mb-6 group-hover:scale-110 transition-transform">
                <Globe className="text-neon-blue" size={24} />
              </div>
              <h4 className="text-white font-black text-xs uppercase tracking-widest mb-3">National Reach</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed font-light">Remotely accessible to every NDIS provider in Australia, from the CBD to remote communities.</p>
            </div>
          </div>
          <div className="orbital-tile p-8 group">
            <div className="orbital-content">
              <div className="p-4 bg-neon-purple/10 rounded-2xl border border-neon-purple/20 w-fit mb-6 group-hover:scale-110 transition-transform">
                <Zap className="text-neon-purple" size={24} />
              </div>
              <h4 className="text-white font-black text-xs uppercase tracking-widest mb-3">Efficiency Audits</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed font-light">Identifying structural revenue leakage and administrative debt via custom TFix diagnostics.</p>
            </div>
          </div>
          <div className="orbital-tile p-8 group">
            <div className="orbital-content">
              <div className="p-4 bg-neon-green/10 rounded-2xl border border-neon-green/20 w-fit mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="text-neon-green" size={24} />
              </div>
              <h4 className="text-white font-black text-xs uppercase tracking-widest mb-3">Compliance Hub</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed font-light">Bridging the gap between front-line care and technical regulatory precision across the NDIS grid.</p>
            </div>
          </div>
        </div>

        <div className="mt-24 p-12 glass rounded-[3rem] border border-royal-800 text-center">
          <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight mb-6">Scale Your Sovereignty.</h3>
          <p className="text-slate-500 text-sm mb-10 font-light max-w-xl mx-auto tracking-wide">
            Connect with an RCG Architect today to begin your organizational re-engineering.
          </p>
          <button className="px-12 py-5 bg-white text-black font-black text-[10px] tracking-[0.4em] uppercase rounded-2xl hover:bg-neon-blue hover:text-white transition-all">
            Initiate Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;