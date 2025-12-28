import React, { useState, useRef } from 'react';
import { Film, Sparkles, Cpu, Zap, Download, RefreshCw, Monitor, Smartphone, Upload, Play, AlertCircle, Layout } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const VideoStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [resolution, setResolution] = useState<'720p' | '1080p'>('720p');
  const [statusMsg, setStatusMsg] = useState('Interface Idle');
  const [startFrame, setStartFrame] = useState<string | null>(null);
  const [endFrame, setEndFrame] = useState<string | null>(null);
  const fileInputRefStart = useRef<HTMLInputElement>(null);
  const fileInputRefEnd = useRef<HTMLInputElement>(null);

  const loadingMessages = ["Allocating neural cluster...", "Initializing Veo Engine...", "Rendering temporal pathways...", "Finalizing neural stream..."];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'start' | 'end') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(',')[1];
        if (type === 'start') setStartFrame(base64); else setEndFrame(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (generating) return;
    try {
      if (!await (window as any).aistudio.hasSelectedApiKey()) await (window as any).aistudio.openSelectKey();
      setGenerating(true); setVideoUrl(null);
      let step = 0; const interval = setInterval(() => setStatusMsg(loadingMessages[step++ % loadingMessages.length]), 8000);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const payload: any = { model: 'veo-3.1-fast-generate-preview', prompt: prompt.trim() || undefined, config: { numberOfVideos: 1, resolution, aspectRatio } };
      if (startFrame) payload.image = { imageBytes: startFrame, mimeType: 'image/png' };
      if (endFrame) payload.config.lastFrame = { imageBytes: endFrame, mimeType: 'image/png' };
      let op = await ai.models.generateVideos(payload);
      while (!op.done) { await new Promise(r => setTimeout(r, 10000)); op = await ai.operations.getVideosOperation({ operation: op }); }
      const uri = op.response?.generatedVideos?.[0]?.video?.uri;
      if (uri) { const res = await fetch(`${uri}&key=${process.env.API_KEY}`); const blob = await res.blob(); setVideoUrl(URL.createObjectURL(blob)); }
      clearInterval(interval);
    } catch (err) { alert("Neural stream failure. Ensure valid API Key."); } finally { setGenerating(false); setStatusMsg('Terminated'); }
  };

  return (
    <div className="pt-32 pb-32 px-6 animate-fade-in min-h-screen relative overflow-hidden bg-royal-950">
      <div className="absolute top-0 right-0 w-full h-[800px] bg-neon-purple/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-neon-purple/30 bg-neon-purple/10 text-neon-purple text-[10px] font-black tracking-[0.4em] mb-6 uppercase">
            <Film size={14} className="mr-2" /> Kinetic Synthesis Engine
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6 uppercase tracking-tighter leading-none">Video Studio</h1>
          <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto">Architecting temporal reality through elite neural pipelines.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 space-y-8">
            <div className="glass border border-royal-800 p-8 rounded-[2.5rem] shadow-2xl relative">
              <form onSubmit={generateVideo} className="space-y-8">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the kinetic sequence..."
                  className="w-full bg-royal-950 border border-royal-800 rounded-2xl p-6 text-sm text-slate-200 outline-none focus:border-neon-purple transition-all min-h-[140px] resize-none"
                  disabled={generating}
                />
                <button
                  type="submit"
                  disabled={generating}
                  className="w-full py-6 bg-white text-black font-black text-[11px] tracking-[0.5em] uppercase rounded-xl hover:bg-neon-blue hover:text-white border border-transparent hover:border-neon-blue/50 transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-4"
                >
                  {generating ? <RefreshCw size={18} className="animate-spin" /> : <Zap size={18} />}
                  {generating ? 'SYNTHESIZING...' : 'INITIALIZE KINETIC BUILD'}
                </button>
              </form>
            </div>
            <div className="glass border border-royal-800 p-6 rounded-2xl flex items-center gap-4">
              <Cpu size={20} className={generating ? 'animate-pulse text-neon-blue' : 'text-slate-600'} />
              <div>
                <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Engine Status</div>
                <div className="text-[10px] font-mono text-white tracking-widest uppercase">{statusMsg}</div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-8">
            <div className="glass border border-royal-800 rounded-[3rem] min-h-[500px] flex flex-col items-center justify-center p-8 relative overflow-hidden shadow-inner">
              {generating ? <Play size={48} className="text-neon-purple animate-pulse" /> : videoUrl ? <video src={videoUrl} controls autoPlay className="w-full h-auto rounded-[2rem] shadow-2xl" /> : <Film size={56} className="text-slate-800 opacity-20" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoStudio;