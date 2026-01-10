
import React, { useState, useEffect } from 'react';
import { Terminal, ShieldAlert, Lock, Cpu, ArrowRight, Loader2, Zap } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const [passkey, setPasskey] = useState('');
  const [status, setStatus] = useState<'idle' | 'checking' | 'error' | 'success'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('checking');
    setTimeout(() => {
      if (passkey.toUpperCase() === 'SYNK-1012-CORE') {
        localStorage.setItem('rcg_auth_token', 'LEVEL_4_AUTHORIZED_' + Date.now());
        setStatus('success');
        setTimeout(() => { navigate((location.state as any)?.from?.pathname || '/command'); }, 1500);
      } else {
        setStatus('error'); setErrorMsg('ACCESS_DENIED');
        setPasskey(''); setTimeout(() => setStatus('idle'), 2000);
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col bg-[#334155] overflow-x-hidden min-h-screen selection:bg-neon-blue/30 selection:text-white px-6 sm:px-16 lg:px-24 xl:px-32 font-sans font-bold relative justify-center items-center">
      
      {/* --- ATMOSPHERE NODES --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[#334155]"></div>
        <div 
          className="absolute inset-0 parallax-layer opacity-[0.04]"
          style={{ 
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 2px,transparent 2px), linear-gradient(90deg,rgba(255,255,255,0.06) 2px,transparent_2px)',
            backgroundSize: '120px 120px',
            transform: `translateY(${scrollY * -0.05}px)` 
          }}
        ></div>
        <div className="absolute top-[10%] left-[-10%] w-[100%] h-[100%] bg-neon-purple/[0.08] rounded-full blur-[200px] animate-blob-drift opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-15%] w-[100%] h-[100%] bg-neon-blue/[0.08] rounded-full blur-[250px] animate-blob-drift opacity-60"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.06] mix-blend-overlay"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className={`orbital-tile p-12 bg-black border-2 transition-all duration-700 ${
          status === 'error' ? 'border-red-500' : status === 'success' ? 'border-emerald-500' : 'border-white/10'
        }`}>
          <div className="flex flex-col items-center text-center mb-12">
            <div className="p-6 rounded-2xl mb-8 bg-royal-950 border-2 border-white/5">
              <Lock className="w-12 h-12 text-neon-purple" />
            </div>
            <h1 className="text-3xl font-display font-black text-white uppercase tracking-tighter">Command Access</h1>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.5em] mt-4">Identification Protocol Required</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <input type="password" value={passkey} onChange={e => setPasskey(e.target.value)} className="w-full bg-royal-950 border-2 border-white/10 rounded-xl py-6 px-8 text-white font-mono text-center focus:border-neon-blue outline-none transition-all shadow-inner" placeholder="INPUT_PASSKEY" />
            <button type="submit" disabled={status === 'checking' || !passkey} className="w-full py-6 bg-black border-[4px] border-[#D4AF37] text-white font-black text-[11px] tracking-[0.6em] uppercase flex items-center justify-center gap-6 group active:border-neon-purple active:text-neon-purple transition-all shadow-2xl disabled:opacity-50 rounded-[2rem]">
               {status === 'checking' ? <Loader2 className="animate-spin text-neon-blue" /> : <Zap size={18} className="text-amber-500 group-active:text-neon-purple transition-colors" />}
               <span>Initialize Sync</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
