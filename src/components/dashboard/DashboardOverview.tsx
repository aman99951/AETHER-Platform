import React from 'react';
import { User } from 'lucide-react';
import logo from '../../assets/logo.png'; // Adjust path as needed

const DashboardOverview: React.FC = () => {
  const reviewers = [
    { name: 'Reviewer 1', progress: 85 },
    { name: 'Reviewer 2', progress: 60 },
    { name: 'Reviewer 3', progress: 45 },
    { name: 'Reviewer 4', progress: 30 },
    { name: 'Reviewer 5', progress: 20 },
  ];

  const recentActivities = [
    { user: 'Uploaded 2 cases', time: 'Today' },
    { user: 'Reviewer File 10', time: 'Yesterday' },
    { user: 'Flagged File 10', time: 'Yesterday' },
    { user: 'Flagged an Alert', time: '2 days ago' },
  ];

  const securityEvents = [
    'Falco alert',
    'Trivy scan result',
    'Compliance audit flag'
  ];

  const ProgressBar = ({ value, max = 100 }: { value: number; max?: number }) => (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  );

  const DashboardCard = ({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) => (
    <div className={`bg-white rounded-lg shadow p-4 lg:p-6 ${className}`}>
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
      {children}
    </div>
  );


  return (
<div className="p-4 lg:p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">

        <DashboardCard title="Backlog Status">
          <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">18,200</div>
          <ProgressBar value={35} />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Toward 2-Month Goal</span>
            <span>35%</span>
          </div>
        </DashboardCard>

        <DashboardCard title="Daily Throughput">
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl lg:text-3xl font-bold text-gray-900">715</div>
            <span className="text-sm text-gray-500">Today</span>
          </div>
          <div className="text-sm text-gray-600 mb-2">Cases Processed</div>
          <ProgressBar value={715} max={1000} />
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Human Reviewed</span>
              <span className="font-medium">715</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Auto-Cleared</span>
              <span className="font-medium">37</span>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="System Health">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm text-gray-600">AI Pipeline</span>
              </div>
              <span className="text-sm font-medium text-green-600">Operational</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                <span className="text-sm text-gray-600">Storage Usage</span>
              </div>
              <span className="text-sm font-medium">80%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-sm text-gray-600">Task Queue</span>
              </div>
              <span className="text-sm font-medium">37</span>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Reviewer Snapshot">
          <div className="space-y-4">
            {reviewers.map((reviewer, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                  <User size={16} className="text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{reviewer.name}</div>
                  <ProgressBar value={reviewer.progress} />
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="AI Accuracy Trends">
          <div className="text-sm text-gray-600 mb-4">7-Day Trend</div>
          <div className="h-24 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg flex items-end justify-center relative mb-4">
            <svg className="w-full h-full" viewBox="0 0 200 60">
              <path 
                d="M 10 40 Q 50 30 90 35 T 170 25" 
                stroke="#3B82F6" 
                strokeWidth="2" 
                fill="none"
                className="animate-pulse"
              />
            </svg>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Redaction Accuracy</span>
              <span className="font-medium">74%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Audio/Video Summ</span>
              <span className="font-medium">25%</span>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Security Events">
          <div className="space-y-3">
            {securityEvents.map((event, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
                <span className="text-sm text-gray-700">{event}</span>
              </div>
            ))}
          </div>
        </DashboardCard>

        <div className="lg:col-span-2 space-y-4">
          <DashboardCard title="Recent Activity">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <User size={16} className="text-gray-600" />
                    </div>
                    <span className="text-sm text-gray-900 truncate">{activity.user}</span>
                  </div>
                  <span className="text-sm text-gray-500 flex-shrink-0 ml-4">{activity.time}</span>
                </div>
              ))}
            </div>
          </DashboardCard>
          </div>
          <div className="space-y-10">
          <DashboardCard title="Quick Access">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm">
                Upload Cases
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                Jump to Queue
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                Audit Log
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                Settings
              </button>
            </div>
          
          </DashboardCard>
       
       <DashboardCard title="">
            <div className="flex items-center space-x-3">
              <img 
                src={logo} 
                alt="Aether Logo" 
                className="w-12 h-12"
              />
              <span className="text-lg font-bold text-gray-900 tracking-wide">AETHER</span>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
