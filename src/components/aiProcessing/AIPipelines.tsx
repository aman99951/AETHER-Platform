import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, FileVideo, FileAudio, 
  Settings, Activity, AlertCircle,
  Info, Download, RefreshCw, ChevronRight,
  Eye, PieChart, Sliders, CloudLightning, 
  Smartphone, Database, RotateCcw, Target,
  BarChart2, GitBranch, Brain, Zap, 
  CheckCircle, Layers, Maximize
} from 'lucide-react';

export default function AIPipelines() {
  const [pipelines, setPipelines] = useState({ text: true, video: false, audio: true });
  const [autoThreshold, setAutoThreshold] = useState(80);
  const [triageThreshold, setTriageThreshold] = useState(40);
  
  // New state variables for the added components
  const [uncertaintyThreshold, setUncertaintyThreshold] = useState(65);
  const [diversityWeight, setDiversityWeight] = useState(40);
  const [edgeInferenceEnabled, setEdgeInferenceEnabled] = useState(false);
  const [feedbackPercentage] = useState(72);

  const togglePipeline = (type: 'text' | 'video' | 'audio') => {
    setPipelines(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-emerald-400';
      case 'fair': return 'bg-amber-400';
      case 'poor': return 'bg-orange-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getModelDecisionBadge = (decision: string) => {
    if (decision.toLowerCase() === 'redact') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-black text-white">
          Redact
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Allow
        </span>
      );
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Pipelines & Configuration */}
          <div className="lg:flex-grow space-y-6">
            {/* Pipeline Controls */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-slate-800 to-slate-700">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-white flex items-center">
                    <Activity className="mr-2 h-5 w-5" />
                    AI Pipelines
                  </h2>
                  <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                    <Settings className="mr-1.5 h-4 w-4" />
                    Manage Pipelines
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                {[
                  { type: 'text', icon: FileText, description: 'Document processing for text-based content' },
                  { type: 'video', icon: FileVideo, description: 'Video analysis and content identification' },
                  { type: 'audio', icon: FileAudio, description: 'Speech recognition and audio processing' }
                ].map(({ type, icon: Icon, description }) => (
                  <div key={type} className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-800 p-5 rounded-xl transition-all hover:shadow-md">
                    <div className="flex items-center mb-3 sm:mb-0">
                      <div className="bg-slate-700 p-2.5 rounded-lg mr-4">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="capitalize font-medium text-white text-lg">
                          {type} Processing
                        </h3>
                        <p className="text-slate-300 text-sm mt-0.5">{description}</p>
                      </div>
                    </div>
                    <div className="sm:ml-4">
                       <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={pipelines[type as 'text' | 'video' | 'audio']} onChange={() => togglePipeline(type as 'text' | 'video' | 'audio')} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-sm font-medium text-white">{pipelines[type as 'text' | 'video' | 'audio'] ? 'Enabled' : 'Disabled'}</span>
                      </label>
                    </div>
                  </div>
                ))}

                <div className="flex justify-end mt-6">
                  <button className="px-4 py-2 text-sm bg-slate-100 text-slate-800 rounded-lg hover:bg-slate-200 transition-colors flex items-center">
                    <RefreshCw className="mr-1.5 h-4 w-4" />
                    Refresh Status
                  </button>
                </div>
              </div>
            </div>

            {/* Configuration */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Settings className="mr-2 h-5 w-5 text-gray-600" />
                 Configuration
                </h3>
                <div className="flex items-center">
                  <select className="border text-sm p-2 pr-8 rounded-lg bg-slate-50 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                    <option>Auto-val17</option>
                    <option>Triadict</option>
                    <option>Custom Profile</option>
                  </select>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid gap-4">
                  {[
                    { name: 'Case processing', status: 'Fair', icon: FileText },
                    { name: 'Video processing', status: 'Good', icon: FileVideo },
                    { name: 'Audio processing', status: 'Poor', icon: FileAudio }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center bg-white border border-gray-200 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-slate-100`}>
                          <item.icon className="h-5 w-5 text-slate-700" />
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">{item.name}</span>
                          <div className="flex items-center mt-1">
                            <span className={`inline-block w-2 h-2 rounded-full ${getStatusColor(item.status)} mr-2`}></span>
                            <span className="text-sm text-gray-500">{item.status}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <button className="text-slate-700 hover:text-slate-900 hover:bg-gray-100 p-2 rounded-full transition-colors">
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-dashed border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium text-gray-700 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1.5 text-amber-500" />
                      System Notices
                    </h4>
                    <span className="text-sm text-gray-500">Last updated: 15 min ago</span>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
                    Video processing model needs calibration. Schedule maintenance within the next 24 hours.
                  </div>
                </div>
              </div>
            </div>
            
            {/* NEW SECTION: Active Learning Tuner */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-indigo-700 to-indigo-600">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <Target className="mr-2 h-5 w-5" />
                    Active Learning Tuner
                  </h3>
                  <Link 
                    to="/ai/active-learning-tuner"
                    className="px-4 py-2 text-sm bg-white text-indigo-700 rounded-lg hover:bg-indigo-50 transition-colors flex items-center"
                  >
                    <Maximize className="mr-1.5 h-4 w-4" />
                    Advanced View
                  </Link>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">Model Uncertainty Threshold</h4>
                      <p className="text-xs text-gray-500 mt-1">
                        Cases with uncertainty above this threshold will be prioritized for expert review
                      </p>
                    </div>
                    <div className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-1 rounded-full">
                      {uncertaintyThreshold}%
                    </div>
                  </div>
                  
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={uncertaintyThreshold}
                    onChange={(e) => setUncertaintyThreshold(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="bg-green-50 border border-green-100 rounded-lg p-3 flex flex-col items-center justify-center">
                      <span className="text-xs text-gray-500">Low Uncertainty</span>
                      <span className="text-lg font-bold text-green-600">25%</span>
                      <span className="text-xs text-gray-500">of cases</span>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3 flex flex-col items-center justify-center">
                      <span className="text-xs text-gray-500">Medium</span>
                      <span className="text-lg font-bold text-yellow-600">42%</span>
                      <span className="text-xs text-gray-500">of cases</span>
                    </div>
                    <div className="bg-red-50 border border-red-100 rounded-lg p-3 flex flex-col items-center justify-center">
                      <span className="text-xs text-gray-500">High Uncertainty</span>
                      <span className="text-lg font-bold text-red-600">33%</span>
                      <span className="text-xs text-gray-500">of cases</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-6">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">Diversity Weight</h4>
                      <p className="text-xs text-gray-500 mt-1">
                        Balance between uncertainty sampling and diversity for review queue prioritization
                      </p>
                    </div>
                    <div className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-1 rounded-full">
                      {diversityWeight}%
                    </div>
                  </div>
                  
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={diversityWeight}
                    onChange={(e) => setDiversityWeight(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Prioritize uncertainty</span>
                    <span>Prioritize diversity</span>
                  </div>
                </div>
                
                <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Brain className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-indigo-800">Active Learning Status</h4>
                      <p className="text-xs text-indigo-600 mt-1">
                        Currently prioritizing high uncertainty cases in document classification with focus on PII detection
                      </p>
                      <div className="mt-2 flex items-center">
                        <span className="text-xs text-indigo-800 font-medium">Last model update:</span>
                        <span className="text-xs text-indigo-700 ml-1">2 hours ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* NEW SECTION: Edge Inference Toggle */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Smartphone className="mr-2 h-5 w-5 text-gray-600" />
                  Edge Inference
                </h3>
                <Link
                  to="/ai/edge-inference-toggle"
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center"
                >
                  Configure <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2.5 rounded-lg mr-3">
                      <CloudLightning className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">Edge Processing</h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Run inference directly on edge devices for faster processing
                      </p>
                    </div>
                  </div>
                  
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={edgeInferenceEnabled} 
                      onChange={() => setEdgeInferenceEnabled(!edgeInferenceEnabled)} 
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="ml-3 text-sm font-medium text-gray-700">
                      {edgeInferenceEnabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </label>
                </div>
                
                {edgeInferenceEnabled && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600">Edge Devices</span>
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">3 active</span>
                        </div>
                        <div className="mt-1 text-lg font-bold text-gray-900">5</div>
                      </div>
                      <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600">Latency</span>
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">-68%</span>
                        </div>
                        <div className="mt-1 text-lg font-bold text-gray-900">76ms</div>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3 text-sm text-yellow-800">
                      <div className="flex">
                        <AlertCircle className="h-5 w-5 mr-2 text-yellow-600" />
                        <span>Edge inference is in testing mode. Some features may be limited.</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {!edgeInferenceEnabled && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                    <Database className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      Edge inference is currently disabled. Enable to test model performance on edge devices.
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* NEW SECTION: Feedback Loop Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <RotateCcw className="mr-2 h-5 w-5 text-gray-600" />
                  Feedback Loop Status
                </h3>
                <Link
                  to="/ai/feedback-loop-status"
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center"
                >
                  Details <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium text-gray-800">Reviewed Data Used for Retraining</h4>
                    <div className="text-lg font-bold text-blue-600">{feedbackPercentage}%</div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${feedbackPercentage}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Target: 80%</span>
                    <span>Last updated: 4 hours ago</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-500 mb-1">Total Reviews</div>
                    <div className="text-lg font-bold text-gray-900">8,432</div>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-500 mb-1">Used in Training</div>
                    <div className="text-lg font-bold text-blue-600">6,071</div>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-500 mb-1">Pending</div>
                    <div className="text-lg font-bold text-amber-600">2,361</div>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-5">
                  <h4 className="text-sm font-medium text-gray-800 mb-3">Recent Model Improvements</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <div className="flex-grow flex justify-between items-center">
                        <span className="text-sm text-gray-700">Accuracy</span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900 mr-1">94.2%</span>
                          <span className="text-xs text-green-600">+2.1%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <div className="flex-grow flex justify-between items-center">
                        <span className="text-sm text-gray-700">F1 Score</span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900 mr-1">0.89</span>
                          <span className="text-xs text-green-600">+0.03</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                      <div className="flex-grow flex justify-between items-center">
                        <span className="text-sm text-gray-700">False Positives</span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900 mr-1">3.8%</span>
                          <span className="text-xs text-green-600">-1.2%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Confidence & Explainability */}
          <div className="lg:w-96 space-y-6">
            {/* Confidence Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h4 className="font-semibold text-gray-800 flex items-center">
                  <Sliders className="mr-2 h-5 w-5 text-gray-600" />
                  Confidence Settings
                </h4>
                <Link 
                  to="/ai/confidence-settings" 
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center"
                >
                  Edit <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">Auto-clear threshold</label>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">{autoThreshold}%</span>
                      <div className="relative ml-2" title="Files with confidence above this threshold will be automatically cleared">
                        <Info className="h-4 w-4 text-gray-400 cursor-help" />
                      </div>
                    </div>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={autoThreshold}
                    onChange={(e) => setAutoThreshold(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Low certainty</span>
                    <span>High certainty</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">Triage threshold</label>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">{triageThreshold}%</span>
                      <div className="relative ml-2" title="Files with confidence below this threshold will be sent for manual review">
                        <Info className="h-4 w-4 text-gray-400 cursor-help" />
                      </div>
                    </div>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={triageThreshold}
                    onChange={(e) => setTriageThreshold(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Always triage</span>
                    <span>Rarely triage</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <PieChart className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="text-sm font-medium">Current Balance</span>
                    </div>
                    <span className="text-sm text-gray-600">
                      Manual: 25% / Auto: 75%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Model Explainability */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h4 className="font-semibold text-gray-800 flex items-center">
                  <Eye className="mr-2 h-5 w-5 text-gray-600" />
                  Model Explainability
                </h4>
                <div className="flex items-center space-x-2">
                  <button className="text-sm text-gray-600 hover:text-gray-800 p-1 hover:bg-gray-100 rounded transition-colors">
                    <RefreshCw size={16} />
                  </button>
                  <button className="text-sm text-gray-600 hover:text-gray-800 p-1 hover:bg-gray-100 rounded transition-colors">
                    <Download size={16} />
                  </button>
                  <Link 
                    to="/ai/model-explainability" 
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center"
                  >
                    View all <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
              
              <div className="p-4">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File name</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Decision</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[
                        { file: 'Case123_doc1.pdf', decision: 'Redact', method: 'SHAP importance' },
                        { file: 'Case456_vid3.mp4', decision: 'Allow', method: 'SHAP' },
                        { file: 'Case789_audio.mp3', decision: 'Redact', method: 'Captum masks' }
                      ].map((item, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                          <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-900 font-medium truncate max-w-[120px]">
                            {item.file}
                          </td>
                          <td className="px-3 py-3 whitespace-nowrap">
                            {getModelDecisionBadge(item.decision)}
                          </td>
                          <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                            {item.method}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center text-xs text-gray-500">
                  <span>Showing 3 of 24 decisions</span>
                  <button className="text-blue-600 hover:text-blue-800 hover:underline">
                    Load more
                  </button>
                </div>
              </div>
            </div>
            
            {/* Learning Process Visualization */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h4 className="font-semibold text-gray-800 flex items-center">
                  <GitBranch className="mr-2 h-5 w-5 text-gray-600" />
                  Learning Process
                </h4>
              </div>
              
              <div className="p-4">
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <FileText className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="text-sm text-gray-700">Collect Data</span>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  
                  <div className="ml-4 h-6 border-l-2 border-dashed border-blue-200"></div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                        <Layers className="h-4 w-4 text-indigo-600" />
                      </div>
                      <span className="text-sm text-gray-700">Uncertain Cases</span>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  
                  <div className="ml-4 h-6 border-l-2 border-dashed border-indigo-200"></div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                        <Eye className="h-4 w-4 text-purple-600" />
                      </div>
                      <span className="text-sm text-gray-700">Expert Review</span>
                    </div>
                    <div className="flex items-center text-amber-500">
                      <div className="w-5 h-5 rounded-full border-2 border-amber-500 flex items-center justify-center">
                        <span className="text-xs font-bold">!</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-4 h-6 border-l-2 border-dashed border-purple-200"></div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                        <Brain className="h-4 w-4 text-amber-600" />
                      </div>
                      <span className="text-sm text-gray-700">Retrain Model</span>
                    </div>
                    <div className="text-blue-500 animate-pulse">
                      <RotateCcw className="h-5 w-5" />
                    </div>
                  </div>
                  
                  <div className="ml-4 h-6 border-l-2 border-dashed border-amber-200"></div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <Zap className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-sm text-gray-700">Deploy Updated Model</span>
                    </div>
                    <div className="text-gray-300">
                      <BarChart2 className="h-5 w-5" />
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 text-xs text-gray-500 text-center">
                  Active Learning Cycle: <span className="font-medium">Running</span>
                </div>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h4 className="font-semibold text-gray-800">Quick Stats</h4>
              </div>
              
              <div className="p-4 grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">Processed Today</div>
                  <div className="text-xl font-bold text-gray-900">1,247</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">Auto-cleared</div>
                  <div className="text-xl font-bold text-green-600">76%</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">Avg. Confidence</div>
                  <div className="text-xl font-bold text-blue-600">82%</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">Pending</div>
                  <div className="text-xl font-bold text-amber-600">43</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}