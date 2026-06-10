import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, HardDrive, Calendar, Sparkles } from 'lucide-react';

export const ArchivePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#17100c] text-[#fff3d6] flex flex-col justify-center items-center p-4 md:p-8 relative overflow-hidden bg-gradient-to-b from-[#24170f] via-[#1a110a] to-[#120b08] select-none">
      
      {/* Ambient glowing atmosphere */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#f6c86b]/5 rounded-full filter blur-3xl pointer-events-none select-none" />

      <motion.div 
        className="w-full max-w-xl bg-[#24170f]/90 border-2 border-[#ffdca0]/30 rounded-2xl p-6 md:p-8 retro-shadow flex flex-col items-center text-center z-10"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.5 }}
      >
        {/* Memory Icon / Polaroid Mockup - Warm & Cozy */}
        <div className="relative mb-6 select-none">
          {/* Animated Sparks */}
          <div className="absolute -top-3 -right-3 text-[#f6c86b] animate-pulse text-2xl">✨</div>
          <div className="absolute -bottom-2 -left-3 text-[#ffb3c7] rotate-12 animate-pulse text-xl">🌸</div>
          
          {/* Polaroid Frames floating retro mockup */}
          <div className="flex gap-4 transform -rotate-1">
            <div className="w-24 h-28 bg-[#fdf6e2] p-2 rounded border border-black/20 shadow-lg transform -rotate-6">
              <div className="w-full h-20 bg-[#24170f] flex items-center justify-center font-mono text-[9px] text-[#f6c86b] font-semibold uppercase italic bg-opacity-40">
                2018 🏔️
              </div>
              <div className="h-3 mt-1.5 bg-[#dfd5b2]/50 rounded-xs" />
            </div>
            
            <div className="w-24 h-28 bg-[#fdf6e2] p-2 rounded border border-black/20 shadow-lg transform rotate-6 scale-105">
              <div className="w-full h-20 bg-[#24170f] flex items-center justify-center font-mono text-[9px] text-[#ffb3c7] font-semibold uppercase italic bg-opacity-40">
                2022 🍰
              </div>
              <div className="h-3 mt-1.5 bg-[#dfd5b2]/50 rounded-xs" />
            </div>
          </div>
        </div>

        {/* HUD Subtitle */}
        <div className="flex items-center gap-1.5 bg-[#1a110a]/95 px-3 py-1.5 rounded-lg border border-[#ffdca0]/10 mb-5">
          <HardDrive className="w-3.5 h-3.5 text-[#f6c86b]" />
          <span className="font-mono text-[10px] sm:text-xs text-[#c8aa83] font-bold uppercase tracking-widest">
            МОДУЛЬ: АРХИВ воспоминаний
          </span>
        </div>

        {/* Main Header Text */}
        <h2 className="font-press-start text-[11px] sm:text-xs text-[#fff3d6] mb-4 line-clamp-2 leading-relaxed px-2 uppercase tracking-wider text-shadow-lg">
          Архивный режим скоро будет здесь
        </h2>

        {/* Informative placeholder text */}
        <p className="font-mono text-xs md:text-sm text-[#c8aa83] leading-relaxed mb-6 max-w-sm">
          В этом режиме Влад и его близкие смогут полистать интерактивный фотоальбом, вспомнить яркие праздники, путешествия в Абхазию и весёлые семейные события!
        </p>

        {/* Roadmap Preview Features */}
        <div className="w-full text-left bg-[#1a110a]/90 border border-[#ffdca0]/10 rounded-xl p-4 mb-6 space-y-3 font-mono text-xs">
          <h4 className="font-press-start text-[8px] text-[#c8aa83] tracking-wider uppercase">
            ЧТО ПЛАНИРУЕТСЯ ДОБАВИТЬ:
          </h4>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[#fff3d6]/95">
              <span className="text-[#f6c86b]">⚡</span>
              <span>Галерея знаковых фотографий с описаниями</span>
            </div>
            <div className="flex items-center gap-2 text-[#fff3d6]/95">
              <span className="text-[#f6c86b]">⚡</span>
              <span>Интерактивная карта поездок (Озеро Рица, водопады)</span>
            </div>
            <div className="flex items-center gap-2 text-[#fff3d6]/95">
              <span className="text-[#ffb3c7]">⚡</span>
              <span>Особые пожелания и поздравления от всей семьи</span>
            </div>
          </div>
        </div>

        {/* Navigation back to main page */}
        <Link
          to="/"
          className="w-full py-3 bg-[#f6c86b] hover:bg-[#ebb340] text-[#24170f] font-press-start text-[9px] md:text-[10px] border border-black/20 rounded-xl flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all uppercase font-bold"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[3]" />
          Вернуться в меню
        </Link>
      </motion.div>
    </div>
  );
};
