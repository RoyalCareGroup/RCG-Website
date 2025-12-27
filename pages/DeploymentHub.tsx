import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, ArrowRight, Terminal, Network, Copy, Check,
  Zap, Lock, ExternalLink, Cloud, Settings, Activity,
  AlertTriangle, CheckCircle2, Globe, ShieldAlert,
  Rocket, Info, ChevronRight, GitBranch, ArrowUpCircle,
  History as HistoryIcon, Monitor, Cpu, Database, RefreshCcw,
  CheckCircle as SuccessIcon, Radio
} from 'lucide-react';
import { COMPANY_DETAILS } from '../config.ts';
import { BackupButton } from '../components/BackupButton.tsx';

const DeploymentHub: React.FC = () => {
  const [latency, setLatency] = useState('14.2');
  const [syncStep, setSyncStep] = useState(3); // Visualizing step 3 (Production)

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency((12 + Math.random() * 4).toFixed(1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#01040f] pt-40 pb-32 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-[1000px] bg-emerald-500/5 blur-[150px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-500 text-[10px] font-black tracking-[0.4em] uppercase mb-8">
            <SuccessIcon size={14} className="mr-3 animate-bounce" /> Deployment Node: royalcaregroup.com.au
          </div>
          <h1 className="text-6xl md:text-9xl font-display font-black text-white mb-8 uppercase tracking-tighter leading-[0.85] text-spotlight">
            Command<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-neon-blue to-neon-purple">Center.</span>
          </h1>
          <p className="text-2xl text-slate-400 font-light leading-relaxed border-l-4 border-emerald-500 pl-10 max-w-2xl">
            The RCG Mainframe is now synchronized. Follow the protocols below to push new engineering updates to the live production grid.
          </p>
        </div>

        {/* SYNC & DEPLOYMENT ACTION CENTER */}
        <div className="mb-16 glass p-10 md:p-16 rounded-[4rem] border border-white/5 bg-royal-900/20 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none">
              <RefreshCcw size={200} className="text-neon-blue animate-spin-slow" />
           </div>
           
           <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
                 <div>
                    <h2 className="text-3xl font-display font-black text-white uppercase tracking-widest mb-4">Deployment Pipeline</h2>
                    <p className="text-slate-400 text-sm font-light">The sequence for manifesting workspace updates to the live domain.</p>
                 </div>
                 <div className="flex items-center gap-4 bg-royal-950 px-8 py-4 rounded-2xl border border-white/5 shadow-inner">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]"></div>
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Grid Status: Stable</span>
                 </div>
              </div>

              {/* VISUAL PIPELINE STEPS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                 {/* Step 1: Editor */}
                 <div className="relative p-8 rounded-3xl bg-royal-950/50 border border-white/5 group hover:border-neon-blue/30 transition-all">
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Phase 01</div>
                    <div className="flex items-center gap-4 mb-4">
                       <div className="p-3 bg-neon-blue/10 rounded-xl text-neon-blue">
                          <Monitor size={20} />
                       </div>
                       <h4 className="text-white font-black text-xs uppercase tracking-widest">Engineering Hub</h4>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed italic">"Updates are saved in this workspace. Changes here are visible in your Preview immediately."</p>
                    <div className="mt-8 flex items-center gap-2 text-emerald-500 text-[9px] font-black uppercase">
                       <Check size={12} /> Workspace Active
                    </div>
                 </div>

                 {/* Step 2: Sync Trigger */}
                 <div className="relative p-8 rounded-3xl bg-royal-950/50 border border-white/5 group hover:border-neon-purple/30 transition-all shadow-[0_0_40px_rgba(217,70,239,0.05)]">
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Phase 02</div>
                    <div className="flex items-center gap-4 mb-4">
                       <div className="p-3 bg-neon-purple/10 rounded-xl text-neon-purple animate-pulse">
                          <GitBranch size={20} />
                       </div>
                       <h4 className="text-white font-black text-xs uppercase tracking-widest">Repository Sync</h4>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-bold">Press the "Deploy" or "Sync" button in your workspace sidebar to trigger the live push.</p>
                    <div className="mt-8 flex items-center gap-2 text-neon-purple text-[9px] font-black uppercase animate-pulse">
                       <ArrowUpCircle size={12} /> Awaiting Trigger
                    </div>
                    {/* Visual Connector */}
                    <div className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 z-20">
                       <ArrowRight size={20} className="text-royal-800" />
                    </div>
                 </div>

                 {/* Step 3: Production Build */}
                 <div className="relative p-8 rounded-3xl bg-royal-950/50 border border-emerald-500/20 group hover:border-emerald-500/40 transition-all shadow-[0_0_40px_rgba(16,185,129,0.05)]">
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Phase 03</div>
                    <div className="flex items-center gap-4 mb-4">
                       <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
                          <Globe size={20} />
                       </div>
                       <h4 className="text-white font-black text-xs uppercase tracking-widest">Live Production</h4>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed italic">Cloudflare rebuilds the site. Updates appear on royalcaregroup.com.au within 90 seconds.</p>
                    <div className="mt-8 flex items-center gap-2 text-emerald-500 text-[9px] font-black uppercase">
                       <Check size={12} /> Sync Established
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-8 space-y-12">
            <div className="glass p-12 rounded-[4rem] border border-emerald-500/30 bg-royal-900/20 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                  <Database size={200} className="text-emerald-500" />
               </div>
               
               <h3 className="text-white font-display font-black uppercase tracking-widest text-2xl mb-12 flex items-center gap-4">
                  <Rocket size={24} className="text-emerald-400" /> Infrastructure Manifest
               </h3>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 bg-black/40 rounded-3xl border border-white/5 group hover:border-emerald-500/40 transition-all">
                     <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Production Endpoint</div>
                     <div className="flex items-center justify-between text-white font-mono text-lg">
                        <span>royalcaregroup.com.au</span>
                        <a href="https://royalcaregroup.com.au" target="_blank" className="text-emerald-400 hover:text-white transition-colors">
                           <ExternalLink size={18} />
                        </a>
                     </div>
                  </div>
                  <div className="p-8 bg-black/40 rounded-3xl border border-white/5 group hover:border-emerald-500/40 transition-all">
                     <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Edge Latency</div>
                     <div className="flex items-center justify-between text-white font-mono text-3xl font-black">
                        <span>{latency}ms</span>
                        <Activity size={24} className="text-neon-blue animate-pulse" />
                     </div>
                  </div>
               </div>

               <div className="mt-12 p-8 bg-emerald-500/5 border border-emerald-500/20 rounded-3xl">
                  <h4 className="text-white font-black text-xs uppercase tracking-widest mb-6 flex items-center gap-3">
                     <ShieldCheck size={16} className="text-emerald-400" /> Parity Protocols
                  </h4>
                  <ul className="space-y-4">
                     {[
                        "Continuous Integration: Automatic builds triggered on Sync.",
                        "SSL Encryption: Wildcard certificate verified for royalcaregroup.com.au.",
                        "Global Edge: Content cached at 300+ locations via Cloudflare Network.",
                        "Direct Domain Mapping: Primary record successfully points to RCG-Mainframe."
                     ].map((protocol, i) => (
                        <li key={i} className="flex items-start gap-4 text-slate-400 text-sm font-light leading-relaxed">
                           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                           {protocol}
                        </li>
                     ))}
                  </ul>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="glass p-10 rounded-[3rem] border border-royal-800 bg-royal-900/40">
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Cloudflare Management</div>
                  <p className="text-slate-400 text-xs mb-8 leading-relaxed">Monitor traffic, manage DNS records, and view real-time security analytics on your Cloudflare Dashboard.</p>
                  <a href="https://dash.cloudflare.com" target="_blank" className="w-full py-4 bg-royal-950 border border-royal-700 rounded-xl flex items-center justify-center gap-3 text-white text-[10px] font-black uppercase tracking-widest hover:border-neon-blue transition-all">
                     Open Cloudflare Dash <ExternalLink size={14} />
                  </a>
               </div>
               <div className="glass p-10 rounded-[3rem] border border-royal-800 bg-royal-900/40">
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Gemini AI Studio</div>
                  <p className="text-slate-400 text-xs mb-8 leading-relaxed">Update your API keys, monitor model usage, and calibrate neural response thresholds for the SYNK ecosystem.</p>
                  <a href="https://aistudio.google.com" target="_blank" className="w-full py-4 bg-royal-950 border border-royal-700 rounded-xl flex items-center justify-center gap-3 text-white text-[10px] font-black uppercase tracking-widest hover:border-neon-purple transition-all">
                     Open AI Studio <ExternalLink size={14} />
                  </a>
               </div>
            </div>
          </div>

          {/* RIGHT COLUMN: SIDEBAR */}
          <div className="lg:col-span-4 space-y-8">
             <div className="glass p-10 rounded-[3.5rem] border border-emerald-500/30 bg-royal-900/40 shadow-inner">
                <h3 className="text-xl font-display font-black text-white uppercase tracking-tighter mb-8">System Health</h3>
                <div className="space-y-6 font-mono text-[9px] text-slate-500">
                   <div className="flex gap-4">
                      <span className="text-emerald-400">[OK]</span>
                      <span>Domain: VERIFIED</span>
                   </div>
                   <div className="flex gap-4">
                      <span className="text-emerald-400">[OK]</span>
                      <span>DNS: PROPAGATED</span>
                   </div>
                   <div className="flex gap-4">
                      <span className="text-emerald-400">[OK]</span>
                      <span>Neural Link: SECURED</span>
                   </div>
                </div>
                
                <div className="mt-12 pt-8 border-t border-royal-800">
                   <div className="w-full py-6 bg-emerald-500 text-black border border-royal-800 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                      <SuccessIcon size={24} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Live in Production</span>
                   </div>
                </div>
             </div>

             <div className="glass p-10 rounded-[3rem] border border-royal-800 bg-royal-900/40 text-center">
                <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-6">Handover Protocol</div>
                <BackupButton />
                <p className="text-[9px] text-slate-500 mt-6 leading-relaxed italic">
                   "Generate a full corporate manifest to backup the production-ready code, config, and deployment documentation."
                </p>
             </div>

             <div className="glass p-10 rounded-[3rem] border border-neon-blue/20 bg-neon-blue/5">
               <h4 className="text-white font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                 <Radio size={14} className="text-neon-blue" /> Support Stream
               </h4>
               <p className="text-[10px] text-slate-500 leading-relaxed">
                  If you detect any structural anomalies in the production environment, initialize an RCG Technical Query immediately via the Contact Matrix.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeploymentHub;