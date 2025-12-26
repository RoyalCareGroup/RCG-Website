
import React from 'react';
import { CheckCircle, TrendingUp, Users, Shield, ArrowRight, Star } from 'lucide-react';
import { DecodingText } from '../components/DecodingText.tsx';

const cases = [
  {
    title: "Project: Rapid Scale-Up",
    client: "NSW Regional Support Group",
    challenge: "Provider was at capacity with 15 participants and failing to keep up with SIL documentation compliance.",
    result: "Implemented SYNK Auto-Roster & ClaimSYNK. Scaled to 65 participants within 8 months with 100% audit pass.",
    metrics: [
      { label: "Admin Reduction", val: "75%" },
      { label: "Claim Recovery", val: "99.2%" },
      { label: "Audit Result", val: "100%" }
    ],
    color: "from-neon-purple to-pink-500"
  },
  {
    title: "Project: Compliance Recovery",
    client: "QLD Urban Care Solutions",
    challenge: "Non-compliance notice issued by Commission. High risk of registration suspension.",
    result: "Complete infrastructure overhaul. Deployed SYNK Governance layer and staff training modules.",
    metrics: [
      { label: "Risk Mitigation", val: "CRITICAL" },
      { label: "Audit Re-pass", val: "VERIFIED" },
      { label: "Staff Efficiency", val: "+40%" }
    ],
    color: "from-neon-blue to-indigo-600"
  },
  {
    title: "Project: Tech-Native Provider",
    client: "Melbourne TechCare Start-up",
    challenge: "New provider wanting to launch as a 'paperless' automated NDIS firm from Day 1.",
    result: "Custom integration of full SYNK suite with bespoke CRM module. 0 staff dedicated to manual billing.",
    metrics: [
      { label: "Launch Speed", val: "4 WEEKS" },
      { label: "Billing Errors", val: "0%" },
      { label: "ROI", val: "3.2x" }
    ],
    color: "from-emerald-500 to-neon-blue"
  }
];

const CaseStudies: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#020617] pt-40 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-neon-purple/30 bg-neon-purple/5 text-neon-purple text-[10px] font-black tracking-[0.4em] mb-6 uppercase">
            <Star className="w-3.5 h-3.5 mr-2 animate-pulse" /> Transformation Prototypes
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-black text-white mb-8 tracking-tighter uppercase leading-none">
            Structural<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Proof.</span>
          </h1>
          <div className="max-w-2xl mx-auto">
            <DecodingText 
              text="We don't just provide consulting. We deploy the structural intelligence that powers the fastest-growing NDIS organizations in Australia."
              className="text-slate-400 text-lg font-light leading-relaxed"
              stagger={10}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {cases.map((c, idx) => (
            <div key={idx} className="group relative bg-royal-900/40 border border-royal-700 rounded-[3rem] overflow-hidden hover:border-neon-purple/50 transition-all duration-700 shadow-2xl backdrop-blur-xl">
              <div className={`absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l ${c.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
              
              <div className="p-10 md:p-16 flex flex-col lg:flex-row gap-16 relative z-10">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${c.color} opacity-80 shadow-lg`}>
                      <Shield className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="text-3xl font-display font-black text-white uppercase tracking-tight">{c.title}</h3>
                      <div className="text-neon-blue text-[10px] font-mono mt-1 uppercase tracking-[0.3em] font-black">{c.client}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-10">
                    <div className="border-l-2 border-royal-800 pl-8">
                      <h4 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mb-3 flex items-center">
                         The Operational Challenge
                      </h4>
                      <p className="text-slate-300 leading-relaxed font-light text-lg">{c.challenge}</p>
                    </div>
                    <div className="border-l-2 border-neon-purple pl-8">
                      <h4 className="text-neon-purple text-[10px] font-black uppercase tracking-[0.4em] mb-3 flex items-center">
                         The SYNK Deployment
                      </h4>
                      <p className="text-slate-100 leading-relaxed font-light text-lg">{c.result}</p>
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/3 flex flex-col justify-center gap-4">
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-2 text-center">Structural Metrics</div>
                  {c.metrics.map((m, midx) => (
                    <div key={midx} className="bg-royal-950/80 border border-royal-800 p-8 rounded-3xl flex items-center justify-between group/metric hover:border-neon-blue transition-all shadow-xl">
                      <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{m.label}</span>
                      <span className={`text-3xl font-display font-black bg-clip-text text-transparent bg-gradient-to-r ${c.color} drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]`}>
                        {m.val}
                      </span>
                    </div>
                  ))}
                  <button className="mt-6 w-full py-6 bg-white text-black font-black text-[11px] tracking-[0.4em] uppercase rounded-2xl hover:bg-neon-blue hover:text-white transition-all flex items-center justify-center group/btn shadow-xl">
                    View Handover Report <ArrowRight className="ml-3 w-5 h-5 group-hover/btn:translate-x-3 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 p-16 glass rounded-[4rem] border border-royal-800 text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-blue animate-pulse"></div>
           <h3 className="text-4xl font-display font-black text-white uppercase tracking-tighter mb-8">Architect Your Success.</h3>
           <p className="text-slate-400 text-lg font-light mb-12 max-w-2xl mx-auto leading-relaxed">
             Every organization has unique slippage points. Our architects perform deep-scans to identify the exact nodes required for your scale-up.
           </p>
           <div className="flex flex-col sm:flex-row justify-center gap-6">
             <button className="px-12 py-6 bg-neon-purple text-white font-black text-[10px] tracking-[0.5em] uppercase rounded-2xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(217,70,239,0.3)]">
               Initialize Audit
             </button>
             <button className="px-12 py-6 border-2 border-royal-700 text-white font-black text-[10px] tracking-[0.5em] uppercase rounded-2xl hover:border-neon-blue transition-all">
               Speak to Architect
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;
