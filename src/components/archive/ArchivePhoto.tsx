import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Camera } from 'lucide-react';

interface ArchivePhotoProps {
  src: string;
  rotation?: number;
  size?: 'sm' | 'md' | 'lg';
  position?: 'left' | 'right' | 'center';
  onClick?: () => void;
  isClickable?: boolean;
}

export const ArchivePhoto: React.FC<ArchivePhotoProps> = ({
  src,
  rotation = 0,
  size = 'md',
  onClick,
  isClickable = false,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Reset states when photo sources change (highly important for spread rendering reuse)
  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

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

  const canClick = isClickable && !hasError;

  return (
    <motion.div
      className={`relative p-3 bg-[#fdfaf2] text-[#24170f] rounded-xs shadow-[0_8px_24px_rgba(0,0,0,0.15)] border border-[#dfd5b2]/60 select-none flex flex-col justify-between focus:outline-hidden focus:ring-2 focus:ring-[#f6c86b] focus:ring-offset-2 ${selectedSizeClass} ${
        canClick ? 'cursor-pointer hover:shadow-[0_12px_32px_rgba(0,0,0,0.25)]' : ''
      }`}
      style={{ rotate: `${rotation}deg` }}
      onClick={() => {
        if (canClick && onClick) {
          onClick();
        }
      }}
      tabIndex={canClick ? 0 : undefined}
      role={canClick ? 'button' : undefined}
      onKeyDown={(e) => {
        if (canClick && onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      whileHover={canClick ? { 
        scale: 1.04, 
        rotate: rotation + (rotation >= 0 ? 1 : -1),
      } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Visual Tape at the top of the photo to make it look pasted */}
      <div 
        className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 ${tapeColor} -rotate-6 shadow-[0_2px_4px_rgba(0,0,0,0.05)] z-20`}
        style={{ clipPath: 'polygon(0% 15%, 15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%)' }}
      />

      <div className="relative aspect-square w-full bg-[#1e130b] overflow-hidden rounded-xs border border-stone-200 shadow-inner flex items-center justify-center">
        {hasError ? (
          <div className="absolute inset-0 p-4 bg-gradient-to-br from-[#1a110a] to-[#2a1b10] flex flex-col items-center justify-center text-center select-none z-10">
            <div className="p-3 bg-white/5 rounded-full mb-3 border border-white/10 text-[#ebb340]">
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
          <>
            {/* Warm pixelated/cozy photography loading skeleton */}
            {!isLoaded && (
              <div className="absolute inset-0 bg-stone-900 flex flex-col items-center justify-center animate-pulse z-10">
                <div className="w-10 h-10 rounded-full bg-[#dfd5b2]/10 border border-[#dfd5b2]/20 flex items-center justify-center text-[#dfd5b2]/40">
                  <Camera className="w-5 h-5 animate-bounce" />
                </div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#dfd5b2]/40 mt-2">
                  Проявка...
                </span>
              </div>
            )}

            <img
              src={src}
              alt="Воспоминание"
              loading="lazy"
              decoding="async"
              draggable={false}
              onLoad={() => setIsLoaded(true)}
              onError={() => {
                setHasError(true);
                setIsLoaded(false);
              }}
              className={`w-full h-full object-cover grayscale-15 hover:grayscale-0 transition-opacity duration-500 ease-in-out ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              referrerPolicy="no-referrer"
            />
          </>
        )}
      </div>
    </motion.div>
  );
};
