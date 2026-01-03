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
    <div ref={containerRef} className="flex flex-col bg-[#334155] overflow-x-hidden min-h-screen selection:bg-neon-blue/30 selection:text-white px-4 sm:px-8 lg:px-16 xl:px-24 font-sans font-bold relative">
      
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
      <section className="relative min-h-[85vh] flex flex-col justify-center pt-24 lg:pt-32 pb-16 overflow-hidden z-10">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 w-full">
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6 animate-hero-reveal">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl xl:text-7xl font-display font-black text-white leading-[0.9] uppercase heading-wow drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)]">
                  Structural<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-purple drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]">Intelligence.</span>
                </h1>

                <div className="max-w-lg relative group banner-pop bg-black p-6 lg:p-8 shadow-2xl border-2 border-white/10">
                  <DecodingText 
                    text="Architecting the next generation of Australia's NDIS grid through proprietary structural intelligence and high-fidelity binary logic."
                    className="text-base md:text-lg lg:text-xl text-white font-black leading-tight tracking-wide opacity-100"
                    stagger={6}
                  />
                </div>
              </div>
              
              <div className="hidden lg:flex flex-row gap-4 w-full max-w-lg">
                <Link to="/services" className="slim-orbital-btn flex-1 px-4 py-4 text-white font-black text-[9px] tracking-[0.4em] uppercase transition-all flex items-center justify-center bg-black border-2 border-neon-purple hover:scale-105 active:scale-95">
                  Consultancy <ArrowRight className="ml-2 w-3.5 h-3.5 text-neon-purple" />
                </Link>
                <Link to="/tech" className="slim-orbital-btn flex-1 px-4 py-4 text-white font-black text-[9px] tracking-[0.4em] uppercase border-2 border-neon-blue transition-all flex items-center justify-center bg-black hover:scale-105 active:scale-95">
                  <span className="text-neon-blue">SYNK Tech</span> <ArrowRight className="ml-2 w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative flex flex-col items-center justify-center animate-hero-reveal">
               <div className="relative z-10 flex flex-col items-center w-full">
                  <div className="scale-[0.55] md:scale-[0.7] lg:scale-[0.75] xl:scale-[0.8] transform-gpu">
                    <HeroLogoAnimation />
                  </div>
                  <div className="flex lg:hidden flex-col gap-3 w-full max-w-[240px] mt-4">
                    <Link to="/services" className="slim-orbital-btn px-4 py-4 text-white font-black text-[9px] tracking-[0.4em] uppercase transition-all flex items-center justify-center bg-black border-2 border-neon-purple">
                      Consultancy <ArrowRight className="ml-2 w-3.5 h-3.5 text-neon-purple" />
                    </Link>
                    <Link to="/tech" className="slim-orbital-btn px-4 py-4 text-white font-black text-[9px] tracking-[0.4em] uppercase border-2 border-neon-blue transition-all flex items-center justify-center bg-black">
                      <span className="text-neon-blue">SYNK Suite</span> <ArrowRight className="ml-2 w-3.5 h-3.5" />
                    </Link>
                  </div>
               </div>
            </div>
          </div>

          <div className="w-full flex justify-center mt-12 lg:mt-16 animate-hero-reveal banner-pop bg-black/60 p-4 lg:p-6 border-2 border-white/10 shadow-3xl">
             <div className="scale-90"><LaunchCountdown /></div>
          </div>
        </div>
      </section>

      {/* --- OPERATIONAL AUDIT INTERFACE --- */}
      <section className="py-16 lg:py-24 relative z-10">
        <div className="max-w-6xl mx-auto w-full">
          <div className="orbital-tile p-6 md:p-12 bg-black border-2 border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
               <div className="lg:col-span-5 space-y-6">
                  <div className="circuit-capsule border-2 border-neon-purple shadow-[0_0_30px_rgba(217,70,239,0.2)] px-4 py-2 text-[8px]">
                    <Microscope size={14} className="mr-3 text-neon-purple animate-pulse" /> Logic Diagnostics
                  </div>
                  <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase leading-[0.95] heading-wow">
                    Structural<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-purple drop-shadow-[0_0_35px_rgba(255,255,255,0.3)]">Audit.</span>
                  </h2>
                  <h3 className="text-base lg:text-lg text-white font-black leading-tight border-l-4 border-neon-purple pl-4 italic">
                    "Input organizational constraints to manifest structural assessments."
                  </h3>
               </div>

               <div className="lg:col-span-7">
                  <div className="glass bg-royal-950 border-2 border-white/10 rounded-[2rem] p-6 md:p-10 shadow-3xl relative overflow-hidden banner-pop">
                     {!auditResult ? (
                       <form onSubmit={handleQuickAudit} className="space-y-6 relative z-10">
                         <div className="space-y-2">
                           <label className="text-[9px] font-black text-white uppercase tracking-[0.4em] ml-1 flex items-center gap-3">
                             <Terminal size={14} className="text-neon-blue" /> Diagnostic Input
                           </label>
                           <textarea 
                             value={auditInput}
                             onChange={(e) => setAuditInput(e.target.value)}
                             placeholder="Describe primary organizational debt..."
                             className="w-full bg-black border-2 border-white/10 rounded-[1rem] p-4 lg:p-6 text-white focus:border-neon-blue outline-none transition-all min-h-[140px] font-black text-sm resize-none shadow-inner placeholder:text-slate-800"
                           />
                         </div>
                         <button 
                            type="submit"
                            disabled={isAuditing || !auditInput.trim()}
                            className="slim-orbital-btn w-full py-4 lg:py-5 bg-white text-black font-black text-[9px] lg:text-[10px] tracking-[0.5em] uppercase flex items-center justify-center gap-4 shadow-3xl disabled:opacity-40"
                         >
                            {isAuditing ? <Loader2 className="animate-spin" size={20} /> : <Zap size={20} className="text-neon-purple" />}
                            {isAuditing ? 'Analyzing...' : 'Initialize Analysis'}
                         </button>
                       </form>
                     ) : (
                       <div className="space-y-6 animate-in fade-in zoom-in-95 relative z-10 text-center">
                          <div className="text-white font-black leading-relaxed text-base lg:text-lg bg-black p-6 lg:p-8 rounded-[1.5rem] border-2 border-white/10 shadow-inner italic break-words">
                            <DecodingText text={auditResult} stagger={2} className="text-white font-black" />
                          </div>
                          <button onClick={() => setAuditResult(null)} className="px-8 py-3 bg-white/10 border-2 border-white/20 hover:border-neon-blue hover:text-neon-blue rounded-xl text-[9px] font-black uppercase tracking-[0.3em] transition-all">New Sequence</button>
                       </div>
                     )}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CORE PROTOCOL BENTO GRID --- */}
      <section className="py-16 lg:py-24 relative overflow-hidden z-10">
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="text-center mb-12 lg:mb-16 banner-pop bg-black p-8 lg:p-12 rounded-[2.5rem] border-2 border-white/10 shadow-3xl">
            <div className="circuit-capsule border-2 border-neon-blue shadow-[0_0_30px_rgba(6,182,212,0.2)] mb-6 text-[8px]">
              <Globe size={14} className="mr-3 text-neon-blue animate-pulse" /> National Grid Node
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase leading-[0.95] mb-6 heading-wow">
              Core<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-purple drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]">Protocol.</span>
            </h2>
            <p className="text-white mt-4 max-w-2xl mx-auto text-[10px] md:text-xs font-black uppercase tracking-[0.4em] leading-loose">
              Proprietary units architected for national scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { icon: <Database size={36} className="text-neon-blue" />, title: "Data Sovereignty", desc: "High-security repositories with multi-layer encryption for absolute control." },
              { icon: <ShieldCheck size={36} className="text-neon-purple" />, title: "Policy Logic", desc: "Algorithmic validation against NDIS Practice Standards in real-time." },
              { icon: <Network size={36} className="text-neon-blue" />, title: "Unified Grid", desc: "Connecting Boardroom strategy with national operations seamlessly." },
            ].map((card, i) => (
              <div 
                key={i} 
                className="orbital-tile group min-h-[350px] lg:min-h-[420px] flex flex-col border-2 border-white/15 bg-black shadow-3xl hover:border-neon-blue transition-all duration-700"
              >
                <div className="p-8 lg:p-10 h-full flex flex-col relative overflow-hidden">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-royal-950 border-2 border-white/10 flex items-center justify-center mb-8 lg:mb-12 shadow-inner group-hover:scale-110 group-hover:border-neon-blue transition-all duration-1000 relative rounded-xl lg:rounded-2xl">
                    <div className="absolute inset-0 bg-neon-blue/40 blur-3xl opacity-0 group-hover:opacity-100"></div>
                    {card.icon}
                  </div>
                  <h3 className="text-xl lg:text-2xl font-display font-black text-white mb-4 uppercase tracking-tighter leading-none group-hover:text-neon-blue transition-colors">{card.title}</h3>
                  <p className="text-sm lg:text-base text-white leading-relaxed font-black mb-8 flex-grow italic opacity-90">"{card.desc}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- NEURAL SCOUT VOICE LINK --- */}
      <section className="py-16 lg:py-24 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center w-full">
          <div className="lg:col-span-5 space-y-8 banner-pop bg-black p-8 lg:p-10 rounded-[2.5rem] border-2 border-white/10 shadow-3xl">
             <div className="space-y-6">
                <div className="circuit-capsule border-2 border-neon-purple shadow-[0_0_30px_rgba(217,70,239,0.2)] text-[8px]">
                  <Zap size={16} className="mr-3 text-neon-purple animate-pulse" /> Neural Voice Link
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase leading-[0.95] heading-wow">
                  Neural<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-pink-500 drop-shadow-[0_0_40px_rgba(217,70,239,0.5)]">Scout.</span>
                </h2>
                <p className="text-lg lg:text-xl text-white font-black leading-tight border-l-4 border-neon-purple pl-6 italic">
                  "Direct uplink to the NDIS Intelligence engine."
                </p>
             </div>
          </div>
          
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
             <div className="relative group w-full max-w-lg transform-gpu">
               <div className="absolute -inset-8 bg-neon-purple/[0.2] blur-[80px] rounded-full animate-pulse opacity-30"></div>
               <div className="scale-90 lg:scale-95 w-full"><LiveVoiceAssistant /></div>
             </div>
          </div>
        </div>
      </section>

      {/* --- STATS BANNER --- */}
      <section className="py-12 lg:py-16 border-2 border-white/10 relative z-10 bg-black banner-pop rounded-[2rem] lg:rounded-[2.5rem] mx-2 lg:mx-4 overflow-hidden mb-16 lg:mb-24">
        <div className="max-w-6xl mx-auto w-full relative z-10 px-4 lg:px-6">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12">
             {[
               { val: "v10.12", label: "Protocol", icon: <Command size={18} className="text-neon-blue" /> },
               { val: "99.9%", label: "Uptime", icon: <Activity size={18} className="text-neon-purple" /> },
               { val: "100%", label: "Audit Pass", icon: <ShieldCheck size={18} className="text-neon-green" /> }
             ].map((stat, i) => (
               <div key={stat.label} className="space-y-3 group orbital-tile p-5 lg:p-6 bg-black hover:bg-royal-950 transition-all border-none transform-gpu">
                 <div className="flex items-center gap-4">
                   <span className="p-2.5 bg-royal-950 rounded-lg group-hover:scale-110 transition-transform shadow-2xl border-2 border-white/5">{stat.icon}</span>
                   <div className="text-xl md:text-2xl font-display font-black text-white tracking-tighter group-hover:text-neon-blue">{stat.val}</div>
                 </div>
                 <div className="text-transparent font-black uppercase tracking-[0.4em] leading-none pl-1 text-[8px]" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>{stat.label}</div>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* FOOTER TRANSITION SPACING */}
      <div className="h-12 w-full bg-transparent"></div>
    </div>
  );
};

export default Home;