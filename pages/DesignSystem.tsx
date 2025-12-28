
import React, { useState } from 'react';
import { Palette, Type, Layout, Package, Copy, Check, Download, Layers, ShieldCheck, Cpu, Crown, Share2, Globe, ExternalLink, ArrowDownCircle } from 'lucide-react';
import { COMPANY_DETAILS } from '../config.ts';
import { LogoExport } from '../components/LogoExport.tsx';
import { BrandLogo } from '../components/BrandLogo.tsx';
import { SynkProductIcon, SynkIconType } from '../components/SynkProductIcon.tsx';
import { RoyalSocialCard } from '../components/RoyalSocialCard.tsx';

const DesignSystem: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const ColorChip = ({ color, name, label }: { color: string, name: string, label: string }) => (
    <div className="group relative">
      <div 
        className="h-32 w-full rounded-2xl mb-4 border border-white/10 shadow-2xl transition-transform hover:scale-[1.02] cursor-pointer"
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
    if (btn) {
      btn.click();
    } else {
      console.error("Download node not found in DOM buffer.");
    }
  };

  return (
    <div className="min-h-screen bg-[#01040f] pt-40 pb-20 relative px-6">
      {/* Background Grid Decoration */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-24">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-neon-purple/30 bg-neon-purple/5 text-neon-purple text-[10px] font-black tracking-[0.4em] mb-6 uppercase">
            <Palette className="w-4 h-4 mr-2" /> Identity & Assets Hub
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-black text-white mb-6 uppercase tracking-tighter leading-[0.85]">
            Brand <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue">Architecture.</span>
          </h1>
          <p className="text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l-4 border-royal-800 pl-10">
            The official design system and technical asset library for Royal Care Group. 
            Authorization Level: Administrative.
          </p>
        </div>

        {/* SOVEREIGN SOCIAL PREVIEW NODE */}
        <section className="mb-32">
          <div className="flex items-center space-x-6 mb-12">
            <h2 className="text-white font-black text-[11px] uppercase tracking-[0.6em] flex items-center shrink-0">
              <Share2 size={16} className="mr-4 text-neon-purple" /> 00 // Royal Sovereign Asset
            </h2>
            <div className="h-px flex-1 bg-royal-900"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
             <div className="lg:col-span-4 space-y-8">
                <div>
                   <h3 className="text-3xl font-display font-black text-white uppercase tracking-tight mb-4">Social Share Identity</h3>
                   <p className="text-slate-400 text-base font-light leading-relaxed">
                      The Royal Sovereign Card is our flagship visual for external networks. It establishes immediate brand authority for the Google Business listing.
                   </p>
                </div>

                <div className="p-8 bg-royal-950 border border-royal-800 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                      <ShieldCheck size={40} className="text-neon-blue" />
                   </div>
                   <div className="flex items-center gap-4 text-neon-blue">
                      <Globe size={20} />
                      <span className="text-[11px] font-black uppercase tracking-[0.3em]">Status: PRODUCTION_READY</span>
                   </div>
                   <p className="text-[12px] text-slate-500 leading-relaxed italic">"Recommended for Google Ads, LinkedIn Cover, and Business Profile headers to maximize structural authority."</p>
                   
                   <div className="pt-4">
                      <button 
                         onClick={triggerSocialDownload}
                         className="w-full py-5 bg-white text-black font-black text-[10px] tracking-[0.4em] uppercase rounded-xl hover:bg-neon-blue hover:text-white transition-all shadow-xl flex items-center justify-center gap-4 group/dl"
                      >
                         <ArrowDownCircle size={18} className="group-hover/dl:animate-bounce" />
                         Download High-Res Graphic
                      </button>
                   </div>
                </div>
             </div>
             <div className="lg:col-span-8 flex flex-col items-center">
                <div className="max-w-2xl w-full bg-[#0a0a0f] rounded-3xl overflow-hidden border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative group">
                   <div className="absolute inset-0 bg-neon-blue/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                   <div className="aspect-[1.91/1] bg-black relative">
                      <RoyalSocialCard />
                   </div>
                   <div className="p-8 space-y-3 border-t border-white/5 bg-royal-950/60 backdrop-blur-xl">
                      <div className="flex justify-between items-center">
                         <div className="text-[11px] text-slate-500 uppercase font-black tracking-[0.4em]">ROYALCAREGROUP.COM.AU</div>
                         <div className="text-[9px] font-mono text-neon-blue">1200 x 630 PNG</div>
                      </div>
                      <div className="text-2xl font-bold text-white leading-tight uppercase tracking-tighter">Royal Care Group | Structural Intelligence</div>
                      <div className="text-sm text-slate-400 font-light line-clamp-1 opacity-60">National NDIS Business Intelligence & Tech Division powered by SYNK...</div>
                   </div>
                </div>
                <p className="mt-8 text-[10px] font-mono text-slate-700 uppercase tracking-[0.5em]">LIVE_PREVIEW // SOVEREIGN_ASSET_v1.0.4</p>
             </div>
          </div>
        </section>

        {/* 1. COLOR MATRIX */}
        <section className="mb-32">
          <div className="flex items-center space-x-6 mb-12">
            <h2 className="text-white font-black text-[11px] uppercase tracking-[0.6em] flex items-center shrink-0">
              <Palette size={16} className="mr-4 text-neon-purple" /> 01 // Color Protocol
            </h2>
            <div className="h-px flex-1 bg-royal-900"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            <ColorChip color={COMPANY_DETAILS.colors.neonPurple} name="Neon Purple" label="Primary Accent" />
            <ColorChip color={COMPANY_DETAILS.colors.neonBlue} name="Neon Blue" label="Secondary Accent" />
            <ColorChip color={COMPANY_DETAILS.colors.royal950} name="Royal Deep" label="Background Core" />
            <ColorChip color={COMPANY_DETAILS.colors.royal800} name="Slate Dark" label="Layer Surface" />
            <ColorChip color={COMPANY_DETAILS.colors.statusGreen} name="Tech Green" label="Active State" />
            <ColorChip color="#f8fafc" name="Royal White" label="Typography Base" />
          </div>
        </section>

        <section className="mb-32">
          <div className="flex items-center space-x-6 mb-12">
            <h2 className="text-white font-black text-[11px] uppercase tracking-[0.6em] flex items-center shrink-0">
              <Type size={16} className="mr-4 text-neon-blue" /> 02 // Typographic Matrix
            </h2>
            <div className="h-px flex-1 bg-royal-900"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-royal-900/40 border border-royal-800 rounded-[3rem] p-12 backdrop-blur-md">
              <div className="text-slate-500 font-black text-[10px] uppercase tracking-[0.4em] mb-12 border-b border-royal-800 pb-4 w-fit">Display Interface</div>
              <div className="space-y-8">
                <div className="text-white text-7xl font-display font-black uppercase tracking-tighter">Outfit</div>
                <div className="text-slate-400 font-display text-xl leading-relaxed font-light">
                  Used for primary headers, data visualizations, and the Royal Care brand logo. Designed for high impact and structural clarity.
                </div>
                <div className="p-5 bg-royal-950/80 border border-royal-800 rounded-2xl font-mono text-neon-blue text-[11px] tracking-widest">
                  font-family: 'Outfit', sans-serif;
                </div>
              </div>
            </div>
            <div className="bg-royal-900/40 border border-royal-800 rounded-[3rem] p-12 backdrop-blur-md">
              <div className="text-slate-500 font-black text-[10px] uppercase tracking-[0.4em] mb-12 border-b border-royal-800 pb-4 w-fit">System Body</div>
              <div className="space-y-8">
                <div className="text-white text-7xl font-sans font-bold uppercase tracking-tight">Inter</div>
                <div className="text-slate-400 font-sans text-xl leading-relaxed font-light">
                  Our core communication typeface. Optimized for legibility across administrative documentation and technical reports.
                </div>
                <div className="p-5 bg-royal-950/80 border border-royal-800 rounded-2xl font-mono text-neon-blue text-[11px] tracking-widest">
                  font-family: 'Inter', sans-serif;
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-32">
          <div className="flex items-center space-x-6 mb-12">
            <h2 className="text-white font-black text-[11px] uppercase tracking-[0.6em] flex items-center shrink-0">
              <Package size={16} className="mr-4 text-neon-purple" /> 03 // Asset Blueprint
            </h2>
            <div className="h-px flex-1 bg-royal-900"></div>
          </div>
          <LogoExport />
        </section>

        <div className="mt-24 p-16 glass rounded-[4rem] border border-royal-800 text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-blue animate-pulse"></div>
           <h3 className="text-4xl font-display font-black text-white uppercase tracking-tighter mb-8">Integrated Identity.</h3>
           <p className="text-slate-400 text-lg font-light mb-12 max-w-2xl mx-auto leading-relaxed">
             This system ensures structural visual consistency across all national nodes and digital interfaces within the Royal Care ecosystem.
           </p>
           <div className="flex justify-center">
             <button className="px-12 py-6 bg-white text-black font-black text-[11px] tracking-[0.5em] uppercase rounded-2xl hover:bg-neon-blue hover:text-white transition-all shadow-xl">
               Contact Brand Architect
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DesignSystem;
