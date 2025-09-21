import React from 'react';
import { EMERGENCY_CONTACTS } from '../constants';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import UsersIcon from './icons/UsersIcon';
import PhoneIcon from './icons/PhoneIcon';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CrisisStep: React.FC<{ icon: React.ElementType, title: string, description: string }> = ({ icon: Icon, title, description }) => (
    <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-lavender-100 dark:bg-lavender-900/50 rounded-full flex items-center justify-center">
            <Icon className="w-6 h-6 text-lavender-600 dark:text-lavender-400" />
        </div>
        <div>
            <h4 className="font-bold text-slate-800 dark:text-slate-100">{title}</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{description}</p>
        </div>
    </div>
);

const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-6 md:p-8 max-w-4xl w-full relative transform transition-all animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 z-10"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        
        <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-lavender-800 dark:text-lavender-300">In a Crisis? You Are Not Alone.</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                If you feel you are in danger, please use these resources to get immediate help. Your safety is the most important thing.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column: Actionable Steps */}
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b dark:border-slate-600 pb-2">What To Do In a Crisis</h3>
                <CrisisStep 
                    icon={ShieldCheckIcon}
                    title="1. Find a Safe Space"
                    description="If you can, move to a location where you feel physically safe and have some privacy."
                />
                 <CrisisStep 
                    icon={UsersIcon}
                    title="2. Reach Out"
                    description="Contact a trusted friend, family member, or a professional. You don't have to go through this alone."
                />
                 <CrisisStep 
                    icon={PhoneIcon}
                    title="3. Call a Helpline"
                    description="The helplines listed here are free, confidential, and available to support you right now."
                />
            </div>

            {/* Right Column: Helplines */}
            <div className="space-y-4">
                 <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b dark:border-slate-600 pb-2">Verified Helplines</h3>
                {EMERGENCY_CONTACTS.map((contact) => (
                    <div key={contact.name} className="p-4 bg-lavender-50 dark:bg-lavender-900/50 rounded-2xl flex flex-col">
                        <div>
                            <h4 className="font-bold text-lavender-800 dark:text-lavender-300">{contact.name}</h4>
                            <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">{contact.description}</p>
                        </div>
                        <a 
                            href={`tel:${contact.phone}`} 
                            className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white font-bold text-lg rounded-lg hover:bg-red-700 transition-colors"
                        >
                            <PhoneIcon className="w-5 h-5" />
                            Call Now
                        </a>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyModal;