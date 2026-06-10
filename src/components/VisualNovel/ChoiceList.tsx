import React from 'react';
import { motion } from 'motion/react';
import { Choice } from '../../types/story';

interface ChoiceListProps {
  choices: Choice[];
  onChoiceSelect: (choice: Choice) => void;
}

export const ChoiceList: React.FC<ChoiceListProps> = ({ choices, onChoiceSelect }) => {
  if (!choices || choices.length === 0) return null;

  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center z-40 bg-[#1a110a]/75 backdrop-blur-xs px-4 md:px-8 select-none">
      <motion.div 
        className="w-full max-w-xl flex flex-col gap-4 p-6 bg-[#24170f]/95 border-2 border-[#ffdca0]/35 rounded-2xl shadow-2xl relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', duration: 0.5 }}
      >
        <div className="absolute inset-0.5 border border-[#ffdca0]/5 rounded-xl pointer-events-none opacity-30" />

        <h3 className="text-center font-press-start text-[9px] md:text-[10px] text-[#f6c86b] mb-2 uppercase tracking-wide">
          Выберите ваше действие:
        </h3>
        
        <div className="flex flex-col gap-3">
          {choices.map((choice, idx) => (
            <motion.button
              key={`${choice.nextSceneId}-${idx}`}
              onClick={() => onChoiceSelect(choice)}
              className="group relative w-full text-left p-4 bg-[#1a110a] hover:bg-[#ffeedc]/5 border border-[#ffdca0]/20 hover:border-[#f6c86b] rounded-xl transition-all duration-150 cursor-pointer text-xs sm:text-sm font-medium text-[#fff3d6] hover:text-[#f6c86b] flex items-center shadow-sm"
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
            >
              {/* Retro Selection Indicator Bullet */}
              <span className="mr-3 font-press-start text-xs text-[#c8aa83] group-hover:text-[#f6c86b] transition-colors">
                {idx + 1}.
              </span>
              
              <span className="font-mono flex-1 leading-relaxed text-xs sm:text-sm">
                {choice.text}
              </span>
              
              {/* Retro indicator chevron on far right */}
              <span className="opacity-0 group-hover:opacity-100 font-press-start text-xs text-[#f6c86b] transition-opacity ml-2">
                👉
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
