
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
      // Corrected TTS model and nested speech config
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
    <div className="mb-12 animate-hero-reveal">
      {name && !isEditing ? (
        <div className="flex flex-col items-center gap-6">
           <div className="flex items-center gap-3">
              <div className="text-[10px] font-black text-neon-blue uppercase tracking-[0.6em] opacity-40">Provider_Identity</div>
              <div className="text-[8px] font-mono text-slate-500 bg-royal-950 px-2 py-0.5 rounded border border-white/5 uppercase tracking-widest animate-pulse">
                {ip || 'TRACING_NODE...'}
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/5 text-[7px] font-black uppercase tracking-widest transition-all ${
                handshakeStatus.includes('FAIL') ? 'bg-red-500/20 text-red-500' : 'text-neon-green bg-neon-green/5'
              }`}>
                <div className={`w-1.5 h-1.5 rounded-full ${handshakeStatus.includes('FAIL') ? 'bg-red-500' : 'bg-neon-green animate-pulse'}`}></div>
                {handshakeStatus}
              </div>
           </div>
           
           <div 
             className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter flex items-center gap-5 text-center px-4 cursor-pointer hover:opacity-80 transition-opacity"
             onClick={() => !isGreeting && setIsEditing(true)}
           >
             Welcome back, <span className="text-neon-blue underline decoration-white/10 underline-offset-[12px]">{name}.</span>
             <Fingerprint size={32} className={`text-neon-purple shrink-0 ${isGreeting ? 'animate-ping' : 'animate-pulse'}`} />
           </div>

           {!hasWoken && !isGreeting && (
             <div className="flex flex-col items-center gap-4 mt-4">
               <button 
                 onClick={handleWakeSequence}
                 className="px-12 py-6 bg-white text-black rounded-2xl font-black text-[12px] uppercase tracking-[0.4em] flex items-center gap-5 hover:bg-neon-blue hover:text-white transition-all shadow-[0_30px_60px_rgba(0,0,0,0.6)] active:scale-95 group"
               >
                  <Power size={18} className="text-neon-purple group-hover:text-white group-hover:rotate-90 transition-transform" />
                  Connect with Aurelia
               </button>
               <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest opacity-40 italic">One handshake to bridge the tech gap.</span>
             </div>
           )}

           {isGreeting && (
             <div className="flex flex-col items-center gap-4 mt-4 animate-in fade-in duration-500">
               <div className="flex items-center gap-5 px-10 py-4 bg-neon-purple/10 rounded-full border border-neon-purple/30 shadow-[0_0_30px_rgba(217,70,239,0.15)]">
                  <div className="flex gap-2">
                     <div className="w-1.5 h-1.5 bg-neon-purple rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                     <div className="w-1.5 h-1.5 bg-neon-purple rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                     <div className="w-1.5 h-1.5 bg-neon-purple rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  <div className="text-[10px] font-black text-neon-purple uppercase tracking-[0.6em]">Transmitting Provider Strategy</div>
                  <Volume2 size={16} className="text-neon-purple animate-pulse" />
               </div>
             </div>
           )}
        </div>
      ) : (
        <div className="max-w-md mx-auto bg-black/40 backdrop-blur-xl p-10 rounded-[3rem] border border-white/5 shadow-3xl">
          <form onSubmit={handleInitialize} className="space-y-8">
            <div className="text-[10px] font-black text-neon-blue uppercase tracking-[0.6em] mb-4 text-center">Identification_Protocol</div>
            <input 
              autoFocus
              disabled={isGreeting}
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="INPUT_PROVIDER_NAME..."
              className="w-full bg-royal-950 border-2 border-white/10 p-7 rounded-[2rem] text-center text-white font-mono text-base uppercase tracking-widest outline-none focus:border-neon-blue transition-all shadow-inner"
            />
            <button 
              type="submit" 
              disabled={isGreeting || !tempName.trim()}
              className="w-full py-6 bg-white text-black font-black text-[11px] uppercase tracking-[0.5em] rounded-2xl hover:bg-neon-blue hover:text-white transition-all flex items-center justify-center gap-4 disabled:opacity-20 shadow-3xl"
            >
              {isGreeting ? <Loader2 className="animate-spin" size={16} /> : <Zap size={16} className="text-neon-purple" />}
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
      title: "Design Your Future",
      subtitle: "Facility Architect",
      icon: <Layout size={32} className="text-neon-blue" />,
      desc: "Visualize your scaling goals. We transform your capacity constraints into high-fidelity blueprints.",
      path: "/architect",
      btnText: "Build Your Vision",
      accent: "border-neon-blue/20"
    },
    {
      title: "Kill the Red Tape",
      subtitle: "TFix Logic Sandbox",
      icon: <FileSearch size={32} className="text-neon-purple" />,
      desc: "Upload a document and witness live AI scanning for compliance errors and revenue leakage.",
      path: "/sandbox",
      btnText: "Start Audit Scan",
      accent: "border-neon-purple/20"
    },
    {
      title: "Talk Strategy",
      subtitle: "The Aurelia Interface",
      icon: <Radio size={32} className="text-neon-green" />,
      desc: "Speak with our AI peer who understands the burden of NDIS compliance. Real talk, real solutions.",
      path: "/aurelia",
      btnText: "Start Conversation",
      accent: "border-neon-green/20"
    }
  ];

  const painNodes = [
    { icon: <FileWarning className="text-neon-red" />, title: "Administrative Exhaustion", desc: "Constant policy shifts creating a paperwork death-spiral for front-line managers." },
    { icon: <ShieldAlert className="text-neon-purple" />, title: "The Audit Shadow", desc: "The persistent fear of documentation gaps triggering a NDIS Commission clawback." },
    { icon: <ClipboardCheck className="text-neon-blue" />, title: "Legacy Debt", desc: "Manual systems breaking under the weight of growth. It's time to build a sovereign OS." }
  ];

  return (
    <div className="flex flex-col bg-transparent overflow-x-hidden min-h-screen selection:bg-neon-blue/20 px-4 sm:px-12 lg:px-20 xl:px-24 font-sans relative">
      <section className="relative min-h-[75vh] flex flex-col justify-center items-center text-center pt-40 pb-20 z-10">
        <div className="max-w-6xl mx-auto w-full">
          <VisitorIdentity />
          <div className="mt-12 animate-hero-reveal delay-200">
             <div className="inline-flex items-center gap-6 px-10 py-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/5 shadow-3xl">
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse shadow-[0_0_10px_#10b981]"></div>
                   <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em]">Grid_DNA_Verified</span>
                </div>
                <div className="w-[1px] h-4 bg-white/10"></div>
                <span className="text-[10px] text-white font-black uppercase tracking-[0.4em]">Engineered by former providers, for current heroes</span>
             </div>
          </div>
        </div>
      </section>

      {/* Empathy Hero Node */}
      <section className="py-24 relative z-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
             <div className="space-y-10 animate-hero-reveal">
                <div className="p-4 bg-royal-950 border border-white/10 rounded-2xl w-fit shadow-2xl">
                   <HeartHandshake size={32} className="text-neon-purple" />
                </div>
                <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter leading-[0.85]">
                   We carried the <br/><span className="text-neon-blue italic">weight too.</span>
                </h2>
                <div className="space-y-6 text-xl text-slate-400 font-bold italic leading-relaxed border-l-4 border-neon-purple pl-10">
                   <p>"Royal Care Group didn't start in a tech lab. We started in regional SIL houses, delivery meetings, and commission audits."</p>
                   <p className="text-white">We built the tech we needed to survive. Now we give it to you to help you thrive.</p>
                </div>
             </div>
             
             <div className="grid grid-cols-1 gap-6">
                {painNodes.map((node, i) => (
                  <div key={i} className="orbital-tile p-8 bg-black/40 border border-white/5 rounded-3xl group hover:border-white transition-all shadow-2xl flex items-center gap-8">
                     <div className="p-5 bg-royal-950 rounded-2xl border border-white/10 group-hover:scale-110 transition-transform">
                        {node.icon}
                     </div>
                     <div>
                        <h4 className="text-white font-black uppercase text-xs tracking-widest mb-2">{node.title}</h4>
                        <p className="text-slate-500 text-[14px] font-bold italic group-hover:text-slate-300 transition-colors">"{node.desc}"</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {featurePortal.map((item, i) => (
            <Link 
              to={item.path} 
              key={i}
              className={`orbital-tile p-12 bg-black/80 border-[0.5px] ${item.accent} group hover:border-white transition-all duration-700 flex flex-col h-full shadow-[0_40px_80px_rgba(0,0,0,0.8)] rounded-[3rem]`}
            >
              <div className="mb-10 p-6 bg-royal-950/80 rounded-2xl border border-white/5 w-fit group-hover:scale-110 transition-transform shadow-inner">
                {item.icon}
              </div>
              <div className="space-y-4 mb-10 flex-grow">
                <h3 className="text-3xl font-display font-black text-white uppercase tracking-tighter leading-none group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] font-mono">
                  {item.subtitle}
                </div>
                <p className="text-slate-300 text-lg font-bold leading-relaxed italic opacity-80 group-hover:opacity-100 transition-opacity">
                  "{item.desc}"
                </p>
              </div>
              <div className="pt-8 border-t border-white/5 flex items-center justify-between group">
                <span className="text-white font-black text-[11px] uppercase tracking-[0.5em]">{item.btnText}</span>
                <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center group-hover:bg-neon-blue group-hover:text-white transition-all shadow-xl">
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-24 relative z-10 border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div className="space-y-6 flex flex-col items-center">
             <div className="circuit-capsule border-[0.5px] border-neon-purple/50 text-[9px] px-8 py-3 inline-flex bg-black shadow-2xl items-center gap-4">
                <Sparkles size={14} className="text-neon-purple animate-pulse" /> Unified NDIS Infrastructure
             </div>
             <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter leading-[0.9] max-w-4xl">
                Automate your administrative debt <br/><span className="text-neon-purple italic">and return to delivery.</span>
             </h2>
             <Link 
               to="/services" 
               className="slim-orbital-btn px-16 py-7 bg-white text-black font-black text-[12px] tracking-[0.6em] uppercase hover:scale-105 active:scale-95 shadow-3xl transition-all mt-8"
             >
                Explore Deployment Nodes
             </Link>
          </div>
        </div>
      </section>

      <section className="py-24 relative z-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto w-full">
           <div className="bg-gradient-to-b from-black/90 to-royal-950/40 backdrop-blur-3xl border-[0.5px] border-neon-blue/20 rounded-[4rem] p-12 lg:p-20 relative overflow-hidden shadow-2xl group flex flex-col items-center text-center">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-12 opacity-[0.02] group-hover:opacity-[0.04] transition-all duration-1000 pointer-events-none">
                <Rocket size={600} className="text-neon-blue -rotate-12" />
              </div>
              <div className="relative z-10 space-y-12 max-w-4xl w-full">
                 <div className="flex flex-col items-center gap-6">
                    <div className="p-4 bg-neon-blue/10 border border-neon-blue/20 rounded-xl w-fit">
                       <History size={24} className="text-neon-blue" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.8em] text-neon-blue/80">The 2026 Convergence</span>
                    <h2 className="text-5xl md:text-8xl font-display font-black text-white uppercase tracking-tighter leading-[0.85]">
                      Unified <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-purple">SYNK OS.</span>
                    </h2>
                 </div>
                 <div className="w-full flex justify-center py-6">
                    <div className="scale-75 md:scale-90 lg:scale-100 transform-gpu">
                        <HeroLogoAnimation />
                    </div>
                 </div>
                 <Link to="/tech" className="text-slate-400 hover:text-white transition-all text-[11px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4">
                   View Operational Tech Suite <ArrowRight size={14} />
                 </Link>
              </div>
           </div>
        </div>
      </section>
      <div className="h-24 w-full"></div>
    </div>
  );
};

export default Home;
