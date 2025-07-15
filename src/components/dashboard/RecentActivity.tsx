
import { CheckCircle, Upload, AlertCircle, Clock, User, FileText, Bot } from 'lucide-react';

const activityLog = [
  { 
    id: 1, 
    type: "Reviewer Action", 
    message: "John approved redactions in Case #248", 
    time: "10 mins ago",
    user: "John Doe",
    status: "success"
  },
  { 
    id: 2, 
    type: "Upload", 
    message: "FOIA Case #301 uploaded", 
    time: "30 mins ago",
    user: "System",
    status: "info"
  },
  { 
    id: 3, 
    type: "Model Log", 
    message: "AI flagged sensitive entity in Case #276", 
    time: "1 hour ago",
    user: "AI Model",
    status: "warning"
  },
];

const RecentActivity = () => {
 const getActivityIcon = (type: string) => {
  switch (type) {
    case "Reviewer Action":
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case "Upload":
      return <Upload className="w-5 h-5 text-blue-500" />;
    case "Model Log":
      return <Bot className="w-5 h-5 text-purple-500" />;
    default:
      return <AlertCircle className="w-5 h-5 text-gray-500" />;
  }
};



  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-50 border-green-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      case "info":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Reviewer Action":
        return "text-green-700 bg-green-100";
      case "Upload":
        return "text-blue-700 bg-blue-100";
      case "Model Log":
        return "text-purple-700 bg-purple-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-600" />
            Recent Activity
          </h2>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
            View All
          </button>
        </div>
      </div>

      {/* Activity List */}
      <div className="divide-y divide-gray-100">
        {activityLog.map((log) => (
          <div 
            key={log.id} 
            className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${getStatusColor(log.status)} border-l-4`}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="flex-shrink-0 mt-0.5">
                {getActivityIcon(log.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getTypeColor(log.type)}`}>
                    {log.type}
                  </span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-500">{log.time}</span>
                </div>
                
                <p className="text-sm text-gray-900 font-medium mb-1">
                  {log.message}
                </p>
                
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <User className="w-3 h-3" />
                  <span>{log.user}</span>
                </div>
              </div>

              {/* Action Button */}
              <button className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors">
                <FileText className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
        <button className="w-full text-center text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors">
          Load More Activities
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;
