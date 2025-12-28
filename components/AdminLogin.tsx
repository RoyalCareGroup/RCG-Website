import React, { useState, useEffect } from 'react';
import { Terminal, ShieldAlert, Lock, Cpu, ArrowRight, Loader2, Zap } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const [passkey, setPasskey] = useState('');
  const [status, setStatus] = useState<'idle' | 'checking' | 'error' | 'success'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('checking');
    
    setTimeout(() => {
      // Updated passkey to match v10.12 protocol
      if (passkey.toUpperCase() === 'SYNK-1012-CORE') {
        localStorage.setItem('rcg_auth_token', 'LEVEL_4_AUTHORIZED_' + Date.now());
        setStatus('success');
        setTimeout(() => {
          const destination = (location.state as any)?.from?.pathname || '/command';
          navigate(destination);
        }, 1500);
      } else {
        setStatus('error');
        setErrorMsg('ACCESS_DENIED: INVALID_IDENTITY_SIGNATURE');
        setPasskey('');
        setTimeout(() => setStatus('idle'), 2000);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-royal-950 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px)] [background-size:40px_40px]"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className={`glass border rounded-[2rem] p-12 transition-all duration-700 ${
          status === 'error' ? 'border-red-500 shadow-[0_0_60px_rgba(239,68,68,0.25)]' : 
          status === 'success' ? 'border-emerald-500 shadow-[0_0_60px_rgba(16,185,129,0.25)]' : 
          'border-white/10 shadow-3xl'
        }`}>
          <div className="flex flex-col items-center text-center mb-12">
            <div className={`p-6 rounded-2xl mb-8 border transition-all duration-500 ${
              status === 'error' ? 'bg-red-500/10 text-red-500 border-red-500/40' : 
              status === 'success' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/40' : 
              'bg-neon-purple/10 text-neon-purple border-neon-purple/40'
            }`}>
              {status === 'checking' ? <Loader2 className="w-12 h-12 animate-spin" /> : 
               status === 'error' ? <ShieldAlert className="w-12 h-12" /> :
               status === 'success' ? <Zap className="w-12 h-12 animate-pulse" /> :
               <Lock className="w-12 h-12" />}
            </div>
            <h1 className="text-3xl font-display font-black text-white uppercase tracking-tighter">Command Access</h1>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.5em] mt-4">
              {status === 'checking' ? 'Validating Neural Signature...' : 
               status === 'error' ? errorMsg : 
               status === 'success' ? 'Clearance Granted' : 
               'Identification Protocol Required'}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="relative group">
              <Terminal className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-neon-blue transition-colors" size={20} />
              <input 
                type="password"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                placeholder="INPUT_PASSKEY_COMMAND"
                disabled={status === 'checking' || status === 'success'}
                className="w-full bg-royal-950/80 border border-white/10 rounded-xl py-6 pl-16 pr-8 text-white font-mono text-sm focus:outline-none focus:border-neon-blue transition-all shadow-inner"
              />
            </div>

            <button 
              type="submit"
              disabled={status === 'checking' || status === 'success' || !passkey}
              className="w-full py-6 bg-white text-black font-black text-[12px] tracking-[0.5em] uppercase rounded-xl hover:bg-neon-blue hover:text-white transition-all shadow-2xl flex items-center justify-center gap-4 group active:scale-95 disabled:opacity-30"
            >
              Initialize Sync <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </form>

          <div className="mt-12 flex justify-center gap-3 opacity-20">
             {[1,2,3].map(i => <div key={i} className="w-2 h-2 bg-slate-500 rounded-[2px]"></div>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;