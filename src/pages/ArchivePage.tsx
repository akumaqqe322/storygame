import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, HardDrive, Eye, Calendar, Sparkles } from 'lucide-react';

export const ArchivePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 md:p-8 relative overflow-hidden pixel-grid select-none">
      
      {/* Ambient glowing atmosphere */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-900/10 rounded-full filter blur-3xl pointer-events-none select-none" />

      <motion.div 
        className="w-full max-w-xl bg-slate-900/90 border-4 border-amber-300 rounded-2xl p-6 md:p-8 retro-shadow flex flex-col items-center text-center z-10"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.5 }}
      >
        {/* Memory Icon / Polaroid Mockup */}
        <div className="relative mb-6">
          {/* Animated Sparks */}
          <div className="absolute -top-3 -right-3 text-amber-300 animate-pulse text-2xl">✨</div>
          <div className="absolute -bottom-2 -left-3 text-pink-400 rotate-12 animate-pulse text-xl">🌸</div>
          
          {/* Polaroid Frames floating retro mockup */}
          <div className="flex gap-4 transform -rotate-2">
            <div className="w-24 h-28 bg-white p-2 rounded border border-black/20 shadow-lg transform -rotate-6">
              <div className="w-full h-20 bg-amber-950 flex items-center justify-center font-mono text-[9px] text-amber-500 font-semibold uppercase italic bg-opacity-40">
                2018 🏔️
              </div>
              <div className="h-4 mt-1 bg-zinc-200 rounded-xs" />
            </div>
            
            <div className="w-24 h-28 bg-white p-2 rounded border border-black/20 shadow-lg transform rotate-6 scale-105">
              <div className="w-full h-20 bg-rose-950 flex items-center justify-center font-mono text-[9px] text-rose-400 font-semibold uppercase italic bg-opacity-40">
                2022 🍰
              </div>
              <div className="h-4 mt-1 bg-zinc-200 rounded-xs" />
            </div>
          </div>
        </div>

        {/* HUD Subtitle */}
        <div className="flex items-center gap-1 bg-black/40 px-3 py-1.5 rounded-lg border border-amber-400/20 mb-4">
          <HardDrive className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="font-mono text-xs text-amber-300 font-bold uppercase tracking-widest">
            МОДУЛЬ: АРХИВ
          </span>
        </div>

        {/* Main Header Text */}
        <h2 className="font-press-start text-xs sm:text-sm text-white mb-4 line-clamp-2 leading-relaxed px-2 uppercase tracking-wider text-shadow-lg">
          Архивный режим скоро будет здесь
        </h2>

        {/* Informative placeholder text */}
        <p className="font-mono text-xs md:text-sm text-zinc-400 leading-relaxed mb-6 max-w-sm">
          В этом режиме Влад и его близкие смогут полистать интерактивный фотоальбом, вспомнить яркие праздники, путешествия в Абхазию и весёлые семейные события!
        </p>

        {/* Roadmap Preview Features */}
        <div className="w-full text-left bg-slate-950/80 border-2 border-slate-800 rounded-xl p-4 mb-6 space-y-3 font-mono text-xs">
          <h4 className="font-press-start text-[8px] text-zinc-400 tracking-wider">
            ЧТО ПЛАНИРУЕТСЯ ДОБАВИТЬ:
          </h4>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-zinc-300">
              <span className="text-amber-400">⚡</span>
              <span>Галерея знаковых фотографий с описаниями</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <span className="text-amber-400">⚡</span>
              <span>Интерактивная карта поездок (Озеро Рица, водопады)</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <span className="text-amber-400">⚡</span>
              <span>Особые пожелания и поздравления от всей семьи</span>
            </div>
          </div>
        </div>

        {/* Navigation back to main page */}
        <Link
          to="/"
          className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-press-start text-[10px] md:text-[11px] border-2 border-black rounded-xl flex items-center justify-center gap-2 retro-shadow-sm cursor-pointer transition-transform duration-100 uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[3]" />
          Вернуться в меню
        </Link>
      </motion.div>
    </div>
  );
};
