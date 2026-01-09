import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, ArrowRight, Rocket, Calendar,
  Layout, FileSearch, Radio, Sparkles,
  Fingerprint, Loader2, Globe, Volume2, ShieldCheck, Activity, Terminal, Power, AlertCircle,
  FileWarning, ShieldAlert, HeartHandshake, ClipboardCheck, History
} from 'lucide-react';
import { GoogleGenAI, Modality } from "@google/genai";
import { HeroLogoAnimation } from '../components/HeroLogoAnimation.tsx';
import { useSovereign } from '../context/SovereignContext.tsx';

function decode(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
  return bytes;
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
  }
  return buffer;
}

const VisitorIdentity = () => {
  const [name, setName] = useState<string | null>(localStorage.getItem('rcg_visitor_name'));
  const [ip, setIp] = useState<string | null>(localStorage.getItem('rcg_visitor_ip'));
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState('');
  const [isGreeting, setIsGreeting] = useState(false);
  const [handshakeStatus, setHandshakeStatus] = useState('OFFLINE');
  const [hasWoken, setHasWoken] = useState(false);
  
  const { initializeAudio, getAudioContext, stopHeartbeat } = useSovereign();

  useEffect(() => {
    if (!ip) {
      fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .then(data => {
          setIp(data.ip);
          localStorage.setItem('rcg_visitor_ip', data.ip);
        })
        .catch(() => setIp('UNTRACEABLE_NODE'));
    }
  }, [ip]);

  const speakWelcome = async (operatorName: string) => {
    setIsGreeting(true);
    setHandshakeStatus('API_RESONANCE');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Neural link established. Welcome back, ${operatorName}. As a provider-led group, we know you're drowning in paperwork. Let's initialize your sovereign systems to automate that red tape immediately.` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' }
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts[0]?.inlineData?.data;
      if (base64Audio) {
        const ctx = getAudioContext();
        if (ctx.state === 'suspended') await ctx.resume();

        setHandshakeStatus('STREAMING');
        const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(ctx.destination);
        source.onended = () => {
          setIsGreeting(false);
          setHandshakeStatus('COMPLETED');
          stopHeartbeat();
        };
        source.start();
      }
    } catch (err: any) {
      console.error("Neural Greeting Failure:", err);
      setIsGreeting(false);
      setHandshakeStatus('LINK_FAIL');
      stopHeartbeat();
    }
  };

  const handleWakeSequence = async () => {
    if (isGreeting || !name) return;
    setHandshakeStatus('HARDWARE_BOND');
    const ready = await initializeAudio();
    if (!ready) {
      setHandshakeStatus('DEVICE_DENIED');
      return;
    }
    setHasWoken(true);
    speakWelcome(name);
  };

  const handleInitialize = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isGreeting || !tempName.trim()) return;

    const finalName = tempName.trim();
    setHandshakeStatus('HARDWARE_BOND');
    const ready = await initializeAudio();
    if (!ready) {
      setHandshakeStatus('DEVICE_DENIED');
      return;
    }

    setName(finalName);
    localStorage.setItem('rcg_visitor_name', finalName);
    setIsEditing(false);
    setHasWoken(true);
    speakWelcome(finalName);
  };

  return (
    <div className="mb-4 sm:mb-8 animate-hero-reveal">
      {name && !isEditing ? (
        <div className="flex flex-col items-center gap-2 sm:gap-4">
           <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3">
              <div className="text-[8px] sm:text-[9px] font-black text-neon-blue uppercase tracking-[0.4em] opacity-40">Provider_Identity</div>
              <div className="text-[7px] sm:text-[8px] font-mono text-slate-500 bg-royal-950 px-2 py-0.5 rounded border border-white/5 uppercase tracking-widest animate-pulse">
                {ip || 'TRACING...'}
              </div>
              <div className={`flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full border border-white/5 text-[6px] sm:text-[7px] font-black uppercase tracking-widest transition-all ${
                handshakeStatus.includes('FAIL') ? 'bg-red-500/20 text-red-500' : 'text-neon-green bg-neon-green/5'
              }`}>
                <div className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${handshakeStatus.includes('FAIL') ? 'bg-red-500' : 'bg-neon-green animate-pulse'}`}></div>
                {handshakeStatus}
              </div>
           </div>
           
           <div 
             className="text-2xl sm:text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tighter flex items-center gap-3 sm:gap-4 text-center px-4 cursor-pointer hover:opacity-80 transition-opacity"
             onClick={() => !isGreeting && setIsEditing(true)}
           >
             Welcome back, <span className="text-neon-blue underline decoration-white/10 underline-offset-[8px] sm:underline-offset-[10px]">{name}.</span>
             <Fingerprint size={20} className={`text-neon-purple shrink-0 sm:w-[28px] sm:h-[28px] ${isGreeting ? 'animate-ping' : 'animate-pulse'}`} />
           </div>

           {!hasWoken && !isGreeting && (
             <div className="flex flex-col items-center gap-3 mt-2">
               <button 
                 onClick={handleWakeSequence}
                 className="px-6 py-3 sm:px-10 sm:py-5 bg-white text-black rounded-lg sm:rounded-xl font-black text-[9px] sm:text-[11px] uppercase tracking-[0.3em] flex items-center gap-4 hover:bg-neon-blue hover:text-white transition-all shadow-[0_15px_30px_rgba(0,0,0,0.4)] active:scale-95 group"
               >
                  <Power size={14} className="text-neon-purple group-hover:text-white group-hover:rotate-90 transition-transform sm:w-[16px] sm:h-[16px]" />
                  Connect with Aurelia
               </button>
             </div>
           )}

           {isGreeting && (
             <div className="flex flex-col items-center gap-3 mt-2 animate-in fade-in duration-500 px-4">
               <div className="flex items-center gap-3 sm:gap-4 px-5 py-2 sm:px-8 sm:py-3 bg-neon-purple/10 rounded-full border border-neon-purple/30 shadow-[0_0_20px_rgba(217,70,239,0.15)]">
                  <div className="flex gap-1.5">
                     <div className="w-1 h-1 bg-neon-purple rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                     <div className="w-1 h-1 bg-neon-purple rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                     <div className="w-1 h-1 bg-neon-purple rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  <div className="text-[7px] sm:text-[9px] font-black text-neon-purple uppercase tracking-[0.4em]">Transmitting Strategy</div>
               </div>
             </div>
           )}
        </div>
      ) : (
        <div className="max-w-md mx-auto bg-black/40 backdrop-blur-xl p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] border border-white/5 shadow-3xl mx-4">
          <form onSubmit={handleInitialize} className="space-y-4 sm:space-y-6">
            <div className="text-[8px] sm:text-[9px] font-black text-neon-blue uppercase tracking-[0.4em] mb-2 text-center">Identification_Protocol</div>
            <input 
              autoFocus
              disabled={isGreeting}
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="INPUT_PROVIDER_NAME..."
              className="w-full bg-royal-950 border-2 border-white/10 p-4 sm:p-6 rounded-xl sm:rounded-[1.5rem] text-center text-white font-mono text-xs sm:text-sm uppercase tracking-widest outline-none focus:border-neon-blue transition-all shadow-inner"
            />
            <button 
              type="submit" 
              disabled={isGreeting || !tempName.trim()}
              className="w-full py-4 sm:py-5 bg-white text-black font-black text-[9px] sm:text-[10px] uppercase tracking-[0.4em] rounded-lg sm:rounded-xl hover:bg-neon-blue hover:text-white transition-all flex items-center justify-center gap-3 disabled:opacity-20 shadow-3xl"
            >
              {isGreeting ? <Loader2 className="animate-spin" size={14} /> : <Zap size={14} className="text-neon-purple" />}
              {isGreeting ? 'Syncing...' : 'Join the Sovereign Grid'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const Home = () => {
  const featurePortal = [
    {
      title: "Design Future",
      subtitle: "Architect",
      icon: <Layout size={24} className="text-neon-blue" />,
      desc: "Visualize your scaling goals. Transform capacity constraints into blueprints.",
      path: "/architect",
      btnText: "Build Vision",
      accent: "border-neon-blue/20"
    },
    {
      title: "Kill Red Tape",
      subtitle: "TFix Sandbox",
      icon: <FileSearch size={24} className="text-neon-purple" />,
      desc: "Live AI scanning for compliance errors and revenue leakage.",
      path: "/sandbox",
      btnText: "Audit Scan",
      accent: "border-neon-purple/20"
    },
    {
      title: "Talk Strategy",
      subtitle: "Aurelia",
      icon: <Radio size={24} className="text-neon-green" />,
      desc: "Speak with our AI peer who understands the NDIS burden.",
      path: "/aurelia",
      btnText: "Conversation",
      accent: "border-neon-green/20"
    }
  ];

  const painNodes = [
    { icon: <FileWarning className="text-neon-red" size={18} />, title: "Exhaustion", desc: "Constant policy shifts creating a paperwork death-spiral." },
    { icon: <ShieldAlert className="text-neon-purple" size={18} />, title: "The Shadow", desc: "Fear of documentation gaps triggering clawbacks." },
    { icon: <ClipboardCheck className="text-neon-blue" size={18} />, title: "Legacy Debt", desc: "Manual systems breaking under the weight of growth." }
  ];

  return (
    <div className="flex flex-col bg-transparent overflow-x-hidden min-h-screen px-4 sm:px-12 lg:px-20 font-sans relative">
      <section className="relative min-h-[50vh] sm:min-h-[60vh] flex flex-col justify-center items-center text-center pt-24 sm:pt-32 pb-8 sm:pb-12 z-10">
        <div className="max-w-5xl mx-auto w-full">
          <VisitorIdentity />
          <div className="mt-6 sm:mt-8 animate-hero-reveal delay-200 px-4">
             <div className="inline-flex items-center gap-3 sm:gap-5 px-6 py-2.5 sm:px-8 sm:py-3 bg-black/40 backdrop-blur-md rounded-xl border border-white/5 shadow-3xl">
                <div className="flex items-center gap-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse"></div>
                   <span className="text-[8px] sm:text-[9px] text-slate-500 font-black uppercase tracking-[0.4em]">Grid_DNA_Verified</span>
                </div>
                <div className="hidden sm:block w-[1px] h-3 bg-white/10"></div>
                <span className="text-[8px] sm:text-[9px] text-white font-black uppercase tracking-[0.3em]">Engineered by providers, for heroes</span>
             </div>
          </div>
        </div>
      </section>

      {/* Empathy Hero Node */}
      <section className="py-12 sm:py-16 relative z-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
             <div className="space-y-6 sm:space-y-8 animate-hero-reveal">
                <div className="p-3 bg-royal-950 border border-white/10 rounded-xl w-fit shadow-2xl">
                   <HeartHandshake size={20} className="text-neon-purple" />
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tighter leading-[0.9]">
                   We carried the <br/><span className="text-neon-blue italic">weight too.</span>
                </h2>
                <div className="space-y-3 sm:space-y-4 text-base sm:text-lg text-slate-400 font-bold italic leading-relaxed border-l-4 border-neon-purple pl-6 sm:pl-8">
                   <p>"Royal Care Group didn't start in a lab. We started in regional SIL houses."</p>
                   <p className="text-white">We built the tech we needed to thrive.</p>
                </div>
             </div>
             
             <div className="grid grid-cols-1 gap-3 sm:gap-4">
                {painNodes.map((node, i) => (
                  <div key={i} className="p-5 sm:p-6 bg-black/40 border border-white/5 rounded-xl sm:rounded-2xl group hover:border-white transition-all shadow-xl flex items-center gap-4 sm:gap-6">
                     <div className="p-3 sm:p-4 bg-royal-950 rounded-xl border border-white/10 group-hover:scale-110 transition-transform">
                        {node.icon}
                     </div>
                     <div>
                        <h4 className="text-white font-black uppercase text-[8px] sm:text-[9px] tracking-widest mb-0.5">{node.title}</h4>
                        <p className="text-slate-500 text-[11px] sm:text-[12px] font-bold italic group-hover:text-slate-300 transition-colors">"{node.desc}"</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 px-4">
          {featurePortal.map((item, i) => (
            <Link 
              to={item.path} 
              key={i}
              className={`p-6 sm:p-10 bg-black/80 border-[0.5px] ${item.accent} group hover:border-white transition-all duration-700 flex flex-col h-full shadow-2xl rounded-[1.5rem] sm:rounded-[2rem]`}
            >
              <div className="mb-6 p-4 sm:p-5 bg-royal-950/80 rounded-xl border border-white/5 w-fit group-hover:scale-110 transition-transform shadow-inner">
                {item.icon}
              </div>
              <div className="space-y-2 sm:space-y-3 mb-6 flex-grow">
                <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tighter leading-none">
                  {item.title}
                </h3>
                <div className="text-[7px] sm:text-[8px] font-black text-slate-500 uppercase tracking-[0.4em] font-mono">
                  {item.subtitle}
                </div>
                <p className="text-slate-300 text-xs sm:text-sm font-bold leading-relaxed italic opacity-80 group-hover:opacity-100 transition-opacity">
                  "{item.desc}"
                </p>
              </div>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between group">
                <span className="text-white font-black text-[9px] uppercase tracking-[0.4em]">{item.btnText}</span>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white text-black rounded-full flex items-center justify-center group-hover:bg-neon-blue group-hover:text-white transition-all">
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-12 sm:py-16 relative z-10 border-t border-white/5 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4 flex flex-col items-center">
             <div className="circuit-capsule border-[0.5px] border-neon-purple/50 text-[7px] sm:text-[8px] px-6 py-2 inline-flex bg-black shadow-2xl items-center gap-3">
                <Sparkles size={12} className="text-neon-purple animate-pulse" /> Unified NDIS Infrastructure
             </div>
             <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tighter leading-[0.9] max-w-2xl">
                Automate debt <br/><span className="text-neon-purple italic">and return to delivery.</span>
             </h2>
             <Link 
               to="/services" 
               className="px-8 py-4 sm:px-12 sm:py-6 bg-white text-black font-black text-[9px] sm:text-[11px] tracking-[0.5em] uppercase hover:scale-105 active:scale-95 shadow-3xl transition-all mt-4 rounded-lg sm:rounded-xl"
             >
                Explore Nodes
             </Link>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 relative z-10 border-t border-white/5 px-4">
        <div className="max-w-6xl mx-auto w-full">
           <div className="bg-gradient-to-b from-black/90 to-royal-950/40 backdrop-blur-3xl border-[0.5px] border-neon-blue/20 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-16 relative overflow-hidden shadow-2xl group flex flex-col items-center text-center">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-12 opacity-[0.01] pointer-events-none">
                <Rocket size={300} className="sm:w-[400px] sm:h-[400px] text-neon-blue -rotate-12" />
              </div>
              <div className="relative z-10 space-y-6 sm:space-y-10 max-w-3xl w-full">
                 <div className="flex flex-col items-center gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-neon-blue/10 border border-neon-blue/20 rounded-lg w-fit">
                       <History size={16} className="text-neon-blue" />
                    </div>
                    <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.6em] text-neon-blue/80">The 2026 Convergence</span>
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white uppercase tracking-tighter leading-[0.85]">
                      Unified <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-purple">SYNK OS.</span>
                    </h2>
                 </div>
                 <div className="w-full flex justify-center py-2 sm:py-4 scale-75 sm:scale-90">
                    <HeroLogoAnimation />
                 </div>
                 <Link to="/tech" className="text-slate-400 hover:text-white transition-all text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3">
                   View Operational Tech Suite <ArrowRight size={12} />
                 </Link>
              </div>
           </div>
        </div>
      </section>
      <div className="h-12 sm:h-16 w-full"></div>
    </div>
  );
};

export default Home;