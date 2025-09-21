import React from 'react';
import type { Page } from '../types';
import HomeIcon from './icons/HomeIcon';
import MessageSquareIcon from './icons/MessageSquareIcon';
import HeartPulseIcon from './icons/HeartPulseIcon';
import BookOpenIcon from './icons/BookOpenIcon';
import UserIcon from './icons/UserIcon';
import ThemeSwitcher from './ThemeSwitcher';
import Logo from './Logo';
import AlertTriangleIcon from './icons/AlertTriangleIcon';

interface NavItem {
  page: Page;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { page: 'home', label: 'Home', icon: HomeIcon },
  { page: 'chat', label: 'Chat', icon: MessageSquareIcon },
  { page: 'check-in', label: 'Check-in', icon: HeartPulseIcon },
  { page: 'resources', label: 'Resources', icon: BookOpenIcon },
  { page: 'profile', label: 'Profile', icon: UserIcon },
];

interface NavBarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  onEmergencyClick: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ currentPage, setCurrentPage, onEmergencyClick }) => {
  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200/50 dark:border-slate-800/50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Logo size="sm" />
            <span className="text-xl font-bold text-slate-800 dark:text-lavender-200">ManasBridge</span>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => setCurrentPage(item.page)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                    currentPage === item.page
                      ? 'bg-lavender-100 dark:bg-lavender-900/50 text-lavender-700 dark:text-lavender-200'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-lavender-50 dark:hover:bg-slate-800 hover:text-lavender-600 dark:hover:text-lavender-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
               <button
                onClick={onEmergencyClick}
                className="ml-4 px-4 py-2 rounded-full text-sm font-semibold bg-lavender-200 text-lavender-800 hover:bg-red-500 hover:text-white transition-colors dark:bg-lavender-800/50 dark:text-lavender-200 dark:hover:bg-red-600 dark:hover:text-white"
              >
                Find Help
              </button>
            </nav>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
       {/* Mobile Nav */}
       <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-700 shadow-t-md z-50">
          <div className="flex justify-around items-center h-16">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => setCurrentPage(item.page)}
                className={`flex flex-col items-center justify-center w-full transition-colors duration-200 rounded-lg p-1 ${
                  currentPage === item.page ? 'text-lavender-600 dark:text-lavender-400' : 'text-slate-500 dark:text-slate-400 hover:text-lavender-500 dark:hover:text-lavender-400'
                }`}
              >
                <item.icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
            <button
              onClick={onEmergencyClick}
              className="flex flex-col items-center justify-center w-full transition-colors duration-200 rounded-lg p-1 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50"
              aria-label="Find Help"
            >
              <AlertTriangleIcon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Help</span>
            </button>
          </div>
        </div>
    </header>
  );
};

export default NavBar;