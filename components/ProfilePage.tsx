
import React, { useState, useEffect, useRef } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { User, MoodEntry, Page, PersonaName } from '../types';
import { PERSONA_OPTIONS } from '../constants';
import UserIcon from './icons/UserIcon';
import LockIcon from './icons/LockIcon';
import MessageSquareIcon from './icons/MessageSquareIcon';
import HeartPulseIcon from './icons/HeartPulseIcon';
import SparklesIcon from './icons/SparklesIcon';

// A new, reusable component for displaying dismissible feedback messages.
const FeedbackMessage: React.FC<{ 
    message: string; 
    type: 'error' | 'success'; 
    onDismiss: () => void; 
}> = ({ message, type, onDismiss }) => {
    const baseClasses = "flex items-center justify-between p-3 rounded-lg text-sm transition-all animate-fadeIn my-4";
    const typeClasses = type === 'error'
        ? "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300"
        : "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300";

    return (
        <div className={`${baseClasses} ${typeClasses}`} role="alert">
            <span>{message}</span>
            <button onClick={onDismiss} className="ml-2 p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10" aria-label="Dismiss message">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>
    );
};


const AuthForm: React.FC<{
    isRegister?: boolean;
    handleRegister: (e: React.FormEvent) => void;
    handleLogin: (e: React.FormEvent) => void;
    fullName: string;
    setFullName: (value: string) => void;
    username: string;
    handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    password: string;
    setPassword: (value: string) => void;
    feedback: { text: string; type: 'error' | 'success' } | null;
    setFeedback: (feedback: { text: string; type: 'error' | 'success' } | null) => void;
    usernameError: string;
    setView: (view: 'login' | 'register') => void;
}> = ({
    isRegister,
    handleRegister,
    handleLogin,
    fullName,
    setFullName,
    username,
    handleUsernameChange,
    password,
    setPassword,
    feedback,
    setFeedback,
    usernameError,
    setView,
}) => {
    const firstInputRef = useRef<HTMLInputElement>(null);

    // Auto-focus the first input field when the form loads or changes
    useEffect(() => {
        setTimeout(() => {
            firstInputRef.current?.focus();
        }, 100);
    }, [isRegister]);

    const GoogleIcon = () => (
      <svg className="w-5 h-5" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.655-3.417-11.27-8.169l-6.571,4.819C9.656,39.663,16.318,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C39.904,36.312,44,30.651,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
      </svg>
    );

    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-12rem)] animate-fadeIn p-4">
          <div className="relative flex flex-col w-full max-w-4xl bg-white dark:bg-slate-800 shadow-2xl shadow-lavender-200/50 dark:shadow-slate-900/50 rounded-3xl md:flex-row md:space-y-0 overflow-hidden">
              {/* Left Panel - Branding */}
              <div className="relative hidden md:flex md:w-1/2 items-center justify-center p-8 text-white bg-gradient-to-br from-lavender-500 to-teal-400">
                  {/* Abstract background shapes */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full filter blur-xl"></div>
                  <div className="absolute -bottom-16 -left-12 w-40 h-40 bg-white/10 rounded-full filter blur-2xl"></div>

                  <div className="relative z-10 text-center space-y-4">
                       <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                           <div className="w-10 h-10 bg-gradient-to-br from-white/80 to-white rounded-full"></div>
                       </div>
                       <h2 className="text-4xl font-extrabold leading-tight tracking-tight">
                          A space to breathe.
                       </h2>
                       <p className="text-lg font-medium text-white/80">
                          Your journey to mental wellness starts with a single step.
                       </p>
                  </div>
              </div>

              {/* Right Panel - Form */}
              <div className="p-8 md:p-10 flex flex-col justify-center md:w-1/2">
                  <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-1">{isRegister ? 'Create Your Account' : 'Welcome Back'}</h1>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                      {isRegister ? "Join our community of support." : 'Sign in to continue your journey.'}
                  </p>
                  <form onSubmit={isRegister ? handleRegister : handleLogin} className="space-y-4">
                      {isRegister && (
                          <div>
                               <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                              <div className="relative">
                                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                  <input
                                      ref={firstInputRef}
                                      id="fullName"
                                      type="text"
                                      placeholder="e.g. Priya Sharma"
                                      value={fullName}
                                      onChange={(e) => setFullName(e.target.value)}
                                      className="w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-lavender-500 focus:border-transparent transition-shadow"
                                      autoComplete="name"
                                  />
                              </div>
                          </div>
                      )}
                      <div>
                          <label htmlFor="username" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Username</label>
                          <div className="relative">
                              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                              <input
                                  ref={!isRegister ? firstInputRef : null}
                                  id="username"
                                  type="text"
                                  placeholder={isRegister ? "e.g. priya_sharma" : "Enter your username"}
                                  value={username}
                                  onChange={handleUsernameChange}
                                  className={`w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-slate-700/50 border rounded-lg shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-transparent transition-shadow ${
                                      usernameError
                                          ? 'border-red-500 dark:border-red-500 focus:ring-red-500'
                                          : 'border-slate-300 dark:border-slate-600 focus:ring-lavender-500'
                                  }`}
                                  autoComplete="username"
                              />
                          </div>
                           {usernameError ? (
                                <p className="text-xs text-red-500 dark:text-red-400 mt-1 pl-1">{usernameError}</p>
                            ) : (
                                isRegister && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 pl-1">This is your unique login ID (no spaces).</p>
                            )}
                      </div>
                      <div>
                          <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
                          <div className="relative">
                              <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                              <input
                                  id="password"
                                  type="password"
                                  placeholder="Enter your password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-lavender-500 focus:border-transparent transition-shadow"
                                  autoComplete={isRegister ? "new-password" : "current-password"}
                              />
                          </div>
                           {isRegister && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 pl-1">Must be at least 6 characters.</p>}
                      </div>
                      
                      {feedback && <FeedbackMessage message={feedback.text} type={feedback.type} onDismiss={() => setFeedback(null)} />}

                      <button type="submit" className="w-full py-3 bg-gradient-to-r from-lavender-500 to-teal-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-lavender-500/30 active:scale-95 transition-all duration-200">
                          {isRegister ? 'Register' : 'Login'}
                      </button>
                  </form>
                  <div className="text-center mt-6">
                      <span className="text-sm text-slate-600 dark:text-slate-400">{isRegister ? 'Already have an account? ' : "Don't have an account? "}</span>
                      <button onClick={() => { setView(isRegister ? 'login' : 'register'); setFeedback(null); }} className="text-sm text-lavender-600 dark:text-lavender-400 font-semibold hover:underline">
                          {isRegister ? 'Login' : 'Register'}
                      </button>
                  </div>
                   {/* Divider and Social Logins */}
                   <div className="flex items-center my-6">
                        <div className="flex-grow border-t border-slate-300 dark:border-slate-600"></div>
                        <span className="flex-shrink mx-4 text-slate-400 dark:text-slate-500 text-sm">OR</span>
                        <div className="flex-grow border-t border-slate-300 dark:border-slate-600"></div>
                    </div>

                    <div className="space-y-3">
                        <button 
                            disabled 
                            title="Google Sign-in is coming soon!"
                            className="w-full flex items-center justify-center gap-3 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <GoogleIcon />
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Continue with Google</span>
                        </button>
                    </div>
              </div>
          </div>
      </div>
    );
};


