import React, { useState, useEffect } from 'react';
import { Shield, ArrowRight, Star, Zap } from 'lucide-react';
import { DecodingText } from '../components/DecodingText.tsx';
import { Link } from 'react-router-dom';

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
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col bg-[#334155] overflow-x-hidden min-h-screen selection:bg-neon-blue/30 selection:text-white px-6 sm:px-16 lg:px-24 xl:px-32 font-sans font-bold relative">
      
      {/* --- ATMOSPHERE NODES --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[#334155]"></div>
        <div 
          className="absolute inset-0 parallax-layer opacity-[0.04]"
          style={{ 
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 2px,transparent 2px), linear-gradient(90deg,rgba(255,255,255,0.06) 2px,transparent_2px)',
            backgroundSize: '120px 120px',
            transform: `translateY(${scrollY * -0.05}px)` 
          }}
        ></div>
        <div className="absolute top-[10%] left-[-10%] w-[100%] h-[100%] bg-neon-purple/[0.08] rounded-full blur-[200px] animate-blob-drift opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-15%] w-[100%] h-[100%] bg-neon-blue/[0.08] rounded-full blur-[250px] animate-blob-drift opacity-60"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.06] mix-blend-overlay"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 pt-48 pb-32">
        <div className="mb-24 text-center animate-hero-reveal">
          <div className="circuit-capsule mb-10 border-2 border-white/80 bg-black px-12 py-5 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            <Star className="w-3.5 h-3.5 mr-3 animate-pulse text-neon-purple" /> Transformation Prototypes
          </div>
          <h1 className="text-6xl md:text-9xl font-display font-black text-white mb-10 uppercase tracking-tighter leading-[0.85] heading-wow">
            Structural<br/><span className="heading-tech">Proof.</span>
          </h1>
          <div className="max-w-3xl mx-auto banner-pop bg-black p-10 border-2 border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.8)] rounded-[3rem]">
            <DecodingText 
              text="We don't just provide consulting. We deploy the structural intelligence that powers the fastest-growing NDIS organizations in Australia."
              className="text-white text-xl md:text-2xl font-black leading-relaxed"
              stagger={8}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-16 mb-40">
          {cases.map((c, idx) => (
            <div key={idx} className="group orbital-tile relative bg-black border-2 border-white/10 overflow-hidden hover:border-white transition-all duration-1000 shadow-[0_60px_120px_rgba(0,0,0,0.8)] rounded-[3rem]">
              <div className={`absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l ${c.color} opacity-[0.02] group-hover:opacity-[0.06] transition-opacity`}></div>
              
              <div className="p-12 md:p-20 flex flex-col lg:flex-row gap-20 relative z-10">
                <div className="flex-1 space-y-12">
                  <div className="flex items-center gap-8">
                    <div className={`p-6 rounded-[2rem] bg-gradient-to-br ${c.color} shadow-3xl border-2 border-white/20`}>
                      <Shield className="text-white" size={40} />
                    </div>
                    <div>
                      <h3 className="text-4xl font-display font-black text-white uppercase tracking-tight mb-2 leading-none">{c.title}</h3>
                      <div className="text-neon-blue text-[12px] font-mono uppercase tracking-[0.5em] font-black">{c.client}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-12">
                    <div className="border-l-8 border-royal-950/20 pl-10">
                      <h4 className="text-slate-600 text-[11px] font-black uppercase tracking-[0.6em] mb-4 font-mono">The Operational Challenge</h4>
                      <p className="text-white text-xl font-black italic opacity-60 group-hover:opacity-90 transition-opacity">"{c.challenge}"</p>
                    </div>
                    <div className="border-l-8 border-neon-purple pl-10">
                      <h4 className="text-neon-purple text-[11px] font-black uppercase tracking-[0.6em] mb-4 font-mono">The SYNK Deployment</h4>
                      <p className="text-white text-2xl font-black leading-tight">{c.result}</p>
                    </div>
                  </div>
                </div>

                <div className="lg:w-[360px] flex flex-col justify-center gap-6">
                  <div className="text-[11px] font-black text-slate-700 uppercase tracking-[0.8em] mb-4 text-center font-mono">Structural Metrics</div>
                  {c.metrics.map((m, midx) => (
                    <div key={midx} className="bg-royal-950 border-2 border-white/5 p-8 rounded-[2rem] flex items-center justify-between group/metric hover:border-neon-blue transition-all shadow-inner">
                      <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest font-mono">{m.label}</span>
                      <span className={`text-4xl font-display font-black bg-clip-text text-transparent bg-gradient-to-r ${c.color} drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]`}>
                        {m.val}
                      </span>
                    </div>
                  ))}
                  <button className="slim-orbital-btn mt-6 w-full py-6 text-black bg-white font-black text-[11px] tracking-[0.6em] uppercase flex items-center justify-center group/btn active:scale-95 transition-all shadow-2xl">
                    Handover Report <ArrowRight className="ml-4 w-5 h-5 group-hover/btn:translate-x-3 transition-transform text-neon-purple" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 p-16 md:p-24 banner-pop bg-black rounded-[5rem] border-2 border-white/10 text-center relative overflow-hidden shadow-[0_60px_150px_rgba(0,0,0,0.9)]">
           <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-blue to-transparent"></div>
           <h3 className="text-5xl md:text-8xl font-display font-black text-white uppercase tracking-tighter mb-10 heading-wow">Architect Your<br/><span className="heading-tech">Success.</span></h3>
           <p className="text-white opacity-60 text-2xl font-black mb-16 max-w-2xl mx-auto leading-relaxed italic">
             "Every organization has unique slippage points. Our architects perform deep-scans to identify the exact nodes required for your scale-up."
           </p>
           <div className="flex flex-col sm:flex-row justify-center gap-8">
             <Link to="/contact" className="slim-orbital-btn px-16 py-8 text-black bg-white font-black text-[12px] tracking-[0.8em] uppercase transition-all shadow-3xl hover:scale-105 active:scale-95 flex items-center justify-center gap-4">
               Initialize Audit <Zap size={20} className="text-neon-purple" />
             </Link>
             <Link to="/tech" className="slim-orbital-btn px-16 py-8 border-2 border-white/40 text-white font-black text-[12px] tracking-[0.8em] uppercase transition-all hover:bg-white/5 flex items-center justify-center gap-4">
               Speak to Architect <ArrowRight size={20} className="text-neon-blue" />
             </Link>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;