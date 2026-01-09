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
    <div className="flex flex-col bg-[#334155] overflow-x-hidden min-h-screen selection:bg-neon-blue/30 selection:text-white px-4 sm:px-8 lg:px-16 xl:px-24 font-sans font-bold relative">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[#334155]"></div>
        <div className="absolute top-[10%] left-[-10%] w-[100%] h-[100%] bg-neon-purple/[0.08] rounded-full blur-[200px] animate-blob-drift opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-15%] w-[100%] h-[100%] bg-neon-blue/[0.08] rounded-full blur-[250px] animate-blob-drift opacity-60"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 pt-24 lg:pt-32 pb-16 lg:pb-24">
        <div className="mb-12 lg:mb-16 text-center animate-hero-reveal">
          <div className="circuit-capsule mb-6 border-2 border-white/80 bg-black px-6 lg:px-8 py-3 text-[8px] shadow-2xl">
            <Star className="w-3 h-3 mr-2 animate-pulse text-neon-purple" /> Transformation Prototypes
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-black text-white mb-6 uppercase tracking-tighter leading-[0.85]">
            Structural<br/><span className="text-neon-blue">Proof.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:gap-12 mb-16 lg:mb-32">
          {cases.map((c, idx) => (
            <div key={idx} className="group orbital-tile relative bg-black border-2 border-white/10 overflow-hidden hover:border-white transition-all duration-1000 shadow-2xl rounded-[1.5rem] lg:rounded-[2rem]">
              <div className="p-6 lg:p-12 flex flex-col lg:flex-row gap-8 lg:gap-16 relative z-10">
                <div className="flex-1 space-y-8 lg:space-y-10">
                  <div className="flex items-center gap-4 lg:gap-6">
                    <div className={`p-4 lg:p-5 rounded-xl bg-gradient-to-br ${c.color} shadow-3xl`}>
                      <Shield className="text-white w-7 h-7 lg:w-9 lg:h-9" />
                    </div>
                    <div>
                      <h3 className="text-xl lg:text-3xl font-display font-black text-white uppercase tracking-tight mb-1">{c.title}</h3>
                      <div className="text-neon-blue text-[8px] lg:text-[10px] font-mono uppercase tracking-[0.4em]">{c.client}</div>
                    </div>
                  </div>
                  <div className="space-y-6 lg:space-y-8">
                    <p className="text-white text-base lg:text-lg font-black italic opacity-60">"{c.challenge}"</p>
                    <p className="text-white text-lg lg:text-xl font-black leading-tight">{c.result}</p>
                  </div>
                </div>

                <div className="lg:w-[300px] flex flex-col justify-center gap-3 lg:gap-4">
                  {c.metrics.map((m, midx) => (
                    <div key={midx} className="bg-royal-950 border-2 border-white/5 p-4 lg:p-6 rounded-xl flex items-center justify-between">
                      <span className="text-slate-500 text-[8px] font-black uppercase tracking-widest font-mono">{m.label}</span>
                      <span className={`text-xl lg:text-2xl font-display font-black bg-clip-text text-transparent bg-gradient-to-r ${c.color}`}>
                        {m.val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;