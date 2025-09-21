import React, { useState } from 'react';
import { EMERGENCY_CONTACTS } from '../constants';
import BreathingAnimator from './BreathingAnimator';

const resourceData: { title: string; content: React.ReactNode }[] = [
    {
        title: "Understanding Stress and Anxiety",
        content: <p>Stress is a natural response to pressure, but when it becomes overwhelming, it can turn into anxiety. Common signs include feeling nervous, restless, or tense. Simple techniques like deep breathing, mindfulness, and regular physical activity can help manage these feelings. It's important to recognize your triggers and develop healthy coping strategies.</p>
    },
    {
        title: "Guided Box Breathing Exercise",
        content: (
            <div className="space-y-4">
                <p>This simple technique can calm your nervous system. Follow the visual guide below, spending 4 seconds on each step. Repeat until you feel centered.</p>
                <BreathingAnimator />
            </div>
        )
    },
    {
        title: "Myth-busting: Mental Health in India",
        content: <p>Myth: 'Seeking help for mental health is a sign of weakness.' Fact: It takes immense courage to acknowledge you need support and to seek it. It's a sign of strength, not weakness. In India, talking about mental health is slowly becoming more common, and you are part of that positive change.</p>
    },
    {
        title: "How to Talk to Friends and Family",
        content: <p>Starting a conversation about mental health can be tough. Choose a calm, private moment. You can start by saying, 'I haven't been feeling like myself lately, and I'd like to talk about it.' Use 'I' statements to express your feelings, like 'I feel overwhelmed,' instead of 'You make me feel...'. Remember, it's okay if they don't understand immediately. The first step is opening up.</p>
    },
    {
        title: "Tips for Reducing Stigma",
        content: <p>1. Educate yourself and others about mental health. 2. Share your story if you feel comfortable. 3. Be mindful of your language; avoid using mental health conditions as adjectives (e.g., 'that's so bipolar'). 4. Show compassion for those with mental illness. Small actions can create a big impact.</p>
    }
];


const AccordionItem: React.FC<{ title: string; children: React.ReactNode; isOpen: boolean; onClick: () => void }> = ({ title, children, isOpen, onClick }) => {
    return (
        <div className="border-b border-slate-200 dark:border-slate-700">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center p-5 text-left font-semibold text-slate-800 dark:text-slate-100 hover:bg-lavender-50 dark:hover:bg-slate-700/50"
            >
                <span>{title}</span>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[30rem]' : 'max-h-0'}`}
            >
                <div className="p-5 pt-0 text-slate-600 dark:text-slate-300 leading-relaxed">
                    {children}
                </div>
            </div>
        </div>
    );
};


const ResourcesPage: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(1);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            <div>
                <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Resource Hub</h1>
                <p className="mt-2 text-slate-600 dark:text-slate-300">Information and support to help you on your journey.</p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg overflow-hidden">
                <h2 className="p-5 text-xl font-bold bg-slate-50 dark:bg-slate-900/50 border-b dark:border-slate-700">Articles & Guides</h2>
                {resourceData.map((item, index) => (
                    <AccordionItem
                        key={index}
                        title={item.title}
                        isOpen={openIndex === index}
                        onClick={() => handleToggle(index)}
                    >
                        {item.content}
                    </AccordionItem>
                ))}
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg">
                <h2 className="p-5 text-xl font-bold">Verified Helplines (India)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
                    {EMERGENCY_CONTACTS.map((contact) => (
                        <div key={contact.name} className="p-4 bg-teal-50 dark:bg-teal-900/50 border border-teal-200 dark:border-teal-800 rounded-2xl">
                            <h3 className="font-bold text-teal-800 dark:text-teal-200">{contact.name}</h3>
                            <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">{contact.description}</p>
                            <a href={`tel:${contact.phone}`} className="mt-2 inline-block font-semibold text-teal-700 dark:text-teal-300 hover:underline">
                                Call: {contact.phone}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ResourcesPage;