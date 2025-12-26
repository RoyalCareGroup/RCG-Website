
import React, { useState } from 'react';
import { Search, Code, Globe, Layout, Send, Loader2, Sparkles, ChevronRight } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { BrowserMockup } from '../components/BrowserMockup.tsx';

const WebLab: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string>('');

  const generateBlueprint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [
          { 
            role: 'user', 
            parts: [{ text: `Generate a high-fidelity, structural landing page design in raw HTML/Tailwind CSS based on this concept: "${prompt}". 
            - Use a dark, high-tech theme similar to Royal Care Group (colors: #01040f, neon blues, purples).
            - Include structural sections: Hero, Problem, SYNK Solution, Statistics, and a Call to Action.
            - DO NOT include external image tags unless they are from Unsplash placeholder (https://images.unsplash.com/...).
            - Use Lucide-like SVG icons where possible.
            - Ensure it is responsive.
            - ONLY return the code within a <body> container. No <html> or <head> tags needed.` }] 
          }
        ],
        config: {
          systemInstruction: "You are the RCG Web Architect. You translate provider missions into structural digital interfaces. Your output is elite, modern, and high-conversion.",
          temperature: 0.7,
        }
      });

      const rawHtml = response.text || '';
      // Cleanup code block markers if present
      const cleanHtml = rawHtml.replace(/```html|```/g, '');
      setGeneratedContent(cleanHtml);
      setShowPreview(true);
    } catch (error) {
      console.error("Blueprint synthesis failed:", error);
      alert("Neural Bridge failure. Unable to synthesize structural web data.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-32 px-6 min-h-screen animate-fade-in relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-neon-blue/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-neon-blue/30 bg-neon-blue/10 text-neon-blue text-[10px] font-black tracking-[0.4em] mb-6 uppercase">
              <Globe size={14} className="mr-2" /> Web Blueprint Node
            </div>
            <h1 className="text-5xl md:text-8xl font-display font-black text-white mb-8 uppercase tracking-tighter leading-none">
              Web<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-pink-500">Synthesis.</span>
            </h1>
            <p className="text-xl text-slate-400 font-light border-l-2 border-royal-800 pl-6 leading-relaxed">
              Manifest your organizational vision into a structural digital interface. Our neural engine generates elite landing page concepts optimized for the NDIS sector.
            </p>
          </div>
          
          <div className="flex gap-4">
             <div className="glass p-6 rounded-3xl border border-royal-800 text-center min-w-[140px]">
                <div className="text-2xl font-black text-white">4.2s</div>
                <div className="text-[8px] text-slate-500 font-black uppercase tracking-widest mt-1">Synthesis Speed</div>
             </div>
             <div className="glass p-6 rounded-3xl border border-royal-800 text-center min-w-[140px]">
                <div className="text-2xl font-black text-neon-blue">∞</div>
                <div className="text-[8px] text-slate-500 font-black uppercase tracking-widest mt-1">Layout Variants</div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="glass border border-royal-800 p-10 rounded-[3rem] shadow-2xl">
              <h3 className="text-2xl font-display font-black text-white uppercase tracking-tighter mb-8 flex items-center gap-4">
                <Code className="text-neon-purple" /> Input Parameters
              </h3>
              <form onSubmit={generateBlueprint} className="space-y-8">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-4 block">Organization Mission & Name</label>
                  <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., 'Quantum Care - An NDIS provider focusing on high-tech SIL accommodation in Queensland...'"
                    className="w-full bg-royal-950 border border-royal-800 rounded-2xl p-6 text-slate-200 focus:border-neon-blue transition-all min-h-[160px] outline-none font-light"
                  />
                </div>
                
                <div className="p-6 bg-royal-900/50 rounded-2xl border border-royal-800 space-y-4">
                   <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                      <span>Neural Calibration</span>
                      <span className="text-neon-blue">Optimal</span>
                   </div>
                   <div className="w-full h-1 bg-royal-950 rounded-full overflow-hidden">
                      <div className="h-full bg-neon-blue w-3/4 animate-pulse"></div>
                   </div>
                </div>

                <button 
                  type="submit"
                  disabled={isLoading || !prompt.trim()}
                  className="w-full py-6 bg-gradient-to-r from-neon-purple to-neon-blue text-white font-black text-[11px] tracking-[0.6em] uppercase rounded-2xl hover:scale-105 transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-4"
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
                  {isLoading ? 'Synthesizing...' : 'Initialize Build'}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-[4rem] blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative glass border border-royal-800 rounded-[4rem] p-12 overflow-hidden aspect-video flex flex-col items-center justify-center text-center">
                 <div className="mb-10 p-6 bg-royal-900 border border-royal-800 rounded-full">
                    <Layout size={64} className="text-neon-blue opacity-50" />
                 </div>
                 <h4 className="text-3xl font-display font-black text-white uppercase tracking-tighter mb-4">Structural Lab</h4>
                 <p className="text-slate-500 text-sm font-light max-w-sm">
                   Awaiting structural parameters. Once synthesized, your blueprint will manifest in the sovereign browser preview.
                 </p>
                 <div className="mt-12 flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-royal-800"></div>
                    <div className="w-2 h-2 rounded-full bg-royal-800"></div>
                    <div className="w-2 h-2 rounded-full bg-royal-800"></div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPreview && (
        <BrowserMockup 
          onClose={() => setShowPreview(false)} 
          url={`https://${prompt.split(' ')[0].toLowerCase() || 'blueprint'}.royalcare.lab`}
        >
          <div 
            dangerouslySetInnerHTML={{ __html: generatedContent }} 
            className="w-full min-h-screen bg-[#01040f]"
          />
        </BrowserMockup>
      )}
    </div>
  );
};

export default WebLab;