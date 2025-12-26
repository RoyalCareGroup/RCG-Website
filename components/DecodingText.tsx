
import React, { useState, useEffect } from 'react';

interface DecodingTextProps {
  text: string;
  className?: string;
  trigger?: boolean;
  baseDelay?: number; 
  stagger?: number;   
  wrapperClassName?: string;
}

const DecodingChar = ({ char, trigger, delay }: { char: string, trigger: boolean, delay: number }) => {
  const [display, setDisplay] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  
  useEffect(() => {
    if (!trigger) return;

    if (char === ' ') {
        const timeout = setTimeout(() => {
            setDisplay(' ');
            setIsLocked(true);
        }, delay);
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
    <span className={`transition-colors duration-300 inline-block whitespace-pre ${isLocked ? '' : 'text-neon-blue/70 opacity-70'}`}>
      {display || " "}
    </span>
  );
};

export const DecodingText: React.FC<DecodingTextProps> = ({ 
  text, 
  className = "", 
  trigger = true, 
  baseDelay = 0,
  stagger = 30, 
  wrapperClassName = ""
}) => {
  return (
    <span className={wrapperClassName}>
      {text.split('').map((char, index) => (
        <span key={index} className={className}>
          <DecodingChar 
            char={char} 
            trigger={trigger} 
            delay={baseDelay + (index * stagger)} 
          />
        </span>
      ))}
    </span>
  );
};
