
import React from 'react';

interface AetherOrbProps {
  isActive: boolean;
  isConnecting: boolean;
  isSpeaking: boolean;
  isListening: boolean;
}

export const AetherOrb: React.FC<AetherOrbProps> = ({ isActive, isConnecting, isSpeaking, isListening }) => {
  return (
    <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
      {/* Outer Atmosphere Glow */}
      <div className={`absolute inset-0 rounded-full transition-all duration-1000 blur-[60px] opacity-40 ${
        isActive ? 'bg-neon-purple' : isConnecting ? 'bg-neon-blue animate-pulse' : 'bg-slate-800'
      }`} />
      
      {/* Dynamic Rings */}
      <div className={`absolute inset-0 border-2 border-neon-blue/20 rounded-full transition-transform duration-700 ${
        isListening ? 'scale-110 opacity-60' : 'scale-100 opacity-20'
      }`} />
      <div className={`absolute inset-4 border border-neon-purple/20 rounded-full transition-transform duration-1000 ${
        isSpeaking ? 'scale-105 opacity-60 animate-ping' : 'scale-100 opacity-20'
      }`} />

      {/* Main Neural Core */}
      <div className={`relative w-32 h-32 sm:w-40 sm:h-40 rounded-full transition-all duration-700 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border-[0.5px] ${
        isActive ? 'border-white/20' : 'border-white/5'
      }`}>
        {/* Core Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br transition-colors duration-1000 ${
          isActive ? 'from-royal-950 via-neon-purple/20 to-royal-900' : 'from-black to-slate-900'
        }`} />

        {/* Sentient Liquid Effect (CSS Animation) */}
        {isActive && (
          <div className="absolute inset-0 flex items-center justify-center">
             <div className={`w-full h-full bg-neon-blue/10 blur-xl animate-blob-drift mix-blend-screen ${isSpeaking ? 'opacity-80' : 'opacity-30'}`} />
             <div className={`absolute w-[80%] h-[80%] bg-neon-purple/10 blur-2xl animate-blob-drift delay-700 mix-blend-screen ${isListening ? 'opacity-80 scale-125' : 'opacity-30'}`} />
          </div>
        )}

        {/* Central Identity Spark */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-500 shadow-[0_0_20px_#fff] ${
          isActive ? 'bg-white scale-100' : 'bg-slate-700 scale-50 opacity-20'
        }`} />
      </div>

      {/* Reactive Audio Visualizer (Circular Bars) */}
      {isActive && (
        <div className="absolute inset-[-20px] pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
             {[...Array(12)].map((_, i) => (
               <rect
                 key={i}
                 x="48"
                 y="0"
                 width="4"
                 height={isSpeaking || isListening ? 10 + Math.random() * 20 : 5}
                 rx="2"
                 className={`transition-all duration-300 ${isSpeaking ? 'fill-neon-purple' : 'fill-neon-blue/40'}`}
                 transform={`rotate(${i * 30} 50 50)`}
               />
             ))}
          </svg>
        </div>
      )}
    </div>
  );
};
