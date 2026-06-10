import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface DialogueBoxProps {
  speaker?: string;
  text: string;
  onNext: () => void;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({ speaker, text, onNext }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const fullTextRef = useRef(text);

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

  // Determine speaker theme color (Влад has friendly sky blue, Мама has warm rose, others are neutrally cozy)
  const getSpeakerStyles = (name: string) => {
    switch (name.toLowerCase()) {
      case 'влад':
        return 'bg-sky-500 text-white border-sky-300';
      case 'мама':
        return 'bg-rose-500 text-white border-rose-300';
      case 'светлана':
        return 'bg-emerald-500 text-white border-emerald-300';
      case 'вы':
        return 'bg-fuchsia-500 text-white border-fuchsia-300';
      default:
        return 'bg-amber-600 text-white border-amber-400';
    }
  };

  return (
    <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 z-30 select-none">
      <div 
        id="dialogue-box-container"
        onClick={handleBoxClick}
        className="relative mx-auto max-w-4xl w-full h-40 md:h-44 bg-slate-950/85 hover:bg-slate-950/90 border-4 border-pink-200/90 rounded-2xl p-4 md:p-6 flex flex-col justify-between cursor-pointer retro-shadow select-text transition-colors duration-200"
      >
        {/* Double Border/Nook design for retro styling */}
        <div className="absolute inset-1 border-2 border-black rounded-lg pointer-events-none opacity-50" />

        {/* Speaker Name Tag (Renders ONLY if a speaker is specified) */}
        {speaker && (
          <div className="absolute -top-5 left-6 flex">
            <div className={`px-4 py-1.5 rounded-lg border-2 border-black text-xs md:text-sm font-press-start retro-shadow-sm select-none ${getSpeakerStyles(speaker)}`}>
              {speaker}
            </div>
          </div>
        )}

        {/* Dialogue main text */}
        <div className="flex-1 overflow-y-auto mt-2 select-text font-mono text-sm md:text-base leading-relaxed text-pink-50 text-shadow-sm pr-4">
          {displayedText}
          {/* Micro cursor blinking effect when writing is done */}
          {!isTyping && <span className="inline-block w-2.5 h-4 ml-1 bg-pink-300 animate-blink" />}
        </div>

        {/* Down indicator / Next guide arrow */}
        <div className="flex justify-end items-center mt-2">
          {!isTyping ? (
            <motion.div 
              className="flex items-center text-xs md:text-sm font-press-start text-pink-300 animate-pulse"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
            >
              <span className="hidden sm:inline mr-1 text-[10px]">Клик / Space</span>
              <ChevronRight className="w-4 h-4 fill-current stroke-[3]" />
            </motion.div>
          ) : (
            <span className="text-[10px] text-pink-400 font-mono italic">печатает...</span>
          )}
        </div>
      </div>
    </div>
  );
};
