
import React, { useState, useEffect } from 'react';
import { COMPANY_DETAILS } from '../config.ts';
import { 
  ShieldCheck, Zap, ArrowRight, ArrowLeft, 
  Terminal, Activity, Database, Users, 
  FileText, Lock, Globe, Search, Cpu,
  Heart, Building2, Workflow
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { DecodingText } from '../components/DecodingText.tsx';

const About: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const intelligenceNodes = [
    { 
      label: "Origin Node", 
      title: "Front-Line DNA", 
      desc: "We started in the living rooms and support houses. We delivered the care before we automated the systems.",
      id: "ORG_01"
    },
    { 
      label: "Strategic Node", 
      title: "The Provider Bridge", 
      desc: "We translate NDIS Policy into Binary. We build the tools we wish we had when we were scaling our own services.",
      id: "STR_04"
    },
    { 
      label: "National Node", 
      title: "Regulatory Parity", 
      desc: "Providing Tier-1 structural oversight that keeps national providers ahead of the Commission's evolving red tape.",
      id: "NAT_09"
    }
  ];

  return (
    <div className="flex flex-col bg-[#334155] overflow-x-hidden min-h-screen selection:bg-neon-blue/30 selection:text-white px-6 sm:px-16 lg:px-24 xl:px-32 font-sans font-bold relative">
      
      {/* --- ATMOSPHERE NODES --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[#334155]"></div>
        <div className="absolute top-[10%] left-[-10%] w-[100%] h-[100%] bg-neon-purple/[0.08] rounded-full blur-[200px] animate-blob-drift opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-15%] w-[100%] h-[100%] bg-neon-blue/[0.08] rounded-full blur-[250px] animate-blob-drift opacity-60"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 pt-48 pb-32">
        
        {/* Header Section: The Classified Brief */}
        <div className="mb-24 animate-hero-reveal">
          <Link to="/" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors mb-12 group">
            <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Mainframe
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div>
              <div className="circuit-capsule mb-8 border-2 border-neon-blue/40 bg-black text-neon-blue px-6 py-2 shadow-2xl inline-flex items-center gap-3">
                <Building2 size={14} className="animate-pulse" /> 
                <span className="text-[9px] font-black uppercase tracking-[0.4em]">Origin Story // Level 4 Clearance</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-display font-black text-white uppercase tracking-tighter leading-none mb-4">
                DNA & <br/><span className="text-neon-purple">Origins.</span>
              </h1>
            </div>
            <div className="lg:text-right">
              <div className="text-[10px] text-slate-500 font-black uppercase tracking-[0.6em] mb-4">Core Philosophy</div>
              <div className="text-white text-lg font-mono tracking-widest bg-black/40 p-4 rounded-xl border border-white/5 shadow-inner">
                PROVIDERS_BUILDING_FOR_PROVIDERS
              </div>
            </div>
          </div>
        </div>

        {/* The Manifesto Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32 items-stretch">
          <div className="lg:col-span-7">
            <div className="orbital-tile p-12 lg:p-20 bg-black border-2 border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col h-full">
              <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
                <Heart size={400} className="text-white" />
              </div>
              
              <div className="relative z-10 space-y-12">
                <div className="border-l-8 border-neon-blue pl-10 space-y-6">
                  <h3 className="text-4xl font-display font-black text-white uppercase tracking-tight leading-none">Experience-Led <br/>Intelligence.</h3>
                  <p className="text-xl text-slate-300 font-bold leading-relaxed italic">
                    "We identified a critical failure: most NDIS software was built by engineers who never ran a support shift. We fixed that."
                  </p>
                </div>
                
                <div className="space-y-8 text-lg font-black text-white/70 leading-relaxed max-w-2xl">
                  <p>
                    Royal Care Group transitioned from regional care delivery into structural engineering because we were tired of fighting manual red tape. We understand the weight of compliance because we've carried it.
                  </p>
                  <p>
                    Today, we empower other providers to reclaim their efficiency, identify structural revenue leakage, and deploy high-performance tech that actually understands the NDIS environment.
                  </p>
                </div>

                <div className="pt-12 border-t border-white/5 flex items-center gap-6">
                   <div className="p-4 bg-royal-950 rounded-2xl border border-neon-purple shadow-3xl animate-pulse">
                      <Workflow size={24} className="text-neon-purple" />
                   </div>
                   <div>
                      <div className="text-[10px] text-slate-600 font-black uppercase tracking-[0.4em]">Strategic Mission</div>
                      <div className="text-white text-sm font-bold uppercase tracking-widest mt-1">Eradicating Administrative Drag for Providers</div>
                   </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            {intelligenceNodes.map((node, i) => (
              <div key={i} className="orbital-tile p-10 bg-black border-2 border-white/5 hover:border-white transition-all shadow-2xl flex flex-col justify-center flex-1 group">
                 <div className="flex items-center justify-between mb-4">
                    <div className="text-[8px] font-mono text-slate-600 uppercase tracking-[0.4em]">NODE_{node.id}</div>
                    <Cpu size={16} className="text-neon-blue opacity-40 group-hover:opacity-100 transition-opacity" />
                 </div>
                 <h4 className="text-2xl font-display font-black text-white uppercase tracking-tight mb-4">{node.title}</h4>
                 <p className="text-[13px] text-slate-400 font-bold italic leading-relaxed group-hover:text-white transition-colors">
                    "{node.desc}"
                 </p>
              </div>
            ))}
          </div>
        </div>

        {/* Capabilities Grid: The "Details" */}
        <div className="mb-40">
           <div className="text-center mb-16">
              <div className="circuit-capsule px-8 py-3 bg-royal-950 border border-white/10 text-slate-500 text-[10px] font-black uppercase tracking-[0.5em] mb-6">
                 Operational Intelligence Matrix
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter">Authorized Expertise.</h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: <Database />, title: "Plan Management", desc: "Automated financial oversight for high-volume participant cohorts." },
                { icon: <Globe />, title: "Support Coordination", desc: "Network-wide logistics mapping for complex multi-state care nodes." },
                { icon: <Activity />, title: "Care Delivery Tech", desc: "Optimizing the 'Support Log' to 'Invoice' pipeline with zero human touch." },
                { icon: <Search />, title: "Structural Auditing", desc: "Pre-emptive diagnostic checks against the 2024/25 NDIS standards." },
                { icon: <Cpu />, title: "Custom OS Dev", desc: "Building the operating system your agency needs but can't find elsewhere." },
                { icon: <ShieldCheck />, title: "Governance Hub", desc: "Automating the 'Evidence' gathering process to make Audits a non-event." }
              ].map((item, i) => (
                <div key={i} className="p-10 bg-black/40 backdrop-blur-md border border-white/5 rounded-[2.5rem] group hover:bg-black hover:border-neon-blue transition-all shadow-3xl">
                   <div className="p-4 bg-royal-950 rounded-2xl border border-white/5 w-fit mb-8 group-hover:scale-110 group-hover:border-neon-blue transition-all text-neon-blue">
                      {item.icon}
                   </div>
                   <h5 className="text-white font-black uppercase text-xs tracking-[0.4em] mb-4">{item.title}</h5>
                   <p className="text-slate-500 text-[14px] font-bold italic leading-relaxed group-hover:text-slate-300 transition-colors">"{item.desc}"</p>
                </div>
              ))}
           </div>
        </div>

        {/* The Action Node */}
        <div className="banner-pop bg-black border-2 border-white/10 rounded-[5rem] p-16 md:p-32 relative overflow-hidden group shadow-[0_80px_160px_rgba(0,0,0,0.9)] text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="relative z-10 flex flex-col items-center space-y-12">
             <div className="circuit-capsule border-2 border-white/80 text-white bg-black px-10 py-4 shadow-3xl">
               <Terminal size={20} className="mr-4 animate-pulse text-neon-purple" /> Structural Deployment Uplink
             </div>
             <h2 className="text-5xl md:text-8xl font-display font-black text-white uppercase leading-[0.85] tracking-tighter">
              Stop Surviving. <br/><span className="text-neon-blue italic">Start Scaling.</span>
             </h2>
             <p className="text-2xl text-slate-100 font-bold leading-relaxed max-w-3xl italic opacity-70">
               "Talk to a team that has walked your floors and built the solutions you actually need. We bridge the gap between care and code."
             </p>
             
             <div className="flex flex-wrap justify-center gap-8 pt-10">
                <Link to="/contact" className="slim-orbital-btn px-16 py-7 text-black bg-white font-black text-[12px] tracking-[0.7em] uppercase transition-all shadow-3xl hover:scale-105 active:scale-95 flex items-center gap-4 group">
                  Initialize Provider Sync <ArrowRight size={18} className="group-hover:translate-x-3 transition-transform text-neon-purple" />
                </Link>
             </div>
          </div>
        </div>

        <div className="mt-24 text-center">
          <p className="text-[9px] font-mono text-slate-700 uppercase tracking-[1em] font-black">
            RCG_DNA_MANIFESTO // v{COMPANY_DETAILS.appVersion}
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;
