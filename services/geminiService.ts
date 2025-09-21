import { GoogleGenAI, Chat, Content } from "@google/genai";
import { PERSONA_OPTIONS } from '../constants';
import type { PersonaName } from '../types';


const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // A simple alert for this demo app. In a real app, this would be handled more gracefully.
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const startChat = (history?: Content[]): Chat => {
  try {
    const storedPersonaId = localStorage.getItem('manasbridge-ai-persona');
    // We remove the quotes that useLocalStorage adds around the string
    const personaId: PersonaName = storedPersonaId ? JSON.parse(storedPersonaId) : 'manasbridge';

    const selectedPersona = PERSONA_OPTIONS.find(p => p.id === personaId) || PERSONA_OPTIONS[0];

    return ai.chats.create({
      model: 'gemini-2.5-flash',
      history: history,
      config: {
        systemInstruction: selectedPersona.systemInstruction,
        temperature: 0.8,
        topP: 0.9,
      },
    });
  } catch (error) {
    console.error("Error creating chat session:", error);
    // This is a fallback for when the API key is not set.
    // In a real app, you would have a more robust error handling mechanism.
    return {
      sendMessage: async () => ({ text: "I'm sorry, I'm having trouble connecting right now. Please check your connection or try again later." }),
      sendMessageStream: async function*() {
        yield { text: "I'm sorry, I'm having trouble connecting right now. Please check your connection or try again later." };
      }
    } as unknown as Chat;
  }
};