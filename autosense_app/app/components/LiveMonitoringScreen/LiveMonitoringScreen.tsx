'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Activity, Gauge, Thermometer, Zap, Droplet, Wind, Radio, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { on } from 'events';

interface LiveMonitoringScreenProps {
  onBack: () => void;
  onRunDiagnostic: () => void;
}



export default function LiveMonitoringScreen({ onBack, onRunDiagnostic }: LiveMonitoringScreenProps) {
  const [isLive, setIsLive] = useState(true);
  const [rpm, setRpm] = useState(2400);
  const [speed, setSpeed] = useState(65);
  const [temp, setTemp] = useState(92);
  const [voltage, setVoltage] = useState(12.6);

  // Simulate live data updates
  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      setRpm(prev => Math.max(800, Math.min(6000, prev + (Math.random() - 0.5) * 200)));
      setSpeed(prev => Math.max(0, Math.min(120, prev + (Math.random() - 0.5) * 5)));
      setTemp(prev => Math.max(80, Math.min(110, prev + (Math.random() - 0.5) * 2)));
      setVoltage(prev => Math.max(11.5, Math.min(14.5, prev + (Math.random() - 0.5) * 0.2)));
    }, 1000);

    return () => clearInterval(interval);
  }, [isLive]);

  const metrics = [
    { 
      icon: Gauge, 
      label: 'Engine RPM', 
      value: Math.round(rpm),       // display value
      rawValue: rpm,                // ← add this
      unit: 'RPM',
      max: 6000,
      status: rpm > 4500 ? 'high' : rpm > 3000 ? 'medium' : 'normal',
      color: 'blue'
    },
    { 
      icon: Activity, 
      label: 'Speed', 
      value: Math.round(speed),
      rawValue: speed,              // ← add this
      unit: 'MPH',
      max: 120,
      status: speed > 80 ? 'high' : speed > 60 ? 'medium' : 'normal',
      color: 'purple'
    },
    { 
      icon: Thermometer, 
      label: 'Coolant Temp', 
      value: Math.round(temp),
      rawValue: temp,               // ← add this
      unit: '°F',
      max: 120,
      status: temp > 105 ? 'high' : temp > 95 ? 'medium' : 'normal',
      color: 'red'
    },
    { 
      icon: Zap, 
      label: 'Voltage', 
      value: voltage.toFixed(1),    // string for display — this was the culprit
      rawValue: voltage,            // ← add this
      unit: 'V',
      max: 15,
      status: voltage < 12 || voltage > 14 ? 'high' : 'normal',
      color: 'green'
    }
  ];

  const liveStats = [
    { label: 'Fuel Level', value: '68%', trend: 'down', icon: Droplet },
    { label: 'Air Intake', value: 'Normal', trend: 'neutral', icon: Wind },
    { label: 'Transmission', value: 'D4', trend: 'neutral', icon: Radio },
    { label: 'Oil Pressure', value: '45 PSI', trend: 'up', icon: Droplet }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={onBack}
            className="text-white hover:text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Live Monitoring</h1>
          <button 
            onClick={() => setIsLive(!isLive)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              isLive 
                ? 'bg-green-500 text-white' 
                : 'bg-slate-700 text-slate-300'
            }`}
          >
            {isLive ? 'LIVE' : 'PAUSED'}
          </button>
        </div>

        {/* Live Status Indicator */}
        <div className="flex items-center gap-2 bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-xl px-4 py-3 border border-slate-700">
          <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-slate-500'}`}></div>
          <span className="text-sm font-medium">
            {isLive ? 'Streaming real-time data...' : 'Monitoring paused'}
          </span>
        </div>
      </div>

      {/* Main Gauges Grid */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            const percentage = (metric.rawValue / metric.max) * 100;
            
            return (
              <div 
                key={index}
                className="bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-5 border border-slate-700 shadow-xl"
              >
                {/* Icon and Label */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-full bg-${metric.color}-500 bg-opacity-20 flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 text-${metric.color}-400`} />
                  </div>
                  <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                    metric.status === 'high' 
                      ? 'bg-red-500 bg-opacity-20 text-red-400' 
                      : metric.status === 'medium'
                      ? 'bg-amber-500 bg-opacity-20 text-amber-400'
                      : 'bg-green-500 bg-opacity-20 text-green-400'
                  }`}>
                    {metric.status === 'high' ? 'HIGH' : metric.status === 'medium' ? 'WARN' : 'OK'}
                  </span>
                </div>

                {/* Value Display */}
                <div className="mb-3">
                  <p className="text-3xl font-bold text-white mb-1">
                    {metric.value}
                  </p>
                  <p className="text-slate-400 text-xs">
                    {metric.label} <span className="text-slate-500">({metric.unit})</span>
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 rounded-full ${
                      metric.status === 'high' 
                        ? 'bg-gradient-to-r from-red-500 to-red-600' 
                        : metric.status === 'medium'
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600'
                        : `bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-600`
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Stats Cards */}
      <div className="px-6 mb-6">
        <h3 className="text-white font-bold text-lg mb-4">Additional Metrics</h3>
        <div className="grid grid-cols-2 gap-3">
          {liveStats.map((stat, index) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trend === 'up' ? TrendingUp : stat.trend === 'down' ? TrendingDown : Minus;
            
            return (
              <div 
                key={index}
                className="bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-4 border border-slate-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className="w-5 h-5 text-slate-400" />
                  <TrendIcon className={`w-4 h-4 ${
                    stat.trend === 'up' ? 'text-green-400' : 
                    stat.trend === 'down' ? 'text-red-400' : 
                    'text-slate-400'
                  }`} />
                </div>
                <p className="text-xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-xs text-slate-400">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Real-time Graph Placeholder */}
      <div className="px-6 mb-6">
        <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-5 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold">Performance Graph</h3>
            <select className="bg-slate-700 text-white text-sm px-3 py-1.5 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>RPM</option>
              <option>Speed</option>
              <option>Temperature</option>
              <option>Voltage</option>
            </select>
          </div>
          
          {/* Simple Graph Visualization */}
          <div className="h-32 bg-slate-900 rounded-xl relative overflow-hidden">
            <div className="absolute inset-0 flex items-end justify-around px-2 pb-2">
              {[...Array(20)].map((_, i) => {
                const height = 30 + Math.random() * 60;
                return (
                  <div 
                    key={i}
                    className="w-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t transition-all duration-500"
                    style={{ height: `${height}%` }}
                  ></div>
                );
              })}
            </div>
            <div className="absolute top-2 left-3 text-xs text-slate-500">6000</div>
            <div className="absolute bottom-2 left-3 text-xs text-slate-500">0</div>
          </div>
          
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-400">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span>Last 20 seconds</span>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="px-6 pb-8">
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={onRunDiagnostic}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
          >
            Run Diagnostic
          </button>
          <button 
            onClick={() => alert('Export Data')}
            className="bg-slate-700 text-white font-semibold py-3.5 rounded-xl hover:bg-slate-600 transition-all border border-slate-600"
          >
            Export Data
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}