import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu as MenuIcon, X, Sparkles, Cpu, ShieldCheck, Home as HomeIcon, Briefcase, Mic, Video, Layout, Terminal, Zap, Users, Star, Mail, Palette, Target, Shield, Cloud, Lock, LogOut } from 'lucide-react';
import { BrandLogo } from './BrandLogo.tsx';
import { COMPANY_DETAILS } from '../config.ts';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
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
    { path: '/intelligence', label: 'NEURAL HUB', icon: <Zap size={14} className="mr-3 text-neon-purple animate-pulse" />, highlight: true },
    { path: '/about', label: 'DNA & ORIGINS', icon: <Users size={14} className="mr-3 text-slate-500" /> },
    { path: '/casestudies', label: 'CASE STUDIES', icon: <Star size={14} className="mr-3 text-slate-500" /> },
    { path: '/contact', label: 'CONTACT MATRIX', icon: <Mail size={14} className="mr-3 text-slate-500" /> }
  ];

  const commandLinks = [
    { path: '/command', label: 'COMMAND CENTER', icon: <Shield size={14} className="mr-3 text-emerald-400 animate-pulse" /> },
    { path: '/deploy', label: 'DEPLOYMENT HUB', icon: <Cloud size={14} className="mr-3 text-neon-blue" /> },
    { path: '/design-system', label: 'DESIGN SYSTEM', icon: <Palette size={14} className="mr-3 text-neon-purple" /> },
    { path: '/creative', label: 'BLUEPRINT STUDIO', icon: <Layout size={14} className="mr-3 text-slate-500" /> },
    { path: '/audio', label: 'VOICE SYNTH', icon: <Mic size={14} className="mr-3 text-slate-500" /> },
    { path: '/video', label: 'KINETIC ENGINE', icon: <Video size={14} className="mr-3 text-slate-500" /> },
    { path: '/weblab', label: 'WEB LAB', icon: <Terminal size={14} className="mr-3 text-slate-500" /> }
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleNavClick = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    localStorage.removeItem('rcg_auth_token');
    setIsAuthorized(false);
    handleNavClick();
    navigate('/');
  };

  return (
    <>
      <div className="fixed top-8 left-8 z-[1100]">
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <BrandLogo size="md" showText={!scrolled} />
        </Link>
      </div>

      <div className={`fixed top-8 right-8 z-[1100] transition-all duration-500 transform ${scrolled ? 'scale-90 opacity-90' : 'scale-100'}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="orbital-border w-16 h-16 flex items-center justify-center transition-all active:scale-95 group"
          aria-label="Toggle Menu"
        >
          <div className="relative z-10 flex items-center justify-center text-white">
            {isOpen ? <X size={28} className="text-neon-purple" /> : <MenuIcon size={28} className="group-hover:text-neon-blue transition-colors" />}
          </div>
        </button>
      </div>

      <div className={`fixed inset-0 z-[1050] bg-royal-950/95 backdrop-blur-3xl transition-all duration-500 ease-in-out transform ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full opacity-[0.03] pointer-events-none">
          <Terminal size={1000} className="text-neon-blue" />
        </div>

        <div className="h-full flex flex-col justify-center items-center px-6 relative z-10 pt-16">
          <nav className="flex flex-col space-y-3 w-full max-w-lg overflow-y-auto scrollbar-hide py-10 max-h-[85vh] bg-royal-900/60 p-10 rounded-[10px] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.6)] relative">
            {/* Animated Tracing Light Border Node */}
            <div className="absolute inset-0 p-[1px] rounded-[10px] pointer-events-none">
               <div className="w-full h-full border border-neon-blue/20 rounded-[10px]"></div>
            </div>

            <div className="px-8 mb-4">
               <div className="text-slate-500 text-[9px] font-black uppercase tracking-[0.6em] border-b border-royal-800 pb-5">Navigation Grid</div>
            </div>
            
            {publicLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={handleNavClick}
                className={`group px-8 py-5 rounded-[8px] text-[11px] font-black uppercase tracking-[0.4em] transition-all border flex items-center justify-between overflow-hidden relative ${isActive(link.path) ? 'bg-royal-800 text-white border-neon-blue/50 shadow-2xl' : 'text-slate-500 hover:text-white border-transparent hover:bg-royal-950 hover:border-white/10'}`}
              >
                <div className="relative z-10 flex items-center">
                  {link.icon}
                  {link.label}
                  {link.highlight && <Sparkles size={14} className="ml-3 text-neon-purple animate-pulse" />}
                </div>
              </Link>
            ))}

            {isAuthorized && (
              <>
                <div className="px-8 mt-10 mb-4">
                   <div className="text-neon-blue text-[9px] font-black uppercase tracking-[0.6em] border-b border-neon-blue/20 pb-5">Sovereign Command [L4]</div>
                </div>
                {commandLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={handleNavClick}
                    className={`group px-8 py-5 rounded-[8px] text-[11px] font-black uppercase tracking-[0.4em] transition-all border flex items-center justify-between overflow-hidden relative ${isActive(link.path) ? 'bg-neon-blue/20 text-white border-neon-blue/50 shadow-2xl' : 'text-slate-400 hover:text-white border-transparent hover:bg-neon-blue/10'}`}
                  >
                    <div className="relative z-10 flex items-center">
                      {link.icon}
                      {link.label}
                    </div>
                  </Link>
                ))}
                <button 
                  onClick={handleLogout}
                  className="mx-8 mt-8 py-5 flex items-center gap-3 text-red-500 text-[10px] font-black uppercase tracking-[0.4em] hover:text-red-400 transition-colors border-t border-white/5"
                >
                  <LogOut size={14} /> Terminate Uplink
                </button>
              </>
            )}

            {!isAuthorized && (
              <Link 
                to="/command" 
                onClick={handleNavClick}
                className="mx-8 mt-14 py-6 border border-royal-800 rounded-xl flex items-center justify-center gap-4 text-slate-500 hover:border-neon-purple hover:text-neon-purple transition-all group bg-royal-950/80 shadow-inner"
              >
                <Lock size={14} className="group-hover:animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Administrative Node</span>
              </Link>
            )}
          </nav>

          <div className="mt-12 flex items-center space-x-6 text-slate-800 font-mono text-[9px] uppercase tracking-[0.5em] font-bold">
            <div className="flex items-center">
              <div className={`w-1.5 h-1.5 rounded-[1px] mr-3 ${isAuthorized ? 'bg-emerald-500 shadow-[0_0_12px_#10b981]' : 'bg-royal-800'}`}></div>
              <span>Protocol: SYNK_v{COMPANY_DETAILS.appVersion}</span>
            </div>
            <div className="w-px h-3 bg-royal-800"></div>
            <span>AU_EAST_INFRASTRUCTURE</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;