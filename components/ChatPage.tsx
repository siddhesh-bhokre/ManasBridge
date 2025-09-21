import React, { useState, useEffect, useRef, useCallback } from 'react';
import { startChat } from '../services/geminiService';
import type { Message, Mood, MoodEntry } from '../types';
import type { Chat, Content } from '@google/genai';
import { CRISIS_KEYWORDS, MOODS } from '../constants';
import EmergencyModal from './EmergencyModal';
import SendIcon from './icons/SendIcon';
import UserIcon from './icons/UserIcon';
import MicIcon from './icons/MicIcon';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Logo from './Logo';

// TypeScript definitions for the Web Speech API
interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start(): void;
    stop(): void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
    onend: () => void;
}
interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
}
// This type is part of the Web Speech API but often not included in default TypeScript DOM typings.
interface SpeechRecognitionErrorEvent extends Event {
    error: string;
    message: string;
}
declare global {
    interface Window {
        SpeechRecognition: { new(): SpeechRecognition };
        webkitSpeechRecognition: { new(): SpeechRecognition };
    }
}

const MoodLogSelector: React.FC<{ onSelectMood: (mood: Mood) => void }> = ({ onSelectMood }) => (
    <div className="mt-3 p-3 bg-sky-100 dark:bg-slate-600 rounded-2xl border border-sky-200 dark:border-slate-500">
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Would you like to log this feeling?</p>
        <div className="flex justify-center gap-2 flex-wrap">
            {MOODS.map(({ mood, emoji }) => (
                <button
                    key={mood}
                    onClick={() => onSelectMood(mood)}
                    className="p-2 rounded-full text-2xl transform transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    title={mood}
                >
                    {emoji}
                </button>
            ))}
        </div>
    </div>
);


