import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu as MenuIcon, X, Home as HomeIcon, Briefcase, 
  Target, Cpu, Mail, Users,
  Sun, ChevronRight, Moon
} from 'lucide-react';
import { BrandLogo } from './BrandLogo.tsx';
import { useSovereign } from '../context/SovereignContext.tsx';

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isSunshineMode, setIsSunshineMode } = useSovereign();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const publicLinks = [
    { path: '/', label: 'Home', icon: <HomeIcon size={16} />, desc: 'Back to homepage' },
    { path: '/services', label: 'Services', icon: <Briefcase size={16} />, desc: 'What we offer' },
    { path: '/consultancy', label: 'Consulting', icon: <Target size={16} />, desc: 'Business consulting' },
    { path: '/tech', label: 'Products', icon: <Cpu size={16} />, desc: 'SYNK product suite' },
    { path: '/about', label: 'About', icon: <Users size={16} />, desc: 'Our story' },
    { path: '/contact', label: 'Contact', icon: <Mail size={16} />, desc: 'Get in touch' }
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-[1100] px-4 sm:px-6 py-4 flex justify-center pointer-events-none transition-all duration-700 ${scrolled ? 'translate-y-0' : 'translate-y-2'}`}>
        <div className="max-w-7xl w-full flex items-center justify-between sovereign-hud px-4 sm:px-6 py-2.5 pointer-events-auto border border-black/5 dark:border-white/10 transition-all duration-1000 bg-white/95 dark:bg-black/90 shadow-2xl">
          
          <div className="flex items-center gap-4 sm:gap-6">
            <Link to="/" className="flex items-center gap-4 transition-transform hover:scale-[1.01]">
              <BrandLogo size="md" showText={false} />
              <div className="hidden lg:flex flex-col">
                <span className="text-slate-950 dark:text-white text-[13px] font-mono font-black tracking-tighter uppercase leading-none transition-colors duration-1000">Royal Care</span>
                <span className="text-indigo-500 text-[7px] font-black uppercase tracking-[0.4em] mt-1 opacity-60">Tech Division</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
             <button
              onClick={() => setIsSunshineMode(!isSunshineMode)}
              className={`relative flex items-center gap-4 px-5 py-3 rounded-xl border-2 transition-all duration-500 overflow-hidden group/mode ${
                isSunshineMode 
                  ? 'bg-royal-950 border-royal-800 text-neon-blue shadow-lg' 
                  : 'bg-amber-400 border-amber-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:scale-[1.03]'
              }`}
             >
               {isSunshineMode ? (
                 <>
                   <Moon size={14} fill="currentColor" />
                   <span className="hidden sm:inline text-[9px] font-black uppercase tracking-widest">Dark Mode</span>
                 </>
               ) : (
                 <>
                   <Sun size={14} className="animate-spin-slow" strokeWidth={3} />
                   <span className="hidden sm:inline text-[9px] font-black uppercase tracking-widest">Sunshine Mode</span>
                 </>
               )}
             </button>

             <div className="h-8 w-[1px] bg-slate-200 dark:bg-white/10 transition-colors duration-1000 mx-2"></div>

             <button
              onClick={() => setOpen(!isOpen)}
              className="relative group w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 transition-all hover:bg-slate-200 dark:hover:bg-white/10 active:scale-95 duration-1000"
             >
               {isOpen ? <X size={18} className="text-neon-gold" /> : <MenuIcon size={18} className="text-slate-950 dark:text-white" />}
             </button>
          </div>
        </div>
      </header>

      {/* Navigation Overlay — Clean List Style */}
      <div className={`fixed inset-0 z-[1050] bg-white/98 dark:bg-black/98 backdrop-blur-3xl transition-all duration-700 ease-in-out transform ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
        <div className="h-full flex flex-col justify-center items-center px-6 pt-20">
          <nav className="w-full max-w-md space-y-2">
            {publicLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={`group flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 ${
                  location.pathname === link.path 
                    ? 'bg-neon-gold/10 dark:bg-neon-gold/10 border border-neon-gold/30' 
                    : 'hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className={`p-2.5 rounded-lg transition-all ${
                  location.pathname === link.path 
                    ? 'bg-neon-gold text-black' 
                    : 'bg-slate-100 dark:bg-white/5 text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white'
                }`}>
                  {link.icon}
                </div>
                <div className="flex-grow">
                  <h4 className="text-slate-950 dark:text-white text-base font-mono font-black tracking-tight">
                    {link.label}
                  </h4>
                  <p className="text-slate-400 dark:text-slate-600 text-xs">
                    {link.desc}
                  </p>
                </div>
                <ChevronRight size={16} className="text-slate-300 dark:text-slate-700 group-hover:text-slate-600 dark:group-hover:text-white group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
