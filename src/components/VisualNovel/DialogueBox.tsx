import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface DialogueBoxProps {
  speaker?: string;
  text: string;
  onNext: () => void;
}

// Deterministic font size helper based on character count and mobile threshold
const getFontSizeStyle = (length: number, isMobileMode: boolean): React.CSSProperties => {
  if (isMobileMode) {
    if (length <= 90) return { fontSize: '16px', lineHeight: '1.45' };
    if (length <= 160) return { fontSize: '15px', lineHeight: '1.45' };
    if (length <= 240) return { fontSize: '14px', lineHeight: '1.45' };
    return { fontSize: '13px', lineHeight: '1.45' };
  } else {
    if (length <= 90) return { fontSize: '18px', lineHeight: '1.5' };
    if (length <= 160) return { fontSize: '17px', lineHeight: '1.5' };
    if (length <= 240) return { fontSize: '16px', lineHeight: '1.5' };
    return { fontSize: '15px', lineHeight: '1.5' };
  }
};

export const DialogueBox: React.FC<DialogueBoxProps> = ({ speaker, text, onNext }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const fullTextRef = useRef(text);

  // Monitor screen width to safely adjust font size in real time
  useEffect(() => {
    const media = window.matchMedia('(max-width: 640px)');
    setIsMobile(media.matches);
    const listener = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    media.addEventListener('change', listener);
    return () => {
      media.removeEventListener('change', listener);
    };
  }, []);

  // Sync ref to ensure typewriter action is always bound to current text
  useEffect(() => {
    fullTextRef.current = text;
    setDisplayedText('');
    setIsTyping(true);

    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
    }

    let currentIndex = 0;
    typingTimerRef.current = setInterval(() => {
      currentIndex++;
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
      } else {
        setIsTyping(false);
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      }
    }, 20); // 20ms per character for brisk typing

    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, [text]);

  const handleBoxClick = () => {
    if (isTyping) {
      // Skip typing and show full text immediately
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      setDisplayedText(fullTextRef.current);
      setIsTyping(false);
    } else {
      onNext();
    }
  };

  // Bind Enter and Space keys for full immersive visual novel experience
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault(); // Stop page scrolling
        handleBoxClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isTyping, text]);

  // Determine speaker theme color (Влад has friendly rose-gold, Мама has warm amber, others are neutrally cozy)
  const getSpeakerStyles = (name: string) => {
    switch (name.toLowerCase()) {
      case 'влад':
        return 'bg-[#ffb3c7] text-[#17100c] border-[#ffdca0]/30';
      case 'мама':
        return 'bg-[#f6c86b] text-[#17100c] border-[#ffdca0]/30';
      case 'светлана':
        return 'bg-[#ffeedc]/25 text-[#fff3d6] border-[#ffb3c7]/30';
      default:
        return 'bg-[#ffeedc]/15 text-[#fff3d6] border-[#ffdca0]/20';
    }
  };

  return (
    <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 z-30 select-none">
      <div 
        id="dialogue-box-container"
        onClick={handleBoxClick}
        className="relative mx-auto max-w-4xl w-full h-40 md:h-44 bg-[#1a110a]/95 hover:bg-[#24170f]/95 border-2 border-[#ffdca0]/25 rounded-2xl p-4 md:p-6 flex flex-col justify-between cursor-pointer retro-shadow select-none transition-colors duration-200"
      >
        {/* Border outline details for cozy retro style */}
        <div className="absolute inset-0.5 border border-[#ffdca0]/10 rounded-xl pointer-events-none opacity-40" />

        {/* Speaker Name Tag (Renders ONLY if a speaker is specified) */}
        {speaker && (
          <div className="absolute -top-4 left-6 flex">
            <div className={`px-4 py-1.5 rounded-lg border border-[#ffdca0]/25 text-[10px] sm:text-xs font-press-start select-none ${getSpeakerStyles(speaker)}`}>
              {speaker}
            </div>
          </div>
        )}

        {/* Dialogue main text */}
        <div 
          className="flex-1 overflow-hidden mt-1 md:mt-2 select-none font-mono text-[#fff3d6]"
          style={getFontSizeStyle(text.length, isMobile)}
        >
          {displayedText}
          {/* Micro cursor blinking effect when writing is done */}
          {!isTyping && <span className="inline-block w-2.5 h-4 ml-1 bg-[#f6c86b] animate-blink" />}
        </div>

        {/* Down indicator / Next guide arrow */}
        <div className="flex justify-end items-center mt-2">
          {!isTyping ? (
            <motion.div 
              className="flex items-center text-xs font-press-start text-[#ffb3c7] animate-pulse"
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
            >
              <span className="hidden sm:inline mr-1 text-[9px] text-[#c8aa83]">Клик / Пробел</span>
              <ChevronRight className="w-3.5 h-3.5 fill-current stroke-[3]" />
            </motion.div>
          ) : (
            <span className="text-[10px] text-[#c8aa83]/60 font-mono italic">печатает...</span>
          )}
        </div>
      </div>
    </div>
  );
};
