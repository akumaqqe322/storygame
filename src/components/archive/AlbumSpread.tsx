import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArchiveSpread, ArchiveItem } from '../../data/archive';
import { ArchivePhoto } from './ArchivePhoto';
import { ArchiveNote } from './ArchiveNote';

interface AlbumSpreadProps {
  spread: ArchiveSpread;
  direction: number; // -1 for prev page, 1 for next page
}

export const AlbumSpread: React.FC<AlbumSpreadProps> = ({ spread, direction }) => {
  const { title, subtitle, items } = spread;

  // Filter items based on positions to support Left & Right book pages
  const leftPageItems = items.filter(
    (item) => item.position === 'left' || (item.position === 'center' && items.indexOf(item) % 2 === 0)
  );
  
  const rightPageItems = items.filter(
    (item) => item.position === 'right' || (item.position === 'center' && items.indexOf(item) % 2 !== 0)
  );

  // Fallback in case items are empty or need balancing
  const finalLeftItems = leftPageItems.length > 0 ? leftPageItems : items.slice(0, Math.ceil(items.length / 2));
  const finalRightItems = rightPageItems.length > 0 ? rightPageItems : items.slice(Math.ceil(items.length / 2));

  // Render individual album items based on types
  const renderItem = (item: ArchiveItem, idx: number) => {
    switch (item.type) {
      case 'photo':
        return (
          <ArchivePhoto
            key={`photo-${idx}`}
            src={item.src}
            rotation={item.rotation}
            size={item.size}
            position={item.position}
          />
        );
      case 'note':
        return (
          <ArchiveNote
            key={`note-${idx}`}
            title={item.title}
            text={item.text}
            type="note"
            rotation={item.rotation}
          />
        );
      case 'memory':
        return (
          <ArchiveNote
            key={`memory-${idx}`}
            title={item.title}
            text={item.text}
            type="memory"
            rotation={item.rotation}
          />
        );
      default:
        return null;
    }
  };

  // Slider animation parameters for cozy page turning effect
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.98,
      rotateY: dir > 0 ? 12 : -12,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.5,
        type: 'spring',
        stiffness: 180,
        damping: 22,
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.98,
      rotateY: dir < 0 ? -12 : 12,
      transition: {
        duration: 0.45,
      },
    }),
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Dynamic Slide Container with AnimatePresence */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={spread.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="w-full relative flex flex-col items-center"
          style={{ perspective: 1200 }}
        >
          {/* Header over the book pages */}
          <div className="text-center mb-5 select-none shrink-0 z-10">
            <h3 className="font-press-start text-[14px] sm:text-[16px] text-[#ffdca0] uppercase tracking-wider text-shadow-md">
              {title}
            </h3>
            {subtitle && (
              <p className="font-mono text-xs text-[#c8aa83] mt-1 italic tracking-wide">
                — {subtitle} —
              </p>
            )}
          </div>

          {/* Opened Book Grand Arena */}
          {/* Desktop/Tablet Double Page Mode */}
          <div 
            id="book-main-arena"
            className="hidden md:flex w-full aspect-[16/9.5] max-w-[1300px] border-4 border-[#352014]/40 bg-[#23150d] rounded-2xl relative shadow-[0_24px_50px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* Opened Book High-Quality Background Layer */}
            <div 
              className="absolute inset-0 bg-cover bg-center select-none opacity-90 pointer-events-none"
              style={{ 
                backgroundImage: 'url("/assets/archive/archive-opened-book.jpg")',
                mixBlendMode: 'normal' 
              }}
            />
            {/* Left and Right ambient book shadows */}
            <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/45 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/45 to-transparent pointer-events-none z-10" />
            
            {/* Center Book Spine Page Fold Cover Overlay shadow */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-16 bg-gradient-to-r from-black/5 via-black/28 to-black/5 border-l border-r border-black/15 pointer-events-none z-10" />

            {/* Book Pages Container Split */}
            <div className="absolute inset-0 flex">
              {/* LEFT PAGE */}
              <div className="w-1/2 h-full p-8 lg:p-12 pr-12 lg:pr-14 flex flex-col items-center justify-center gap-6 z-10 overflow-hidden">
                <div className="flex flex-wrap items-center justify-center gap-6 w-full max-h-full">
                  {finalLeftItems.map((item, idx) => renderItem(item, idx))}
                </div>
              </div>

              {/* RIGHT PAGE */}
              <div className="w-1/2 h-full p-8 lg:p-12 pl-12 lg:pl-14 flex flex-col items-center justify-center gap-6 z-10 overflow-hidden">
                <div className="flex flex-wrap items-center justify-center gap-6 w-full max-h-full">
                  {finalRightItems.map((item, idx) => renderItem(item, idx + 10))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Single Stacked Column Mode */}
          <div className="md:hidden w-full space-y-6 px-4 py-6 border border-[#ffdca0]/10 bg-[#24170f]/95 rounded-xl retro-shadow relative overflow-hidden">
            {/* Mini spine/wood-grain line to keep consistency */}
            <div className="absolute inset-y-0 left-0 w-1 bg-[#ffdca0]/20 pointer-events-none" />
            
            {/* Mobile Stacked Items Grid */}
            <div className="flex flex-col items-center gap-6 z-10">
              {items.map((item, idx) => (
                <div key={`mobile-item-${idx}`} className="transform scale-[0.93] sm:scale-100 flex justify-center w-full">
                  {renderItem(item, idx)}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
