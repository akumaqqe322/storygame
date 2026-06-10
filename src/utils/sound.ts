const LOCAL_STORAGE_KEY = 'vlad-birthday-sound-enabled';

let isSoundEnabled = true;

// Initialize sound states
try {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (saved !== null) {
    isSoundEnabled = saved === 'true';
  } else {
    isSoundEnabled = true;
  }
} catch (e) {
  isSoundEnabled = true;
}

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (!isSoundEnabled) return null;
  
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  
  // Safe resume if suspended
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  
  return audioCtx;
}

export function playTextBlip() {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'triangle'; // Cozy retro sound
    osc.frequency.setValueAtTime(440, ctx.currentTime); // Standard cozy pitch
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.05);

    gainNode.gain.setValueAtTime(0.04, ctx.currentTime); // Keep it nice, quiet, and friendly
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (err) {
    // Fail silently is required for safety
  }
}

export function playChoiceConfirm() {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    // Retro warm chime/chord
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
    osc1.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // E5

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(783.99, ctx.currentTime); // G5
    osc2.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.08); // C6

    gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start();
    osc2.start();
    osc1.stop(ctx.currentTime + 0.25);
    osc2.stop(ctx.currentTime + 0.25);
  } catch (err) {
    // Fail silently
  }
}

export function playOverlayChime() {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(329.63, ctx.currentTime); // E4
    osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.15); // E5
    osc.frequency.exponentialRampToValueAtTime(987.77, ctx.currentTime + 0.3); // B5

    gainNode.gain.setValueAtTime(0.07, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  } catch (err) {
    // Fail silently
  }
}

export function playImpact() {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    // Low rumble / impact
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.2);

    gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  } catch (err) {
    // Fail silently
  }
}

export function playTransition() {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    // Soft whoosh or sweep
    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.35);

    gainNode.gain.setValueAtTime(0.03, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  } catch (err) {
    // Fail silently
  }
}

export function getSoundEnabled(): boolean {
  return isSoundEnabled;
}

export function setSoundEnabled(enabled: boolean): void {
  isSoundEnabled = enabled;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, enabled ? 'true' : 'false');
  } catch (e) {
    // Ignore Storage limits
  }

  // Attempt context initialization on first user setting interaction
  if (enabled) {
    getAudioContext();
  }
}
