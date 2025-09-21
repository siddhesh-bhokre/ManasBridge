import React from 'react';
import { useTheme } from '../hooks/useTheme';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import ComputerDesktopIcon from './icons/ComputerDesktopIcon';
import type { Theme } from '../types';

const ThemeSwitcher: React.FC = () => {
    const [theme, setTheme] = useTheme();

    const cycleTheme = () => {
        const themes: Theme[] = ['light', 'dark', 'system'];
        const currentIndex = themes.indexOf(theme);
        const nextIndex = (currentIndex + 1) % themes.length;
        setTheme(themes[nextIndex]);
    };

    const getIcon = () => {
        switch (theme) {
            case 'light':
                return <SunIcon className="w-5 h-5" />;
            case 'dark':
                return <MoonIcon className="w-5 h-5" />;
            case 'system':
                return <ComputerDesktopIcon className="w-5 h-5" />;
            default:
                return <SunIcon className="w-5 h-5" />;
        }
    };
    
    const getTitle = () => {
        switch (theme) {
            case 'light':
                return "Switch to Dark Mode";
            case 'dark':
                return "Switch to System Preference";
            case 'system':
                return "Switch to Light Mode";
            default:
                return "Change theme";
        }
    };

    return (
        <button
            onClick={cycleTheme}
            title={getTitle()}
            className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-calm-blue-100 dark:hover:bg-slate-800 hover:text-calm-blue-600 dark:hover:text-calm-blue-300 transition-colors duration-200"
            aria-label="Toggle theme"
        >
            {getIcon()}
        </button>
    );
};

export default ThemeSwitcher;
