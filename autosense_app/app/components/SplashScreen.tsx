'use client';

import React, { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';
import OnboardingScreens from './OnboardingScreens/OnboardingScreens';

const SplashScreen: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [showSplash, setShowSplash] = useState<boolean>(true);

  useEffect(() => {
    const timer: NodeJS.Timeout = setInterval(() => {
      setProgress((prev: number) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Hide splash screen after 500ms
          setTimeout(() => {
            setShowSplash(false);
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  // If splash screen is done, show onboarding
  if (!showSplash) {
    return <OnboardingScreens />; // Return your OnboardingScreens component here
  }

  // Otherwise show splash screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex flex-col items-center justify-center p-6">
      {/* Logo Container */}
      <div className="relative mb-8">
        {/* Pulse Animation Circle */}
        <div className="absolute inset-0 animate-ping opacity-20">
          <div className="w-32 h-32 bg-white rounded-full"></div>
        </div>

        {/* Logo */}
        <div className="relative bg-white rounded-full p-8 shadow-2xl">
          <Activity className="w-16 h-16 text-blue-600" strokeWidth={2.5} />
        </div>
      </div>

      {/* Brand Name */}
      <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">
        AutoSense
      </h1>

      <p className="text-blue-100 text-lg mb-12 font-light">
        Vehicle Diagnostic System
      </p>

      {/* Loading Bar */}
      <div className="w-64 h-1.5 bg-blue-400 bg-opacity-30 rounded-full overflow-hidden">
        <div
          className="h-full bg-white rounded-full transition-all duration-300 ease-out shadow-lg"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Loading Text */}
      <p className="text-blue-100 text-sm mt-6 animate-pulse">
        Initializing systems...
      </p>

      {/* Version */}
      <div className="absolute bottom-8">
        <p className="text-blue-200 text-xs">Version 1.0.0</p>
      </div>
    </div>
  );
};

export default SplashScreen;