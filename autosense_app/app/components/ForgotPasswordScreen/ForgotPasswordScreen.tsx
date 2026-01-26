import React, { useState } from 'react';
import { Activity, Mail, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import LoginScreen from '../LoginScreen/LoginScreen';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending reset email
    setEmailSent(true);
  };

  const handleResend = () => {
    alert('Reset link resent to ' + email);
  };

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  // If showLogin is true, render the LoginScreen
  if (showLogin) {
    return <LoginScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Header with Back Button */}
      <div className="px-8 pt-8 pb-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={handleShowLogin}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-2.5 shadow-lg">
              <Activity className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-8 py-6">
        <div className="max-w-md w-full">
          {!emailSent ? (
            // Request Reset Form
            <>
              {/* Icon */}
              <div className="flex justify-center mb-8">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-full p-6">
                  <Mail className="w-12 h-12 text-blue-600" strokeWidth={2} />
                </div>
              </div>

              {/* Title & Description */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-3">
                  Forgot Password?
                </h1>
                <p className="text-slate-600 text-base leading-relaxed">
                  No worries! Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              {/* Email Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
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

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  Send Reset Link
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>

              {/* Back to Login */}
              <div className="text-center mt-8">
                <button
                  onClick={handleShowLogin}
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Remember your password?{' '}
                  <span className="font-semibold text-blue-600 hover:text-blue-700">
                    Sign In
                  </span>
                </button>
              </div>
            </>
          ) : (
            // Success State
            <>
              {/* Success Icon */}
              <div className="flex justify-center mb-8">
                <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-full p-6 relative">
                  <CheckCircle className="w-12 h-12 text-green-600" strokeWidth={2} />
                  <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
                </div>
              </div>

              {/* Title & Description */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-3">
                  Check Your Email
                </h1>
                <p className="text-slate-600 text-base leading-relaxed mb-4">
                  We've sent a password reset link to
                </p>
                <p className="text-blue-600 font-semibold text-lg mb-4">
                  {email}
                </p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Click the link in the email to reset your password. If you don't see it, check your spam folder.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => alert('Opening email app...')}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
                >
                  Open Email App
                </button>

                <button
                  onClick={handleResend}
                  className="w-full bg-white border-2 border-slate-300 text-slate-700 font-semibold py-3.5 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all"
                >
                  Resend Email
                </button>
              </div>

              {/* Back to Login */}
              <div className="text-center mt-8">
                <button
                  onClick={handleShowLogin}
                  className="flex items-center justify-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mx-auto"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="font-medium">Back to Sign In</span>
                </button>
              </div>

              {/* Expiry Notice */}
              <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-xs text-amber-800 text-center">
                  <span className="font-semibold">Note:</span> This reset link will expire in 60 minutes for security reasons.
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Help Footer */}
      <div className="px-8 py-6">
        <div className="max-w-md mx-auto text-center">
          <p className="text-sm text-slate-500">
            Need help?{' '}
            <button 
              onClick={() => alert('Navigate to Support')}
              className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
            >
              Contact Support
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}