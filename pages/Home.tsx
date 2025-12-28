import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, ArrowRight, Zap, Database, ShieldCheck, 
  Cpu, Network, Activity, Shield, Gauge, Send, Loader2,
  ChevronRight, Globe, Command, Layers, Terminal
} from 'lucide-react';
import { DecodingText } from '../components/DecodingText.tsx';
import { HeroLogoAnimation } from '../components/HeroLogoAnimation.tsx';
import { LaunchCountdown } from '../components/LaunchCountdown.tsx';
import { LiveVoiceAssistant } from '../components/LiveVoiceAssistant.tsx';
import { ComplianceScanner } from '../components/ComplianceScanner.tsx';
import { SystemTicker } from '../components/SystemTicker.tsx';
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
    <div className="flex flex-col bg-royal-950 overflow-x-hidden min-h-screen selection:bg-neon-blue/30 selection:text-white">
      <SystemTicker />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center pt-24 pb-40 px-6">
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-neon-purple/5 rounded-[4rem] blur-[180px] animate-blob-drift opacity-60"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-neon-blue/5 rounded-[4rem] blur-[200px] animate-blob-drift opacity-60" style={{ animationDelay: '-5s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center relative z-10">
          <div className="lg:col-span-7 space-y-16 animate-hero-reveal">
            <div className="space-y-12">
              <div className="inline-flex items-center px-6 py-2.5 rounded-xl border border-neon-blue/30 bg-white/5 text-neon-blue text-[11px] font-black tracking-[0.5em] uppercase backdrop-blur-xl shadow-2xl hover:border-neon-blue/60 transition-colors">
                 <Shield className="w-4 h-4 mr-4 text-neon-blue animate-pulse" /> National Strategic Node
              </div>
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-display font-black text-white leading-[0.9] tracking-tighter uppercase">
                Sovereign<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-purple drop-shadow-[0_0_35px_rgba(6,182,212,0.4)] transition-all duration-700 hover:drop-shadow-[0_0_50px_rgba(6,182,212,0.6)]">Systems.</span>
              </h1>
              <div className="max-w-xl border-l-4 border-neon-blue pl-14 relative group">
                <div className="absolute top-0 left-[-4px] h-full w-1.5 bg-neon-blue/30 group-hover:bg-neon-blue transition-colors"></div>
                <DecodingText 
                  text="We re-engineer organizational logic through proprietary structural intelligence. Architecting the next generation of Australia's NDIS grid."
                  className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed tracking-wide"
                  stagger={8}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-10 pt-6">
              <Link to="/services" className="slim-orbital-btn px-16 py-8 text-white font-black text-[12px] tracking-[0.6em] uppercase min-w-[300px] group shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-neon-purple/20 hover:border-neon-purple transition-all">
                <span className="flex items-center justify-center">Consultancy Node <ChevronRight className="ml-5 w-6 h-6 text-neon-purple group-hover:translate-x-3 transition-transform" /></span>
              </Link>
              <Link to="/tech" className="slim-orbital-btn px-16 py-8 text-white font-black text-[12px] tracking-[0.6em] uppercase min-w-[300px] border border-neon-blue/20 hover:border-neon-blue group shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
                <span className="text-neon-blue flex items-center justify-center">SYNK Tech Suite <ArrowRight className="ml-5 w-6 h-6 group-hover:translate-x-3 transition-transform" /></span>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-12 pt-20 border-t border-white/5">
              {[
                { val: "v10.9", label: "Protocol Level", icon: <Command size={20} className="text-neon-blue" /> },
                { val: "99.2%", label: "Claim Success", icon: <Database size={20} className="text-neon-purple" /> },
                { val: "100%", label: "Audit Integrity", icon: <ShieldCheck size={20} className="text-neon-green" /> }
              ].map((stat, i) => (
                <div key={i} className="space-y-3 group cursor-default">
                  <div className="flex items-center gap-4">
                    <span className="transition-transform group-hover:scale-110 duration-300">{stat.icon}</span>
                    <div className="text-2xl md:text-4xl font-display font-black text-white tracking-tighter group-hover:text-neon-blue transition-colors">{stat.val}</div>
                  </div>
                  <div className="text-[10px] text-slate-500 font-black uppercase tracking-[0.5em] leading-none">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative hidden lg:flex justify-center items-center animate-hero-reveal" style={{ animationDelay: '0.4s' }}>
             <div className="absolute inset-0 bg-neon-blue/10 rounded-[3rem] blur-[120px] animate-pulse"></div>
             <HeroLogoAnimation />
             <div className="absolute -bottom-36 scale-110">
                <LaunchCountdown />
             </div>
          </div>
        </div>
      </section>

      {/* --- AUDIT INTERFACE --- */}
      <section className="py-40 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="orbital-tile p-12 md:p-24 overflow-hidden group bg-royal-900/60 border-white/15 shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 right-0 p-24 opacity-[0.04] group-hover:opacity-[0.1] transition-opacity pointer-events-none">
              <Layers size={700} className="text-neon-blue" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16">
               <div className="lg:col-span-5 space-y-10">
                  <div className="inline-flex items-center px-6 py-2.5 rounded-xl border border-neon-purple/40 bg-neon-purple/5 text-neon-purple text-[11px] font-black tracking-[0.6em] uppercase">
                    <Activity size={18} className="mr-4 animate-pulse" /> Logic Diagnostics
                  </div>
                  <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter text-spotlight leading-[1]">
                    Structural<br/>Audit Node.
                  </h2>
                  <p className="text-xl text-slate-300 font-light leading-relaxed border-l-4 border-neon-purple pl-10 italic">
                    "Input organizational constraints to manifest high-fidelity structural assessments."
                  </p>
               </div>

               <div className="lg:col-span-7">
                  <div className="glass bg-royal-950 border border-white/10 rounded-[3rem] p-10 md:p-16 shadow-[0_50px_100px_rgba(0,0,0,0.6)] relative overflow-hidden">
                     <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-60"></div>
                     {!auditResult ? (
                       <form onSubmit={handleQuickAudit} className="space-y-10 relative z-10">
                         <div className="space-y-4">
                           <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.7em] ml-3 flex items-center gap-5">
                             <Terminal size={20} className="text-neon-blue" /> Diagnostic Payload
                           </label>
                           <textarea 
                              value={auditInput}
                              onChange={(e) => setAuditInput(e.target.value)}
                              placeholder="Describe your primary operational burden..."
                              className="w-full bg-royal-900 border border-white/10 rounded-[2rem] p-8 text-white focus:border-neon-blue outline-none transition-all min-h-[220px] font-light text-xl resize-none shadow-inner placeholder:text-slate-800"
                           />
                         </div>
                         <button 
                            type="submit"
                            disabled={isAuditing || !auditInput.trim()}
                            className="w-full py-8 bg-white text-black font-black text-[13px] tracking-[0.9em] uppercase rounded-[1.5rem] hover:bg-neon-blue hover:text-white border border-transparent hover:border-neon-blue/50 transition-all flex items-center justify-center gap-8 shadow-2xl disabled:opacity-40 hover:scale-[1.02] active:scale-95"
                         >
                            {isAuditing ? <Loader2 className="animate-spin" size={24} /> : <Zap size={24} />}
                            {isAuditing ? 'Synthesizing Architecture...' : 'Initialize Analysis'}
                         </button>
                       </form>
                     ) : (
                       <div className="space-y-10 animate-in fade-in zoom-in-95 relative z-10">
                          <div className="flex items-center justify-between border-b border-white/10 pb-8">
                             <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-neon-purple/20 rounded-2xl flex items-center justify-center text-neon-purple border border-neon-purple/40 shadow-2xl">
                                   <Gauge size={32} />
                                </div>
                                <div>
                                  <h4 className="text-white font-black text-base uppercase tracking-[0.4em]">Diagnostic Manifest</h4>
                                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.5em] mt-1">Integrity Level: VERIFIED_STABLE</p>
                                </div>
                             </div>
                             <button onClick={() => setAuditResult(null)} className="px-8 py-3 bg-white/5 border border-neon-blue/20 hover:border-neon-blue rounded-xl text-[11px] font-black text-neon-blue uppercase tracking-widest hover:text-white transition-all">New Scan</button>
                          </div>
                          <div className="text-slate-200 font-light leading-relaxed text-xl bg-royal-900/60 p-10 rounded-[2rem] border border-white/5 shadow-inner italic">
                            {auditResult}
                          </div>
                          <div className="flex justify-center pt-4">
                            <Link to="/contact" className="text-[12px] font-black text-white uppercase tracking-[0.8em] flex items-center gap-8 group py-5 px-12 border border-neon-blue/40 rounded-2xl hover:bg-neon-blue/15 hover:border-neon-blue transition-all shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-white/5">
                               Request Full Protocol <ArrowRight className="group-hover:translate-x-4 transition-transform text-neon-purple" size={20} />
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

      {/* --- GRID SECTION --- */}
      <section className="py-40 px-6 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-royal-950 via-transparent to-royal-950 pointer-events-none opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-32">
            <div className="inline-flex items-center px-6 py-2.5 rounded-xl border border-neon-blue/40 bg-neon-blue/5 text-neon-blue text-[11px] font-black tracking-[0.6em] uppercase mb-12 shadow-xl">
              <Globe size={18} className="mr-4 text-neon-blue animate-pulse" /> National Grid Node
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter text-spotlight leading-none mb-10">Core Protocol.</h2>
            <p className="text-slate-400 mt-8 max-w-3xl mx-auto text-sm md:text-base font-medium uppercase tracking-[1em] leading-loose opacity-60">
              Proprietary Business Intelligence Units developed for high-stakes organizational debt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                icon: <Database size={40} className="text-neon-blue" />, 
                title: "Data Sovereignty", 
                desc: "Zero-compromise high-security repositories. Your organizational telemetry hosted on proprietary sovereign infrastructure with real-time encryption nodes." 
              },
              { 
                icon: <ShieldCheck size={40} className="text-neon-purple" />, 
                title: "Policy Logic", 
                desc: "Algorithmic validation against 2024/25 NDIS standards. Our neural nodes update guideboards hourly to ensure 100% compliance parity across all state divisions." 
              },
              { 
                icon: <Network size={40} className="text-neon-blue" />, 
                title: "Unified Grid", 
                desc: "Connecting Boardroom strategy with national operations. A centralized hub providing absolute visibility across all participant lifecycles and workforce nodes." 
              },
            ].map((card, i) => (
              <div key={i} className="orbital-tile group min-h-[500px] flex flex-col border-white/10 bg-royal-900/50 shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
                <div className="p-12 h-full flex flex-col">
                  <div className="w-24 h-24 bg-royal-950 border border-white/10 rounded-2xl flex items-center justify-center mb-16 shadow-3xl group-hover:scale-110 group-hover:border-neon-blue transition-all duration-700 relative overflow-hidden">
                    <div className="absolute inset-0 bg-neon-blue/5 blur-2xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {card.icon}
                  </div>
                  <h3 className="text-2xl font-black text-white mb-8 uppercase tracking-tight font-display leading-none group-hover:text-neon-blue transition-colors">{card.title}</h3>
                  <p className="text-slate-400 text-lg leading-relaxed font-light mb-12 flex-grow">{card.desc}</p>
                  <div className="border-l-4 border-neon-blue pl-8 relative group mt-auto pt-8 flex items-center gap-6 text-[10px] font-mono text-slate-600 uppercase tracking-[0.6em] border-t border-white/5 group-hover:text-neon-blue transition-colors">
                     RC_CORE_NODE_0{i+1}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- NEURAL SCOUT --- */}
      <section className="py-40 px-6 relative overflow-hidden bg-royal-950/80">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-neon-purple/5 pointer-events-none blur-[200px]"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          <div className="lg:col-span-5 space-y-14 relative z-10">
             <div className="space-y-10">
                <div className="inline-flex items-center px-6 py-2.5 rounded-xl bg-neon-purple/10 border border-neon-purple/40 text-neon-purple text-[11px] font-black tracking-widest uppercase shadow-2xl">
                  <Zap size={18} className="mr-4 animate-pulse" /> Neural Voice Link
                </div>
                <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter leading-[1] text-spotlight">
                  Neural<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-pink-500 drop-shadow-[0_0_45px_rgba(217,70,239,0.3)]">Scout.</span>
                </h2>
                <p className="text-xl text-slate-300 font-light leading-relaxed border-l-4 border-neon-purple pl-10 italic">
                  Direct sub-50ms uplink to our NDIS Intelligence engine. Receive real-time guidance on guideboards, structural scale, and risk mitigation.
                </p>
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
                <div className="flex items-center gap-6 p-10 orbital-tile border-white/10 bg-royal-900/60 hover:scale-105 transition-all shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
                   <div className="p-4 bg-neon-blue/15 rounded-2xl text-neon-blue border border-neon-blue/40 shadow-inner group-hover:border-neon-blue transition-colors">
                     <ShieldCheck size={32} />
                   </div>
                   <div>
                      <h4 className="text-white font-black text-sm uppercase tracking-[0.4em] mb-1">Grounded</h4>
                      <p className="text-slate-500 text-[10px] font-medium">v10.9 Price Sync.</p>
                   </div>
                </div>
                <div className="flex items-center gap-6 p-10 orbital-tile border-white/10 bg-royal-900/60 hover:scale-105 transition-all shadow-[0_30px_60_rgba(0,0,0,0.5)]">
                   <div className="p-4 bg-neon-purple/15 rounded-2xl text-neon-purple border border-neon-purple/40 shadow-inner group-hover:border-neon-purple transition-colors">
                     <Activity size={32} />
                   </div>
                   <div>
                      <h4 className="text-white font-black text-sm uppercase tracking-[0.4em] mb-1">Low Latency</h4>
                      <p className="text-slate-500 text-[10px] font-medium">Fluid Consultation.</p>
                   </div>
                </div>
             </div>
          </div>
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
             <div className="relative group w-full max-w-2xl transform hover:scale-[1.03] transition-transform duration-700">
               <div className="absolute -inset-10 bg-neon-purple/15 blur-[120px] rounded-[4rem] group-hover:bg-neon-purple/25 transition-all duration-1000"></div>
               <LiveVoiceAssistant />
             </div>
          </div>
        </div>
      </section>

      {/* --- INTEGRITY SCANNER --- */}
      <section className="py-40 px-6 bg-[#020817] relative border-y border-white/10 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-32 items-center">
           <div className="lg:col-span-6 order-2 lg:order-1 flex justify-center">
              <div className="relative transform scale-110 lg:scale-125">
                 <div className="absolute inset-0 bg-neon-blue/15 blur-[180px] rounded-[4rem] animate-pulse"></div>
                 <ComplianceScanner />
              </div>
           </div>
           <div className="lg:col-span-6 order-1 lg:order-2 space-y-16">
              <div className="inline-flex items-center px-6 py-2.5 rounded-xl bg-neon-blue/10 border border-neon-blue/40 text-neon-blue text-[11px] font-black tracking-widest uppercase shadow-3xl">
                <Gauge size={22} className="mr-4 animate-pulse" /> TFix Diagnostic Engine
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter leading-[1] text-spotlight">
                Structural<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-emerald-400 drop-shadow-[0_0_40px_rgba(6,182,212,0.4)]">Integrity.</span>
              </h2>
              <p className="text-xl text-slate-300 font-light leading-relaxed border-l-4 border-neon-blue pl-12 max-w-xl italic">
                TFix audits your organizational logic in real-time, identifying slippage before it manifests as failure.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-12 border-t border-white/5">
                 <div className="space-y-6 group cursor-crosshair">
                    <div className="flex items-center gap-6 text-white font-black text-sm uppercase tracking-[0.5em] group-hover:text-neon-blue transition-colors">
                       <div className="p-3 bg-neon-purple/15 rounded-2xl border border-neon-purple/40 shadow-inner group-hover:scale-110 transition-all"><Database size={24} className="text-neon-purple" /></div> Real-time Audit
                    </div>
                    <p className="text-slate-500 text-base font-light leading-relaxed">Continuous deep-scan of service logs against commission standards for zero-error parity nodes.</p>
                 </div>
                 <div className="space-y-6 group cursor-crosshair">
                    <div className="flex items-center gap-6 text-white font-black text-sm uppercase tracking-[0.5em] group-hover:text-neon-blue transition-colors">
                       <div className="p-3 bg-neon-green/15 rounded-2xl border border-neon-green/40 shadow-inner group-hover:scale-110 transition-all"><ShieldCheck size={24} className="text-neon-green" /></div> Leakage Control
                    </div>
                    <p className="text-slate-500 text-base font-light leading-relaxed">Ensuring every support node is documented and billable, maximizing organizational yield and margin.</p>
                 </div>
              </div>
              
              <div className="pt-16">
                <Link to="/tech" className="inline-flex items-center gap-10 text-white font-black text-[13px] tracking-[1em] uppercase hover:text-neon-blue transition-all group px-12 py-6 border border-white/15 rounded-2xl hover:border-neon-blue/50 shadow-[0_40px_80px_rgba(0,0,0,0.6)] bg-white/5 hover:shadow-[0_0_40px_rgba(6,182,212,0.3)]">
                   Initialize SYNK Protocol <ArrowRight size={24} className="group-hover:translate-x-5 transition-transform text-neon-blue" />
                </Link>
              </div>
           </div>
        </div>
      </section>

      {/* --- FOOTER HUD --- */}
      <div className="bg-[#020817] border-t border-white/10 py-32">
        <div className="max-w-7xl mx-auto px-12">
           <div className="flex flex-col lg:flex-row items-center justify-between gap-24">
              <div className="flex items-center space-x-12">
                 <div className="relative">
                    <div className="w-12 h-12 bg-neon-green/10 rounded-xl animate-ping"></div>
                    <div className="absolute inset-0 m-auto w-4 h-4 bg-neon-green rounded-sm shadow-[0_0_30px_#10b981]"></div>
                 </div>
                 <div className="space-y-2">
                    <span className="text-[14px] font-black text-white uppercase tracking-[0.6em] block">Sovereign Grid Active</span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.5em] font-black italic">PROTOCOL: SYNK_CORE_v{COMPANY_DETAILS.appVersion}</span>
                 </div>
              </div>

              <div className="flex flex-wrap justify-center gap-8 text-[10px] font-mono text-slate-500 uppercase tracking-[0.4em] font-black">
                 {[
                   { icon: <Globe size={16} className="text-neon-blue" />, label: `ABN: ${COMPANY_DETAILS.abn}` },
                   { icon: <Activity size={16} className="text-neon-purple" />, label: "Grid Latency: 14ms" },
                   { icon: <Layers size={16} className="text-neon-green" />, label: "Nodes: 8/8 Sync" },
                   { icon: <Shield size={16} className="text-neon-blue" />, label: "Security: AES-256" }
                 ].map((hud, i) => (
                   <span key={i} className="flex items-center gap-4 bg-white/5 px-8 py-4 rounded-2xl border border-white/10 hover:border-neon-blue/60 hover:text-white transition-all shadow-2xl group cursor-help">
                     {hud.icon} <span className="transition-colors">{hud.label}</span>
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