import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, ArrowLeft, Heart, Flower } from 'lucide-react';
import { Link } from 'react-router-dom';
import { withBase } from '../../data/archive';

interface AlbumCoverProps {
  onOpenAlbum: () => void;
}

export const AlbumCover: React.FC<AlbumCoverProps> = ({ onOpenAlbum }) => {
  return (
    <motion.div
      className="w-full max-w-[65vh] md:max-w-md aspect-[3/4] bg-[#2d1b0f] border-8 border-[#3f2515] rounded-2xl relative shadow-[0_24px_64px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col justify-between p-6 sm:p-8 select-none border-l-[16px] origin-left border-l-[#1f120a]"
      id="retro-album-cover"
      initial={{ rotateY: -15, rotateX: 5, y: 15, opacity: 0 }}
      animate={{ rotateY: 0, rotateX: 0, y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 18 }}
      whileHover={{ scale: 1.01, rotateY: 2, shadow: '0_32px_80px_rgba(0,0,0,1)' }}
    >
      {/* Visual cover background pattern with custom blended image */}
      <div 
        className="absolute inset-0 bg-cover bg-center select-none opacity-95 pointer-events-none"
        style={{ backgroundImage: `url("${withBase('/assets/archive/archive-cover.jpg')}")` }}
      />
      {/* Warm leather ambient texture overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#140b06]/65 via-black/25 to-[#f6c86b]/15 pointer-events-none" />
      
      {/* Elegant Golden Border Frame */}
      <div className="absolute inset-4 border border-[#ffdca0]/40 rounded-lg pointer-events-none zip-effect z-10" />
      <div className="absolute inset-5 border-2 border-[#ffdca0]/20 rounded-md pointer-events-none z-10" />
 
      {/* Sparks in corners */}
      <div className="absolute top-6 left-6 text-[#f6c86b]/70 text-base z-10"><Flower className="w-4 h-4" /></div>
      <div className="absolute top-6 right-6 text-[#f6c86b]/70 text-base z-10"><Flower className="w-4 h-4" /></div>
      <div className="absolute bottom-6 left-6 text-[#f6c86b]/70 text-base z-10"><Flower className="w-4 h-4" /></div>
      <div className="absolute bottom-6 right-6 text-[#f6c86b]/70 text-base z-10"><Flower className="w-4 h-4" /></div>
 
      {/* Top Section / Header Label */}
      <div className="z-20 flex flex-col items-center text-center mt-3">
        <span className="font-press-start text-[8px] sm:text-[9px] text-[#24170f] uppercase tracking-widest bg-[#ffdca0] px-3.5 py-1.5 border border-[#ffdca0] rounded-md font-bold shadow-md">
          Влад • 26 Лет
        </span>
      </div>
 
      {/* Mid Vintage Plaque Section / Album Title */}
      <div className="z-20 flex flex-col items-center text-center px-4 py-5 my-auto bg-[#1c0f0a]/80 backdrop-blur-[2px] border border-[#ffdca0]/25 rounded-xl shadow-[inset_0_4px_12px_rgba(0,0,0,0.6)] mx-2 my-4 relative">
        <h2 className="font-press-start text-xs sm:text-sm text-[#ffdca0] leading-loose uppercase tracking-wider text-shadow-lg mb-2 text-center">
          Архив<br />воспоминаний
        </h2>
        
        {/* Memory Icon inside cute framed square */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#fdfaf2] p-2 rounded-sm shadow-md border border-stone-300 transform -rotate-2 relative my-3 shrink-0">
          <div className="w-full h-full bg-[#1b100a]/20 flex items-center justify-center text-[#ff80a2]">
            <Heart className="w-6 sm:w-8 sm:h-8 h-6 fill-current text-[#ff5a84]" />
          </div>
          <div className="absolute bottom-1 right-2 text-[8px] font-mono text-stone-400 italic">2026</div>
        </div>
 
        <p className="font-mono text-[9.5px] sm:text-[10px] text-[#ffdca0]/85 leading-relaxed max-w-[240px]">
          Старые кадры, обычные моменты и всё то, что со временем становится особенно тёплым.
        </p>
      </div>

      {/* Bottom Action buttons */}
      <div className="z-10 flex flex-col gap-3.5 mb-2 w-full">
        <button
          onClick={onOpenAlbum}
          className="w-full py-3 sm:py-3.5 bg-[#f6c86b] hover:bg-[#ebb340] active:scale-98 text-[#24170f] font-press-start text-[9.5px] border-b-4 border-[#cfa14a] rounded-xl flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all uppercase font-bold"
        >
          <BookOpen className="w-4 h-4" />
          Открыть альбом
        </button>

        <Link
          to="/"
          className="w-full py-2.5 sm:py-3 bg-[#1e130b]/90 hover:bg-[#2c1d11] active:translate-y-0.5 text-[#c8aa83] hover:text-[#ffdca0] font-press-start text-[8px] sm:text-[9px] border border-[#ffdca0]/15 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          В Меню
        </Link>
      </div>
    </motion.div>
  );
};
