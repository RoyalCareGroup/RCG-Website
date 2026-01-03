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
    { path: '/', label: 'PROTOCOL MAINFRAME', icon: <HomeIcon size={16} className="mr-4 text-neon-blue" /> },
    { path: '/consultancy', label: 'STRATEGIC ADVISORY', icon: <Target size={16} className="mr-4 text-neon-purple" /> },
    { path: '/tech', label: 'SYNK TECH SUITE', icon: <Cpu size={16} className="mr-4 text-slate-500" /> },
    { path: '/governance', label: 'GOVERNANCE HUB', icon: <Shield size={16} className="mr-4 text-neon-blue" /> },
    { path: '/services', label: 'SERVICE NODES', icon: <Briefcase size={16} className="mr-4 text-slate-500" /> },
    { path: '/intelligence', label: 'NEURAL HUB', icon: <Zap size={16} className="mr-4 text-neon-purple animate-pulse" />, highlight: true },
    { path: '/about', label: 'DNA & ORIGINS', icon: <Users size={16} className="mr-4 text-slate-500" /> },
    { path: '/casestudies', label: 'CASE STUDIES', icon: <Star size={16} className="mr-4 text-slate-500" /> },
    { path: '/contact', label: 'CONTACT MATRIX', icon: <Mail size={16} className="mr-4 text-slate-500" /> }
  ];

  const commandLinks = [
    { path: '/command', label: 'COMMAND CENTER', icon: <Shield size={16} className="mr-4 text-emerald-400 animate-pulse" /> },
    { path: '/deploy', label: 'DEPLOYMENT HUB', icon: <Cloud size={16} className="mr-4 text-neon-blue" /> },
    { path: '/design-system', label: 'DESIGN SYSTEM', icon: <Palette size={16} className="mr-4 text-neon-purple" /> },
    { path: '/creative', label: 'BLUEPRINT STUDIO', icon: <Layout size={16} className="mr-4 text-slate-500" /> },
    { path: '/audio', label: 'VOICE SYNTH', icon: <Mic size={16} className="mr-4 text-slate-500" /> },
    { path: '/video', label: 'KINETIC ENGINE', icon: <Video size={16} className="mr-4 text-slate-500" /> },
    { path: '/weblab', label: 'WEB LAB', icon: <Terminal size={16} className="mr-4 text-slate-500" /> }
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
      <div className={`fixed top-10 left-10 z-[1100] transition-all duration-500 transform ${scrolled ? 'scale-75 -translate-x-12 -translate-y-6' : 'scale-100'}`}>
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <BrandLogo size="md" />
        </Link>
      </div>

      <div className={`fixed top-10 right-10 z-[1100] transition-all duration-500 transform ${scrolled ? 'scale-90 opacity-90' : 'scale-100'}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="circuit-capsule w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center transition-all group shadow-[0_20px_50px_rgba(0,0,0,0.7)] bg-black"
          aria-label="Toggle Menu"
          style={{ padding: 0 }}
        >
          <div className="relative z-10 flex items-center justify-center">
            {isOpen ? <X size={44} /> : <MenuIcon size={44} />}
          </div>
        </button>
      </div>

      <div className={`fixed inset-0 z-[1050] bg-royal-950/98 backdrop-blur-3xl transition-all duration-500 ease-in-out transform ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}>
        <div className="h-full flex flex-col justify-center items-center px-6 relative z-10 pt-16">
          <nav className="flex flex-col space-y-3 w-full max-w-xl overflow-y-auto scrollbar-hide py-12 max-h-[85vh] bg-royal-900/80 p-12 rounded-[2rem] border-2 border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative">
            <div className="px-10 mb-6">
               <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.6em] border-b-2 border-royal-800 pb-6">Core Navigation</div>
            </div>
            
            {publicLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={handleNavClick}
                className={`group px-10 py-6 rounded-xl text-[12px] font-black uppercase tracking-[0.4em] transition-all border-2 flex items-center justify-between overflow-hidden relative ${isActive(link.path) ? 'bg-royal-800 text-white border-neon-blue shadow-2xl' : 'text-slate-400 hover:text-white border-transparent hover:bg-royal-950 hover:border-white/10'}`}
              >
                <div className="relative z-10 flex items-center">
                  {link.icon}
                  {link.label}
                  {link.highlight && <Sparkles size={16} className="ml-4 text-neon-purple animate-pulse" />}
                </div>
              </Link>
            ))}

            {isAuthorized && (
              <>
                <div className="px-10 mt-12 mb-6">
                   <div className="text-neon-blue text-[10px] font-black uppercase tracking-[0.6em] border-b-2 border-neon-blue/20 pb-6">Sovereign Command Hub</div>
                </div>
                {commandLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={handleNavClick}
                    className={`group px-10 py-6 rounded-xl text-[12px] font-black uppercase tracking-[0.4em] transition-all border-2 flex items-center justify-between overflow-hidden relative ${isActive(link.path) ? 'bg-neon-blue text-white border-neon-blue shadow-2xl' : 'text-slate-400 hover:text-white border-transparent hover:bg-neon-blue/10'}`}
                  >
                    <div className="relative z-10 flex items-center">
                      {link.icon}
                      {link.label}
                    </div>
                  </Link>
                ))}
                <button 
                  onClick={handleLogout}
                  className="mx-10 mt-10 py-6 flex items-center gap-4 text-red-500 text-[12px] font-black uppercase tracking-[0.4em] hover:text-red-400 transition-colors border-t-2 border-white/5"
                >
                  <LogOut size={16} /> Terminate System Uplink
                </button>
              </>
            )}

            {!isAuthorized && (
              <Link 
                to="/login" 
                onClick={handleNavClick}
                className="mx-10 mt-16 py-8 border-2 border-royal-800 rounded-2xl flex items-center justify-center gap-5 text-slate-500 hover:border-neon-purple hover:text-neon-purple transition-all group bg-royal-950 shadow-inner"
              >
                <Lock size={18} className="group-hover:animate-pulse" />
                <span className="text-[11px] font-black uppercase tracking-[0.5em]">Restricted Administrative Node</span>
              </Link>
            )}
          </nav>

          <div className="mt-16 flex items-center space-x-10 text-slate-700 text-[11px] uppercase tracking-[0.6em] font-black">
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-4 ${isAuthorized ? 'bg-emerald-500 shadow-[0_0_12px_#10b981]' : 'bg-royal-800'}`}></div>
              <span>Grid: SYNK_CORE_v{COMPANY_DETAILS.appVersion}</span>
            </div>
            <div className="w-1 h-4 bg-royal-800"></div>
            <span>AU_EAST_INFRASTRUCTURE</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;