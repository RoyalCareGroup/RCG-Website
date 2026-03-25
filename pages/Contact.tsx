import React, { useState, useRef } from 'react';
import { Send, Terminal, Activity, Zap, Loader2, Cpu, ChevronDown, Volume2, VolumeX, ShieldCheck, ArrowRight } from 'lucide-react';
import { GoogleGenAI, Modality } from "@google/genai";
import { COMPANY_DETAILS } from '../config.ts';
import { DecodingText } from '../components/DecodingText.tsx';

// --- PCM AUDIO DECODING UTILS ---
function decodeBase64(base64: string) {
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
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const INQUIRY_OPTIONS = [
  "Business Consulting",
  "SYNK Products & Tech",
  "Compliance & Audit Support",
  "Custom Training",
  "Software Development",
  "General Inquiry"
];

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: INQUIRY_OPTIONS[0], msg: '' });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showHandshake, setShowHandshake] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const cachedBufferRef = useRef<AudioBuffer | null>(null);
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const introTextRaw = `We're real people who've run real businesses.\n\nWe've dealt with the compliance headaches, the admin\noverload, and software that promises everything but\ndelivers nothing.\n\nTell us what you're dealing with and we'll tell you\nhonestly if we can help.\n\nDrop us a message below — a real person will\nget back to you within 24 hours.`;

  const handleReadAloud = async () => {
    if (isReadingAloud) {
      currentSourceRef.current?.stop();
      setIsReadingAloud(false);
      return;
    }
    if (!audioContextRef.current) audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') await ctx.resume();

    if (!cachedBufferRef.current) {
      setIsSynthesizing(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash-preview-tts",
          contents: [{ parts: [{ text: introTextRaw.replace(/\n/g, ' ') }] }],
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
          },
        });
        const base64Audio = response.candidates?.[0]?.content?.parts[0]?.inlineData?.data;
        if (base64Audio) cachedBufferRef.current = await decodeAudioData(decodeBase64(base64Audio), ctx, 24000, 1);
      } catch (err) { console.error(err); } finally { setIsSynthesizing(false); }
    }

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

  const analyzeIntent = async () => {
    if (!formData.msg.trim() || isAnalyzing) return;
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Analyze this business inquiry for integrity and intent: NAME: "${formData.name}", MESSAGE: "${formData.msg}". Return JSON: {category, intent}.`;
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: { responseMimeType: "application/json" }
      });
      setAnalysis(JSON.parse(response.text || '{}'));
      setShowHandshake(true);
    } catch (err) { setShowHandshake(true); } finally { setIsAnalyzing(false); }
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `[RCG Inquiry] ${formData.subject}: ${formData.name}`;
    const body = `Royal Care Group — Contact Form\n\nName: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.msg}`;
    window.location.href = `mailto:${COMPANY_DETAILS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="flex flex-col bg-transparent overflow-x-hidden min-h-screen px-6 sm:px-16 lg:px-24 font-sans relative">
      <div className="max-w-7xl mx-auto pt-24 pb-16 relative z-10 w-full flex flex-col items-center">
        
        <div className="text-center mb-8 animate-hero-reveal max-w-5xl flex flex-col items-center">
          <div className="circuit-capsule border border-neon-gold/30 bg-black/40 text-neon-gold px-10 py-3 shadow-3xl mb-6 inline-flex items-center gap-4">
            <Terminal size={18} className="animate-pulse" /> 
            <span className="text-[10px] font-black uppercase tracking-[0.6em] font-mono">Get In Touch</span>
          </div>
          <h1 className="text-5xl font-mono font-black uppercase tracking-tighter leading-[0.8] mb-6 animate-liquid-shimmer">
            <span className="block text-chiseled-silver mb-6 text-stroked-black">Contact</span>
            <span className="text-chiseled-gold text-stroked-black">Us.</span>
          </h1>

          <div className="orbital-tile !bg-transparent !border !border-white/10 !shadow-none hover:!border-neon-gold/40 hover:!shadow-[0_0_20px_rgba(229,199,139,0.1)] p-6 md:p-8 rounded-2xl mx-auto group relative max-w-3xl bg-black/60">
            <div className="absolute -top-4 left-12 px-10 py-2.5 bg-neon-gold rounded-full text-[10px] text-black uppercase tracking-[0.5em] font-black shadow-3xl z-30 border-2 border-black">
              A Real Person Will Reply
            </div>
            <div className="relative z-10 text-center">
               <p className="text-xl md:text-2xl text-slate-400 font-bold leading-relaxed whitespace-pre-line tracking-tight uppercase">
                 <DecodingText text={introTextRaw} stagger={1} />
               </p>
            </div>
            <button 
              onClick={handleReadAloud}
              disabled={isSynthesizing}
              className={`absolute bottom-6 right-6 w-20 h-20 flex items-center justify-center transition-all duration-500 rounded-2xl bg-black border-2 shadow-3xl z-20 ${
                isReadingAloud ? 'border-neon-gold scale-110 shadow-[0_0_40px_rgba(229,199,139,0.3)]' : 'border-white/10 hover:border-neon-gold'
              }`}
            >
              {isSynthesizing ? <Loader2 size={32} className="animate-spin text-neon-gold" /> : isReadingAloud ? <VolumeX size={32} className="text-white animate-pulse" /> : <Volume2 size={32} className="text-white" />}
            </button>
          </div>
        </div>

        <div className="w-full max-w-4xl mb-16">
          <div className="orbital-tile !bg-transparent !border !border-white/10 !shadow-none hover:!border-neon-gold/40 hover:!shadow-[0_0_20px_rgba(229,199,139,0.1)] p-6 md:p-8 rounded-2xl relative overflow-hidden bg-black/80 border-2 border-white/10 min-h-[750px] flex flex-col transition-all duration-700">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-gold via-white/10 to-neon-gold"></div>
            
            {!showHandshake ? (
              <div className="relative z-10 space-y-6 animate-in fade-in duration-1000">
                <div className="flex items-center gap-8 text-slate-600 border-b border-white/5 pb-8">
                   <Activity size={24} className="text-neon-gold" />
                   <span className="text-[11px] font-black uppercase tracking-[0.8em] font-mono">Your Details</span>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); analyzeIntent(); }} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] font-mono ml-4">Your Name</label>
                      <input 
                        type="text" required placeholder="FULL NAME"
                        className="w-full bg-black/40 border-2 border-white/5 p-6 rounded-2xl text-lg text-white focus:border-neon-gold outline-none transition-all placeholder:text-slate-800 font-bold shadow-inner" 
                        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} 
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] font-mono ml-4">Your Email</label>
                      <input 
                        type="email" required placeholder="WORK EMAIL"
                        className="w-full bg-black/40 border-2 border-white/5 p-6 rounded-2xl text-lg text-white focus:border-neon-gold outline-none transition-all placeholder:text-slate-800 font-bold shadow-inner" 
                        value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} 
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] font-mono ml-4">What Can We Help With</label>
                    <div className="relative">
                      <select 
                        className="w-full bg-black/40 border-2 border-white/5 p-6 rounded-2xl text-lg text-white focus:border-neon-gold outline-none transition-all appearance-none font-bold shadow-inner"
                        value={formData.subject}
                        onChange={e => setFormData({...formData, subject: e.target.value})}
                      >
                        {INQUIRY_OPTIONS.map(opt => (
                          <option key={opt} value={opt} className="bg-royal-950 text-white">{opt.toUpperCase()}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" size={28} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] font-mono ml-4">Tell Us More</label>
                    <textarea 
                      required rows={5} placeholder="Tell us about your business goals or what you need help with..."
                      className="w-full bg-black/40 border-2 border-white/5 p-6 rounded-[2.5rem] text-lg text-white resize-none focus:border-neon-gold outline-none transition-all placeholder:text-slate-800 font-bold shadow-inner" 
                      value={formData.msg} onChange={e => setFormData({...formData, msg: e.target.value})}
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isAnalyzing || !formData.msg.trim()}
                    className="w-full py-8 bg-black border-[3px] border-neon-gold rounded-2xl text-white font-black text-[12px] tracking-[0.6em] uppercase hover:scale-[1.02] active:bg-neon-gold active:text-black transition-all shadow-3xl disabled:opacity-50 flex items-center justify-center gap-6"
                  >
                    {isAnalyzing ? <Loader2 size={24} className="animate-spin text-neon-gold" /> : <Zap size={24} className="text-neon-gold" />}
                    <span>{isAnalyzing ? 'Processing...' : 'Send Message'}</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="relative z-10 space-y-6 animate-in slide-in-from-right-10 duration-1000 flex flex-col h-full">
                <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                   <div className="p-6 bg-royal-950 border-2 border-neon-gold/30 rounded-2xl shadow-3xl">
                      <ShieldCheck className="text-neon-gold" size={48} />
                   </div>
                   <div>
                      <h3 className="text-4xl font-mono font-black text-white uppercase tracking-tighter">Message Ready</h3>
                      <p className="text-[11px] text-slate-600 font-black uppercase tracking-[0.8em] mt-3 font-mono">Ready to send</p>
                   </div>
                </div>

                <div className="space-y-5 flex-grow">
                   <div className="p-6 bg-black/40 border border-white/10 rounded-[3rem] relative shadow-inner">
                      <div className="text-[10px] font-black text-neon-gold uppercase tracking-[0.8em] mb-6">Inquiry Category</div>
                      <h4 className="text-3xl font-mono font-black text-white uppercase tracking-tight mb-6">
                         {analysis?.category || 'Your Inquiry'}
                      </h4>
                      <p className="text-slate-400 text-xl leading-relaxed font-bold">
                         {analysis?.intent || 'Your message is ready to be sent to our team. We\'ll review and get back to you shortly.'}
                      </p>
                   </div>
                </div>

                <div className="space-y-4 pt-8">
                   <button 
                      onClick={sendEmail}
                      className="w-full py-8 bg-black border-[4px] border-neon-gold rounded-2xl text-white font-black text-[14px] tracking-[0.6em] uppercase hover:scale-[1.03] active:bg-neon-gold active:text-black transition-all shadow-3xl flex items-center justify-center gap-8 group"
                   >
                      <Send size={24} className="text-neon-gold group-active:text-black" />
                      <span>Send Email</span>
                   </button>
                   <button onClick={() => setShowHandshake(false)} className="w-full py-4 text-slate-700 font-black text-[10px] uppercase tracking-[1em] hover:text-white transition-colors">
                      Back to Form
                   </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
