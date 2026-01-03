import React from 'react';
import { Mail, Fingerprint, Globe, Linkedin, Facebook, Layout } from 'lucide-react';
import { COMPANY_DETAILS } from '../config.ts';

const Footer: React.FC = () => {
  const subject = encodeURIComponent("Hey Royal Care Group, I've got a question for you!");
  const mailtoUrl = `mailto:${COMPANY_DETAILS.email}?subject=${subject}`;

  return (
    <footer className="bg-white border-t border-slate-100 py-6 px-6 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col items-center space-y-4">
        
        <div className="text-slate-900">
          <span className="text-[9px] font-black uppercase tracking-[0.4em]">
            {COMPANY_DETAILS.legalName}
          </span>
        </div>

        <div className="flex flex-col items-center">
          <a 
            href={mailtoUrl}
            className="slim-orbital-btn inline-flex items-center gap-2.5 px-8 py-2.5 bg-black text-white border-[0.5px] border-neon-blue rounded-lg font-black text-[9px] tracking-[0.3em] uppercase transition-all hover:scale-105 active:scale-95 group"
          >
            <Mail size={12} className="text-neon-blue" />
            <span>Contact Now</span>
          </a>
        </div>

        <div className="flex items-center gap-5">
          <a href={COMPANY_DETAILS.socials.linkedin} className="text-slate-300 hover:text-neon-blue transition-all duration-300"><Linkedin size={18} /></a>
          <a href="#" className="text-slate-300 hover:text-neon-purple transition-all duration-300"><Facebook size={18} /></a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 pt-4 border-t border-slate-50 w-full max-w-xl text-[7.5px] font-mono font-bold text-slate-400 uppercase tracking-widest">
          <div className="flex items-center gap-1.5"><Fingerprint size={8} /><span>ABN {COMPANY_DETAILS.abn}</span></div>
          <span className="text-slate-100 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5"><Globe size={8} /><span>v{COMPANY_DETAILS.appVersion.split('-')[0]}</span></div>
          <span className="text-slate-100 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5"><Layout size={8} /><span>Design by Royal Care</span></div>
          <span className="text-slate-100 hidden sm:inline">•</span>
          <span className="text-slate-300 font-black tracking-[0.1em]">&copy; 2025 RCG</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;