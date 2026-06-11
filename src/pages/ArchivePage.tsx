import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, BookOpen, HardDrive, ArrowUpLeft, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { archiveSpreads } from '../data/archive';
import { AlbumCover } from '../components/archive/AlbumCover';
import { AlbumSpread } from '../components/archive/AlbumSpread';

export const ArchivePage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);

  // Keyboard navigation for active album
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentPage]);

  const handleNext = () => {
    if (currentPage < archiveSpreads.length - 1) {
      setSlideDirection(1);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setSlideDirection(-1);
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setIsOpen(false);
    setCurrentPage(0);
  };

  return (
    <div className="min-h-screen w-full bg-[#1a0f0a] text-[#fff3d6] flex flex-col justify-between p-4 md:p-6 relative overflow-hidden select-none">
      
      {/* Parallax Background Texture Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center select-none opacity-35 pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'url("/assets/archive/archive-bg-texture.jpg")' }}
      />
      {/* Dark tint overlay for absolute readability */}
      <div className="absolute inset-0 bg-black/35 pointer-events-none" />
      
      {/* Subtle warm backdrop glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-[#f6c86b]/10 rounded-full filter blur-[150px] pointer-events-none select-none" />

      {/* Retro decorative corner ornaments from decorations asset */}
      <div 
        className="absolute top-0 left-0 w-32 h-32 opacity-20 pointer-events-none select-none bg-contain bg-no-repeat bg-left-top"
        style={{ backgroundImage: 'url("/assets/archive/archive-decorations.jpg")' }}
      />
      <div 
        className="absolute bottom-0 right-0 w-32 h-32 opacity-20 pointer-events-none select-none bg-contain bg-no-repeat bg-right-bottom rotate-180"
        style={{ backgroundImage: 'url("/assets/archive/archive-decorations.jpg")' }}
      />

      {/* Decorative floral or retro header HUD */}
      <header className="w-full flex justify-between items-center z-20 shrink-0 pb-4 border-b border-[#ffdca0]/10 mb-4">
        <div className="flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-[#f6c86b]" />
          <span className="font-mono text-[10px] sm:text-xs text-[#c8aa83] font-bold uppercase tracking-widest">
            {isOpen ? `Архив: Страница ${currentPage + 1} / ${archiveSpreads.length}` : 'Модуль: Закрытый Архив'}
          </span>
        </div>
        
        {/* Nice little aesthetic decorations sticker */}
        <div 
          className="hidden sm:block w-32 h-6 opacity-35 bg-cover pointer-events-none select-none"
          style={{ backgroundImage: 'url("/assets/archive/archive-decorations.jpg")' }}
        />
      </header>

      {/* Main interactive stage */}
      <main className="flex-grow flex items-center justify-center w-full max-w-7xl mx-auto z-10 px-1 sm:px-4 py-2">
        {!isOpen ? (
          // CLOSED STATE: Album Cover
          <AlbumCover onOpenAlbum={() => setIsOpen(true)} />
        ) : (
          // OPENED STATE: Grand Open Album Layout
          <div className="w-full flex flex-col items-center">
            {/* Active page items and book layout */}
            <div className="w-full flex justify-center items-center">
              <AlbumSpread 
                spread={archiveSpreads[currentPage]} 
                direction={slideDirection} 
              />
            </div>

            {/* Pagination Controls and Back-To navigation links */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-5 sm:gap-8 z-15 select-none shrink-0">
              
              {/* Previous spread arrow */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 0}
                  className={`w-11 h-11 rounded-full border-2 border-[#ffdca0]/25 flex items-center justify-center transition-all bg-[#24170f]/95 text-[#ffdca0] cursor-pointer shadow-md ${
                    currentPage === 0 
                      ? 'opacity-35 cursor-not-allowed pointer-events-none' 
                      : 'hover:bg-[#f6c86b] hover:text-[#24170f] hover:border-[#f6c86b] hover:scale-105 active:scale-95'
                  }`}
                  title="Предыдущий разворот (Стрелка влево)"
                >
                  <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
                </button>

                {/* Page Indicator */}
                <div className="flex flex-col items-center justify-center min-w-16 font-mono text-center">
                  <span className="text-xs text-[#c8aa83] uppercase tracking-wider font-bold">Разворот</span>
                  <span className="text-sm font-press-start text-[#ffdca0] mt-1">
                    {currentPage + 1} / {archiveSpreads.length}
                  </span>
                </div>

                {/* Next spread arrow */}
                <button
                  onClick={handleNext}
                  disabled={currentPage === archiveSpreads.length - 1}
                  className={`w-11 h-11 rounded-full border-2 border-[#ffdca0]/25 flex items-center justify-center transition-all bg-[#24170f]/95 text-[#ffdca0] cursor-pointer shadow-md ${
                    currentPage === archiveSpreads.length - 1 
                      ? 'opacity-35 cursor-not-allowed pointer-events-none' 
                      : 'hover:bg-[#f6c86b] hover:text-[#24170f] hover:border-[#f6c86b] hover:scale-105 active:scale-95'
                  }`}
                  title="Следующий разворот (Стрелка вправо)"
                >
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>

              {/* Cover-reset / Main navigation utility links */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-[#1e130b] hover:bg-[#2c1d11] text-[#c8aa83] hover:text-[#ffdca0] border border-[#ffdca0]/15 rounded-xl font-press-start text-[8px] flex items-center gap-1.5 transition-all uppercase cursor-pointer shadow-sm active:translate-y-0.5"
                >
                  <ArrowUpLeft className="w-3.5 h-3.5" />
                  К Обложке
                </button>

                <Link
                  to="/"
                  className="px-4 py-2 bg-[#1e130b] hover:bg-[#2c1d11] text-[#c8aa83] hover:text-[#ffdca0] border border-[#ffdca0]/15 rounded-xl font-press-start text-[8px] flex items-center gap-1.5 transition-all uppercase cursor-pointer shadow-sm active:translate-y-0.5"
                >
                  <Home className="w-3.5 h-3.5" />
                  В Меню
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Decorative footer status with soft copyright design */}
      <footer className="w-full flex justify-between items-center z-20 shrink-0 pt-4 border-t border-[#ffdca0]/10 mt-4 font-mono text-[9px] text-[#c8aa83]/50">
        <span>© 2026 ВЛАД BIRTHDAY</span>
        <span className="hidden sm:block">АРХИВНЫЙ ДАТА-БЛОК СИСТЕМЫ ПАМЯТИ</span>
        <span>РАЗРАБОТАНО ДЛЯ ВЛАДА</span>
      </footer>
    </div>
  );
};
