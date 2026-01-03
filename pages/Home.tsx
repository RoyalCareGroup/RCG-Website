import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, ArrowRight, Zap, Database, ShieldCheck, 
  Cpu, Network, Activity, Shield, Gauge, Send, Loader2,
  Globe, Command, Layers, Terminal,
  Box, MousePointer2, Fingerprint, Microscope
} from 'lucide-react';
import { DecodingText } from '../components/DecodingText.tsx';
import { HeroLogoAnimation } from '../components/HeroLogoAnimation.tsx';
import { LaunchCountdown } from '../components/LaunchCountdown.tsx';
import { LiveVoiceAssistant } from '../components/LiveVoiceAssistant.tsx';
import { ComplianceScanner } from '../components/ComplianceScanner.tsx';
import { COMPANY_DETAILS } from '../config.ts';
import { sendChatMessage } from '../services/geminiService.ts';

const Home = () => {
  const [auditInput, setAuditInput] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleQuickAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditInput.trim() || isAuditing) return;
    setIsAuditing(true);
    try {
      const prompt = `Perform a high-level structural audit: "${auditInput}". Use elite tech terminology.`;
      const { text } = await sendChatMessage(prompt, [], false);
      setAuditResult(text);
    } catch (err) {
      setAuditResult("CRITICAL: Logic Bridge failure. Suggesting manual audit protocol.");
    } finally {
      setIsAuditing(false);
    }
  };

  return (
    <div ref={containerRef} className="flex flex-col bg-[#334155] overflow-x-hidden min-h-screen selection:bg-neon-blue/30 selection:text-white px-6 sm:px-16 lg:px-24 xl:px-32 font-sans font-bold relative">
      
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

      {/* --- CINEMATIC HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col justify-center pt-48 pb-32 overflow-hidden z-10">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10 w-full">
            {/* Primary Content Column - Refined Alignment to match the SYNK node center */}
            <div className="lg:col-span-7 flex flex-col justify-start space-y-10 animate-hero-reveal lg:mt-16">
              <div className="space-y-10">
                <h1 className="text-6xl md:text-7xl xl:text-8xl font-display font-black text-white leading-[0.85] uppercase heading-wow drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)]">
                  Structural<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-purple drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]">Intelligence.</span>
                </h1>

                <div className="max-w-xl relative group banner-pop bg-black p-10 shadow-2xl border-2 border-white/10">
                  <DecodingText 
                    text="Architecting the next generation of Australia's NDIS grid through proprietary structural intelligence and high-fidelity binary logic."
                    className="text-xl md:text-2xl text-white font-black leading-tight tracking-wide opacity-100"
                    stagger={8}
                  />
                </div>
              </div>
            </div>

            {/* Visual Identity Column - Vertical Bounding Control */}
            <div className="lg:col-span-5 relative flex flex-col animate-hero-reveal mt-0 h-full justify-start items-center">
               <div className="relative z-10 flex flex-col items-center gap-4 w-full">
                  {/* Identity Node */}
                  <div className="scale-[0.7] xl:scale-[0.75] transform-gpu origin-top">
                    <HeroLogoAnimation />
                  </div>

                  {/* Buttons: Pulled up closer to the logo base using significantly aggressive negative margin */}
                  <div className="flex flex-col gap-3 w-full max-w-[320px] -mt-44 xl:-mt-52 relative z-20">
                    <Link to="/services" className="slim-orbital-btn px-6 py-4 text-white font-black text-[10px] tracking-[0.5em] uppercase transition-all flex items-center justify-center bg-black border-2 border-neon-purple">
                      Consultancy Node <ArrowRight className="ml-3 w-4 h-4 text-neon-purple" />
                    </Link>
                    <Link to="/tech" className="slim-orbital-btn px-6 py-4 text-white font-black text-[10px] tracking-[0.5em] uppercase border-2 border-neon-blue transition-all flex items-center justify-center bg-black">
                      <span className="text-neon-blue">SYNK Tech Suite</span> <ArrowRight className="ml-3 w-4 h-4" />
                    </Link>
                  </div>
               </div>
            </div>
          </div>

          <div className="w-full flex justify-center mt-32 animate-hero-reveal banner-pop bg-black/60 p-10 border-2 border-white/10 shadow-3xl">
             <LaunchCountdown />
          </div>
        </div>
      </section>

      {/* --- OPERATIONAL AUDIT INTERFACE --- */}
      <section className="py-40 relative z-10">
        <div className="max-w-6xl mx-auto w-full">
          <div className="orbital-tile p-12 md:p-20 bg-black border-2 border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-20">
               <div className="lg:col-span-5 space-y-10">
                  <div className="circuit-capsule border-2 border-neon-purple shadow-[0_0_30px_rgba(217,70,239,0.2)] px-6 py-4">
                    <Microscope size={18} className="mr-4 text-neon-purple animate-pulse" /> Logic Diagnostics
                  </div>
                  <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase leading-[0.95] heading-wow">
                    Structural<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-purple drop-shadow-[0_0_35px_rgba(255,255,255,0.3)]">Audit.</span>
                  </h2>
                  <h3 className="text-xl text-white font-black leading-tight border-l-8 border-neon-purple pl-10 italic">
                    "Input organizational constraints to manifest structural assessments."
                  </h3>
               </div>

               <div className="lg:col-span-7">
                  <div className="glass bg-royal-950 border-2 border-white/10 rounded-[2.5rem] p-10 md:p-14 shadow-3xl relative overflow-hidden banner-pop">
                     {!auditResult ? (
                       <form onSubmit={handleQuickAudit} className="space-y-10 relative z-10">
                         <div className="space-y-6">
                           <label className="text-[11px] font-black text-white uppercase tracking-[0.5em] ml-4 flex items-center gap-4">
                             <Terminal size={20} className="text-neon-blue" /> Diagnostic Payload Input
                           </label>
                           <textarea 
                             value={auditInput}
                             onChange={(e) => setAuditInput(e.target.value)}
                             placeholder="Describe primary organizational debt..."
                             className="w-full bg-black border-2 border-white/10 rounded-[1.5rem] p-8 text-white focus:border-neon-blue outline-none transition-all min-h-[220px] font-black text-lg resize-none shadow-inner placeholder:text-slate-800"
                           />
                         </div>
                         <button 
                            type="submit"
                            disabled={isAuditing || !auditInput.trim()}
                            className="slim-orbital-btn w-full py-7 bg-white text-black font-black text-[12px] tracking-[0.6em] uppercase flex items-center justify-center gap-6 shadow-3xl disabled:opacity-40"
                         >
                            {isAuditing ? <Loader2 className="animate-spin" size={24} /> : <Zap size={24} className="text-neon-purple" />}
                            {isAuditing ? 'Synthesizing Architecture...' : 'Initialize Analysis'}
                         </button>
                       </form>
                     ) : (
                       <div className="space-y-10 animate-in fade-in zoom-in-95 relative z-10 text-center">
                          <div className="text-white font-black leading-relaxed text-xl bg-black p-10 rounded-[2rem] border-2 border-white/10 shadow-inner italic">
                            <DecodingText text={auditResult} stagger={2} className="text-white font-black" />
                          </div>
                          <button onClick={() => setAuditResult(null)} className="px-10 py-4 bg-white/10 border-2 border-white/20 hover:border-neon-blue hover:text-neon-blue rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] transition-all">New Diagnostic Sequence</button>
                       </div>
                     )}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CORE PROTOCOL BENTO GRID --- */}
      <section className="py-40 relative overflow-hidden z-10">
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="text-center mb-32 banner-pop bg-black p-16 rounded-[3rem] border-2 border-white/10 shadow-3xl">
            <div className="circuit-capsule border-2 border-neon-blue shadow-[0_0_30px_rgba(6,182,212,0.2)] mb-10">
              <Globe size={18} className="mr-4 text-neon-blue animate-pulse" /> National Grid Node Active
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase leading-[0.95] mb-10 heading-wow">
              Core<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-purple drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]">Protocol.</span>
            </h2>
            <p className="text-white mt-10 max-w-4xl mx-auto text-base md:text-lg font-black uppercase tracking-[0.7em] leading-loose">
              Proprietary units architected for national scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: <Database size={48} className="text-neon-blue" />, title: "Data Sovereignty", desc: "High-security repositories with multi-layer encryption for absolute control." },
              { icon: <ShieldCheck size={48} className="text-neon-purple" />, title: "Policy Logic", desc: "Algorithmic validation against NDIS Practice Standards in real-time." },
              { icon: <Network size={48} className="text-neon-blue" />, title: "Unified Grid", desc: "Connecting Boardroom strategy with national operations seamlessly." },
            ].map((card, i) => (
              <div 
                key={i} 
                className="orbital-tile group min-h-[550px] flex flex-col border-2 border-white/15 bg-black shadow-3xl hover:border-neon-blue transition-all duration-700"
              >
                <div className="p-12 h-full flex flex-col relative overflow-hidden">
                  <div className="w-28 h-28 bg-royal-950 border-2 border-white/10 flex items-center justify-center mb-20 shadow-inner group-hover:scale-110 group-hover:border-neon-blue transition-all duration-1000 relative rounded-3xl">
                    <div className="absolute inset-0 bg-neon-blue/40 blur-3xl opacity-0 group-hover:opacity-100"></div>
                    {card.icon}
                  </div>
                  <h3 className="text-3xl font-display font-black text-white mb-8 uppercase tracking-tighter leading-none group-hover:text-neon-blue transition-colors">{card.title}</h3>
                  <p className="text-lg text-white leading-relaxed font-black mb-16 flex-grow italic opacity-90">"{card.desc}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- NEURAL SCOUT VOICE LINK --- */}
      <section className="py-40 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-center w-full">
          <div className="lg:col-span-5 space-y-16 banner-pop bg-black p-12 rounded-[3rem] border-2 border-white/10 shadow-3xl">
             <div className="space-y-12">
                <div className="circuit-capsule border-2 border-neon-purple shadow-[0_0_30px_rgba(217,70,239,0.2)]">
                  <Zap size={20} className="mr-4 text-neon-purple animate-pulse" /> Neural Voice Link
                </div>
                <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase leading-[0.95] heading-wow">
                  Neural<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-pink-500 drop-shadow-[0_0_40px_rgba(217,70,239,0.5)]">Scout.</span>
                </h2>
                <p className="text-2xl text-white font-black leading-tight border-l-8 border-neon-purple pl-12 italic">
                  "Direct uplink to the NDIS Intelligence engine."
                </p>
             </div>
          </div>
          
          <div className="lg:col-span-7 flex justify-center lg:justify-end scale-100">
             <div className="relative group w-full max-w-xl transform-gpu">
               <div className="absolute -inset-12 bg-neon-purple/[0.3] blur-[120px] rounded-full animate-pulse opacity-30"></div>
               <LiveVoiceAssistant />
             </div>
          </div>
        </div>
      </section>

      {/* --- STATS BANNER --- */}
      <section className="py-24 border-2 border-white/10 relative z-10 bg-black banner-pop rounded-[3rem] mx-4 overflow-hidden mb-40">
        <div className="max-w-6xl mx-auto w-full relative z-10 px-8">
           <div className="grid grid-cols-3 gap-16">
             {[
               { val: "v10.12", label: "Protocol", icon: <Command size={20} className="text-neon-blue" /> },
               { val: "99.9%", label: "Uptime", icon: <Activity size={20} className="text-neon-purple" /> },
               { val: "100%", label: "Audit Pass", icon: <ShieldCheck size={20} className="text-neon-green" /> }
             ].map((stat, i) => (
               <div key={stat.label} className="space-y-5 group orbital-tile p-8 bg-black hover:bg-royal-950 transition-all border-none transform-gpu">
                 <div className="flex items-center gap-5">
                   <span className="p-3.5 bg-royal-950 rounded-xl group-hover:scale-110 transition-transform shadow-2xl border-2 border-white/5">{stat.icon}</span>
                   <div className="text-3xl md:text-4xl font-display font-black text-white tracking-tighter group-hover:text-neon-blue">{stat.val}</div>
                 </div>
                 <div className="text-transparent font-black uppercase tracking-[0.5em] leading-none pl-1" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)', fontSize: '11px' }}>{stat.label}</div>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* --- FOOTER HUD --- */}
      <div className="bg-black border-t-4 border-white/10 py-32 overflow-hidden relative z-10">
        <div className="max-w-6xl mx-auto w-full px-12">
           <div className="flex flex-col lg:flex-row items-center justify-between gap-32">
              <div className="flex items-center space-x-12 group banner-pop p-10 bg-royal-950 rounded-[3rem] border-2 border-white/10 shadow-3xl">
                 <div className="relative">
                    <div className="w-16 h-16 bg-neon-green/30 rounded-full animate-ping opacity-30"></div>
                    <div className="absolute inset-0 m-auto w-6 h-6 bg-neon-green rounded-full shadow-[0_0_30px_#10b981]"></div>
                 </div>
                 <div className="space-y-3">
                    <span className="text-xl font-black text-white uppercase tracking-[0.4em] block">Sovereign Grid Active</span>
                    <span className="text-[12px] text-slate-500 uppercase tracking-[0.4em] font-black italic block">STATUS: OPTIMAL_NODE_VERIFIED</span>
                 </div>
              </div>

              <div className="flex flex-wrap justify-center gap-8 text-[11px] font-black text-white uppercase tracking-[0.4em]">
                 {[
                   { icon: <Globe size={20} className="text-neon-blue" />, label: "ABN_76_684_189_320" },
                   { icon: <Activity size={20} className="text-neon-purple" />, label: "LATENCY_14MS" },
                   { icon: <Layers size={20} className="text-neon-green" />, label: "GRID_SYNC_8/8" }
                 ].map((hud, i) => (
                   <span key={i} className="flex items-center gap-5 bg-black px-10 py-5 rounded-2xl border-2 border-white/10 hover:border-neon-blue transition-all shadow-3xl group cursor-help">
                     {hud.icon} <span className="group-hover:text-neon-blue transition-colors">{hud.label}</span>
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