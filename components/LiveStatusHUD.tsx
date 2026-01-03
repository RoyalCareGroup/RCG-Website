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
    <div className="fixed bottom-6 left-6 z-[1001] hidden xl:block animate-fade-in font-sans font-black">
      <div className="bg-black/80 backdrop-blur-md border-[0.5px] border-white/10 p-4 rounded-xl flex items-center space-x-8 shadow-2xl">
        <div className="flex items-center space-x-3">
          <Activity size={16} className="text-neon-blue" />
          <div className="flex flex-col">
            <span className="text-[8px] text-slate-500 uppercase tracking-widest leading-none mb-1">Latency</span>
            <span className="text-[11px] text-white tracking-tight">{telemetry.latency}ms</span>
          </div>
        </div>
        <div className="w-[0.5px] h-6 bg-royal-800"></div>
        <div className="flex items-center space-x-3">
          <Database size={16} className="text-neon-purple" />
          <div className="flex flex-col">
            <span className="text-[8px] text-slate-500 uppercase tracking-widest leading-none mb-1">SYNK Load</span>
            <span className="text-[11px] text-white tracking-tight">{telemetry.load}</span>
          </div>
        </div>
        <div className="w-[0.5px] h-6 bg-royal-800"></div>
        <div className="flex items-center space-x-3">
          <Radio size={16} className="text-neon-green" />
          <div className="flex flex-col">
            <span className="text-[8px] text-slate-500 uppercase tracking-widest leading-none mb-1">Integrity</span>
            <span className="text-[11px] text-white tracking-tight">{telemetry.integrity}%</span>
          </div>
        </div>
        <div className="w-[0.5px] h-6 bg-royal-800"></div>
        <Link 
          to={telemetry.clearance === 'LEVEL_4' ? "/command" : "/login"} 
          className="flex items-center space-x-3 hover:opacity-80 transition-opacity group"
        >
          <div className={`p-1.5 rounded-lg border-[0.5px] transition-colors ${telemetry.clearance === 'LEVEL_4' ? 'bg-neon-blue/10 border-neon-blue/30 text-neon-blue' : 'bg-royal-950 border-white/10 text-slate-600'}`}>
             <Shield size={16} />
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] text-slate-500 uppercase tracking-widest leading-none mb-1">Clearance</span>
            <span className={`text-[11px] font-black ${telemetry.clearance === 'LEVEL_4' ? 'text-neon-blue' : 'text-slate-500'}`}>
              {telemetry.clearance}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default LiveStatusHUD;