
import React, { useState } from 'react';
import { 
  ShieldCheck, Zap, Loader2, Mic, Volume2, 
  Lock, ChevronDown, ChevronUp, Fingerprint, 
  ArrowRight, Info, Mail, Building, User,
  CheckCircle2, Settings2, BarChart3, Share2,
  Cpu, Activity
} from 'lucide-react';
import { useSovereign } from '../context/SovereignContext.tsx';
import { BrandLogo } from './BrandLogo.tsx';
import { DecodingText } from './DecodingText.tsx';

interface SovereignConsentProps {
  onAccepted: () => void;
}

export const SovereignConsent: React.FC<SovereignConsentProps> = ({ onAccepted }) => {
  const [view, setView] = useState<'base' | 'permissions' | 'signup'>('base');
  const [isInitializing, setIsInitializing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', org: '' });
  
  // Detailed Permissions State
  const [prefs, setPrefs] = useState({
    essential: true, // Always required
    analytics: true,
    marketing: false,
    mic: false,
    audio: true
  });

  const { initializeAudio, establishPassport } = useSovereign();

  const savePreferences = () => {
    localStorage.setItem('rcg_consent_v2', JSON.stringify({
      ...prefs,
      timestamp: Date.now()
    }));
    // Also sync to hardware prefs used in Compliance.tsx
    localStorage.setItem('rcg_hardware_prefs', JSON.stringify({
      mic: prefs.mic,
      speaker: prefs.audio,
      haptics: true
    }));
  };

  const handleSimpleEnter = async () => {
    setIsInitializing(true);
    savePreferences();
    if (prefs.audio || prefs.mic) {
      await initializeAudio();
    }
    setTimeout(() => {
      onAccepted();
      setIsInitializing(false);
    }, 800);
  };

  const handleMemberSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsInitializing(true);
    savePreferences();
    
    setTimeout(async () => {
      if (prefs.audio || prefs.mic) {
        await initializeAudio();
      }
      establishPassport({
        ...formData,
        timestamp: Date.now()
      });
      onAccepted();
      setIsInitializing(false);
    }, 1500);
  };

  const togglePref = (key: keyof typeof prefs) => {
    if (key === 'essential') return;
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const standardizedBtn = "w-full p-8 rounded-2xl border-2 border-neon-gold bg-black text-white hover:bg-white hover:text-black transition-all duration-500 font-black uppercase tracking-[0.3em] flex items-center justify-between group shadow-3xl active:scale-[0.98]";

  const ToggleSwitch = ({ active, label, icon: Icon, disabled = false, sub, onClick }: { active: boolean, label: string, icon: any, disabled?: boolean, sub: string, onClick?: () => void }) => (
    <div className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all duration-500 ${active ? 'border-neon-gold/40 bg-neon-gold/5' : 'border-white/5 bg-black/40'} ${disabled ? 'opacity-50' : ''}`}>
      <div className="flex items-center gap-6">
        <div className={`p-3 rounded-xl ${active ? 'text-neon-gold bg-neon-gold/10' : 'text-slate-600 bg-white/5'}`}>
          <Icon size={20} />
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] font-black text-white uppercase tracking-widest">{label}</span>
          <span className="text-[9px] text-slate-500 font-bold italic lowercase">{sub}</span>
        </div>
      </div>
      <button 
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={`relative w-12 h-6 rounded-full transition-colors duration-500 flex items-center ${active ? 'bg-neon-gold' : 'bg-slate-800'}`}
      >
        <div className={`absolute w-4 h-4 bg-black rounded-full transition-transform duration-500 shadow-xl ${active ? 'translate-x-7' : 'translate-x-1'}`} />
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[50000] flex flex-col items-center justify-start bg-[#020617] overflow-y-auto px-6 pt-32 pb-32">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(229,199,139,0.03)_0,transparent_70%)]" />
      </div>

      <div className="relative z-10 w-full max-w-[95vw] flex flex-col items-center space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        
        <div className="p-[1px] bg-neon-gold rounded-xl shadow-[0_0_50px_rgba(229,199,139,0.15)] transform hover:scale-[1.01] transition-transform duration-700 overflow-hidden">
          <div className="bg-black rounded-[calc(0.75rem-1px)] backdrop-blur-xl">
            <BrandLogo size="lg" />
          </div>
        </div>

        <div className="text-center space-y-10 w-full px-4 overflow-visible">
          <h1 className="text-[4.5vw] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black uppercase tracking-tighter leading-none animate-liquid-shimmer whitespace-nowrap inline-block max-w-full">
            <span className="text-chiseled-silver text-stroked-black">Choose how you use </span>
            <span className="text-chiseled-gold text-stroked-black">our site.</span>
          </h1>
          
          <div className="text-indigo-400 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.5em] drop-shadow-[0_0_10px_rgba(129,140,248,0.8)]">
            <DecodingText 
              text="System initialization protocol required for entry" 
              stagger={20}
              baseDelay={800}
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-6 max-w-2xl">
          
          {/* PATH 1: PERMISSIONS & COOKIES */}
          <div className="w-full">
            <button 
              onClick={() => setView(view === 'permissions' ? 'base' : 'permissions')}
              className={standardizedBtn}
            >
              <div className="flex items-center gap-6">
                <div className="p-3 bg-neon-gold/10 rounded-xl text-neon-gold">
                  <Settings2 size={24} />
                </div>
                <span className="text-[11px] sm:text-[13px] tracking-[0.2em]">Personalize Permissions & Cookies</span>
              </div>
              {view === 'permissions' ? <ChevronUp size={20} className="text-neon-gold" /> : <ChevronDown size={20} className="text-slate-700 group-hover:text-black" />}
            </button>

            {view === 'permissions' && (
              <div className="mt-6 p-8 rounded-3xl bg-black border-2 border-neon-gold/20 space-y-8 animate-in slide-in-from-top-4 duration-500 shadow-2xl">
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-neon-gold mb-2">
                    <ShieldCheck size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Cookie Sovereignty</span>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <ToggleSwitch 
                      active={prefs.essential} label="Essential" disabled 
                      icon={Lock} sub="required for security and core grid stability." 
                    />
                    <ToggleSwitch 
                      active={prefs.analytics} label="Analytics" 
                      icon={BarChart3} sub="helps us optimize structural performance nodes." 
                      onClick={() => togglePref('analytics')}
                    />
                    <ToggleSwitch 
                      active={prefs.marketing} label="Marketing" 
                      icon={Share2} sub="personalized updates from the RCG development feed." 
                      onClick={() => togglePref('marketing')}
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 space-y-4">
                  <div className="flex items-center gap-3 text-neon-blue mb-2">
                    <Cpu size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Hardware Bridging</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ToggleSwitch 
                      active={prefs.mic} label="Microphone" 
                      icon={Mic} sub="real-time dialogue with Aurelia." 
                      onClick={() => togglePref('mic')}
                    />
                    <ToggleSwitch 
                      active={prefs.audio} label="Neural Audio" 
                      icon={Volume2} sub="organizational neural briefings." 
                      onClick={() => togglePref('audio')}
                    />
                  </div>
                </div>

                <div className="p-6 bg-neon-gold/5 rounded-2xl border border-neon-gold/20 text-center space-y-1">
                   <p className="text-[10px] text-slate-400 font-bold leading-relaxed italic">
                     These choices are stored in <span className="text-white">Local Storage</span> to protect your sovereignty.
                   </p>
                   <p className="text-[10px] text-slate-400 font-bold leading-relaxed italic">
                     You can reset these at any time via the Compliance Node.
                   </p>
                </div>
              </div>
            )}
          </div>

          {/* PATH 2: MEMBER SIGNUP */}
          <div className="w-full">
            <button 
              onClick={() => setView(view === 'signup' ? 'base' : 'signup')}
              className={standardizedBtn}
            >
              <div className="flex items-center gap-6">
                <div className="p-3 bg-neon-gold/10 rounded-xl text-neon-gold">
                  <Fingerprint size={24} />
                </div>
                <span className="text-[11px] sm:text-[13px] tracking-[0.2em]">Join for full experience (Sign Up)</span>
              </div>
              {view === 'signup' ? <ChevronUp size={20} className="text-neon-gold" /> : <ArrowRight size={20} className="text-slate-700 group-hover:text-black" />}
            </button>

            {view === 'signup' && (
              <div className="mt-6 p-10 rounded-[2.5rem] bg-black border-2 border-neon-gold space-y-10 animate-in slide-in-from-top-4 duration-500 shadow-3xl">
                <div className="text-center space-y-3">
                  <h3 className="text-white font-display font-black uppercase text-2xl tracking-tighter">Initiate Passport</h3>
                  <p className="text-[9px] text-slate-500 uppercase tracking-widest font-black">Access Restricted Intelligence & Tools</p>
                </div>
                <form onSubmit={handleMemberSignup} className="space-y-6">
                  <div className="relative">
                    <input 
                      required type="text" placeholder="FULL NAME"
                      className="w-full bg-royal-950 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white text-xs outline-none focus:border-neon-gold transition-all font-bold"
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-700" size={20} />
                  </div>
                  <div className="relative">
                    <input 
                      required type="email" placeholder="WORK EMAIL"
                      className="w-full bg-royal-950 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white text-xs outline-none focus:border-neon-gold transition-all font-bold"
                      value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-700" size={20} />
                  </div>
                  <div className="relative">
                    <input 
                      required type="text" placeholder="ORGANIZATION"
                      className="w-full bg-royal-950 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white text-xs outline-none focus:border-neon-gold transition-all font-bold"
                      value={formData.org} onChange={e => setFormData({...formData, org: e.target.value})}
                    />
                    <Building className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-700" size={20} />
                  </div>
                  <button 
                    type="submit" 
                    disabled={isInitializing}
                    className="w-full py-6 bg-white text-black font-black text-[12px] uppercase tracking-[0.5em] rounded-2xl hover:bg-neon-gold transition-all flex items-center justify-center gap-4 active:scale-95 shadow-2xl"
                  >
                    {isInitializing ? <Loader2 className="animate-spin" size={18} /> : <Zap size={18} className="text-amber-500" />}
                    Establish Neural Passport
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* PATH 3: SIMPLE MODE */}
          <button 
            onClick={handleSimpleEnter}
            disabled={isInitializing}
            className={standardizedBtn}
          >
            <div className="flex items-center gap-6">
              <div className="p-3 bg-neon-gold/10 rounded-xl text-neon-gold">
                <Zap size={24} />
              </div>
              <span className="text-[11px] sm:text-[13px] tracking-[0.2em]">Enter Site in Simple Mode</span>
            </div>
            {isInitializing ? <Loader2 className="animate-spin text-neon-gold" size={20} /> : <ArrowRight size={20} className="text-slate-700 group-hover:text-black" />}
          </button>

        </div>

        <div className="pt-12 flex items-center gap-16 opacity-30">
          <div className="flex items-center gap-4">
             <Lock size={16} className="text-neon-gold" />
             <span className="text-[9px] text-white font-black uppercase tracking-[0.5em]">Sovereign Encryption</span>
          </div>
          <div className="flex items-center gap-4">
             <Activity size={16} className="text-neon-blue" />
             <span className="text-[9px] text-white font-black uppercase tracking-[0.5em]">Grid Node Validated</span>
          </div>
        </div>
      </div>
    </div>
  );
};
