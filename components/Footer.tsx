import React, { useEffect, useState } from 'react';
import { Linkedin, Mail, MapPin, Globe, ShieldCheck, Lock, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY_DETAILS } from '../config.ts';
import { BrandLogo } from './BrandLogo.tsx';

const Footer: React.FC = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(!!localStorage.getItem('rcg_auth_token'));
  }, []);

  return (
    <footer className="bg-black border-t-4 border-royal-800 pt-32 pb-20 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 p-12 bg-royal-950 border-2 border-white/10 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-12 shadow-3xl">
          <div className="flex items-center space-x-8">
            <div className="p-5 bg-neon-blue/10 rounded-2xl border-2 border-neon-blue/30">
              <Globe className="w-8 h-8 text-neon-blue animate-pulse" />
            </div>
            <div>
              <p className="text-[12px] font-black text-white uppercase tracking-[0.5em]">AU-East Infrastructure</p>
              <p className="text-[12px] text-slate-500 uppercase tracking-[0.3em] mt-2 font-black">Status: <span className="text-neon-green">Live & Optimized</span></p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-16 text-[11px] font-black text-slate-500 uppercase tracking-[0.4em]">
              <div className="flex items-center space-x-4">
                <ShieldCheck size={20} className="text-neon-purple" />
                <span>NDIS_CORE_PROTOCOL</span>
              </div>
              <div className="w-1 h-8 bg-royal-800 hidden md:block"></div>
              <div className="flex items-center space-x-4">
                <Clock size={20} className="text-neon-blue" />
                <span>BUILD_DATE: 2024.Q4</span>
              </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24">
          <div className="space-y-10">
            <BrandLogo size="md" />
            <p className="text-slate-400 text-lg leading-relaxed font-black italic border-l-4 border-royal-800 pl-8">
              "Elite NDIS Business Management Consultancy."
            </p>
            <div className="flex space-x-10">
              <a href={COMPANY_DETAILS.socials.linkedin} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-neon-purple transition-all scale-125">
                <Linkedin size={24} />
              </a>
              <a href={`mailto:${COMPANY_DETAILS.email}`} className="text-slate-500 hover:text-neon-blue transition-all scale-125">
                <Mail size={24} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[12px] font-black text-white uppercase tracking-[0.6em] mb-12 border-b-2 border-royal-900 pb-4 w-fit">Navigation</h4>
            <ul className="space-y-6 text-[13px] text-slate-400 font-black uppercase tracking-[0.3em]">
              <li><Link to="/" className="hover:text-neon-blue transition-colors">Mainframe Hub</Link></li>
              <li><Link to="/consultancy" className="hover:text-neon-blue transition-colors">Strategic Advisory</Link></li>
              <li><Link to="/governance" className="hover:text-neon-blue transition-colors">Governance Layer</Link></li>
              <li><Link to="/services" className="hover:text-neon-blue transition-colors">Service Modules</Link></li>
              <li><Link to="/tech" className="hover:text-neon-blue transition-colors">SYNK Ecosystem</Link></li>
              <li><Link to="/casestudies" className="hover:text-neon-blue transition-colors">Proof Points</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[12px] font-black text-white uppercase tracking-[0.6em] mb-12 border-b-2 border-royal-900 pb-4 w-fit">Connectivity</h4>
            <ul className="space-y-6 text-[13px] text-slate-400 font-black uppercase tracking-[0.3em]">
              <li><Link to="/socials" className="hover:text-neon-purple transition-colors">Social Matrix</Link></li>
              <li><Link to="/contact" className="hover:text-neon-purple transition-colors">Contact Protocol</Link></li>
              <li><Link to="/privacy" className="hover:text-neon-purple transition-colors">Privacy Shield</Link></li>
              <li><Link to="/terms" className="hover:text-neon-purple transition-colors">Operational Terms</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[12px] font-black text-white uppercase tracking-[0.6em] mb-12 border-b-2 border-royal-900 pb-4 w-fit">Headquarters</h4>
            <ul className="space-y-8 text-[12px] text-slate-500 font-black tracking-widest leading-loose uppercase">
              <li className="flex items-start">
                <MapPin size={20} className="mr-5 mt-1 text-neon-blue shrink-0" />
                <span>{COMPANY_DETAILS.address}<br/>{COMPANY_DETAILS.cityStateZip}</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-5 text-neon-blue shrink-0" />
                <span>{COMPANY_DETAILS.emailGeneral}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-royal-900 pt-16 flex flex-col md:flex-row justify-between items-center gap-10 text-[11px] font-black text-slate-600 uppercase tracking-[0.5em]">
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center">
            <span>ABN_76_684_189_320</span>
            <span className="hidden md:block opacity-20">|</span>
            <span>&copy; {new Date().getFullYear()} {COMPANY_DETAILS.legalName}</span>
          </div>
          <div className="flex items-center gap-5 bg-royal-950 px-8 py-3 rounded-xl border border-white/5">
             <div className="w-2.5 h-2.5 rounded-full bg-neon-blue animate-pulse shadow-[0_0_10px_#06b6d4]"></div>
             <span>BUILD_VERSION: {COMPANY_DETAILS.appVersion}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}; export default Footer;