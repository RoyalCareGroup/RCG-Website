import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, X, Sparkles, Cpu, ShieldCheck, Home as HomeIcon, Briefcase, Mic, Video, Layout, Terminal, Zap, Users, Star, Mail, Palette, Share2, Target, Shield, Cloud } from 'lucide-react';
import { BrandLogo } from './BrandLogo.tsx';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'PROTOCOL MAINFRAME', icon: <HomeIcon size={14} className="mr-3 text-neon-blue" /> },
    { path: '/deploy', label: 'DEPLOYMENT HUB', icon: <Cloud size={14} className="mr-3 text-neon-blue animate-pulse" />, highlight: true },
    { path: '/about', label: 'DNA & ORIGINS', icon: <Users size={14} className="mr-3 text-slate-500" /> },
    { path: '/casestudies', label: 'CASE STUDIES', icon: <Star size={14} className="mr-3 text-slate-500" /> },
    { path: '/consultancy', label: 'STRATEGIC ADVISORY', icon: <Target size={14} className="mr-3 text-neon-purple" /> },
    { path: '/governance', label: 'GOVERNANCE HUB', icon: <Shield size={14} className="mr-3 text-neon-blue" /> },
    { path: '/services', label: 'SERVICE NODES', icon: <Briefcase size={14} className="mr-3 text-slate-500" /> },
    { path: '/intelligence', label: 'NEURAL HUB', icon: <Zap size={14} className="mr-3 text-neon-purple animate-pulse" />, highlight: true },
    { path: '/tech', label: 'TECH & SYNK TOOLS', icon: <Cpu size={14} className="mr-3 text-slate-500" /> },
    { path: '/creative', label: 'BLUEPRINT STUDIO', icon: <Layout size={14} className="mr-3 text-slate-500" /> },
    { path: '/audio', label: 'VOICE SYNTH', icon: <Mic size={14} className="mr-3 text-slate-500" /> },
    { path: '/video', label: 'KINETIC ENGINE', icon: <Video size={14} className="mr-3 text-slate-500" /> },
    { path: '/weblab', label: 'WEB LAB', icon: <Terminal size={14} className="mr-3 text-slate-500" /> },
    { path: '/socials', label: 'SOCIAL MATRIX', icon: <Share2 size={14} className="mr-3 text-slate-500" /> },
    { path: '/contact', label: 'CONTACT MATRIX', icon: <Mail size={14} className="mr-3 text-slate-500" /> }
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleNavClick = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Brand Logo - Persistent */}
      <div className="fixed top-8 left-8 z-[1100]">
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <BrandLogo size="md" showText={!scrolled} />
        </Link>
      </div>

      {/* Orbital Trigger */}
      <div 
        className={`fixed top-6 right-6 z-[1100] transition-all duration-500 transform ${
          scrolled ? 'scale-90 opacity-90' : 'scale-100'
        }`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`orbital-border w-16 h-16 flex items-center justify-center transition-all shadow-[0_10px_40px_rgba(0,0,0,0.8)] active:scale-95 ${
            isOpen ? 'rotate-90 border-neon-purple/50' : 'rotate-0'
          }`}
          aria-label="Toggle Menu"
        >
          <div className="relative z-10 flex items-center justify-center text-white">
            {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </div>
        </button>
      </div>

      {/* Fullscreen Overlay */}
      <div 
        className={`fixed inset-0 z-[1050] bg-royal-950/95 backdrop-blur-2xl transition-all duration-500 ease-in-out transform ${
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
        }`}
      >
        {/* Decorative Background Icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-lg:scale-75 opacity-[0.03] pointer-events-none">
          <Cpu size={600} className="text-neon-blue" />
        </div>

        <div className="h-full flex flex-col justify-center items-center px-6 relative z-10">
          <div className="text-center mb-10">
            <div className="inline-block p-6 bg-royal-900 border border-neon-blue/20 rounded-[2.5rem] mb-6 shadow-2xl">
              <ShieldCheck size={40} className="text-neon-blue" />
            </div>
            <h2 className="text-white text-[10px] font-black uppercase tracking-[0.8em] mb-2 opacity-40">Intelligence Matrix</h2>
          </div>

          <nav className="flex flex-col space-y-2 w-full max-sm:px-4 max-w-sm overflow-y-auto scrollbar-hide py-10 max-h-[60vh]">
            {navLinks.map((link, idx) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={handleNavClick}
                style={{ transitionDelay: `${idx * 40}ms` }}
                className={`group px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.4em] transition-all border flex items-center justify-between overflow-hidden relative ${
                  isActive(link.path)
                    ? 'bg-royal-800/80 text-white border-neon-blue/40 shadow-xl'
                    : 'text-slate-500 hover:text-white border-transparent hover:bg-royal-900/50 hover:border-royal-800'
                }`}
              >
                <div className="relative z-10 flex items-center">
                  {link.icon}
                  {link.highlight && <Sparkles size={14} className="ml-3 text-neon-purple animate-pulse" />}
                  {link.label}
                </div>
                {isActive(link.path) && (
                  <div className="w-1.5 h-1.5 bg-neon-blue rounded-full shadow-[0_0_8px_#06b6d4]"></div>
                )}
              </Link>
            ))}
          </nav>

          <div className="mt-16 flex items-center space-x-6 text-slate-800 font-mono text-[8px] uppercase tracking-[0.4em] font-bold">
            <div className="flex items-center">
              <div className="w-1 h-1 bg-green-500 rounded-full mr-2"></div>
              <span>Secured SYNK_v9.9.5</span>
            </div>
            <div className="w-px h-3 bg-royal-800"></div>
            <span>AU-EAST NODE-1</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;