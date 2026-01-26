import React, { useState } from 'react';
import { Activity, Gauge, History, Bell, ChevronRight, ChevronLeft } from 'lucide-react';
import LoginScreen from '../LoginScreen/LoginScreen'; // Import your LoginScreen component

// Define types for better TypeScript support
type ColorClassSet = {
  blur: string;
  gradientFrom: string;
  gradientTo: string;
  hoverFrom: string;
  hoverTo: string;
};

type Slide = {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  description: string;
  color: 'blue' | 'indigo' | 'purple' | 'green'; // Use union type instead of referencing colorClasses
};

export default function OnboardingScreens() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(true);

  // Color mapping object with proper typing
  const colorClasses: Record<'blue' | 'indigo' | 'purple' | 'green', ColorClassSet> = {
    blue: {
      blur: 'bg-blue-400',
      gradientFrom: 'from-blue-500',
      gradientTo: 'to-blue-700',
      hoverFrom: 'from-blue-600',
      hoverTo: 'to-blue-700'
    },
    indigo: {
      blur: 'bg-indigo-400',
      gradientFrom: 'from-indigo-500',
      gradientTo: 'to-indigo-700',
      hoverFrom: 'from-indigo-600',
      hoverTo: 'to-indigo-700'
    },
    purple: {
      blur: 'bg-purple-400',
      gradientFrom: 'from-purple-500',
      gradientTo: 'to-purple-700',
      hoverFrom: 'from-purple-600',
      hoverTo: 'to-purple-700'
    },
    green: {
      blur: 'bg-green-400',
      gradientFrom: 'from-green-500',
      gradientTo: 'to-green-700',
      hoverFrom: 'from-green-600',
      hoverTo: 'to-green-700'
    }
  };

  const slides: Slide[] = [
    {
      icon: Activity,
      title: "Welcome to AutoSense",
      description: "Your intelligent vehicle diagnostic companion. Monitor your vehicle's health in real-time and prevent issues before they become problems.",
      color: "blue"
    },
    {
      icon: Gauge,
      title: "Real-Time Monitoring",
      description: "Track engine performance, battery health, tire pressure, and more with live data visualization and instant insights.",
      color: "indigo"
    },
    {
      icon: History,
      title: "Complete History Tracking",
      description: "Access detailed diagnostic reports and maintenance logs. All your vehicle data stored securely in the cloud.",
      color: "purple"
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Get instant notifications about potential issues. Stay ahead with predictive maintenance recommendations.",
      color: "green"
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const skip = () => {
    setCurrentSlide(slides.length - 1);
  };

  const handleGetStarted = () => {
    setShowOnboarding(false); // Hide onboarding and show login screen
  };

  const CurrentIcon = slides[currentSlide].icon;
  const currentColor = slides[currentSlide].color;
  const currentColorClasses = colorClasses[currentColor];

  // If onboarding is done, show login screen
  if (!showOnboarding) {
    return <LoginScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Skip Button */}
      {currentSlide < slides.length - 1 && (
        <div className="absolute top-6 right-6 z-10">
          <button 
            onClick={skip}
            className="text-slate-600 hover:text-slate-900 font-medium text-sm px-4 py-2 rounded-lg hover:bg-white transition-all"
          >
            Skip
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
        {/* Icon Container */}
        <div className={`mb-12 relative animate-fadeIn`}>
          <div className={`absolute inset-0 ${currentColorClasses.blur} blur-3xl opacity-20 rounded-full`}></div>
          <div className={`relative bg-gradient-to-br ${currentColorClasses.gradientFrom} ${currentColorClasses.gradientTo} rounded-3xl p-12 shadow-2xl`}>
            <CurrentIcon className="w-24 h-24 text-white" strokeWidth={1.5} />
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center max-w-md mb-16">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            {slides[currentSlide].title}
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed">
            {slides[currentSlide].description}
          </p>
        </div>

        {/* Pagination Dots */}
        <div className="flex gap-2 mb-12">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? `w-8 ${currentColorClasses.gradientFrom.replace('from-', 'bg-')}` 
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="px-8 pb-8">
        <div className="flex gap-4">
          {/* Back Button */}
          {currentSlide > 0 && (
            <button
              onClick={prevSlide}
              className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-slate-300 text-slate-600 hover:border-slate-400 hover:bg-white transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Next/Get Started Button */}
          <button
            onClick={currentSlide === slides.length - 1 ? handleGetStarted : nextSlide}
            className={`flex-1 h-14 rounded-full font-semibold text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 ${
              currentSlide === slides.length - 1
                ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                : `bg-gradient-to-r ${currentColorClasses.gradientFrom} ${currentColorClasses.gradientTo} hover:${currentColorClasses.hoverFrom} hover:${currentColorClasses.hoverTo}`
            }`}
          >
            {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}