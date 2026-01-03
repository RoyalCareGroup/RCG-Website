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
      icon: <Terminal size={28} className="text-neon-blue" />,
      title: "Bespoke Tech Engineering",
      desc: "Custom NDIS operating systems, private CRMs, and automated billing engines architected for high-fidelity national scale."
    },
    {
      icon: <GraduationCap size={28} className="text-neon-purple" />,
      title: "National Training Protocols",
      desc: "High-performance training modules for NDIS staff and leadership. Compliance mastery and high-intensity support protocols."
    },
    {
      icon: <Database size={28} className="text-neon-blue" />,
      title: "Structural Intelligence",
      desc: "Elite consultancy re-engineering organizational workflows. Ensuring your infrastructure is audit-proof and highly efficient."
    },
    {
      icon: <TrendingUp size={28} className="text-neon-purple" />,
      title: "Acquisition & Tech Audit",
      desc: "Technical due diligence for buyers and sellers of NDIS entities. Ensuring acquired assets are structurally sound."
    },
    {
      icon: <ShieldCheck size={28} className="text-neon-blue" />,
      title: "Sovereign Compliance",
      desc: "Automated logic ensuring every line item matches national NDIS Practice Standards in real-time. Zero-compromise adherence."
    },
    {
      icon: <Code size={28} className="text-neon-purple" />,
      title: "SYNK Implementation",
      desc: "Direct deployment of the SYNK AI Ecosystem. Automate manual administrative debt and transform into a high-tech operation."
    }
  ];

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
      
      <div className="max-w-7xl mx-auto relative z-10 pt-48 pb-32">
        <div className="text-center mb-32 animate-hero-reveal banner-pop p-20 bg-black shadow-[0_40px_100px_rgba(0,0,0,0.8)] border-2 border-white/10 rounded-[3rem]">
          <div className="circuit-capsule mb-12 shadow-[0_0_30px_rgba(255,255,255,0.05)] border-2 border-white/80 px-10 py-4 bg-black">
            <Briefcase size={16} className="mr-4 animate-pulse text-neon-blue" /> Strategic Service Nodes
          </div>
          <h1 className="text-6xl md:text-9xl font-display font-black text-white mb-10 uppercase leading-[0.85] tracking-tighter heading-wow">
            Service<br/>
            <span className="heading-tech">Modules.</span>
          </h1>
          <div className="max-w-3xl mx-auto mt-12">
            <DecodingText 
              text="Elite Consulting • Custom Tech • National Grid"
              className="text-slate-500 text-[14px] font-black uppercase tracking-[1em] opacity-80"
              stagger={10}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {businessServices.map((service, idx) => (
            <div key={idx} className="orbital-tile group h-full bg-black border-2 border-white/10 min-h-[520px] flex flex-col hover:border-white transition-all duration-700 shadow-[0_40px_80px_rgba(0,0,0,0.8)]">
              <div className="p-12 flex flex-col h-full relative overflow-hidden">
                <div className="mb-10 p-6 bg-royal-950 border-2 border-white/5 rounded-2xl w-fit group-hover:scale-110 group-hover:border-neon-blue transition-all shadow-inner">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-display font-black text-white mb-6 uppercase tracking-tighter leading-none group-hover:text-neon-blue transition-colors">
                  {service.title}
                </h3>
                <p className="text-white text-lg leading-relaxed font-black mb-12 flex-grow italic opacity-70 group-hover:opacity-100 transition-opacity">
                  "{service.desc}"
                </p>
                <Link to="/contact" className="slim-orbital-btn py-6 w-full flex items-center justify-center text-white font-black text-[11px] tracking-[0.5em] uppercase border-2 border-white/80 hover:bg-white hover:text-black transition-all group/btn shadow-2xl active:scale-95">
                  <span>Initialize Query <ArrowRight size={18} className="ml-4 group-hover/btn:translate-x-2 transition-transform text-neon-purple" /></span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-48 bg-[#050505] border-2 border-white/10 p-16 md:p-24 relative overflow-hidden group shadow-[0_80px_160px_rgba(0,0,0,0.9)] banner-pop rounded-[4rem] hover:border-white transition-all duration-1000">
           <div className="absolute top-0 right-0 p-24 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-1000">
              <Cpu size={400} className="text-neon-blue animate-spin-slow" />
           </div>
           <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-20">
              <div className="max-w-2xl space-y-12">
                <div className="circuit-capsule border-2 border-neon-blue text-neon-blue bg-black px-10 py-4 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                   Structural Result Optimized
                </div>
                <h2 className="text-5xl md:text-8xl font-display font-black text-white mb-10 uppercase leading-[0.8] tracking-tighter heading-wow">
                  Manifest<br/>
                  <span className="heading-tech">Success.</span>
                </h2>
                <p className="text-2xl text-white font-black leading-relaxed border-l-8 border-neon-blue pl-12 italic opacity-80">
                  "Connect your organizational ecosystem to SYNK Core and eliminate administrative debt through sovereign logic."
                </p>
                <div className="pt-8">
                  <Link to="/contact" className="slim-orbital-btn inline-flex px-16 py-8 text-black bg-white font-black text-[12px] tracking-[0.6em] uppercase transition-all shadow-3xl hover:scale-105 active:scale-95 group">
                    Execute Integration <ArrowRight className="ml-4 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="w-80 h-80 border-4 border-dashed border-white/10 rounded-full animate-spin-slow opacity-20"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-14 bg-black rounded-[3.5rem] border-2 border-neon-blue/40 shadow-[0_0_80px_rgba(6,182,212,0.3)] animate-float">
                  <Cpu className="text-neon-blue" size={96} />
                </div>
              </div>
           </div>
        </div>
      </div>

      <div className="mt-48 text-center border-t-2 border-white/5 pt-24">
        <p className="text-slate-200 text-[12px] font-mono uppercase tracking-[1.5em] font-black opacity-30">
          Service Transmission Complete // AU_NATIONAL_GRID // v10.12.0
        </p>
      </div>
    </div>
  );
};

export default ServicesPage;