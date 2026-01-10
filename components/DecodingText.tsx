import React, { useState, useEffect } from 'react';

interface DecodingTextProps {
  text: string;
  className?: string;
  trigger?: boolean;
  baseDelay?: number; 
  stagger?: number;   
  wrapperClassName?: string;
  glow?: boolean;
}

const DecodingChar = ({ char, trigger, delay, glow }: { char: string, trigger: boolean, delay: number, glow?: boolean }) => {
  const [display, setDisplay] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  
  useEffect(() => {
    if (!trigger) return;
    if (char === ' ') {
        const timeout = setTimeout(() => { setDisplay(' '); setIsLocked(true); }, delay);
        return () => clearTimeout(timeout);
    }
    const chars = "01XYZ#@&%£$§";
    let iterations = 0;
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplay(chars[Math.floor(Math.random() * chars.length)]);
        iterations++;
        if (iterations > 8) { 
          clearInterval(interval);
          setDisplay(char);
          setIsLocked(true);
        }
      }, 50);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [trigger, char, delay]);

  return (
    <span className={`transition-all duration-500 inline-block whitespace-pre font-black ${
      isLocked 
        ? (glow ? 'text-white animate-neon-hum' : '') 
        : 'text-neon-blue opacity-50'
    }`}>
      {display || " "}
    </span>
  );
};

export const DecodingText: React.FC<DecodingTextProps> = ({ 
  text, 
  className = "font-black", 
  trigger = true, 
  baseDelay = 0,
  stagger = 30, 
  wrapperClassName = "",
  glow = false
}) => {
  const words = text.split(' ');
  let charCumulativeIndex = 0;
  return (
    <span className={`${wrapperClassName} inline-block font-black`}>
      {words.map((word, wordIndex) => {
        const wordChars = word.split('');
        return (
          <span key={wordIndex} className="inline-block whitespace-nowrap font-black">
            {wordChars.map((char, charIndex) => {
              const delay = baseDelay + (charCumulativeIndex * stagger);
              charCumulativeIndex++;
              return (
                <span key={charIndex} className={className}>
                  <DecodingChar char={char} trigger={trigger} delay={delay} glow={glow} />
                </span>
              );
            })}
            {wordIndex < words.length - 1 && (
              <span className={className}>
                <DecodingChar char=" " trigger={trigger} delay={baseDelay + (charCumulativeIndex * stagger)} glow={glow} />
              </span>
            )}
            {(() => { if (wordIndex < words.length - 1) charCumulativeIndex++; return null; })()}
          </span>
        );
      })}
    </span>
  );
};