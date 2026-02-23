import React, { useState } from 'react';
import { ArrowLeft, AlertTriangle, AlertCircle, Info, CheckCircle, Download, Share2, Filter, ChevronRight, Calendar, Clock } from 'lucide-react';

export default function ScanResultsScreen() {
  const [filterType, setFilterType] = useState('all');

  const scanInfo = {
    date: 'Jan 20, 2026',
    time: '2:34 PM',
    duration: '1m 48s',
    vehicle: 'Tesla Model 3',
    healthScore: 87
  };

  const issues = [
    {
      id: 1,
      severity: 'critical',
      code: 'P0171',
      title: 'System Too Lean (Bank 1)',
      description: 'The engine control unit has detected that the fuel mixture is too lean.',
      system: 'Engine Control',
      recommendations: [
        'Check for vacuum leaks',
        'Inspect fuel pressure',
        'Replace oxygen sensor if faulty'
      ],
      estimatedCost: '$150-$400',
      urgency: 'Address within 1 week'
    },
    {
      id: 2,
      severity: 'warning',
      code: 'C0035',
      title: 'Left Front Wheel Speed Sensor',
      description: 'Wheel speed sensor circuit malfunction detected.',
      system: 'Brake System',
      recommendations: [
        'Inspect wheel speed sensor wiring',
        'Clean sensor connections',
        'Replace sensor if damaged'
      ],
      estimatedCost: '$80-$200',
      urgency: 'Address within 2 weeks'
    },
    {
      id: 3,
      severity: 'info',
      code: 'B1342',
      title: 'ECU Malfunction',
      description: 'Minor communication error detected. May resolve automatically.',
      system: 'Electrical System',
      recommendations: [
        'Monitor system for recurring issues',
        'Reset error code',
        'Update ECU software if available'
      ],
      estimatedCost: '$0-$100',
      urgency: 'Monitor for now'
    }
  ];

  const filteredIssues = filterType === 'all' 
    ? issues 
    : issues.filter(issue => issue.severity === filterType);

  const getSeverityConfig = (severity: string) => {
    switch(severity) {
      case 'critical':
        return { 
          color: 'red', 
          bgColor: 'bg-red-50', 
          textColor: 'text-red-700',
          borderColor: 'border-red-200',
          icon: AlertTriangle,
          label: 'CRITICAL'
        };
      case 'warning':
        return { 
          color: 'amber', 
          bgColor: 'bg-amber-50', 
          textColor: 'text-amber-700',
          borderColor: 'border-amber-200',
          icon: AlertCircle,
          label: 'WARNING'
        };
      case 'info':
        return { 
          color: 'blue', 
          bgColor: 'bg-blue-50', 
          textColor: 'text-blue-700',
          borderColor: 'border-blue-200',
          icon: Info,
          label: 'INFO'
        };
      default:
        return { 
          color: 'gray', 
          bgColor: 'bg-gray-50', 
          textColor: 'text-gray-700',
          borderColor: 'border-gray-200',
          icon: Info,
          label: 'UNKNOWN'
        };
    }
  };

  const criticalCount = issues.filter(i => i.severity === 'critical').length;
  const warningCount = issues.filter(i => i.severity === 'warning').length;
  const infoCount = issues.filter(i => i.severity === 'info').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white px-6 pt-8 pb-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => alert('Navigate Back')}
            className="text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-slate-900">Scan Results</h1>
          <button 
            onClick={() => alert('More Options')}
            className="text-slate-600 hover:text-slate-900"
          >
            <Share2 className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6">
        {/* Scan Info Card */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-1">{scanInfo.vehicle}</h2>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{scanInfo.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{scanInfo.time}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-slate-900">{scanInfo.healthScore}%</div>
              <div className="text-xs text-slate-600">Health Score</div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{criticalCount}</div>
              <div className="text-xs text-slate-600">Critical</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">{warningCount}</div>
              <div className="text-xs text-slate-600">Warnings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{infoCount}</div>
              <div className="text-xs text-slate-600">Info</div>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
              filterType === 'all'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-300'
            }`}
          >
            All Issues ({issues.length})
          </button>
          <button
            onClick={() => setFilterType('critical')}
            className={`px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
              filterType === 'critical'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-300'
            }`}
          >
            Critical ({criticalCount})
          </button>
          <button
            onClick={() => setFilterType('warning')}
            className={`px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
              filterType === 'warning'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-300'
            }`}
          >
            Warnings ({warningCount})
          </button>
          <button
            onClick={() => setFilterType('info')}
            className={`px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
              filterType === 'info'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-300'
            }`}
          >
            Info ({infoCount})
          </button>
        </div>

        {/* Issues List */}
        <div className="space-y-4 mb-6">
          {filteredIssues.length > 0 ? (
            filteredIssues.map((issue) => {
              const config = getSeverityConfig(issue.severity);
              const Icon = config.icon;
              
              return (
                <button
                  key={issue.id}
                  onClick={() => alert('View Issue Details: ' + issue.code)}
                  className={`w-full bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-all border-l-4 ${config.borderColor} text-left`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`${config.bgColor} rounded-full p-2 flex-shrink-0`}>
                        <Icon className={`w-5 h-5 ${config.textColor}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-bold ${config.textColor} px-2 py-0.5 rounded ${config.bgColor}`}>
                            {config.label}
                          </span>
                          <span className="text-xs font-mono text-slate-500">{issue.code}</span>
                        </div>
                        <h3 className="font-bold text-slate-900 mb-1">{issue.title}</h3>
                        <p className="text-sm text-slate-600 mb-2">{issue.description}</p>
                        <div className="text-xs text-slate-500">
                          System: <span className="font-semibold">{issue.system}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  </div>

                  {/* Footer Info */}
                  <div className={`flex items-center justify-between pt-3 border-t ${config.borderColor}`}>
                    <div className="text-xs text-slate-600">
                      <span className="font-semibold">Urgency:</span> {issue.urgency}
                    </div>
                    <div className="text-xs font-semibold text-slate-900">
                      Est: {issue.estimatedCost}
                    </div>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="bg-white rounded-2xl p-8 text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <p className="text-slate-600">No {filterType} issues found</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={() => alert('Download Report')}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download Full Report
          </button>
          <button
            onClick={() => alert('Share Results')}
            className="w-full bg-white border-2 border-slate-300 text-slate-700 font-semibold py-4 rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Share with Mechanic
          </button>
        </div>

        {/* Recommendation Card */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
          <h3 className="font-bold text-lg mb-2">Next Steps</h3>
          <p className="text-blue-100 text-sm mb-4">
            Based on the scan results, we recommend addressing the critical issues first to maintain optimal vehicle performance.
          </p>
          <button 
            onClick={() => alert('Find Service Centers')}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-50 transition-all"
          >
            Find Service Centers
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}