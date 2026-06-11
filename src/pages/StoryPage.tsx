import React from 'react';
import { VisualNovel } from '../components/VisualNovel/VisualNovel';

export const StoryPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#17100c] flex flex-col justify-center items-center p-0 sm:p-2 md:p-3 pixel-grid text-[#fff3d6] bg-gradient-to-b from-[#24170f] via-[#1a110a] to-[#120b08]">
      
      {/* Visual background atmospheric lights */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#f6c86b]/10 rounded-full filter blur-3xl pointer-events-none select-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#ffb3c7]/5 rounded-full filter blur-3xl pointer-events-none select-none" />

      {/* Cozy Visual VN Container */}
      <div className="w-full sm:w-[97vw] max-w-[1780px] h-[100dvh] sm:h-[91vh] md:h-[92vh] sm:min-h-[89vh] z-10 flex flex-col sm:rounded-2xl bg-[#1a110a] sm:shadow-[0_20px_50px_rgba(0,0,0,0.85)] sm:border border-[#ffdca0]/15 overflow-hidden relative">
        <VisualNovel />
      </div>

    </div>
  );
};