const ChatPage: React.FC = () => {
    const [messages, setMessages] = useLocalStorage<Message[]>('manasbridge-chat-history', []);
    const [input, setInput] = useState('');
    const [chat, setChat] = useState<Chat | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isCrisis, setIsCrisis] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isVoiceSupported, setIsVoiceSupported] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const [moodHistory, setMoodHistory] = useLocalStorage<MoodEntry[]>('manasbridge-mood-history', []);

    useEffect(() => {
        // This effect runs once on mount to initialize the chat state.
        let initialMessages = [...messages];
        let stateChanged = false;

        // 1. Clean up any incomplete AI responses from the previous session.
        if (initialMessages.length > 0 && initialMessages[initialMessages.length - 1].sender === 'ai' && initialMessages[initialMessages.length - 1].text.trim() === '') {
            initialMessages.pop();
            stateChanged = true;
        }

        // 2. Add a welcome message if there are no messages.
        if (initialMessages.length === 0) {
            const welcomeMessage: Message = {
                id: 'welcome-message',
                sender: 'ai',
                text: "Hello! I'm ManasBridge, your personal wellness assistant. I'm here to listen and support you. How are you feeling today?\n\n---\nImportant: I am an AI assistant and not a substitute for professional medical advice. If you are in crisis, please seek help from a professional immediately.",
                timestamp: new Date().toISOString(),
            };
            initialMessages.push(welcomeMessage);
            stateChanged = true;
        }
        
        if (stateChanged) {
            setMessages(initialMessages);
        }
        
        const history: Content[] = initialMessages
            .filter(msg => msg.id !== 'welcome-message') // Don't include the static welcome message in history
            .map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }]
            }));

        setChat(startChat(history));

        // Setup Speech Recognition
        const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognitionAPI) {
            setIsVoiceSupported(true);
            const recognition = new SpeechRecognitionAPI();
            recognition.continuous = false;
            recognition.interimResults = true;
            recognition.lang = 'en-IN';

            recognition.onresult = (event) => {
                let transcript = '';
                for (let i = 0; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript;
                }
                setInput(transcript);
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error', event.error);
                setIsListening(false);
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognitionRef.current = recognition;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // Reset height
            const scrollHeight = textarea.scrollHeight;
            const maxHeight = 128; // Approx 5 rows

            if (scrollHeight > maxHeight) {
                textarea.style.height = `${maxHeight}px`;
                textarea.style.overflowY = 'auto';
            } else {
                textarea.style.height = `${scrollHeight}px`;
                textarea.style.overflowY = 'hidden';
            }
        }
    }, [input]);

    const checkForCrisis = (text: string): boolean => {
        const lowercasedText = text.toLowerCase();
        return CRISIS_KEYWORDS.some(keyword => lowercasedText.includes(keyword));
    };
    
    const handleMoodLog = useCallback((mood: Mood) => {
        const lastUserMessage = [...messages].reverse().find(m => m.sender === 'user');
        const newEntry: MoodEntry = {
            id: new Date().toISOString(),
            mood: mood,
            note: `From chat: "${lastUserMessage?.text || 'No specific note.'}"`,
            date: new Date().toISOString(),
        };
        setMoodHistory(prev => [newEntry, ...prev]);

        setMessages(prev =>
            prev.map(msg =>
                msg.component === 'mood_log' ? { ...msg, moodLogCompleted: true } : msg
            )
        );
    }, [messages, setMoodHistory, setMessages]);

    const handleSend = useCallback(async () => {
        if (!input.trim() || !chat || isLoading) return;

        if (checkForCrisis(input)) {
            setIsCrisis(true);
            return;
        }

        const userMessage: Message = {
            id: Date.now().toString(),
            text: input,
            sender: 'user',
            timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);
        
        const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: '',
            sender: 'ai',
            timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, aiMessage]);

        try {
            const stream = await chat.sendMessageStream({ message: currentInput });
            let fullResponse = '';
            let safetyBlock = false;
            
            for await (const chunk of stream) {
                 if (chunk.candidates?.[0]?.finishReason === 'SAFETY') {
                    safetyBlock = true;
                    break; // Exit the loop immediately
                }
                fullResponse += chunk.text;
                setMessages(prev =>
                    prev.map(msg =>
                        msg.id === aiMessage.id ? { ...msg, text: fullResponse } : msg
                    )
                );
            }

            if (safetyBlock) {
                 const safetyMessage = "I am unable to continue this conversation as it may be venturing into sensitive topics. My purpose is to provide support, and in this case, the best support I can offer is to guide you to our Resources page or the 'Find Help' section for professional assistance.";
                setMessages(prev =>
                    prev.map(msg =>
                        msg.id === aiMessage.id ? { ...msg, text: safetyMessage } : msg
                    )
                );
            } else {
                let finalResponse = fullResponse;
                let showMoodLog = false;
                if (fullResponse.includes('[SUGGEST_MOOD_LOG]')) {
                    finalResponse = fullResponse.replace('[SUGGEST_MOOD_LOG]', '').trim();
                    showMoodLog = true;
                }

                setMessages(prev =>
                    prev.map(msg => {
                        if (msg.id === aiMessage.id) {
                            return {
                                ...msg,
                                text: finalResponse,
                                component: showMoodLog ? 'mood_log' : undefined,
                                moodLogCompleted: false,
                            };
                        }
                        return msg;
                    })
                );
            }

        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: "I'm sorry, something went wrong. Please try again.",
                sender: 'ai',
                timestamp: new Date().toISOString()
            };
            setMessages(prev => [...prev.slice(0, -1), errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, [input, chat, isLoading, setMessages]);

    const handleToggleListening = () => {
        if (!recognitionRef.current) return;

        if (isListening) {
            recognitionRef.current.stop();
        } else {
            setInput('');
            recognitionRef.current.start();
        }
        setIsListening(!isListening);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-10rem)] bg-white dark:bg-slate-800 rounded-3xl shadow-lg overflow-hidden">
            <header className="p-4 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">ManasBridge Chat</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">This is a safe space. The AI is not a substitute for professional help.</p>
            </header>
            <div className="flex-1 p-4 overflow-y-auto bg-lavender-50/50 dark:bg-slate-900/50 space-y-4">
                {messages.map((message, index) => (
                    <div key={message.id} className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                        {message.sender === 'ai' && <Logo size="sm" />}
                        <div className="flex flex-col">
                            <div className={`max-w-md p-4 rounded-3xl ${message.sender === 'user' ? 'bg-gradient-to-br from-peach-400 to-lavender-400 text-white rounded-br-none animate-slideInFromRight' : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-bl-none shadow-sm animate-slideInFromLeft'}`}>
                                <p className="whitespace-pre-wrap">{message.text}{isLoading && message.sender === 'ai' && index === messages.length -1 && <span className="inline-block w-2 h-4 bg-slate-600 dark:bg-slate-400 animate-pulse ml-1" />}</p>
                                {message.component === 'mood_log' && (
                                    !message.moodLogCompleted ? (
                                        <MoodLogSelector onSelectMood={handleMoodLog} />
                                    ) : (
                                        <div className="mt-3 p-3 bg-teal-100 dark:bg-teal-900/50 rounded-2xl border border-teal-200 dark:border-teal-800">
                                            <p className="text-sm font-semibold text-teal-800 dark:text-teal-200">Thanks for sharing! I've logged that for you.</p>
                                        </div>
                                    )
                                )}
                            </div>
                            <span className={`text-xs text-slate-400 dark:text-slate-500 mt-1 ${message.sender === 'user' ? 'text-right' : 'text-left ml-1'}`}>
                                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                         {message.sender === 'user' && <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0"><UserIcon className="w-5 h-5 text-slate-500 dark:text-slate-400" /></div>}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                <div className="flex items-end gap-3">
                    <textarea
                        ref={textareaRef}
                        rows={1}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder={isListening ? "Listening..." : "Type your message here..."}
                        className="flex-1 p-3 border border-slate-300 dark:border-slate-600 rounded-2xl bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-lavender-400 focus:border-lavender-400 outline-none transition resize-none leading-tight"
                        style={{ overflowY: 'hidden' }}
                        disabled={isLoading}
                    />
                     <button
                        onClick={handleToggleListening}
                        disabled={!isVoiceSupported || isLoading}
                        className={`p-3 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors self-end ${
                            isListening 
                            ? 'bg-red-500 text-white animate-micPulse'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                        }`}
                        title={isListening ? "Stop recording" : (isVoiceSupported ? "Start recording" : "Voice input not supported")}
                    >
                        <MicIcon className="w-6 h-6" />
                    </button>
                    <button
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                        className="p-3 bg-lavender-500 text-white rounded-2xl disabled:bg-slate-300 dark:disabled:bg-slate-600 disabled:cursor-not-allowed hover:bg-lavender-600 transition-colors self-end"
                    >
                        <SendIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
            <EmergencyModal isOpen={isCrisis} onClose={() => setIsCrisis(false)} />
        </div>
    );
};

export default ChatPage;