import { useState, useEffect } from 'react';
import { 
  Brain, Target, BarChart2, Zap, 
  RefreshCw, Book, Settings, Info,
  Users, ArrowLeft, 
  CheckCircle, AlertCircle, Save,  Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';


export default function ActiveLearningTuner() {
  // Main sliders state
  const [uncertainty, setUncertainty] = useState(30);
  const [diversity, setDiversity] = useState(60);
  
  // Derived metrics state
  const [reviewStats, setReviewStats] = useState({
    highPriority: 12,
    mediumPriority: 34,
    lowPriority: 54,
    totalItems: 100,
    accuracyGain: 3.7
  });
  
  // UI state
  const [saving, setSaving] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [activeTab, setActiveTab] = useState('settings');
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // Advanced settings
  const [minConfidence, setMinConfidence] = useState(25);
  const [batchSize, setBatchSize] = useState(50);
  const [autoUpdateFrequency, setAutoUpdateFrequency] = useState(72);
  
  // Sample data for distribution chart
  const [distribution] = useState([
    { confidence: '0-10%', count: 5, color: 'bg-red-500' },
    { confidence: '10-20%', count: 10, color: 'bg-red-400' },
    { confidence: '20-30%', count: 15, color: 'bg-red-300' },
    { confidence: '30-40%', count: 20, color: 'bg-yellow-400' },
    { confidence: '40-50%', count: 18, color: 'bg-yellow-300' },
    { confidence: '50-60%', count: 12, color: 'bg-yellow-200' },
    { confidence: '60-70%', count: 8, color: 'bg-green-300' },
    { confidence: '70-80%', count: 7, color: 'bg-green-400' },
    { confidence: '80-90%', count: 3, color: 'bg-green-500' },
    { confidence: '90-100%', count: 2, color: 'bg-green-600' }
  ]);
 
  useEffect(() => {
    // Simulate recalculation of metrics based on uncertainty and diversity
    const highPriority = Math.round(100 - uncertainty);
    const mediumPriority = Math.round((uncertainty * diversity) / 100);
    const lowPriority = 100 - highPriority - mediumPriority;
    
    const accuracyGain = ((100 - uncertainty) * 0.05 + diversity * 0.03) / 10;
    
    setReviewStats({
      highPriority,
      mediumPriority,
      lowPriority,
      totalItems: 100,
      accuracyGain: parseFloat(accuracyGain.toFixed(1))
    });
  }, [uncertainty, diversity]);
  
  // Save settings simulation
  const handleSave = () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 3000);
    }, 1500);
  };
  
  // Function to get uncertainty description
  const getUncertaintyDescription = (value:number) => {
    if (value < 20) return "Very selective (few cases prioritized)";
    if (value < 40) return "Selective (quality over quantity)";
    if (value < 60) return "Balanced selection";
    if (value < 80) return "Broad selection (quantity over quality)";
    return "Very broad (most cases prioritized)";
  };
  
  // Function to get diversity description
  const getDiversityDescription = (value:number) => {
    if (value < 20) return "Minimal diversity (focus on uncertainty)";
    if (value < 40) return "Limited diversity";
    if (value < 60) return "Balanced approach";
    if (value < 80) return "High diversity";
    return "Maximum diversity (broad input variety)";
  };
  
  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <button className="mr-3 text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-200 transition-colors">
              <Link
               to="/ai/pipelines"
                className="inline-flex items-center text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-200 transition-colors"
                    >
                     <ArrowLeft className="h-5 w-5" />
                </Link>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Active Learning Tuner</h1>
          </div>
          <p className="text-gray-600 max-w-3xl">
            Optimize your AI model by fine-tuning how it selects cases for human review. 
            Balance between uncertainty sampling and diversity to maximize learning efficiency.
          </p>
        </div>
        
        {/* Success Message */}
        {showFeedback && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center text-green-800 animate-fadeIn">
            <CheckCircle className="h-5 w-5 mr-3 text-green-500" />
            Active learning parameters successfully updated
          </div>
        )}
        
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6 p-1 inline-flex">
          <button 
            onClick={() => setActiveTab('settings')} 
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === 'settings' 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            Settings
          </button>
          <button 
            onClick={() => setActiveTab('analysis')} 
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === 'analysis' 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            Analysis
          </button>
          <button 
            onClick={() => setActiveTab('history')} 
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === 'history' 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            History
          </button>
        </div>
        
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Settings Panel */}
            <div className="lg:col-span-2 space-y-6">
              {/* Core Settings */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-indigo-700 to-purple-700">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-white flex items-center">
                      <Brain className="mr-2 h-5 w-5" />
                      Active Learning Parameters
                    </h2>
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="px-4 py-2 text-sm bg-white text-indigo-700 rounded-lg hover:bg-indigo-50 transition-colors flex items-center"
                    >
                      {saving ? (
                        <>
                          <RefreshCw className="mr-1.5 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-1.5 h-4 w-4" />
                          Save Settings
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="p-6 space-y-8">
                  {/* Uncertainty Threshold */}
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <label htmlFor="uncertainty" className="block text-sm font-medium text-gray-800 mb-1">
                          Model Uncertainty Threshold
                        </label>
                        <p className="text-sm text-gray-500">
                          Determines which predictions are considered uncertain enough for human review
                        </p>
                      </div>
                      <div className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-1 rounded-full flex items-center">
                        <Target className="h-3.5 w-3.5 mr-1" />
                        {uncertainty}%
                      </div>
                    </div>
                    
                    <div className="relative mt-4">
                      <div className="absolute inset-0 flex items-center pointer-events-none">
                        <div className="w-full h-2 bg-gradient-to-r from-red-300 via-yellow-300 to-green-300 rounded-full"></div>
                      </div>
                      <input 
                        id="uncertainty"
                        type="range" 
                        min="0" 
                        max="100" 
                        value={uncertainty} 
                        onChange={(e) => setUncertainty(parseInt(e.target.value))} 
                        className="w-full h-2 bg-transparent appearance-none cursor-pointer rounded-lg focus:outline-none relative z-10"
                      />
                    </div>
                    
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>More Selective</span>
                      <span>{getUncertaintyDescription(uncertainty)}</span>
                      <span>More Inclusive</span>
                    </div>
                    
                    <div className="mt-3 p-3 bg-indigo-50 border border-indigo-100 rounded-lg text-sm text-indigo-700">
                      At {uncertainty}%, approximately {100 - uncertainty}% of predictions will be flagged for human review.
                    </div>
                  </div>
                  
                  {/* Diversity Weight */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <label htmlFor="diversity" className="block text-sm font-medium text-gray-800 mb-1">
                          Diversity Weight
                        </label>
                        <p className="text-sm text-gray-500">
                          Balances between selecting uncertain cases and maintaining diverse inputs
                        </p>
                      </div>
                      <div className="bg-purple-100 text-purple-800 text-sm font-medium px-2.5 py-1 rounded-full flex items-center">
                        <Filter className="h-3.5 w-3.5 mr-1" />
                        {diversity}%
                      </div>
                    </div>
                    
                    <div className="relative mt-4">
                      <div className="absolute inset-0 flex items-center pointer-events-none">
                        <div className="w-full h-2 bg-gradient-to-r from-indigo-300 to-purple-300 rounded-full"></div>
                      </div>
                      <input 
                        id="diversity"
                        type="range" 
                        min="0" 
                        max="100" 
                        value={diversity} 
                        onChange={(e) => setDiversity(parseInt(e.target.value))} 
                        className="w-full h-2 bg-transparent appearance-none cursor-pointer rounded-lg focus:outline-none relative z-10"
                      />
                    </div>
                    
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>Uncertainty Focus</span>
                      <span>{getDiversityDescription(diversity)}</span>
                      <span>Diversity Focus</span>
                    </div>
                    
                    <div className="mt-3 p-3 bg-purple-50 border border-purple-100 rounded-lg text-sm text-purple-700">
                      Higher diversity ({diversity}%) ensures a more varied dataset but may include less informative examples.
                    </div>
                  </div>
                  
                  {/* Advanced Settings Toggle */}
                  <div className="pt-2">
                    <button 
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      <Settings className="h-4 w-4 mr-1.5" />
                      {showAdvanced ? 'Hide Advanced Settings' : 'Show Advanced Settings'}
                    </button>
                  </div>
                  
                  {/* Advanced Settings */}
                  {showAdvanced && (
                    <div className="pt-4 border-t border-gray-200 space-y-6">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <label htmlFor="minConfidence" className="block text-sm font-medium text-gray-800">
                            Minimum Confidence Threshold
                          </label>
                          <span className="text-sm font-medium text-gray-900">{minConfidence}%</span>
                        </div>
                        <input 
                          id="minConfidence"
                          type="range" 
                          min="0" 
                          max="100" 
                          value={minConfidence} 
                          onChange={(e) => setMinConfidence(parseInt(e.target.value))} 
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Cases below this threshold will always be selected regardless of diversity
                        </p>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <label htmlFor="batchSize" className="block text-sm font-medium text-gray-800">
                            Learning Batch Size
                          </label>
                          <span className="text-sm font-medium text-gray-900">{batchSize}</span>
                        </div>
                        <input 
                          id="batchSize"
                          type="range" 
                          min="10" 
                          max="200" 
                          step="10"
                          value={batchSize} 
                          onChange={(e) => setBatchSize(parseInt(e.target.value))} 
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Number of examples to collect before model retraining
                        </p>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <label htmlFor="autoUpdateFrequency" className="block text-sm font-medium text-gray-800">
                            Auto-Update Frequency (hours)
                          </label>
                          <span className="text-sm font-medium text-gray-900">{autoUpdateFrequency}h</span>
                        </div>
                        <input 
                          id="autoUpdateFrequency"
                          type="range" 
                          min="12" 
                          max="168" 
                          step="12"
                          value={autoUpdateFrequency} 
                          onChange={(e) => setAutoUpdateFrequency(parseInt(e.target.value))} 
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          How often the model automatically retrains on new data
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                    <p className="text-sm text-gray-600">
                      Changes will apply to all new cases entering the system. Current queue prioritization will not be affected.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Prioritization Impact */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <BarChart2 className="mr-2 h-5 w-5 text-gray-600" />
                    Prioritization Impact
                  </h3>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-red-50 border border-red-100 rounded-lg p-4 flex flex-col items-center">
                      <span className="text-xs text-gray-500 mb-1">High Priority</span>
                      <span className="text-2xl font-bold text-red-700">{reviewStats.highPriority}%</span>
                      <span className="text-xs text-gray-500 mt-1">of review queue</span>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 flex flex-col items-center">
                      <span className="text-xs text-gray-500 mb-1">Medium Priority</span>
                      <span className="text-2xl font-bold text-yellow-700">{reviewStats.mediumPriority}%</span>
                      <span className="text-xs text-gray-500 mt-1">of review queue</span>
                    </div>
                    
                    <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex flex-col items-center">
                      <span className="text-xs text-gray-500 mb-1">Low Priority</span>
                      <span className="text-2xl font-bold text-green-700">{reviewStats.lowPriority}%</span>
                      <span className="text-xs text-gray-500 mt-1">of review queue</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-800 mb-3">Predicted Distribution</h4>
                    <div className="h-32 flex items-end space-x-1">
                      {distribution.map((item, index) => (
                        <div 
                          key={index} 
                          className="flex-1 flex flex-col items-center"
                          title={`${item.confidence}: ${item.count} cases`}
                        >
                          <div 
                            className={`w-full ${item.color} rounded-t`}
                            style={{ height: `${(item.count / 20) * 100}%` }}
                          ></div>
                          <div className="text-xs text-gray-500 mt-1 truncate w-full text-center">
                            {index % 2 === 0 ? item.confidence : ''}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 text-xs text-gray-500 text-center">
                      Model Confidence Distribution
                    </div>
                  </div>
                  
                  <div className="mt-4 bg-indigo-50 rounded-lg p-4 border border-indigo-100">
                    <div className="flex items-center">
                      <Zap className="h-5 w-5 text-indigo-600 mr-2" />
                      <div>
                        <span className="text-sm font-medium text-indigo-800">Estimated Accuracy Gain</span>
                        <div className="flex items-baseline mt-1">
                          <span className="text-2xl font-bold text-indigo-700">+{reviewStats.accuracyGain}%</span>
                          <span className="text-xs text-indigo-600 ml-2">per training cycle</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Learning Status */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="font-medium text-gray-800">Learning Status</h3>
                </div>
                
                <div className="p-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Last Trained</span>
                        <span className="text-sm font-medium text-gray-900">2 hours ago</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Next Training</span>
                        <span className="text-sm font-medium text-gray-900">In 22 hours</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Collected Samples</span>
                        <span className="text-sm font-medium text-gray-900">32/{batchSize}</span>
                      </div>
                    </div>
                    
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-indigo-600 rounded-full" 
                        style={{ width: `${(32 / batchSize) * 100}%` }}
                      ></div>
                    </div>
                    
                    <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                      <div className="flex">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-green-800">Model is learning correctly</div>
                          <p className="text-xs text-green-700 mt-1">
                            Performance is improving with each training cycle
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Current Learning Cycle */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="font-medium text-gray-800">Current Learning Cycle</h3>
                </div>
                
                <div className="p-6">
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <Users className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-sm text-gray-700">Collect Review Data</span>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    
                    <div className="ml-4 h-6 border-l-2 border-dashed border-blue-200"></div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                          <Filter className="h-4 w-4 text-indigo-600" />
                        </div>
                        <span className="text-sm text-gray-700">Select Informative Examples</span>
                      </div>
                      <div className="animate-pulse">
                        <div className="w-5 h-5 rounded-full border-2 border-indigo-500 flex items-center justify-center">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-4 h-6 border-l-2 border-dashed border-indigo-200"></div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                          <Brain className="h-4 w-4 text-gray-400" />
                        </div>
                        <span className="text-sm text-gray-400">Update Model</span>
                      </div>
                      <div className="text-gray-300">
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                      </div>
                    </div>
                    
                    <div className="ml-4 h-6 border-l-2 border-dashed border-gray-200"></div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                          <BarChart2 className="h-4 w-4 text-gray-400" />
                        </div>
                        <span className="text-sm text-gray-400">Evaluate Performance</span>
                      </div>
                      <div className="text-gray-300">
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 text-xs text-gray-500 text-center">
                    Active Learning Cycle: <span className="font-medium">In Progress</span>
                  </div>
                </div>
              </div>
              
              {/* Help Panel */}
              <div className="bg-indigo-50 rounded-xl border border-indigo-200 p-6">
                <h3 className="text-sm font-medium text-indigo-800 mb-3 flex items-center">
                  <Book className="h-4 w-4 mr-2" />
                  About Active Learning
                </h3>
                <p className="text-sm text-indigo-700 mb-4">
                  Active learning helps your AI model learn faster by selecting the most informative examples for human review.
                </p>
                <div className="space-y-2">
                  <a href="#" className="flex items-center text-sm text-indigo-800 hover:text-indigo-900">
                    <Info className="h-4 w-4 mr-2" />
                    How Active Learning Works
                  </a>
                  <a href="#" className="flex items-center text-sm text-indigo-800 hover:text-indigo-900">
                    <Info className="h-4 w-4 mr-2" />
                    Optimizing Parameters
                  </a>
                  <a href="#" className="flex items-center text-sm text-indigo-800 hover:text-indigo-900">
                    <Info className="h-4 w-4 mr-2" />
                    Performance Metrics
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'analysis' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Learning Analysis</h2>
            <p className="text-gray-600 text-sm">
              Performance analysis and metrics for your active learning process will appear here.
            </p>
          </div>
        )}
        
        {activeTab === 'history' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Learning History</h2>
            <p className="text-gray-600 text-sm">
              Historical data and previous learning cycles will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}