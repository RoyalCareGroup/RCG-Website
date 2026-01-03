import React, { useState, useEffect } from 'react';
import { Sparkles, Image as ImageIcon, Cpu, Zap, Download, RefreshCw, Layers, Layout, ShieldCheck, Activity } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { LogoExport } from '../components/LogoExport.tsx';
import { COMPANY_DETAILS } from '../config.ts';

const CreativeStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '9:16'>('1:1');
  const [quality, setQuality] = useState<'standard' | 'high'>('standard');
  const [statusMsg, setStatusMsg] = useState('Standby');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const statusUpdates = ["Allocating neural pathways...", "Calibrating pixel vectors...", "Synthesizing visual logic...", "Rendering structural blueprint..."];

  const generateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || generating) return;
    setGenerating(true); setResultImage(null);
    let step = 0;
    const interval = setInterval(() => setStatusMsg(statusUpdates[step++ % statusUpdates.length]), 1500);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const modelName = quality === 'high' ? 'gemini-3-pro-image-preview' : 'gemini-2.5-flash-image';
      const response = await ai.models.generateContent({
        model: modelName,
        contents: { parts: [{ text: prompt }] },
        config: { imageConfig: { aspectRatio, ...(quality === 'high' ? { imageSize: '1K' } : {}) } }
      });
      const part = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
      if (part) setResultImage(`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`);
    } catch (err) { alert("Blueprint Synthesis Failure: Unable to manifest visual data."); }
    finally { clearInterval(interval); setGenerating(false); setStatusMsg('Terminated'); }
  };

  return (
    <div className="flex flex-col bg-[#334155] overflow-x-hidden min-h-screen selection:bg-neon-blue/30 selection:text-white px-6 sm:px-16 lg:px-24 xl:px-32 font-sans font-bold relative">
      
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

      <div className="max-w-7xl mx-auto relative z-10 pt-48 pb-32">
        <div className="text-center mb-16 animate-hero-reveal">
          <div className="circuit-capsule border-2 border-white/80 bg-black text-white px-4 py-2 rounded-full text-[10px] font-black tracking-[0.4em] mb-6 uppercase shadow-2xl">
            <Cpu size={14} className="mr-2" /> Visual Synthesis Engine
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-black text-white mb-6 uppercase tracking-tighter leading-none heading-wow">Blueprint<br/><span className="heading-tech">Studio.</span></h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-32">
          <div className="lg:col-span-4 space-y-8">
            <div className="orbital-tile border-2 border-white/10 p-10 bg-black shadow-3xl">
              <form onSubmit={generateImage} className="space-y-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] block">Inquiry Payload</label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full bg-royal-950 border-2 border-white/10 rounded-2xl p-6 text-white outline-none focus:border-neon-blue transition-all min-h-[120px] font-black shadow-inner"
                    disabled={generating}
                  />
                </div>
                <button type="submit" disabled={generating || !prompt.trim()} className="slim-orbital-btn w-full py-8 text-black bg-white font-black text-[12px] tracking-[0.5em] uppercase transition-all shadow-3xl flex items-center justify-center gap-4 active:scale-95">
                  {generating ? <RefreshCw size={18} className="animate-spin" /> : <Layout size={18} />}
                  {generating ? 'SYNTHESIZING...' : 'INITIALIZE BLUEPRINT'}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="orbital-tile border-2 border-white/10 rounded-[4rem] min-h-[500px] flex flex-col items-center justify-center p-8 relative overflow-hidden bg-black shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
              {generating ? (
                <div className="text-center animate-pulse">
                  <Zap size={64} className="text-neon-blue mx-auto mb-8" />
                  <h3 className="text-3xl font-display font-black text-white uppercase tracking-tighter">{statusMsg}</h3>
                </div>
              ) : resultImage ? (
                <div className="w-full space-y-8 animate-in fade-in duration-700">
                  <img src={resultImage} alt="Blueprint" className="w-full h-auto rounded-[2rem] border-4 border-white/10 shadow-3xl" />
                  <div className="flex justify-center gap-6">
                    <button onClick={() => setResultImage(null)} className="px-12 py-5 bg-white/10 border-2 border-white/20 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-neon-purple transition-all">New Protocol</button>
                  </div>
                </div>
              ) : (
                <ImageIcon size={64} className="text-white/10" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeStudio;