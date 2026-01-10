import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu as MenuIcon, X, Home as HomeIcon, Briefcase, Terminal, Zap, Users, Star, Mail, Target, Shield, Cpu, Lock, Scale } from 'lucide-react';
import { BrandLogo } from './BrandLogo.tsx';
import { COMPANY_DETAILS } from '../config.ts';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    setIsAuthorized(!!localStorage.getItem('rcg_auth_token'));
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen, location]);

  const publicLinks = [
    { path: '/', label: 'PROTOCOL MAINFRAME', icon: <HomeIcon size={14} className="mr-3 text-neon-blue" /> },
    { path: '/consultancy', label: 'STRATEGIC ADVISORY', icon: <Target size={14} className="mr-3 text-neon-purple" /> },
    { path: '/tech', label: 'SYNK TECH SUITE', icon: <Cpu size={14} className="mr-3 text-slate-500" /> },
    { path: '/governance', label: 'GOVERNANCE HUB', icon: <Shield size={14} className="mr-3 text-neon-blue" /> },
    { path: '/services', label: 'SERVICE NODES', icon: <Briefcase size={14} className="mr-3 text-slate-500" /> },
    { path: '/compliance', label: 'COMPLIANCE NODE', icon: <Scale size={14} className="mr-3 text-neon-blue" /> },
    { path: '/about', label: 'DNA & ORIGINS', icon: <Users size={14} className="mr-3 text-slate-500" /> },
    { path: '/casestudies', label: 'CASE STUDIES', icon: <Star size={14} className="mr-3 text-slate-500" /> },
    { path: '/contact', label: 'CONTACT MATRIX', icon: <Mail size={14} className="mr-3 text-slate-500" /> }
  ];

  const handleNavClick = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isActive = (path: string) => {
    const currentPath = window.location.hash.replace('#', '') || '/';
    return currentPath === path;
  };

  return (
    <>
      {/* Brand Identity Uplink */}
      <div className={`fixed top-4 left-4 lg:top-8 lg:left-8 z-[1100] transition-all duration-500 transform ${scrolled ? 'scale-75 -translate-x-3 -translate-y-2' : 'scale-100'}`}>
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <BrandLogo size="sm" />
        </Link>
      </div>

      {/* Sovereign Menu Node */}
      <div className={`fixed top-4 right-4 lg:top-8 lg:right-8 z-[1100] transition-all duration-500 ${scrolled ? 'translate-y-0' : ''}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative group w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center transition-all duration-500 rounded-xl bg-black border-[1.5px] shadow-2xl ${
            isOpen 
              ? 'border-neon-purple ring-4 ring-neon-purple/10' 
              : 'border-neon-blue hover:border-white ring-4 ring-neon-blue/5 hover:ring-white/10'
          }`}
          aria-label="Toggle Menu"
        >
          {/* Internal Glow */}
          <div className={`absolute inset-0 rounded-lg opacity-20 transition-opacity group-hover:opacity-40 ${isOpen ? 'bg-neon-purple' : 'bg-neon-blue'}`}></div>
          
          {/* Status LED */}
          <div className={`absolute top-2 right-2 w-1.5 h-1.5 rounded-full transition-all duration-500 ${isOpen ? 'bg-neon-purple shadow-[0_0_8px_#d946ef]' : 'bg-neon-green shadow-[0_0_8px_#10b981] animate-pulse'}`}></div>

          <div className="relative z-10 text-white transition-transform duration-500 group-hover:scale-110">
            {isOpen ? <X size={26} /> : <MenuIcon size={26} />}
          </div>

          {/* Hidden Label for Context */}
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-black tracking-[0.4em] text-slate-500 uppercase opacity-0 group-hover:opacity-100 transition-opacity">
            {isOpen ? 'Close' : 'Menu'}
          </span>
        </button>
      </div>

      {/* Navigation Overlay */}
      <div className={`fixed inset-0 z-[1050] bg-royal-950/95 backdrop-blur-2xl transition-all duration-700 ease-in-out transform ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}>
        <div className="h-full flex flex-col justify-center items-center px-6 pt-16">
          
          {/* Navigation Matrix */}
          <nav className="flex flex-col space-y-2 w-full max-w-lg overflow-y-auto py-8 max-h-[85vh] bg-black/40 p-4 lg:p-10 rounded-3xl border-[0.5px] border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative">
            <div className="px-4 mb-6 border-b-[0.5px] border-royal-800 pb-4 flex justify-between items-center">
               <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.5em]">Mainframe Index</div>
               <div className="flex gap-2">
                 <div className="w-1 h-1 bg-neon-blue rounded-full"></div>
                 <div className="w-1 h-1 bg-neon-purple rounded-full"></div>
               </div>
            </div>
            
            {publicLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={handleNavClick}
                className={`group px-5 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.4em] transition-all border-[0.5px] flex items-center justify-between relative overflow-hidden ${
                  isActive(link.path) 
                    ? 'bg-royal-800 text-white border-neon-blue shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]' 
                    : 'text-slate-400 hover:text-white border-transparent hover:border-white/20 hover:bg-white/5'
                }`}
              >
                {/* Hover Slide Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/5 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                
                <div className="relative z-10 flex items-center">
                  <span className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">{link.icon}</span>
                  {link.label}
                </div>

                {isActive(link.path) && (
                  <div className="w-1.5 h-1.5 bg-neon-blue rounded-full shadow-[0_0_10px_#06b6d4]"></div>
                )}
              </Link>
            ))}

            {!isAuthorized && (
              <Link 
                to="/login" 
                onClick={handleNavClick}
                className="mx-4 mt-10 py-5 border-[0.5px] border-royal-800 rounded-xl flex items-center justify-center gap-4 text-slate-500 hover:text-neon-purple hover:border-neon-purple/50 transition-all bg-royal-950/20 group/restricted"
              >
                <Lock size={14} className="group-hover/restricted:animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Authorized Access Only</span>
              </Link>
            )}
          </nav>

          {/* Footer Metadata in Menu */}
          <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
             <p className="text-[8px] font-mono text-slate-600 uppercase tracking-[0.6em]">
               RCG_SYNC_NOMINAL // SYSTEM_VERSION_{COMPANY_DETAILS.appVersion.split('-')[0]}
             </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;