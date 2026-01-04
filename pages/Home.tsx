
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, ShieldCheck, Cpu, Network, Activity, Shield, Gauge, 
  ArrowRight, Layers, Target, GraduationCap, Microscope,
  TrendingUp, SearchCode, Command, ChevronRight, Boxes,
  Sparkles, Wrench, Users, BrainCircuit, Rocket, Calendar,
  Layout, FileSearch, Radio
} from 'lucide-react';
import { DecodingText } from '../components/DecodingText.tsx';
import { HeroLogoAnimation } from '../components/HeroLogoAnimation.tsx';
import { BrandLogo } from '../components/BrandLogo.tsx';
import { COMPANY_DETAILS } from '../config.ts';

const Home = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featurePortal = [
    {
      title: "Plan Your Future",
      subtitle: "Future-State Architect",
      icon: <Layout size={32} className="text-neon-blue" />,
      desc: "Describe your business goals and our AI will build a visual blueprint of your perfect facility.",
      path: "/architect",
      btnText: "Build Your Vision",
      accent: "border-neon-blue/20"
    },
    {
      title: "Audit Your Files",
      subtitle: "TFix Logic Sandbox",
      icon: <FileSearch size={32} className="text-neon-purple" />,
      desc: "Upload a redacted document and witness a live AI scan for compliance errors and lost revenue.",
      path: "/sandbox",
      btnText: "Initialize Scan",
      accent: "border-neon-purple/20"
    },
    {
      title: "Talk to Aurelia",
      subtitle: "Royal Neural Architect",
      icon: <Radio size={32} className="text-neon-green" />,
      desc: "Speak directly with our Sovereign AI strategist to solve complex NDIS operational problems.",
      path: "/aurelia",
      btnText: "Start Conversation",
      accent: "border-neon-green/20"
    }
  ];

  return (
    <div className="flex flex-col bg-transparent overflow-x-hidden min-h-screen selection:bg-neon-blue/20 px-4 sm:px-12 lg:px-20 xl:px-24 font-sans relative">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[85vh] flex flex-col justify-center items-center text-center pt-32 pb-24 z-10">
        <div className="max-w-6xl mx-auto w-full space-y-12 animate-hero-reveal">
          <div className="space-y-8">
            <div className="brand-heading-group cursor-default group inline-block">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl tracking-tight leading-none">
                <span className="heading-specular heading-structural-test block mb-4">Design. Dev.</span>
                <span className="heading-specular heading-intelligence-test">Deployment.</span>
              </h1>
            </div>

            <div className="max-w-4xl mx-auto relative group bg-black/60 backdrop-blur-2xl p-10 md:p-16 border-[0.5px] border-white/10 rounded-[4rem] shadow-2xl">
              <div className="space-y-10">
                <p className="text-2xl md:text-3xl lg:text-5xl text-white font-display font-black leading-tight tracking-tight italic max-w-4xl mx-auto">
                  "Royal Care Group architects the unified operating system of the NDIS."
                </p>
                
                <div className="space-y-6 pt-8 border-t border-white/5 max-w-2xl mx-auto">
                  <p className="text-lg md:text-xl text-slate-300 font-bold leading-relaxed tracking-wide">
                    We bridge the gap between human care and technical precision. Choose a command node below to begin.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURE PORTAL GRID --- */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {featurePortal.map((item, i) => (
            <Link 
              to={item.path} 
              key={i}
              className={`orbital-tile p-12 bg-black/80 border-[0.5px] ${item.accent} group hover:border-white transition-all duration-700 flex flex-col h-full shadow-[0_40px_80px_rgba(0,0,0,0.8)] rounded-[3rem]`}
            >
              <div className="mb-10 p-6 bg-royal-950/80 rounded-2xl border border-white/5 w-fit group-hover:scale-110 transition-transform shadow-inner">
                {item.icon}
              </div>
              <div className="space-y-4 mb-10 flex-grow">
                <h3 className="text-3xl font-display font-black text-white uppercase tracking-tighter leading-none group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] font-mono">
                  {item.subtitle}
                </div>
                <p className="text-slate-300 text-lg font-bold leading-relaxed italic opacity-80 group-hover:opacity-100 transition-opacity">
                  "{item.desc}"
                </p>
              </div>
              <div className="pt-8 border-t border-white/5 flex items-center justify-between group">
                <span className="text-white font-black text-[11px] uppercase tracking-[0.5em]">{item.btnText}</span>
                <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center group-hover:bg-neon-blue group-hover:text-white transition-all shadow-xl">
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* --- SECONDARY SERVICES LINK --- */}
      <section className="py-24 relative z-10 border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div className="space-y-6 flex flex-col items-center">
             <div className="circuit-capsule border-[0.5px] border-neon-purple/50 text-[9px] px-8 py-3 inline-flex bg-black shadow-2xl items-center gap-4">
                <Sparkles size={14} className="text-neon-purple animate-pulse" /> National Service Nodes
             </div>
             <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter leading-[0.9] max-w-4xl">
                We build the tools <br/><span className="text-neon-purple italic">no one else can.</span>
             </h2>
             <Link 
               to="/services" 
               className="slim-orbital-btn px-16 py-7 bg-white text-black font-black text-[12px] tracking-[0.6em] uppercase hover:scale-105 active:scale-95 shadow-3xl transition-all mt-8"
             >
                Explore All Services
             </Link>
          </div>
        </div>
      </section>

      {/* --- THE ROADMAP --- */}
      <section className="py-24 relative z-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto w-full">
           <div className="bg-gradient-to-b from-black/90 to-royal-950/40 backdrop-blur-3xl border-[0.5px] border-neon-blue/20 rounded-[4rem] p-12 lg:p-20 relative overflow-hidden shadow-2xl group flex flex-col items-center text-center">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-12 opacity-[0.02] group-hover:opacity-[0.04] transition-all duration-1000 pointer-events-none">
                <Rocket size={600} className="text-neon-blue -rotate-12" />
              </div>
              
              <div className="relative z-10 space-y-12 max-w-4xl w-full">
                 <div className="flex flex-col items-center gap-6">
                    <div className="p-4 bg-neon-blue/10 border border-neon-blue/20 rounded-xl w-fit">
                       <Calendar size={24} className="text-neon-blue" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.8em] text-neon-blue/80">The 2026 Convergence</span>
                    
                    <h2 className="text-5xl md:text-8xl font-display font-black text-white uppercase tracking-tighter leading-[0.85]">
                      Unified <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-purple">SYNK OS.</span>
                    </h2>
                 </div>

                 <div className="w-full flex justify-center py-6">
                    <div className="scale-75 md:scale-90 lg:scale-100 transform-gpu">
                        <HeroLogoAnimation />
                    </div>
                 </div>
                 
                 <Link to="/tech" className="text-slate-400 hover:text-white transition-all text-[11px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4">
                   View Tech Suite <ArrowRight size={14} />
                 </Link>
              </div>
           </div>
        </div>
      </section>

      <div className="h-24 w-full"></div>
    </div>
  );
};

export default Home;
