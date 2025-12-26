import React, { useState } from 'react';
import { Palette, Type, Layout, Package, Copy, Check, Download, Layers, ShieldCheck, Cpu, Crown } from 'lucide-react';
import { COMPANY_DETAILS } from '../config.ts';
import { LogoExport } from '../components/LogoExport.tsx';
import { BrandLogo } from '../components/BrandLogo.tsx';
import { SynkProductIcon, SynkIconType } from '../components/SynkProductIcon.tsx';

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
            The official design system and technical asset library for Royal Care Group and the SYNK Technical Suite. 
            Authorization Level: Administrative.
          </p>
        </div>

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

        {/* 2. TYPOGRAPHY LAB */}
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

        {/* 3. LOGO & ASSET EXPORT */}
        <section className="mb-32">
          <div className="flex items-center space-x-6 mb-12">
            <h2 className="text-white font-black text-[11px] uppercase tracking-[0.6em] flex items-center shrink-0">
              <Package size={16} className="mr-4 text-neon-purple" /> 03 // Asset Blueprint
            </h2>
            <div className="h-px flex-1 bg-royal-900"></div>
          </div>
          <LogoExport />
        </section>

        {/* 4. SYNK SUITE ICONS */}
        <section className="mb-32">
          <div className="flex items-center space-x-6 mb-12">
            <h2 className="text-white font-black text-[11px] uppercase tracking-[0.6em] flex items-center shrink-0">
              <Layers size={16} className="mr-4 text-neon-blue" /> 04 // Module Symbols
            </h2>
            <div className="h-px flex-1 bg-royal-900"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-8">
            {(['claim', 'report', 'service', 'charge', 'form', 'sign', 'chat', 'plan', 'train'] as SynkIconType[]).map((type, i) => (
              <div key={i} className="flex flex-col items-center group">
                <div className="p-6 bg-royal-900/40 border border-royal-800 rounded-[2rem] group-hover:border-neon-blue transition-all group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] backdrop-blur-sm">
                  <SynkProductIcon type={type} size={48} isActive={true} phase={i % 2 === 0 ? 1 : 2} />
                </div>
                <span className="mt-4 text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] font-black group-hover:text-white transition-colors">{type}</span>
              </div>
            ))}
          </div>
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