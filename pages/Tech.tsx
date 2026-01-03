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
      logo: <SynkCrmLogo width={180} height={40} />, 
      desc: 'The Relational Backbone. Automated participant lifecycle mapping and predictive plan utilization analytics for large-scale operations.',
      capabilities: ['Lifecycle Engine', 'Plan Analytics', 'Sovereign CRM'],
      color: 'text-neon-blue'
    },
    { 
      id: 'claim', 
      name: 'ClaimSYNK', 
      version: 'v5.4',
      status: 'STABLE', 
      logo: <ClaimSynkLogo size={45} isStable={true} />, 
      desc: 'The Audit Engine. Eliminates rejected claims via real-time NDIS price guide parity and deep leakage identification nodes.',
      capabilities: ['Audit Logic', 'Revenue Recovery', 'Batch Sync'],
      color: 'text-neon-blue'
    },
    { 
      id: 'report', 
      name: 'ReportSYNK', 
      version: 'v2.1',
      status: 'STABLE', 
      logo: <ReportSynkLogo size={45} isStable={true} />, 
      desc: 'The Neural Documenter. Translates verbal support logs into high-compliance, audit-ready case notes using NDIS-grounded LLMs.',
      capabilities: ['Neural Voice', 'Policy Grounding', 'Auto-Notes'],
      color: 'text-neon-purple'
    },
    { 
      id: 'form', 
      name: 'FormSYNK', 
      version: 'v1.0',
      status: 'BETA', 
      logo: <FormSynkLogo size={45} isStable={false} />, 
      desc: 'The Intake Accelerator. Automated risk flagging and service agreement generation with logic-aware signing protocols.',
      capabilities: ['Risk Engine', 'Auto-Fill', 'Sovereign Intake'],
      color: 'text-neon-purple'
    },
    { 
      id: 'charge', 
      name: 'ChargeSYNK', 
      version: 'v1.0',
      status: 'PREVIEW', 
      logo: <ChargeSynkLogo size={45} isStable={true} />, 
      desc: 'The Financial Pulse. High-speed billing nodes for multi-state providers with automated payroll reconciliation and yield tracking.',
      capabilities: ['Payroll Sync', 'Multi-State Node', 'Yield Matrix'],
      color: 'text-neon-blue'
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
      
      <div className="max-w-6xl mx-auto relative z-10 pt-48 pb-32">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-28 gap-12 animate-hero-reveal">
          <div className="max-w-4xl">
            <div className="circuit-capsule mb-10 px-8 bg-black border-2 border-white/80 py-4 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
               <Boxes size={14} className="mr-4 text-neon-blue animate-pulse" /> Ecosystem Node Active
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-black text-white mb-8 uppercase leading-[0.8] tracking-tighter heading-wow">
              Suite &<br/>
              <span className="heading-tech">Systems.</span>
            </h1>
            <div className="max-w-2xl relative group banner-pop bg-black p-10 shadow-2xl border-2 border-white/10 mt-10">
              <DecodingText 
                text="Australia's unified NDIS infrastructure. Systematizing Your NDIS Knowledge (SYNK) through high-fidelity binary logic."
                className="text-xl md:text-2xl text-white font-black leading-tight tracking-wide opacity-100 italic"
                stagger={8}
              />
            </div>
          </div>
          
          <div className="hidden lg:grid grid-cols-2 gap-5">
             {[
               { label: 'Uplink Speed', val: '14.2ms', icon: <Activity className="text-neon-blue" size={18} /> },
               { label: 'Security Node', val: 'AES-256', icon: <Shield className="text-neon-purple" size={18} /> },
               { label: 'Grid Status', val: 'OPTIMAL', icon: <CheckCircle2 className="text-neon-green" size={18} /> },
               { label: 'Core Version', val: `v10.12`, icon: <Globe className="text-neon-blue" size={18} /> }
             ].map((hud, i) => (
               <div key={i} className="glass px-8 py-5 rounded-3xl border-2 border-white/10 bg-black shadow-2xl hover:border-white transition-all">
                  {hud.icon}
                  <div className="mt-4">
                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] leading-none mb-3">{hud.label}</div>
                    <div className="text-lg font-mono text-white font-black tracking-tight">{hud.val}</div>
                  </div>
               </div>
             ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-40">
          {tools.map((tool) => (
            <div key={tool.id} className="orbital-tile group relative overflow-hidden h-full flex flex-col min-h-[550px] bg-black border-2 border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
              <div className="p-12 flex flex-col h-full relative z-10">
                <div className="flex justify-between items-start mb-12">
                   <div className="flex flex-col">
                     <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.5em] mb-2 font-mono">MODULE_ID</span>
                     <span className="text-xs font-mono text-white tracking-[0.2em] font-black bg-royal-950 px-4 py-2 rounded-xl border-2 border-white/5">RC-{tool.id.toUpperCase()}</span>
                   </div>
                   <div className={`px-5 py-2 rounded-xl border-2 text-[9px] font-black tracking-[0.4em] bg-black shadow-xl ${tool.status === 'STABLE' ? 'text-neon-blue border-neon-blue/40' : 'text-neon-purple border-neon-purple/40'}`}>
                      {tool.status}
                   </div>
                </div>

                <div className="mb-10 group-hover:scale-110 transition-all duration-1000 origin-left">
                   {tool.logo}
                </div>

                <h3 className="text-3xl font-display font-black text-white uppercase tracking-tighter mb-6 group-hover:text-neon-blue transition-colors">{tool.name}</h3>
                <p className="text-white text-base leading-relaxed font-black mb-12 flex-grow italic opacity-70 group-hover:opacity-100 transition-opacity">"{tool.desc}"</p>

                <div className="space-y-4 mt-auto">
                   <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.6em] mb-4 flex items-center gap-4">
                      <Terminal size={14} className="text-neon-blue" /> System Capabilities
                   </div>
                   <div className="flex flex-wrap gap-3">
                      {tool.capabilities.map((cap, i) => (
                        <span key={i} className="px-5 py-2.5 bg-royal-950 border-2 border-white/5 rounded-2xl text-[10px] text-slate-400 font-black uppercase tracking-widest transition-all hover:border-neon-blue hover:text-white">
                          {cap}
                        </span>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="orbital-tile group relative overflow-hidden flex flex-col justify-center p-12 text-center items-center h-full min-h-[550px] border-2 border-dashed border-white/20 bg-black/40 shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
             <div className="mb-10 p-10 bg-black rounded-[3rem] border-2 border-white/10 group-hover:border-neon-blue group-hover:scale-110 transition-all shadow-3xl">
                <Code2 className="text-neon-blue" size={64} />
             </div>
             <h3 className="text-3xl font-display font-black text-white uppercase tracking-tighter mb-6">Bespoke Build.</h3>
             <p className="text-white text-base font-black mb-12 max-w-xs italic opacity-60">
                "Requirement for a private organizational OS? Our Division architects custom modules for national Tier-1 providers."
             </p>
             <Link to="/contact" className="slim-orbital-btn px-12 py-6 text-black bg-white font-black text-[11px] tracking-[0.6em] uppercase flex items-center group shadow-2xl active:scale-95">
                Initialize Build Node <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform" />
             </Link>
          </div>
        </div>

        <div className="mb-32 py-32 border-y-2 border-white/5 relative">
           <div className="text-center mb-24 relative z-10">
              <div className="circuit-capsule mb-10 border-2 border-white/80 bg-black px-12 py-4">
                <Microscope size={16} className="mr-4 text-neon-purple animate-pulse" /> Infrastructure Lab
              </div>
              <h2 className="text-6xl md:text-8xl font-display font-black text-white uppercase leading-[0.8] mb-8 tracking-tighter heading-wow">
                The<br/>
                <span className="heading-tech">Node.</span>
              </h2>
              <p className="text-slate-700 font-black text-[12px] uppercase tracking-[1.2em] opacity-60 font-mono">LOGIC_VALIDATION_MATRIX_LIVE</p>
           </div>
           
           <div className="p-1 lg:p-2 bg-gradient-to-br from-white/10 to-transparent rounded-[4rem] shadow-[0_50px_150px_rgba(0,0,0,0.8)] max-w-6xl mx-auto border-2 border-white/5">
              <div className="bg-black rounded-[3.8rem] overflow-hidden p-8">
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