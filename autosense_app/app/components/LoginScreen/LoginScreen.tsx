import React, { useState } from 'react';
import { Activity, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import SignUpScreen from '../SignUpScreen/SignUpScreen';
import ForgotPasswordScreen from '../ForgotPasswordScreen/ForgotPasswordScreen';
import MainDashboard from '../MainDashboard/MainDashboard';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Login functionality - Navigate to Dashboard');
  };

  const handleShowSignUp = () => {
    setShowSignUp(true);
  };

  const handleShowForgotPassword = () => {
    setShowForgotPassword(true);
  };

    // If logged in, show dashboard
  if (isLoggedIn) {
    return <MainDashboard />;
  }

  // If showForgotPassword is true, render the ForgotPasswordScreen
  if (showForgotPassword) {
    return <ForgotPasswordScreen />;
  }

  // If showSignUp is true, render the SignUpScreen
  if (showSignUp) {
    return <SignUpScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Header */}
      <div className="px-8 pt-12 pb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-3 shadow-lg">
            <Activity className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-bold text-slate-900">AutoSense</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-8 py-6">
        <div className="max-w-md mx-auto">
          {/* Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-slate-600 text-base">
              Sign in to monitor your vehicle's health
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder:text-slate-400"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3.5 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder:text-slate-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">Remember me</span>
              </label>
              <button
                type="button"
                onClick={handleShowForgotPassword}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mt-6"
            >
              Sign In
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-slate-300"></div>
            <span className="text-sm text-slate-500">OR</span>
            <div className="flex-1 h-px bg-slate-300"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => alert('Google Sign In')}
              className="w-full bg-white border border-slate-300 text-slate-700 font-medium py-3.5 rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <button
              type="button"
              onClick={() => alert('Apple Sign In')}
              className="w-full bg-black text-white font-medium py-3.5 rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              Continue with Apple
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-8">
            <p className="text-slate-600">
              Don't have an account?{' '}
              <button
                onClick={handleShowSignUp}
                className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-8 py-6 text-center">
        <p className="text-xs text-slate-500">
          By signing in, you agree to our{' '}
          <button className="text-blue-600 hover:underline">Terms of Service</button>
          {' '}and{' '}
          <button className="text-blue-600 hover:underline">Privacy Policy</button>
        </p>
      </div>
    </div>
  );
}