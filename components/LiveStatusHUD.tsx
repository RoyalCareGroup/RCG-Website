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
    <div className="fixed bottom-10 left-10 z-[1001] hidden xl:block animate-fade-in font-sans font-black">
      <div className="glass bg-black/90 border-2 border-white/10 p-6 rounded-2xl flex items-center space-x-12 shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
        <div className="flex items-center space-x-5">
          <Activity size={22} className="text-neon-blue" />
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest leading-none mb-1.5">Latency</span>
            <span className="text-[13px] text-white tracking-tight">{telemetry.latency}ms</span>
          </div>
        </div>
        <div className="w-[1.5px] h-10 bg-royal-800"></div>
        <div className="flex items-center space-x-5">
          <Database size={22} className="text-neon-purple" />
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest leading-none mb-1.5">SYNK Load</span>
            <span className="text-[13px] text-white tracking-tight">{telemetry.load}</span>
          </div>
        </div>
        <div className="w-[1.5px] h-10 bg-royal-800"></div>
        <div className="flex items-center space-x-5">
          <Radio size={22} className="text-neon-green" />
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest leading-none mb-1.5">Integrity</span>
            <span className="text-[13px] text-white tracking-tight">{telemetry.integrity}%</span>
          </div>
        </div>
        <div className="w-[1.5px] h-10 bg-royal-800"></div>
        <Link 
          to={telemetry.clearance === 'LEVEL_4' ? "/command" : "/login"} 
          className="flex items-center space-x-5 hover:opacity-80 transition-opacity group"
        >
          <div className={`p-2.5 rounded-xl border-2 transition-colors ${telemetry.clearance === 'LEVEL_4' ? 'bg-neon-blue/15 border-neon-blue/40 text-neon-blue shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'bg-royal-950 border-white/10 text-slate-600 group-hover:text-neon-purple'}`}>
             <Shield size={22} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest leading-none mb-1.5">Clearance</span>
            <span className={`text-[13px] font-black ${telemetry.clearance === 'LEVEL_4' ? 'text-neon-blue' : 'text-slate-500'}`}>
              {telemetry.clearance}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default LiveStatusHUD;