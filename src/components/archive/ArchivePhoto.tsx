import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, EyeOff } from 'lucide-react';

interface ArchivePhotoProps {
  src: string;
  rotation?: number;
  size?: 'sm' | 'md' | 'lg';
  position?: 'left' | 'right' | 'center';
}

export const ArchivePhoto: React.FC<ArchivePhotoProps> = ({
  src,
  rotation = 0,
  size = 'md',
}) => {
  const [hasError, setHasError] = useState(false);

  // Size mapping
  const sizeClasses = {
    sm: 'w-36 lg:w-44',
    md: 'w-44 lg:w-52',
    lg: 'w-52 lg:w-60',
  };

  const selectedSizeClass = sizeClasses[size];

  // Tape color accents for retro decoration
  const tapeColors = [
    'bg-[#fdf6e2]/40 border-l border-r border-[#dfd5b2]/40',
    'bg-[#ffb3c7]/20 border-l border-r border-[#ffa4be]/30',
    'bg-[#ffdca0]/30 border-l border-r border-[#f6c86b]/40',
  ];
  const tapeColor = tapeColors[Math.abs(rotation) % tapeColors.length];

  return (
    <motion.div
      className={`relative p-3 bg-[#fdfaf2] text-[#24170f] rounded-xs shadow-[0_8px_24px_rgba(0,0,0,0.15)] border border-[#dfd5b2]/60 select-none flex flex-col justify-between ${selectedSizeClass}`}
      style={{ rotate: `${rotation}deg` }}
      whileHover={{ 
        scale: 1.03, 
        rotate: rotation + (rotation >= 0 ? 1 : -1),
        shadow: '0_12px_32px_rgba(0,0,0,0.2)' 
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Visual Tape at the top of the photo to make it look pasted */}
      <div 
        className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 ${tapeColor} -rotate-6 shadow-[0_2px_4px_rgba(0,0,0,0.05)] z-20`}
        style={{ clipPath: 'polygon(0% 15%, 15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%)' }}
      />

      <div className="relative aspect-square w-full bg-[#1e130b] overflow-hidden rounded-xs border border-stone-200 shadow-inner flex items-center justify-center">
        {hasError ? (
          <div className="absolute inset-0 p-4 bg-gradient-to-br from-[#1a110a] to-[#2a1b10] flex flex-col items-center justify-center text-center select-none">
            <div className="p-3 bg-white/5 rounded-full mb-3 border border-white/10 animate-pulse text-[#ebb340]">
              <Camera className="w-6 h-6" />
            </div>
            <span className="font-mono text-[10px] sm:text-xs text-[#ffdca0] font-semibold tracking-wide block uppercase">
              Кадр сохранён
            </span>
            <span className="font-sans text-[10px] md:text-[11px] text-[#c8aa83] block max-w-[150px] mt-1 italic">
              Фото скоро будет добавлено
            </span>
          </div>
        ) : (
          <img
            src={src}
            alt="Воспоминание"
            onError={() => setHasError(true)}
            className="w-full h-full object-cover grayscale-15 hover:grayscale-0 transition-all duration-300"
            referrerPolicy="no-referrer"
          />
        )}
      </div>
    </motion.div>
  );
};
