import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, ArrowRight, Rocket, Layout, FileSearch, Radio, Sparkles,
  ShieldCheck, HeartHandshake, 
  ClipboardCheck, History, Boxes, Loader2, Volume2, Terminal
} from 'lucide-react';
import { HeroLogoAnimation } from '../components/HeroLogoAnimation.tsx';
import { useSovereign } from '../context/SovereignContext.tsx';
import { GoogleGenAI, Modality } from "@google/genai";

// Helper for PCM decoding
async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const alignedBuffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
  const length = Math.floor(alignedBuffer.byteLength / 2);
  const dataInt16 = new Int16Array(alignedBuffer, 0, length);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
  return bytes;
}

const Home = () => {
  const { 
    audioReady, initializeAudio, getAudioContext, 
    setIsThinking, setIsWelcomePlaying, setWelcomeAnalyser,
    stopHeartbeat
  } = useSovereign();
  const [isTestingVoice, setIsTestingVoice] = useState(false);
  
  const handleVoiceTest = async () => {
    if (isTestingVoice) return;
    
    // CRITICAL: Immediately initialize audio on the click event to capture User Gesture
    const success = await initializeAudio();
    if (!success) {
      alert("Hardware Blocked: Browser rejected audio context initialization. Ensure site permissions allow audio.");
      return;
    }

    setIsTestingVoice(true);
    setIsThinking(true);

    try {
      const ctx = getAudioContext();
      
      // CALL API
      if (!process.env.API_KEY) throw new Error("API_KEY_MISSING");

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: "Neural link established. Welcome to the Royal Care Group live environment. Systemizing success through binary logic." }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' }
            },
          },
        },
      });

      let base64Audio = null;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData?.data) {
            base64Audio = part.inlineData.data;
            break;
          }
        }
      }

      if (base64Audio) {
        const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
        
        // Setup Visualizer Node
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 1024;
        setWelcomeAnalyser(analyser);
        setIsWelcomePlaying(true);

        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(analyser);
        analyser.connect(ctx.destination);
        
        source.onended = () => {
          setIsTestingVoice(false);
          setIsThinking(false);
          setIsWelcomePlaying(false);
          setWelcomeAnalyser(null);
          stopHeartbeat();
        };
        source.start(0);
      } else {
        throw new Error("EMPTY_PAYLOAD");
      }
    } catch (err: any) {
      console.error("Voice test failed:", err);
      setIsTestingVoice(false);
      setIsThinking(false);
      setIsWelcomePlaying(false);
      setWelcomeAnalyser(null);
      
      if (err.message === "API_KEY_MISSING") {
        alert("Neural Error: API Key is not configured for this environment.");
      } else {
        alert("Neural Link Error: The system could not synthesize audio. Check your connection to the grid.");
      }
    }
  };

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
    { icon: <History className="text-neon-red" size={18} />, title: "Exhaustion", desc: "Constant policy shifts creating a paperwork death-spiral." },
    { icon: <ShieldCheck className="text-neon-purple" size={18} />, title: "The Shadow", desc: "Fear of documentation gaps triggering clawbacks." },
    { icon: <ClipboardCheck className="text-neon-blue" size={18} />, title: "Legacy Debt", desc: "Manual systems breaking under the weight of growth." }
  ];

  return (
    <div className="flex flex-col bg-transparent overflow-x-hidden min-h-screen px-4 sm:px-12 lg:px-20 font-sans relative">
      <section className="relative min-h-[50vh] sm:min-h-[60vh] flex flex-col justify-center items-center text-center pt-24 sm:pt-32 pb-8 sm:pb-12 z-10">
        <div className="max-w-5xl mx-auto w-full animate-hero-reveal">
          
          <div className="flex flex-col items-center gap-6 mb-8">
             <div className="flex items-center gap-4 px-4 py-2 bg-royal-950/80 border border-white/10 rounded-full shadow-inner">
                <div className={`w-2 h-2 rounded-full ${audioReady ? 'bg-neon-green animate-pulse shadow-[0_0_10px_#10b981]' : 'bg-slate-700'}`}></div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">
                  {audioReady ? 'Grid_Connection_Nominal' : 'Awaiting_Uplink_Authorization'}
                </span>
             </div>

             <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-black text-white uppercase tracking-tighter leading-none max-w-4xl">
               Structural <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-purple">Intelligence.</span>
             </h1>

             {/* VOICE TEST BUTTON NODE */}
             <div className="mt-4">
                <button 
                  onClick={handleVoiceTest}
                  disabled={isTestingVoice}
                  className="group flex items-center gap-4 px-8 py-4 bg-white/5 border-2 border-white/10 rounded-2xl hover:border-neon-blue transition-all active:scale-95 disabled:opacity-50"
                >
                  {isTestingVoice ? (
                    <Loader2 size={18} className="text-neon-blue animate-spin" />
                  ) : (
                    <Volume2 size={18} className="text-neon-blue group-hover:animate-bounce" />
                  )}
                  <span className="text-white font-black text-[10px] uppercase tracking-[0.3em]">
                    {isTestingVoice ? 'Initiating Link...' : 'Welcome, say hi now'}
                  </span>
                </button>
             </div>

             <div className="flex items-center gap-6 mt-4">
                <div className="h-[1px] w-12 bg-white/10"></div>
                <p className="text-[10px] sm:text-[12px] text-slate-500 font-black uppercase tracking-[0.5em] italic">
                   Systematizing Your NDIS Knowledge
                </p>
                <div className="h-[1px] w-12 bg-white/10"></div>
             </div>
          </div>

          <div className="mt-10 sm:mt-12 delay-200">
             <div className="inline-flex items-center gap-3 sm:gap-6 px-8 py-3.5 bg-black/40 backdrop-blur-md rounded-2xl border border-white/5 shadow-3xl">
                <div className="flex items-center gap-3">
                   <Boxes size={14} className="text-neon-blue" />
                   <span className="text-[9px] text-slate-500 font-black uppercase tracking-[0.4em]">Node_Grid_Live</span>
                </div>
                <div className="w-[1px] h-4 bg-white/10"></div>
                <span className="text-[9px] text-white font-black uppercase tracking-[0.3em] flex items-center gap-3">
                  <ShieldCheck size={12} className="text-neon-purple" />
                  National NDIS Technology Division
                </span>
             </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 relative z-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20 items-center">
             <div className="space-y-8 animate-hero-reveal">
                <div className="p-4 bg-royal-950 border border-white/10 rounded-2xl w-fit shadow-2xl">
                   <HeartHandshake size={24} className="text-neon-purple" />
                </div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-white uppercase tracking-tighter leading-[0.9]">
                   We carried the <br/><span className="text-neon-blue italic">weight too.</span>
                </h2>
                <div className="space-y-4 sm:space-y-6 text-lg sm:text-xl text-slate-400 font-bold italic leading-relaxed border-l-4 border-neon-purple pl-8 sm:pl-10">
                   <p>"Royal Care Group started in SIL houses, fighting the manual red tape we now automate for national providers."</p>
                   <p className="text-white">Built by providers, for providers.</p>
                </div>
             </div>
             
             <div className="grid grid-cols-1 gap-4 sm:gap-6">
                {painNodes.map((node, i) => (
                  <div key={i} className="p-6 sm:p-8 bg-black/40 border border-white/5 rounded-2xl sm:rounded-3xl group hover:border-white transition-all duration-500 shadow-2xl flex items-center gap-6 sm:gap-10">
                     <div className="p-4 sm:p-5 bg-royal-950 rounded-2xl border border-white/10 group-hover:scale-110 group-hover:border-neon-blue transition-all">
                        {node.icon}
                     </div>
                     <div>
                        <h4 className="text-white font-black uppercase text-[9px] sm:text-[10px] tracking-[0.3em] mb-1">{node.title}</h4>
                        <p className="text-slate-500 text-[13px] sm:text-[14px] font-bold italic group-hover:text-slate-300 transition-colors">"{node.desc}"</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 px-4">
          {featurePortal.map((item, i) => (
            <Link 
              to={item.path} 
              key={i}
              className={`p-8 sm:p-12 bg-black/80 border-[0.5px] ${item.accent} group hover:border-white transition-all duration-700 flex flex-col h-full shadow-3xl rounded-[2rem] sm:rounded-[3rem]`}
            >
              <div className="mb-8 p-5 sm:p-6 bg-royal-950/80 rounded-2xl border border-white/5 w-fit group-hover:scale-110 transition-transform shadow-inner">
                {item.icon}
              </div>
              <div className="space-y-3 sm:space-y-4 mb-8 flex-grow">
                <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tighter leading-none">
                  {item.title}
                </h3>
                <div className="text-[8px] sm:text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] font-mono">
                  {item.subtitle}
                </div>
                <p className="text-slate-300 text-sm sm:text-base font-bold leading-relaxed italic opacity-80 group-hover:opacity-100 transition-opacity">
                  "{item.desc}"
                </p>
              </div>
              <div className="pt-6 border-t border-white/5 flex items-center justify-between group">
                <span className="text-white font-black text-[10px] uppercase tracking-[0.4em]">{item.btnText}</span>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white text-black rounded-full flex items-center justify-center group-hover:bg-neon-blue group-hover:text-white transition-all">
                  <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-20 sm:py-32 relative z-10 border-t border-white/5 px-4 text-center">
         <div className="max-w-4xl mx-auto space-y-12">
           <div className="circuit-capsule border-[0.5px] border-neon-purple/50 text-[8px] sm:text-[9px] px-10 py-3 inline-flex bg-black shadow-3xl items-center gap-4">
              <Sparkles size={14} className="text-neon-purple animate-pulse" /> Automated Regulatory Parity
           </div>
           <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white uppercase tracking-tighter leading-[0.9]">
              Automate administrative debt <br/><span className="text-neon-purple italic">and return to service delivery.</span>
           </h2>
           <Link 
             to="/services" 
             className="px-12 py-6 sm:px-16 sm:py-8 bg-white text-black font-black text-[10px] sm:text-[12px] tracking-[0.5em] uppercase hover:scale-105 active:scale-95 shadow-3xl transition-all inline-block rounded-xl"
           >
              Explore Node Ecosystem
           </Link>
         </div>
      </section>

      <section className="py-20 sm:py-32 relative z-10 border-t border-white/5 px-4">
        <div className="max-w-6xl mx-auto w-full">
           <div className="bg-gradient-to-b from-black/90 to-royal-950/40 backdrop-blur-3xl border-[0.5px] border-neon-blue/20 rounded-[3rem] sm:rounded-[5rem] p-10 sm:p-24 relative overflow-hidden shadow-[0_80px_160px_rgba(0,0,0,0.9)] group flex flex-col items-center text-center">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-12 opacity-[0.01] pointer-events-none">
                <Rocket size={400} className="sm:w-[600px] sm:h-[600px] text-neon-blue -rotate-12" />
              </div>
              <div className="relative z-10 space-y-8 sm:space-y-12 max-w-4xl w-full">
                 <div className="flex flex-col items-center gap-4 sm:gap-6">
                    <div className="p-3 sm:p-4 bg-neon-blue/10 border border-neon-blue/20 rounded-xl w-fit">
                       <Terminal size={20} className="text-neon-blue" />
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.6em] text-neon-blue/80">The 2026 Strategy Convergence</span>
                    <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-white uppercase tracking-tighter leading-[0.85]">
                      Unified <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-purple">SYNK OS.</span>
                    </h2>
                 </div>
                 <div className="w-full flex justify-center py-4 sm:py-8 scale-90 sm:scale-100">
                    <HeroLogoAnimation />
                 </div>
                 <Link to="/tech" className="text-slate-400 hover:text-white transition-all text-[9px] sm:text-[11px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4 group">
                   View Operational Tech Suite <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                 </Link>
              </div>
           </div>
        </div>
      </section>
      <div className="h-20 sm:h-32 w-full"></div>
    </div>
  );
};

export default Home;