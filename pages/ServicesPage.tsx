import React, { useState, useEffect } from 'react';
import { Briefcase, TrendingUp, ShieldCheck, GraduationCap, Code, ArrowRight, Terminal, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DecodingText } from '../components/DecodingText.tsx';

const ServicesPage: React.FC = () => {
  const businessServices = [
    { icon: <Terminal size={20} className="text-neon-blue" />, title: "Tech Engineering", desc: "Custom NDIS operating systems and AI assistive billing engines architected for high-fidelity scale and human verification." },
    { icon: <GraduationCap size={20} className="text-neon-purple" />, title: "Training Protocols", desc: "High-performance training modules for staff and leadership. Compliance mastery and support protocols for modern teams." },
    { icon: <Database size={20} className="text-neon-blue" />, title: "Structural Intelligence", desc: "Elite consultancy re-engineering organizational workflows. Infrastructure that is audit-proof and assistive by design." },
    { icon: <TrendingUp size={20} className="text-neon-purple" />, title: "Acquisition Audit", desc: "Technical due diligence for buyers and sellers of NDIS entities. Sound structural asset verification and risk mapping." },
    { icon: <ShieldCheck size={20} className="text-neon-blue" />, title: "Sovereign Compliance", desc: "Assistive logic ensuring every line item matches NDIS standards in real-time, working alongside your team for zero compromise." },
    { icon: <Code size={20} className="text-neon-purple" />, title: "SYNK Implementation", desc: "Direct deployment of SYNK AI assistive tools to cut manual administrative debt through high-precision research and data nodes." }
  ];

  return (
    <div className="flex flex-col bg-[#334155] overflow-x-hidden min-h-screen px-4 sm:px-12 lg:px-16 xl:px-20 font-sans font-bold relative">
      
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-50">
        <div className="absolute inset-0 bg-[#334155]"></div>
        <div className="absolute top-[10%] left-[-10%] w-[100%] h-[100%] bg-neon-purple/[0.08] rounded-full blur-[200px] animate-blob-drift"></div>
        <div className="absolute bottom-[-10%] right-[-15%] w-[100%] h-[100%] bg-neon-blue/[0.08] rounded-full blur-[250px] animate-blob-drift"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10 pt-32 lg:pt-32 pb-24">
        <div className="text-center mb-16 animate-hero-reveal">
          <div className="circuit-capsule mb-6 border border-white/80 bg-black text-white px-6 py-2.5 shadow-xl inline-block">
            <Briefcase size={14} className="mr-3 animate-pulse text-neon-blue" /> Service Architecture
          </div>
          <div className="brand-heading-group cursor-default inline-block">
            <h1 className="tracking-tighter mb-6">
              <span className="heading-specular text-2xl md:text-4xl block mb-2 opacity-50">Service</span>
              <span className="heading-specular text-4xl md:text-7xl block">Nodes.</span>
            </h1>
          </div>
          <div className="max-w-lg mx-auto mt-6">
            <DecodingText 
              text="Elite Consulting • Assistive Tech • National Grid"
              className="text-slate-500 text-[9px] font-black uppercase tracking-[0.5em]"
              stagger={6}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businessServices.map((service, idx) => (
            <div key={idx} className="orbital-tile group h-full bg-black border border-white/10 min-h-[340px] flex flex-col hover:border-white transition-all duration-700 shadow-2xl p-8">
              <div className="mb-6 p-4 bg-royal-950 border border-white/5 rounded-xl w-fit group-hover:scale-110 group-hover:border-neon-blue transition-all">
                {service.icon}
              </div>
              <h3 className="text-xl font-display font-black text-white mb-3 uppercase tracking-tighter leading-none group-hover:text-neon-blue transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed font-black mb-8 flex-grow italic opacity-70 group-hover:opacity-100 transition-opacity">
                "{service.desc}"
              </p>
              <Link to="/contact" className="slim-orbital-btn py-3.5 w-full flex items-center justify-center text-white font-black text-[9px] tracking-[0.4em] uppercase border border-white/80 hover:bg-white hover:text-black transition-all group/btn shadow-xl active:scale-95">
                Initialize <ArrowRight size={14} className="ml-2 group-hover/btn:translate-x-1.5 transition-transform text-neon-purple" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;