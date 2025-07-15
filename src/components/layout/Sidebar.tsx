// src/components/layout/Sidebar.tsx
import React from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeModule,
  setActiveModule,
  sidebarOpen,
  setSidebarOpen,
}) => {
  const sidebarItems = [
    { icon: '🏠', label: 'Home', key: 'Home', path: '/dashboard/overview' },
    { icon: '📥', label: 'Ingestion', key: 'Ingestion', path: '/ingestion/upload-cases' },
    { icon: '🧠', label: 'AI Processing', key: 'AI Processing', path: 'ai/pipelines' },
    { icon: '👁️', label: 'Review Queue', key: 'Review Queue' },
    { icon: '📂', label: 'Cases', key: 'Cases', },
    { icon: '📊', label: 'Analytics', key: 'Analytics' },
    { icon: '📝', label: 'Audit Logs', key: 'Audit Logs'},
    { icon: '🔒', label: 'Security & Compliance', key: 'Security & Compliance' },
    { icon: '⚙️', label: 'Admin Tools', key: 'Admin Tools' },
  ];

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div className="flex items-center justify-between p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 flex items-center justify-center">
            <img
              src={logo}
              alt="Aether Logo"
              className="w-6 h-6 object-contain"
            />
          </div>
          <span className="text-xl font-bold">AETHER</span>
        </div>
        <button 
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-white hover:text-gray-300"
        >
          <X size={24} />
        </button>
      </div>
      
      <nav className="flex-1 py-4">
        {sidebarItems.map((item) => (
          <Link
            to={item.path!}
            key={item.key}
            onClick={() => {
              setActiveModule(item.key);
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-6 py-3 text-left hover:bg-slate-800 transition-colors ${
              activeModule === item.key ? 'bg-slate-800 border-r-2 border-blue-500' : ''
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-sm lg:text-base">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
