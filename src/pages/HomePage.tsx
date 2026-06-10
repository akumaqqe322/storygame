import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Play, Image as ImageIcon, Heart, Gift} from 'lucide-react';
import { getStoryProgress } from '../utils/storyProgress';

export const HomePage: React.FC = () => {
  const [hasUnfinishedProgress, setHasUnfinishedProgress] = useState<boolean>(false);

  useEffect(() => {
    const progress = getStoryProgress();
    setHasUnfinishedProgress(progress !== null && !progress.isCompleted);
  }, []);
  return (
    <div className="min-h-screen bg-[#17100c] text-[#fff3d6] flex flex-col justify-between p-4 md:p-8 relative overflow-hidden select-none bg-gradient-to-b from-[#24170f] via-[#1a110a] to-[#120b08]">
      
      {/* Decorative Warm Ambient Glows (Candle-like light) */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#f6c86b]/10 rounded-full filter blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ffb3c7]/5 rounded-full filter blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />

      {/* Simplified, Warm & Subtle Header */}
      <div className="max-w-4xl w-full mx-auto flex justify-between items-center z-10 border-b border-[#ffdca0]/10 pb-4">
        <div className="flex items-center gap-1.5">
          <Heart className="text-[#ffb3c7] fill-[#ffb3c7] w-4 h-4" />
          <span className="font-mono text-[10px] tracking-wider text-[#c8aa83] uppercase font-bold">
            С днём рождения
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-xs text-[#c8aa83]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f6c86b] animate-ping" />
          <span>11 ИЮНЯ 2026</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl w-full mx-auto my-auto flex flex-col items-center text-center z-10 py-8">
        
        {/* Floating Cozy Pixel Birthday Cake */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="text-6xl md:text-7xl mb-6 filter drop-shadow-[0_4px_0_rgba(0,0,0,0.6)] select-none"
        >
          🎂
        </motion.div>

        {/* Warm Personal Title Block */}
        <h1 className="font-press-start text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-[#fff3d6] mb-4 text-shadow-md">
          Один день рождения <span className="text-[#ffb3c7]">Влада</span>
        </h1>

        {/* Subtle Birthday Badges Column */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 font-mono text-xs text-[#c8aa83]">
          <span className="px-2.5 py-0.5 bg-[#f6c86b]/15 text-[#f6c86b] rounded border border-[#f6c86b]/30 font-bold">
            Владу 27
          </span>
          <span className="text-[#4e3b2e] hidden sm:inline">•</span>
          <span className="px-2.5 py-0.5 bg-[#ffb3c7]/15 text-[#ffb3c7] rounded border border-[#ffb3c7]/30 font-bold">
            11 июня 2026
          </span>
          <span className="text-[#4e3b2e] hidden sm:inline">•</span>
          <span className="tracking-wide text-[#fff3d6]/70">
            11.06.1999 → 11.06.2026
          </span>
        </div>

        {/* Muted Emotional Subtitle */}
        <p className="text-[#c8aa83] font-mono text-xs md:text-sm max-w-xl leading-relaxed mb-8 px-4">
          Интерактивная история, архив воспоминаний и немного локальных мемов.
        </p>

        {/* Two-mode grid optimized for cozy cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mt-2 px-4">
          
          {/* Card 1: Story Mode */}
          <motion.div 
            className="group relative bg-[#ffeedc]/5 hover:bg-[#ffeedc]/8 border border-[#ffdca0]/20 hover:border-[#ffb3c7]/50 rounded-2xl p-6 flex flex-col justify-between items-center text-center transition-all duration-200 cursor-pointer retro-shadow"
            whileHover={{ y: -4 }}
          >
            <div className="absolute top-3 right-3 text-[#ffb3c7]/40 group-hover:text-[#ffb3c7] transition-colors">
              <Gift className="w-4 h-4" />
            </div>

            <div className="mb-4">
              <div className="text-4xl my-3 group-hover:scale-105 transition-transform duration-200 filter drop-shadow-[0_2px_0_rgba(0,0,0,0.5)]">
                🕹️
              </div>
              <h2 className="font-press-start text-[10px] md:text-xs text-[#ffb3c7] mb-2 mt-2 uppercase tracking-wide">
                Сюжетный режим
              </h2>
              <p className="font-mono text-[11px] md:text-xs text-[#c8aa83] leading-relaxed max-w-[240px] mx-auto">
                Мини-игра на 7–10 минут. Лучше проходить, когда есть время.
              </p>
              {hasUnfinishedProgress && (
                <div className="mt-2 inline-block px-2 py-0.5 bg-[#ffb3c7]/15 text-[#ffeedc] border border-[#ffb3c7]/20 rounded-md font-mono text-[9px] uppercase tracking-wider animate-pulse">
                  💾 Прогресс сохранён
                </div>
              )}
            </div>

            <Link 
              to="/story" 
              className="w-full mt-4 py-2.5 px-4 bg-[#ffb3c7] hover:bg-[#ffa1b9] text-[#24170f] font-press-start text-[9px] md:text-[10px] uppercase font-bold rounded-lg border border-[#ffdca0]/20 shadow-sm transition-all text-center flex items-center justify-center gap-1.5"
            >
              <Play className="w-3 h-3 fill-current" />
              {hasUnfinishedProgress ? 'Продолжить историю' : 'Начать историю'}
            </Link>
          </motion.div>

          {/* Card 2: Archive Mode */}
          <motion.div 
            className="group relative bg-[#ffeedc]/5 hover:bg-[#ffeedc]/8 border border-[#ffdca0]/20 hover:border-[#f6c86b]/50 rounded-2xl p-6 flex flex-col justify-between items-center text-center transition-all duration-200 cursor-pointer retro-shadow"
            whileHover={{ y: -4 }}
          >
            <div className="absolute top-3 right-3 text-[#f6c86b]/40 group-hover:text-[#f6c86b] transition-colors">
              <ImageIcon className="w-4 h-4" />
            </div>

            <div className="mb-4">
              <div className="text-4xl my-3 group-hover:scale-105 transition-transform duration-200 filter drop-shadow-[0_2px_0_rgba(0,0,0,0.5)]">
                📂
              </div>
              <h2 className="font-press-start text-[10px] md:text-xs text-[#f6c86b] mb-2 mt-2 uppercase tracking-wide">
                Архивный режим
              </h2>
              <p className="font-mono text-[11px] md:text-xs text-[#c8aa83] leading-relaxed max-w-[240px] mx-auto">
                Фотоальбом и воспоминания. Можно открыть сразу, если времени мало.
              </p>
            </div>

            <Link 
              to="/archive" 
              className="w-full mt-4 py-2.5 px-4 bg-[#f6c86b] hover:bg-[#ebb340] text-[#24170f] font-press-start text-[9px] md:text-[10px] uppercase font-bold rounded-lg border border-[#ffdca0]/20 shadow-sm transition-all text-center flex items-center justify-center gap-1.5"
            >
              <ImageIcon className="w-3 h-3" />
              Открыть альбом
            </Link>
          </motion.div>

        </div>

        {/* Paper post-it memo / paper sticker to give a handcrafted, cozy touch */}
        <motion.div 
          className="max-w-md w-full mx-auto mt-10 p-4 bg-[#fdf6e2] border border-[#dfd5b2] shadow-md rounded relative rotate-[-1deg] md:rotate-[-0.5deg]"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Paper tape decoration at the top */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-white/40 shadow-sm border-x border-[#dfd5b2] rotate-[0.5deg]" />
          
          <div className="text-left font-mono text-[10px] md:text-xs text-[#4d3a2e] leading-relaxed gap-2 flex items-start">
            <span className="text-[#c19553] text-lg select-none leading-none mt-0.5">💡</span>
            <p>
              <span className="font-bold text-[#b47a1f]">Совет:</span> если есть пару минут — начни с сюжетного режима. Если времени мало, архив можно открыть сразу.
            </p>
          </div>
        </motion.div>

      </div>

      {/* Footer */}
      <div className="max-w-4xl w-full mx-auto text-center z-10 border-t border-[#ffdca0]/10 pt-4 flex flex-col sm:flex-row justify-between items-center gap-2 font-mono text-[10px] text-[#c8aa83]/40">
        <div>С любовью • Создано для Влада • 2026</div>
        <div className="hidden sm:block">Рекомендуется проходить со звуком</div>
      </div>
    </div>
  );
};
