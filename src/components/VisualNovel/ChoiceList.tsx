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
    <div className="absolute inset-0 flex flex-col justify-center items-center z-40 bg-black/50 backdrop-blur-xs px-4 md:px-8 select-none">
      <motion.div 
        className="w-full max-w-xl flex flex-col gap-4 p-6 bg-slate-900/90 border-4 border-amber-300 rounded-2xl retro-shadow"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', duration: 0.5 }}
      >
        <h3 className="text-center font-press-start text-[10px] md:text-xs text-amber-300 mb-2 uppercase tracking-wider">
          Выберите ваше действие:
        </h3>
        
        <div className="flex flex-col gap-3">
          {choices.map((choice, idx) => (
            <motion.button
              key={`${choice.nextSceneId}-${idx}`}
              onClick={() => onChoiceSelect(choice)}
              className="group relative w-full text-left p-4 bg-slate-950 hover:bg-amber-950 border-2 border-slate-700 hover:border-amber-400 rounded-xl transition-all duration-150 cursor-pointer text-sm md:text-base font-medium text-pink-50 hover:text-amber-100 flex items-center retro-shadow-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Retro Selection Indicator Bullet */}
              <span className="mr-3 font-press-start text-xs text-slate-500 group-hover:text-amber-400 transition-colors">
                {idx + 1}.
              </span>
              
              <span className="font-mono flex-1 leading-relaxed">
                {choice.text}
              </span>
              
              {/* Retro indicator chevron on far right */}
              <span className="opacity-0 group-hover:opacity-100 font-press-start text-amber-400 transition-opacity ml-2 text-xs">
                ➡️
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
