
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
      {/* Outer Atmosphere Glow - Muted Obsidian/Navy */}
      <div className={`absolute inset-0 rounded-full transition-all duration-1000 blur-[100px] opacity-30 ${
        isActive ? 'bg-[#1E293B]/40' : isConnecting ? 'bg-[#1E293B] animate-pulse' : 'bg-[#0F172A]'
      }`} />
      
      {/* Dynamic Rings */}
      <div className={`absolute inset-0 border-2 border-neon-gold/5 rounded-full transition-transform duration-1000 ${
        isListening ? 'scale-110 opacity-30' : 'scale-100 opacity-0'
      }`} />
      <div className={`absolute inset-8 border border-white/5 rounded-full transition-transform duration-1000 ${
        isSpeaking ? 'scale-105 opacity-20 animate-ping' : 'scale-100 opacity-0'
      }`} />

      {/* Main Neural Core */}
      <div className={`relative w-32 h-32 sm:w-40 sm:h-40 rounded-full transition-all duration-700 overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.8)] border-[0.5px] ${
        isActive ? 'border-neon-gold/20' : 'border-white/5'
      }`}>
        {/* Core Gradient - Obsidian Mantle */}
        <div className={`absolute inset-0 bg-gradient-to-br transition-colors duration-1000 ${
          isActive ? 'from-[#1E293B] via-black to-black' : 'from-black to-slate-950'
        }`} />

        {/* Sentient Liquid Effect - Monochromatic Navy/Steel */}
        {isActive && (
          <div className="absolute inset-0 flex items-center justify-center">
             <div className={`w-full h-full bg-[#1E293B]/40 blur-3xl animate-blob-drift mix-blend-screen ${isSpeaking ? 'opacity-80' : 'opacity-20'}`} />
             <div className={`absolute w-[90%] h-[90%] bg-slate-400/5 blur-2xl animate-blob-drift delay-1000 mix-blend-screen ${isListening ? 'opacity-60 scale-125' : 'opacity-5'}`} />
          </div>
        )}

        {/* Central Identity Spark - Champagne Gold */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-all duration-700 shadow-[0_0_20px_#E5C78B] ${
          isActive ? 'bg-neon-gold scale-100' : 'bg-slate-800 scale-50 opacity-20'
        }`} />
      </div>

      {/* Reactive Audio Visualizer (Circular Bars) - Gold Accents */}
      {isActive && (
        <div className="absolute inset-[-10px] pointer-events-none opacity-30">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
             {[...Array(16)].map((_, i) => (
               <rect
                 key={i}
                 x="49"
                 y="2"
                 width="2"
                 height={isSpeaking || isListening ? 6 + Math.random() * 10 : 2}
                 rx="1"
                 className={`transition-all duration-300 ${isSpeaking ? 'fill-neon-gold' : 'fill-white/10'}`}
                 transform={`rotate(${i * 22.5} 50 50)`}
               />
             ))}
          </svg>
        </div>
      )}
    </div>
  );
};
