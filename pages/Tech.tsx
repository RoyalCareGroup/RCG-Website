import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Cpu, Zap, Network, ShieldCheck, Activity, 
  Database, Terminal, Shield, Workflow, Wrench, 
  ArrowRight, Gauge, Command, Layers,
  Boxes, Code2, Globe, CheckCircle2,
  AlertCircle, Layout, Plus, Minus, Microscope
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
      logo: <SynkCrmLogo width={110} height={24} />, 
      desc: 'The Relational Backbone. Automated lifecycle mapping and utilization analytics.',
      capabilities: ['Lifecycle', 'Analytics'],
      color: 'text-neon-blue'
    },
    { 
      id: 'claim', 
      name: 'ClaimSYNK', 
      version: 'v5.4',
      status: 'STABLE', 
      logo: <ClaimSynkLogo size={28} isStable={true} />, 
      desc: 'The Audit Engine. Eliminates rejected claims via real-time price guide parity.',
      capabilities: ['Audit', 'Recovery'],
      color: 'text-neon-blue'
    },
    { 
      id: 'report', 
      name: 'ReportSYNK', 
      version: 'v2.1',
      status: 'STABLE', 
      logo: <ReportSynkLogo size={28} isStable={true} />, 
      desc: 'The Neural Documenter. Translates support logs into high-compliance notes.',
      capabilities: ['Neural Voice', 'Policy'],
      color: 'text-neon-purple'
    },
    { 
      id: 'form', 
      name: 'FormSYNK', 
      version: 'v1.0',
      status: 'BETA', 
      logo: <FormSynkLogo size={28} isStable={false} />, 
      desc: 'The Intake Accelerator. Automated risk flagging and agreement generation.',
      capabilities: ['Risk', 'Auto-Fill'],
      color: 'text-neon-purple'
    },
    { 
      id: 'charge', 
      name: 'ChargeSYNK', 
      version: 'v1.0',
      status: 'PREVIEW', 
      logo: <ChargeSynkLogo size={28} isStable={true} />, 
      desc: 'The Financial Pulse. High-speed billing nodes for multi-state providers.',
      capabilities: ['Billing', 'Yield'],
      color: 'text-neon-blue'
    }
  ];

  return (
    <div className="flex flex-col bg-transparent overflow-x-hidden min-h-screen px-4 sm:px-8 lg:px-16 font-sans font-bold relative">
      
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-50">
        <div className="absolute top-[10%] left-[-10%] w-[100%] h-[100%] bg-neon-purple/[0.08] rounded-full blur-[200px] animate-blob-drift"></div>
        <div className="absolute bottom-[-10%] right-[-15%] w-[100%] h-[100%] bg-neon-blue/[0.08] rounded-full blur-[250px] animate-blob-drift"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10 pt-24 lg:pt-32 pb-16">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-12 gap-8 animate-hero-reveal">
          <div className="max-w-3xl">
            <div className="circuit-capsule mb-4 px-6 bg-black border border-white/80 py-2.5 text-[8px] shadow-xl">
               <Boxes size={12} className="mr-3 text-neon-blue animate-pulse" /> Ecosystem Node Active
            </div>
            <div className="brand-heading-group cursor-default">
              <h1 className="text-4xl md:text-6xl font-display font-black text-white mb-4 uppercase tracking-tighter leading-none">
                Suite & <span className="text-neon-blue">Systems.</span>
              </h1>
            </div>
            <div className="max-w-lg banner-pop bg-black p-6 shadow-2xl border border-white/10 mt-4">
              <DecodingText 
                text="Unified NDIS infrastructure. Systematizing knowledge through high-fidelity logic."
                className="text-base text-white font-black leading-tight italic"
                stagger={6}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-16">
          {tools.map((tool) => (
            <div key={tool.id} className="orbital-tile group relative overflow-hidden h-full flex flex-col min-h-[280px] lg:min-h-[320px] bg-black border border-white/10 shadow-2xl">
              <div className="p-6 lg:p-8 flex flex-col h-full relative z-10">
                <div className="flex justify-between items-start mb-6">
                   <div className="flex flex-col">
                     <span className="text-[7px] text-slate-600 font-mono">RC-{tool.id.toUpperCase()}</span>
                   </div>
                   <div className={`px-3 py-1 rounded-lg border text-[7px] font-black tracking-[0.2em] bg-black ${tool.status === 'STABLE' ? 'text-neon-blue border-neon-blue/40' : 'text-neon-purple border-neon-purple/40'}`}>
                      {tool.status}
                   </div>
                </div>

                <div className="mb-4 group-hover:scale-105 transition-all duration-700 origin-left scale-90">
                   {tool.logo}
                </div>

                <h3 className="text-lg font-display font-black text-white uppercase tracking-tighter mb-2 group-hover:text-neon-blue transition-colors">{tool.name}</h3>
                <p className="text-white text-xs leading-relaxed font-black mb-6 flex-grow italic opacity-70 group-hover:opacity-100 transition-opacity">"{tool.desc}"</p>

                <div className="flex flex-wrap gap-2 mt-auto">
                   {tool.capabilities.map((cap, i) => (
                     <span key={i} className="px-2 py-1 bg-royal-950 border border-white/5 rounded-md text-[7px] text-slate-400 font-black uppercase tracking-widest">
                       {cap}
                     </span>
                   ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="py-12 border-y border-white/5 relative">
           <div className="p-1 bg-gradient-to-br from-white/10 to-transparent rounded-[1.5rem] shadow-3xl max-w-5xl mx-auto border border-white/5 overflow-hidden">
              <div className="bg-black rounded-[1.4rem] p-6 lg:p-10 scale-95 lg:scale-100">
                <TechDemo />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Tech;