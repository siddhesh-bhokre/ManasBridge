
import React, { useState, useCallback } from 'react';
import type { Page, Language } from './types';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import ChatPage from './components/ChatPage';
import CheckInPage from './components/CheckInPage';
import ResourcesPage from './components/ResourcesPage';
import ProfilePage from './components/ProfilePage';
import EmergencyModal from './components/EmergencyModal';
import OnboardingModal from './components/OnboardingModal';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTheme } from './hooks/useTheme';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [language] = useLocalStorage<Language>('manasbridge-language', 'en');
  const [hasOnboarded, setHasOnboarded] = useLocalStorage<boolean>('manasbridge-onboarding-complete', false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(!hasOnboarded);

  useTheme(); // Initialize and apply the theme

  const openEmergencyModal = useCallback(() => {
    setIsEmergencyModalOpen(true);
  }, []);

  const closeEmergencyModal = useCallback(() => {
    setIsEmergencyModalOpen(false);
  }, []);

  const handleCloseOnboarding = useCallback(() => {
    setIsOnboardingOpen(false);
    setHasOnboarded(true);
  }, [setHasOnboarded]);
  
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'chat':
        return <ChatPage />;
      case 'check-in':
        return <CheckInPage />;
      case 'resources':
        return <ResourcesPage />;
      case 'profile':
        return <ProfilePage setCurrentPage={setCurrentPage} />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="bg-lavender-50 dark:bg-slate-900 min-h-screen font-sans text-slate-800 dark:text-slate-200 flex flex-col">
      <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} onEmergencyClick={openEmergencyModal} />
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
        {renderPage()}
      </main>
      <EmergencyModal isOpen={isEmergencyModalOpen} onClose={closeEmergencyModal} />
      <OnboardingModal isOpen={isOnboardingOpen} onClose={handleCloseOnboarding} />
    </div>
  );
};

export default App;