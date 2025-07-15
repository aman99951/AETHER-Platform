import { useState } from 'react';
import { 
  ArrowLeft, Info, Save, RefreshCw, 
  ChevronRight, AlertTriangle, Check
} from 'lucide-react';
import { Link } from 'react-router-dom';


export default function ConfidenceSettings() {
  const [autoClear, setAutoClear] = useState(70);
  const [manualTriage, setManualTriage] = useState(50);
  const [originalValues] = useState({ autoClear: 70, manualTriage: 50 });
  const [hasChanges, setHasChanges] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAutoClearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = +e.target.value;
    setAutoClear(newValue);
    setHasChanges(newValue !== originalValues.autoClear || manualTriage !== originalValues.manualTriage);
  };

  const handleManualTriageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = +e.target.value;
    setManualTriage(newValue);
    setHasChanges(autoClear !== originalValues.autoClear || newValue !== originalValues.manualTriage);
  };

  const handleSave = () => {
    // Here you would typically save to backend
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setHasChanges(false);
  };

  const handleReset = () => {
    setAutoClear(originalValues.autoClear);
    setManualTriage(originalValues.manualTriage);
    setHasChanges(false);
  };

  const getConfidenceCategory = (value: number) => {
    if (value >= 80) return { label: 'High confidence', color: 'text-green-600' };
    if (value >= 60) return { label: 'Medium confidence', color: 'text-blue-600' };
    if (value >= 40) return { label: 'Low confidence', color: 'text-amber-600' };
    return { label: 'Very low confidence', color: 'text-red-600' };
  };

  const autoClearCategory = getConfidenceCategory(autoClear);
  const manualTriageCategory = getConfidenceCategory(manualTriage);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
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
          <h1 className="text-2xl font-bold text-gray-900">Confidence Settings</h1>
        </div>
        <p className="text-gray-600 max-w-2xl">
          Adjust AI confidence thresholds to balance automation and manual review based on your organization's needs and risk tolerance.
        </p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center text-green-800">
          <Check className="h-5 w-5 mr-3 text-green-500" />
          Settings saved successfully
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Settings Panel */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-800 flex items-center">
                AI Confidence Thresholds
              </h2>
            </div>
            
            <div className="p-6 space-y-8">
              {/* Auto-clear Threshold */}
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <label htmlFor="autoClear" className="block font-medium text-gray-700 mb-1">
                      Auto-clear Threshold
                    </label>
                    <p className="text-sm text-gray-500">
                      Documents with confidence above this level will be automatically cleared
                    </p>
                  </div>
                  <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-full">
                    <span className={`text-sm font-medium ${autoClearCategory.color}`}>
                      {autoClear}%
                    </span>
                    <div className="ml-2 relative group">
                      <Info className="h-4 w-4 text-gray-400 cursor-help" />
                      <div className="absolute right-0 mt-2 w-48 bg-gray-900 text-white text-xs rounded-md py-2 px-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        Higher values increase manual review but reduce risk.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative mt-4">
                  <div className="absolute inset-0 flex items-center pointer-events-none">
                    <div className="w-full h-2 bg-gradient-to-r from-red-300 via-yellow-300 to-green-300 rounded-full"></div>
                  </div>
                  <input 
                    id="autoClear"
                    type="range" 
                    min="0" 
                    max="100" 
                    value={autoClear} 
                    onChange={handleAutoClearChange} 
                    className="w-full h-2 bg-transparent appearance-none cursor-pointer rounded-lg focus:outline-none relative z-10"
                  />
                </div>

                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Low Automation</span>
                  <span>Balanced</span>
                  <span>High Automation</span>
                </div>

                <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-3">
                  <div className="flex">
                    <div className="flex-shrink-0 text-blue-500 mt-1">
                      <Info className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm text-blue-800 font-medium">Current Setting Impact</h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>At <strong>{autoClear}%</strong>, approximately <strong>{100 - autoClear}%</strong> of documents will be cleared automatically, with the remaining sent for human review.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Manual Triage Threshold */}
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <label htmlFor="manualTriage" className="block font-medium text-gray-700 mb-1">
                      Manual Triage Threshold
                    </label>
                    <p className="text-sm text-gray-500">
                      Documents below this confidence will be prioritized for expert review
                    </p>
                  </div>
                  <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-full">
                    <span className={`text-sm font-medium ${manualTriageCategory.color}`}>
                      {manualTriage}%
                    </span>
                    <div className="ml-2 relative group">
                      <Info className="h-4 w-4 text-gray-400 cursor-help" />
                      <div className="absolute right-0 mt-2 w-48 bg-gray-900 text-white text-xs rounded-md py-2 px-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        Lower values increase priority review for uncertain cases.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative mt-4">
                  <div className="absolute inset-0 flex items-center pointer-events-none">
                    <div className="w-full h-2 bg-gradient-to-r from-red-300 via-yellow-300 to-green-300 rounded-full"></div>
                  </div>
                  <input 
                    id="manualTriage"
                    type="range" 
                    min="0" 
                    max="100" 
                    value={manualTriage} 
                    onChange={handleManualTriageChange} 
                    className="w-full h-2 bg-transparent appearance-none cursor-pointer rounded-lg focus:outline-none relative z-10"
                  />
                </div>

                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>More Expert Review</span>
                  <span>Balanced</span>
                  <span>Less Expert Review</span>
                </div>

                <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-3">
                  <div className="flex">
                    <div className="flex-shrink-0 text-blue-500 mt-1">
                      <Info className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm text-blue-800 font-medium">Current Setting Impact</h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>At <strong>{manualTriage}%</strong>, approximately <strong>{manualTriage}%</strong> of non-cleared documents will be sent for expert review rather than standard review.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Warning about conflicting settings */}
              {autoClear < manualTriage && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-amber-800">Conflicting Thresholds</h3>
                      <div className="mt-2 text-sm text-amber-700">
                        <p>Your auto-clear threshold ({autoClear}%) is lower than your triage threshold ({manualTriage}%). This may cause inconsistent document routing.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button 
                onClick={handleReset}
                disabled={!hasChanges}
                className={`px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 flex items-center ${
                  !hasChanges ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                }`}
              >
                <RefreshCw className="h-4 w-4 mr-1.5" />
                Reset
              </button>
              <button
                onClick={handleSave}
                disabled={!hasChanges}
                className={`px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg flex items-center ${
                  !hasChanges ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                }`}
              >
                <Save className="h-4 w-4 mr-1.5" />
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar / Info Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-800">Understanding Thresholds</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Auto-clear Threshold</h4>
                <p className="text-sm text-gray-600">
                  Documents with AI confidence scores above this threshold will be automatically cleared without human review.
                </p>
                <div className="mt-3 text-xs text-gray-500">
                  <div className="flex items-center mb-1">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                    <span>High (80-100%): Minimal human review</span>
                  </div>
                  <div className="flex items-center mb-1">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                    <span>Medium (60-79%): Balanced approach</span>
                  </div>
                  <div className="flex items-center mb-1">
                    <span className="w-3 h-3 bg-amber-500 rounded-full mr-2"></span>
                    <span>Low (40-59%): Conservative</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                    <span>Very Low (0-39%): High scrutiny</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Manual Triage Threshold</h4>
                <p className="text-sm text-gray-600">
                  Documents with confidence below this threshold will be routed to expert reviewers instead of standard review.
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Recommended Settings</h4>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    <div className="font-medium text-gray-900">Balanced</div>
                    <div className="text-xs text-gray-500 mt-1">Auto: 70% / Triage: 40%</div>
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    <div className="font-medium text-gray-900">Conservative</div>
                    <div className="text-xs text-gray-500 mt-1">Auto: 85% / Triage: 60%</div>
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    <div className="font-medium text-gray-900">Aggressive</div>
                    <div className="text-xs text-gray-500 mt-1">Auto: 60% / Triage: 30%</div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl border border-blue-200 p-4">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Need Help?</h4>
            <p className="text-sm text-blue-600 mb-3">
              Contact your AI policy administrator or review the documentation for guidance on optimal settings.
            </p>
            <button className="text-sm text-blue-800 font-medium flex items-center hover:underline">
              View Documentation <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}