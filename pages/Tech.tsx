import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Cpu, Zap, Network, ShieldCheck, Activity, 
  Database, Terminal, Shield, Workflow, Wrench, 
  ArrowRight, Gauge, Command, Layers,
  Boxes, Code2, Globe, Search, CheckCircle2,
  AlertCircle, Layout, Plus, Minus
} from 'lucide-react';
import { TechDemo } from '../components/TechDemo.tsx';
import { SynkCrmLogo } from '../components/logos/SynkCrmLogo.tsx';
import { ClaimSynkLogo } from '../components/logos/ClaimSynkLogo.tsx';
import { ReportSynkLogo } from '../components/logos/ReportSynkLogo.tsx';
import { FormSynkLogo } from '../components/logos/FormSynkLogo.tsx';
import { ChargeSynkLogo } from '../components/logos/ChargeSynkLogo.tsx';

const Tech: React.FC = () => {
  const [activeMatrix, setActiveMatrix] = useState<string | null>('compliance');

  const tools = [
    { 
      id: 'crm', 
      name: 'SynkCRM', 
      version: 'v1.2',
      status: 'STABLE', 
      logo: <SynkCrmLogo width={180} height={40} />, 
      desc: 'The Relational Backbone. Automated participant lifecycle mapping and predictive plan utilization analytics.',
      capabilities: ['Lifecycle Engine', 'Plan Analytics', 'Sovereign CRM'],
      color: 'text-neon-blue'
    },
    { 
      id: 'claim', 
      name: 'ClaimSYNK', 
      version: 'v5.4',
      status: 'STABLE', 
      logo: <ClaimSynkLogo size={48} isStable={true} />, 
      desc: 'The Audit Engine. Eliminates rejected claims via real-time NDIS price guide parity and leakage identification.',
      capabilities: ['Audit Logic', 'Revenue Recovery', 'Batch Sync'],
      color: 'text-neon-blue'
    },
    { 
      id: 'report', 
      name: 'ReportSYNK', 
      version: 'v2.1',
      status: 'STABLE', 
      logo: <ReportSynkLogo size={48} isStable={true} />, 
      desc: 'The Neural Documenter. Translates verbal support logs into high-compliance, audit-ready case notes.',
      capabilities: ['Neural Voice', 'Policy Grounding', 'Auto-Notes'],
      color: 'text-neon-purple'
    },
    { 
      id: 'form', 
      name: 'FormSYNK', 
      version: 'v1.0',
      status: 'BETA', 
      logo: <FormSynkLogo size={48} isStable={false} />, 
      desc: 'The Intake Accelerator. Automated risk flagging and service agreement generation with logic-aware signing.',
      capabilities: ['Risk Engine', 'Auto-Fill', 'Sovereign Intake'],
      color: 'text-neon-purple'
    },
    { 
      id: 'charge', 
      name: 'ChargeSYNK', 
      version: 'v1.0',
      status: 'PREVIEW', 
      logo: <ChargeSynkLogo size={48} isStable={true} />, 
      desc: 'The Financial Pulse. High-speed billing nodes for multi-state providers with automated payroll reconciliation.',
      capabilities: ['Payroll Sync', 'Multi-State Node', 'Yield Matrix'],
      color: 'text-neon-blue'
    }
  ];

  return (
    <div className="min-h-screen bg-[#01040f] pt-48 pb-32 relative overflow-x-hidden">
      {/* Background Ambience Node */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1200px] bg-neon-blue/5 blur-[160px] pointer-events-none opacity-40"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Tech Header Protocol */}
        <div className="flex flex-col lg:flex-row items-end justify-between mb-32 gap-12 animate-fade-in">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-neon-blue/30 bg-neon-blue/10 text-neon-blue text-[9px] font-black tracking-[0.5em] mb-10 uppercase">
               <Boxes size={14} className="mr-3 animate-pulse" /> SYNK Ecosystem v9.9.5
            </div>
            <h1 className="text-6xl md:text-9xl font-display font-black text-white mb-10 uppercase tracking-tighter leading-[0.85] text-spotlight">
              Tech &<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-pink-500">Tools.</span>
            </h1>
            <p className="text-2xl text-slate-400 font-light leading-relaxed border-l-4 border-royal-800 pl-10">
              A unified NDIS infrastructure. We translate complex regulation into binary logic, eliminating administrative debt through sovereign engineering.
            </p>
          </div>
          
          <div className="hidden lg:grid grid-cols-2 gap-4">
             {[
               { label: 'Uplink Speed', val: '14.2ms', icon: <Activity className="text-neon-blue" /> },
               { label: 'Security Layer', val: 'AES-256', icon: <Shield className="text-neon-purple" /> },
               { label: 'Node Status', val: 'OPTIMAL', icon: <CheckCircle2 className="text-green-500" /> },
               { label: 'Registry Sync', val: 'v5.4', icon: <Globe className="text-neon-blue" /> }
             ].map((hud, i) => (
               <div key={i} className="glass px-6 py-4 rounded-2xl border border-white/5 bg-royal-900/40 flex items-center gap-4">
                  {hud.icon}
                  <div>
                    <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">{hud.label}</div>
                    <div className="text-sm font-mono text-white font-bold">{hud.val}</div>
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* The SYNK Tool Suite Chassis Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-48">
          {tools.map((tool) => (
            <div key={tool.id} className="orbital-tile group bg-royal-950/40 border-white/5 relative overflow-hidden h-full flex flex-col">
              <div className="p-10 flex flex-col h-full relative z-10">
                <div className="flex justify-between items-start mb-12">
                   <div className="flex flex-col">
                     <span className="text-[8px] font-mono text-slate-600 uppercase tracking-[0.4em] mb-1">MODULE_ID</span>
                     <span className="text-[11px] font-mono text-white tracking-widest font-bold">RC-{tool.id.toUpperCase()}-X{tool.version.replace('v', '')}</span>
                   </div>
                   <div className={`px-4 py-1.5 rounded-lg border text-[9px] font-black tracking-[0.3em] bg-black/60 shadow-xl ${tool.status === 'STABLE' ? 'text-neon-blue border-neon-blue/30' : 'text-neon-purple border-neon-purple/30'}`}>
                      {tool.status}
                   </div>
                </div>

                <div className="mb-10 group-hover:scale-105 transition-transform duration-700 origin-left drop-shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                   {tool.logo}
                </div>

                <h3 className="text-3xl font-display font-black text-white uppercase tracking-tighter mb-6">{tool.name}</h3>
                <p className="text-slate-400 text-base leading-relaxed font-light mb-12 flex-grow">{tool.desc}</p>

                <div className="space-y-3 mt-auto">
                   <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Terminal size={12} className="text-neon-blue" /> Integrated Capabilities
                   </div>
                   <div className="flex flex-wrap gap-2">
                      {tool.capabilities.map((cap, i) => (
                        <span key={i} className="px-3 py-1.5 bg-royal-900 border border-royal-800 rounded-lg text-[9px] text-slate-400 font-bold uppercase tracking-widest group-hover:border-neon-blue/30 transition-colors">
                          {cap}
                        </span>
                      ))}
                   </div>
                </div>
              </div>
              <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent ${tool.id === 'crm' || tool.id === 'claim' ? 'via-neon-blue' : 'via-neon-purple'} to-transparent opacity-30`}></div>
            </div>
          ))}
          
          {/* Custom Engineering Request Chassis */}
          <div className="orbital-tile group bg-neon-blue/5 border-neon-blue/20 relative overflow-hidden flex flex-col justify-center p-12 text-center items-center h-full">
             <div className="mb-8 p-6 bg-royal-950 rounded-full border border-neon-blue/30 group-hover:scale-110 transition-transform shadow-[0_0_40px_rgba(6,182,212,0.1)]">
                <Code2 className="text-neon-blue" size={48} />
             </div>
             <h3 className="text-3xl font-display font-black text-white uppercase tracking-tight mb-4">Custom Build?</h3>
             <p className="text-slate-400 text-sm leading-relaxed font-light mb-10 max-w-xs">
                Need a bespoke organizational OS? Our Tech Division architects custom modules for national providers.
             </p>
             <Link to="/contact" className="px-10 py-5 bg-white text-black font-black text-[10px] tracking-[0.5em] uppercase rounded-xl hover:bg-neon-blue hover:text-white transition-all shadow-xl">
                Initialize Build Query
             </Link>
          </div>
        </div>

        {/* Live Utility Lab: TechDemo Integration */}
        <div className="mb-48">
           <div className="text-center mb-20">
              <div className="inline-flex items-center px-4 py-1.5 rounded-xl bg-neon-blue/5 border border-neon-blue/20 text-neon-blue text-[9px] font-black tracking-widest uppercase mb-8">
                <Terminal size={14} className="mr-3" /> Live Logic Utility
              </div>
              <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter leading-none mb-6">The Lab.</h2>
              <p className="text-slate-500 font-black text-[11px] uppercase tracking-[0.6em]">Real-time NDIS Price Guide Validation Logic</p>
           </div>
           
           <div className="p-1 lg:p-1.5 bg-gradient-to-br from-royal-800 to-royal-900 rounded-[4rem] shadow-3xl">
              <div className="bg-[#01040f] rounded-[3.8rem] overflow-hidden">
                <TechDemo />
              </div>
           </div>
        </div>

        {/* Interactive Capability Matrix */}
        <div className="bg-royal-900/30 border border-white/5 rounded-[5rem] p-16 md:p-24 relative overflow-hidden group mb-48 shadow-2xl">
          <div className="absolute top-0 right-0 p-24 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
            <Layers size={400} className="text-neon-purple animate-spin-slow" />
          </div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-5 space-y-12">
               <div>
                  <h2 className="text-5xl md:text-8xl font-display font-black text-white uppercase tracking-tighter leading-[0.9] mb-8 text-spotlight">
                    Logic<br/>Mapping.
                  </h2>
                  <p className="text-xl text-slate-400 leading-relaxed font-light border-l-4 border-neon-purple pl-10">
                    Select a core organizational deficit to view the RCG structural solution nodes.
                  </p>
               </div>
               
               <div className="space-y-4">
                  {[
                    { id: 'compliance', label: 'Compliance Slippage', desc: 'Manual logs failing Commission standards.' },
                    { id: 'leakage', label: 'Revenue Leakage', desc: 'Missing billable items in support cycles.' },
                    { id: 'debt', label: 'Admin Debt', desc: 'Staff bogged down in manual paperwork.' }
                  ].map(matrix => (
                    <button
                      key={matrix.id}
                      onClick={() => setActiveMatrix(matrix.id)}
                      className={`w-full p-8 rounded-[2rem] border text-left transition-all duration-500 group/btn ${
                        activeMatrix === matrix.id 
                          ? 'bg-neon-purple/15 border-neon-purple/50 shadow-[0_0_40px_rgba(217,70,239,0.1)]' 
                          : 'bg-royal-950/60 border-white/5 hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[12px] font-black uppercase tracking-[0.4em] ${activeMatrix === matrix.id ? 'text-white' : 'text-slate-500'}`}>{matrix.label}</span>
                        {activeMatrix === matrix.id ? <Minus size={16} className="text-neon-purple" /> : <Plus size={16} className="text-slate-700" />}
                      </div>
                      <p className={`text-[11px] leading-relaxed font-light ${activeMatrix === matrix.id ? 'text-slate-300' : 'text-slate-700'}`}>{matrix.desc}</p>
                    </button>
                  ))}
               </div>
            </div>
            
            <div className="lg:col-span-7 flex items-center justify-center">
               <div className="w-full glass border border-royal-800 rounded-[3rem] p-12 relative min-h-[450px] flex flex-col items-center justify-center text-center">
                  {activeMatrix === 'compliance' && (
                    <div className="space-y-10 animate-in fade-in zoom-in duration-700">
                       <div className="flex justify-center gap-6">
                          <ReportSynkLogo size={100} isStable={true} />
                          <div className="h-24 w-px bg-royal-800 self-center opacity-30"></div>
                          <FormSynkLogo size={100} isStable={false} />
                       </div>
                       <h4 className="text-3xl font-display font-black text-white uppercase tracking-tighter">Unified Governance Node</h4>
                       <p className="text-slate-400 text-lg font-light leading-relaxed max-w-md mx-auto">
                          By merging **ReportSYNK** neural logs with **FormSYNK** risk engine, we create a zero-error intake and documentation pipeline.
                       </p>
                       <div className="flex flex-wrap justify-center gap-3">
                          {['AUDIT-READY', '24/25 PRICE SYNC', 'LOGIC-GROUNDED'].map(tag => (
                            <span key={tag} className="text-[10px] font-black text-neon-blue bg-neon-blue/10 px-4 py-2 rounded-full border border-neon-blue/30">{tag}</span>
                          ))}
                       </div>
                    </div>
                  )}
                  {activeMatrix === 'leakage' && (
                    <div className="space-y-10 animate-in fade-in zoom-in duration-700">
                       <div className="flex justify-center gap-6">
                          <ClaimSynkLogo size={100} isStable={true} />
                          <div className="h-24 w-px bg-royal-800 self-center opacity-30"></div>
                          <ChargeSynkLogo size={100} isStable={true} />
                       </div>
                       <h4 className="text-3xl font-display font-black text-white uppercase tracking-tighter">Yield Optimization Node</h4>
                       <p className="text-slate-400 text-lg font-light leading-relaxed max-w-md mx-auto">
                          **ClaimSYNK** audits historical data to find missed income, while **ChargeSYNK** ensures every future node is billed at maximal guideboard rates.
                       </p>
                       <div className="flex flex-wrap justify-center gap-3">
                          {['REVENUE-SECURE', 'AUTO-RECOVERY', 'BATCH-READY'].map(tag => (
                            <span key={tag} className="text-[10px] font-black text-neon-purple bg-neon-purple/10 px-4 py-2 rounded-full border border-neon-purple/30">{tag}</span>
                          ))}
                       </div>
                    </div>
                  )}
                  {activeMatrix === 'debt' && (
                    <div className="space-y-10 animate-in fade-in zoom-in duration-700">
                       <div className="flex justify-center">
                          <SynkCrmLogo width={350} height={80} />
                       </div>
                       <h4 className="text-3xl font-display font-black text-white uppercase tracking-tighter">Operational Mainframe</h4>
                       <p className="text-slate-400 text-lg font-light leading-relaxed max-w-md mx-auto">
                          **SynkCRM** acts as the central logic layer, automating the relational flow from onboarding to billing, eliminating 70% of manual data entry.
                       </p>
                       <div className="flex flex-wrap justify-center gap-3">
                          {['PAPERLESS', 'AUTO-LIFECYCLE', 'API-INTEGRATED'].map(tag => (
                            <span key={tag} className="text-[10px] font-black text-green-500 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/30">{tag}</span>
                          ))}
                       </div>
                    </div>
                  )}
               </div>
            </div>
          </div>
        </div>

        {/* TFix Diagnostic Deep-Dive */}
        <div className="mb-48 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
           <div className="relative group">
              <div className="absolute -inset-4 bg-neon-blue/10 blur-[80px] rounded-full group-hover:bg-neon-blue/15 transition-all"></div>
              <div className="orbital-tile p-12 bg-royal-950/60 border-white/10 relative shadow-3xl">
                 <div className="flex items-center gap-6 mb-12">
                    <div className="p-5 bg-royal-900 rounded-[2rem] border border-royal-800 text-neon-blue">
                       <Wrench size={48} className="animate-pulse" />
                    </div>
                    <div>
                       <h3 className="text-3xl font-display font-black text-white uppercase tracking-tighter">TFix Diagnostic</h3>
                       <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">Core Structural Engine v5.4</p>
                    </div>
                 </div>
                 
                 <div className="space-y-8">
                    {[
                      { icon: <ShieldCheck className="text-neon-purple" />, title: 'Self-Healing Logic', desc: 'Automated identification and correction of support documentation deficits.' },
                      { icon: <Gauge className="text-neon-blue" />, title: 'Predictive Compliance', desc: 'Forecasting organizational audit risk using operational telemetry.' },
                      { icon: <Workflow className="text-neon-blue" />, title: 'Structural Integrity', desc: 'Continuous monitoring of organizational data architecture.' }
                    ].map((feat, i) => (
                      <div key={i} className="flex gap-8 p-6 bg-royal-900/40 rounded-3xl border border-white/5 group-hover:border-neon-blue/20 transition-all">
                         <div className="shrink-0 pt-1">{feat.icon}</div>
                         <div>
                            <h5 className="text-white font-black text-sm uppercase tracking-widest mb-2">{feat.title}</h5>
                            <p className="text-[12px] text-slate-500 leading-relaxed font-light">{feat.desc}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
           
           <div className="space-y-12">
              <div className="inline-flex items-center px-4 py-1.5 rounded-xl bg-neon-purple/5 border border-neon-purple/20 text-neon-purple text-[9px] font-black tracking-widest uppercase">
                <Workflow size={14} className="mr-3" /> Technical Foundation
              </div>
              <h2 className="text-6xl md:text-8xl font-display font-black text-white uppercase tracking-tighter leading-[0.85] text-spotlight">
                Structural<br/>Engine.
              </h2>
              <p className="text-2xl text-slate-400 font-light leading-relaxed border-l-4 border-neon-blue pl-12">
                The foundational logic layer behind every SYNK module. TFix actively audits your organizational architecture to identify slippage at the binary level.
              </p>
              
              <div className="pt-8">
                <Link to="/contact" className="inline-flex items-center gap-10 text-white font-black text-[12px] tracking-[0.6em] uppercase hover:text-neon-blue transition-all group p-4 border border-transparent rounded-2xl">
                   Request System Audit <ArrowRight size={28} className="group-hover:translate-x-4 transition-transform text-neon-blue" />
                </Link>
              </div>
           </div>
        </div>

        {/* Command Finalization CTA */}
        <div className="mt-48 text-center">
           <Link to="/contact" className="inline-flex flex-col items-center gap-12 group p-4 hover:scale-[1.02] transition-transform">
              <span className="text-slate-600 text-[11px] font-mono uppercase tracking-[1em] font-black group-hover:text-neon-blue transition-colors">Initialize National Deployment Protocol</span>
              <div className="text-7xl md:text-[10rem] font-display font-black text-white uppercase tracking-tighter group-hover:text-neon-blue transition-colors leading-[0.85] flex items-center gap-16">
                 Launch Suite. 
                 <div className="p-10 md:p-16 rounded-full border-[6px] border-neon-blue group-hover:bg-neon-blue group-hover:text-white transition-all text-neon-blue shadow-[0_0_50px_rgba(6,182,212,0.2)]">
                    <ArrowRight size={64} className="group-hover:translate-x-6 transition-transform" />
                 </div>
              </div>
           </Link>
           <div className="mt-32 space-y-4">
              <p className="text-slate-700 text-[10px] font-mono uppercase tracking-[1.2em] font-black">End of Technical Transmission // RC_GRID_NODE_ALPHA</p>
              <div className="flex justify-center gap-3">
                 {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-royal-900 animate-pulse" style={{ animationDelay: `${i*0.3}s` }}></div>)}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Tech;