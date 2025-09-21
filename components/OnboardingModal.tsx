
import React, { useState } from 'react';
import MessageSquareIcon from './icons/MessageSquareIcon';
import HeartPulseIcon from './icons/HeartPulseIcon';
import BookOpenIcon from './icons/BookOpenIcon';
import LockIcon from './icons/LockIcon';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const onboardingSteps = [
    {
        icon: ({ className, ...props }: React.ComponentProps<'div'>) => <div {...props} className={`w-12 h-12 bg-gradient-to-tr from-lavender-400 to-sky-400 rounded-full text-white flex items-center justify-center text-2xl font-bold ${className || ''}`}>M</div>,
        title: "Welcome to ManasBridge!",
        description: "Your safe, private, and supportive space to navigate your thoughts and feelings. Let's take a quick tour."
    },
    {
        icon: MessageSquareIcon,
        title: "Empathetic AI Chat",
        description: "Talk about anything on your mind. Our AI is trained to listen with understanding and without judgment, available 24/7."
    },
    {
        icon: HeartPulseIcon,
        title: "Daily Mood Check-ins",
        description: "Track your moods and journal your thoughts. Recognizing your emotional patterns is a powerful step towards wellness."
    },
    {
        icon: BookOpenIcon,
        title: "Curated Resources",
        description: "Explore helpful articles, guides, and verified helplines for when you need extra support. Knowledge is power."
    },
    {
        icon: LockIcon,
        title: "Your Privacy is Paramount",
        description: "All your data, including chats and check-ins, is stored locally and securely on your device. We see nothing."
    },
];


const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
    const [currentStep, setCurrentStep] = useState(0);

    if (!isOpen) return null;

    const handleNext = () => {
        if (currentStep < onboardingSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onClose();
        }
    };
    
    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const { icon: Icon, title, description } = onboardingSteps[currentStep];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-6 md:p-8 max-w-md w-full relative transform transition-all animate-fadeIn flex flex-col text-center">
                <div className="flex-grow">
                    <div className="flex justify-center mb-6">
                        <Icon className="w-16 h-16 text-lavender-500 dark:text-lavender-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{title}</h2>
                    <p className="mt-4 text-slate-600 dark:text-slate-300">{description}</p>
                </div>

                <div className="mt-8">
                    <div className="mb-6">
                        <div className="flex justify-end mb-1">
                            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                {currentStep + 1} / {onboardingSteps.length}
                            </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-1.5">
                            <div 
                                className="bg-lavender-500 h-1.5 rounded-full transition-all duration-500 ease-out" 
                                style={{ width: `${((currentStep + 1) / onboardingSteps.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <button
                            onClick={handleBack}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                                currentStep > 0 ? 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700' : 'text-slate-300 dark:text-slate-500 cursor-not-allowed'
                            }`}
                            disabled={currentStep === 0}
                        >
                            Back
                        </button>
                        
                        <button
                            onClick={handleNext}
                            className="px-6 py-2 bg-lavender-500 text-white font-semibold rounded-md hover:bg-lavender-600 transition-colors"
                        >
                            {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnboardingModal;