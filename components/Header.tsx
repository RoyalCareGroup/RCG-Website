
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu as MenuIcon, X, Home as HomeIcon, Briefcase, 
  Target, Shield, Cpu, Mail, Users, Star, 
  Sun, ChevronRight, Moon, Fingerprint, Lock,
  BookOpen, Layout
} from 'lucide-react';
import { BrandLogo } from './BrandLogo.tsx';
import { useSovereign } from '../context/SovereignContext.tsx';

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isSunshineMode, setIsSunshineMode, isMember, setShowPassportModal, memberData } = useSovereign();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const publicLinks = [
    { path: '/', label: 'MAINFRAME', icon: <HomeIcon size={14} /> },
    { path: '/vault', label: 'THE VAULT', icon: <Lock size={14} />, isMemberOnly: true },
    { path: '/consultancy', label: 'ADVISORY', icon: <Target size={14} /> },
    { path: '/tech', label: 'TECH SUITE', icon: <Cpu size={14} /> },
    { path: '/governance', label: 'GOVERNANCE', icon: <Shield size={14} /> },
    { path: '/services', label: 'SERVICES', icon: <Briefcase size={14} /> },
    { path: '/makeovers', label: 'MAKEOVERS', icon: <Star size={14} /> },
    { path: '/about', label: 'OUR STORY', icon: <Users size={14} /> },
    { path: '/contact', label: 'UPLINK', icon: <Mail size={14} /> }
  ];

  const isEasyReadPage = location.pathname === '/easy-read';

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-[1100] px-4 sm:px-6 py-4 flex justify-center pointer-events-none transition-all duration-700 ${scrolled ? 'translate-y-0' : 'translate-y-2'}`}>
        <div className="max-w-7xl w-full flex items-center justify-between sovereign-hud px-4 sm:px-6 py-2.5 pointer-events-auto border border-black/5 dark:border-white/10 transition-all duration-1000 bg-white/95 dark:bg-black/90 shadow-2xl">
          
          {/* Brand Identity */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link to="/" className="flex items-center gap-4 transition-transform hover:scale-[1.01]">
              <BrandLogo size="md" showText={false} />
              <div className="hidden lg:flex flex-col">
                <span className="text-slate-950 dark:text-white text-[13px] font-display font-black tracking-tighter uppercase leading-none transition-colors duration-1000">Royal Care</span>
                <span className="text-indigo-500 text-[7px] font-black uppercase tracking-[0.4em] mt-1 opacity-60">Tech Division</span>
              </div>
            </Link>
          </div>

          {/* Action Protocols Cluster */}
          <div className="flex items-center gap-2 sm:gap-4">
             
             {/* 1. CONTEXT-AWARE EASY READ / STANDARD TOGGLE */}
             <Link
               to={isEasyReadPage ? "/" : "/easy-read"}
               className={`hidden md:flex items-center gap-3 px-5 py-3 rounded-xl border transition-all duration-500 ${
                 isEasyReadPage 
                  ? 'bg-amber-400 border-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.3)]' 
                  : 'border-slate-200 dark:border-white/10 text-slate-500 hover:text-neon-gold hover:border-neon-gold'
               }`}
             >
               {isEasyReadPage ? <Layout size={14} /> : <BookOpen size={14} />}
               <span className="text-[9px] font-black uppercase tracking-widest">
                 {isEasyReadPage ? 'Standard Site' : 'Easy Read'}
               </span>
             </Link>

             {/* 2. NEURAL PASSPORT NODE */}
             <button
              onClick={() => isMember ? navigate('/vault') : setShowPassportModal(true)}
              className={`relative hidden xl:flex items-center gap-4 px-6 py-3 rounded-xl border-2 transition-all duration-500 overflow-hidden group/passport ${
                isMember 
                  ? 'bg-black border-neon-gold text-neon-gold shadow-[0_0_20px_rgba(229,199,139,0.1)]' 
                  : 'bg-royal-950 border-royal-800 text-slate-500 hover:border-white/40 hover:text-white'
              }`}
             >
               <Fingerprint size={14} className={isMember ? 'animate-pulse' : ''} />
               <span className="text-[10px] font-display font-black uppercase tracking-widest whitespace-nowrap">
                 {isMember ? memberData?.name.split(' ')[0] + '_PASSPORT' : 'MEMBER PASSPORT'}
               </span>
               <div className="absolute inset-0 bg-neon-gold opacity-0 group-hover/passport:opacity-[0.03] transition-opacity"></div>
             </button>

             {/* 3. FULL SUNSHINE MODE TOGGLE */}
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

             {/* Menu Button */}
             <button
              onClick={() => setOpen(!isOpen)}
              className="relative group w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 transition-all hover:bg-slate-200 dark:hover:bg-white/10 active:scale-95 duration-1000"
             >
               {isOpen ? <X size={18} className="text-neon-gold" /> : <MenuIcon size={18} className="text-slate-950 dark:text-white" />}
             </button>
          </div>
        </div>
      </header>

      {/* Navigation Overlay */}
      <div className={`fixed inset-0 z-[1050] bg-white/98 dark:bg-black/98 backdrop-blur-3xl transition-all duration-700 ease-in-out transform ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
        <div className="h-full flex flex-col justify-center items-center px-6 pt-24 overflow-y-auto">
          <div className="w-full max-w-5xl py-20 space-y-12">
             <div className="text-center">
                <div className="text-neon-gold/50 text-[9px] font-mono font-black uppercase tracking-[1em] mb-4">Grid_Matrix_System</div>
                <h3 className="text-4xl sm:text-5xl font-display font-black text-slate-950 dark:text-white uppercase tracking-tighter text-balance">Authorized Nodes</h3>
             </div>
             
             <nav className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               {publicLinks.map((link) => (
                 <Link
                   key={link.path}
                   to={link.path}
                   onClick={() => setOpen(false)}
                   className={`orbital-tile group p-6 flex items-center justify-between border-slate-200 dark:border-white/5 hover:border-neon-gold/30 transition-all ${
                     location.pathname === link.path 
                       ? 'bg-slate-50 dark:bg-royal-950/80 border-neon-gold/40 shadow-xl' 
                       : 'bg-white dark:bg-black/40'
                   }`}
                 >
                   <div className="flex items-center gap-5">
                      <div className={`p-3.5 rounded-xl border transition-all ${
                        location.pathname === link.path 
                          ? 'bg-neon-gold border-neon-gold text-black shadow-lg' 
                          : 'bg-slate-100 dark:bg-royal-950 border-slate-200 dark:border-white/10 text-slate-500 group-hover:text-slate-950 dark:group-hover:text-white'
                      }`}>
                         {link.icon}
                      </div>
                      <div>
                         <h4 className="text-slate-950 dark:text-white text-sm font-display font-black uppercase tracking-tight flex items-center gap-2">
                           {link.label}
                           {link.isMemberOnly && <Lock size={10} className="text-neon-gold" />}
                         </h4>
                         <p className="text-slate-400 dark:text-slate-500 text-[8px] font-black uppercase tracking-widest mt-1">
                           {link.isMemberOnly && !isMember ? 'Required: Passport' : 'Authorization: Standard'}
                         </p>
                      </div>
                   </div>
                   <ChevronRight size={14} className="text-slate-300 dark:text-slate-800 group-hover:text-slate-950 dark:group-hover:text-white group-hover:translate-x-1 transition-all" />
                 </Link>
               ))}
             </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
