import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Cpu, Zap, Network, ShieldCheck, Activity, 
  Database, Terminal, Shield, Workflow, Wrench, 
  ArrowRight, Gauge, Command, Layers,
  Boxes, Code2, Globe, CheckCircle2,
  AlertCircle, Layout, Plus, Minus
} from 'lucide-react';
import { TechDemo } from '../components/TechDemo.tsx';
import { SynkCrmLogo } from '../components/logos/SynkCrmLogo.tsx';
import { ClaimSynkLogo } from '../components/logos/ClaimSynkLogo.tsx';
import { ReportSynkLogo } from '../components/logos/ReportSynkLogo.tsx';
import { FormSynkLogo } from '../components/logos/FormSynkLogo.tsx';
import { ChargeSynkLogo } from '../components/logos/ChargeSynkLogo.tsx';
import { DecodingText } from '../components/DecodingText.tsx';
import { COMPANY_DETAILS } from '../config.ts';

const Tech: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tools = [
    { 
      id: 'crm', 
      name: 'SynkCRM', 
      version: 'v1.2',
      status: 'STABLE', 
      logo: <SynkCrmLogo width={140} height={32} />, 
      desc: 'The Relational Backbone. Automated participant lifecycle mapping and predictive plan utilization analytics.',
      capabilities: ['Lifecycle Engine', 'Plan Analytics', 'Sovereign CRM'],
      color: 'text-neon-blue'
    },
    { 
      id: 'claim', 
      name: 'ClaimSYNK', 
      version: 'v5.4',
      status: 'STABLE', 
      logo: <ClaimSynkLogo size={36} isStable={true} />, 
      desc: 'The Audit Engine. Eliminates rejected claims via real-time NDIS price guide parity and deep leakage nodes.',
      capabilities: ['Audit Logic', 'Revenue Recovery', 'Batch Sync'],
      color: 'text-neon-blue'
    },
    { 
      id: 'report', 
      name: 'ReportSYNK', 
      version: 'v2.1',
      status: 'STABLE', 
      logo: <ReportSynkLogo size={36} isStable={true} />, 
      desc: 'The Neural Documenter. Translates support logs into high-compliance notes using grounded LLMs.',
      capabilities: ['Neural Voice', 'Policy Grounding', 'Auto-Notes'],
      color: 'text-neon-purple'
    },
    { 
      id: 'form', 
      name: 'FormSYNK', 
      version: 'v1.0',
      status: 'BETA', 
      logo: <FormSynkLogo size={36} isStable={false} />, 
      desc: 'The Intake Accelerator. Automated risk flagging and service agreement generation.',
      capabilities: ['Risk Engine', 'Auto-Fill', 'Sovereign Intake'],
      color: 'text-neon-purple'
    },
    { 
      id: 'charge', 
      name: 'ChargeSYNK', 
      version: 'v1.0',
      status: 'PREVIEW', 
      logo: <ChargeSynkLogo size={36} isStable={true} />, 
      desc: 'The Financial Pulse. High-speed billing nodes for multi-state providers with yield tracking.',
      capabilities: ['Payroll Sync', 'Multi-State Node', 'Yield Matrix'],
      color: 'text-neon-blue'
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
      
      <div className="max-w-6xl mx-auto relative z-10 pt-24 lg:pt-32 pb-16 lg:pb-24">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-16 lg:mb-20 gap-8 animate-hero-reveal">
          <div className="max-w-4xl">
            <div className="circuit-capsule mb-6 px-6 bg-black border-2 border-white/80 py-2.5 text-[8px] shadow-[0_0_30px_rgba(255,255,255,0.1)]">
               <Boxes size={14} className="mr-3 text-neon-blue animate-pulse" /> Ecosystem Node Active
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-black text-white mb-6 uppercase leading-[0.8] tracking-tighter heading-wow">
              Suite &<br/>
              <span className="heading-tech">Systems.</span>
            </h1>
            <div className="max-w-xl relative group banner-pop bg-black p-6 lg:p-8 shadow-2xl border-2 border-white/10 mt-6">
              <DecodingText 
                text="Australia's unified NDIS infrastructure. Systematizing Your NDIS Knowledge (SYNK) through high-fidelity binary logic."
                className="text-base md:text-lg text-white font-black leading-tight tracking-wide opacity-100 italic"
                stagger={6}
              />
            </div>
          </div>
          
          <div className="hidden lg:grid grid-cols-2 gap-4">
             {[
               { label: 'Uplink', val: '14.2ms', icon: <Activity className="text-neon-blue" size={14} /> },
               { label: 'Security', val: 'AES-256', icon: <Shield className="text-neon-purple" size={14} /> },
               { label: 'Status', val: 'OPTIMAL', icon: <CheckCircle2 className="text-neon-green" size={14} /> },
               { label: 'Core', val: `v10.12`, icon: <Globe className="text-neon-blue" size={14} /> }
             ].map((hud, i) => (
               <div key={i} className="glass px-6 py-4 rounded-2xl border-2 border-white/10 bg-black shadow-2xl hover:border-white transition-all">
                  <div className="flex items-center gap-3">
                    {hud.icon}
                    <div>
                      <div className="text-[7px] font-black text-slate-500 uppercase tracking-[0.3em] mb-1">{hud.label}</div>
                      <div className="text-sm font-mono text-white font-black tracking-tight">{hud.val}</div>
                    </div>
                  </div>
               </div>
             ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-24">
          {tools.map((tool) => (
            <div key={tool.id} className="orbital-tile group relative overflow-hidden h-full flex flex-col min-h-[380px] lg:min-h-[460px] bg-black border-2 border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
              <div className="p-8 lg:p-10 flex flex-col h-full relative z-10">
                <div className="flex justify-between items-start mb-8">
                   <div className="flex flex-col">
                     <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.4em] mb-1 font-mono">MODULE_ID</span>
                     <span className="text-[10px] font-mono text-white tracking-[0.2em] font-black bg-royal-950 px-3 py-1.5 rounded-lg border-2 border-white/5">RC-{tool.id.toUpperCase()}</span>
                   </div>
                   <div className={`px-4 py-1.5 rounded-lg border-2 text-[8px] font-black tracking-[0.3em] bg-black shadow-xl ${tool.status === 'STABLE' ? 'text-neon-blue border-neon-blue/40' : 'text-neon-purple border-neon-purple/40'}`}>
                      {tool.status}
                   </div>
                </div>

                <div className="mb-6 group-hover:scale-105 transition-all duration-700 origin-left">
                   <div className="scale-90 lg:scale-100">{tool.logo}</div>
                </div>

                <h3 className="text-xl lg:text-2xl font-display font-black text-white uppercase tracking-tighter mb-4 group-hover:text-neon-blue transition-colors">{tool.name}</h3>
                <p className="text-white text-sm lg:text-base leading-relaxed font-black mb-8 flex-grow italic opacity-70 group-hover:opacity-100 transition-opacity">"{tool.desc}"</p>

                <div className="space-y-3 mt-auto">
                   <div className="flex flex-wrap gap-2">
                      {tool.capabilities.map((cap, i) => (
                        <span key={i} className="px-3 py-1.5 bg-royal-950 border-2 border-white/5 rounded-lg text-[8px] text-slate-400 font-black uppercase tracking-widest hover:border-neon-blue hover:text-white transition-all">
                          {cap}
                        </span>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="orbital-tile group relative overflow-hidden flex flex-col justify-center p-8 text-center items-center h-full min-h-[380px] lg:min-h-[460px] border-2 border-dashed border-white/20 bg-black/40 shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
             <div className="mb-6 p-6 bg-black rounded-[2rem] border-2 border-white/10 group-hover:border-neon-blue group-hover:scale-105 transition-all shadow-3xl">
                <Code2 className="text-neon-blue" size={40} />
             </div>
             <h3 className="text-xl lg:text-2xl font-display font-black text-white uppercase tracking-tighter mb-4">Bespoke Build.</h3>
             <p className="text-white text-xs lg:text-sm font-black mb-8 max-w-xs italic opacity-60">
                "Requirement for a private organizational OS? Our Division architects custom modules for national Tier-1 providers."
             </p>
             <Link to="/contact" className="slim-orbital-btn px-8 py-4 text-black bg-white font-black text-[9px] tracking-[0.5em] uppercase flex items-center group shadow-2xl active:scale-95">
                Initialize Build Node <ArrowRight className="ml-3 group-hover:translate-x-1.5 transition-transform" />
             </Link>
          </div>
        </div>

        <div className="mb-16 py-16 border-y-2 border-white/5 relative">
           <div className="text-center mb-16 relative z-10">
              <div className="circuit-capsule mb-6 border-2 border-white/80 bg-black px-10 py-3 text-[8px]">
                <Microscope size={14} className="mr-3 text-neon-purple animate-pulse" /> Infrastructure Lab
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase leading-[0.8] mb-6 tracking-tighter heading-wow">
                The<br/>
                <span className="heading-tech">Node.</span>
              </h2>
              <p className="text-slate-700 font-black text-[10px] uppercase tracking-[1em] opacity-60 font-mono">LOGIC_VALIDATION_MATRIX_LIVE</p>
           </div>
           
           <div className="p-1 bg-gradient-to-br from-white/10 to-transparent rounded-[2.5rem] shadow-[0_50px_150px_rgba(0,0,0,0.8)] max-w-5xl mx-auto border-2 border-white/5">
              <div className="bg-black rounded-[2.4rem] overflow-hidden p-6 lg:p-10">
                <TechDemo />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const Microscope = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/>
  </svg>
);

export default Tech;