
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Layout, Sparkles, Download, RefreshCw, Layers, ShieldCheck, Cpu, Terminal, Zap } from 'lucide-react';
import { useSovereign } from '../context/SovereignContext.tsx';
import { COMPANY_DETAILS } from '../config.ts';

export const FutureStateArchitect: React.FC = () => {
  const [constraints, setConstraints] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [blueprint, setBlueprint] = useState<string | null>(null);
  const [status, setStatus] = useState('Laboratory Standby');
  const { setIsThinking } = useSovereign();

  const progressMessages = [
    "Analyzing Organizational Debt...",
    "Calibrating Structural Vectors...",
    "Synthesizing Sovereign Geometry...",
    "Rendering Neural Mainframe...",
    "Applying RCG-SYNK Overlays...",
    "Finalizing Visual Integrity..."
  ];

  const generateVision = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!constraints.trim() || isGenerating) return;

    // Check for API Key (Mandatory for Pro models)
    try {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await window.aistudio.openSelectKey();
        // Proceeding immediately as per instructions
      }
    } catch (err) {
      console.warn("Key selection bypassed:", err);
    }

    setIsGenerating(true);
    setIsThinking(true);
    setBlueprint(null);
    let step = 0;
    const interval = setInterval(() => {
      setStatus(progressMessages[step % progressMessages.length]);
      step++;
    }, 2500);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `A hyper-detailed architectural blueprint and futuristic facility diagram for a sovereign NDIS provider. The facility is optimized to solve these constraints: "${constraints}". Style: high-tech dark theme, holographic data overlays, neon purple and cyan accents, technical schematics, 4K resolution, blueprint aesthetic, clean professional lines. RCG Royal Brand identity.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: { parts: [{ text: prompt }] },
        config: {
          imageConfig: {
            aspectRatio: "16:9",
            imageSize: "1K"
          }
        }
      });

      let foundImage = false;
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          setBlueprint(`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`);
          foundImage = true;
          break;
        }
      }

      if (!foundImage) throw new Error("Synthesis failed to manifest visual data.");

    } catch (error: any) {
      console.error("Architect Error:", error);
      if (error?.message?.includes("Requested entity was not found.")) {
        await window.aistudio.openSelectKey();
      }
      alert("Neural Cluster Error: Unable to manifest structural vision. Re-synchronize and try again.");
    } finally {
      clearInterval(interval);
      setIsGenerating(false);
      setIsThinking(false);
      setStatus('Synthesis Complete');
    }
  };

  return (
    <div className="w-full py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Controls Side */}
          <div className="lg:col-span-4 space-y-10">
            <div className="space-y-6">
               <div className="circuit-capsule px-6 py-2 border-neon-blue/40 bg-black text-neon-blue text-[9px] font-black uppercase tracking-[0.4em] inline-flex items-center gap-3">
                 <Cpu size={14} className={isGenerating ? 'animate-spin' : ''} /> Visual Mainframe Core
               </div>
               <h2 className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tighter leading-none">
                 Future-State <br/><span className="text-neon-blue">Architect.</span>
               </h2>
               <p className="text-slate-400 text-sm font-bold italic opacity-80 leading-relaxed">
                  Input your organizational constraints. Aurelia will synthesize a visual blueprint of your optimized future infrastructure.
               </p>
            </div>

            <div className="orbital-tile p-8 bg-black border border-white/10 shadow-3xl">
               <form onSubmit={generateVision} className="space-y-8">
                  <div className="space-y-3">
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
                        <Terminal size={12} className="text-neon-purple" /> Organizational Constraints
                     </label>
                     <textarea 
                        value={constraints}
                        onChange={(e) => setConstraints(e.target.value)}
                        placeholder="E.g. Scaling to 100 SIL houses, reducing rejected claims, and automating participant intake..."
                        className="w-full bg-royal-950 border border-white/10 rounded-2xl p-6 text-white text-sm outline-none focus:border-neon-blue transition-all min-h-[160px] font-bold shadow-inner placeholder:text-slate-800"
                        disabled={isGenerating}
                     />
                  </div>

                  <button 
                    type="submit"
                    disabled={isGenerating || !constraints.trim()}
                    className="slim-orbital-btn w-full py-6 bg-white text-black font-black text-[11px] tracking-[0.5em] uppercase transition-all shadow-3xl hover:bg-neon-blue hover:text-white flex items-center justify-center gap-4 active:scale-95 disabled:opacity-50"
                  >
                    {isGenerating ? <RefreshCw className="animate-spin" size={18} /> : <Zap size={18} className="text-neon-purple" />}
                    {isGenerating ? 'Synthesizing...' : 'Initialize Build'}
                  </button>
               </form>
            </div>

            <div className="flex items-center gap-6 px-6 py-4 bg-royal-950/50 rounded-2xl border border-white/5 shadow-inner">
               <div className={`w-3 h-3 rounded-full ${isGenerating ? 'bg-neon-purple animate-pulse shadow-[0_0_12px_#d946ef]' : 'bg-slate-700'}`}></div>
               <div className="flex flex-col">
                  <span className="text-[8px] text-slate-500 uppercase tracking-widest font-black">Synthesis Pipeline</span>
                  <span className="text-[10px] font-mono text-white font-black">{status}</span>
               </div>
            </div>
          </div>

          {/* Viewport Side */}
          <div className="lg:col-span-8">
             <div className="orbital-tile border-2 border-white/10 rounded-[3rem] min-h-[600px] flex flex-col items-center justify-center p-8 lg:p-12 relative overflow-hidden bg-black shadow-[0_80px_160px_rgba(0,0,0,0.9)]">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-10"></div>
                
                {isGenerating ? (
                  <div className="text-center space-y-10 animate-pulse relative z-10">
                     <div className="w-48 h-48 border-4 border-dashed border-neon-blue rounded-full animate-spin-slow flex items-center justify-center mx-auto">
                        <Sparkles size={64} className="text-neon-blue" />
                     </div>
                     <div className="space-y-4">
                        <h3 className="text-3xl font-display font-black text-white uppercase tracking-tighter">Manifesting Infrastructure...</h3>
                        <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.5em]">RCG_NEURAL_ENGINE_ACTIVE</p>
                     </div>
                  </div>
                ) : blueprint ? (
                  <div className="w-full space-y-10 animate-in fade-in zoom-in-95 duration-1000 relative z-10">
                     <div className="group relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-blue rounded-[2.5rem] blur opacity-30 group-hover:opacity-60 transition-all duration-1000"></div>
                        <img 
                          src={blueprint} 
                          alt="Structural Vision" 
                          className="w-full h-auto rounded-[2rem] border-2 border-white/10 shadow-3xl"
                        />
                        <div className="absolute top-6 left-6 px-4 py-2 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 text-[8px] font-mono text-neon-blue font-black uppercase tracking-widest">
                           Sovereign_Blueprint_Node_Gnd
                        </div>
                     </div>

                     <div className="flex justify-center gap-6">
                        <a 
                          href={blueprint} 
                          download={`RCG_FutureState_${Date.now()}.png`}
                          className="px-12 py-5 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-neon-blue hover:text-white transition-all shadow-2xl active:scale-95 flex items-center gap-4"
                        >
                           <Download size={16} /> Export vision
                        </a>
                        <button 
                          onClick={() => setBlueprint(null)}
                          className="px-12 py-5 bg-royal-950 text-white border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all shadow-xl active:scale-95"
                        >
                           Reset Lab
                        </button>
                     </div>
                  </div>
                ) : (
                  <div className="text-center space-y-10 opacity-20 group relative z-10">
                     <div className="relative">
                        <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full scale-150"></div>
                        <Layout size={120} className="text-white mx-auto group-hover:scale-110 transition-transform duration-1000" />
                     </div>
                     <div>
                        <p className="text-[12px] font-black uppercase tracking-[1em]">Awaiting_Payload</p>
                        <p className="text-[8px] font-mono mt-4">Structural Lab Initialized & Grounded</p>
                     </div>
                  </div>
                )}
             </div>

             <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-black/40 border border-white/5 rounded-2xl flex items-start gap-4">
                   <ShieldCheck className="text-neon-blue shrink-0" size={20} />
                   <p className="text-[10px] text-slate-500 font-bold leading-relaxed italic">
                      "Generated visualizations are proprietary conceptual blueprints for internal organizational strategy only."
                   </p>
                </div>
                <div className="p-6 bg-black/40 border border-white/5 rounded-2xl flex items-start gap-4">
                   <Layers className="text-neon-purple shrink-0" size={20} />
                   <p className="text-[10px] text-slate-500 font-bold leading-relaxed italic">
                      "Neural grounding utilizes the latest RCG Architectural Standards to ensure high-fidelity business mapping."
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
