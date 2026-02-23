'use client';

import React, { useState, useEffect, use } from 'react';
import { 
  Activity, Bell, Menu, Car, Gauge, Battery, Droplet, ThermometerSun, 
  AlertTriangle, CheckCircle, Clock, ChevronRight, PlayCircle, FileText, Zap,
  Settings, Wifi, WifiOff, MapPin, BatteryCharging, RefreshCw, Shield,
  BarChart3, Radio, Thermometer, Wind
} from 'lucide-react';
import LiveMonitoringScreen from '../LiveMonitoringScreen/LiveMonitoringScreen';
import DiagnosticScanScreen from '../DiagnosticScanScreen/DiagnosticScanScreen';
import ScanResultScreen from '../ScanResultScreen/ScanResultScreen';

export default function MainDashboard() {
  const [selectedVehicle, setSelectedVehicle] = useState('Tesla Model 3');
  const [healthScore, setHealthScore] = useState(87);
  const [criticalAlerts, setCriticalAlerts] = useState(2);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [userName] = useState('John Doe');
  const [notifications] = useState(3);
  const [showLiveMonitor, setShowLiveMonitor] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showVehicleSelector, setShowVehicleSelector] = useState(false);
  const [showDiagnostic, setShowDiagnostic] = useState(false);
  const [diagnosticSource, setDiagnosticSource] = useState<'dashboard' | 'livemonitor'>('dashboard');
  const [showScanResult, setShowScanResult] = useState(false);

  // Color mapping with proper Tailwind classes
  const statusColors = {
    good: { bg: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-500', gradient: 'from-emerald-400 to-emerald-500' },
    warning: { bg: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-500', gradient: 'from-amber-400 to-amber-500' },
    critical: { bg: 'bg-rose-100', text: 'text-rose-600', border: 'border-rose-500', gradient: 'from-rose-400 to-rose-500' },
    info: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-500', gradient: 'from-blue-400 to-blue-500' }
  };

  // Quick stats with fixed colors
  const quickStats = [
    { icon: Gauge, label: 'Engine', value: 'Good', status: 'good', color: 'green', colorClass: 'bg-green-100 text-green-600' },
    { icon: Battery, label: 'Battery', value: '92%', status: 'good', color: 'green', colorClass: 'bg-green-100 text-green-600' },
    { icon: Droplet, label: 'Oil Level', value: 'Low', status: 'warning', color: 'amber', colorClass: 'bg-amber-100 text-amber-600' },
    { icon: ThermometerSun, label: 'Temperature', value: 'Normal', status: 'good', color: 'blue', colorClass: 'bg-blue-100 text-blue-600' }
  ];

  // Recent issues
  const recentIssues = [
    { type: 'warning', title: 'Low Oil Level Detected', time: '2 hours ago', severity: 'medium' },
    { type: 'critical', title: 'Brake Pad Wear Alert', time: '1 day ago', severity: 'high' }
  ];

  // EXACT QUICK ACTIONS as per your specification
  const quickActions = [
    { icon: PlayCircle, label: 'Start Scan', color: 'blue', colorClass: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' },
    { icon: FileText, label: 'View Reports', color: 'indigo', colorClass: 'from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700' },
    { icon: Clock, label: 'History', color: 'purple', colorClass: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700' },
    { icon: Zap, label: 'Live Monitor', color: 'violet', colorClass: 'from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700' }
  ];

  // Simulate diagnostic scan
  const startDiagnosticScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsScanning(false);
            setHealthScore(prev => Math.min(prev + 3, 100));
            alert('Scan complete! Vehicle health updated.');
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

    if (showDiagnostic) {
    return (
      <DiagnosticScanScreen 
        onBackToLiveMonitor={() => {
          setShowDiagnostic(false);
          if (diagnosticSource === 'livemonitor') {
            setShowLiveMonitor(true);
          }
        }}
        onviewReport={() => {          // ← add this
          setShowDiagnostic(false);
          setShowScanResult(true);
        }}
      />
    );
  }

  if (showLiveMonitor) {
    return <LiveMonitoringScreen 
      onBack={() => setShowLiveMonitor(false)}
      onRunDiagnostic={() => {
        setDiagnosticSource('livemonitor');
        setShowLiveMonitor(false);
        setShowDiagnostic(true);
      }} />;
  }

  if (showScanResult) {
    return <ScanResultScreen />;
  }

  // Handle quick action clicks
  const handleQuickAction = (action: string) => {
    switch(action) {
      case 'Start Scan':
        startDiagnosticScan();
        break;
      case 'View Reports':
        setShowScanResult(true);
        setTimeout(() => alert('Opening Reports Dashboard'), 300);
        break;
      case 'History':
        setShowHistory(true);
        setTimeout(() => alert('Opening History Timeline'), 300);
        break;
      case 'Live Monitor':
        setShowLiveMonitor(true);
        break;
      default:
        alert(`Navigate to ${action}`);
    }
  };

  // Toggle vehicle selection
  const vehicles = [
    { id: 1, name: 'Tesla Model 3', status: 'connected' },
    { id: 2, name: 'Honda Civic', status: 'disconnected' },
    { id: 3, name: 'Ford F-150', status: 'offline' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 pt-8 pb-20 rounded-b-3xl shadow-xl">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={() => alert('Open Menu')}
              className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl text-white hover:bg-white/20 transition-all duration-300"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button 
                onClick={() => alert('View Notifications')}
                className="relative p-3 bg-white/10 backdrop-blur-sm rounded-2xl text-white hover:bg-white/20 transition-all duration-300"
              >
                <Bell className="w-6 h-6" />
                {criticalAlerts > 0 && (
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full text-xs font-bold flex items-center justify-center animate-pulse">
                    {criticalAlerts}
                  </span>
                )}
              </button>

              {/* User Profile */}
              <button 
                onClick={() => alert('Profile Settings')}
                className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-2xl text-white hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">JD</span>
                </div>
              </button>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-blue-100 text-sm mb-1">Welcome back,</p>
            <h1 className="text-white text-2xl font-bold">John Doe</h1>
          </div>

          {/* Vehicle Selector */}
          <div className="relative">
            <button 
              onClick={() => setShowVehicleSelector(!showVehicleSelector)}
              className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-opacity-30 transition-all w-full max-w-md"
            >
              <Car className="w-5 h-5" />
              <span className="font-medium flex-1 text-left">{selectedVehicle}</span>
              <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${showVehicleSelector ? 'rotate-90' : ''}`} />
            </button>

            {/* Vehicle Dropdown */}
            {showVehicleSelector && (
              <div className="absolute top-full mt-2 w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-slide-down">
                {vehicles.map((vehicle) => (
                  <button
                    key={vehicle.id}
                    onClick={() => {
                      setSelectedVehicle(vehicle.name);
                      setShowVehicleSelector(false);
                    }}
                    className="w-full p-4 flex items-center gap-4 hover:bg-slate-50 transition-all duration-200 border-b border-slate-100 last:border-b-0"
                  >
                    <div className={`w-3 h-3 rounded-full ${vehicle.status === 'connected' ? 'bg-emerald-400' : 'bg-slate-400'}`}></div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-slate-900">{vehicle.name}</p>
                      <p className="text-xs text-slate-500 capitalize">{vehicle.status}</p>
                    </div>
                    {selectedVehicle === vehicle.name && (
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 -mt-16 pb-8">
        <div className="max-w-6xl mx-auto">
        {/* Two Column Layout for Health Score and Critical Alerts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Health Score Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex flex-col items-center mb-6">
            <p className="text-slate-600 text-sm mb-2">Overall Health Score</p>
            <div className="relative">
                <svg className="w-48 h-48 transform -rotate-90">
                <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="#e2e8f0"
                    strokeWidth="12"
                    fill="none"
                />
                <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke={healthScore >= 80 ? '#10b981' : healthScore >= 60 ? '#f59e0b' : '#ef4444'}
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 88}`}
                    strokeDashoffset={`${2 * Math.PI * 88 * (1 - healthScore / 100)}`}
                    strokeLinecap="round"
                />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h2 className="text-5xl font-bold text-slate-900">{healthScore}%</h2>
                <CheckCircle className={`w-10 h-10 mt-2 ${healthScore >= 80 ? 'text-green-500' : healthScore >= 60 ? 'text-amber-500' : 'text-red-500'}`} />
                </div>
            </div>
            </div>
            <div className="flex justify-center">
            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl ${healthScore >= 80 ? 'bg-green-50' : healthScore >= 60 ? 'bg-amber-50' : 'bg-red-50'} max-w-xs`}>
                <div className={`w-3 h-3 rounded-full ${healthScore >= 80 ? 'bg-green-500' : healthScore >= 60 ? 'bg-amber-500' : 'bg-red-500'} animate-pulse`}></div>
                <p className={`text-sm font-medium ${healthScore >= 80 ? 'text-green-700' : healthScore >= 60 ? 'text-amber-700' : 'text-red-700'}`}>
                {healthScore >= 80 ? 'Excellent Condition' : healthScore >= 60 ? 'Minor Issues Detected' : 'Immediate Attention Required'}
                </p>
            </div>
            </div>
        </div>

        {/* Critical Alerts Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col">
            <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                <p className="text-slate-900 font-bold text-xl">Critical Alerts</p>
            </div>
            <p className="text-slate-600 text-sm">Issues requiring immediate attention</p>
            </div>

            <div className="flex-1 flex flex-col justify-center">
            {/* Alerts List */}
            <div className="space-y-4 mb-6">
                {criticalAlerts > 0 ? (
                recentIssues.map((issue, index) => (
                    <button
                    key={index}
                    onClick={() => alert('View Issue Details')}
                    className="w-full p-4 rounded-xl border-2 border-red-100 bg-red-50 hover:bg-red-100 transition-all duration-300 hover:shadow-md flex items-center gap-4"
                    >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${issue.severity === 'high' ? 'bg-red-100' : 'bg-amber-100'}`}>
                        <AlertTriangle className={`w-5 h-5 ${issue.severity === 'high' ? 'text-red-600' : 'text-amber-600'}`} />
                    </div>
                    <div className="flex-1 text-left">
                        <p className="text-slate-900 font-semibold text-sm mb-1">{issue.title}</p>
                        <p className="text-slate-500 text-xs">{issue.time}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                    </button>
                ))
                ) : (
                <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                    <p className="text-slate-900 font-medium">No Critical Alerts</p>
                    <p className="text-slate-500 text-sm mt-1">All systems are operating normally</p>
                </div>
                )}
            </div>

            {/* Alert Count and Action */}
            <div className="flex items-center justify-between">
                <div>
                <p className="text-slate-600 text-sm">Total Critical Alerts</p>
                <p className="text-3xl font-bold text-red-600">{criticalAlerts}</p>
                </div>
                <button 
                onClick={() => alert('View All Alerts')}
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                View All
                </button>
            </div>
            </div>
        </div>
        </div>

          {/* Quick Stats Grid - Fixed colors */}
          <div className="mb-8">
            <h3 className="text-slate-900 font-bold text-xl mb-6 text-center">Quick Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <button
                    key={index}
                    onClick={() => alert(`View ${stat.label} Details`)}
                    className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all flex flex-col items-center"
                  >
                    <div className={`w-12 h-12 rounded-full ${stat.colorClass.split(' ')[0]} flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 ${stat.colorClass.split(' ')[1]}`} />
                    </div>
                    <p className="text-slate-600 text-sm mb-1">{stat.label}</p>
                    <p className="text-slate-900 font-bold text-xl mb-2">{stat.value}</p>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${stat.color === 'green' ? 'bg-green-500' : stat.color === 'amber' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
                      <span className={`text-xs font-medium ${stat.color === 'green' ? 'text-green-600' : stat.color === 'amber' ? 'text-amber-600' : 'text-blue-600'} capitalize`}>{stat.status}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recent Issues */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
              <h3 className="text-slate-900 font-bold text-xl mb-3 sm:mb-0">Recent Diagnostics</h3>
              <button 
                onClick={() => alert('View All History')}
                className="text-blue-600 text-sm font-medium hover:text-blue-700 px-4 py-2 bg-blue-50 rounded-lg"
              >
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentIssues.map((issue, index) => (
                <button
                  key={index}
                  onClick={() => alert('View Issue Details')}
                  className="w-full bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all flex items-center gap-4"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    issue.severity === 'high' ? 'bg-red-100' : 'bg-amber-100'
                  }`}>
                    <AlertTriangle className={`w-6 h-6 ${
                      issue.severity === 'high' ? 'text-red-600' : 'text-amber-600'
                    }`} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-slate-900 font-semibold text-base mb-1">{issue.title}</p>
                    <p className="text-slate-500 text-sm">{issue.time}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </button>
              ))}
            </div>
          </div>

          {/* QUICK ACTIONS - EXACT AS SPECIFIED */}
          <div className="mb-8">
            <h3 className="text-slate-900 font-bold text-xl mb-6 text-center">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action.label)}
                    className={`bg-gradient-to-br ${action.colorClass} text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all flex flex-col items-center justify-center gap-3 hover:-translate-y-1`}
                  >
                    <Icon className="w-10 h-10" strokeWidth={2} />
                    <span className="font-semibold text-sm">{action.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Last Scan Info with Scan Progress */}
          <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between max-w-2xl mx-auto">
            <div className="mb-4 sm:mb-0 text-center sm:text-left">
              <p className="text-slate-600 text-sm mb-1">Last Diagnostic Scan</p>
              <p className="text-slate-900 font-semibold text-lg">3 days ago</p>
              {isScanning && (
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
                    <span className="text-sm text-blue-600">Scanning... {scanProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-300 rounded-full h-2 mt-1">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${scanProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
            <button 
              onClick={startDiagnosticScan}
              disabled={isScanning}
              className={`bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg ${
                isScanning ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-700 hover:to-blue-800'
              }`}
            >
              {isScanning ? 'Scanning...' : 'Scan Now'}
            </button>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}