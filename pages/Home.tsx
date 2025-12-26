import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, ArrowRight, Zap, Database, ShieldCheck, 
  Radio, Cpu, Network, BarChart3, Activity, 
  Terminal, Shield, Gauge, Send, Loader2,
  ChevronRight, Globe, Layers, Command
} from 'lucide-react';
import { EvolutionAnimation } from '../components/EvolutionAnimation.tsx';
import { ComplianceScanner } from '../components/ComplianceScanner.tsx';
import { DecodingText } from '../components/DecodingText.tsx';
import { HeroLogoAnimation } from '../components/HeroLogoAnimation.tsx';
import { LaunchCountdown } from '../components/LaunchCountdown.tsx';
import { LiveVoiceAssistant } from '../components/LiveVoiceAssistant.tsx';
import { COMPANY_DETAILS } from '../config.ts';
import { sendChatMessage } from '../services/geminiService.ts';

const Home = () => {
  const [auditInput, setAuditInput] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<string | null>(null);

  const handleQuickAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditInput.trim() || isAuditing) return;

    setIsAuditing(true);
    try {
      const prompt = `Perform a high-level structural audit based on this provider data: "${auditInput}". 
      Identify 3 potential points of compliance slippage and suggest a SYNK Suite deployment strategy. 
      Keep it professional, elite, and concise (max 150 words). Use technical terminology.`;
      
      const { text } = await sendChatMessage(prompt, [], false);
      setAuditResult(text);
    } catch (err) {
      setAuditResult("CRITICAL: Logic Bridge failure. Suggesting manual audit protocol.");
    } finally {
      setIsAuditing(false);
    }
  };

  return (
    <div className="flex flex-col bg-[#01040f] overflow-x-hidden min-h-screen selection:bg-neon-blue/30 selection:text-white">
      {/* Dynamic Background Atmosphere */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-neon-purple/10 rounded-full blur-[180px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-neon-blue/10 rounded-full blur-[200px] animate-pulse"></div>
        <div className="absolute top-[30%] right-[10%] w-[300px] h-[300px] bg-neon-blue/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center relative z-10">
          <div className="lg:col-span-7 space-y-12 animate-fade-in">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-neon-blue/30 bg-neon-blue/5 text-neon-blue text-[9px] font-black tracking-[0.5em] uppercase backdrop-blur-md">
                 <Shield className="w-3.5 h-3.5 mr-3 animate-pulse" /> National Strategic Node
              </div>
              <h1 className="text-6xl md:text-8xl xl:text-9xl font-display font-black text-white leading-[0.85] tracking-tighter uppercase">
                Sovereign<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-pink-500 drop-shadow-[0_0_30px_rgba(6,182,212,0.4)]">Systems.</span>
              </h1>
              <div className="max-w-xl border-l-4 border-royal-800 pl-10 relative">
                <div className="absolute top-0 left-[-4px] h-12 w-1 bg-neon-blue animate-pulse"></div>
                <DecodingText 
                  text="We re-engineer organizational logic through proprietary structural intelligence. Architecting the next generation of Australia's NDIS grid."
                  className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed tracking-wide"
                  stagger={10}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-6 pt-4">
              <Link to="/services" className="slim-orbital-btn px-10 py-6 text-white font-black text-[10px] tracking-[0.4em] uppercase min-w-[260px] group">
                <span className="flex items-center justify-center">Consultancy Node <ChevronRight className="ml-3 w-4 h-4 text-neon-purple group-hover:translate-x-1 transition-transform" /></span>
              </Link>
              <Link to="/tech" className="slim-orbital-btn px-10 py-6 text-white font-black text-[10px] tracking-[0.4em] uppercase min-w-[260px] border-white/10 hover:border-neon-blue group">
                <span className="text-neon-blue flex items-center justify-center">SYNK Tech Suite <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-royal-900/50">
              {[
                { val: "9.9.5", label: "Protocol Level", icon: <Command size={14} className="text-neon-blue" /> },
                { val: "99.2%", label: "Claim Success", icon: <Database size={14} className="text-neon-purple" /> },
                { val: "100%", label: "Audit Integrity", icon: <ShieldCheck size={14} className="text-neon-green" /> }
              ].map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center gap-2 mb-1">
                    {stat.icon}
                    <div className="text-2xl md:text-3xl font-display font-black text-white">{stat.val}</div>
                  </div>
                  <div className="text-[9px] text-slate-500 font-black uppercase tracking-widest leading-none">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative hidden lg:flex justify-center items-center">
             <div className="absolute inset-0 bg-neon-purple/5 rounded-full blur-[100px] animate-pulse"></div>
             <HeroLogoAnimation />
             <div className="absolute -bottom-24 scale-90 opacity-90">
                <LaunchCountdown />
             </div>
          </div>
        </div>
      </section>

      {/* Strategic Audit Interface */}
      <section className="py-48 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="orbital-tile p-12 md:p-24 overflow-hidden group bg-royal-900/20">
            <div className="absolute bottom-0 left-0 p-16 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
              <Command size={500} className="text-neon-purple" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-20">
               <div className="lg:col-span-5 space-y-10">
                  <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-neon-purple/20 bg-neon-purple/5 text-neon-purple text-[9px] font-black tracking-[0.4em] uppercase">
                    <Activity size={14} className="mr-3 animate-pulse" /> Logic Diagnostics
                  </div>
                  <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter text-spotlight leading-[0.9]">
                    Structural<br/>Audit Node.
                  </h2>
                  <p className="text-lg text-slate-400 font-light leading-relaxed border-l-2 border-neon-blue pl-8">
                    Input your organizational constraints to receive a high-fidelity RCG assessment of your NDIS architecture.
                  </p>
                  
                  <div className="flex items-center gap-4 text-[10px] font-black text-slate-600 uppercase tracking-widest bg-royal-950/50 p-4 rounded-xl w-fit">
                     <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                     SYNK_GND_v5 Protocol Active
                  </div>
               </div>

               <div className="lg:col-span-7">
                  <div className="glass bg-royal-950/40 border border-white/5 rounded-[3rem] p-10 md:p-14 shadow-2xl relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/5 blur-3xl rounded-full"></div>
                     {!auditResult ? (
                       <form onSubmit={handleQuickAudit} className="space-y-10 relative z-10">
                         <div className="space-y-5">
                           <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-2 flex items-center gap-3">
                             <Terminal size={14} className="text-neon-blue" /> Diagnostic Payload
                           </label>
                           <textarea 
                              value={auditInput}
                              onChange={(e) => setAuditInput(e.target.value)}
                              placeholder="Describe your primary operational burden... (e.g. SIL documentation debt, revenue leakage points)"
                              className="w-full bg-royal-900/50 border border-royal-800 rounded-[2.5rem] p-8 text-slate-200 focus:border-neon-blue outline-none transition-all min-h-[220px] font-light text-lg resize-none shadow-inner"
                           />
                         </div>
                         <button 
                            type="submit"
                            disabled={isAuditing || !auditInput.trim()}
                            className="w-full py-7 bg-white text-black font-black text-[11px] tracking-[0.6em] uppercase rounded-2xl hover:bg-neon-blue hover:text-white transition-all flex items-center justify-center gap-4 shadow-xl disabled:opacity-50 active:scale-[0.98]"
                         >
                            {isAuditing ? <Loader2 className="animate-spin" /> : <Zap size={18} />}
                            {isAuditing ? 'Synthesizing Architecture...' : 'Initialize Analysis'}
                         </button>
                       </form>
                     ) : (
                       <div className="space-y-10 animate-in fade-in zoom-in-95 relative z-10">
                          <div className="flex items-center justify-between border-b border-royal-800 pb-8">
                             <div className="flex items-center gap-5">
                                <div className="w-12 h-12 bg-neon-purple/20 rounded-2xl flex items-center justify-center text-neon-purple border border-neon-purple/30">
                                   <Gauge size={24} />
                                </div>
                                <div>
                                  <h4 className="text-white font-black text-xs uppercase tracking-widest">Diagnostic Manifest</h4>
                                  <p className="text-[8px] font-mono text-slate-500 uppercase tracking-widest mt-1">Integrity Level: VERIFIED</p>
                                </div>
                             </div>
                             <button onClick={() => setAuditResult(null)} className="px-5 py-2.5 bg-royal-900 border border-royal-800 rounded-xl text-[9px] font-black text-neon-blue uppercase tracking-widest hover:text-white hover:border-neon-blue transition-all">New Scan</button>
                          </div>
                          <div className="text-slate-300 font-light leading-relaxed text-lg italic bg-royal-900/30 p-10 rounded-[2.5rem] border border-white/5 shadow-inner">
                            <span className="text-neon-purple text-4xl leading-none font-serif opacity-30 block mb-2">"</span>
                            {auditResult}
                            <span className="text-neon-blue text-4xl leading-none font-serif opacity-30 block text-right mt-2">"</span>
                          </div>
                          <div className="flex justify-center pt-4">
                            <Link to="/contact" className="text-[10px] font-black text-white uppercase tracking-[0.5em] flex items-center gap-5 group py-4 px-10 border border-neon-blue/30 rounded-2xl hover:bg-neon-blue/5 transition-all">
                               Request Integration Plan <ArrowRight className="group-hover:translate-x-2 transition-transform text-neon-purple" />
                            </Link>
                          </div>
                       </div>
                     )}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Infrastructure Grid */}
      <section className="py-48 px-6 bg-royal-950/40 relative">
        <div className="absolute inset-0 bg-royal-900/10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-32">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-neon-blue/20 bg-neon-blue/5 text-neon-blue text-[9px] font-black tracking-[0.4em] uppercase mb-10">
              <Globe size={14} className="mr-3" /> National Grid
            </div>
            <h2 className="text-6xl md:text-8xl font-display font-black text-white uppercase tracking-tighter text-spotlight leading-none">Core Protocol.</h2>
            <p className="text-slate-500 mt-8 max-w-2xl mx-auto text-[11px] font-bold uppercase tracking-[0.6em] leading-relaxed">
              Proprietary Business Intelligence Units developed by the RCG Tech Division to solve high-stakes organizational debt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                icon: <Database size={32} className="text-neon-blue" />, 
                title: "Data Sovereignty", 
                desc: "Zero-compromise high-security repositories. Your organizational telemetry hosted on proprietary sovereign infrastructure with real-time encryption nodes." 
              },
              { 
                icon: <ShieldCheck size={32} className="text-neon-purple" />, 
                title: "Policy Logic", 
                desc: "Algorithmic validation against 2024/25 NDIS standards. Our neural scout nodes update policy guideboards hourly to ensure 100% compliance parity." 
              },
              { 
                icon: <Network size={32} className="text-neon-blue" />, 
                title: "Unified Grid", 
                desc: "Connecting Boardroom strategy with national operations. A centralized hub providing absolute visibility across all participant lifecycles." 
              },
            ].map((card, i) => (
              <div key={i} className="orbital-tile group min-h-[480px] flex flex-col hover:border-neon-blue/30 border-white/5">
                <div className="p-14 h-full flex flex-col">
                  <div className="w-24 h-24 bg-royal-900/50 border border-royal-800 rounded-[2.5rem] flex items-center justify-center mb-12 shadow-2xl group-hover:scale-110 group-hover:border-neon-blue/40 transition-all duration-700 relative">
                    <div className="absolute inset-0 bg-neon-blue/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {card.icon}
                  </div>
                  <h3 className="text-3xl font-black text-white mb-8 uppercase tracking-tight font-display leading-tight">{card.title}</h3>
                  <p className="text-slate-400 text-lg leading-relaxed font-light mb-12 flex-grow">{card.desc}</p>
                  <div className="mt-auto pt-8 flex items-center gap-4 text-[9px] font-mono text-slate-600 uppercase tracking-widest border-t border-royal-900 group-hover:text-neon-blue transition-colors">
                     <span className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse"></span>
                     Unit_ID: RC_CORE_GRID_0{i+1}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Neural Scout Visualizer */}
      <section className="py-48 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-neon-purple/5 mask-radial pointer-events-none"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          <div className="lg:col-span-5 space-y-12 relative z-10">
             <div>
                <div className="inline-flex items-center px-4 py-1.5 rounded-xl bg-neon-purple/5 border border-neon-purple/20 text-neon-purple text-[9px] font-black tracking-widest uppercase mb-10">
                  <Radio size={14} className="mr-3 animate-pulse" /> Neural Voice Link
                </div>
                <h2 className="text-6xl md:text-8xl font-display font-black text-white uppercase tracking-tighter leading-[0.85] mb-10 text-spotlight">
                  Neural<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-pink-500 drop-shadow-[0_0_25px_rgba(217,70,239,0.3)]">Scout.</span>
                </h2>
                <p className="text-xl text-slate-400 font-light leading-relaxed border-l-4 border-neon-purple pl-10">
                  Direct sub-50ms uplink to our NDIS Intelligence engine. Receive real-time guidance on pricing Guideboards, structural scale, and risk mitigation protocols.
                </p>
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="flex items-center gap-6 p-8 orbital-tile border-white/5 bg-royal-900/30 hover:border-neon-blue/20">
                   <div className="p-4 bg-neon-blue/10 rounded-2xl text-neon-blue border border-neon-blue/20">
                     <ShieldCheck size={28} />
                   </div>
                   <div>
                      <h4 className="text-white font-black text-[10px] uppercase tracking-widest mb-1">Grounded</h4>
                      <p className="text-slate-500 text-[9px] font-light leading-tight">Live sync with v5.4 Pricing Guideline.</p>
                   </div>
                </div>
                <div className="flex items-center gap-6 p-8 orbital-tile border-white/5 bg-royal-900/30 hover:border-neon-purple/20">
                   <div className="p-4 bg-neon-purple/10 rounded-2xl text-neon-purple border border-neon-purple/20">
                     <Zap size={28} />
                   </div>
                   <div>
                      <h4 className="text-white font-black text-[10px] uppercase tracking-widest mb-1">Low Latency</h4>
                      <p className="text-slate-500 text-[9px] font-light leading-tight">Fluid high-stakes consultation.</p>
                   </div>
                </div>
             </div>
          </div>
          <div className="lg:col-span-7 flex justify-center lg:justify-end scale-105">
             <div className="relative group w-full max-w-2xl">
               <div className="absolute -inset-4 bg-neon-purple/5 blur-[80px] rounded-full group-hover:bg-neon-purple/10 transition-all duration-1000"></div>
               <LiveVoiceAssistant />
             </div>
          </div>
        </div>
      </section>

      {/* Structural Integrity Diagnostic */}
      <section className="py-48 px-6 bg-royal-950 relative border-y border-royal-900/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
           <div className="lg:col-span-6 order-2 lg:order-1 flex justify-center">
              <div className="relative transform scale-110 lg:scale-125">
                 <div className="absolute inset-0 bg-neon-blue/5 blur-[120px] rounded-full"></div>
                 <ComplianceScanner />
              </div>
           </div>
           <div className="lg:col-span-6 order-1 lg:order-2 space-y-12">
              <div className="inline-flex items-center px-4 py-1.5 rounded-xl bg-neon-blue/5 border border-neon-blue/20 text-neon-blue text-[9px] font-black tracking-widest uppercase">
                <Gauge size={14} className="mr-3 animate-pulse" /> TFix Diagnostic Engine
              </div>
              <h2 className="text-6xl md:text-8xl font-display font-black text-white uppercase tracking-tighter leading-[0.85] text-spotlight">
                Structural<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-emerald-400">Integrity.</span>
              </h2>
              <p className="text-2xl text-slate-400 font-light leading-relaxed border-l-4 border-neon-blue pl-12">
                TFix audits your organizational logic in real-time, identifying compliance slippage and revenue leakage before it manifests as organizational failure.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-10 border-t border-royal-800">
                 <div className="space-y-4 group">
                    <div className="flex items-center gap-4 text-white font-black text-xs uppercase tracking-widest group-hover:text-neon-blue transition-colors">
                       <Database size={24} className="text-neon-purple" /> Real-time Audit
                    </div>
                    <p className="text-slate-500 text-sm font-light leading-relaxed">Continuous deep-scan of service logs against commission standards for zero-error documentation.</p>
                 </div>
                 <div className="space-y-4 group">
                    <div className="flex items-center gap-4 text-white font-black text-xs uppercase tracking-widest group-hover:text-neon-blue transition-colors">
                       <ShieldCheck size={24} className="text-neon-green" /> Leakage Control
                    </div>
                    <p className="text-slate-500 text-sm font-light leading-relaxed">Ensuring every support node is documented and billable, maximizing organizational yield.</p>
                 </div>
              </div>
              
              <div className="pt-12">
                <Link to="/tech" className="inline-flex items-center gap-8 text-white font-black text-[11px] tracking-[0.6em] uppercase hover:text-neon-blue transition-all group px-10 py-5 border border-royal-800 rounded-2xl hover:border-neon-blue/40">
                   Initialize SYNK Protocol <ArrowRight size={24} className="group-hover:translate-x-3 transition-transform text-neon-blue" />
                </Link>
              </div>
           </div>
        </div>
      </section>

      {/* Global Command Center Status */}
      <div className="bg-royal-950 border-t border-royal-900 py-16">
        <div className="max-w-7xl mx-auto px-8">
           <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
              <div className="flex items-center space-x-8">
                 <div className="relative">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-ping opacity-20"></div>
                    <div className="absolute inset-0 m-auto w-2 h-2 bg-green-500 rounded-full shadow-[0_0_15px_#22c55e]"></div>
                 </div>
                 <div className="space-y-1">
                    <span className="text-[12px] font-black text-white uppercase tracking-[0.5em] block">Sovereign Grid Active</span>
                    <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">Protocol: SYNK_CORE_STABLE_v9.9.5</span>
                 </div>
              </div>

              <div className="flex flex-wrap justify-center gap-12 text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] font-bold">
                 {[
                   { icon: <Globe size={14} className="text-neon-blue" />, label: `ABN: ${COMPANY_DETAILS.abn}` },
                   { icon: <Activity size={14} className="text-neon-purple" />, label: "Grid Latency: 12ms" },
                   { icon: <Network size={14} className="text-neon-green" />, label: "Nodes: 4/4 Sync" },
                   { icon: <Shield size={14} className="text-neon-blue" />, label: "Security: AES-256" }
                 ].map((hud, i) => (
                   <span key={i} className="flex items-center gap-3 bg-royal-900/40 px-6 py-3 rounded-full border border-white/5 hover:border-neon-blue/20 transition-colors">
                     {hud.icon} {hud.label}
                   </span>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Home;