import React, { useState, useRef, useEffect } from 'react';
import { Activity, ArrowLeft, Shield, ArrowRight } from 'lucide-react';
import SignUpScreen from '../SignUpScreen/SignUpScreen';

export default function OTPVerificationScreen() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false); // State for navigation
  
  // Create refs with proper HTMLInputElement type
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];
  
  const email = "john.doe@example.com";

  useEffect(() => {
    // Focus first input on mount
    inputRefs[0].current?.focus();
  }, []);

  useEffect(() => {
    // Timer countdown
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take last character
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
    
    // Focus last filled input or next empty
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs[nextIndex].current?.focus();
  };

  const handleVerify = () => {
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      alert(`Verifying OTP: ${otpValue} - Navigate to Dashboard`);
    } else {
      alert('Please enter the complete OTP');
    }
  };

  const handleResend = () => {
    if (canResend) {
      setOtp(['', '', '', '', '', '']);
      setTimer(60);
      setCanResend(false);
      inputRefs[0].current?.focus();
      alert('New OTP sent to ' + email);
    }
  };

  const handleGoBack = () => {
    setShowSignUp(true); // Navigate back to SignUpScreen
  };

  // If showSignUp is true, render the SignUpScreen
  if (showSignUp) {
    return <SignUpScreen />;
  }

  const isComplete = otp.every(digit => digit !== '');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Header with Back Button */}
      <div className="px-8 pt-8 pb-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={handleGoBack}
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
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-full p-6 relative">
              <Shield className="w-12 h-12 text-blue-600" strokeWidth={2} />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
          </div>

          {/* Title & Description */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-3">
              Verify Your Account
            </h1>
            <p className="text-slate-600 text-base leading-relaxed mb-2">
              We've sent a 6-digit verification code to
            </p>
            <p className="text-blue-600 font-semibold text-base mb-4">
              {email}
            </p>
            <button
              onClick={handleGoBack} // Changed to go back to SignUpScreen
              className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline"
            >
              Change email address?
            </button>
          </div>

          {/* OTP Input Fields */}
          <div className="mb-8">
            <div className="flex justify-center gap-3 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className={`w-14 h-14 text-center text-2xl font-bold bg-white border-2 rounded-xl focus:outline-none transition-all ${
                    digit 
                      ? 'border-blue-500 text-blue-600 ring-2 ring-blue-200' 
                      : 'border-slate-300 text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                  }`}
                />
              ))}
            </div>

            {/* Timer / Resend */}
            <div className="text-center">
              {!canResend ? (
                <p className="text-sm text-slate-600">
                  Resend code in{' '}
                  <span className="font-semibold text-blue-600">
                    {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                  </span>
                </p>
              ) : (
                <button
                  onClick={handleResend}
                  className="text-sm text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                >
                  Resend verification code
                </button>
              )}
            </div>
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={!isComplete}
            className={`w-full font-semibold py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 ${
              isComplete
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-xl'
                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
            }`}
          >
            Verify Account
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Security Notice */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex gap-3">
              <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-900 font-medium mb-1">
                  Security Tip
                </p>
                <p className="text-xs text-blue-800 leading-relaxed">
                  Never share your verification code with anyone. AutoSense will never ask for your code via phone or email.
                </p>
              </div>
            </div>
          </div>

          {/* Help Link */}
          <div className="text-center mt-8">
            <p className="text-sm text-slate-500">
              Didn't receive the code?{' '}
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

      {/* Footer */}
      <div className="px-8 py-6 text-center">
        <p className="text-xs text-slate-500">
          By verifying, you agree to our{' '}
          <button className="text-blue-600 hover:underline">Terms of Service</button>
          {' '}and{' '}
          <button className="text-blue-600 hover:underline">Privacy Policy</button>
        </p>
      </div>
    </div>
  );
}