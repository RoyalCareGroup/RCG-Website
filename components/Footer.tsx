import React from 'react';
import { Mail, Fingerprint, Globe, Linkedin, Facebook } from 'lucide-react';
import { COMPANY_DETAILS } from '../config.ts';

const Footer: React.FC = () => {
  const subject = encodeURIComponent("Hey Royal Care Group, I've got a question for you!");
  const mailtoUrl = `mailto:${COMPANY_DETAILS.email}?subject=${subject}`;

  return (
    <footer className="bg-white border-t border-slate-100 py-8 px-6 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col items-center space-y-6">
        
        {/* Legal Identity - Compact Typography */}
        <div className="text-slate-900">
          <span className="text-[10px] font-black uppercase tracking-[0.5em]">
            {COMPANY_DETAILS.legalName}
          </span>
        </div>

        {/* Contact Action Node - Refined Dimensions */}
        <div className="flex flex-col items-center">
          <a 
            href={mailtoUrl}
            className="slim-orbital-btn inline-flex items-center gap-3 px-10 py-3.5 bg-black text-white border-2 border-neon-blue rounded-xl font-black text-[10px] tracking-[0.4em] uppercase transition-all hover:scale-105 active:scale-95 shadow-[0_10px_20px_rgba(6,182,212,0.15)] group"
            style={{ borderStyle: 'solid' }}
          >
            <Mail size={14} className="text-neon-blue group-hover:animate-pulse" />
            <span>Contact Us Now</span>
          </a>
        </div>

        {/* Social Connectivity Node - Tightened Spacing */}
        <div className="flex items-center gap-6">
          <a 
            href={COMPANY_DETAILS.socials.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-slate-300 hover:text-neon-blue transition-all duration-300 transform hover:scale-110"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a 
            href="#" 
            className="text-slate-300 hover:text-neon-purple transition-all duration-300 transform hover:scale-110"
            aria-label="Facebook"
          >
            <Facebook size={20} />
          </a>
        </div>

        {/* Technical Metadata Line - Unified Horizon */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 pt-6 border-t border-slate-50 w-full max-w-xl text-[8px] font-mono font-bold text-slate-400 uppercase tracking-widest">
          <div className="flex items-center gap-1.5">
            <Fingerprint size={10} className="text-slate-200" />
            <span>ABN {COMPANY_DETAILS.abn}</span>
          </div>
          
          <span className="text-slate-100 hidden sm:inline">•</span>

          <div className="flex items-center gap-1.5">
             <Globe size={10} className="text-slate-200" />
             <span>v{COMPANY_DETAILS.appVersion.split('-')[0]}</span>
          </div>

          <span className="text-slate-100 hidden sm:inline">•</span>

          <span className="text-slate-300 font-black tracking-[0.2em]">
            &copy; {new Date().getFullYear()} ROYAL CARE GROUP
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;