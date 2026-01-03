import React, { useState, useEffect } from 'react';
import { Briefcase, TrendingUp, ShieldCheck, GraduationCap, Code, ArrowRight, Terminal, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DecodingText } from '../components/DecodingText.tsx';

const ServicesPage: React.FC = () => {
  const businessServices = [
    { icon: <Terminal size={24} className="text-neon-blue" />, title: "Bespoke Tech Engineering", desc: "Custom NDIS operating systems, private CRMs, and automated billing engines architected for high-fidelity national scale." },
    { icon: <GraduationCap size={24} className="text-neon-purple" />, title: "National Training Protocols", desc: "High-performance training modules for NDIS staff and leadership. Compliance mastery and high-intensity support protocols." },
    { icon: <Database size={24} className="text-neon-blue" />, title: "Structural Intelligence", desc: "Elite consultancy re-engineering organizational workflows. Ensuring your infrastructure is audit-proof and highly efficient." },
    { icon: <TrendingUp size={24} className="text-neon-purple" />, title: "Acquisition & Tech Audit", desc: "Technical due diligence for buyers and sellers of NDIS entities. Ensuring acquired assets are structurally sound." },
    { icon: <ShieldCheck size={24} className="text-neon-blue" />, title: "Sovereign Compliance", desc: "Automated logic ensuring every line item matches national NDIS Practice Standards in real-time. Zero-compromise adherence." },
    { icon: <Code size={24} className="text-neon-purple" />, title: "SYNK Implementation", desc: "Direct deployment of the SYNK AI Ecosystem. Automate manual administrative debt and transform into a high-tech operation." }
  ];

  return (
    <div className="flex flex-col bg-[#334155] overflow-x-hidden min-h-screen selection:bg-neon-blue/30 selection:text-white px-4 sm:px-12 lg:px-16 xl:px-24 font-sans font-bold relative">
      
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[#334155]"></div>
        <div className="absolute top-[10%] left-[-10%] w-[100%] h-[100%] bg-neon-purple/[0.08] rounded-full blur-[200px] animate-blob-drift opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-15%] w-[100%] h-[100%] bg-neon-blue/[0.08] rounded-full blur-[250px] animate-blob-drift opacity-60"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10 pt-32 lg:pt-48 pb-24">
        <div className="text-center mb-24 animate-hero-reveal">
          <div className="circuit-capsule mb-8 border-2 border-white/80 bg-black text-white px-8 py-3 shadow-2xl">
            <Briefcase size={16} className="mr-4 animate-pulse text-neon-blue" /> Service Architecture
          </div>
          <div className="brand-heading-group cursor-default inline-block">
            <h1 className="tracking-tighter mb-10">
              <span className="heading-specular heading-structural-test text-3xl md:text-5xl">Service</span>
              <span className="heading-specular heading-intelligence-test text-4xl md:text-8xl">Nodes.</span>
            </h1>
          </div>
          <div className="max-w-xl mx-auto mt-10">
            <DecodingText 
              text="Elite Consulting • Custom Tech • National Grid"
              className="text-slate-500 text-[10px] font-black uppercase tracking-[0.6em]"
              stagger={8}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {businessServices.map((service, idx) => (
            <div key={idx} className="orbital-tile group h-full bg-black border-2 border-white/10 min-h-[420px] flex flex-col hover:border-white transition-all duration-700 shadow-3xl p-10">
              <div className="mb-8 p-5 bg-royal-950 border-2 border-white/5 rounded-[1.5rem] w-fit group-hover:scale-110 group-hover:border-neon-blue transition-all shadow-inner">
                {service.icon}
              </div>
              <h3 className="text-2xl font-display font-black text-white mb-4 uppercase tracking-tighter leading-none group-hover:text-neon-blue transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-200 text-lg leading-relaxed font-black mb-10 flex-grow italic opacity-70 group-hover:opacity-100 transition-opacity">
                "{service.desc}"
              </p>
              <Link to="/contact" className="slim-orbital-btn py-4 w-full flex items-center justify-center text-white font-black text-[10px] tracking-[0.4em] uppercase border-2 border-white/80 hover:bg-white hover:text-black transition-all group/btn shadow-2xl active:scale-95">
                Initialize <ArrowRight size={16} className="ml-3 group-hover/btn:translate-x-2 transition-transform text-neon-purple" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;