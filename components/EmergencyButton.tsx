
import React from 'react';

interface EmergencyButtonProps {
  onClick: () => void;
}

const EmergencyButton: React.FC<EmergencyButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="md:hidden fixed bottom-20 right-4 z-40 w-16 h-16 bg-red-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-600 transition-transform transform hover:scale-105"
      aria-label="Need Urgent Help?"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    </button>
  );
};

export default EmergencyButton;
