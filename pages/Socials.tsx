import React, { useState, useEffect } from 'react';
import { Linkedin, Facebook, Twitter, Youtube, ExternalLink, Share2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY_DETAILS } from '../config.ts';

const Socials: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const socials = [
    { name: 'LinkedIn', icon: <Linkedin size={28} />, handle: '/company/royalcaregroup', url: COMPANY_DETAILS.socials.linkedin },
    { name: 'Facebook', icon: <Facebook size={28} />, handle: '@RoyalCareGroup', url: '#' }
  ];

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
      
      <div className="max-w-5xl mx-auto relative z-10 pt-48 pb-32">
        <div className="mb-20 animate-hero-reveal">
          <Link to="/" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors mb-12 group">
            <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Mainframe
          </Link>
          <div className="circuit-capsule border-2 border-white/80 bg-black text-white px-10 py-4 shadow-2xl mb-8">
            <Share2 size={14} className="mr-3" /> Communication Matrix
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-black text-white mb-6 uppercase tracking-tighter leading-none heading-wow">Social<br/><span className="heading-tech">Connectivity.</span></h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {socials.map((social) => (
            <a key={social.name} href={social.url} className="orbital-tile group flex items-center justify-between p-12 bg-black border-2 border-white/10 shadow-3xl">
              <div className="flex items-center gap-8">
                <div className="p-6 bg-royal-950 rounded-2xl border-2 border-white/5 text-neon-blue group-hover:scale-110 transition-transform shadow-inner">
                  {social.icon}
                </div>
                <div>
                  <h3 className="text-3xl font-display font-black text-white uppercase tracking-tight">{social.name}</h3>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">{social.handle}</p>
                </div>
              </div>
              <ExternalLink size={24} className="text-white/20 group-hover:text-white transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Socials;