
import React from 'react';
import { useState, useEffect } from 'react';
import type { Mood, MoodEntry } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { JOURNAL_PROMPTS, MOODS } from '../constants';
import MoodChart from './MoodChart';

const RefreshIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 2v6h6" />
        <path d="M21 12A9 9 0 0 0 6 5.3L3 8" />
        <path d="M21 22v-6h-6" />
        <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7" />
    </svg>
);

const moodColorMapping: Record<Mood, { 
    bg: string; 
    text: string; 
    ring: string; 
    shadow: string; 
}> = {
    'Ecstatic': { 
        bg: 'bg-yellow-100 dark:bg-yellow-900/30', 
        text: 'text-yellow-600 dark:text-yellow-300', 
        ring: 'ring-yellow-400/50', 
        shadow: 'shadow-yellow-500/30'
    },
    'Happy': { 
        bg: 'bg-green-100 dark:bg-green-900/30', 
        text: 'text-green-600 dark:text-green-300', 
        ring: 'ring-green-400/50', 
        shadow: 'shadow-green-500/30'
    },
    'Okay': { 
        bg: 'bg-sky-100 dark:bg-sky-900/30', 
        text: 'text-sky-600 dark:text-sky-300', 
        ring: 'ring-sky-400/50', 
        shadow: 'shadow-sky-500/30'
    },
    'Sad': { 
        bg: 'bg-indigo-100 dark:bg-indigo-900/30', 
        text: 'text-indigo-600 dark:text-indigo-300', 
        ring: 'ring-indigo-400/50', 
        shadow: 'shadow-indigo-500/30'
    },
    'Anxious': { 
        bg: 'bg-purple-100 dark:bg-purple-900/30', 
        text: 'text-purple-600 dark:text-purple-300', 
        ring: 'ring-purple-400/50', 
        shadow: 'shadow-purple-500/30'
    },
    'Stressed': { 
        bg: 'bg-red-100 dark:bg-red-900/30', 
        text: 'text-red-600 dark:text-red-300', 
        ring: 'ring-red-400/50', 
        shadow: 'shadow-red-500/30'
    },
};

const CheckInPage: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [note, setNote] = useState('');
  const [moodHistory, setMoodHistory] = useLocalStorage<MoodEntry[]>('manasbridge-mood-history', []);
  const [view, setView] = useState<'checkin' | 'history'>('checkin');
  const [prompt, setPrompt] = useState('');

  const getNewPrompt = () => {
    const newPrompt = JOURNAL_PROMPTS[Math.floor(Math.random() * JOURNAL_PROMPTS.length)];
    setPrompt(newPrompt);
  };

  useEffect(() => {
    getNewPrompt();
  }, []);

  const handleSubmit = () => {
    if (!selectedMood) {
      alert('Please select a mood.');
      return;
    }
    const newEntry: MoodEntry = {
      id: new Date().toISOString(),
      mood: selectedMood,
      note,
      date: new Date().toISOString(),
    };
    setMoodHistory([newEntry, ...moodHistory]);
    setSelectedMood(null);
    setNote('');
    getNewPrompt();
    setView('history');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
       <div className="text-center">
         <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100">Daily Check-in</h1>
         <p className="mt-2 text-slate-600 dark:text-slate-300">Track your feelings and reflect on your journey.</p>
       </div>
       <div className="flex justify-center bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm p-2 rounded-full shadow-sm">
          <button onClick={() => setView('checkin')} className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${view === 'checkin' ? 'bg-gradient-to-r from-lavender-500 to-sky-500 text-white shadow-lg' : 'text-slate-600 dark:text-slate-300'}`}>Daily Check-in</button>
          <button onClick={() => setView('history')} className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${view === 'history' ? 'bg-gradient-to-r from-teal-500 to-sky-500 text-white shadow-lg' : 'text-slate-600 dark:text-slate-300'}`}>My Insights</button>
       </div>
      
      {view === 'checkin' ? (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl shadow-lavender-200/50 dark:shadow-slate-900/50">
            <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-slate-100">How are you feeling right now?</h2>
            <div className="flex justify-center flex-wrap gap-4 my-8">
                {MOODS.map(({ mood, emoji }) => {
                    const colors = moodColorMapping[mood];
                    return (
                        <button
                            key={mood}
                            onClick={() => setSelectedMood(mood)}
                            className={`p-3 rounded-full text-4xl transform transition-all duration-300 ease-in-out ${
                                selectedMood === mood
                                ? `scale-125 ring-4 ring-offset-2 ring-offset-white dark:ring-offset-slate-800 ${colors.ring} ${colors.bg} ${colors.shadow}`
                                : `hover:scale-110 ${selectedMood ? 'opacity-50 grayscale' : 'opacity-100'}`
                            }`}
                            title={mood}
                        >
                            {emoji}
                        </button>
                    )
                })}
            </div>
            
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <label htmlFor="journal" className="font-semibold text-slate-700 dark:text-slate-200">Add a note</label>
                    <button onClick={getNewPrompt} className="flex items-center gap-1.5 px-3 py-1 text-sm bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition">
                       <RefreshIcon />
                       New Prompt
                    </button>
                </div>
                 <p className="p-4 bg-lavender-50 dark:bg-lavender-900/50 border-l-4 border-lavender-300 dark:border-lavender-700 text-slate-600 dark:text-slate-300 italic rounded-r-lg">
                    {prompt}
                 </p>
                <textarea
                id="journal"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={5}
                className="w-full p-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-2xl focus:ring-2 focus:ring-lavender-400 focus:border-lavender-400 outline-none transition text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
                placeholder="What's on your mind? Writing it down can help."
                />
            </div>

            <button
                onClick={handleSubmit}
                disabled={!selectedMood}
                className="mt-6 w-full py-3 bg-gradient-to-r from-lavender-500 to-sky-500 text-white font-bold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-lavender-500/30 transition-all duration-200 transform active:scale-95"
            >
                Save Today's Check-in
            </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl shadow-lavender-200/50 dark:shadow-slate-900/50">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Your Mood Insights</h2>
            {moodHistory.length > 0 ? (
                 <div className="space-y-6">
                    <div className="h-64 md:h-80 mt-4 rounded-2xl p-4 bg-slate-50 dark:bg-slate-900/50">
                      <MoodChart data={moodHistory} />
                    </div>
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg dark:text-slate-200">Recent Entries</h3>
                        {moodHistory.slice(0, 5).map(entry => {
                            const moodInfo = MOODS.find(m => m.mood === entry.mood);
                            const colors = moodColorMapping[entry.mood];
                            return (
                               <div key={entry.id} className={`p-4 rounded-2xl shadow-sm transition-colors ${colors.bg}`}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="text-3xl">{moodInfo?.emoji}</span>
                                            <span className={`font-bold text-lg ${colors.text}`}>{entry.mood}</span>
                                        </div>
                                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                            {new Date(entry.date).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                                        </span>
                                    </div>
                                    {entry.note && (
                                        <blockquote className="mt-3 p-3 bg-white/50 dark:bg-slate-700/50 rounded-lg border-l-4 border-slate-300 dark:border-slate-600">
                                            <p className="text-sm text-slate-700 dark:text-slate-300 italic">
                                                {entry.note}
                                            </p>
                                        </blockquote>
                                    )}
                               </div>
                            )
                        })}
                    </div>
                </div>
            ) : (
                <p className="text-center text-slate-500 dark:text-slate-400 py-12">
                    You haven't checked in yet. Start tracking your mood to see your insights here!
                </p>
            )}
        </div>
      )}
    </div>
  );
};

export default CheckInPage;