import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, ShieldCheck, Cpu, Network, Activity, Shield, Gauge, 
  ArrowRight, Layers, Target, GraduationCap, Microscope,
  TrendingUp, SearchCode, Command, ChevronRight, Boxes,
  Sparkles, Wrench, Users, BrainCircuit, Rocket, Calendar
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

  const capabilities = [
    {
      title: "Strategic Advisory",
      icon: <Target size={18} className="text-neon-blue" />,
      desc: "NDIS-focused consultancy for expansion, acquisition, and structural auditing.",
      link: "/consultancy"
    },
    {
      title: "Bespoke AI Forge",
      icon: <BrainCircuit size={18} className="text-neon-purple animate-pulse" />,
      desc: "Custom-engineered AI tools for providers and participants to drive accuracy.",
      link: "/tech",
      highlight: true
    },
    {
      title: "Training Protocols",
      icon: <GraduationCap size={18} className="text-neon-blue" />,
      desc: "Personalised delivery types for high-performance leadership training.",
      link: "/services"
    }
  ];

  return (
    <div className="flex flex-col bg-[#334155] overflow-x-hidden min-h-screen selection:bg-neon-blue/20 px-4 sm:px-12 lg:px-20 xl:px-24 font-sans relative">
      
      {/* --- BACKGROUND ATMOSPHERE --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[#334155]"></div>
        <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-neon-purple/[0.04] rounded-full blur-[150px] animate-blob-drift opacity-40"></div>
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[90%] h-[70%] bg-neon-blue/[0.04] rounded-full blur-[200px] animate-blob-drift opacity-40"></div>
      </div>

      {/* --- HERO SECTION (CENTERED) --- */}
      <section className="relative min-h-[75vh] flex flex-col justify-center items-center text-center pt-24 pb-12 z-10">
        <div className="max-w-6xl mx-auto w-full space-y-10 animate-hero-reveal">
          <div className="space-y-6">
            <div className="brand-heading-group cursor-default group inline-block">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-none">
                <span className="heading-specular heading-structural-test">Design. Dev.</span>
                <span className="heading-specular heading-intelligence-test">Deployment.</span>
              </h1>
            </div>

            <div className="max-w-4xl mx-auto relative group bg-black/40 backdrop-blur-xl p-8 md:p-12 border-[0.5px] border-white/10 rounded-[3rem] shadow-2xl">
              <div className="space-y-8">
                <div className="flex items-center justify-center gap-6">
                   <div className="h-[0.5px] w-8 bg-neon-blue/40"></div>
                   <span className="text-[9px] font-black uppercase tracking-[0.8em] text-neon-blue/80">Mission Manifesto</span>
                   <div className="h-[0.5px] w-8 bg-neon-blue/40"></div>
                </div>
                
                <p className="text-xl md:text-2xl lg:text-4xl text-white font-display font-black leading-[1.1] tracking-tight italic max-w-3xl mx-auto">
                  "Royal Care Group architects the unified operating system of the NDIS. We bridge the gap between human care and technical parity."
                </p>
                
                <div className="space-y-4 pt-6 border-t border-white/5 max-w-2xl mx-auto">
                  <p className="text-sm md:text-lg text-slate-200 font-bold leading-relaxed tracking-wide">
                    By integrating elite strategic design with bespoke AI development, we empower providers to transcend complexity. We exist to replace administrative debt with sovereign logic.
                  </p>
                </div>

                {/* Identity Anchor Node */}
                <div className="flex justify-center pt-2 transform scale-75 opacity-80 hover:opacity-100 hover:scale-90 transition-all duration-700">
                  <BrandLogo size="sm" />
                </div>

                <div className="pt-4 flex items-center justify-center gap-8">
                   <div className="flex gap-2">
                     <div className="w-1 h-1 rounded-full bg-neon-blue animate-pulse"></div>
                     <div className="w-1 h-1 rounded-full bg-neon-purple animate-pulse delay-75"></div>
                     <div className="w-1 h-1 rounded-full bg-neon-green animate-pulse delay-150"></div>
                   </div>
                   <span className="text-[8px] font-mono text-slate-400 uppercase tracking-[0.5em]">Established for the Grid // Custom Built for 06.06.26</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CORE PILLARS SECTION (CENTERED) --- */}
      <section className="py-8 relative z-10 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => (
            <Link 
              key={i} 
              to={cap.link}
              className={`orbital-tile p-8 bg-black/60 border-[0.5px] transition-all group flex flex-col items-center text-center h-full shadow-2xl ${cap.highlight ? 'border-neon-purple/30 ring-1 ring-neon-purple/10' : 'border-white/10 hover:border-white'}`}
            >
              <div className={`mb-6 p-4 bg-royal-950/80 rounded-xl border-[0.5px] w-fit transition-colors ${cap.highlight ? 'border-neon-purple' : 'border-white/5 group-hover:border-neon-blue'}`}>
                {cap.icon}
              </div>
              <h3 className="text-lg font-display font-black text-white uppercase tracking-tight mb-4 group-hover:text-neon-blue transition-colors">
                {cap.title}
              </h3>
              <p className="text-xs text-slate-300 font-bold leading-relaxed mb-8 flex-grow">
                "{cap.desc}"
              </p>
              <div className="flex items-center text-[8px] font-black text-slate-400 uppercase tracking-widest group-hover:text-white transition-colors">
                View Protocol <ChevronRight size={10} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* --- CUSTOM AI FORGE (CENTERED & REFINED) --- */}
      <section className="py-20 relative z-10 border-t border-white/5">
        <div className="max-w-5xl mx-auto w-full text-center space-y-12">
          <div className="space-y-6 flex flex-col items-center">
             <div className="circuit-capsule border-[0.5px] border-neon-purple/50 text-[9px] px-6 py-2 inline-flex bg-black shadow-2xl items-center gap-3">
                <Sparkles size={12} className="text-neon-purple animate-pulse" /> Bespoke Intelligence Forge
             </div>
             <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter leading-[0.9] max-w-3xl">
                We build the tools <br/><span className="text-neon-purple">no one else can.</span>
             </h2>
             <p className="text-lg md:text-xl text-slate-200 font-bold leading-relaxed italic max-w-2xl mx-auto">
                Our engineering team specializes in the architecture of NDIS-unique AI tools. We bridge the structural gap where standard software fails.
             </p>
          </div>
           
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            {[
              { title: "For Providers", desc: "Automated billing and auditing nodes.", icon: <ShieldCheck size={14} className="text-neon-blue"/> },
              { title: "For Participants", desc: "AI-driven engagement and accessibility hubs.", icon: <Users size={14} className="text-neon-purple"/> },
              { title: "For Support Teams", desc: "High-accuracy note synthesis assistants.", icon: <Activity size={14} className="text-neon-green"/> },
              { title: "Custom Ecosystems", desc: "Bespoke organizational OS for your grid.", icon: <Boxes size={14} className="text-neon-blue"/> }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-black/40 border-[0.5px] border-white/5 rounded-3xl group hover:border-white/20 transition-all flex flex-col items-center text-center shadow-inner">
                 <div className="mb-4 p-3 bg-royal-950 rounded-xl border border-white/5 group-hover:border-neon-blue transition-colors">
                    {item.icon}
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-2">{item.title}</span>
                 <p className="text-[11px] text-slate-300 font-bold leading-relaxed max-w-[240px]">"{item.desc}"</p>
              </div>
            ))}
          </div>

          <div className="relative max-w-2xl mx-auto pt-6">
             <div className="absolute -inset-4 bg-neon-purple/5 blur-[80px] rounded-full animate-pulse"></div>
             <div className="orbital-tile p-10 bg-black/80 border-[0.5px] border-neon-purple/40 relative overflow-hidden shadow-2xl">
                <div className="flex flex-col items-center text-center space-y-8">
                   <div className="w-20 h-20 rounded-full border border-dashed border-neon-purple/50 animate-spin-slow flex items-center justify-center">
                      <Cpu size={28} className="text-neon-purple/80" />
                   </div>
                   <div className="space-y-4">
                      <h3 className="text-xl font-display font-black text-white uppercase tracking-tight">The Bespoke Initiative</h3>
                      <p className="text-xs text-slate-200 font-bold max-w-sm mx-auto leading-relaxed">
                        Do you have a unique operational constraint? Our engineering team builds custom solutions for Tier-1 NDIS providers.
                      </p>
                   </div>
                   <Link to="/contact" className="slim-orbital-btn px-12 py-5 bg-white text-black font-black text-[9px] tracking-[0.4em] uppercase transition-all hover:scale-105 active:scale-95 shadow-3xl flex items-center gap-4">
                      Initialize Build <Wrench size={12} />
                   </Link>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- THE SYNK CRM ROADMAP (CENTERED CULMINATION) --- */}
      <section className="py-24 relative z-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto w-full">
           <div className="bg-gradient-to-b from-black/90 to-royal-950/40 backdrop-blur-3xl border-[0.5px] border-neon-blue/20 rounded-[4rem] p-12 lg:p-20 relative overflow-hidden shadow-2xl group flex flex-col items-center text-center">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-12 opacity-[0.02] group-hover:opacity-[0.04] transition-all duration-1000 pointer-events-none">
                <Rocket size={600} className="text-neon-blue -rotate-12" />
              </div>
              
              <div className="relative z-10 space-y-10 max-w-4xl w-full">
                 <div className="flex flex-col items-center gap-6">
                    <div className="p-3 bg-neon-blue/10 border border-neon-blue/20 rounded-xl w-fit">
                       <Calendar size={20} className="text-neon-blue" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.8em] text-neon-blue/80">The Epic Launch Roadmap</span>
                    
                    <h2 className="text-5xl md:text-7xl xl:text-8xl font-display font-black text-white uppercase tracking-tighter leading-[0.85]">
                      Unified <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-purple">SYNK OS.</span>
                    </h2>
                    
                    <p className="text-xl md:text-2xl text-slate-100 font-bold leading-relaxed italic max-w-2xl mx-auto">
                      Converging ClaimSYNK, ReportSYNK, and FormSYNK into Australia's first singular, hyper-intelligent NDIS Operating System.
                    </p>
                 </div>

                 <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 py-8 border-y border-white/5 w-full">
                    <div className="flex flex-col items-center">
                       <span className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">06.06.26</span>
                       <span className="text-[8px] text-slate-400 uppercase tracking-[0.6em] mt-3 font-mono">GRID_STABILIZATION</span>
                    </div>
                    <div className="h-10 w-[0.5px] bg-white/10 hidden md:block"></div>
                    <div className="flex flex-col items-center">
                       <span className="text-4xl md:text-5xl font-black text-neon-blue tracking-tighter uppercase">PHASE 3</span>
                       <span className="text-[8px] text-slate-400 uppercase tracking-[0.6em] mt-3 font-mono">CONVERGENCE_NODE</span>
                    </div>
                 </div>

                 <div className="w-full flex justify-center py-6">
                    <div className="scale-75 md:scale-90 lg:scale-100 transform-gpu">
                        <HeroLogoAnimation />
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
                    {[
                      { step: "01", title: "Standalone Nodes", status: "RELEASED", desc: "Foundational AI modules for documentation accuracy." },
                      { step: "02", title: "Interconnectivity", status: "ACTIVE", desc: "Bridging tools into a cohesive intelligence layer." },
                      { step: "03", title: "The SYNK OS Launch", status: "06.06.26", desc: "The final integration into Australia's AI-native CRM." }
                    ].map((phase, i) => (
                      <div key={i} className="p-8 bg-black/40 border-[0.5px] border-white/5 rounded-3xl group/node hover:border-neon-blue/40 transition-all flex flex-col">
                         <div className="flex items-center justify-between mb-4">
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest font-mono">STG_{phase.step}</span>
                            <span className={`text-[8px] font-black px-3 py-1 rounded-md ${i === 2 ? 'bg-neon-purple text-white' : 'bg-neon-blue/10 text-neon-blue border border-neon-blue/20'}`}>{phase.status}</span>
                         </div>
                         <h4 className="text-white font-black uppercase text-sm tracking-tight mb-2">{phase.title}</h4>
                         <p className="text-[10px] text-slate-300 font-bold leading-relaxed italic">"{phase.desc}"</p>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      <div className="h-12 w-full"></div>
    </div>
  );
};

export default Home;