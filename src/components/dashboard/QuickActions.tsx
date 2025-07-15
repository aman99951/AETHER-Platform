import { Upload, Eye, FileDown, ArrowRight, Zap } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      icon: Upload,
      label: 'Upload Case',
      description: 'Add new FOIA cases',
      color: 'blue',
      primary: true,
      stats: '12 pending'
    },
    {
      icon: Eye,
      label: 'Review Queue',
      description: 'Check pending reviews',
      color: 'purple',
      stats: '24 items'
    },
    {
      icon: FileDown,
      label: 'Export Logs',
      description: 'Download activity logs',
      color: 'gray',
      stats: 'Last: 2h ago'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Quick Actions
          </h2>
          <p className="text-sm text-gray-500 mt-1">Frequently used operations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          const isPrimary = action.primary;
          
          return (
            <button
              key={index}
              className={`
                relative group p-4 rounded-lg border transition-all duration-200
                ${isPrimary 
                  ? 'bg-blue-600 border-blue-600 text-white hover:bg-blue-700 hover:shadow-lg' 
                  : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-md'
                }
              `}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`
                  p-2 rounded-lg transition-colors
                  ${isPrimary 
                    ? 'bg-blue-700' 
                    : action.color === 'purple' 
                      ? 'bg-purple-100 text-purple-600' 
                      : 'bg-gray-100 text-gray-600'
                  }
                `}>
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowRight className={`
                  w-4 h-4 transition-transform group-hover:translate-x-1
                  ${isPrimary ? 'text-blue-200' : 'text-gray-400'}
                `} />
              </div>
              
              <div className="text-left">
                <h3 className={`font-semibold mb-1 ${isPrimary ? 'text-white' : 'text-gray-900'}`}>
                  {action.label}
                </h3>
                <p className={`text-sm mb-2 ${isPrimary ? 'text-blue-100' : 'text-gray-500'}`}>
                  {action.description}
                </p>
                <p className={`text-xs font-medium ${isPrimary ? 'text-blue-200' : 'text-gray-400'}`}>
                  {action.stats}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;