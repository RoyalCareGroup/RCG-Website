
import React, { useState, useEffect } from 'react';
import { 
  Heart, ShieldCheck, Phone, 
  Mail, Users, Monitor, FileCheck, ArrowLeft, 
  Sparkles, ZoomIn, ZoomOut, Type, Volume2, 
  Eye, MousePointer2, AlignJustify
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY_DETAILS } from '../config.ts';
import { useSovereign } from '../context/SovereignContext.tsx';

const EasyRead: React.FC = () => {
  const { isSunshineMode } = useSovereign();
  const [fontSize, setFontSize] = useState(24);
  const [isDyslexicFont, setIsDyslexicFont] = useState(false);
  const [isReadingRulerActive, setIsReadingRulerActive] = useState(false);
  const [rulerPos, setRulerPos] = useState(0);

  // Auto-scroll the ruler with mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setRulerPos(e.clientY);
    };
    if (isReadingRulerActive) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isReadingRulerActive]);

  const handleSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const accessibilityStyle = {
    fontSize: `${fontSize}px`,
    fontFamily: isDyslexicFont ? '"Comic Sans MS", "OpenDyslexic", sans-serif' : 'inherit',
    lineHeight: '1.6'
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans selection:bg-neon-gold/30 relative overflow-x-hidden ${isSunshineMode ? 'bg-slate-50 text-slate-900' : 'bg-[#020617] text-white'}`}>
      
      {/* 1. DISABILITY ACCESSIBILITY SIDEBAR FILTER (Exclusive to Easy Read) */}
      <div className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 z-[2000] pointer-events-none">
        <div className={`w-16 sm:w-20 p-3 sm:p-4 rounded-[3rem] border-4 border-amber-400 shadow-[0_20px_50px_rgba(245,158,11,0.4)] flex flex-col items-center gap-4 pointer-events-auto transition-all ${isSunshineMode ? 'bg-white' : 'bg-royal-950'}`}>
           
           {/* Vertical Header - "Tight" style */}
           <div className="flex flex-col items-center gap-2 py-3 border-b-2 border-slate-200 dark:border-white/10 mb-2">
              <Sparkles size={20} className="text-amber-500" />
              <div className="[writing-mode:vertical-lr] rotate-180 text-[8px] font-black uppercase tracking-widest text-slate-400">ACCESS</div>
           </div>

           {/* Font Controls */}
           <div className="flex flex-col items-center gap-1">
              <button 
                onClick={() => setFontSize(prev => Math.min(prev + 4, 48))}
                className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-amber-500 active:scale-90"
                title="Increase Text Size"
              >
                <ZoomIn size={24} />
              </button>
              <div className="text-[10px] font-black opacity-40">{fontSize}</div>
              <button 
                onClick={() => setFontSize(prev => Math.max(prev - 4, 18))}
                className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-amber-500 active:scale-90"
                title="Decrease Text Size"
              >
                <ZoomOut size={24} />
              </button>
           </div>

           <div className="h-[1px] w-8 bg-slate-200 dark:border-white/10"></div>

           {/* Toggles */}
           <button 
              onClick={() => setIsDyslexicFont(!isDyslexicFont)}
              className={`p-3 rounded-2xl border-2 transition-all active:scale-90 ${
                isDyslexicFont ? 'bg-amber-400 border-amber-500 text-black' : 'border-slate-300 dark:border-white/10 text-slate-500'
              }`}
              title="Toggle Dyslexia Font"
           >
              <Type size={22} />
           </button>

           <button 
              onClick={() => setIsReadingRulerActive(!isReadingRulerActive)}
              className={`p-3 rounded-2xl border-2 transition-all active:scale-90 ${
                isReadingRulerActive ? 'bg-amber-400 border-amber-500 text-black' : 'border-slate-300 dark:border-white/10 text-slate-500'
              }`}
              title="Toggle Reading Ruler"
           >
              <AlignJustify size={22} />
           </button>

           <div className="h-[1px] w-8 bg-slate-200 dark:border-white/10"></div>

           {/* Audio */}
           <button 
              onClick={() => handleSpeech("This accessibility filter helps you read. You can change text size, font, or use the reading guide. We are Royal Care Group.")}
              className="w-12 h-12 flex items-center justify-center bg-neon-blue text-white rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all"
              title="Hear Instructions"
           >
              <Volume2 size={24} />
           </button>
        </div>
      </div>

      {/* READING RULER OVERLAY */}
      {isReadingRulerActive && (
        <div 
          className="fixed left-0 right-0 h-20 bg-amber-400/20 border-y-2 border-amber-400/50 pointer-events-none z-[1900] backdrop-blur-[2px]"
          style={{ top: `${rulerPos - 40}px` }}
        >
          <div className="absolute top-0 right-32 bg-amber-400 text-black text-[8px] font-black uppercase px-3 py-1 rounded-b-lg">
             READING FOCUS
          </div>
        </div>
      )}

      {/* Main Content shifted left slightly on desktop to clear sidebar: lg:ml-24 lg:mr-48 */}
      <div className="relative z-10 max-w-4xl mx-auto lg:mr-[22%] lg:ml-[8%] px-6 pt-32 pb-12 sm:pt-48 sm:pb-20" style={accessibilityStyle}>
        
        {/* Navigation back */}
        <div className="mb-20">
          <Link to="/" className="inline-flex items-center gap-4 text-amber-500 font-black uppercase tracking-[0.3em] text-sm hover:underline">
            <ArrowLeft size={24} /> Back to standard site
          </Link>
        </div>

        {/* Header Section */}
        <div className="space-y-12 mb-32">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <div className="p-6 bg-amber-400/10 rounded-3xl border-4 border-amber-400/50">
               <Users size={64} className="text-amber-500" />
            </div>
            <div>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-black uppercase tracking-tighter leading-tight">
                Welcome to <br/> <span className="text-amber-500">Royal Care.</span>
              </h1>
              <div className="mt-4 flex gap-4">
                 <button onClick={() => handleSpeech("Welcome to Royal Care Group.")} className="text-[10px] uppercase font-black tracking-widest text-neon-blue underline">Hear this header</button>
              </div>
            </div>
          </div>
          <p className={`text-2xl sm:text-4xl font-black leading-relaxed italic border-l-8 border-amber-400 pl-10 ${isSunshineMode ? 'text-slate-600' : 'text-slate-300'}`}>
            We build smart computer tools that help NDIS providers take better care of you.
          </p>
        </div>

        {/* Simple Explanation Blocks */}
        <div className="space-y-20 mb-40">
           <div className={`border-4 rounded-[4rem] p-10 sm:p-20 shadow-2xl space-y-16 ${isSunshineMode ? 'bg-white border-slate-200' : 'bg-black/40 border-white/10'}`}>
              <div className="flex items-center justify-between">
                <h2 className="text-4xl sm:text-5xl font-display font-black uppercase tracking-tight text-neon-blue">What we do:</h2>
                <Volume2 size={32} className="text-neon-blue cursor-pointer hover:scale-110" onClick={() => handleSpeech("What we do: We make paperwork easier, keep your records safe, and help with correct billing.")} />
              </div>
              
              <div className="grid grid-cols-1 gap-16">
                 {[
                   { 
                     icon: <Monitor className="text-neon-blue" size={48} />, 
                     title: "Easier Paperwork", 
                     desc: "Our computers help your support workers finish their notes quickly so they have more time to help you." 
                   },
                   { 
                     icon: <ShieldCheck className="text-amber-500" size={48} />, 
                     title: "Safe Records", 
                     desc: "We make sure all your information is kept very safe and follow all the NDIS rules." 
                   },
                   { 
                     icon: <FileCheck className="text-neon-purple" size={48} />, 
                     title: "Correct Billing", 
                     desc: "We help your provider make sure they charge the right amount for the support they give you." 
                   }
                 ].map((item, i) => (
                   <div key={i} className="flex flex-col sm:flex-row items-start gap-12 group">
                      <div className={`p-8 rounded-[2.5rem] border-4 shadow-inner transition-transform group-hover:scale-105 ${isSunshineMode ? 'bg-slate-100 border-white' : 'bg-royal-950 border-white/5'}`}>
                         {item.icon}
                      </div>
                      <div className="space-y-6">
                         <h3 className="text-4xl font-display font-black uppercase tracking-tight">{item.title}</h3>
                         <p className={`text-2xl font-bold leading-relaxed ${isSunshineMode ? 'text-slate-500' : 'text-slate-400'}`}>"{item.desc}"</p>
                         <button onClick={() => handleSpeech(`${item.title}: ${item.desc}`)} className="text-[11px] font-black text-neon-blue uppercase tracking-widest flex items-center gap-2">
                           <Volume2 size={16} /> Read this block
                         </button>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className={`border-4 border-amber-400/30 rounded-[4rem] p-10 sm:p-20 shadow-2xl text-center space-y-12 ${isSunshineMode ? 'bg-amber-50' : 'bg-black/40'}`}>
              <Sparkles size={80} className="text-amber-500 mx-auto animate-pulse" />
              <h2 className="text-4xl sm:text-5xl font-display font-black uppercase tracking-tight">Our Goal.</h2>
              <p className={`text-3xl font-black leading-relaxed italic max-w-3xl mx-auto ${isSunshineMode ? 'text-slate-700' : 'text-slate-300'}`}>
                "We want to make the NDIS simpler for everyone. Better tools mean better care for you."
              </p>
           </div>
        </div>

        {/* Simplified Contact */}
        <div className="space-y-16 mb-24">
           <div className="text-center space-y-6">
              <h2 className="text-5xl sm:text-7xl font-display font-black uppercase tracking-tighter">Talk to us.</h2>
              <p className="text-2xl text-slate-500 font-black uppercase tracking-widest">A real human is ready to help you.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <a href={`mailto:${COMPANY_DETAILS.email}`} className="bg-white text-black p-16 rounded-[3.5rem] flex flex-col items-center gap-8 shadow-[0_40px_80px_rgba(0,0,0,0.1)] hover:scale-105 transition-transform group border-4 border-transparent hover:border-neon-blue">
                 <Mail size={64} className="text-neon-blue group-hover:animate-bounce" />
                 <span className="text-3xl font-black uppercase tracking-widest text-center">Send Email</span>
                 <span className="text-lg font-mono opacity-50 underline">{COMPANY_DETAILS.email}</span>
              </a>
              <Link to="/contact" className="bg-black border-[6px] border-amber-400 text-white p-16 rounded-[3.5rem] flex flex-col items-center gap-8 shadow-2xl hover:scale-105 transition-transform group">
                 <Users size={64} className="text-amber-400" />
                 <span className="text-3xl font-black uppercase tracking-widest text-center">Message Hub</span>
                 <span className="text-lg font-mono opacity-50 underline decoration-amber-400/30">Click to open form</span>
              </Link>
           </div>
        </div>

        {/* Footer Identity */}
        <div className="text-center py-12 border-t-4 border-slate-200 dark:border-white/5 space-y-6">
           <div className="flex justify-center">
              <Heart className="text-red-500 animate-pulse" size={48} />
           </div>
           <p className="text-[12px] font-mono text-slate-400 uppercase tracking-[1em] font-black">
              Royal Care Group // Accessible Core v2.0
           </p>
        </div>

      </div>
    </div>
  );
};

export default EasyRead;
