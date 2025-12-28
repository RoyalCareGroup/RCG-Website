import React, { useState } from 'react';
import { Sparkles, Image as ImageIcon, Cpu, Zap, Download, RefreshCw, Layers, Layout, ShieldCheck } from 'lucide-react';
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

  const statusUpdates = [
    "Allocating neural pathways...",
    "Calibrating pixel vectors...",
    "Synthesizing visual logic...",
    "Rendering structural blueprint...",
    "Applying chromatic resonance...",
    "Optimizing output buffer...",
    "Finalizing image parity..."
  ];

  const generateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || generating) return;

    if (quality === 'high') {
      try {
        const hasKey = await (window as any).aistudio.hasSelectedApiKey();
        if (!hasKey) {
          await (window as any).aistudio.openSelectKey();
        }
      } catch (keyErr) {
        console.error("API Key selection interface error:", keyErr);
      }
    }

    setGenerating(true);
    setResultImage(null);
    let step = 0;
    const interval = setInterval(() => {
      setStatusMsg(statusUpdates[step % statusUpdates.length]);
      step++;
    }, 1500);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // Use recommended models for image generation
      const modelName = quality === 'high' ? 'gemini-3-pro-image-preview' : 'gemini-2.5-flash-image';

      const response = await ai.models.generateContent({
        model: modelName,
        contents: {
          parts: [{ text: prompt }]
        },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio,
            ...(quality === 'high' ? { imageSize: '1K' } : {})
          }
        }
      });

      let foundImage = false;
      const candidate = response.candidates?.[0];
      if (candidate?.content?.parts) {
        for (const part of candidate.content.parts) {
          if (part.inlineData) {
            setResultImage(`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`);
            foundImage = true;
            break;
          }
        }
      }

      if (!foundImage) {
        throw new Error("No image data returned from structural synthesis.");
      }
    } catch (error: any) {
      console.error("Creative synthesis failed:", error);
      if (error?.message?.includes("Requested entity was not found.")) {
        await (window as any).aistudio.openSelectKey();
      }
      alert("Blueprint Synthesis Failure: Unable to manifest visual data. Check neural link.");
    } finally {
      clearInterval(interval);
      setGenerating(false);
      setStatusMsg('Synthesis Complete');
    }
  };

  const downloadImage = () => {
    if (!resultImage) return;
    const link = document.createElement('a');
    link.href = resultImage;
    link.download = `RCG_Blueprint_${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="pt-32 pb-32 px-6 animate-fade-in min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-neon-blue/30 bg-neon-blue/10 text-neon-blue text-[10px] font-black tracking-[0.4em] mb-6 uppercase">
            <Cpu size={14} className="mr-2" /> Visual Synthesis Engine
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6 uppercase tracking-tighter">Blueprint Studio</h1>
          <p className="text-slate-500 uppercase tracking-[0.6em] text-[11px] font-black max-w-2xl mx-auto">
            Manifesting structural concepts through neural imagery. Re-engineering visual possibility.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-32">
          <div className="lg:col-span-4 space-y-8">
            <div className="glass border border-royal-800 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Layers size={80} className="text-neon-purple" />
              </div>

              <form onSubmit={generateImage} className="space-y-8 relative z-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] block">Inquiry Payload (Prompt)</label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the structural blueprint (e.g., 'A futuristic disability clinic with glass architecture and neon lighting')..."
                    className="w-full bg-royal-950 border border-royal-700 rounded-2xl p-6 text-sm text-slate-200 outline-none focus:border-neon-blue transition-all min-h-[120px] resize-none"
                    disabled={generating}
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] block">Aspect Ratio Node</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['1:1', '16:9', '9:16'] as const).map((ratio) => (
                      <button
                        key={ratio}
                        type="button"
                        onClick={() => setAspectRatio(ratio)}
                        className={`py-3 rounded-xl border text-[10px] font-black transition-all ${
                          aspectRatio === ratio
                            ? 'bg-neon-blue/20 border-neon-blue text-white'
                            : 'bg-royal-900 border-royal-800 text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {ratio}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] block">Synthesis Grade</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setQuality('standard')}
                      className={`py-3 rounded-xl border text-[10px] font-black transition-all flex items-center justify-center gap-2 ${
                        quality === 'standard'
                          ? 'bg-neon-purple/20 border-neon-purple text-white'
                          : 'bg-royal-900 border-royal-800 text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      <Zap size={14} /> STANDARD
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuality('high')}
                      className={`py-3 rounded-xl border text-[10px] font-black transition-all flex items-center justify-center gap-2 ${
                        quality === 'high'
                          ? 'bg-neon-blue/20 border-neon-blue text-white'
                          : 'bg-royal-900 border-royal-800 text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      <Sparkles size={14} /> PRO NODE
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={generating || !prompt.trim()}
                  className="w-full py-6 bg-gradient-to-r from-neon-purple to-neon-blue text-white font-black text-[11px] tracking-[0.5em] uppercase rounded-2xl hover:scale-105 transition-all shadow-[0_0_20px_rgba(217,70,239,0.3)] disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {generating ? (
                    <RefreshCw size={18} className="animate-spin" />
                  ) : (
                    <Layout size={18} />
                  )}
                  {generating ? 'Synthesizing...' : 'Initialize Blueprint'}
                </button>
              </form>
            </div>

            <div className="glass border border-royal-800 p-6 rounded-2xl flex items-center gap-4">
              <div className="p-3 bg-neon-blue/20 rounded-xl text-neon-blue">
                <Activity size={20} className={generating ? 'animate-pulse' : ''} />
              </div>
              <div>
                <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Engine Status</div>
                <div className="text-[10px] font-mono text-white tracking-widest uppercase">{statusMsg}</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="glass border border-royal-800 rounded-[3rem] min-h-[500px] flex flex-col items-center justify-center p-8 relative overflow-hidden shadow-inner">
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
              
              {generating ? (
                <div className="text-center space-y-8 animate-pulse">
                  <div className="w-32 h-32 border-4 border-dashed border-neon-blue rounded-full animate-spin-slow mx-auto flex items-center justify-center">
                    <Zap size={48} className="text-neon-blue" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-black text-white uppercase tracking-tighter">Blueprint in Production</h3>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.5em] mt-2">RCG Systems are active</p>
                  </div>
                </div>
              ) : resultImage ? (
                <div className="w-full space-y-8 animate-in fade-in duration-700">
                  <div className="relative group mx-auto max-w-4xl">
                    <div className="absolute -inset-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-[2rem] blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                    <div className="relative glass border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
                      <img 
                        src={resultImage} 
                        alt="Generated Blueprint" 
                        className="w-full h-auto object-contain"
                      />
                      <div className="absolute inset-0 pointer-events-none border-[12px] border-royal-950 opacity-20"></div>
                      <div className="absolute bottom-4 left-4 glass px-3 py-1 rounded-lg border border-white/10 text-[8px] font-mono text-white/50">
                        Blueprinted by SYNK_CORE v{COMPANY_DETAILS.appVersion}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center gap-6">
                    <button 
                      onClick={downloadImage}
                      className="px-8 py-4 bg-royal-900 border border-royal-700 text-white rounded-xl text-[10px] font-black tracking-widest uppercase hover:border-neon-blue hover:text-neon-blue transition-all flex items-center gap-2"
                    >
                      <Download size={16} /> Export Blueprint
                    </button>
                    <button 
                      onClick={() => { setPrompt(''); setResultImage(null); }}
                      className="px-8 py-4 bg-royal-900 border border-royal-700 text-white rounded-xl text-[10px] font-black tracking-widest uppercase hover:border-neon-purple hover:text-neon-purple transition-all flex items-center gap-2"
                    >
                      <RefreshCw size={16} /> New Sequence
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-6 opacity-30 grayscale group">
                  <div className="w-24 h-24 border border-dashed border-slate-500 rounded-full mx-auto flex items-center justify-center group-hover:border-neon-blue transition-colors">
                    <ImageIcon size={40} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.5em]">Awaiting Input Command</p>
                    <p className="text-[8px] font-mono mt-2">SYNK_VISUAL_INTERFACE: IDLE</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass p-6 rounded-2xl border border-royal-800 flex items-start gap-4">
                <div className="p-3 bg-neon-purple/20 rounded-xl text-neon-purple">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-1">Copyright Secure</h4>
                  <p className="text-[9px] text-slate-500 font-light leading-relaxed">Generated imagery is authorized for organizational internal blueprints under Level 4 protocol.</p>
                </div>
              </div>
              <div className="glass p-6 rounded-2xl border border-royal-800 flex items-start gap-4">
                <div className="p-3 bg-neon-green/20 rounded-xl text-neon-green">
                  <Cpu size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-1">Neural Parity</h4>
                  <p className="text-[9px] text-slate-500 font-light leading-relaxed">Blueprints are manifested using the native RCG-SYNK visual grounding nodes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Kit Downloader Integration */}
        <LogoExport />
      </div>
    </div>
  );
};

const Activity = ({ size, className }: { size: number, className: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

export default CreativeStudio;