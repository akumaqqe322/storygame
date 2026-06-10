import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CharacterState } from '../../types/story';
import { assets } from '../../config/assets';

interface CharacterLayerProps {
  characters?: CharacterState[];
}

export const CharacterLayer: React.FC<CharacterLayerProps> = ({ characters = [] }) => {
  // Keep track of image paths that fail to load, to fall back to gorgeous retro placeholders
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const handleImageError = (charId: string, expression: string) => {
    const key = `${charId}-${expression}`;
    setFailedImages((prev) => ({ ...prev, [key]: true }));
  };

  if (!characters || characters.length === 0) return null;

  // Map position to Tailwind layout classes
  const getPositionClasses = (pos: 'left' | 'center' | 'right') => {
    switch (pos) {
      case 'left':
        return 'left-1/10 md:left-1/6 transform -translate-x-1/2';
      case 'right':
        return 'right-1/10 md:right-1/6 transform translate-x-1/2';
      case 'center':
      default:
        return 'left-1/2 transform -translate-x-1/2';
    }
  };

  // Get corresponding retro emojis/colors for failed image placeholders
  const getFallbackConfig = (charId: string, expr: string) => {
    const expressions: Record<string, string> = {
      happy: '😊',
      neutral: '😐',
      sad: '😢',
      shocked: '😲',
      blush: '😳',
      base: '👨',
      salad: '🥗',
      kneeling: '🙇',
      shock: '😲',
      frustrated: '😫',
      congratulating: '🎉',
      scolding: '😠',
      smiling: '😎',
      confused: '🤔',
    };
    const emoji = expressions[expr] || '🧑‍💻';

    switch (charId) {
      case 'vlad':
        return {
          bgColor: 'bg-gradient-to-t from-sky-900 to-sky-700 border-sky-400',
          textColor: 'text-sky-200',
          emoji,
        };
      case 'mom':
        return {
          bgColor: 'bg-gradient-to-t from-rose-900 to-rose-700 border-rose-400',
          textColor: 'text-rose-200',
          emoji,
        };
      case 'svetlana':
        return {
          bgColor: 'bg-gradient-to-t from-emerald-900 to-emerald-700 border-emerald-400',
          textColor: 'text-emerald-200',
          emoji,
        };
      case 'you':
      default:
        return {
          bgColor: 'bg-gradient-to-t from-fuchsia-900 to-fuchsia-700 border-fuchsia-400',
          textColor: 'text-fuchsia-200',
          emoji,
        };
    }
  };

  return (
    <div className="absolute inset-x-0 bottom-0 top-1/4 flex justify-center items-end pointer-events-none overflow-hidden select-none z-10">
      {characters.map((char) => {
        const positionClass = getPositionClasses(char.position);
        const imageKey = `${char.id}-${char.expression}`;
        const isFailed = failedImages[imageKey];
        const fallback = getFallbackConfig(char.id, char.expression);
        // Resolve path from config assets first, otherwise fallback to the interpolated path
        const charGroup = assets.characters[char.id as keyof typeof assets.characters];
        const imagePath = charGroup && (char.expression in charGroup)
          ? (charGroup as any)[char.expression]
          : `/assets/characters/${char.id}/${char.expression}.png`;

        // Speaking state: highlight active speaker, dim non-speakers
        const opacityValue = char.isSpeaking || char.isSpeaking === undefined ? 1.0 : 0.65;
        const scaleValue = char.isSpeaking ? 1.05 : 0.95;

        return (
          <motion.div
            key={`${char.id}-${char.position}`}
            className={`absolute bottom-0 h-4/5 flex flex-col justify-end items-center max-w-[280px] w-1/3 md:w-1/4 ${positionClass}`}
            initial={{ y: 50, opacity: 0 }}
            animate={{ 
              y: 0, 
              opacity: opacityValue,
              scale: scaleValue,
            }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          >
            {isFailed ? (
              // Beautiful high-fidelity retro placeholder
              <div 
                className={`w-full aspect-[3/4] max-h-[380px] rounded-t-xl border-4 ${fallback.bgColor} flex flex-col justify-between items-center p-4 retro-shadow-sm`}
              >
                {/* Character Header Tag */}
                <div className="bg-black/40 text-[10px] md:text-sm text-center px-2 py-1 rounded border border-white/20 font-mono w-full truncate">
                  {char.name}
                </div>
                
                {/* Visual Avatar Centerpiece */}
                <div className="text-5xl md:text-7xl animate-pulse my-auto filter drop-shadow-[0_4px_0_rgba(0,0,0,0.5)]">
                  {fallback.emoji}
                </div>

                {/* Info Text */}
                <div className="bg-black/60 text-[9px] md:text-[11px] text-white/90 px-2 py-1 rounded text-center w-full font-mono capitalize tracking-wide">
                  [{char.expression}]
                </div>
              </div>
            ) : (
              // Actual sprite image with a beautiful retro outline filter
              <img
                src={imagePath}
                alt={`${char.name} (${char.expression})`}
                onError={() => handleImageError(char.id, char.expression)}
                className="pixelated w-full h-auto max-h-[420px] object-contain drop-shadow-[0_8px_0_rgba(0,0,0,0.5)]"
                referrerPolicy="no-referrer"
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};
