import React, { useState, useEffect } from 'react';
import { Palette, Type, Layout, Package, Copy, Check, Download, Layers, ShieldCheck, Cpu, Crown, Share2, Globe, ExternalLink, ArrowDownCircle } from 'lucide-react';
import { COMPANY_DETAILS } from '../config.ts';
import { LogoExport } from '../components/LogoExport.tsx';
import { BrandLogo } from '../components/BrandLogo.tsx';
import { SynkProductIcon, SynkIconType } from '../components/SynkProductIcon.tsx';
import { RoyalSocialCard } from '../components/RoyalSocialCard.tsx';

const DesignSystem: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const ColorChip = ({ color, name, label }: { color: string, name: string, label: string }) => (
    <div className="group relative">
      <div 
        className="h-32 w-full rounded-2xl mb-4 border-2 border-white/10 shadow-2xl transition-transform hover:scale-[1.02] cursor-pointer"
        style={{ backgroundColor: color }}
        onClick={() => copyToClipboard(color)}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-10 transition-opacity bg-black/20 rounded-2xl">
          {copied === color ? <Check className="text-white" /> : <Copy className="text-white" />}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <div className="text-white font-black text-[10px] uppercase tracking-widest">{name}</div>
          <div className="text-slate-500 text-[10px] font-mono">{label}</div>
        </div>
        <div className="text-neon-blue font-mono text-[10px]">{color}</div>
      </div>
    </div>
  );

  const triggerSocialDownload = () => {
    const btn = document.getElementById('trigger-social-graphic');
    if (btn) btn.click();
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
        <div className="mb-24 animate-hero-reveal">
          <div className="circuit-capsule mb-10 px-4 py-2 rounded-full border-2 border-white/80 bg-black text-white text-[10px] font-black tracking-[0.4em] uppercase shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            <Palette className="w-4 h-4 mr-2" /> Identity & Assets Hub
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-black text-white mb-6 uppercase tracking-tighter leading-[0.85] heading-wow">
            Brand <br/><span className="heading-tech">Architecture.</span>
          </h1>
          <p className="text-white text-2xl font-bold leading-relaxed border-l-8 border-neon-purple pl-10 max-w-2xl opacity-70 italic">
            The official design system and technical asset library for Royal Care Group. 
            Authorization Level: Administrative.
          </p>
        </div>

        {/* Major Tiles set to black for high-contrast slate look */}
        <section className="mb-32">
          <div className="orbital-tile p-12 md:p-20 bg-black border-2 border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative overflow-hidden">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                <div className="lg:col-span-4 space-y-8">
                   <h3 className="text-4xl font-display font-black text-white uppercase tracking-tight">Identity Matrix</h3>
                   <p className="text-white text-lg font-black opacity-60 leading-relaxed italic">
                      "Production-ready high-resolution assets, typography documentation, and structural CSS variables for organizational integration."
                   </p>
                   <LogoExport />
                </div>
                <div className="lg:col-span-8 flex flex-col items-center">
                   <div className="max-w-2xl w-full bg-[#0a0a0f] rounded-[3rem] overflow-hidden border-2 border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative group">
                      <div className="aspect-[1.91/1] bg-black relative">
                         <RoyalSocialCard />
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </section>

        <section className="mb-32 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="orbital-tile p-14 bg-black border-2 border-white/10 shadow-3xl">
              <div className="text-slate-500 font-black text-[10px] uppercase tracking-[0.4em] mb-12 border-b-2 border-royal-800 pb-4 w-fit">Display Interface</div>
              <div className="space-y-8">
                <div className="text-white text-7xl font-display font-black uppercase tracking-tighter">Outfit</div>
                <div className="text-white font-black text-xl leading-relaxed opacity-60">
                  Used for primary headers, data visualizations, and the Royal Care brand logo. Designed for structural clarity.
                </div>
                <div className="p-6 bg-royal-950/80 border-2 border-white/5 rounded-2xl font-mono text-neon-blue text-[11px] tracking-widest shadow-inner">
                  font-family: 'Outfit', sans-serif;
                </div>
              </div>
            </div>
            <div className="orbital-tile p-14 bg-black border-2 border-white/10 shadow-3xl">
              <div className="text-slate-500 font-black text-[10px] uppercase tracking-[0.4em] mb-12 border-b-2 border-royal-800 pb-4 w-fit">System Body</div>
              <div className="space-y-8">
                <div className="text-white text-7xl font-sans font-black uppercase tracking-tight">Inter</div>
                <div className="text-white font-black text-xl leading-relaxed opacity-60">
                  Our core communication typeface. Optimized for legibility across administrative documentation and tech reports.
                </div>
                <div className="p-6 bg-royal-950/80 border-2 border-white/5 rounded-2xl font-mono text-neon-blue text-[11px] tracking-widest shadow-inner">
                  font-family: 'Inter', sans-serif;
                </div>
              </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export default DesignSystem;