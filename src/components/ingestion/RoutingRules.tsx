import { useState } from 'react';
import { PlusCircle, ArrowRight, Trash2, Edit2, HelpCircle, AlertTriangle } from 'lucide-react';

interface Rule {
  id: string;
  condition: string;
  destination: string;
}

const RoutingRules = () => {
  const [rules, setRules] = useState<Rule[]>([]);
  const [condition, setCondition] = useState('');
  const [destination, setDestination] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  
  const generateId = () => Math.random().toString(36).substring(2, 9);

  const addRule = () => {
    if (!condition || !destination) return;
    
    if (editingId) {
      setRules(rules.map(rule => 
        rule.id === editingId 
          ? { ...rule, condition, destination } 
          : rule
      ));
      setEditingId(null);
    } else {
      setRules([...rules, { id: generateId(), condition, destination }]);
    }
    
    setCondition('');
    setDestination('');
  };
  
  const editRule = (id: string) => {
    const ruleToEdit = rules.find(rule => rule.id === id);
    if (ruleToEdit) {
      setCondition(ruleToEdit.condition);
      setDestination(ruleToEdit.destination);
      setEditingId(id);
    }
  };
  
  const deleteRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Routing Rules</h2>
          <button 
            onClick={() => setShowHelp(!showHelp)}
            className="text-white/80 hover:text-white"
          >
            <HelpCircle size={20} />
          </button>
        </div>
        <p className="text-blue-100 text-sm mt-1">
          Define how cases are routed through the system based on their attributes
        </p>
      </div>
      
      {/* Help Panel */}
      {showHelp && (
        <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
          <div className="flex gap-3">
            <div className="text-blue-500 flex-shrink-0 mt-1">
              <HelpCircle size={20} />
            </div>
            <div>
              <h3 className="font-medium text-blue-800 text-sm">How Routing Works</h3>
              <p className="text-sm text-blue-700 mt-1">
                Rules are evaluated in order from top to bottom. The first matching condition will route the case to the specified destination.
              </p>
              <div className="mt-2 text-xs text-blue-700">
                <p className="font-medium">Example conditions:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li><code className="bg-blue-100 px-1 rounded">case_type:urgent</code> - Routes urgent cases</li>
                  <li><code className="bg-blue-100 px-1 rounded">sensitivity:high</code> - Routes highly sensitive cases</li>
                  <li><code className="bg-blue-100 px-1 rounded">department:legal</code> - Routes legal department cases</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Form */}
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
            <input
              type="text"
              placeholder="E.g., case_type:urgent"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
            <input
              type="text"
              placeholder="E.g., Priority Queue"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={addRule}
              disabled={!condition || !destination}
              className={`w-full flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-medium transition-colors ${
                !condition || !destination
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <PlusCircle size={18} />
              {editingId ? 'Update' : 'Add'} Rule
            </button>
          </div>
        </div>
        
        {editingId && (
          <div className="mt-3 flex items-center gap-2 text-sm">
            <AlertTriangle size={16} className="text-amber-500" />
            <span className="text-amber-600">
              Editing existing rule. 
              <button 
                onClick={() => {
                  setEditingId(null);
                  setCondition('');
                  setDestination('');
                }}
                className="ml-2 text-blue-600 hover:underline"
              >
                Cancel
              </button>
            </span>
          </div>
        )}
      </div>
      
      {/* Rules List */}
      <div className="px-6 py-5">
        <h3 className="text-md font-medium text-gray-800 mb-4 flex items-center gap-2">
          Active Rules
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {rules.length}
          </span>
        </h3>
        
        {rules.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500">No routing rules configured yet</p>
            <p className="text-sm text-gray-400 mt-1">Rules will appear here when you add them</p>
          </div>
        ) : (
          <div className="overflow-hidden border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-5">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Condition
                  </th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                    Routing
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Destination
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rules.map((rule, idx) => (
                  <tr key={rule.id} className={editingId === rule.id ? 'bg-blue-50' : 'hover:bg-gray-50'}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {idx + 1}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 py-1 text-sm bg-gray-100 rounded text-gray-800 font-mono">
                        {rule.condition}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      <ArrowRight size={18} className="text-gray-400 inline-block" />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded">
                        {rule.destination}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex gap-2 justify-end">
                        <button 
                          onClick={() => editRule(rule.id)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => deleteRule(rule.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {rules.length > 0 && (
          <p className="text-xs text-gray-500 mt-3">
            Rules are evaluated in order. Drag to reorder (coming soon).
          </p>
        )}
      </div>
    </div>
  );
};

export default RoutingRules;