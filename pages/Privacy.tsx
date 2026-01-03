import React, { useState, useEffect } from 'react';
import { Shield, Lock, Database, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY_DETAILS } from '../config.ts';

const Privacy: React.FC = () => {
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

      <div className="max-w-4xl mx-auto relative z-10 pt-48 pb-32">
        <div className="mb-16 animate-hero-reveal">
          <Link to="/" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors mb-12 group">
            <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Mainframe
          </Link>
          <div className="circuit-capsule mb-8 border-2 border-white/80 bg-black text-white px-10 py-4 shadow-2xl">
            <Shield size={14} className="mr-3" /> Data Sovereignty Protocol
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-black text-white mb-6 uppercase tracking-tighter leading-none heading-wow">Privacy<br/><span className="heading-tech">Architecture.</span></h1>
        </div>

        <div className="space-y-12">
          {[
            { icon: <ShieldCheck />, title: "Commitment Node", desc: "Protecting data in strict accordance with the Privacy Act 1988 (Cth)." },
            { icon: <Database />, title: "Data Acquisition", desc: "Collecting info necessary for elite business consultancy and high-performance tech engineering." },
            { icon: <Lock />, title: "Sovereignty & Security", desc: "AES-256 encrypted sovereign servers with multi-factor authentication." }
          ].map((item, i) => (
            <div key={i} className="orbital-tile p-12 bg-black border-2 border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.8)]">
              <div className="flex items-center gap-8 mb-8">
                <div className="p-5 bg-royal-950 rounded-2xl border-2 border-white/5 text-neon-blue shadow-inner">{item.icon}</div>
                <h2 className="text-3xl font-display font-black text-white uppercase tracking-tight">{item.title}</h2>
              </div>
              <p className="text-white text-lg font-black opacity-60 italic leading-relaxed">"{item.desc}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Privacy;