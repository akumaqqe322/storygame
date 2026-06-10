export interface CharacterState {
  id: 'vlad' | 'mom' | 'svetlana' | 'you';
  name: string;
  expression: string; // e.g. 'neutral', 'happy', 'sad', 'shocked', 'blush'
  position: 'left' | 'center' | 'right';
  isSpeaking?: boolean; // if true, can dim other characters
}

export interface DialogueStep {
  text: string;
  speaker?: string; // name shown in portrait label. If undefined, it acts as narrator text
  characters?: CharacterState[]; // characters shown on screen for this dialogue line
  background?: string; // background filename (or relative path in /assets/backgrounds/)
  cg?: string; // CG filename (or relative path in /assets/cg/) to override background and characters
  effect?: 'shake' | 'flash' | 'green-flash' | 'darken' | null; // special dramatic effects
  overlayText?: string; // central retro text overlays for transitions (e.g. "Утро..." or "Конец")
}

export interface Choice {
  text: string;
  nextSceneId: string;
}

export interface Scene {
  id: string;
  dialogue: DialogueStep[];
  choices?: Choice[];
  nextSceneId?: string; // direct transition if no choices are provided at the end of the scene
}
