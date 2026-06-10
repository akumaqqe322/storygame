import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, RefreshCw, Volume2, VolumeX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { STORY_DATA } from '../../data/story';
import { Choice } from '../../types/story';
import { CharacterLayer } from './CharacterLayer';
import { DialogueBox } from './DialogueBox';
import { ChoiceList } from './ChoiceList';

interface VisualNovelProps {
  onBackToMenu?: () => void;
}

export const VisualNovel: React.FC<VisualNovelProps> = () => {
  const [currentSceneId, setCurrentSceneId] = useState<string>('start');
  const [dialogueIndex, setDialogueIndex] = useState<number>(0);
  
  // Visual effects state
  const [isCgFailed, setIsCgFailed] = useState<boolean>(false);
  const [isBgFailed, setIsBgFailed] = useState<boolean>(false);
  const [activeEffect, setActiveEffect] = useState<'shake' | 'flash' | 'green-flash' | 'darken' | null>(null);
  
  // Audio state (For atmosphere, mock sound system)
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [soundLogged, setSoundLogged] = useState<string[]>([]);

  // Sound play helper (safely logged to show premium capability)
  const playSoundEffect = (type: string) => {
    if (isMuted) return;
    setSoundLogged((prev) => [...prev.slice(-4), `🔊 [Эффект] ${type}`]);
  };

  const scene = STORY_DATA[currentSceneId] || STORY_DATA['start'];
  const currentStep = scene.dialogue[dialogueIndex];

  // Sync background/CG error state when scene or step changes
  useEffect(() => {
    setIsCgFailed(false);
    setIsBgFailed(false);
    
    // Trigger step effect if defined
    if (currentStep?.effect) {
      setActiveEffect(currentStep.effect);
      playSoundEffect(currentStep.effect);

      // Simple timeout to reset shake/falsh triggers so they can re-fire
      const timer = setTimeout(() => {
        setActiveEffect(null);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentSceneId, dialogueIndex]);

  // Is this the last dialogue line in the current scene?
  const isLastLine = dialogueIndex === scene.dialogue.length - 1;
  const showChoices = isLastLine && scene.choices && scene.choices.length > 0;

  const handleNext = () => {
    if (!isLastLine) {
      // Move to next line in the active scene
      setDialogueIndex((prev) => prev + 1);
      playSoundEffect('клик_текста');
    } else {
      // Scene ending reached
      if (scene.choices && scene.choices.length > 0) {
        // Must choose, choices overlay will handle progression
        playSoundEffect('меню_выбора');
      } else if (scene.nextSceneId) {
        // Direct transition
        setCurrentSceneId(scene.nextSceneId);
        setDialogueIndex(0);
        playSoundEffect('переход_сцены');
      } else {
        // End of story loop backing to start
        setCurrentSceneId('start');
        setDialogueIndex(0);
        playSoundEffect('финал');
      }
    }
  };

  const handleChoiceSelect = (choice: Choice) => {
    setCurrentSceneId(choice.nextSceneId);
    setDialogueIndex(0);
    playSoundEffect('выбор_сделан');
  };

  const restartStory = () => {
    setCurrentSceneId('start');
    setDialogueIndex(0);
    playSoundEffect('рестарт');
  };

  // Get fallback representation of background names
  const getFriendlyBgName = (pathStr: string) => {
    if (pathStr.includes('bedroom')) return 'Комната Влада';
    if (pathStr.includes('kitchen')) return 'Семейная кухня';
    if (pathStr.includes('birthday-room')) return 'Праздничный зал';
    if (pathStr.includes('abkhazia')) return 'Озеро Рица, Абхазия';
    if (pathStr.includes('waterfall')) return 'Горный водопад';
    return 'Новая локация';
  };

  const currentBg = currentStep?.background || '/assets/backgrounds/bg-bedroom.jpg';
  const currentCg = currentStep?.cg;

  return (
    <div className={`relative w-full h-full min-h-[500px] aspect-video max-h-[720px] mx-auto bg-slate-950 overflow-hidden border-4 border-slate-950 rounded-3xl retro-shadow-lg scanlines flex flex-col justify-between select-none ${
      activeEffect === 'shake' ? 'animate-shake' : ''
    }`}>
      
      {/* 1. Flash effect layer */}
      {activeEffect === 'flash' && <div className="animate-flash" />}
      {activeEffect === 'green-flash' && <div className="animate-green-flash" />}

      {/* 2. Visual Novel Screen Frame & Canvas */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          {currentCg ? (
            // SPECIAL CG OVERLAY (Overrides background and character sprites)
            <motion.div
              key={currentCg}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 flex items-center justify-center p-2"
            >
              {isCgFailed ? (
                // Exquisite CG fallback frame
                <div className="w-full h-full bg-gradient-to-br from-indigo-950 via-slate-950 to-pink-950 flex flex-col justify-center items-center text-center p-6 pixel-grid">
                  <div className="border-2 border-dashed border-amber-300 p-8 max-w-md bg-black/60 rounded-xl retro-shadow-sm">
                    <span className="text-4xl block mb-3">🖼️</span>
                    <h4 className="font-press-start text-[11px] text-amber-200 mb-2 leading-relaxed">
                      [ПОЛНОЭКРАННЫЙ СПЛЭШ / CG]
                    </h4>
                    <p className="text-sm font-mono text-zinc-300 leading-relaxed mb-1">
                      {getFriendlyBgName(currentCg)} (Иллюстрация)
                    </p>
                    <p className="text-[10px] font-mono text-pink-400 capitalize bg-pink-950/40 p-1.5 rounded">
                      Путь: {currentCg}
                    </p>
                  </div>
                </div>
              ) : (
                <img
                  src={currentCg}
                  alt="CG Scene"
                  onError={() => setIsCgFailed(true)}
                  className="w-full h-full object-cover rounded-2xl border-2 border-pink-100/20"
                  referrerPolicy="no-referrer"
                />
              )}
            </motion.div>
          ) : (
            // BACKDROP LAYER + CHARACTER SPRITES
            <motion.div
              key={currentBg}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              {isBgFailed ? (
                // Beautiful background fallback
                <div className="w-full h-full bg-gradient-to-b from-sky-950 to-slate-950 flex flex-col justify-center items-center text-center pixel-grid">
                  <div className="bg-black/60 px-4 py-3 rounded-lg border border-white/10 text-xs md:text-sm font-mono text-zinc-300">
                    🌄 Локация: <span className="text-cyan-300 font-bold">{getFriendlyBgName(currentBg)}</span>
                  </div>
                  <div className="text-[10px] text-zinc-500 font-mono mt-1 select-text">
                    {currentBg}
                  </div>
                </div>
              ) : (
                <img
                  src={currentBg}
                  alt={getFriendlyBgName(currentBg)}
                  onError={() => setIsBgFailed(true)}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3. Render Characters Layer ONLY if we have no active CG */}
        {!currentCg && <CharacterLayer characters={currentStep?.characters} />}

        {/* 4. Cinematic Dark Filter overlay on 'darken' effect */}
        {activeEffect === 'darken' && (
          <div className="absolute inset-0 bg-black/60 mix-blend-multiply transition-opacity duration-300 pointer-events-none z-20" />
        )}
      </div>

      {/* Interface Elements Header Layer */}
      <div className="relative inset-x-0 top-0 p-4 flex justify-between items-center z-40 bg-gradient-to-b from-slate-950/80 to-transparent pointer-events-none select-none">
        
        {/* Return Button */}
        <Link 
          to="/"
          className="pointer-events-auto flex items-center gap-2 px-3.5 py-1.5 bg-slate-950/90 border-2 border-pink-300/80 hover:border-pink-300 text-[10px] font-press-start text-pink-200 hover:text-white rounded-xl transition-all duration-150 retro-shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
          меню
        </Link>

        {/* Game Title Logo / HUD */}
        <div className="bg-slate-950/90 px-3 py-1 border-2 border-amber-300/80 rounded-xl flex items-center gap-2 retro-shadow-sm max-w-xs md:max-w-md">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-press-start text-[8px] md:text-[9px] text-amber-300 tracking-wider">
            СЮЖЕТ: {currentSceneId.toUpperCase()}
          </span>
        </div>

        {/* Console Audio Controller & Reset HUD */}
        <div className="pointer-events-auto flex gap-2">
          {/* Mock Sound Logs trigger helper */}
          <button
            onClick={() => setIsMuted((p) => !p)}
            className="p-1.5 bg-slate-950/95 rounded-lg border-2 border-slate-700 hover:border-pink-300 text-pink-300 hover:text-white cursor-pointer transition-colors"
            title={isMuted ? 'Включить звук' : 'Выключить звук'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          
          <button
            onClick={restartStory}
            className="p-1.5 bg-slate-950/95 rounded-lg border-2 border-slate-700 hover:border-pink-300 text-zinc-400 hover:text-white cursor-pointer transition-colors"
            title="Перезапустить сюжет"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5. Central Cinema Big Transition Overlay Text */}
      <AnimatePresence>
        {currentStep?.overlayText && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs z-30 pointer-events-none select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="text-center font-press-start text-xs sm:text-base md:text-xl text-amber-300 px-6 font-bold uppercase tracking-widest text-shadow-lg"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              {currentStep.overlayText}
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. Audio Logs simulation for pristine game feel */}
      {soundLogged.length > 0 && !isMuted && (
        <div className="absolute top-16 left-4 max-w-[200px] bg-black/60 rounded p-1.5 font-mono text-[9px] text-green-400 pointer-events-none z-10 space-y-0.5 border border-green-500/15">
          {soundLogged.map((log, idx) => (
            <div key={idx} className="opacity-75">{log}</div>
          ))}
        </div>
      )}

      {/* 7. Dialog box layer */}
      {!showChoices && (
        <DialogueBox
          key={currentSceneId + '-' + dialogueIndex}
          speaker={currentStep?.speaker}
          text={currentStep?.text || '...'}
          onNext={handleNext}
        />
      )}

      {/* 8. Choices overlays (Triggered only when forced selection is active) */}
      <AnimatePresence>
        {showChoices && (
          <ChoiceList
            choices={scene.choices || []}
            onChoiceSelect={handleChoiceSelect}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
