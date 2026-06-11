import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CharacterState } from '../../types/story';
import { assets } from '../../config/assets';
import { withBase } from '../../utils/base';

interface CharacterLayerProps {
  characters?: CharacterState[];
}

export const CharacterLayer: React.FC<CharacterLayerProps> = ({ characters = [] }) => {
  // Keep track of image paths that fail to load, to fall back to gorgeous retro placeholders
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaVal = window.matchMedia('(max-width: 640px)');
    setIsMobile(mediaVal.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaVal.addEventListener('change', handler);
    return () => mediaVal.removeEventListener('change', handler);
  }, []);

  const handleImageError = (charId: string, expression: string) => {
    const key = `${charId}-${expression}`;
    setFailedImages((prev) => ({ ...prev, [key]: true }));
  };

  if (!characters || characters.length === 0) return null;

  // Map position to Tailwind layout classes
  const getPositionClasses = (pos: 'left' | 'center' | 'right') => {
    switch (pos) {
      case 'left':
        return 'left-[16%] sm:left-[22%] md:left-[26%] transform -translate-x-1/2';
      case 'right':
        return 'right-[16%] sm:right-[22%] md:right-[26%] transform translate-x-1/2';
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

  const isBottomAnchor = (charId: string, expr: string): boolean => {
    if (charId === 'mom' || charId === 'svetlana') {
      return true;
    }
    if (charId === 'vlad') {
      return ['base', 'salad', 'shock', 'frustrated', 'kneeling'].includes(expr);
    }
    return true; // bottom: 0 by default for everyone
  };

  return (
    <div className="absolute inset-0 flex justify-center items-end pointer-events-none overflow-hidden select-none z-10">
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

        // Sizing logic normalized to Scene 1 Vlad standard + 5%
        // Target: Scene 1 Vlad is 84vh (80vh * 1.05) and scale 1.20 (1.15 * 1.05 = 1.20)
        // We use extremely generous width classes so that height is ALWAYS the limiting dimension.
        // This guarantees characters are rendered at their true, majestic height and match exactly.
        const charCount = characters.length;
        let widthClass = 'w-[56%] sm:w-[48%] md:w-[42%]';
        let maxWidth = 'max-w-[600px]';

        if (charCount === 1) {
          widthClass = 'w-[68%] sm:w-[58%] md:w-[52%]';
          maxWidth = 'max-w-[750px]';
        } else if (charCount === 2) {
          widthClass = 'w-[62%] sm:w-[54%] md:w-[48%]';
          maxWidth = 'max-w-[680px]';
        } else if (charCount >= 3) {
          widthClass = 'w-[48%] sm:w-[42%] md:w-[36%]';
          maxWidth = 'max-w-[520px]';
        }

        // Sizing logic normalized to Scene 1 Vlad standard + 5%
        // Target: Scene 1 Vlad is 84vh (80vh * 1.05) and scale 1.20 (1.15 * 1.05 = 1.20)
        const isStanding = char.expression !== 'kneeling';
        const isGroup = charCount >= 3;

        // Base height calculation with 1.05x multiplier on reference sizes
        let baseHeightVh = 84; // Unified standard for standing characters
        
        if (!isStanding) {
          baseHeightVh = 74; // Kneeling is slightly smaller but still large and present
        } else if (isGroup) {
          baseHeightVh = 78; // Group scenes are slightly reduced to avoid bad overlapping, but still very large (not tiny stickers)
        }

        // Apply fallback standard on top of story.ts specific values
        let heightVh = char.heightVh || baseHeightVh;
        if (isStanding) {
          // If story has a small overridden height like 68, normalize to 84vh (standing) or 78vh (group)
          if (heightVh < 80) {
            heightVh = isGroup ? 78 : 84;
          } else {
            // Apply 5% boost to high-quality reference values
            heightVh = Math.round(heightVh * 1.05);
          }
        } else {
          // Kneeling
          heightVh = 74;
        }

        const heightStyle = `${heightVh}vh`;

        // Normalize and scale up
        let baseScale = char.scale || 1.15;
        if (isStanding) {
          if (baseScale < 1.15) {
            baseScale = 1.15;
          }
          baseScale = baseScale * 1.05; // 5% boost
        } else {
          baseScale = 1.15; // kneeling
        }

        const charScale = baseScale;

        // Speaking state: highlight active speaker, dim non-speakers
        const opacityValue = char.isSpeaking || char.isSpeaking === undefined ? 1.0 : 0.65;
        const baseScaleValue = char.isSpeaking ? 1.04 : 0.96;
        const scaleValue = baseScaleValue * charScale;

        // All characters must strictly anchor to bottom: 0 of the game field
        // This resolves any gaps and supports cropped Mom/Svetlana/Vlad/Kirill sprites perfectly
        const bottomClass = 'bottom-0';

        return (
          <motion.div
            key={`${char.id}-${char.position}`}
            className={`absolute ${bottomClass} flex flex-col justify-end items-center ${maxWidth} ${widthClass} ${positionClass}`}
            style={{ height: heightStyle }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ 
              y: char.y !== undefined ? char.y : 0, 
              x: char.x !== undefined ? char.x : 0,
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
              // object-bottom aligns the nested image strictly to the bottom edge of the box
              <img
                src={withBase(imagePath)}
                alt={`${char.name} (${char.expression})`}
                onError={() => handleImageError(char.id, char.expression)}
                className="pixelated w-full h-full object-contain object-bottom drop-shadow-[0_8px_0_rgba(0,0,0,0.5)] select-none pointer-events-none"
                referrerPolicy="no-referrer"
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};
