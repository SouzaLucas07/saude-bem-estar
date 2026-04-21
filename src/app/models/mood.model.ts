export interface MoodEntry {
  date: string;
  mood: 'happy' | 'neutral' | 'sad' | 'angry';
  symptoms: string[];
  notes: string;
}