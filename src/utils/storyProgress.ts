import { STORY_DATA } from '../data/story';

export interface StoryProgress {
  sceneId: string;
  dialogueIndex: number;
  isCompleted: boolean;
}

const LOCAL_STORAGE_KEY = 'vlad-birthday-story-progress';

/**
 * Safely fetches story progress from localStorage.
 * If invalid JSON or no progress exists, returns null.
 */
export function getStoryProgress(): StoryProgress | null {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return null;
    
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    
    const { sceneId, dialogueIndex, isCompleted } = parsed;
    
    // Validate types and ensure the scene actually exists in STORY_DATA
    if (
      typeof sceneId === 'string' &&
      STORY_DATA[sceneId] &&
      typeof dialogueIndex === 'number' &&
      dialogueIndex >= 0 &&
      dialogueIndex < STORY_DATA[sceneId].dialogue.length &&
      typeof isCompleted === 'boolean'
    ) {
      return { sceneId, dialogueIndex, isCompleted };
    }
  } catch (error) {
    console.warn('Failed to read story progress from localStorage:', error);
  }
  return null;
}

/**
 * Safely writes story progress to localStorage.
 */
export function saveStoryProgress(progress: StoryProgress): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.warn('Failed to save story progress to localStorage:', error);
  }
}

/**
 * Clears saved story progress from localStorage.
 */
export function clearStoryProgress(): void {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to clear story progress from localStorage:', error);
  }
}

/**
 * Marks the story as completed in localStorage while preserving key positions.
 */
export function markStoryCompleted(): void {
  try {
    const progress = getStoryProgress();
    if (progress) {
      progress.isCompleted = true;
      saveStoryProgress(progress);
    } else {
      // Create a default completed structure at the end scene 'finale'
      saveStoryProgress({
        sceneId: 'finale',
        dialogueIndex: STORY_DATA['finale'].dialogue.length - 1,
        isCompleted: true,
      });
    }
  } catch (error) {
    console.warn('Failed to mark story as completed in localStorage:', error);
  }
}
