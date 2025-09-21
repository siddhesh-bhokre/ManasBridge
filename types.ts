export type Page = 'home' | 'chat' | 'check-in' | 'resources' | 'profile';

export type Mood = 'Ecstatic' | 'Happy' | 'Okay' | 'Sad' | 'Stressed' | 'Anxious';

export interface MoodEntry {
  id: string;
  mood: Mood;
  note: string;
  date: string;
}

export type Language = 'en' | 'hi';

export type Theme = 'light' | 'dark' | 'system';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
  component?: 'mood_log';
  moodLogCompleted?: boolean;
}

export interface User {
  username: string;
  fullName: string;
  // In a real application, this would be hashed and stored on a secure server.
  // It is stored in localStorage here only for demonstration purposes.
  password?: string;
  language: Language;
}

export type PersonaName = 'manasbridge' | 'zen' | 'chirpy';

export interface Persona {
  id: PersonaName;
  name: string;
  description: string;
  systemInstruction: string;
  example: string;
}