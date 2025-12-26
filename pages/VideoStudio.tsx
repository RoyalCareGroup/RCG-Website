
import React, { useState, useRef } from 'react';
import { 
  Film, 
  Sparkles, 
  Cpu, 
  Zap, 
  Download, 
  RefreshCw, 
  Monitor, 
  Smartphone, 
  Upload, 
  Play, 
  AlertCircle,
  Layout
} from 'lucide-react';
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

  const loadingMessages = [
    "Allocating neural cluster...",
    "Initializing Veo Engine v3.1...",
    "Synchronizing temporal vectors...",
    "Synthesizing kinetic blueprints...",
    "Rendering photonic pathways...",
    "Compiling motion frames...",
    "Optimizing structural coherence...",
    "Finalizing neural stream...",
    "Generating MP4 container...",
    "RCG systems performing deep-render..."
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'start' | 'end') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        if (type === 'start') setStartFrame(base64String);
        else setEndFrame(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const checkAndPromptKey = async () => {
    try {
      const hasKey = await (window as any).aistudio.hasSelectedApiKey();
      if (!hasKey) {
        alert("Veo Video Generation requires a paid API Key from a GCP project. Please select your key in the next dialog.");
        await (window as any).aistudio.openSelectKey();
      }
      return true;
    } catch (e) {
      console.error("Key selection error:", e);
      return false;
    }
  };

  const generateVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (generating) return;

    const keySelected = await checkAndPromptKey();
    if (!keySelected) return;

    setGenerating(true);
    setVideoUrl(null);
    let msgIndex = 0;
    const interval = setInterval(() => {
      setStatusMsg(loadingMessages[msgIndex % loadingMessages.length]);
      msgIndex++;
    }, 8000);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const config: any = {
        numberOfVideos: 1,
        resolution: resolution,
        aspectRatio: aspectRatio
      };

      const payload: any = {
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt.trim() || undefined,
        config: config
      };

      if (startFrame) {
        payload.image = {
          imageBytes: startFrame,
          mimeType: 'image/png'
        };
      }

      if (endFrame) {
        payload.config.lastFrame = {
          imageBytes: endFrame,
          mimeType: 'image/png'
        };
      }

      let operation = await ai.models.generateVideos(payload);

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const blob = await response.blob();
        setVideoUrl(URL.createObjectURL(blob));
      } else {
        throw new Error("Neural stream collapsed: No URI returned.");
      }

    } catch (error: any) {
      console.error("Video synthesis failed:", error);
      if (error?.message?.includes("Requested entity was not found.")) {
        await (window as any).aistudio.openSelectKey();
      }
      alert("Temporal Bridge Failure: Unable to manifest video data. Ensure your API Key is valid and billing is active.");
    } finally {
      clearInterval(interval);
      setGenerating(false);
      setStatusMsg('Synthesis Terminated');
    }
  };

  return (
    <div className="pt-32 pb-32 px-6 animate-fade-in min-h-screen relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-[800px] bg-neon-purple/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-neon-purple/30 bg-neon-purple/10 text-neon-purple text-[10px] font-black tracking-[0.4em] mb-6 uppercase">
            <Film size={14} className="mr-2" /> Kinetic Synthesis Engine
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-black text-white mb-6 uppercase tracking-tighter">Video Studio</h1>
          <p className="text-slate-500 uppercase tracking-[0.6em] text-[11px] font-black max-w-2xl mx-auto">
            Architecting temporal reality. Re-engineering visual kinetics through elite neural pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 space-y-8">
            <div className="glass border border-royal-800 p-8 rounded-[2.5rem] shadow-2xl relative">
              <form onSubmit={generateVideo} className="space-y-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] block">Kinetic Instruction (Prompt)</label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the kinetic sequence..."
                    className="w-full bg-royal-950 border border-royal-800 rounded-2xl p-6 text-sm text-slate-200 outline-none focus:border-neon-purple transition-all min-h-[140px] resize-none"
                    disabled={generating}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] block">Aspect Ratio</label>
                      <div className="flex gap-2">
                         <button 
                            type="button"
                            onClick={() => setAspectRatio('16:9')}
                            className={`p-3 rounded-xl border flex-1 transition-all ${aspectRatio === '16:9' ? 'bg-neon-blue/20 border-neon-blue text-white' : 'bg-royal-900 border-royal-800 text-slate-500'}`}
                         >
                            <Monitor size={18} className="mx-auto" />
                         </button>
                         <button 
                            type="button"
                            onClick={() => setAspectRatio('9:16')}
                            className={`p-3 rounded-xl border flex-1 transition-all ${aspectRatio === '9:16' ? 'bg-neon-blue/20 border-neon-blue text-white' : 'bg-royal-900 border-royal-800 text-slate-500'}`}
                         >
                            <Smartphone size={18} className="mx-auto" />
                         </button>
                      </div>
                   </div>
                   <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] block">Resolution</label>
                      <div className="flex gap-2">
                         {(['720p', '1080p'] as const).map(res => (
                           <button
                             key={res}
                             type="button"
                             onClick={() => setResolution(res)}
                             className={`p-3 rounded-xl border flex-1 text-[10px] font-black transition-all ${resolution === res ? 'bg-neon-purple/20 border-neon-purple text-white' : 'bg-royal-900 border-royal-800 text-slate-500'}`}
                           >
                             {res}
                           </button>
                         ))}
                      </div>
                   </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] block">Temporal Anchors (Optional Images)</label>
                  <div className="grid grid-cols-2 gap-3">
                     <button 
                        type="button"
                        onClick={() => fileInputRefStart.current?.click()}
                        className={`py-3 rounded-xl border border-dashed text-[9px] font-black uppercase tracking-widest transition-all ${startFrame ? 'border-neon-green text-neon-green' : 'border-royal-700 text-slate-500'}`}
                     >
                        <Upload size={14} className="mx-auto mb-1" />
                        {startFrame ? 'START SET' : 'START FRAME'}
                     </button>
                     <button 
                        type="button"
                        onClick={() => fileInputRefEnd.current?.click()}
                        className={`py-3 rounded-xl border border-dashed text-[9px] font-black uppercase tracking-widest transition-all ${endFrame ? 'border-neon-green text-neon-green' : 'border-royal-700 text-slate-500'}`}
                     >
                        <Upload size={14} className="mx-auto mb-1" />
                        {endFrame ? 'END SET' : 'END FRAME'}
                     </button>
                     <input type="file" hidden ref={fileInputRefStart} onChange={(e) => handleImageUpload(e, 'start')} accept="image/*" />
                     <input type="file" hidden ref={fileInputRefEnd} onChange={(e) => handleImageUpload(e, 'end')} accept="image/*" />
                  </div>
                </div>

                <div className="p-4 bg-royal-900 border border-royal-800 rounded-2xl flex items-start gap-3">
                  <AlertCircle size={16} className="text-neon-blue mt-0.5" />
                  <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest leading-relaxed">
                    Paid API Key Required. Billing must be enabled at <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-neon-blue hover:underline">ai.google.dev/billing</a>.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={generating}
                  className="w-full py-6 bg-gradient-to-r from-neon-purple to-neon-blue text-white font-black text-[11px] tracking-[0.5em] uppercase rounded-2xl hover:scale-105 transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-4"
                >
                  {generating ? (
                    <RefreshCw size={18} className="animate-spin" />
                  ) : (
                    <Zap size={18} />
                  )}
                  {generating ? 'SYNTHESIZING TEMPORAL DATA...' : 'INITIALIZE KINETIC BUILD'}
                </button>
              </form>
            </div>

            <div className="glass border border-royal-800 p-6 rounded-2xl flex items-center gap-4">
              <div className="p-3 bg-neon-blue/20 rounded-xl text-neon-blue">
                <Cpu size={20} className={generating ? 'animate-pulse' : ''} />
              </div>
              <div>
                <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Engine Status</div>
                <div className="text-[10px] font-mono text-white tracking-widest uppercase">{statusMsg}</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="glass border border-royal-800 rounded-[3rem] min-h-[500px] flex flex-col items-center justify-center p-8 relative overflow-hidden shadow-inner">
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
              
              {generating ? (
                <div className="text-center space-y-12 relative z-10">
                   <div className="relative mx-auto w-40 h-40">
                      <div className="absolute inset-0 border-4 border-dashed border-neon-purple rounded-full animate-spin-slow"></div>
                      <div className="absolute inset-4 border-4 border-dashed border-neon-blue rounded-full animate-spin-reverse-slow"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                         <Play size={48} className="text-white animate-pulse" />
                      </div>
                   </div>
                   <div className="space-y-4">
                      <h3 className="text-3xl font-display font-black text-white uppercase tracking-tighter">Neural Stream active</h3>
                      <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.6em] max-w-sm mx-auto">
                        High-fidelity temporal render in progress. Estimated completion: 120-180 seconds.
                      </p>
                      <div className="flex justify-center gap-2">
                         {[1,2,3,4,5].map(i => (
                           <div key={i} className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-bounce" style={{ animationDelay: `${i*0.2}s` }}></div>
                         ))}
                      </div>
                   </div>
                </div>
              ) : videoUrl ? (
                <div className="w-full space-y-8 animate-in fade-in duration-1000">
                  <div className="relative group mx-auto max-w-4xl">
                    <div className="absolute -inset-1 bg-gradient-to-r from-neon-purple to-neon-blue rounded-[2rem] blur opacity-40 group-hover:opacity-70 transition duration-1000"></div>
                    <div className="relative glass border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
                      <video 
                        src={videoUrl} 
                        controls 
                        autoPlay 
                        className="w-full h-auto aspect-video object-contain"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-center gap-6">
                    <a 
                      href={videoUrl}
                      download={`RCG_Video_${Date.now()}.mp4`}
                      className="px-10 py-5 bg-royal-900 border border-royal-700 text-white rounded-2xl text-[10px] font-black tracking-widest uppercase hover:border-neon-blue hover:text-neon-blue transition-all flex items-center gap-3"
                    >
                      <Download size={18} /> Export Stream
                    </a>
                    <button 
                      onClick={() => { setPrompt(''); setVideoUrl(null); setStartFrame(null); setEndFrame(null); }}
                      className="px-10 py-5 bg-royal-900 border border-royal-700 text-white rounded-2xl text-[10px] font-black tracking-widest uppercase hover:border-neon-purple hover:text-neon-purple transition-all flex items-center gap-3"
                    >
                      <RefreshCw size={18} /> New Protocol
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-8 opacity-20 grayscale group cursor-default">
                  <div className="w-32 h-32 border-2 border-dashed border-slate-500 rounded-full mx-auto flex items-center justify-center group-hover:border-neon-purple transition-colors">
                    <Film size={56} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-display font-black text-white uppercase tracking-tighter">Awaiting Logic Command</h4>
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] mt-2">RCG_VEO_SYNTH_STATUS: STANDBY</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
               {[
                 { title: 'Temporal Consistency', desc: 'Maintains organizational visual logic through deep kinetic render.', icon: <Sparkles className="text-neon-blue" /> },
                 { title: 'Structural Fidelity', desc: 'High-fidelity video manifestation for provider marketing protocols.', icon: <Layout className="text-neon-purple" /> },
                 { title: 'Neural Integration', desc: 'Direct link to SYNK Core vision nodes for seamless asset creation.', icon: <Cpu className="text-neon-green" /> }
               ].map((feat, i) => (
                 <div key={i} className="glass p-6 rounded-3xl border border-royal-800 hover:border-royal-700 transition-all">
                    <div className="mb-4">{feat.icon}</div>
                    <h5 className="text-[10px] font-black text-white uppercase tracking-widest mb-2">{feat.title}</h5>
                    <p className="text-[9px] text-slate-500 font-light leading-relaxed">{feat.desc}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoStudio;
