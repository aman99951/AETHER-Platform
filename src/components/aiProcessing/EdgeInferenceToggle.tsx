import { useState, useEffect } from 'react';
import { 
  Smartphone, AlertTriangle, Server, Zap, 
  Clock, CloudOff, ArrowLeft, BarChart2, 
  Shield, Cpu, Settings, HardDrive, Info,
  CheckCircle, XCircle, RefreshCw, Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';


export default function EdgeInferenceToggle() {
  const [enabled, setEnabled] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [latencyData, setLatencyData] = useState({
    edge: 76,
    cloud: 243
  });
  const [devices, setDevices] = useState([
    { id: 1, name: 'Edge Server 01', status: 'online', type: 'server', load: 24 },
    { id: 2, name: 'Mobile Processing Unit', status: 'online', type: 'mobile', load: 18 },
    { id: 3, name: 'Desktop Agent 05', status: 'offline', type: 'desktop', load: 0 },
    { id: 4, name: 'Field Scanner A2', status: 'standby', type: 'scanner', load: 3 },
    { id: 5, name: 'Processing Node B7', status: 'online', type: 'server', load: 42 }
  ]);

  const toggleEdgeInference = () => {
    setShowConfirmation(true);
  };

  const confirmToggle = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setEnabled(!enabled);
      setLoading(false);
      setShowConfirmation(false);
      
      // Simulate latency changes
      if (!enabled) {
        setLatencyData({
          edge: Math.floor(Math.random() * 30) + 60,
          cloud: Math.floor(Math.random() * 50) + 220
        });
      }
    }, 1500);
  };

  const cancelToggle = () => {
    setShowConfirmation(false);
  };

  const getDeviceIcon = (type:string) => {
    switch(type) {
      case 'server': return <HardDrive className="h-5 w-5" />;
      case 'mobile': return <Smartphone className="h-5 w-5" />;
      case 'desktop': return <Cpu className="h-5 w-5" />;
      case 'scanner': return <Zap className="h-5 w-5" />;
      default: return <Server className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status:string) => {
    switch(status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-red-500';
      case 'standby': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };

  useEffect(() => {
    // If we wanted to fetch actual device status, we'd do it here
    const interval = setInterval(() => {
      if (enabled) {
        // Simulate changing load values for online devices
        setDevices(prev => prev.map(device => 
          device.status === 'online' 
            ? { ...device, load: Math.min(100, Math.max(5, device.load + Math.floor(Math.random() * 10) - 5)) }
            : device
        ));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [enabled]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
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
            <h1 className="text-2xl font-bold text-gray-900">Edge Inference</h1>
          </div>
          <p className="text-gray-600 max-w-3xl">
            Process data directly on edge devices for lower latency and reduced cloud dependency.
            Ideal for time-sensitive applications and environments with limited connectivity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Control Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Toggle Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Cpu className="h-5 w-5 mr-2 text-gray-600" />
                  Edge Processing Control
                </h2>
              </div>
              
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <div className="flex items-start">
                    <div className={`p-3 rounded-full mr-4 ${enabled ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'}`}>
                      {enabled ? <Smartphone className="h-6 w-6" /> : <CloudOff className="h-6 w-6" />}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-lg">Edge Inference</h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {enabled ? 'Processing data on edge devices for faster results' : 'Currently using cloud processing for all inference'}
                      </p>
                      <div className="mt-2 flex items-center">
                        <div className={`h-2.5 w-2.5 rounded-full ${enabled ? 'bg-green-500' : 'bg-gray-400'} mr-2`}></div>
                        <span className={`text-sm font-medium ${enabled ? 'text-green-700' : 'text-gray-500'}`}>
                          {enabled ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={toggleEdgeInference}
                    disabled={loading}
                    className={`
                      px-5 py-2.5 rounded-lg font-medium text-white min-w-[120px]
                      ${enabled 
                        ? 'bg-gray-700 hover:bg-gray-800' 
                        : 'bg-blue-600 hover:bg-blue-700'
                      }
                      ${loading ? 'opacity-50 cursor-not-allowed' : ''}
                      transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                    `}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        {enabled ? 'Disable' : 'Enable'}
                      </div>
                    )}
                  </button>
                </div>
                
                {enabled && (
                  <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-green-50 rounded-lg border border-green-100 p-4">
                      <div className="text-xs text-gray-500 mb-1">Latency Reduction</div>
                      <div className="text-2xl font-bold text-green-700">
                        {Math.round((latencyData.cloud - latencyData.edge) / latencyData.cloud * 100)}%
                      </div>
                      <div className="text-xs text-gray-500 mt-1">vs. cloud processing</div>
                    </div>
                    
                    <div className="bg-blue-50 rounded-lg border border-blue-100 p-4">
                      <div className="text-xs text-gray-500 mb-1">Active Devices</div>
                      <div className="text-2xl font-bold text-blue-700">
                        {devices.filter(d => d.status === 'online').length}/{devices.length}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">connected and ready</div>
                    </div>
                    
                    <div className="bg-purple-50 rounded-lg border border-purple-100 p-4">
                      <div className="text-xs text-gray-500 mb-1">Avg Load</div>
                      <div className="text-2xl font-bold text-purple-700">
                        {Math.round(devices.reduce((acc, d) => acc + d.load, 0) / devices.length)}%
                      </div>
                      <div className="text-xs text-gray-500 mt-1">across all devices</div>
                    </div>
                  </div>
                )}
                
                {enabled && (
                  <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-amber-800">Testing Mode Active</h3>
                        <div className="mt-2 text-sm text-amber-700">
                          <p>Edge inference is currently in testing mode. Performance may vary and some features might be limited.</p>
                        </div>
                        <div className="mt-3">
                          <button className="text-sm font-medium text-amber-800 hover:text-amber-900 underline">
                            View Documentation
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {!enabled && (
                  <div className="mt-6">
                    <h3 className="font-medium text-gray-800 mb-3">Benefits of Edge Inference</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-start">
                        <div className="bg-blue-100 p-2 rounded-md mr-3">
                          <Clock className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-800">Reduced Latency</h4>
                          <p className="text-xs text-gray-600 mt-1">
                            Process data locally to avoid network delays and achieve near real-time results.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-green-100 p-2 rounded-md mr-3">
                          <Shield className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-800">Enhanced Privacy</h4>
                          <p className="text-xs text-gray-600 mt-1">
                            Keep sensitive data on local devices instead of transmitting to cloud servers.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-purple-100 p-2 rounded-md mr-3">
                          <CloudOff className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-800">Offline Capability</h4>
                          <p className="text-xs text-gray-600 mt-1">
                            Continue processing without internet connectivity in remote locations.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-amber-100 p-2 rounded-md mr-3">
                          <BarChart2 className="h-4 w-4 text-amber-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-800">Cost Efficiency</h4>
                          <p className="text-xs text-gray-600 mt-1">
                            Reduce cloud computing costs by leveraging your existing edge infrastructure.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Performance Comparison */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <BarChart2 className="h-5 w-5 mr-2 text-gray-600" />
                  Performance Comparison
                </h2>
              </div>
              
              <div className="p-6">
                <div className="mb-8">
                  <h3 className="text-sm font-medium text-gray-700 mb-4">Latency Comparison</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <div className="flex items-center">
                          <Smartphone className="h-4 w-4 mr-1.5 text-blue-600" />
                          <span>Edge Processing</span>
                        </div>
                        <span className="font-medium">{latencyData.edge} ms</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${(latencyData.edge / latencyData.cloud) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <div className="flex items-center">
                          <Server className="h-4 w-4 mr-1.5 text-gray-600" />
                          <span>Cloud Processing</span>
                        </div>
                        <span className="font-medium">{latencyData.cloud} ms</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-gray-500 h-2.5 rounded-full" 
                          style={{ width: '100%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-4">Resource Allocation</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-700">Edge Memory</span>
                        <span className="text-sm font-medium text-gray-900">1.8 GB</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-500 h-2 rounded-full" 
                          style={{ width: '45%' }}
                        ></div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500 text-right">45% usage</div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-700">Edge CPU</span>
                        <span className="text-sm font-medium text-gray-900">75%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-500 h-2 rounded-full" 
                          style={{ width: '75%' }}
                        ></div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500 text-right">Headroom: 25%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Edge Devices */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Layers className="h-5 w-5 mr-2 text-gray-600" />
                  Edge Devices
                </h2>
                <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                  <Settings className="h-4 w-4 mr-1.5" />
                  Configure Devices
                </button>
              </div>
              
              <div className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Device
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Load
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {devices.map((device) => (
                        <tr key={device.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className={`
                                flex-shrink-0 h-10 w-10 rounded-md flex items-center justify-center
                                ${device.status === 'online' ? 'bg-blue-100' : 'bg-gray-100'}
                              `}>
                                {getDeviceIcon(device.type)}
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">{device.name}</div>
                                <div className="text-xs text-gray-500">ID: {device.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 capitalize">{device.type}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`
                              inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                              ${device.status === 'online' ? 'bg-green-100 text-green-800' : 
                                device.status === 'offline' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'}
                            `}>
                              <div className={`w-1.5 h-1.5 ${getStatusColor(device.status)} rounded-full mr-1.5`}></div>
                              {device.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {device.status === 'online' ? (
                              <div>
                                <div className="flex items-center">
                                  <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                                    <div 
                                      className={`h-2 rounded-full ${
                                        device.load > 80 ? 'bg-red-500' :
                                        device.load > 50 ? 'bg-yellow-500' : 'bg-green-500'
                                      }`} 
                                      style={{ width: `${device.load}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-xs font-medium text-gray-900">{device.load}%</span>
                                </div>
                              </div>
                            ) : (
                              <span className="text-xs text-gray-500">—</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-indigo-600 hover:text-indigo-900 mr-3">Details</button>
                            <button className={`
                              ${device.status === 'offline' ? 'text-green-600 hover:text-green-900' : 'text-gray-600 hover:text-gray-900'}
                            `}>
                              {device.status === 'offline' ? 'Connect' : 'Configure'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Showing {devices.length} devices</span>
                  <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                    Add New Device
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* System Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="font-medium text-gray-800">System Status</h3>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full ${enabled ? 'bg-green-500' : 'bg-gray-400'} mr-2`}></div>
                    <span className="text-sm text-gray-700">Edge Inference</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{enabled ? 'Active' : 'Inactive'}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm text-gray-700">API Connectivity</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">Connected</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm text-gray-700">Model Status</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">v1.3.2</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                    <span className="text-sm text-gray-700">Device Network</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">3/5 Online</span>
                </div>
              </div>
            </div>
            
            {/* Quick Test */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="font-medium text-gray-800">Quick Test</h3>
              </div>
              
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-4">
                  Run a quick inference test to verify system performance.
                </p>
                
                <button
                  disabled={!enabled}
                  className={`
                    w-full py-2 px-4 rounded-lg border text-sm font-medium
                    ${!enabled 
                      ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' 
                      : 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'}
                  `}
                >
                  Run Diagnostic Test
                </button>
                
                {!enabled && (
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Enable edge inference to run tests
                  </p>
                )}
              </div>
            </div>
            
            {/* Documentation */}
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-sm font-medium text-blue-800 mb-3">Learn More</h3>
              <p className="text-sm text-blue-600 mb-4">
                Edge inference allows you to process data directly on your devices, reducing latency and improving privacy.
              </p>
              <div className="space-y-2">
                <a href="#" className="flex items-center text-sm text-blue-700 hover:text-blue-900">
                  <Info className="h-4 w-4 mr-2" />
                  Device Requirements
                </a>
                <a href="#" className="flex items-center text-sm text-blue-700 hover:text-blue-900">
                  <Info className="h-4 w-4 mr-2" />
                  Performance Optimization
                </a>
                <a href="#" className="flex items-center text-sm text-blue-700 hover:text-blue-900">
                  <Info className="h-4 w-4 mr-2" />
                  Security Considerations
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {enabled ? 'Disable' : 'Enable'} Edge Inference?
            </h3>
            <p className="text-gray-600 mb-6">
              {enabled 
                ? 'Disabling edge inference will return all processing to the cloud. This may increase latency and data transfer costs.'
                : 'Enabling edge inference will process data on local devices when available. This may reduce latency but could affect battery life on mobile devices.'
              }
            </p>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  {enabled 
                    ? <Server className="h-5 w-5 text-gray-500" />
                    : <Smartphone className="h-5 w-5 text-blue-500" />
                  }
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">
                    {enabled ? 'Switching to Cloud Processing' : 'Switching to Edge Processing'}
                  </h4>
                  <div className="mt-1 text-xs text-gray-500">
                    {enabled 
                      ? 'All processing will be handled by cloud servers' 
                      : '5 edge devices are available for processing'
                    }
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelToggle}
                className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmToggle}
                className={`
                  px-4 py-2 text-sm font-medium text-white rounded-lg
                  ${enabled 
                    ? 'bg-gray-700 hover:bg-gray-800' 
                    : 'bg-blue-600 hover:bg-blue-700'
                  }
                `}
              >
                {loading ? (
                  <div className="flex items-center">
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center">
                    {enabled ? <XCircle className="h-4 w-4 mr-1.5" /> : <CheckCircle className="h-4 w-4 mr-1.5" />}
                    {enabled ? 'Disable' : 'Enable'}
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}