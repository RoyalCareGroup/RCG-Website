import React, { useState, useEffect } from 'react';
import { Search, Code, Globe, Layout, Send, Loader2, Sparkles, ChevronRight, Zap } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { BrowserMockup } from '../components/BrowserMockup.tsx';

const WebLab: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const generateBlueprint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;
    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [{ role: 'user', parts: [{ text: `Generate a high-fidelity landing page in raw HTML/Tailwind based on: "${prompt}". Use high-tech dark theme.` }] }],
        config: { systemInstruction: "You are the RCG Web Architect.", temperature: 0.7 }
      });
      setGeneratedContent((response.text || '').replace(/```html|```/g, ''));
      setShowPreview(true);
    } catch (err) {} finally { setIsLoading(false); }
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

      <div className="max-w-7xl mx-auto pt-48 pb-32 relative z-10">
        <div className="mb-20 animate-hero-reveal">
          <div className="circuit-capsule border-2 border-white/80 bg-black text-white px-4 py-2 rounded-full text-[10px] font-black tracking-[0.4em] mb-6 uppercase shadow-2xl">
            <Globe size={14} className="mr-2" /> Web Blueprint Node
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-black text-white mb-8 uppercase tracking-tighter leading-none heading-wow">Web<br/><span className="heading-tech">Synthesis.</span></h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="orbital-tile border-2 border-white/10 p-10 bg-black shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
              <form onSubmit={generateBlueprint} className="space-y-8">
                <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full bg-royal-950 border-2 border-white/10 rounded-2xl p-8 text-white outline-none focus:border-neon-blue transition-all min-h-[200px] font-black shadow-inner" />
                <button type="submit" disabled={isLoading || !prompt.trim()} className="w-full py-6 bg-black border-[3px] border-neon-green rounded-xl text-white font-black text-[11px] tracking-[0.6em] uppercase flex items-center justify-center gap-6 group hover:scale-105 active:border-neon-purple active:text-neon-purple transition-all shadow-2xl disabled:opacity-50">
                  {isLoading ? <Loader2 className="animate-spin text-neon-blue" /> : <Zap size={18} className="text-neon-green group-active:text-neon-purple transition-colors" />}
                  {isLoading ? 'Synthesizing...' : 'Initialize Build'}
                </button>
              </form>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="orbital-tile border-2 border-white/10 rounded-[4rem] aspect-video flex flex-col items-center justify-center bg-black/40 shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
               <Layout size={64} className="text-white/10" />
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