const ProfilePage: React.FC<{ setCurrentPage?: (page: Page) => void }> = ({ setCurrentPage }) => {
  const [users, setUsers] = useLocalStorage<Record<string, User>>('manasbridge-users', {});
  const [currentUser, setCurrentUser] = useLocalStorage<string | null>('manasbridge-currentUser', null);
  
  const [view, setView] = useState<'login' | 'register' | 'profile'>('login');
  
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState<{ text: string; type: 'error' | 'success' } | null>(null);
  const [usernameError, setUsernameError] = useState('');
  
  // Account Management state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const [selectedPersona, setSelectedPersona] = useLocalStorage<PersonaName>('manasbridge-ai-persona', 'manasbridge');


  const [moodHistory] = useLocalStorage<MoodEntry[]>('manasbridge-mood-history', []);

  useEffect(() => {
    if (currentUser && users[currentUser]) {
      setView('profile');
    } else {
      if (currentUser) setCurrentUser(null);
      setView('login');
    }
  }, [currentUser, users, setCurrentUser]);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    if (/\s/.test(value)) {
        setUsernameError('Username cannot contain spaces.');
    } else {
        setUsernameError('');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    if (!fullName.trim() || !username.trim() || !password.trim()) {
      setFeedback({ text: 'All fields are required.', type: 'error' });
      return;
    }
    if (usernameError) {
      return; // Prevent submission if there's an inline validation error
    }
    if (password.length < 6) {
        setFeedback({ text: 'Password must be at least 6 characters long.', type: 'error' });
        return;
    }
    if (users[username]) {
      setFeedback({ text: 'Username is already taken.', type: 'error' });
      return;
    }
    
    const newUser: User = {
      username,
      fullName,
      password,
      language: 'en',
    };
    
    setUsers({ ...users, [username]: newUser });
    setCurrentUser(username);
    setFullName('');
    setUsername('');
    setPassword('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    const user = users[username];
    if (user && user.password === password) {
      setCurrentUser(username);
      setUsername('');
      setPassword('');
    } else {
      setFeedback({ text: 'Invalid username or password.', type: 'error' });
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setFullName('');
    setUsername('');
    setPassword('');
  };
  
   const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!currentUser || !users[currentUser]) return;

    if (users[currentUser].password !== currentPassword) {
      setFeedback({ text: "Incorrect current password.", type: 'error' });
      return;
    }
    if (newPassword.length < 6) {
      setFeedback({ text: "New password must be at least 6 characters long.", type: 'error' });
      return;
    }
    
    const updatedUser = { ...users[currentUser], password: newPassword };
    setUsers({ ...users, [currentUser]: updatedUser });
    setFeedback({ text: "Password changed successfully!", type: 'success' });
    setCurrentPassword('');
    setNewPassword('');
  };

  const handleDeleteAccount = () => {
    if (!currentUser) return;

    if (window.confirm("Are you sure you want to delete your account? This will remove your profile and settings, but will not affect other users' data. This action cannot be undone.")) {
        const newUsers = { ...users };
        delete newUsers[currentUser];
        setUsers(newUsers);
        handleLogout();
        alert("Your account has been deleted.");
    }
  };
  
  if (view === 'profile' && currentUser && users[currentUser]) {
    const userData = users[currentUser];
    const checkInCount = moodHistory.length;

    return (
      <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Profile Card */}
            <div className="lg:col-span-1 space-y-6">
                <div className="relative overflow-hidden bg-gradient-to-br from-lavender-500 to-teal-400 p-6 rounded-3xl shadow-lg text-center text-white">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full filter blur-xl"></div>
                    <div className="absolute -bottom-16 -left-12 w-40 h-40 bg-white/10 rounded-full filter blur-2xl"></div>
                    
                    <div className="relative z-10">
                        <div className="w-24 h-24 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full mx-auto flex items-center justify-center">
                            <UserIcon className="w-12 h-12 text-white" />
                        </div>
                        <h1 className="text-3xl font-extrabold mt-4">{userData.fullName}</h1>
                        <p className="text-white/80">@{userData.username}</p>
                        <div className="mt-4 p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                            <p className="text-sm font-medium text-white/90">Total Check-ins</p>
                            <div className="flex items-center justify-center gap-2 mt-1">
                                <HeartPulseIcon className="w-6 h-6"/>
                                <p className="text-2xl font-bold">{checkInCount}</p>
                            </div>
                        </div>
                    </div>
                </div>

                 <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                         <button onClick={() => setCurrentPage?.('chat')} className="w-full flex items-center gap-3 px-4 py-3 bg-sky-50 dark:bg-slate-700/50 rounded-2xl hover:bg-sky-100 dark:hover:bg-slate-700 transition-colors transform hover:scale-[1.02] duration-200">
                            <MessageSquareIcon className="w-6 h-6 text-sky-500 dark:text-sky-400" />
                            <span className="font-semibold text-slate-700 dark:text-slate-200">Start a Chat</span>
                        </button>
                         <button onClick={() => setCurrentPage?.('check-in')} className="w-full flex items-center gap-3 px-4 py-3 bg-teal-50 dark:bg-slate-700/50 rounded-2xl hover:bg-teal-100 dark:hover:bg-slate-700 transition-colors transform hover:scale-[1.02] duration-200">
                            <HeartPulseIcon className="w-6 h-6 text-teal-500 dark:text-teal-400" />
                            <span className="font-semibold text-slate-700 dark:text-slate-200">Today's Check-in</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Column: Settings */}
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-3xl shadow-lg">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 border-b dark:border-slate-700 pb-3 mb-4">Account Security</h3>
                    <form onSubmit={handleChangePassword} className="space-y-4">
                        <div className="relative">
                            <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input 
                                type="password" 
                                value={currentPassword} 
                                onChange={e => setCurrentPassword(e.target.value)}
                                placeholder="Current Password"
                                className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-lavender-500 focus:border-transparent transition-shadow"
                                autoComplete="current-password"
                            />
                        </div>
                        <div className="relative">
                            <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input 
                                type="password" 
                                value={newPassword} 
                                onChange={e => setNewPassword(e.target.value)}
                                placeholder="New Password (min. 6 characters)"
                                className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-lavender-500 focus:border-transparent transition-shadow"
                                autoComplete="new-password"
                            />
                        </div>
                        {feedback && <FeedbackMessage message={feedback.text} type={feedback.type} onDismiss={() => setFeedback(null)} />}
                        <button 
                            type="submit" 
                            className="px-5 py-2.5 bg-lavender-500 text-white text-sm font-semibold rounded-lg hover:bg-lavender-600 transition-colors shadow-sm"
                        >
                            Update Password
                        </button>
                    </form>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-3xl shadow-lg">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 border-b dark:border-slate-700 pb-3 mb-4 flex items-center gap-2">
                        <SparklesIcon className="w-6 h-6" /> AI Persona
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
                        Choose how you'd like ManasBridge to talk with you. Your choice will be applied to new chat sessions.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {PERSONA_OPTIONS.map((persona) => (
                            <button
                            key={persona.id}
                            onClick={() => setSelectedPersona(persona.id)}
                            className={`p-4 rounded-2xl text-left border-2 transition-all duration-200 flex flex-col h-full ${
                                selectedPersona === persona.id
                                ? 'border-lavender-500 bg-lavender-50 dark:bg-lavender-900/50 shadow-md ring-2 ring-lavender-500/50'
                                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                            }`}
                            >
                                <h4 className="font-bold text-slate-800 dark:text-slate-100">{persona.name}</h4>
                                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 flex-grow">{persona.description}</p>
                                <hr className="my-3 border-slate-200 dark:border-slate-600/50" />
                                <p className="text-xs text-slate-500 dark:text-slate-400 italic">e.g., "{persona.example}"</p>
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-3xl shadow-lg">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 border-b dark:border-slate-700 pb-3 mb-4">Privacy & Data</h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    All your data is stored locally. Deleting your account will remove your personal profile from this device.
                    </p>
                    <button
                    onClick={handleDeleteAccount}
                    className="mt-4 px-4 py-2 bg-red-100 text-red-700 text-sm font-medium rounded-md hover:bg-red-200 transition-colors dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-900/80"
                    >
                    Delete My Account
                    </button>
                </div>

                <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl shadow-lg">
                    <button
                        onClick={handleLogout}
                        className="w-full py-2 bg-slate-200 text-slate-800 font-bold rounded-2xl hover:bg-slate-300 transition-colors dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
      </div>
    );
  }

  // Render AuthForm for login or register views
  return (
    <div className="w-full">
        <AuthForm
          isRegister={view === 'register'}
          handleRegister={handleRegister}
          handleLogin={handleLogin}
          fullName={fullName}
          setFullName={setFullName}
          username={username}
          handleUsernameChange={handleUsernameChange}
          password={password}
          setPassword={setPassword}
          feedback={feedback}
          setFeedback={setFeedback}
          usernameError={usernameError}
          setView={(v) => setView(v)}
        />
    </div>
  );
};

export default ProfilePage;