import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Activity, Gauge, Thermometer, Zap, Droplet, Wind, Radio, TrendingUp, TrendingDown, Minus } from 'lucide-react';

// Static configurations
const METRICS_CONFIG = [
  { 
    id: 'rpm',
    icon: Gauge, 
    label: 'Engine RPM', 
    unit: 'RPM',
    max: 6000,
    color: 'blue',
    colorClass: 'bg-blue-500 bg-opacity-20 text-blue-400',
    barColor: 'from-blue-500 to-blue-600'
  },
  { 
    id: 'speed',
    icon: Activity, 
    label: 'Speed', 
    unit: 'MPH',
    max: 120,
    color: 'purple',
    colorClass: 'bg-purple-500 bg-opacity-20 text-purple-400',
    barColor: 'from-purple-500 to-purple-600'
  },
  { 
    id: 'temp',
    icon: Thermometer, 
    label: 'Coolant Temp', 
    unit: '°F',
    max: 120,
    color: 'red',
    colorClass: 'bg-red-500 bg-opacity-20 text-red-400',
    barColor: 'from-red-500 to-red-600'
  },
  { 
    id: 'voltage',
    icon: Zap, 
    label: 'Voltage', 
    unit: 'V',
    max: 15,
    color: 'green',
    colorClass: 'bg-green-500 bg-opacity-20 text-green-400',
    barColor: 'from-green-500 to-green-600'
  }
];

const LIVE_STATS_CONFIG = [
  { id: 'fuel', label: 'Fuel Level', trend: 'down', icon: Droplet },
  { id: 'air', label: 'Air Intake', trend: 'neutral', icon: Wind },
  { id: 'transmission', label: 'Transmission', trend: 'neutral', icon: Radio },
  { id: 'oil', label: 'Oil Pressure', trend: 'up', icon: Droplet }
];

export default function LiveMonitoringScreen() {
  // All hooks at the top - no conditionals
  const [isLive, setIsLive] = useState(true);
  const [rpm, setRpm] = useState(2400);
  const [speed, setSpeed] = useState(65);
  const [temp, setTemp] = useState(92);
  const [voltage, setVoltage] = useState(12.6);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize on mount
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Live updates effect - simplified
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      if (!isMounted) return;
      
      setRpm(prev => {
        const change = (Math.random() - 0.5) * 200;
        return Math.max(800, Math.min(6000, prev + change));
      });
      
      setSpeed(prev => {
        const change = (Math.random() - 0.5) * 5;
        return Math.max(0, Math.min(120, prev + change));
      });
      
      setTemp(prev => {
        const change = (Math.random() - 0.5) * 2;
        return Math.max(80, Math.min(110, prev + change));
      });
      
      setVoltage(prev => {
        const change = (Math.random() - 0.5) * 0.2;
        return Math.max(11.5, Math.min(14.5, prev + change));
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isLive, isMounted]);

  // Memoized calculations
  const metrics = React.useMemo(() => {
    return METRICS_CONFIG.map(config => {
      let value = 0;
      let status = 'normal';
      
      switch (config.id) {
        case 'rpm':
          value = rpm;
          status = rpm > 4500 ? 'high' : rpm > 3000 ? 'medium' : 'normal';
          break;
        case 'speed':
          value = speed;
          status = speed > 80 ? 'high' : speed > 60 ? 'medium' : 'normal';
          break;
        case 'temp':
          value = temp;
          status = temp > 105 ? 'high' : temp > 95 ? 'medium' : 'normal';
          break;
        case 'voltage':
          value = voltage;
          status = voltage < 12 || voltage > 14 ? 'high' : 'normal';
          break;
      }
      
      const displayValue = config.id === 'voltage' ? value.toFixed(1) : Math.round(value).toString();
      const percentage = (value / config.max) * 100;
      
      return {
        ...config,
        value,
        displayValue,
        status,
        percentage: Math.min(percentage, 100)
      };
    });
  }, [rpm, speed, temp, voltage]);

  const liveStats = React.useMemo(() => {
    return LIVE_STATS_CONFIG.map(config => {
      let value = '';
      
      switch (config.id) {
        case 'fuel':
          value = '68%';
          break;
        case 'air':
          value = 'Normal';
          break;
        case 'transmission':
          value = 'D4';
          break;
        case 'oil':
          value = '45 PSI';
          break;
      }
      
      return {
        ...config,
        value
      };
    });
  }, []);

  // Event handlers
  const handleBack = useCallback(() => {
    window.history.back();
  }, []);

  const toggleLive = useCallback(() => {
    setIsLive(prev => !prev);
  }, []);

  const runDiagnostic = useCallback(() => {
    alert('Starting diagnostic scan...');
  }, []);

  const exportData = useCallback(() => {
    alert('Exporting data...');
  }, []);

  // If you're still getting the error, try this absolute minimal version first:
  // return <div>Test</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={handleBack}
            className="text-white hover:text-slate-300 transition-colors p-2 hover:bg-white/10 rounded-lg"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Live Monitoring</h1>
          <button 
            onClick={toggleLive}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              isLive 
                ? 'bg-green-500 text-white hover:bg-green-600' 
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
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
          {metrics.map((metric) => {
            const Icon = metric.icon;
            
            return (
              <div 
                key={metric.id}
                className="bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-5 border border-slate-700 shadow-xl hover:border-slate-600 transition-all duration-300"
              >
                {/* Icon and Label */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-full ${metric.colorClass.split(' ')[0]} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${metric.colorClass.split(' ')[2]}`} />
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
                    {metric.displayValue}
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
                        : `bg-gradient-to-r ${metric.barColor}`
                    }`}
                    style={{ width: `${metric.percentage}%` }}
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
          {liveStats.map((stat) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trend === 'up' ? TrendingUp : stat.trend === 'down' ? TrendingDown : Minus;
            
            return (
              <div 
                key={stat.id}
                className="bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 hover:border-slate-600 transition-all duration-300"
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
            onClick={runDiagnostic}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
          >
            Run Diagnostic
          </button>
          <button 
            onClick={exportData}
            className="bg-slate-700 text-white font-semibold py-3.5 rounded-xl hover:bg-slate-600 transition-all border border-slate-600 hover:border-slate-500"
          >
            Export Data
          </button>
        </div>
      </div>
    </div>
  );
}