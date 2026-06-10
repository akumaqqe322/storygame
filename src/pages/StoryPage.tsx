import React from 'react';
import { VisualNovel } from '../components/VisualNovel/VisualNovel';
import { Gift, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export const StoryPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-2 sm:p-4 md:p-6 pixel-grid text-white">
      
      {/* Visual background atmospheric lights */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-pink-900/15 rounded-full filter blur-3xl pointer-events-none select-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-900/15 rounded-full filter blur-3xl pointer-events-none select-none" />

      {/* Retro Arcade Arcade/TV Cabinet style container */}
      <div className="w-full max-w-5xl z-10 flex flex-col gap-4">
        
        {/* Top bar indicators */}
        <div className="flex justify-between items-center px-4 font-mono text-zinc-400 text-xs select-none">
          <div className="flex items-center gap-1.5">
            <Gift className="w-3.5 h-3.5 text-pink-400 animate-bounce" />
            <span className="text-[10px] md:text-xs">СЮЖЕТНЫЙ РЕЖИМ • РЕЖИМ НОВЕЛЛЫ</span>
          </div>
          <Link 
            to="/" 
            className="flex items-center gap-1 hover:text-pink-300 transition-colors pointer-events-auto"
          >
            <Home className="w-3.5 h-3.5" />
            <span>В меню</span>
          </Link>
        </div>

        {/* The Game Engine Instance */}
        <div className="w-full rounded-2xl bg-black/60 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/5 overflow-hidden">
          <VisualNovel />
        </div>

        {/* Quick controls panel at the bottom */}
        <div className="text-center font-mono text-[10px] md:text-sm text-zinc-500 max-w-lg mx-auto leading-relaxed select-none px-4 mt-1">
          💡 <span className="font-semibold text-zinc-400">Управление:</span> Кликайте по диалоговому окну или нажимайте клавиши <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-700 rounded text-pink-300">Enter</kbd> / <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-700 rounded text-pink-300">Space</kbd> на клавиатуре, чтобы читать следующую реплику. На мобильных устройствах просто тапайте по текстовому окну.
        </div>

      </div>
    </div>
  );
};
