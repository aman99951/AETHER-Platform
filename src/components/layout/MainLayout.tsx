import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const MainLayout: React.FC = () => {
  const [activeModule, setActiveModule] = useState<string>('Home');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const main = document.querySelector('main');
    if (main) {
      main.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar 
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* TopBar */}
        <TopBar 
          setSidebarOpen={setSidebarOpen}
        />
              <div className="flex-1 flex flex-col">
        {/* TopBar */}
        <TopBar 
          setSidebarOpen={setSidebarOpen}
        />
                      <div className="flex-1 flex flex-col">
        {/* TopBar */}
        <TopBar 
          setSidebarOpen={setSidebarOpen}
        />

        {/* Routed Page Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
