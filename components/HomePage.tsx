
import React from 'react';
import type { Page } from '../types';
import MessageSquareIcon from './icons/MessageSquareIcon';
import HeartPulseIcon from './icons/HeartPulseIcon';
import BookOpenIcon from './icons/BookOpenIcon';
import Logo from './Logo';

interface HomePageProps {
  setCurrentPage: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 animate-fadeIn pt-8 md:pt-12">
      <div className="relative flex flex-col items-center">
         <Logo size="lg" />
        <div className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-8 md:p-12 rounded-3xl mt-[-3rem] z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Your safe space, anytime, anywhere.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            ManasBridge is a confidential and empathetic companion designed to support the mental wellness of India's youth.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl pt-8">
        <ActionCard
          icon={MessageSquareIcon}
          title="Start Chat"
          description="Talk about your feelings or ask questions in a safe, non-judgmental space."
          onClick={() => setCurrentPage('chat')}
          className="from-sky-400 to-sky-600"
        />
        <ActionCard
          icon={HeartPulseIcon}
          title="Check How You're Feeling"
          description="Track your mood and reflect on your day with our simple check-in tool."
          onClick={() => setCurrentPage('check-in')}
          className="from-teal-400 to-teal-600"
        />
        <ActionCard
          icon={BookOpenIcon}
          title="Get Resources"
          description="Explore articles and find verified helplines for mental health support."
          onClick={() => setCurrentPage('resources')}
          className="from-peach-400 to-orange-500"
        />
      </div>
    </div>
  );
};

interface ActionCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  onClick: () => void;
  className: string;
}

const ActionCard: React.FC<ActionCardProps> = ({ icon: Icon, title, description, onClick, className }) => (
  <button
    onClick={onClick}
    className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl dark:shadow-2xl dark:hover:shadow-lavender-900/50 transform hover:-translate-y-2 transition-all duration-300 ease-in-out text-left flex flex-col items-start"
  >
    <div className={`p-4 rounded-full bg-gradient-to-br ${className}`}>
      <Icon className="w-8 h-8 text-white" />
    </div>
    <h3 className="mt-5 text-xl font-bold text-slate-800 dark:text-slate-100">{title}</h3>
    <p className="mt-2 text-slate-600 dark:text-slate-300 flex-grow">{description}</p>
    <span className="mt-4 text-sm font-semibold text-lavender-600 dark:text-lavender-400">Explore →</span>
  </button>
);

export default HomePage;