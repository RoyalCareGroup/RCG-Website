import React from 'react';
import { Briefcase, TrendingUp, ShieldCheck, FileSearch, Users, Code, ArrowRight, Zap, GraduationCap, Cpu, Terminal, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesPage: React.FC = () => {
  const businessServices = [
    {
      icon: <Terminal size={32} className="text-neon-blue" />,
      title: "Bespoke Tech Engineering",
      desc: "Custom NDIS operating systems, private CRMs, and automated billing engines architected for high-fidelity national scale."
    },
    {
      icon: <GraduationCap size={32} className="text-neon-purple" />,
      title: "National Training Protocols",
      desc: "High-performance training modules for NDIS staff and leadership. Compliance mastery and high-intensity support protocols."
    },
    {
      icon: <Database size={32} className="text-neon-blue" />,
      title: "Structural Intelligence",
      desc: "Elite consultancy re-engineering organizational workflows. Ensuring your infrastructure is audit-proof and highly efficient."
    },
    {
      icon: <TrendingUp size={32} className="text-neon-purple" />,
      title: "Acquisition & Tech Audit",
      desc: "Technical due diligence for buyers and sellers of NDIS entities. Ensuring acquired assets are structurally sound."
    },
    {
      icon: <ShieldCheck size={32} className="text-neon-blue" />,
      title: "Sovereign Compliance",
      desc: "Automated logic ensuring every line item matches national NDIS Practice Standards in real-time. Zero-compromise adherence."
    },
    {
      icon: <Code size={32} className="text-neon-purple" />,
      title: "SYNK Implementation",
      desc: "Direct deployment of the SYNK AI Ecosystem. Automate manual administrative debt and transform into a high-tech operation."
    }
  ];

  return (
    <div className="min-h-screen bg-royal-950 pt-48 pb-32 relative overflow-hidden">
      {/* Cinematic Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-neon-blue/5 blur-[200px] pointer-events-none opacity-40"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-32 animate-fade-in">
          <div className="inline-flex items-center px-5 py-2 rounded-full border border-neon-blue/30 bg-neon-blue/10 text-neon-blue text-[10px] font-black tracking-[0.6em] uppercase mb-10 shadow-2xl">
            <Briefcase size={16} className="mr-4 animate-pulse" /> Strategic Service Nodes
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-10 uppercase tracking-tighter leading-[0.9] text-spotlight">
            Service<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-purple drop-shadow-[0_0_35px_rgba(6,182,212,0.4)]">Modules.</span>
          </h1>
          <p className="text-slate-500 text-[12px] font-black uppercase tracking-[1em] opacity-60">Elite Consulting • Custom Tech • National Grid</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {businessServices.map((service, idx) => (
            <div key={idx} className="orbital-tile group h-full bg-royal-900/40 border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.4)] min-h-[500px] flex flex-col">
              <div className="p-12 flex flex-col h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-neon-blue/5 to-transparent pointer-events-none"></div>
                <div className="mb-10 p-5 bg-royal-950 border border-royal-800 rounded-2xl w-fit group-hover:scale-110 group-hover:border-neon-blue transition-all shadow-3xl">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-6 font-display uppercase tracking-tight leading-tight group-hover:text-neon-blue transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-300 text-base leading-relaxed font-light mb-12 flex-grow italic">
                  "{service.desc}"
                </p>
                <Link to="/contact" className="slim-orbital-btn py-5 w-full flex items-center justify-center text-white font-black text-[11px] tracking-[0.5em] uppercase hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                  <span>Initialize Query <ArrowRight size={18} className="ml-4 group-hover:translate-x-2 transition-transform text-neon-purple" /></span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Elevated Scale Section */}
        <div className="mt-48 bg-royal-900/50 border border-white/10 rounded-[4rem] p-16 md:p-24 relative overflow-hidden group shadow-[0_60px_120px_rgba(0,0,0,0.6)]">
           <div className="absolute top-0 right-0 p-32 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-1000">
              <Cpu size={400} className="text-neon-blue animate-spin-slow" />
           </div>
           <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-20">
              <div className="max-w-2xl space-y-10">
                <div className="inline-flex items-center px-6 py-2.5 rounded-2xl bg-neon-blue/10 border border-neon-blue/30 text-neon-blue text-[11px] font-black tracking-[0.6em] uppercase shadow-xl animate-pulse">
                  Ready for Structural Scale?
                </div>
                <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-8 uppercase tracking-tighter leading-[1] text-spotlight">Manifest Result.</h2>
                <p className="text-xl text-slate-300 font-light leading-relaxed border-l-4 border-neon-blue pl-10 italic">
                  "Connect your organizational ecosystem to SYNK Core and eliminate administrative debt through sovereign logic."
                </p>
                <div className="pt-6">
                  <Link to="/contact" className="inline-block px-12 py-6 bg-neon-purple text-white font-black text-[12px] tracking-[0.8em] uppercase rounded-2xl hover:scale-105 transition-all shadow-[0_25px_60px_rgba(217,70,239,0.3)] hover:bg-neon-blue">
                    Execute Integration
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="w-56 h-56 md:w-72 md:h-72 border-8 border-dashed border-neon-blue rounded-[3rem] animate-spin-slow opacity-15"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-12 bg-royal-950 rounded-[2.5rem] border-4 border-neon-blue/40 shadow-[0_0_80px_rgba(6,182,212,0.3)] animate-float">
                  <Cpu className="text-neon-blue" size={80} />
                </div>
              </div>
           </div>
        </div>
      </div>

      <div className="mt-40 text-center">
        <p className="text-slate-700 text-[11px] font-mono uppercase tracking-[1.5em] font-black border-t border-white/5 pt-20">
          Service Transmission Complete // AU_NATIONAL_GRID // v10.9.0
        </p>
      </div>
    </div>
  );
};

export default ServicesPage;