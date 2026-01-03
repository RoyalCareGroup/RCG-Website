import React, { useState, useEffect } from 'react';
import { Sparkles, Image as ImageIcon, Cpu, Zap, Download, RefreshCw, Layout, ShieldCheck, Activity } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { LogoExport } from '../components/LogoExport.tsx';
import { COMPANY_DETAILS } from '../config.ts';

const CreativeStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '9:16'>('1:1');
  const [quality, setQuality] = useState<'standard' | 'high'>('standard');
  const [statusMsg, setStatusMsg] = useState('Interface Standby');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const statusUpdates = [
    "Initializing Neural Pathways...", 
    "Allocating Graphics Cluster...", 
    "Calibrating Structural Vectors...", 
    "Synthesizing Visual Logic...", 
    "Rendering Final Blueprint..."
  ];

  const generateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || generating) return;

    // Strict requirement: User must select key for high-quality or pro models
    if (quality === 'high') {
      try {
        const hasKey = await (window as any).aistudio.hasSelectedApiKey();
        if (!hasKey) {
          await (window as any).aistudio.openSelectKey();
          // Per instructions: assume success and proceed
        }
      } catch (keyErr) {
        console.warn("API Key interface bypassed or errored:", keyErr);
      }
    }

    setGenerating(true); 
    setResultImage(null);
    let step = 0;
    const interval = setInterval(() => setStatusMsg(statusUpdates[step++ % statusUpdates.length]), 2000);

    try {
      // Always create a fresh instance right before the call
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const modelName = quality === 'high' ? 'gemini-3-pro-image-preview' : 'gemini-2.5-flash-image';
      
      const response = await ai.models.generateContent({
        model: modelName,
        contents: { parts: [{ text: prompt }] },
        config: { 
          imageConfig: { 
            aspectRatio, 
            ...(quality === 'high' ? { imageSize: '1K' } : {}) 
          } 
        }
      });

      // Iterate through all parts to find the image part (Per API guidelines)
      let foundImage = false;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setResultImage(`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`);
            foundImage = true;
            break;
          }
        }
      }

      if (!foundImage) throw new Error("No image data found in neural response.");

    } catch (err: any) {
      console.error("Blueprint Synthesis Error:", err);
      if (err?.message?.includes("Requested entity was not found.")) {
        setStatusMsg("RE-AUTHENTICATING...");
        await (window as any).aistudio.openSelectKey();
      }
      alert("Blueprint Synthesis Failure: Neural cluster rejected the payload."); 
    } finally { 
      clearInterval(interval); 
      setGenerating(false); 
      setStatusMsg('Interface Idle'); 
    }
  };

  return (
    <div className="flex flex-col bg-[#334155] overflow-x-hidden min-h-screen selection:bg-neon-blue/30 selection:text-white px-6 sm:px-16 lg:px-24 xl:px-32 font-sans font-bold relative">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[#334155]"></div>
        <div className="absolute top-[10%] left-[-10%] w-[100%] h-[100%] bg-neon-purple/[0.08] rounded-full blur-[200px] animate-blob-drift opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-15%] w-[100%] h-[100%] bg-neon-blue/[0.08] rounded-full blur-[250px] animate-blob-drift opacity-60"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 pt-48 pb-32 w-full">
        <div className="text-center mb-16 animate-hero-reveal">
          <div className="circuit-capsule border-2 border-white/80 bg-black text-white px-8 py-3 rounded-full text-[10px] font-black tracking-[0.4em] mb-10 uppercase shadow-3xl inline-flex items-center gap-4">
            <Cpu size={16} className="text-neon-blue animate-pulse" /> Visual Synthesis Engine
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-black text-white mb-6 uppercase tracking-tighter leading-none heading-wow">Blueprint<br/><span className="heading-tech">Studio.</span></h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-32">
          <div className="lg:col-span-4 space-y-8">
            <div className="orbital-tile border-2 border-white/10 p-10 bg-black shadow-3xl">
              <form onSubmit={generateImage} className="space-y-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] block">Structural Inquiry Payload</label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="E.g. 'A futuristic NDIS rehabilitation center with glass architecture and solar arrays'..."
                    className="w-full bg-royal-950 border-2 border-white/10 rounded-2xl p-6 text-white outline-none focus:border-neon-blue transition-all min-h-[150px] font-black shadow-inner placeholder:text-slate-800"
                    disabled={generating}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-4">
                      <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Dimensions</label>
                      <select 
                        value={aspectRatio} 
                        onChange={(e:any) => setAspectRatio(e.target.value)}
                        className="w-full bg-royal-950 border border-white/10 p-3 rounded-xl text-white text-[10px] font-black uppercase tracking-widest outline-none focus:border-neon-blue transition-all"
                      >
                         <option value="1:1">1:1 Square</option>
                         <option value="16:9">16:9 Wide</option>
                         <option value="9:16">9:16 Port</option>
                      </select>
                   </div>
                   <div className="space-y-4">
                      <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Model Node</label>
                      <select 
                        value={quality} 
                        onChange={(e:any) => setQuality(e.target.value)}
                        className="w-full bg-royal-950 border border-white/10 p-3 rounded-xl text-white text-[10px] font-black uppercase tracking-widest outline-none focus:border-neon-blue transition-all"
                      >
                         <option value="standard">Flash (Fast)</option>
                         <option value="high">Pro (Elite)</option>
                      </select>
                   </div>
                </div>

                <button type="submit" disabled={generating || !prompt.trim()} className="slim-orbital-btn w-full py-8 text-black bg-white font-black text-[12px] tracking-[0.5em] uppercase transition-all shadow-3xl flex items-center justify-center gap-4 active:scale-95">
                  {generating ? <RefreshCw size={18} className="animate-spin" /> : <Layout size={18} />}
                  {generating ? 'SYNTHESIZING...' : 'INITIALIZE BUILD'}
                </button>
              </form>
            </div>

            <div className="orbital-tile p-8 bg-black border-2 border-white/5 flex items-center gap-6">
               <div className={`p-4 rounded-xl bg-neon-blue/10 border border-neon-blue/20 ${generating ? 'animate-pulse' : ''}`}>
                  <Activity size={24} className="text-neon-blue" />
               </div>
               <div>
                  <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Synthesis Pipeline</div>
                  <div className="text-[11px] text-white font-mono uppercase tracking-[0.1em]">{statusMsg}</div>
               </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="orbital-tile border-2 border-white/10 rounded-[4rem] min-h-[600px] flex flex-col items-center justify-center p-12 relative overflow-hidden bg-black shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
              {generating ? (
                <div className="text-center space-y-10">
                  <div className="w-48 h-48 border-4 border-dashed border-neon-purple rounded-full animate-spin-slow mx-auto flex items-center justify-center">
                    <Sparkles size={64} className="text-neon-purple animate-pulse" />
                  </div>
                  <h3 className="text-3xl font-display font-black text-white uppercase tracking-tighter">Manifesting Blueprint...</h3>
                </div>
              ) : resultImage ? (
                <div className="w-full space-y-8 animate-in fade-in duration-1000">
                  <img src={resultImage} alt="Blueprint" className="w-full h-auto rounded-[2.5rem] border-4 border-white/10 shadow-3xl" />
                  <div className="flex justify-center gap-6">
                    <button 
                      onClick={() => setResultImage(null)} 
                      className="px-12 py-5 bg-white/5 border border-white/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-white transition-all active:scale-95"
                    >
                      Reset Workspace
                    </button>
                    <a 
                      href={resultImage} 
                      download={`RCG_BLUEPRINT_${Date.now()}.png`}
                      className="px-12 py-5 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-neon-blue hover:text-white transition-all shadow-2xl active:scale-95 flex items-center gap-3"
                    >
                      <Download size={14} /> Download PNG
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-8 opacity-20 group">
                  <ImageIcon size={100} className="text-white mx-auto group-hover:scale-110 transition-transform duration-1000" />
                  <p className="text-[12px] font-black uppercase tracking-[0.8em]">Workspace Ready</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <LogoExport />
      </div>
    </div>
  );
};

export default CreativeStudio;