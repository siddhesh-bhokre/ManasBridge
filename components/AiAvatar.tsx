import React from 'react';

const AiAvatar: React.FC<{ size?: 'sm' | 'lg' }> = ({ size = 'lg' }) => {
  const sizeClasses = size === 'lg' ? 'w-40 h-40' : 'w-8 h-8';
  const innerSizeClasses = size === 'lg' ? 'w-24 h-24' : 'w-5 h-5';
  
  return (
    <div className={`relative ${sizeClasses} flex items-center justify-center flex-shrink-0`}>
      {/* Glowing Aura */}
      <div className="absolute inset-0 bg-gradient-to-tr from-lavender-400 to-sky-300 rounded-full blur-2xl opacity-70 animate-pulse dark:opacity-50"></div>
      {/* Core */}
      <div className={`relative ${innerSizeClasses} bg-white/50 dark:bg-slate-700/50 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20`}>
         <div className={`bg-white rounded-full ${size === 'lg' ? 'w-1/2 h-1/2' : 'w-1/2 h-1/2'}`}></div>
      </div>
    </div>
  );
};

export default AiAvatar;
