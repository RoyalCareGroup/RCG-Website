import React from 'react';
import { Linkedin, Mail, MapPin, Globe, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY_DETAILS } from '../config.ts';
import { BrandLogo } from './BrandLogo.tsx';
import { BackupButton } from './BackupButton.tsx';

const Footer: React.FC = () => {
  return (
    <footer className="bg-royal-950 border-t border-royal-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Infrastructure HUD */}
        <div className="mb-16 p-6 bg-royal-900/40 border border-royal-800 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-md">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-neon-blue/10 rounded-2xl border border-neon-blue/20">
              <Globe className="w-6 h-6 text-neon-blue animate-pulse" />
            </div>
            <div>
              <p className="text-[10px] font-black text-white uppercase tracking-[0.4em]">AU-East Infrastructure</p>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">Status: <span className="text-neon-green">Live & Optimized</span></p>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <p className="text-[9px] text-slate-600 uppercase font-black mb-3 tracking-[0.5em]">Engineering Access</p>
            <BackupButton />
          </div>

          <div className="hidden lg:flex items-center space-x-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
            <div className="flex items-center space-x-3">
              <ShieldCheck size={16} className="text-neon-purple" />
              <span>NDIS_CORE_v5</span>
            </div>
            <div className="w-px h-8 bg-royal-800"></div>
            <div className="flex items-center space-x-3">
              <span className="text-neon-blue">AES-256</span>
              <span>Encrypted</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          <div className="space-y-8">
            <BrandLogo size="md" />
            <p className="text-slate-500 text-sm leading-relaxed font-light italic border-l-2 border-royal-800 pl-6">
              Elite NDIS Business Management Consultancy and proprietary software development division.
            </p>
            <div className="flex space-x-6">
              <a href={COMPANY_DETAILS.socials.linkedin} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-neon-purple transition-all hover:scale-110">
                <Linkedin size={20} />
              </a>
              <a href={`mailto:${COMPANY_DETAILS.email}`} className="text-slate-500 hover:text-neon-blue transition-all hover:scale-110">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.6em] mb-8">Navigation</h4>
            <ul className="space-y-4 text-[11px] text-slate-400 font-black uppercase tracking-[0.3em]">
              <li><Link to="/" className="hover:text-neon-blue transition-colors">Mainframe</Link></li>
              <li><Link to="/about" className="hover:text-neon-blue transition-colors">DNA & Origins</Link></li>
              <li><Link to="/casestudies" className="hover:text-neon-blue transition-colors">Case Studies</Link></li>
              <li><Link to="/consultancy" className="hover:text-neon-blue transition-colors">Strategic Advisory</Link></li>
              <li><Link to="/governance" className="hover:text-neon-blue transition-colors">Governance Hub</Link></li>
              <li><Link to="/services" className="hover:text-neon-blue transition-colors">Service Nodes</Link></li>
              <li><Link to="/tech" className="hover:text-neon-blue transition-colors">Tech & SYNK Tools</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.6em] mb-8">Creative</h4>
            <ul className="space-y-4 text-[11px] text-slate-400 font-black uppercase tracking-[0.3em]">
              <li><Link to="/creative" className="hover:text-neon-purple transition-colors">Blueprint Studio</Link></li>
              <li><Link to="/audio" className="hover:text-neon-purple transition-colors">Voice Synth</Link></li>
              <li><Link to="/video" className="hover:text-neon-purple transition-colors">Kinetic Engine</Link></li>
              <li><Link to="/weblab" className="hover:text-neon-purple transition-colors">Web Lab</Link></li>
              <li><Link to="/contact" className="hover:text-neon-purple transition-colors">Contact Matrix</Link></li>
              <li><Link to="/privacy" className="hover:text-neon-purple transition-colors">Privacy Protocol</Link></li>
              <li><Link to="/terms" className="hover:text-neon-purple transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.6em] mb-8">Headquarters</h4>
            <ul className="space-y-6 text-[11px] text-slate-500 font-mono tracking-widest leading-relaxed">
              <li className="flex items-start">
                <MapPin size={16} className="mr-3 mt-0.5 text-neon-blue shrink-0" />
                <span>{COMPANY_DETAILS.address}<br/>{COMPANY_DETAILS.cityStateZip}</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-3 text-neon-blue shrink-0" />
                <span className="lowercase">{COMPANY_DETAILS.emailGeneral}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-royal-800 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono text-slate-600 uppercase tracking-[0.4em]">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
            <span>ABN: {COMPANY_DETAILS.abn}</span>
            <span className="hidden md:block">|</span>
            <span>&copy; {new Date().getFullYear()} {COMPANY_DETAILS.legalName}</span>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse"></div>
             <span>BUILD_VERSION: {COMPANY_DETAILS.appVersion}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}; export default Footer;