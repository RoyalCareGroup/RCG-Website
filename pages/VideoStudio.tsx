import React, { useState, useRef, useEffect } from 'react';
import { Film, Sparkles, Cpu, Zap, Download, RefreshCw, Monitor, Smartphone, Upload, Play, AlertCircle, Layout } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const VideoStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [resolution, setResolution] = useState<'720p' | '1080p'>('720p');
  const [statusMsg, setStatusMsg] = useState('Interface Idle');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadingMessages = ["Allocating neural cluster...", "Initializing Veo Engine...", "Rendering temporal pathways..."];

  const generateVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (generating) return;
    try {
      if (!await (window as any).aistudio.hasSelectedApiKey()) await (window as any).aistudio.openSelectKey();
      setGenerating(true); setVideoUrl(null);
      let step = 0; const interval = setInterval(() => setStatusMsg(loadingMessages[step++ % loadingMessages.length]), 8000);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let op = await ai.models.generateVideos({ model: 'veo-3.1-fast-generate-preview', prompt, config: { numberOfVideos: 1, resolution, aspectRatio } });
      while (!op.done) { await new Promise(r => setTimeout(r, 10000)); op = await ai.operations.getVideosOperation({ operation: op }); }
      const uri = op.response?.generatedVideos?.[0]?.video?.uri;
      if (uri) { const res = await fetch(`${uri}&key=${process.env.API_KEY}`); const blob = await res.blob(); setVideoUrl(URL.createObjectURL(blob)); }
      clearInterval(interval);
    } catch (err) { alert("Neural stream failure."); } finally { setGenerating(false); setStatusMsg('Interface Idle'); }
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
        <div className="text-center mb-16 animate-hero-reveal">
          <div className="circuit-capsule border-2 border-white/80 bg-black text-white px-4 py-2 rounded-full text-[10px] font-black tracking-[0.4em] mb-6 uppercase shadow-2xl">
            <Film size={14} className="mr-2" /> Kinetic Synthesis Engine
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-black text-white mb-6 uppercase tracking-tighter leading-none heading-wow">Video<br/><span className="heading-tech">Studio.</span></h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 space-y-8">
            <div className="orbital-tile border-2 border-white/10 p-10 bg-black shadow-3xl">
              <form onSubmit={generateVideo} className="space-y-8">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full bg-royal-950 border-2 border-white/10 rounded-2xl p-6 text-white outline-none focus:border-neon-purple transition-all min-h-[140px] font-black shadow-inner"
                  disabled={generating}
                />
                <button type="submit" disabled={generating} className="slim-orbital-btn w-full py-8 text-black bg-white font-black text-[11px] tracking-[0.5em] uppercase transition-all shadow-3xl active:scale-95">
                  {generating ? <RefreshCw size={18} className="animate-spin" /> : <Zap size={18} />}
                  {generating ? 'SYNTHESIZING...' : 'INITIALIZE KINETIC BUILD'}
                </button>
              </form>
            </div>
          </div>
          <div className="lg:col-span-8">
            <div className="orbital-tile border-2 border-white/10 rounded-[3rem] min-h-[500px] flex flex-col items-center justify-center p-8 relative overflow-hidden bg-black shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
              {generating ? <Play size={64} className="text-neon-purple animate-pulse" /> : videoUrl ? <video src={videoUrl} controls autoPlay className="w-full h-auto rounded-[2rem] shadow-3xl" /> : <Film size={64} className="text-white/10" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoStudio;