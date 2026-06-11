import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

interface PhotoLightboxProps {
  src: string;
  currentIndex: number;
  totalCount: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  src,
  currentIndex,
  totalCount,
  onClose,
  onNext,
  onPrev,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Keyboard navigation & scroll containment
  useEffect(() => {
    // Disable body scroll when open
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onNext();
      } else if (e.key === 'ArrowLeft') {
        onPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onNext, onPrev]);

  // Reset loading whenever src changes
  useEffect(() => {
    setImageLoaded(false);
  }, [src]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col justify-between p-4 bg-black/85 backdrop-blur-md select-none"
        onClick={onClose}
      >
        {/* Header HUD */}
        <div 
          className="w-full flex justify-between items-center z-10 p-3 bg-gradient-to-b from-black/50 to-transparent"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="font-mono text-xs sm:text-sm text-[#ffdca0] font-bold tracking-widest bg-stone-900/60 border border-[#dfd5b2]/10 px-3 py-1.5 rounded-md">
            ФОТО {currentIndex + 1} / {totalCount}
          </div>

          <button
            onClick={onClose}
            aria-label="Закрыть просмотр"
            className="p-2 mr-1 sm:mr-4 rounded-full bg-stone-900/65 border border-[#dfd5b2]/30 text-[#ffdca0] hover:bg-[#f6c86b] hover:text-[#24170f] hover:border-[#f6c86b] transition-all flex items-center justify-center cursor-pointer shadow-lg active:scale-95"
          >
            <X className="w-5 h-5 sm:w-6 h-6 stroke-[2]" />
          </button>
        </div>

        {/* Mid-stage Content (Image & Nav Arrows) */}
        <div className="flex-grow flex items-center justify-center relative w-full h-[70vh]">
          {/* Previous Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Предыдущее фото"
            className="absolute left-2 sm:left-6 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-stone-950/75 border border-[#dfd5b2]/20 flex items-center justify-center text-[#ffdca0] hover:bg-[#f6c86b] hover:text-[#24170f] hover:border-[#f6c86b] hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2]" />
          </button>

          {/* Centered Image Container */}
          <div 
            className="relative max-w-[92vw] max-h-[80vh] bg-stone-950 rounded-lg p-2.5 sm:p-4 border-2 border-[#dfd5b2]/40 shadow-[0_0_40px_rgba(246,200,107,0.18)] flex items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Inner frame outline for a cozy retro-classic feeling */}
            <div className="absolute inset-2 border border-[#dfd5b2]/10 rounded pointer-events-none z-10" />

            {!imageLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-950 z-20">
                <Loader2 className="w-8 h-8 text-[#f6c86b] animate-spin mb-2" />
                <span className="font-mono text-[10px] text-[#c8aa83] uppercase tracking-wider">
                  Загрузка кадра...
                </span>
              </div>
            )}

            <motion.img
              key={src}
              src={src}
              alt="Фото из архива"
              draggble={false}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)} // Prevent infinite loading if fails
              className={`max-w-full max-h-[76vh] object-contain rounded-sm select-none transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>

          {/* Next Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Следующее фото"
            className="absolute right-2 sm:right-6 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-stone-950/75 border border-[#dfd5b2]/20 flex items-center justify-center text-[#ffdca0] hover:bg-[#f6c86b] hover:text-[#24170f] hover:border-[#f6c86b] hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2]" />
          </button>
        </div>

        {/* Footer info decoration */}
        <div 
          className="w-full text-center pb-3 pt-2 text-[10px] font-mono text-[#c8aa83]/65 select-none pointer-events-none"
          onClick={(e) => e.stopPropagation()}
        >
          ИСПОЛЬЗУЙТЕ ← СТРЕЛКИ КЛАВИАТУРЫ ИЛИ ESC ДЛЯ НАВИГАЦИИ
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
