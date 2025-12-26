import React from 'react';
import { Linkedin, Facebook, Twitter, Youtube, ExternalLink, Share2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY_DETAILS } from '../config.ts';

const Socials: React.FC = () => {
  const socials = [
    { 
      name: 'LinkedIn', 
      icon: <Linkedin size={28} />, 
      color: 'text-[#0a66c2]', 
      borderColor: 'border-[#0a66c2]/20',
      bgHover: 'hover:bg-[#0a66c2]/5',
      url: COMPANY_DETAILS.socials.linkedin,
      handle: '/company/royalcaregroup'
    },
    { 
      name: 'Facebook', 
      icon: <Facebook size={28} />, 
      color: 'text-[#1877f2]', 
      borderColor: 'border-[#1877f2]/20',
      bgHover: 'hover:bg-[#1877f2]/5',
      url: '#',
      handle: '@RoyalCareGroup'
    },
    { 
      name: 'Twitter / X', 
      icon: <Twitter size={28} />, 
      color: 'text-white', 
      borderColor: 'border-white/20',
      bgHover: 'hover:bg-white/5',
      url: '#',
      handle: '@RCG_Tech'
    },
    { 
      name: 'YouTube', 
      icon: <Youtube size={28} />, 
      color: 'text-[#ff0000]', 
      borderColor: 'border-[#ff0000]/20',
      bgHover: 'hover:bg-[#ff0000]/5',
      url: '#',
      handle: 'RoyalCareTech'
    },
  ];

  return (
    <div className="min-h-screen bg-[#01040f] pt-40 pb-20 px-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-full h-[800px] bg-neon-purple/5 blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-20">
          <Link to="/" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-neon-blue transition-colors mb-12 group">
            <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Mainframe
          </Link>
          
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-neon-purple/20 bg-neon-purple/5 text-neon-purple text-[10px] font-black tracking-[0.4em] uppercase mb-8">
            <Share2 size={14} className="mr-3" /> Communication Matrix
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-black text-white mb-6 uppercase tracking-tighter leading-none">
            Social<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-pink-500">Connectivity.</span>
          </h1>
          <p className="text-xl text-slate-400 font-light leading-relaxed border-l-4 border-royal-800 pl-10 max-w-2xl">
            Follow our journey as we architect the next generation of NDIS technology and deploy structural intelligence across Australia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {socials.map((social) => (
            <a 
              key={social.name} 
              href={social.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`orbital-tile group flex items-center justify-between p-10 border ${social.borderColor} ${social.bgHover} transition-all`}
            >
              <div className="orbital-content flex items-center gap-8">
                <div className={`p-5 bg-royal-950 rounded-2xl border ${social.borderColor} ${social.color} shadow-lg transition-transform group-hover:scale-110`}>
                  {social.icon}
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight">{social.name}</h3>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">{social.handle}</p>
                </div>
              </div>
              <div className="p-3 bg-royal-900 rounded-xl text-slate-600 group-hover:text-white transition-colors">
                <ExternalLink size={18} />
              </div>
            </a>
          ))}
        </div>

        <div className="mt-24 p-12 glass rounded-[3rem] border border-royal-800 text-center relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/5 to-neon-blue/5 pointer-events-none"></div>
           <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight mb-6">Stay Synchronized</h3>
           <p className="text-slate-500 text-sm mb-10 font-light max-w-xl mx-auto tracking-wide">
             Subscribe to our intelligence feed for real-time updates on NDIS regulation, SYNK product launches, and structural scale strategies.
           </p>
           <Link to="/contact" className="px-12 py-5 bg-white text-black font-black text-[10px] tracking-[0.4em] uppercase rounded-2xl hover:bg-neon-blue hover:text-white transition-all inline-block">
             Join the Network
           </Link>
        </div>

        <div className="mt-16 text-center text-[9px] font-mono text-slate-600 uppercase tracking-[0.5em]">
           Official Communication Nodes // Royal Care Group v{COMPANY_DETAILS.appVersion}
        </div>
      </div>
    </div>
  );
};

export default Socials;