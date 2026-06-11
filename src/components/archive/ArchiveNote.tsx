import React from 'react';
import { motion } from 'motion/react';
import { Scroll, Quote, Calendar } from 'lucide-react';

interface ArchiveNoteProps {
  title?: string;
  text: string;
  type: 'note' | 'memory';
  rotation?: number;
}

export const ArchiveNote: React.FC<ArchiveNoteProps> = ({
  title,
  text,
  type,
  rotation = 0,
}) => {
  const isMemory = type === 'memory';

  // Paper backing styles matching the selected card types
  const paperStyle = isMemory
    ? 'bg-gradient-to-br from-[#fffdf5] to-[#f9f4e2] text-[#2c1d11] border-[#dfd5b2] shadow-[2px_10px_20px_rgba(0,0,0,0.12)] border-2 rounded-xs'
    : 'bg-[#fff5f5] text-[#3c1e26] border-[#ffa4be]/30 shadow-[3px_8px_18px_rgba(0,0,0,0.1)] border rounded-sm';

  return (
    <motion.div
      className={`relative p-4 md:p-5 max-w-[16rem] lg:max-w-[19rem] w-full font-mono flex flex-col justify-between tracking-wide select-none ${paperStyle}`}
      style={{ rotate: `${rotation}deg` }}
      whileHover={{ 
        scale: 1.025, 
        rotate: rotation + (rotation >= 0 ? 0.5 : -0.5),
        shadow: '0_10px_25px_rgba(0,0,0,0.18)' 
      }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      {/* Decorative metal pin or circular button pin at the top */}
      <div className="absolute -top-2 left-6 w-3 h-3 rounded-full bg-amber-600/60 border border-amber-900/40 shadow-inner z-10" />
      
      <div>
        <div className="flex items-center gap-1.5 mb-2.5 text-stone-600/70">
          {isMemory ? (
            <Scroll className="w-3.5 h-3.5 text-amber-700/80" />
          ) : (
            <Quote className="w-3.5 h-3.5 text-[#ff7fa2]/80" />
          )}
          <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-[#2c1d11]/50">
            {isMemory ? 'ВОСПОМИНАНИЕ' : 'ЗАМЕТКА'}
          </span>
        </div>

        {title && (
          <h3 className="font-sans font-bold text-sm md:text-base mb-2 select-text tracking-tight text-shadow-xs">
            {title}
          </h3>
        )}

        <p className="text-[11.5px] md:text-[13px] leading-relaxed select-text font-serif italic text-stone-800">
          {text}
        </p>
      </div>

      <div className="mt-4 pt-2 border-t border-stone-300/40 flex items-center justify-between text-[10px] sm:text-xs text-stone-600/60 font-mono scale-95 origin-left">
        <span className="tracking-wider flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          Влад • 2026
        </span>
        <span className="italic block select-none">Архив воспоминаний</span>
      </div>
    </motion.div>
  );
};
