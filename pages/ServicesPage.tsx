import React, { useState, useEffect } from 'react';
import { Briefcase, TrendingUp, ShieldCheck, FileSearch, Users, Code, ArrowRight, Zap, GraduationCap, Cpu, Terminal, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DecodingText } from '../components/DecodingText.tsx';

const ServicesPage: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const businessServices = [
    {
      icon: <Terminal size={24} className="text-neon-blue" />,
      title: "Bespoke Tech Engineering",
      desc: "Custom NDIS operating systems, private CRMs, and automated billing engines architected for high-fidelity national scale."
    },
    {
      icon: <GraduationCap size={24} className="text-neon-purple" />,
      title: "National Training Protocols",
      desc: "High-performance training modules for NDIS staff and leadership. Compliance mastery and high-intensity support protocols."
    },
    {
      icon: <Database size={24} className="text-neon-blue" />,
      title: "Structural Intelligence",
      desc: "Elite consultancy re-engineering organizational workflows. Ensuring your infrastructure is audit-proof and highly efficient."
    },
    {
      icon: <TrendingUp size={24} className="text-neon-purple" />,
      title: "Acquisition & Tech Audit",
      desc: "Technical due diligence for buyers and sellers of NDIS entities. Ensuring acquired assets are structurally sound."
    },
    {
      icon: <ShieldCheck size={24} className="text-neon-blue" />,
      title: "Sovereign Compliance",
      desc: "Automated logic ensuring every line item matches national NDIS Practice Standards in real-time. Zero-compromise adherence."
    },
    {
      icon: <Code size={24} className="text-neon-purple" />,
      title: "SYNK Implementation",
      desc: "Direct deployment of the SYNK AI Ecosystem. Automate manual administrative debt and transform into a high-tech operation."
    }
  ];

  return (
    <div className="flex flex-col bg-[#334155] overflow-x-hidden min-h-screen selection:bg-neon-blue/30 selection:text-white px-4 sm:px-8 lg:px-16 xl:px-24 font-sans font-bold relative">
      
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
      
      <div className="max-w-7xl mx-auto relative z-10 pt-24 lg:pt-32 pb-16 lg:pb-24">
        <div className="text-center mb-12 lg:mb-20 banner-pop p-8 lg:p-12 bg-black shadow-[0_40px_100px_rgba(0,0,0,0.8)] border-2 border-white/10 rounded-[2rem] lg:rounded-[2.5rem]">
          <div className="circuit-capsule mb-6 lg:mb-8 shadow-[0_0_30px_rgba(255,255,255,0.05)] border-2 border-white/80 px-6 lg:px-8 py-2 lg:py-3 bg-black text-[8px]">
            <Briefcase size={14} className="mr-3 animate-pulse text-neon-blue" /> Strategic Service Nodes
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-black text-white mb-6 uppercase leading-[0.85] tracking-tighter heading-wow">
            Service<br/>
            <span className="heading-tech">Modules.</span>
          </h1>
          <div className="max-w-2xl mx-auto mt-6">
            <DecodingText 
              text="Elite Consulting • Custom Tech • National Grid"
              className="text-slate-500 text-[9px] lg:text-[11px] font-black uppercase tracking-[0.4em] lg:tracking-[0.6em] opacity-80"
              stagger={8}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {businessServices.map((service, idx) => (
            <div key={idx} className="orbital-tile group h-full bg-black border-2 border-white/10 min-h-[300px] lg:min-h-[420px] flex flex-col hover:border-white transition-all duration-700 shadow-3xl">
              <div className="p-6 lg:p-10 flex flex-col h-full relative overflow-hidden">
                <div className="mb-4 lg:mb-8 p-3 lg:p-4 bg-royal-950 border-2 border-white/5 rounded-xl w-fit group-hover:scale-110 group-hover:border-neon-blue transition-all shadow-inner">
                  {service.icon}
                </div>
                <h3 className="text-lg lg:text-xl font-display font-black text-white mb-3 uppercase tracking-tighter leading-none group-hover:text-neon-blue transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-200 text-sm lg:text-base leading-relaxed font-black mb-6 lg:mb-8 flex-grow italic opacity-70 group-hover:opacity-100 transition-opacity">
                  "{service.desc}"
                </p>
                <Link to="/contact" className="slim-orbital-btn py-3 lg:py-4 w-full flex items-center justify-center text-white font-black text-[8px] lg:text-[9px] tracking-[0.4em] uppercase border-2 border-white/80 hover:bg-white hover:text-black transition-all group/btn shadow-2xl active:scale-95">
                  <span>Initialize Query <ArrowRight size={14} className="ml-3 group-hover/btn:translate-x-1.5 transition-transform text-neon-purple" /></span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 lg:mt-24 bg-[#050505] border-2 border-white/10 p-8 lg:p-16 relative overflow-hidden group shadow-[0_80px_160px_rgba(0,0,0,0.9)] banner-pop rounded-[2rem] lg:rounded-[3rem] hover:border-white transition-all duration-1000">
           <div className="absolute top-0 right-0 p-8 lg:p-16 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-1000">
              <Cpu size={200} lg:size={300} className="text-neon-blue animate-spin-slow" />
           </div>
           <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
              <div className="max-w-xl space-y-6 lg:space-y-8">
                <div className="circuit-capsule border-2 border-neon-blue text-neon-blue bg-black px-6 py-2 text-[8px] shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                   Result Optimized
                </div>
                <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-4 uppercase leading-[0.8] tracking-tighter heading-wow">
                  Manifest<br/>
                  <span className="heading-tech">Success.</span>
                </h2>
                <p className="text-base lg:text-xl text-white font-black leading-relaxed border-l-4 border-neon-blue pl-6 italic opacity-80">
                  "Connect your organizational ecosystem to SYNK Core and eliminate administrative debt through sovereign logic."
                </p>
                <div className="pt-4">
                  <Link to="/contact" className="slim-orbital-btn inline-flex px-8 py-5 text-black bg-white font-black text-[9px] lg:text-[10px] tracking-[0.4em] uppercase transition-all shadow-3xl hover:scale-105 active:scale-95 group">
                    Execute Integration <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="w-56 h-56 lg:w-64 lg:h-64 border-4 border-dashed border-white/10 rounded-full animate-spin-slow opacity-20"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 lg:p-10 bg-black rounded-[2rem] lg:rounded-[2.5rem] border-2 border-neon-blue/40 shadow-[0_0_80px_rgba(6,182,212,0.3)] animate-float">
                  <Cpu className="text-neon-blue" size={48} lg:size={64} />
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;