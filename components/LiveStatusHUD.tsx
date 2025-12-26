
import React, { useState, useEffect } from 'react';
import { Activity, Radio, Cpu, Database, Shield } from 'lucide-react';

const LiveStatusHUD = () => {
  const [telemetry, setTelemetry] = useState({
    latency: '24.12',
    load: '12%',
    integrity: '99.99',
    security: 'ENCRYPTED'
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetry({
        latency: (20 + Math.random() * 10).toFixed(2),
        load: (5 + Math.random() * 15).toFixed(0) + '%',
        integrity: '99.' + (90 + Math.floor(Math.random() * 9)).toString(),
        security: Math.random() > 0.1 ? 'ENCRYPTED' : 'SCANNING'
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-[1001] hidden xl:block animate-fade-in">
      <div className="glass border border-royal-800 p-4 rounded-2xl flex items-center space-x-8 shadow-2xl">
        <div className="flex items-center space-x-3">
          <Activity size={16} className="text-neon-blue" />
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Latency</span>
            <span className="text-[10px] font-mono text-white">{telemetry.latency}ms</span>
          </div>
        </div>
        <div className="w-px h-6 bg-royal-800"></div>
        <div className="flex items-center space-x-3">
          <Database size={16} className="text-neon-purple" />
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">SYNK Load</span>
            <span className="text-[10px] font-mono text-white">{telemetry.load}</span>
          </div>
        </div>
        <div className="w-px h-6 bg-royal-800"></div>
        <div className="flex items-center space-x-3">
          <Radio size={16} className="text-neon-green" />
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Integrity</span>
            <span className="text-[10px] font-mono text-white">{telemetry.integrity}%</span>
          </div>
        </div>
        <div className="w-px h-6 bg-royal-800"></div>
        <div className="flex items-center space-x-3">
          <Shield size={16} className={telemetry.security === 'ENCRYPTED' ? 'text-neon-blue' : 'text-amber-500'} />
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Security</span>
            <span className={`text-[10px] font-mono ${telemetry.security === 'ENCRYPTED' ? 'text-white' : 'text-amber-500'}`}>
              {telemetry.security}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveStatusHUD;
