
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
        latency: (20 + Math.random() * 8).toFixed(2),
        load: (5 + Math.random() * 10).toFixed(0) + '%',
        integrity: '99.' + (90 + Math.floor(Math.random() * 9)).toString(),
        clearance: isAuth ? 'LEVEL_4' : 'PUBLIC'
      }));
    };
    checkAuth();
    const timer = setInterval(checkAuth, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-[1001] hidden xl:block animate-fade-in font-sans font-black">
      <div className="bg-[#0F172A]/90 backdrop-blur-md border border-neon-gold/10 p-4 rounded-xl flex items-center space-x-10 shadow-[0_40px_100px_rgba(0,0,0,1)]">
        <div className="flex items-center space-x-3">
          <Activity size={14} className="text-neon-gold opacity-50" />
          <div className="flex flex-col">
            <span className="text-[7px] text-slate-600 uppercase tracking-widest leading-none mb-1">Latency</span>
            <span className="text-[10px] text-white tracking-tight">{telemetry.latency}ms</span>
          </div>
        </div>
        <div className="w-[1px] h-4 bg-white/5"></div>
        <div className="flex items-center space-x-3">
          <Database size={14} className="text-neon-gold opacity-50" />
          <div className="flex flex-col">
            <span className="text-[7px] text-slate-600 uppercase tracking-widest leading-none mb-1">Core Load</span>
            <span className="text-[10px] text-white tracking-tight">{telemetry.load}</span>
          </div>
        </div>
        <div className="w-[1px] h-4 bg-white/5"></div>
        <div className="flex items-center space-x-3">
          <Radio size={14} className="text-neon-gold opacity-50" />
          <div className="flex flex-col">
            <span className="text-[7px] text-slate-600 uppercase tracking-widest leading-none mb-1">Integrity</span>
            <span className="text-[10px] text-white tracking-tight">{telemetry.integrity}%</span>
          </div>
        </div>
        <div className="w-[1px] h-4 bg-white/5"></div>
        <Link 
          to={telemetry.clearance === 'LEVEL_4' ? "/command" : "/login"} 
          className="flex items-center space-x-3 hover:opacity-80 transition-opacity group"
        >
          <Shield size={14} className={`transition-all ${telemetry.clearance === 'LEVEL_4' ? 'text-neon-gold drop-shadow-[0_0_8px_#E5C78B]' : 'text-slate-600'}`} />
          <div className="flex flex-col">
            <span className="text-[7px] text-slate-600 uppercase tracking-widest leading-none mb-1">Clearance</span>
            <span className={`text-[10px] font-black transition-colors ${telemetry.clearance === 'LEVEL_4' ? 'text-neon-gold' : 'text-slate-500'}`}>
              {telemetry.clearance}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default LiveStatusHUD;
