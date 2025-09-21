import React, { useState, useEffect } from 'react';

type BreathingPhase = 'in' | 'hold1' | 'out' | 'hold2';

const phaseConfig: Record<BreathingPhase, { text: string; duration: number }> = {
  in: { text: 'Breathe In', duration: 4000 },
  hold1: { text: 'Hold', duration: 4000 },
  out: { text: 'Breathe Out', duration: 4000 },
  hold2: { text: 'Hold', duration: 4000 },
};

const phaseOrder: BreathingPhase[] = ['in', 'hold1', 'out', 'hold2'];

const BreathingAnimator: React.FC = () => {
  const [phase, setPhase] = useState<BreathingPhase>('in');
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    const { duration } = phaseConfig[phase];
    
    // Countdown timer logic
    setCountdown(duration / 1000); // Start at 4
    const countdownInterval = setInterval(() => {
      setCountdown(prevCount => (prevCount > 1 ? prevCount - 1 : 1));
    }, 1000);

    // Phase change logic
    const phaseTimeout = setTimeout(() => {
      const currentIndex = phaseOrder.indexOf(phase);
      const nextIndex = (currentIndex + 1) % phaseOrder.length;
      setPhase(phaseOrder[nextIndex]);
    }, duration);

    // Cleanup function
    return () => {
      clearTimeout(phaseTimeout);
      clearInterval(countdownInterval);
    };
  }, [phase]);
  
  // Determine the scale and transition duration for the circle
  const circleScale = (phase === 'in' || phase === 'hold1') ? 'scale-100' : 'scale-50';
  const transitionDuration = (phase === 'in' || phase === 'out') ? 'duration-[4000ms]' : 'duration-200';

  return (
    <div className="flex flex-col items-center justify-center w-full h-64 bg-lavender-100 dark:bg-slate-700/50 rounded-2xl overflow-hidden p-4">
      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* Animated Circle */}
        <div
          className={`absolute w-full h-full bg-gradient-to-br from-sky-400 to-lavender-500 rounded-full transition-transform ease-in-out ${transitionDuration} ${circleScale}`}
        />
        {/* Text Overlay */}
        <div className="relative z-10 text-center">
          <p className="text-xl font-bold text-white drop-shadow-md">
            {phaseConfig[phase].text}
          </p>
          <p className="text-4xl font-extrabold text-white mt-1 drop-shadow-lg">
            {countdown}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BreathingAnimator;