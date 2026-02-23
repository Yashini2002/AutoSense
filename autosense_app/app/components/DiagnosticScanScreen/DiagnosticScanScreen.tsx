import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, CheckCircle, Loader, AlertTriangle, Info } from 'lucide-react';

interface DiagnosticScanScreenProps {
  onBackToLiveMonitor: () => void;
  onviewReport?: () => void;
}


export default function DiagnosticScanScreen({ onBackToLiveMonitor, onviewReport }: DiagnosticScanScreenProps) {
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [currentSystem, setCurrentSystem] = useState('');

  const systems = [
    { name: 'Engine Control Module', duration: 15, status: 'completed', issues: 0 },
    { name: 'Transmission System', duration: 12, status: 'completed', issues: 0 },
    { name: 'Brake System', duration: 10, status: 'completed', issues: 1 },
    { name: 'Electrical System', duration: 18, status: 'scanning', issues: 0 },
    { name: 'Emissions Control', duration: 14, status: 'pending', issues: 0 },
    { name: 'Cooling System', duration: 11, status: 'pending', issues: 0 },
    { name: 'Fuel System', duration: 13, status: 'pending', issues: 0 },
    { name: 'Safety Systems', duration: 16, status: 'pending', issues: 0 }
  ];

  const [systemStates, setSystemStates] = useState(systems);

  useEffect(() => {
    if (isScanning && scanProgress < 100) {
      const timer = setInterval(() => {
        setScanProgress(prev => {
          const next = prev + 1;
          if (next >= 100) {
            setIsScanning(false);
            setScanComplete(true);
            return 100;
          }
          return next;
        });
      }, 100);

      return () => clearInterval(timer);
    }
  }, [isScanning, scanProgress]);

  useEffect(() => {
    if (isScanning) {
      const systemIndex = Math.floor(scanProgress / 12.5);
      if (systemIndex < systems.length) {
        setCurrentSystem(systems[systemIndex].name);
        
        setSystemStates(prev => prev.map((sys, idx) => {
          if (idx < systemIndex) return { ...sys, status: 'completed' };
          if (idx === systemIndex) return { ...sys, status: 'scanning' };
          return sys;
        }));
      }
    }
  }, [scanProgress, isScanning]);

  const startScan = () => {
    setScanProgress(0);
    setIsScanning(true);
    setScanComplete(false);
    setSystemStates(systems);
  };

  const issuesFound = systemStates.filter(s => s.issues > 0).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={onBackToLiveMonitor}
            className="text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-slate-900">Diagnostic Scan</h1>
          <div className="w-6"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6">
        {!isScanning && !scanComplete ? (
          // Pre-scan State
          <div className="text-center">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-full p-8 w-32 h-32 mx-auto mb-6 flex items-center justify-center">
              <Search className="w-16 h-16 text-blue-600" strokeWidth={2} />
            </div>
            
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Ready to Scan
            </h2>
            <p className="text-slate-600 mb-8 max-w-sm mx-auto">
              Run a comprehensive diagnostic scan to check all vehicle systems and identify potential issues.
            </p>

            <div className="bg-white rounded-2xl p-6 mb-6 shadow-md">
              <h3 className="font-bold text-slate-900 mb-4">Systems to be scanned:</h3>
              <div className="space-y-2">
                {systems.map((system, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <span className="text-slate-700 text-sm">{system.name}</span>
                    <span className="text-slate-500 text-xs">~{system.duration}s</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={startScan}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
            >
              Start Diagnostic Scan
            </button>

            <p className="text-xs text-slate-500 mt-4">
              Estimated time: ~2 minutes
            </p>
          </div>
        ) : isScanning ? (
          // Scanning State
          <div>
            <div className="bg-white rounded-2xl p-8 mb-6 shadow-lg text-center">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#e2e8f0"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#3b82f6"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - scanProgress / 100)}`}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">{scanProgress}%</p>
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Scanning in Progress
              </h2>
              <p className="text-slate-600 mb-4">
                Currently checking: <span className="font-semibold text-blue-600">{currentSystem}</span>
              </p>

              <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                <Loader className="w-4 h-4 animate-spin" />
                <span>Please wait while we analyze your vehicle...</span>
              </div>
            </div>

            {/* Systems Progress List */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="font-bold text-slate-900 mb-4">System Status</h3>
              <div className="space-y-3">
                {systemStates.map((system, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                    <div className="flex items-center gap-3">
                      {system.status === 'completed' && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                      {system.status === 'scanning' && (
                        <Loader className="w-5 h-5 text-blue-500 animate-spin" />
                      )}
                      {system.status === 'pending' && (
                        <div className="w-5 h-5 rounded-full border-2 border-slate-300"></div>
                      )}
                      <span className={`text-sm ${
                        system.status === 'completed' ? 'text-slate-700' :
                        system.status === 'scanning' ? 'text-blue-600 font-semibold' :
                        'text-slate-400'
                      }`}>
                        {system.name}
                      </span>
                    </div>
                    {system.status === 'completed' && (
                      <span className={`text-xs font-semibold ${
                        system.issues > 0 ? 'text-amber-600' : 'text-green-600'
                      }`}>
                        {system.issues > 0 ? `${system.issues} Issue` : 'OK'}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Scan Complete State
          <div>
            <div className="bg-white rounded-2xl p-8 mb-6 shadow-lg text-center">
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-600" strokeWidth={2} />
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Scan Complete!
              </h2>
              <p className="text-slate-600 mb-6">
                Diagnostic scan finished successfully
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 rounded-xl p-4">
                  <p className="text-3xl font-bold text-green-600 mb-1">
                    {systemStates.length - issuesFound}
                  </p>
                  <p className="text-sm text-green-700">Systems OK</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-4">
                  <p className="text-3xl font-bold text-amber-600 mb-1">
                    {issuesFound}
                  </p>
                  <p className="text-sm text-amber-700">Issues Found</p>
                </div>
              </div>
            </div>

            {/* Issues Summary */}
            {issuesFound > 0 && (
              <div className="bg-white rounded-2xl p-6 mb-6 shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <h3 className="font-bold text-slate-900">Issues Detected</h3>
                </div>
                <div className="space-y-3">
                  {systemStates.filter(s => s.issues > 0).map((system, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                      <span className="text-sm text-slate-700 font-medium">{system.name}</span>
                      <button 
                        onClick={() => alert('View Details')}
                        className="text-xs text-amber-600 font-semibold hover:text-amber-700"
                      >
                        View Details →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => onviewReport?.()}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
              >
                View Full Report
              </button>
              <button
                onClick={startScan}
                className="w-full bg-white border-2 border-slate-300 text-slate-700 font-semibold py-4 rounded-xl hover:bg-slate-50 transition-all"
              >
                Run New Scan
              </button>
            </div>

            {/* Info Notice */}
            <div className="mt-6 flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-900 font-medium mb-1">Scan Results Saved</p>
                <p className="text-xs text-blue-800">
                  This scan has been automatically saved to your diagnostic history.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}