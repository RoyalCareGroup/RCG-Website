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
            parts: [{ text: `Generate a high-fidelity landing page in raw HTML/Tailwind based on: "${prompt}". 
            - Use a dark, high-tech theme similar to Royal Care Group (#020817, neon blues, purples).
            - Include structural sections: Hero, SYNK Solution, and Call to Action.
            - ONLY return the code within a <body> container.` }] 
          }
        ],
        config: {
          systemInstruction: "You are the RCG Web Architect. Your output is elite, modern, and high-conversion.",
          temperature: 0.7,
        }
      });

      const rawHtml = response.text || '';
      const cleanHtml = rawHtml.replace(/```html|```/g, '');
      setGeneratedContent(cleanHtml);
      setShowPreview(true);
    } catch (error) {
      console.error("Synthesis failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-32 px-6 min-h-screen animate-fade-in relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-neon-blue/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-neon-blue/30 bg-neon-blue/10 text-neon-blue text-[10px] font-black tracking-[0.4em] mb-6 uppercase">
            <Globe size={14} className="mr-2" /> Web Blueprint Node
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-8 uppercase tracking-tighter leading-none">
            Web<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-pink-500">Synthesis.</span>
          </h1>
          <p className="text-xl text-slate-400 font-light border-l-2 border-royal-800 pl-6 leading-relaxed max-w-2xl">
            Manifest your organizational vision into a structural digital interface. Our neural engine generates elite landing page concepts optimized for the NDIS sector.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="glass border border-royal-800 p-10 rounded-[3rem] shadow-2xl">
              <h3 className="text-2xl font-display font-black text-white uppercase tracking-tighter mb-8 flex items-center gap-4">
                <Code className="text-neon-purple" /> Parameters
              </h3>
              <form onSubmit={generateBlueprint} className="space-y-8">
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., 'Quantum Care - High-tech SIL in QLD...'"
                  className="w-full bg-royal-950 border border-royal-800 rounded-2xl p-6 text-slate-200 focus:border-neon-blue transition-all min-h-[160px] outline-none font-light"
                />
                <button 
                  type="submit"
                  disabled={isLoading || !prompt.trim()}
                  className="w-full py-6 bg-white text-black font-black text-[11px] tracking-[0.6em] uppercase rounded-xl hover:bg-neon-blue hover:text-white border border-transparent hover:border-neon-blue/50 transition-all shadow-3xl disabled:opacity-50 flex items-center justify-center gap-4"
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
                 <Layout size={64} className="text-neon-blue opacity-50 mb-6" />
                 <h4 className="text-3xl font-display font-black text-white uppercase tracking-tighter mb-4">Structural Lab</h4>
                 <p className="text-slate-500 text-sm font-light max-w-sm">Awaiting parameters. Generated interfaces will manifest in the sovereign browser preview.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPreview && (
        <BrowserMockup onClose={() => setShowPreview(false)} url={`https://${prompt.split(' ')[0].toLowerCase()}.royalcare.lab`}>
          <div dangerouslySetInnerHTML={{ __html: generatedContent }} className="w-full min-h-screen bg-[#020817]" />
        </BrowserMockup>
      )}
    </div>
  );
};

export default WebLab;