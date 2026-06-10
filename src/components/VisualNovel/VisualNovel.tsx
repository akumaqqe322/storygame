import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, RefreshCw, Volume2, VolumeX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { STORY_DATA } from '../../data/story';
import { Choice } from '../../types/story';
import { CharacterLayer } from './CharacterLayer';
import { DialogueBox } from './DialogueBox';
import { ChoiceList } from './ChoiceList';
import { getStoryProgress, saveStoryProgress, clearStoryProgress } from '../../utils/storyProgress';
import {
  getSoundEnabled,
  setSoundEnabled,
  playTextBlip,
  playChoiceConfirm,
  playOverlayChime,
  playImpact,
  playTransition
} from '../../utils/sound';

interface VisualNovelProps {
  onBackToMenu?: () => void;
}

export const VisualNovel: React.FC<VisualNovelProps> = () => {
  const [showCompletedOverlay, setShowCompletedOverlay] = useState<boolean>(() => {
    const progress = getStoryProgress();
    return progress !== null && progress.isCompleted;
  });

  const [currentSceneId, setCurrentSceneId] = useState<string>(() => {
    const progress = getStoryProgress();
    if (progress && !progress.isCompleted) {
      return progress.sceneId;
    }
    return 'start';
  });

  const [dialogueIndex, setDialogueIndex] = useState<number>(() => {
    const progress = getStoryProgress();
    if (progress && !progress.isCompleted) {
      return progress.dialogueIndex;
    }
    return 0;
  });

  const [isCompleted, setIsCompleted] = useState<boolean>(() => {
    const progress = getStoryProgress();
    if (progress && !progress.isCompleted) {
      return false;
    }
    return false;
  });
  
  // Visual effects state
  const [isCgFailed, setIsCgFailed] = useState<boolean>(false);
  const [isBgFailed, setIsBgFailed] = useState<boolean>(false);
  const [activeEffect, setActiveEffect] = useState<'shake' | 'flash' | 'green-flash' | 'darken' | null>(null);
  
  // Audio state (Web Audio API synthesizers)
  const [isSoundOn, setIsSoundOn] = useState<boolean>(() => getSoundEnabled());

  // Sound play helper playing authentic Web Audio waveforms
  const playSoundEffect = (type: string) => {
    if (!isSoundOn) return;
    if (type === 'клик_текста') {
      playTextBlip();
    } else if (type === 'меню_выбора' || type === 'переход_сцены' || type === 'рестарт') {
      playTransition();
    } else if (type === 'финал' || type === 'выбор_сделан') {
      playChoiceConfirm();
    } else if (type === 'shake' || type === 'flash' || type === 'green-flash') {
      playImpact();
    }
  };

  const toggleSound = () => {
    const nextVal = !isSoundOn;
    setIsSoundOn(nextVal);
    setSoundEnabled(nextVal);
  };

  const scene = STORY_DATA[currentSceneId] || STORY_DATA['start'];
  const currentStep = scene.dialogue[dialogueIndex];

  // Save story progress automatically whenever game state changes
  useEffect(() => {
    if (showCompletedOverlay) return;

    saveStoryProgress({
      sceneId: currentSceneId,
      dialogueIndex,
      isCompleted,
    });
  }, [currentSceneId, dialogueIndex, isCompleted, showCompletedOverlay]);

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

  // Trigger sound effect for cinematic overlay text layers
  useEffect(() => {
    if (currentStep?.overlayText) {
      playOverlayChime();
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
        // End of story reached: trigger final statistics presentation
        setIsCompleted(true);
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
    clearStoryProgress();
    setCurrentSceneId('start');
    setDialogueIndex(0);
    setIsCompleted(false);
    setShowCompletedOverlay(false);
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
    <div className={`relative w-full h-full bg-[#1a110a] overflow-hidden flex flex-col justify-between select-none ${
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
                <div className="w-full h-full bg-gradient-to-br from-[#24170f] via-[#1a110a] to-[#120b08] flex flex-col justify-center items-center text-center p-6 select-none bg-opacity-95">
                  <div className="border border-dashed border-[#f6c86b]/30 p-8 max-w-md bg-[#1a110a]/85 rounded-xl">
                    <span className="text-4xl block mb-3">🖼️</span>
                    <h4 className="font-press-start text-[9px] text-[#f6c86b] mb-2 leading-relaxed uppercase">
                      [Иллюстрация / CG]
                    </h4>
                    <p className="text-xs font-mono text-[#fff3d6] leading-relaxed mb-1">
                      {getFriendlyBgName(currentCg)}
                    </p>
                    <p className="text-[9px] font-mono text-[#c8aa83] bg-[#24170f] p-1.5 rounded truncate max-w-xs mx-auto border border-[#ffdca0]/5">
                      {currentCg}
                    </p>
                  </div>
                </div>
              ) : (
                <img
                  src={currentCg}
                  alt="CG Scene"
                  onError={() => setIsCgFailed(true)}
                  className="w-full h-full object-cover rounded-xl border border-[#ffdca0]/10"
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
                <div className="w-full h-full bg-gradient-to-b from-[#24170f] to-[#1a110a] flex flex-col justify-center items-center text-center p-4">
                  <div className="bg-[#1a110a]/95 px-4 py-2.5 rounded-xl border border-[#ffdca0]/10 text-xs font-mono text-[#fff3d6]">
                    🌄 Локация: <span className="text-[#f6c86b] font-bold">{getFriendlyBgName(currentBg)}</span>
                  </div>
                  <div className="text-[9px] text-[#c8aa83] font-mono mt-1.5 select-all truncate max-w-xs">
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
          <div className="absolute inset-0 bg-[#120b08]/70 mix-blend-multiply transition-opacity duration-300 pointer-events-none z-20" />
        )}
      </div>

      {/* Interface Elements Header Layer */}
      <div className="relative inset-x-0 top-0 p-4 flex justify-between items-center z-40 bg-gradient-to-b from-[#1a110a]/90 to-transparent pointer-events-auto select-none">
        
        {/* Return Button */}
        <div className="pointer-events-auto">
          <Link 
            to="/"
            className="flex items-center gap-1.5 px-3 py-2 bg-[#1a110a]/95 border border-[#ffdca0]/15 hover:border-[#ffb3c7]/60 text-[9px] font-press-start text-[#ffb3c7] hover:text-[#fff3d6] rounded-xl transition-all duration-150 cursor-pointer shadow-md uppercase whitespace-nowrap"
          >
            <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
            В меню
          </Link>
        </div>

        {/* Right Console Audio & Start Over Controllers */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={toggleSound}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#1a110a]/95 rounded-xl border border-[#ffdca0]/15 hover:border-[#ffb3c7] text-[#ffb3c7] hover:text-[#fff3d6] cursor-pointer transition-all duration-150 text-[9px] font-press-start uppercase shadow-md"
            title={isSoundOn ? 'Выключить звук' : 'Включить звук'}
          >
            {isSoundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">Звук: {isSoundOn ? 'вкл' : 'выкл'}</span>
            <span className="inline sm:hidden">{isSoundOn ? 'вкл' : 'выкл'}</span>
          </button>
          
          <button
            onClick={restartStory}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#1a110a]/95 border border-[#ffdca0]/15 hover:border-[#ffb3c7]/60 text-[9px] font-press-start text-[#c8aa83] hover:text-[#fff3d6] rounded-xl transition-all duration-150 cursor-pointer shadow-md uppercase whitespace-nowrap"
            title="Очистить прогресс и начать сначала"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Начать заново</span>
            <span className="inline sm:hidden">Заново</span>
          </button>
        </div>
      </div>

      {/* 5. Central Cinema Big Transition Overlay Text */}
      <AnimatePresence>
        {currentStep?.overlayText && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-[#1a110a]/85 backdrop-blur-xs z-30 pointer-events-none select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="text-center font-press-start text-[11px] sm:text-sm md:text-base text-[#f6c86b] px-6 font-bold uppercase tracking-widest text-shadow-lg"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              {currentStep.overlayText}
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>



      {/* 7. Dialog box layer */}
      {!isCompleted && !showChoices && (
        <DialogueBox
          key={currentSceneId + '-' + dialogueIndex}
          speaker={currentStep?.speaker}
          text={currentStep?.text || '...'}
          onNext={handleNext}
        />
      )}

      {/* 8. Choices overlays (Triggered only when forced selection is active) */}
      <AnimatePresence>
        {!isCompleted && showChoices && (
          <ChoiceList
            choices={scene.choices || []}
            onChoiceSelect={handleChoiceSelect}
          />
        )}
      </AnimatePresence>

      {/* 9. Final Stats and Navigation Screen */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div 
            className="absolute inset-0 bg-[#120b08]/95 backdrop-blur-xs z-50 flex flex-col justify-center items-center p-4 md:p-6 select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 pixel-grid opacity-20 pointer-events-none" />
            
            <motion.div 
              className="w-full max-w-xl bg-[#24170f] border-2 border-[#ffdca0]/25 rounded-2xl p-6 md:p-8 flex flex-col items-center text-center absolute select-none"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              {/* Retro Trophy Emoji */}
              <div className="text-5xl md:text-6xl mb-4 animate-bounce filter drop-shadow-[0_4px_0_rgba(0,0,0,0.5)]">
                🏆
              </div>

              {/* Heading */}
              <h2 className="font-press-start text-[10px] sm:text-xs text-[#f6c86b] mb-2 uppercase tracking-wide">
                Сюжетный режим завершён!
              </h2>
              <div className="text-[10px] font-mono text-[#c8aa83] mb-6 font-bold tracking-widest bg-[#1a110a]/80 px-3 py-1.5 rounded-lg border border-[#ffdca0]/5">
                КВЕСТ: ОДИН ДЕНЬ РОЖДЕНИЯ ВЛАДА
              </div>

              {/* Statistics Panel */}
              <div className="w-full text-left bg-[#1a110a] border border-[#ffdca0]/10 rounded-xl p-4 md:p-5 mb-6 font-mono text-xs space-y-3">
                <h3 className="font-press-start text-[8px] text-[#c8aa83] mb-2 uppercase tracking-wider">
                  СТАТИСТИКА ПРОХОЖДЕНИЯ:
                </h3>
                
                <div className="space-y-2 text-[#fff3d6]">
                  <div className="flex justify-between items-center border-b border-[#24170f] pb-1.5">
                    <span className="text-[#c8aa83]">🥗 Салат:</span>
                    <span className="text-[#ffb3c7] font-bold bg-[#ffb3c7]/10 px-2.5 py-0.5 rounded text-xs">Сделаем новый!</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-b border-[#24170f] pb-1.5">
                    <span className="text-[#c8aa83]">💍 Кольцо:</span>
                    <span className="text-[#f6c86b] font-bold bg-[#f6c86b]/10 px-2.5 py-0.5 rounded text-xs">Обнаружилось</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-b border-[#24170f] pb-1.5">
                    <span className="text-[#c8aa83]">💂 Щапка ущанка:</span>
                    <span className="text-[#ffeedc] font-bold bg-[#ffeedc]/10 px-2.5 py-0.5 rounded text-xs">Легендарно</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-b border-[#24170f] pb-1.5">
                    <span className="text-[#c8aa83]">📈 Возраст:</span>
                    <span className="text-[#f6c86b] font-bold bg-[#f6c86b]/10 px-2.5 py-0.5 rounded text-xs">27-й уровень</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[#c8aa83]">📅 Дата релиза:</span>
                    <span className="text-[#ffeedc]/70 font-semibold">11.06.1999 → 11.06.2026</span>
                  </div>
                </div>
              </div>

              {/* Navigation Action Buttons requested by user */}
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                
                {/* 1. Open Archive (Primary navigation action) */}
                <Link
                  to="/archive"
                  className="flex-1 py-3 bg-[#ffb3c7] hover:bg-[#ffa1b9] text-[#24170f] font-press-start text-[9px] md:text-[10px] border border-black/10 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-transform active:translate-y-0.5 font-bold uppercase"
                >
                  📂 Открыть альбом
                </Link>

                {/* 2. Smaller back to menu button */}
                <Link
                  to="/"
                  className="py-3 px-5 bg-[#1a110a] hover:bg-[#24170f] text-[#c8aa83] hover:text-[#fff3d6] font-press-start text-[9px] md:text-[10px] border border-[#ffdca0]/10 rounded-xl flex items-center justify-center gap-1 cursor-pointer transition-transform font-bold uppercase"
                >
                  🏠 В меню
                </Link>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completed Overlay Dialog Choice */}
      <AnimatePresence>
        {showCompletedOverlay && (
          <div className="absolute inset-0 z-50 flex flex-col justify-center items-center bg-[#1a110a]/90 backdrop-blur-md px-4 select-none">
            <motion.div 
              className="w-full max-w-md flex flex-col p-6 bg-[#24170f] border-2 border-[#ffdca0]/35 rounded-2xl shadow-xl text-center relative"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
            >
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="font-press-start text-[10px] md:text-xs text-[#f6c86b] mb-2 uppercase tracking-wide">
                История уже завершена!
              </h3>
              <p className="font-mono text-xs text-[#c8aa83] mb-6 leading-relaxed">
                Вы успешно прошли сюжетный режим. Желаете ли вы продолжить с финальной сцены, или хотите начать прохождение заново?
              </p>
              
              <div className="flex flex-col gap-3">
                {/* Continue from end */}
                <button
                  onClick={() => {
                    setShowCompletedOverlay(false);
                    setIsCompleted(true);
                    setCurrentSceneId('finale');
                    setDialogueIndex(STORY_DATA['finale'].dialogue.length - 1);
                    playSoundEffect('выбор_сделан');
                  }}
                  className="group relative w-full text-left p-4 bg-[#1a110a] hover:bg-[#ffeedc]/5 border border-[#ffdca0]/20 hover:border-[#f6c86b] rounded-xl transition-all duration-150 cursor-pointer text-xs sm:text-sm font-medium text-[#fff3d6] hover:text-[#f6c86b] flex items-center shadow-sm"
                >
                  <span className="mr-3 font-press-start text-xs text-[#c8aa83]">👉</span>
                  <span className="font-mono flex-1 leading-relaxed">
                    Продолжить с финала
                  </span>
                </button>

                {/* Restart */}
                <button
                  onClick={restartStory}
                  className="group relative w-full text-left p-4 bg-[#1a110a] hover:bg-[#ffeedc]/5 border border-[#ffdca0]/20 hover:border-[#ffb3c7] rounded-xl transition-all duration-150 cursor-pointer text-xs sm:text-sm font-medium text-[#fff3d6] hover:text-[#ffb3c7] flex items-center shadow-sm"
                >
                  <span className="mr-3 font-press-start text-xs text-[#c8aa83]">🔄</span>
                  <span className="font-mono flex-1 leading-relaxed">
                    Начать заново
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
