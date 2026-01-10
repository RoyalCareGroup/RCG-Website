import React, { useState, useEffect, useRef } from 'react';
import { Send, Mail, Zap, ShieldCheck, Terminal, Activity, ArrowRight, ExternalLink, Loader2, Cpu, MessageSquare, ChevronDown, Volume2, VolumeX, AlertTriangle, Copy, Check, X } from 'lucide-react';
import { GoogleGenAI, Modality } from "@google/genai";
import { COMPANY_DETAILS } from '../config.ts';
import { DecodingText } from '../components/DecodingText.tsx';

// --- PCM AUDIO DECODING UTILS ---
function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
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

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', msg: '' });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<{ category: string, recommendation: string, intent: string } | null>(null);
  const [showHandshake, setShowHandshake] = useState(false);
  const [isBotDetected, setIsBotDetected] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  
  // Audio Engine State
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const cachedBufferRef = useRef<AudioBuffer | null>(null);
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null);

  // Formatted intro text for visual spacing (Sentient Humour Tone)
  const introTextRaw = `Look, we’re deep in the AI Golden Age, but let's be real:\nneural networks are terrible at reading the room\nand even worse at sharing a coffee.\n\nIf you're tired of talking to algorithms that have the\npersonality of a spicy spreadsheet, drop your payload here.\n\nA real, breathing human architect—one who actually knows\nwhat a 'Monday morning' feels like—will get back to you.\n\nWe’re hardcore tech-native, but we still haven’t figured out\nhow to automate a proper vibe check. Yet.`;

  const handleReadAloud = async () => {
    // 1. If currently playing, stop it.
    if (isReadingAloud) {
      currentSourceRef.current?.stop();
      setIsReadingAloud(false);
      return;
    }

    // 2. Initialize AudioContext on first interaction
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') await ctx.resume();

    // 3. Synthesize if no cached buffer exists
    if (!cachedBufferRef.current) {
      setIsSynthesizing(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash-preview-tts",
          contents: [{ parts: [{ text: introTextRaw.replace(/\n/g, ' ') }] }],
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: 'Kore' },
              },
            },
          },
        });

        const base64Audio = response.candidates?.[0]?.content?.parts[0]?.inlineData?.data;
        if (base64Audio) {
          const audioBuffer = await decodeAudioData(decodeBase64(base64Audio), ctx, 24000, 1);
          cachedBufferRef.current = audioBuffer;
        } else {
          throw new Error("Neural voice node failed to return audio bytes.");
        }
      } catch (err) {
        console.error("Audio Synthesis Error:", err);
        alert("Neural Voice Node temporarily unavailable. Manual reading recommended.");
        setIsSynthesizing(false);
        return;
      } finally {
        setIsSynthesizing(false);
      }
    }

    // 4. Play the synthesized buffer
    if (cachedBufferRef.current) {
      const source = ctx.createBufferSource();
      source.buffer = cachedBufferRef.current;
      source.connect(ctx.destination);
      source.onended = () => setIsReadingAloud(false);
      
      currentSourceRef.current = source;
      setIsReadingAloud(true);
      source.start();
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(COMPANY_DETAILS.email);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const analyzeIntent = async () => {
    if (!formData.msg.trim() || isAnalyzing) return;
    setIsAnalyzing(true);
    setIsBotDetected(false);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Analyze this NDIS provider inquiry for integrity and intent:
      NAME: "${formData.name}"
      EMAIL: "${formData.email}"
      MESSAGE: "${formData.msg}"
      
      Return a JSON object with: 
      1. category (short 2-3 word title)
      2. intent (one sentence)
      3. recommendation (department)
      4. emailIntegrity (boolean: false if the email looks like a bot, fake domain, gibberish name, or disposable email service. true if it looks like a legitimate person or business)
      5. reason (one short phrase if integrity is false).
      
      Maintain an elite, architectural tone.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: { responseMimeType: "application/json" }
      });

      const result = JSON.parse(response.text || '{}');
      
      if (result.emailIntegrity === false) {
        setIsBotDetected(true);
      } else {
        setAnalysis(result);
        setShowHandshake(true);
      }
    } catch (err) {
      console.error("Neural analysis failed:", err);
      setShowHandshake(true);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const finalizeUplink = (e: React.FormEvent) => {
    e.preventDefault();
    const recipient = COMPANY_DETAILS.email; 
    const subject = `[UPLINK] Strategic Inquiry: ${formData.name}`;
    const body = `ROYAL CARE GROUP - CONTACT MATRIX PAYLOAD\n` +
                 `------------------------------------------\n` +
                 `OPERATOR: ${formData.name}\n` +
                 `REPLY_NODE: ${formData.email}\n` +
                 `INTENT: ${analysis?.intent || 'Not Analyzed'}\n` +
                 `CATEGORY: ${analysis?.category || 'Standard Inquiry'}\n\n` +
                 `MESSAGE PAYLOAD:\n` +
                 `${formData.msg}\n` +
                 `------------------------------------------\n` +
                 `Sent via Sovereign Uplink Protocol v${COMPANY_DETAILS.appVersion}`;
    
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="flex flex-col bg-[#334155] overflow-x-hidden min-h-screen selection:bg-neon-blue/30 selection:text-white px-6 sm:px-16 lg:px-24 font-sans font-bold relative">
      
      {/* --- ATMOSPHERE NODES --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[#334155]"></div>
        <div className="absolute top-[10%] left-[-10%] w-[100%] h-[100%] bg-neon-purple/[0.08] rounded-full blur-[200px] animate-blob-drift opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-15%] w-[100%] h-[100%] bg-neon-blue/[0.08] rounded-full blur-[250px] animate-blob-drift opacity-60"></div>
      </div>

      <div className="max-w-7xl mx-auto pt-32 pb-40 relative z-10 w-full flex flex-col items-center">
        
        {/* HEADING SECTION */}
        <div className="text-center mb-16 animate-hero-reveal max-w-4xl">
          <div className="circuit-capsule border-2 border-white/80 bg-black text-white px-8 py-2.5 shadow-3xl inline-flex items-center gap-4 mb-10">
            <Terminal size={14} className="animate-pulse text-neon-blue" /> Smart_Human_Sync_Protocol_v5
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter leading-[0.85] mb-12">
            <span className="block text-white mb-2">Contact</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-purple drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">Matrix.</span>
          </h1>

          {/* COMPACT HUMOUR TILE */}
          <div className="banner-pop bg-black/40 backdrop-blur-md p-10 md:p-14 lg:p-16 shadow-2xl border border-white/10 rounded-[3rem] mx-auto group relative max-w-3xl">
            <div className="absolute -top-3.5 left-10 px-6 py-1.5 bg-neon-purple rounded-full text-[9px] text-white uppercase tracking-widest font-black shadow-2xl group-hover:animate-pulse z-[30] border border-white/10">
              Sentient_Humour_Override
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
               <p className="text-sm md:text-base text-white/90 font-black leading-relaxed tracking-wide italic whitespace-pre-line">
                 <DecodingText 
                    text={introTextRaw}
                    className="text-white/90"
                    stagger={1}
                 />
               </p>
            </div>

            {/* AUDIO TRIGGER ICON - SYNCED WITH MENU BUTTON AESTHETIC */}
            <button 
              onClick={handleReadAloud}
              disabled={isSynthesizing}
              className={`absolute bottom-6 right-8 group/audio w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center transition-all duration-500 rounded-xl bg-black border-[1.5px] shadow-2xl z-20 ${
                isReadingAloud 
                  ? 'border-neon-purple ring-4 ring-neon-purple/10 scale-105' 
                  : isSynthesizing ? 'border-amber-500 ring-4 ring-amber-500/10' : 'border-neon-blue ring-4 ring-neon-blue/5 hover:border-white hover:ring-white/10 hover:scale-110 active:scale-95'
              } ${isSynthesizing ? 'opacity-70' : 'opacity-100'}`}
              aria-label={isReadingAloud ? "Stop Narration" : "Listen to Neural Voice"}
            >
              {/* Internal Glow Layer */}
              <div className={`absolute inset-0 rounded-lg opacity-20 transition-opacity group-hover/audio:opacity-40 ${isReadingAloud ? 'bg-neon-purple' : 'bg-neon-blue'}`}></div>
              
              {/* Status LED */}
              <div className={`absolute top-2 right-2 w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                isReadingAloud 
                  ? 'bg-neon-purple shadow-[0_0_8px_#d946ef]' 
                  : isSynthesizing ? 'bg-amber-500 animate-pulse' : 'bg-neon-green shadow-[0_0_8px_#10b981] animate-pulse'
              }`}></div>

              <div className="relative z-10 text-white transition-transform duration-500 group-hover/audio:scale-110">
                {isSynthesizing ? <Loader2 size={26} className="animate-spin text-amber-500" /> : isReadingAloud ? <VolumeX size={26} className="animate-pulse" /> : <Volume2 size={26} />}
              </div>

              {/* Hover Label */}
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-black tracking-[0.4em] text-slate-500 uppercase opacity-0 group-hover/audio:opacity-100 transition-opacity whitespace-nowrap">
                {isSynthesizing ? 'Syncing...' : isReadingAloud ? 'Stop' : 'Listen'}
              </span>
            </button>
          </div>
        </div>

        {/* SMART FORM SECTION */}
        <div className="w-full max-w-4xl mb-32">
          <div 
            data-cursor-contrast="true"
            className="orbital-tile p-8 md:p-14 shadow-[0_80px_160px_rgba(0,0,0,0.5)] relative overflow-hidden bg-white border-2 border-white min-h-[600px] flex flex-col transition-all duration-700 hover:shadow-[0_100px_180px_rgba(0,0,0,0.6)]"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-neon-purple via-slate-200 to-neon-blue"></div>
            
            {!showHandshake ? (
              <div className="relative z-10 space-y-10 animate-in fade-in duration-1000">
                <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                  <div className="flex items-center gap-4 text-slate-400">
                     <Activity size={14} className="text-neon-blue" />
                     <span className="text-[9px] font-black uppercase tracking-[0.5em] font-mono">Operator_Initiation_Mode</span>
                  </div>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); analyzeIntent(); }} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] font-mono ml-1">Operator Identity</label>
                      <input 
                        type="text" required placeholder="Full Name Required"
                        className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-sm text-black focus:border-neon-blue focus:bg-white outline-none transition-all placeholder:text-slate-300 font-black shadow-sm" 
                        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] font-mono ml-1">Response Node</label>
                      <input 
                        type="email" required placeholder="Work Email Required"
                        className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-sm text-black focus:border-neon-blue focus:bg-white outline-none transition-all placeholder:text-slate-300 font-black shadow-sm" 
                        value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] font-mono ml-1">Inquiry Context</label>
                    <textarea 
                      required rows={5} placeholder="Describe the structural goals, barriers, or scaling requirements..."
                      className="w-full bg-slate-50 border border-slate-200 p-6 rounded-2xl text-sm text-black resize-none focus:border-neon-purple focus:bg-white outline-none transition-all placeholder:text-slate-300 font-black shadow-sm" 
                      value={formData.msg} onChange={e => setFormData({...formData, msg: e.target.value})}
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isAnalyzing || !formData.msg.trim()}
                    className="slim-orbital-btn w-full py-6 text-white bg-black font-black text-[11px] tracking-[0.6em] uppercase flex items-center justify-center gap-6 group active:scale-95 shadow-2xl disabled:opacity-50 transition-all hover:bg-slate-900"
                  >
                    {isAnalyzing ? <Loader2 size={20} className="animate-spin text-neon-blue" /> : <Zap size={18} className="text-neon-purple" />}
                    <span>{isAnalyzing ? 'Mapping Intent...' : 'Initialize Logic Scan'}</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="relative z-10 space-y-10 animate-in slide-in-from-right-10 duration-700 flex flex-col h-full">
                <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                  <div className="flex items-center gap-6">
                     <div className="p-3 bg-neon-purple/5 border border-neon-purple/10 rounded-xl">
                        <ShieldCheck className="text-neon-purple" size={24} />
                     </div>
                     <div>
                        <h3 className="text-2xl font-display font-black text-black uppercase tracking-tight">Neural Handshake</h3>
                        <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.3em] mt-1 font-mono">Verified for Human Dispatch</p>
                     </div>
                  </div>
                </div>

                <div className="space-y-6 flex-grow">
                   <div className="p-8 bg-slate-50 border border-slate-200 rounded-3xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-[0.03] text-black"><MessageSquare size={60} /></div>
                      <div className="text-[9px] font-black text-neon-blue uppercase tracking-widest mb-3">Structural Categorization</div>
                      <h4 className="text-xl font-display font-black text-black uppercase tracking-tight mb-3">
                         {analysis?.category || 'Strategic Growth Node'}
                      </h4>
                      <p className="text-slate-600 text-sm leading-relaxed italic font-bold">
                         "{analysis?.intent || 'Transmission protocol ready to bridge your inquiry to our lead architects.'}"
                      </p>
                   </div>
                </div>

                <div className="space-y-4 pt-6">
                   <button 
                      onClick={finalizeUplink}
                      className="slim-orbital-btn w-full py-6 text-white bg-neon-blue font-black text-[12px] tracking-[0.7em] uppercase flex items-center justify-center gap-6 shadow-[0_20px_60px_rgba(6,182,212,0.3)] hover:scale-[1.01] active:scale-95 transition-all"
                   >
                      <Send size={20} />
                      <span>Deploy Uplink Now</span>
                   </button>
                   <button 
                      onClick={() => setShowHandshake(false)}
                      className="w-full py-3 text-slate-400 font-black text-[8px] uppercase tracking-[0.5em] hover:text-black transition-colors"
                   >
                      Revision Required // Back to Editor
                   </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-8 text-center text-[9px] font-black text-slate-500 uppercase tracking-[0.6em] animate-pulse">
            AU_SECURE_GATEWAY // HUMAN_SYNC_10.13
          </div>
        </div>

        {/* SECONDARY TILES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {[
            { icon: <ShieldCheck className="text-neon-blue" />, label: "Security", val: "Sovereign Encryption Active", desc: "Your organizational data is protected by end-to-end RCG security nodes before a human even touches it." },
            { icon: <Cpu className="text-neon-purple" />, label: "Dispatcher", val: "Neural Intent Discovery Enabled", desc: "Our Gemini-3 Flash engine handles initial mapping so our human architects can skip the small talk and get to the strategy." },
          ].map((node, i) => (
            <div key={i} className="orbital-tile p-10 bg-black/60 backdrop-blur-3xl border border-white/10 shadow-2xl flex flex-col gap-6 group hover:border-white/30 transition-all duration-700">
              <div className="flex items-center gap-6">
                <div className="p-4 bg-royal-950 rounded-2xl border border-white/5 group-hover:scale-110 transition-transform">{node.icon}</div>
                <div>
                  <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mb-1 font-mono">{node.label}</h4>
                  <p className="text-white text-[11px] font-black">{node.val}</p>
                </div>
              </div>
              <p className="text-slate-400 text-[12px] font-bold italic leading-relaxed opacity-60">"{node.desc}"</p>
            </div>
          ))}
        </div>

      </div>

      {/* --- BOT DETECTION / DIRECT UPLINK MODAL --- */}
      {isBotDetected && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 sm:p-12 shadow-[0_50px_100px_rgba(0,0,0,0.8)] border border-white/20 relative overflow-hidden flex flex-col items-center text-center">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-neon-red"></div>
              
              <button 
                onClick={() => setIsBotDetected(false)}
                className="absolute top-6 right-6 p-2 text-slate-300 hover:text-black transition-colors"
              >
                <X size={20} />
              </button>

              <div className="mb-8 p-6 bg-red-50 rounded-3xl">
                 <AlertTriangle className="text-neon-red w-12 h-12" />
              </div>

              <h3 className="text-2xl font-display font-black text-black uppercase tracking-tight mb-4">Uplink Anomaly Detected</h3>
              <p className="text-slate-500 text-sm font-bold leading-relaxed italic mb-8">
                "Our neural firewall flagged this entry node as potentially suspicious. To ensure your inquiry reaches our human architects, please email us directly."
              </p>

              <div className="w-full space-y-4">
                 <div className="relative group">
                    <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 flex items-center justify-between group-hover:border-neon-blue transition-all">
                       <span className="text-black font-mono text-[11px] sm:text-sm font-bold">{COMPANY_DETAILS.email}</span>
                       <button 
                         onClick={handleCopyEmail}
                         className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-neon-blue hover:border-neon-blue transition-all active:scale-95 shadow-sm"
                       >
                          {copySuccess ? <Check size={16} className="text-neon-green" /> : <Copy size={16} />}
                       </button>
                    </div>
                    {copySuccess && (
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-black text-neon-green uppercase tracking-widest animate-fade-in">
                        Copied to clipboard
                      </div>
                    )}
                 </div>

                 <a 
                   href={`mailto:${COMPANY_DETAILS.email}`}
                   className="block w-full py-5 bg-black text-white font-black text-[10px] tracking-[0.4em] uppercase rounded-2xl hover:bg-slate-900 transition-all shadow-xl active:scale-95 mt-8"
                 >
                   Launch Mail Interface
                 </a>

                 <button 
                   onClick={() => setIsBotDetected(false)}
                   className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-4 hover:text-black transition-colors"
                 >
                   Return to Contact Matrix
                 </button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
};

export default Contact;