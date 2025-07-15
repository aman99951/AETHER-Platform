import { useState, useEffect } from 'react';
import { 
  RotateCcw, ArrowLeft, BarChart2, Clock, 
  CheckCircle,  RefreshCw, Info,
  Eye, PieChart, Users, FileText, Calendar,
  ArrowUpRight, ArrowDownRight, GitCommit, 
  Download, Filter, Brain, Zap, Sliders
} from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';


export default function FeedbackLoopStatus() {
  // State for main metrics
  const [feedbackStats, setFeedbackStats] = useState({
    totalReviewed: 8432,
    usedInTraining: 6071,
    pendingIncorporation: 2361,
    feedbackPercentage: 72,
    lastUpdateTime: '4 hours ago',
    nextUpdateTime: 'in 8 hours',
    cyclesCompleted: 17
  });
  
  // State for performance metrics
  const [performanceMetrics] = useState({
    accuracy: { current: 94.2, previous: 92.1, trend: 'up' },
    f1Score: { current: 0.89, previous: 0.86, trend: 'up' },
    falsePositives: { current: 3.8, previous: 5.0, trend: 'down' },
    latency: { current: 126, previous: 135, trend: 'down' }
  });
  
  // State for feedback categories
  const [feedbackCategories,] = useState([
    { name: 'False Positives', count: 1245, percentage: 42, color: 'bg-red-500' },
    { name: 'False Negatives', count: 876, percentage: 29, color: 'bg-yellow-500' },
    { name: 'Partial Matches', count: 542, percentage: 18, color: 'bg-blue-500' },
    { name: 'Edge Cases', count: 328, percentage: 11, color: 'bg-purple-500' }
  ]);
  
  // State for recent updates
  const [recentUpdates, ] = useState([
    { version: 'v1.4.7', date: 'Today', status: 'active', improvements: '+1.2% accuracy' },
    { version: 'v1.4.6', date: '2 days ago', status: 'superseded', improvements: '+0.8% recall' },
    { version: 'v1.4.5', date: '5 days ago', status: 'superseded', improvements: '+2.1% precision' },
    { version: 'v1.4.4', date: '1 week ago', status: 'superseded', improvements: '-1.5% false positives' }
  ]);
  
  // Fake data for weekly progress chart
  const [weeklyProgress, ] = useState([
    { day: 'Mon', feedback: 120, incorporated: 85 },
    { day: 'Tue', feedback: 145, incorporated: 110 },
    { day: 'Wed', feedback: 165, incorporated: 125 },
    { day: 'Thu', feedback: 130, incorporated: 100 },
    { day: 'Fri', feedback: 180, incorporated: 140 },
    { day: 'Sat', feedback: 95, incorporated: 75 },
    { day: 'Sun', feedback: 75, incorporated: 60 }
  ]);
  
  // Simulate loading data
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Simulate small random changes to data
      setFeedbackStats(prev => ({
        ...prev,
        usedInTraining: prev.usedInTraining + Math.floor(Math.random() * 20),
        pendingIncorporation: prev.pendingIncorporation - Math.floor(Math.random() * 10),
        feedbackPercentage: Math.min(100, prev.feedbackPercentage + Math.floor(Math.random() * 2))
      }));
      setIsRefreshing(false);
    }, 1500);
  };
  
  // Update stats when usedInTraining or pendingIncorporation changes
  useEffect(() => {
    const total = feedbackStats.usedInTraining + feedbackStats.pendingIncorporation;
    const percentage = Math.round((feedbackStats.usedInTraining / total) * 100);
    setFeedbackStats(prev => ({
      ...prev,
      totalReviewed: total,
      feedbackPercentage: percentage
    }));
  }, [feedbackStats.usedInTraining, feedbackStats.pendingIncorporation]);

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
            <h1 className="text-2xl font-bold text-gray-900">Feedback Loop Status</h1>
          </div>
          <p className="text-gray-600 max-w-3xl">
            Track how human feedback is being incorporated into the AI model training process
            and monitor the impact on model performance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Metrics */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-white flex items-center">
                    <RotateCcw className="mr-2 h-5 w-5" />
                    Feedback Incorporation
                  </h2>
                  <button
                    onClick={refreshData}
                    disabled={isRefreshing}
                    className="px-4 py-2 text-sm bg-white text-blue-700 rounded-lg hover:bg-blue-50 transition-colors flex items-center"
                  >
                    {isRefreshing ? (
                      <>
                        <RefreshCw className="mr-1.5 h-4 w-4 animate-spin" />
                        Refreshing...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="mr-1.5 h-4 w-4" />
                        Refresh Data
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-800">Reviewed Data Used for Retraining</h3>
                    <div className="text-lg font-bold text-blue-600">{feedbackStats.feedbackPercentage}%</div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${feedbackStats.feedbackPercentage}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Target: 80%</span>
                    <span>Last updated: {feedbackStats.lastUpdateTime}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                    <div className="text-xs text-gray-500 mb-1">Total Reviews</div>
                    <div className="text-xl font-bold text-gray-900">{feedbackStats.totalReviewed.toLocaleString()}</div>
                  </div>
                  <div className="bg-green-50 border border-green-100 rounded-lg p-4 text-center">
                    <div className="text-xs text-gray-500 mb-1">Used in Training</div>
                    <div className="text-xl font-bold text-green-600">{feedbackStats.usedInTraining.toLocaleString()}</div>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 text-center">
                    <div className="text-xs text-gray-500 mb-1">Pending</div>
                    <div className="text-xl font-bold text-yellow-600">{feedbackStats.pendingIncorporation.toLocaleString()}</div>
                  </div>
                </div>
                
                {/* Weekly Progress Chart */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-medium text-gray-800">Weekly Feedback Flow</h3>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                        <span className="text-xs text-gray-600">Feedback</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                        <span className="text-xs text-gray-600">Incorporated</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-48 flex items-end space-x-2">
                    {weeklyProgress.map((day, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center space-y-1">
                        {/* Feedback bar */}
                        <div className="w-full bg-blue-500 bg-opacity-20 rounded-t relative">
                          <div 
                            className="w-full bg-blue-500 absolute bottom-0 rounded-t"
                            style={{ height: `${(day.feedback / 200) * 100}%` }}
                          ></div>
                        </div>
                        
                        {/* Incorporated bar */}
                        <div className="w-full bg-green-500 bg-opacity-20 rounded-t relative">
                          <div 
                            className="w-full bg-green-500 absolute bottom-0 rounded-t"
                            style={{ height: `${(day.incorporated / 200) * 100}%` }}
                          ></div>
                        </div>
                        
                        {/* Day label */}
                        <div className="text-xs text-gray-500 mt-2">{day.day}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Feedback Categories */}
                <div>
                  <h3 className="text-sm font-medium text-gray-800 mb-3">Feedback Categories</h3>
                  <div className="space-y-3">
                    {feedbackCategories.map((category, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center">
                            <div className={`w-3 h-3 ${category.color} rounded-full mr-2`}></div>
                            <span className="text-sm text-gray-700">{category.name}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="text-xs text-gray-500">{category.count.toLocaleString()}</span>
                            <span className="text-xs font-medium text-gray-900">{category.percentage}%</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className={`${category.color} h-1.5 rounded-full`} 
                            style={{ width: `${category.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Performance Impact */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <BarChart2 className="mr-2 h-5 w-5 text-gray-600" />
                  Performance Impact
                </h2>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {Object.entries(performanceMetrics).map(([key, metric], i) => (
                    <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <span className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <div className={`flex items-center ${
                          metric.trend === 'up' 
                            ? 'text-green-600' 
                            : metric.trend === 'down' && (key === 'falsePositives' || key === 'latency')
                              ? 'text-green-600'
                              : metric.trend === 'down'
                                ? 'text-red-600'
                                : 'text-gray-600'
                        }`}>
                          {metric.trend === 'up' ? (
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3 mr-1" />
                          )}
                          <span className="text-xs font-medium">
                            {Math.abs((metric.current - metric.previous) / metric.previous * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <div className="mt-1 text-xl font-bold text-gray-900">
                        {typeof metric.current === 'number' && Number.isInteger(metric.current) 
                          ? metric.current
                          : metric.current.toFixed(2)}
                        {key === 'latency' ? 'ms' : key === 'falsePositives' ? '%' : ''}
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        Previous: {metric.previous}
                        {key === 'latency' ? 'ms' : key === 'falsePositives' ? '%' : ''}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-indigo-800">Positive Performance Trend</h3>
                      <div className="mt-2 text-sm text-indigo-700">
                        <p>Human feedback is effectively improving model performance across key metrics. Continue collecting diverse feedback for optimal results.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recent Model Updates */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <GitCommit className="mr-2 h-5 w-5 text-gray-600" />
                  Recent Model Updates
                </h2>
                <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                  <Download className="h-4 w-4 mr-1.5" />
                  Export History
                </button>
              </div>
              
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Improvements</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentUpdates.map((update, i) => (
                      <tr key={i} className={update.status === 'active' ? 'bg-blue-50' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {update.version}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {update.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${update.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'}`}
                          >
                            {update.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {update.improvements}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    <span className="font-medium">{feedbackStats.cyclesCompleted}</span> training cycles completed
                  </span>
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    View All Updates
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Feedback Loop Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="font-medium text-gray-800">Current Status</h3>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full border-4 border-blue-200 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                        <RotateCcw className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Feedback Loop</div>
                      <div className="text-xs text-gray-500">Active and healthy</div>
                    </div>
                  </div>
                  <div className="flex items-center px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    <CheckCircle className="h-3.5 w-3.5 mr-1" />
                    Operational
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700">Last Update</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{feedbackStats.lastUpdateTime}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700">Next Update</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{feedbackStats.nextUpdateTime}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700">Active Reviewers</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">32</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Brain className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700">Learning Rate</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">0.01</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-900">Current Threshold</span>
                    </div>
                    <span className="text-sm font-medium text-blue-600">75%</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Minimum confidence score required for auto-processing
                  </p>
                </div>
              </div>
            </div>
            
            {/* Learning Process */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="font-medium text-gray-800">Learning Process</h3>
              </div>
              
              <div className="p-6">
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="text-sm text-gray-700">Human Review</span>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  
                  <div className="ml-4 h-6 border-l-2 border-dashed border-blue-200"></div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                        <Filter className="h-4 w-4 text-indigo-600" />
                      </div>
                      <span className="text-sm text-gray-700">Feedback Collection</span>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  
                  <div className="ml-4 h-6 border-l-2 border-dashed border-indigo-200"></div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                        <PieChart className="h-4 w-4 text-purple-600" />
                      </div>
                      <span className="text-sm text-gray-700">Data Incorporation</span>
                    </div>
                    <div className="animate-pulse">
                      <div className="w-5 h-5 rounded-full border-2 border-purple-500 flex items-center justify-center">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-4 h-6 border-l-2 border-dashed border-purple-200"></div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                        <Brain className="h-4 w-4 text-yellow-600" />
                      </div>
                      <span className="text-sm text-gray-700">Model Retraining</span>
                    </div>
                    <div className="text-gray-300">
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                    </div>
                  </div>
                  
                  <div className="ml-4 h-6 border-l-2 border-dashed border-yellow-200"></div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <Zap className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-sm text-gray-700">Deployment</span>
                    </div>
                    <div className="text-gray-300">
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 text-xs text-gray-500 text-center">
                  Feedback Loop Cycle: <span className="font-medium">In Progress</span>
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="font-medium text-gray-800">Quick Actions</h3>
              </div>
              
              <div className="p-4">
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between px-4 py-2.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                    <div className="flex items-center">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Force Retrain Model
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  
                  <button className="w-full flex items-center justify-between px-4 py-2.5 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium">
                    <div className="flex items-center">
                      <Sliders className="h-4 w-4 mr-2" />
                      Adjust Thresholds
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  
                  <button className="w-full flex items-center justify-between px-4 py-2.5 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium">
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-2" />
                      View Feedback Logs
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Help Panel */}
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-sm font-medium text-blue-800 mb-3">About Feedback Loops</h3>
              <p className="text-sm text-blue-600 mb-4">
                Feedback loops continuously improve model performance by incorporating human expertise
                into the training process.
              </p>
              <div className="space-y-2">
                <a href="#" className="flex items-center text-sm text-blue-700 hover:text-blue-900">
                  <Info className="h-4 w-4 mr-2" />
                  How Feedback Loops Work
                </a>
                <a href="#" className="flex items-center text-sm text-blue-700 hover:text-blue-900">
                  <Info className="h-4 w-4 mr-2" />
                  Improving Feedback Quality
                </a>
                <a href="#" className="flex items-center text-sm text-blue-700 hover:text-blue-900">
                  <Info className="h-4 w-4 mr-2" />
                  Measuring Effectiveness
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}