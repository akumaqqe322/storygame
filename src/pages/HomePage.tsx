import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Play, Image as ImageIcon, Heart, Gift, Calendar, Sun } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 md:p-8 relative overflow-hidden pixel-grid select-none">
      
      {/* Visual background lights representing warm candles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-900/10 rounded-full filter blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-amber-950/10 rounded-full filter blur-3xl pointer-events-none animate-pulse" />

      {/* Retro header decoration */}
      <div className="max-w-6xl w-full mx-auto flex justify-between items-center z-10 border-b-2 border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <Heart className="text-rose-500 fill-current w-5 h-5 animate-bounce" />
          <span className="font-press-start text-[8px] md:text-[10px] tracking-widest text-rose-300">
            ВЛАД-24-РЕТРО
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
          <Calendar className="w-4 h-4 text-amber-400" />
          <span>10 ИЮНЯ 2026</span>
        </div>
      </div>

      {/* Main Title Centerpiece */}
      <div className="max-w-4xl w-full mx-auto my-auto flex flex-col items-center text-center z-10 py-8">
        
        {/* Retro Pixel Birthday Cake Emoji with float transition */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="text-6xl md:text-8xl mb-6 filter drop-shadow-[0_6px_0_rgba(0,0,0,0.5)] select-none"
        >
          🎂
        </motion.div>

        {/* Dynamic Glowing Banner */}
        <div className="inline-block px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full font-mono text-xs mb-4 tracking-wide border border-amber-500/30">
          ✨ РОЖДЕСТВЕНСКОЕ НАСТРОЕНИЕ В СТИЛЕ 16-BIT ✨
        </div>

        {/* Main Title */}
        <h1 className="font-press-start text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white mb-4 text-shadow-lg p-2">
          Один день рождения <span className="text-pink-400 uppercase">Влада</span>
        </h1>

        <p className="text-zinc-400 font-mono text-xs md:text-sm max-w-xl leading-relaxed mb-10 px-4">
          Добро пожаловать в праздничную интерактивную новеллу. Пройдите сюжетную историю или сразу перейдите к воспоминаниям в архиве!
        </p>

        {/* Animated helper hint requested by user */}
        <motion.div 
          className="max-w-2xl w-full mx-auto mb-8 p-3 bg-amber-950/40 border-2 border-amber-500/30 rounded-xl retro-shadow-sm flex items-center gap-3 text-left"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-xl md:text-2xl animate-pulse">💡</div>
          <p className="text-amber-200/90 font-mono text-[11px] md:text-xs leading-relaxed">
            <span className="font-bold text-amber-300">Совет:</span> Сюжетный режим — мини-игра на 7–10 минут. Если времени мало, можно сразу открыть архив.
          </p>
        </motion.div>

        {/* Dynamic launcher grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mt-2 px-4">
          
          {/* Card 1: Story Mode */}
          <motion.div 
            className="group relative bg-slate-900/80 hover:bg-slate-900 border-4 border-slate-850 hover:border-pink-300/80 rounded-2xl p-6 flex flex-col justify-between items-center text-center transition-all duration-200 cursor-pointer retro-shadow"
            whileHover={{ y: -5 }}
          >
            <div className="absolute top-3 right-3 text-slate-600 group-hover:text-pink-400 transition-colors">
              <Gift className="w-5 h-5 animate-pulse" />
            </div>

            <div className="mb-4">
              <div className="text-4xl md:text-5xl my-3 group-hover:scale-110 transition-transform duration-200 filter drop-shadow-[0_4px_0_rgba(0,0,0,0.4)]">
                🕹️
              </div>
              <h2 className="font-press-start text-xs md:text-sm text-pink-300 mb-2 mt-2 uppercase tracking-wide">
                Сюжетный режим
              </h2>
              <p className="font-mono text-[11px] md:text-xs text-slate-400 leading-relaxed max-w-[240px] mx-auto">
                Интерактивная история из жизни Влада. Ваши выборы влияют на развитие дня!
              </p>
            </div>

            <Link 
              to="/story" 
              className="w-full mt-4 py-2.5 px-4 bg-pink-500 hover:bg-pink-600 text-white font-press-start text-[10px] md:text-[11px] border-2 border-black rounded-xl flex items-center justify-center gap-2 retro-shadow-sm pointer-events-auto transition-transform"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              СТАРТ ИГРЫ
            </Link>
          </motion.div>

          {/* Card 2: Archive Mode */}
          <motion.div 
            className="group relative bg-slate-900/80 hover:bg-slate-900 border-4 border-slate-850 hover:border-amber-400/80 rounded-2xl p-6 flex flex-col justify-between items-center text-center transition-all duration-200 cursor-pointer retro-shadow"
            whileHover={{ y: -5 }}
          >
            <div className="absolute top-3 right-3 text-slate-600 group-hover:text-amber-400 transition-colors">
              <Sun className="w-5 h-5 animate-spin-slow" />
            </div>

            <div className="mb-4">
              <div className="text-4xl md:text-5xl my-3 group-hover:scale-110 transition-transform duration-200 filter drop-shadow-[0_4px_0_rgba(0,0,0,0.4)]">
                📂
              </div>
              <h2 className="font-press-start text-xs md:text-sm text-amber-300 mb-2 mt-2 uppercase tracking-wide">
                Архивный режим
              </h2>
              <p className="font-mono text-[11px] md:text-xs text-slate-400 leading-relaxed max-w-[240px] mx-auto">
                Просмотр памятных семейных альбомов и личных тёплых воспоминаний.
              </p>
            </div>

            <Link 
              to="/archive" 
              className="w-full mt-4 py-2.5 px-4 bg-amber-500 hover:bg-amber-600 text-white font-press-start text-[10px] md:text-[11px] border-2 border-black rounded-xl flex items-center justify-center gap-2 retro-shadow-sm pointer-events-auto transition-transform"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              ОТКРЫТЬ АЛЬБОМ
            </Link>
          </motion.div>

        </div>
      </div>

      {/* Warm retro page footer */}
      <div className="max-w-6xl w-full mx-auto text-center z-10 border-t-2 border-slate-800 pt-4 flex flex-col sm:flex-row justify-between items-center gap-2 font-mono text-[10px] text-slate-500">
        <div>С любовью к празднику • Создано для Влада • 2026</div>
        <div>Нажмите СТАРТ ИГРЫ для входа в историю</div>
      </div>
    </div>
  );
};
