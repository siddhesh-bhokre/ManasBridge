import React from 'react';

const Logo: React.FC<{ size?: 'sm' | 'lg' }> = ({ size = 'lg' }) => {
  const sizeClasses = size === 'lg' ? 'w-40 h-40' : 'w-8 h-8';

  return (
    <div className={`relative flex items-center justify-center flex-shrink-0 ${sizeClasses}`}>
      {size === 'lg' && (
        <div className="absolute inset-0 bg-gradient-to-tr from-teal-400 to-sky-300 rounded-full blur-2xl opacity-70 animate-pulse dark:opacity-50"></div>
      )}
      <svg viewBox="0 0 64 64" className="relative w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logoGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2dd4bf" /> {/* teal-400 */}
            <stop offset="100%" stopColor="#38bdf8" /> {/* sky-400 */}
          </linearGradient>
        </defs>
        {/* The Arch - representing the bridge of support */}
        <path
          d="M12 44 C 12 12, 52 12, 52 44"
          stroke="url(#logoGradient)"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />
        {/* The Circle - representing the mind or self */}
        <circle
          cx="32"
          cy="38"
          r="10"
          fill="url(#logoGradient)"
        />
      </svg>
    </div>
  );
};

export default Logo;
