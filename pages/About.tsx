import React, { useState, useEffect } from 'react';
import { COMPANY_DETAILS } from '../config.ts';
import { CheckCircle2, Globe, Users, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DecodingText } from '../components/DecodingText.tsx';

const About: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

      <div className="max-w-6xl mx-auto relative z-10 pt-48 pb-32">
        <div className="mb-24 animate-hero-reveal">
          <div className="circuit-capsule mb-10 border-2 border-white/80 bg-black px-10 py-4 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            <Users size={14} className="mr-3 text-neon-purple" /> Organizational DNA
          </div>
          <div className="brand-heading-group cursor-default">
            <h1 className="text-5xl md:text-7xl xl:text-8xl font-display font-black text-white mb-10 uppercase tracking-tighter leading-[0.85]">
              <span className="heading-specular heading-structural-test">Experience-Led</span>
              <span className="heading-specular heading-intelligence-test">Intelligence.</span>
            </h1>
          </div>
          <div className="max-w-2xl relative group banner-pop bg-black p-10 shadow-2xl border-2 border-white/10 mt-10">
            <DecodingText 
              text="Royal Care Group is a national NDIS Business Management Consultancy and Tech Division, built on a foundation of direct industry immersion."
              className="text-xl md:text-2xl text-white font-black leading-tight tracking-wide opacity-100 italic"
              stagger={8}
            />
          </div>
        </div>
        
        <div className="orbital-tile p-12 md:p-20 mb-24 shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative overflow-hidden banner-pop bg-black border-2 border-white/10">
          <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
            <Users size={400} className="text-white" />
          </div>
          <div className="relative z-10 space-y-12 text-xl leading-relaxed font-black">
            <p className="text-white opacity-90">We identified a critical failure in the industry: most "solutions" were built by tech people who didn't understand the work. We reversed that model.</p>
            
            <p className="text-white opacity-60">Our team transitioned from front-line care delivery into structural engineering. We've spent years in the living rooms of participants and the boardrooms of national providers.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-16">
               {[
                 "Plan Management",
                 "Support Coordination",
                 "Allied Health & Psychology",
                 "High-Intensity Care Delivery",
                 "Direct Care Provision",
                 "Operational Auditing"
               ].map((item, i) => (
                 <div key={i} className="flex items-center space-x-6 p-8 bg-royal-950 border-2 border-white/5 rounded-[2rem] group hover:border-neon-blue transition-all shadow-inner">
                    <CheckCircle2 className="text-neon-blue shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(6,182,212,0.3)]" size={28} />
                    <span className="text-[11px] font-black text-white uppercase tracking-[0.4em] font-mono">{item}</span>
                 </div>
               ))}
            </div>

            <div className="border-l-8 border-neon-purple pl-12 py-12 bg-[#050505] italic text-white rounded-r-[3rem] shadow-3xl text-2xl leading-tight border-2 border-white/5">
              "We aren't just tech people; we are industry veterans. We've managed the plans, coordinated the supports, and delivered the care. Now, we build the architectural solutions we know the industry actually needs."
            </div>
            
            <p className="text-slate-200 italic font-black opacity-60 mt-10">
              Today, we empower NDIS providers to reclaim their efficiency, find lost revenue through auditing, and deploy high-performance staff training protocols using the SYNK Suite.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { icon: <Globe className="text-neon-blue" />, title: "National Reach", desc: "Remotely accessible to every NDIS provider in Australia." },
            { icon: <Zap className="text-neon-purple" />, title: "Efficiency Audits", desc: "Identifying structural revenue leakage and administrative debt." },
            { icon: <ShieldCheck className="text-neon-green" />, title: "Compliance Hub", desc: "Bridging the gap between front-line care and technical precision." }
          ].map((card, i) => (
            <div key={i} className="orbital-tile p-12 group hover:border-white transition-all bg-black border-2 border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.8)]">
              <div className="p-6 bg-royal-950 rounded-2xl border-2 border-white/5 w-fit mb-10 group-hover:scale-110 group-hover:border-neon-blue transition-all shadow-inner">
                {card.icon}
              </div>
              <h4 className="text-white font-black text-xs uppercase tracking-[0.5em] mb-6">{card.title}</h4>
              <p className="text-[14px] text-white opacity-60 leading-relaxed font-black italic group-hover:opacity-100 transition-opacity">"{card.desc}"</p>
            </div>
          ))}
        </div>

        <div className="mt-40 p-16 md:p-24 banner-pop bg-black rounded-[4rem] border-2 border-white/10 text-center shadow-[0_40px_120px_rgba(0,0,0,0.9)] relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <div className="brand-heading-group cursor-default inline-block mb-8">
             <h3 className="text-4xl md:text-6xl xl:text-7xl font-display font-black text-white uppercase tracking-tighter">
               <span className="heading-specular heading-structural-test">Scale Your</span>
               <span className="heading-specular heading-intelligence-test">Sovereignty.</span>
             </h3>
           </div>
           <p className="text-white opacity-60 text-xl mb-14 font-black max-w-2xl mx-auto tracking-wide italic">
             "Connect with an RCG Architect today to begin your organizational re-engineering."
           </p>
           <Link to="/contact" className="slim-orbital-btn px-16 py-8 text-black bg-white font-black text-[12px] tracking-[0.6em] uppercase flex items-center justify-center mx-auto gap-4 group shadow-2xl active:scale-95">
             Initialize Contact <ArrowRight className="group-hover:translate-x-3 transition-transform" />
           </Link>
        </div>
      </div>
    </div>
  );
};

export default About;