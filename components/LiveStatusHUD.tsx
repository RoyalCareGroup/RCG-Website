import React, { useState, useEffect } from 'react';
import { Activity, Radio, Cpu, Database, Shield, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const LiveStatusHUD = () => {
  const [telemetry, setTelemetry] = useState({
    latency: '24.12',
    load: '12%',
    integrity: '99.99',
    clearance: 'PUBLIC'
  });

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = !!localStorage.getItem('rcg_auth_token');
      setTelemetry(prev => ({
        ...prev,
        latency: (20 + Math.random() * 10).toFixed(2),
        load: (5 + Math.random() * 15).toFixed(0) + '%',
        integrity: '99.' + (90 + Math.floor(Math.random() * 9)).toString(),
        clearance: isAuth ? 'LEVEL_4' : 'PUBLIC'
      }));
    };
    
    checkAuth();
    const timer = setInterval(checkAuth, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-8 left-8 z-[1001] hidden xl:block animate-fade-in">
      <div className="glass bg-royal-900/80 border border-white/15 p-5 rounded-[12px] flex items-center space-x-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        <div className="flex items-center space-x-4">
          <Activity size={18} className="text-neon-blue" />
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Latency</span>
            <span className="text-[11px] font-mono text-white font-bold">{telemetry.latency}ms</span>
          </div>
        </div>
        <div className="w-px h-8 bg-royal-800"></div>
        <div className="flex items-center space-x-4">
          <Database size={18} className="text-neon-purple" />
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">SYNK Load</span>
            <span className="text-[11px] font-mono text-white font-bold">{telemetry.load}</span>
          </div>
        </div>
        <div className="w-px h-8 bg-royal-800"></div>
        <div className="flex items-center space-x-4">
          <Radio size={18} className="text-neon-green" />
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Integrity</span>
            <span className="text-[11px] font-mono text-white font-bold">{telemetry.integrity}%</span>
          </div>
        </div>
        <div className="w-px h-8 bg-royal-800"></div>
        <Link 
          to={telemetry.clearance === 'LEVEL_4' ? "/command" : "/login"} 
          className="flex items-center space-x-4 hover:opacity-80 transition-opacity group"
        >
          <div className={`p-2 rounded-lg border transition-colors ${telemetry.clearance === 'LEVEL_4' ? 'bg-neon-blue/10 border-neon-blue/40 text-neon-blue' : 'bg-royal-950 border-white/5 text-slate-600 group-hover:text-neon-purple'}`}>
             <Shield size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Clearance</span>
            <span className={`text-[11px] font-mono font-black ${telemetry.clearance === 'LEVEL_4' ? 'text-neon-blue' : 'text-slate-500'}`}>
              {telemetry.clearance}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LiveStatusHUD;