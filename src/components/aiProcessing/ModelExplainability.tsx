import { useState } from 'react';
import { ArrowLeft, Download, Info, Search, FileText, AlertTriangle, ExternalLink, BarChart2, PieChart, Activity, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ModelExplainability() {
  const [activeTab, setActiveTab] = useState('document');
  const [activeTechnique, setActiveTechnique] = useState('shap');
  const [confidenceThreshold, setConfidenceThreshold] = useState(70);
  
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen">
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
          <h1 className="text-2xl font-bold text-gray-900">Model Explainability</h1>
        </div>
        <p className="text-gray-600 max-w-3xl">
          Understand how the AI makes decisions by examining feature importance, text highlights, and confidence scores for redaction recommendations.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Document Preview Panel */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200">
              {/* Tabs */}
              <div className="flex">
                <button
                  onClick={() => setActiveTab('document')}
                  className={`px-6 py-4 font-medium text-sm transition-colors border-b-2 ${
                    activeTab === 'document'
                      ? 'text-blue-600 border-blue-600'
                      : 'text-gray-500 border-transparent hover:text-gray-700'
                  }`}
                >
                  Document View
                </button>
                <button
                  onClick={() => setActiveTab('features')}
                  className={`px-6 py-4 font-medium text-sm transition-colors border-b-2 ${
                    activeTab === 'features'
                      ? 'text-blue-600 border-blue-600'
                      : 'text-gray-500 border-transparent hover:text-gray-700'
                  }`}
                >
                  Feature Importance
                </button>
                <button
                  onClick={() => setActiveTab('comparison')}
                  className={`px-6 py-4 font-medium text-sm transition-colors border-b-2 ${
                    activeTab === 'comparison'
                      ? 'text-blue-600 border-blue-600'
                      : 'text-gray-500 border-transparent hover:text-gray-700'
                  }`}
                >
                  Model Comparison
                </button>
              </div>
            </div>
            
            {/* Document View Content */}
            {activeTab === 'document' && (
              <div>
                {/* Document Header */}
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="font-medium text-gray-800">FOIA_Request_2023-07-124.pdf</span>
                    <span className="ml-3 text-xs text-gray-500">Page 1 of 4</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors">
                      <Search className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                {/* Document Content with Highlighted Areas */}
                <div className="p-6 bg-white">
                  <div className="border border-gray-200 rounded-lg p-6 font-serif text-gray-800 leading-relaxed space-y-4 relative">
                    {/* Simulated document with highlighted sections */}
                    <p>To whom it may concern,</p>
                    <p>I am writing to request documents related to <span className="relative">
                      <span className="bg-yellow-200 px-1 py-0.5 rounded">national security concerns</span>
                      <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        87% confidence - PII
                      </span>
                    </span> at the border during the period of <span className="bg-yellow-200 px-1 py-0.5 rounded">January through March 2023</span>.</p>
                    
                    <p>Please include all communications between <span className="bg-red-200 px-1 py-0.5 rounded relative group">
                      John Smith, Director of Operations
                      <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        94% confidence - Personal Name
                      </span>
                    </span> and any representatives of <span className="bg-blue-200 px-1 py-0.5 rounded">foreign governments</span> regarding this matter.</p>
                    
                    <p>My contact information is as follows:</p>
                    <p className="bg-red-200 px-1 py-0.5 rounded relative group inline-block">
                      Jane Doe<br/>
                      123 Main Street<br/>
                      Anytown, ST 12345<br/>
                      jdoe@email.com<br/>
                      (555) 123-4567
                      <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        98% confidence - Contact Information
                      </span>
                    </p>
                    
                    <p>I am willing to pay fees up to <span className="bg-green-200 px-1 py-0.5 rounded">$100</span> for this request. Please inform me if the fees will exceed this amount.</p>
                    
                    <p>Thank you for your consideration of this request.</p>
                    
                    <p>Sincerely,</p>
                    <p className="bg-red-200 px-1 py-0.5 rounded">Jane Doe</p>
                    
                    {/* Overlay Legend */}
                    <div className="absolute top-4 right-4 bg-white border border-gray-200 rounded-lg shadow-sm p-3 text-xs">
                      <div className="font-medium text-gray-700 mb-2">Highlight Legend</div>
                      <div className="space-y-1.5">
                        <div className="flex items-center">
                          <span className="w-3 h-3 bg-red-200 rounded mr-2"></span>
                          <span>Personal Information (98%)</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-3 h-3 bg-yellow-200 rounded mr-2"></span>
                          <span>Sensitive Content (87%)</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-3 h-3 bg-blue-200 rounded mr-2"></span>
                          <span>Security-Related (76%)</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-3 h-3 bg-green-200 rounded mr-2"></span>
                          <span>Financial Data (65%)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Feature Importance Content */}
            {activeTab === 'features' && (
              <div>
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                  <div className="font-medium text-gray-800">Feature Importance Analysis</div>
                  <div className="flex items-center space-x-3">
                    <select className="text-sm border border-gray-300 rounded-md px-3 py-1.5">
                      <option>FOIA_Request_2023-07-124.pdf</option>
                      <option>FOIA_Request_2023-08-039.pdf</option>
                    </select>
                    <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  {/* Technique Selector */}
                  <div className="mb-6 flex space-x-2">
                    <button 
                      onClick={() => setActiveTechnique('shap')}
                      className={`px-4 py-2 text-sm rounded-md transition-colors ${
                        activeTechnique === 'shap' 
                          ? 'bg-blue-100 text-blue-700 font-medium' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      SHAP Values
                    </button>
                    <button 
                      onClick={() => setActiveTechnique('lime')}
                      className={`px-4 py-2 text-sm rounded-md transition-colors ${
                        activeTechnique === 'lime' 
                          ? 'bg-blue-100 text-blue-700 font-medium' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      LIME
                    </button>
                    <button 
                      onClick={() => setActiveTechnique('captum')}
                      className={`px-4 py-2 text-sm rounded-md transition-colors ${
                        activeTechnique === 'captum' 
                          ? 'bg-blue-100 text-blue-700 font-medium' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Captum
                    </button>
                  </div>
                  
                  {/* SHAP Visualization */}
                  {activeTechnique === 'shap' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-gray-800 font-medium mb-3">SHAP Feature Importance</h3>
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          {/* Simulated SHAP Plot */}
                          <div className="h-64 bg-gray-50 rounded-md overflow-hidden">
                            <div className="h-full w-full p-4">
                              {/* This is a mockup of a SHAP waterfall chart */}
                              <div className="flex flex-col h-full justify-center space-y-2">
                                <div className="flex items-center">
                                  <span className="w-24 text-xs text-right pr-2 text-gray-600">Contact Info</span>
                                  <div className="flex-grow h-6 bg-red-500" style={{ width: '90%' }}></div>
                                  <span className="pl-2 text-xs text-gray-600">0.92</span>
                                </div>
                                <div className="flex items-center">
                                  <span className="w-24 text-xs text-right pr-2 text-gray-600">Personal Names</span>
                                  <div className="flex-grow h-6 bg-red-400" style={{ width: '80%' }}></div>
                                  <span className="pl-2 text-xs text-gray-600">0.81</span>
                                </div>
                                <div className="flex items-center">
                                  <span className="w-24 text-xs text-right pr-2 text-gray-600">Security Terms</span>
                                  <div className="flex-grow h-6 bg-blue-400" style={{ width: '60%' }}></div>
                                  <span className="pl-2 text-xs text-gray-600">0.63</span>
                                </div>
                                <div className="flex items-center">
                                  <span className="w-24 text-xs text-right pr-2 text-gray-600">Financial Data</span>
                                  <div className="flex-grow h-6 bg-green-400" style={{ width: '40%' }}></div>
                                  <span className="pl-2 text-xs text-gray-600">0.42</span>
                                </div>
                                <div className="flex items-center">
                                  <span className="w-24 text-xs text-right pr-2 text-gray-600">Date Formats</span>
                                  <div className="flex-grow h-6 bg-yellow-400" style={{ width: '30%' }}></div>
                                  <span className="pl-2 text-xs text-gray-600">0.31</span>
                                </div>
                                <div className="flex items-center">
                                  <span className="w-24 text-xs text-right pr-2 text-gray-600">Base Value</span>
                                  <div className="flex-grow h-6 bg-gray-300" style={{ width: '10%' }}></div>
                                  <span className="pl-2 text-xs text-gray-600">0.12</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 text-xs text-gray-500">
                            Features sorted by impact on model output (higher values indicate stronger influence on redaction decisions)
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-gray-800 font-medium mb-3">Feature Interactions</h3>
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          {/* Simulated SHAP Interaction Plot */}
                          <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center">
                            <div className="w-full h-full p-4">
                              {/* Simulated heatmap */}
                              <div className="grid grid-cols-5 gap-1 h-full">
                                {Array.from({ length: 25 }).map((_, i) => (
                                  <div 
                                    key={i} 
                                    className={`rounded ${
                                      Math.random() > 0.7 
                                        ? 'bg-red-500' 
                                        : Math.random() > 0.5 
                                          ? 'bg-red-300' 
                                          : Math.random() > 0.3 
                                            ? 'bg-red-200' 
                                            : 'bg-red-100'
                                    }`}
                                  ></div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 text-xs text-gray-500">
                            Heatmap showing how features interact to influence the model's decision
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* LIME Visualization */}
                  {activeTechnique === 'lime' && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="h-96 bg-gray-50 rounded-md flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-gray-400 mb-2">
                            <BarChart2 className="h-12 w-12 mx-auto" />
                          </div>
                          <p className="text-gray-600">LIME visualization showing local feature importance</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Captum Visualization */}
                  {activeTechnique === 'captum' && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="h-96 bg-gray-50 rounded-md flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-gray-400 mb-2">
                            <Activity className="h-12 w-12 mx-auto" />
                          </div>
                          <p className="text-gray-600">Captum visualization showing attribution scores</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Model Comparison Content */}
            {activeTab === 'comparison' && (
              <div>
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <div className="font-medium text-gray-800">Model Performance Comparison</div>
                </div>
                
                <div className="p-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                    <h3 className="text-gray-800 font-medium mb-4">Decision Confidence by Model</h3>
                    <div className="h-64 bg-gray-50 rounded-md p-4">
                      {/* Simulated bar chart for model comparison */}
                      <div className="h-full flex items-end justify-around">
                        <div className="flex flex-col items-center w-1/4">
                          <div className="bg-blue-500 w-full" style={{ height: '75%' }}></div>
                          <div className="mt-2 text-xs text-gray-600">Model v1.2</div>
                          <div className="text-xs font-medium">75%</div>
                        </div>
                        <div className="flex flex-col items-center w-1/4">
                          <div className="bg-blue-600 w-full" style={{ height: '82%' }}></div>
                          <div className="mt-2 text-xs text-gray-600">Model v1.3</div>
                          <div className="text-xs font-medium">82%</div>
                        </div>
                        <div className="flex flex-col items-center w-1/4">
                          <div className="bg-blue-700 w-full" style={{ height: '90%' }}></div>
                          <div className="mt-2 text-xs text-gray-600">Model v1.4</div>
                          <div className="text-xs font-medium">90%</div>
                        </div>
                        <div className="flex flex-col items-center w-1/4">
                          <div className="bg-green-500 w-full" style={{ height: '94%' }}></div>
                          <div className="mt-2 text-xs text-gray-600">Current</div>
                          <div className="text-xs font-medium">94%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h3 className="text-gray-800 font-medium mb-4">Error Analysis</h3>
                      <div className="h-48 bg-gray-50 rounded-md p-4">
                        {/* Simulated pie chart for error types */}
                        <div className="flex items-center justify-center h-full">
                          <PieChart className="h-24 w-24 text-gray-400" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h3 className="text-gray-800 font-medium mb-4">Confusion Matrix</h3>
                      <div className="h-48 bg-gray-50 rounded-md p-4">
                        {/* Simulated confusion matrix */}
                        <div className="grid grid-cols-2 grid-rows-2 gap-1 h-full">
                          <div className="bg-green-200 flex items-center justify-center text-sm font-medium">
                            TP: 84%
                          </div>
                          <div className="bg-red-200 flex items-center justify-center text-sm font-medium">
                            FP: 3%
                          </div>
                          <div className="bg-red-200 flex items-center justify-center text-sm font-medium">
                            FN: 5%
                          </div>
                          <div className="bg-green-200 flex items-center justify-center text-sm font-medium">
                            TN: 8%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Model Decision Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="font-medium text-gray-800">Model Decision Summary</h3>
            </div>
            
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                  94%
                </div>
                <div>
                  <div className="text-lg font-medium text-gray-900">Redaction Recommended</div>
                  <p className="text-sm text-gray-600">
                    The model is highly confident this document contains sensitive information that should be redacted.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-red-100 p-1 rounded mr-3 mt-0.5">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Multiple PII Entities Detected</div>
                    <p className="text-sm text-gray-600">
                      Personal contact information, names and addresses were identified in the document.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-yellow-100 p-1 rounded mr-3 mt-0.5">
                    <Info className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Security-Related Terms</div>
                    <p className="text-sm text-gray-600">
                      Content related to national security concerns was identified as potentially sensitive.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between">
                  <button className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center">
                    <Eye className="h-4 w-4 mr-1.5" />
                    View Full Analysis
                  </button>
                  <button className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center">
                    <Download className="h-4 w-4 mr-1.5" />
                    Export Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Confidence Controls */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="font-medium text-gray-800">Visualization Controls</h3>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confidence Threshold: {confidenceThreshold}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={confidenceThreshold}
                  onChange={(e) => setConfidenceThreshold(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Show more</span>
                  <span>Show less</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Highlight Categories
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked />
                    <span className="ml-2 text-sm text-gray-700">Personal Information</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked />
                    <span className="ml-2 text-sm text-gray-700">Sensitive Content</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked />
                    <span className="ml-2 text-sm text-gray-700">Security-Related</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked />
                    <span className="ml-2 text-sm text-gray-700">Financial Data</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Document Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="font-medium text-gray-800">Document Information</h3>
            </div>
            
            <div className="p-6">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Document Type</span>
                  <span className="font-medium text-gray-900">FOIA Request</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Pages</span>
                  <span className="font-medium text-gray-900">4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Content Type</span>
                  <span className="font-medium text-gray-900">Text</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Processed On</span>
                  <span className="font-medium text-gray-900">Aug 15, 2023</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Model Version</span>
                  <span className="font-medium text-gray-900">v1.4.2</span>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded mr-3 mt-0.5">
                    <Info className="h-4 w-4 text-blue-600" />
                  </div>
                  <p className="text-xs text-gray-600">
                    This document was processed using the latest redaction model with specialized training for FOIA requests.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Learn More */}
          <div className="bg-blue-50 rounded-xl border border-blue-200 p-4">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Learn More</h4>
            <p className="text-sm text-blue-600 mb-3">
              Explore our documentation to understand how model explainability helps improve transparency in AI decision-making.
            </p>
            <a href="#" className="text-sm text-blue-800 font-medium flex items-center hover:underline">
              Explainability Guide <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}