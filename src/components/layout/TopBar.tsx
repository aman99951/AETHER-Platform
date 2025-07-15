import React from 'react';
import { User, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface TopBarProps {
  setSidebarOpen: (open: boolean) => void;
}

const TopBar: React.FC<TopBarProps> = ({ setSidebarOpen }) => {
  const location = useLocation();

  const getActiveModule = (): string => {
    if (location.pathname.startsWith('/dashboard')) return 'Home';
    if (location.pathname.startsWith('/ingestion')) return 'Ingestion';
    if (location.pathname.startsWith('/ai')) return 'AI Processing';
    if (location.pathname.startsWith('/review')) return 'Review Queue';
    if (location.pathname.startsWith('/cases')) return 'Cases';
    if (location.pathname.startsWith('/analytics')) return 'Analytics';
    if (location.pathname.startsWith('/audit')) return 'Audit Logs';
    if (location.pathname.startsWith('/security')) return 'Security & Compliance';
    if (location.pathname.startsWith('/admin')) return 'Admin Tools';
    return 'Home';
  };

  const activeModule = getActiveModule();

  const ingestionTabs = [
    { name: 'Upload Cases', path: '/ingestion/upload-cases' },
    { name: 'Batch Monitor', path: '/ingestion/batch-monitor' },
    { name: 'Routing Rules', path: '/ingestion/routing-rules' },
  ];

  const dashboardTabs = [
    { name: 'Overview', path: '/dashboard/overview' },
    { name: 'Recent Activity', path: '/dashboard/recent-activity' },
    { name: 'Quick Actions', path: '/dashboard/quick-actions' },
  ];

  const getTabs = () => {
    if (activeModule === 'Home') return dashboardTabs;
    if (activeModule === 'Ingestion') return ingestionTabs;
    return [];
  };

  const getModuleIcon = (module: string) => {
    const iconMap: { [key: string]: string } = {
      'Home': '🏠',
      'Ingestion': '📥',
      'AI Processing': '🧠',
      'Review Queue': '👁️',
      'Cases': '📂',
      'Analytics': '📊',
      'Audit Logs': '📝',
      'Security & Compliance': '🔒',
      'Admin Tools': '⚙️',
    };
    return iconMap[module] || '🏠';
  };

  const getDisplayTitle = (module: string) => {
    if (module === 'Home') return 'Home';
    return module;
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 lg:px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-600 hover:text-gray-900"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center space-x-2">
            <span className="text-xl">{getModuleIcon(activeModule)}</span>
            <span className="text-lg lg:text-xl font-semibold text-gray-900">
              {getDisplayTitle(activeModule)}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 bg-blue-500 text-white px-3 lg:px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            <User size={16} />
            <span className="hidden sm:inline">Aether</span>
          </button>
        </div>
      </div>

      {['Home', 'Ingestion'].includes(activeModule) && (
        <div className="flex space-x-4 lg:space-x-8 px-4 lg:px-6 overflow-x-auto">
          {getTabs().map((tab) => (
            <Link
              key={tab.name}
              to={tab.path}
              className={`py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                location.pathname === tab.path
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopBar;