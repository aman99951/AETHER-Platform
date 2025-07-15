import { useState } from 'react';
import { RefreshCw, Search, FileText, AlertCircle, CheckCircle, Clock, Download, Filter, MoreHorizontal } from 'lucide-react';

// Extended dummy data for demonstration
const dummyData = [
  { id: '1001', file: 'FOIA-2023-A1289.pdf', size: '1.2MB', status: 'processed', timestamp: '2023-08-15 09:30', errors: 0, pages: 12 },
  { id: '1002', file: 'CASE-283-Request.pdf', size: '3.1MB', status: 'pending', timestamp: '2023-08-15 10:15', errors: 1, pages: 24 },
  { id: '1003', file: 'Discovery-XZ-1920.docx', size: '524KB', status: 'failed', timestamp: '2023-08-15 08:45', errors: 3, pages: 7 },
  { id: '1004', file: 'Evidence-29103.zip', size: '15.7MB', status: 'processing', timestamp: '2023-08-15 11:05', errors: 0, pages: 42 },
  { id: '1005', file: 'Witness-Statement-01.pdf', size: '876KB', status: 'processed', timestamp: '2023-08-14 16:30', errors: 0, pages: 5 },
];

const BatchMonitor = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStatus, setFilteredStatus] = useState('all');
  
  // Filter data based on search term and status filter
  const filteredData = dummyData.filter(item => {
    const matchesSearch = item.file.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filteredStatus === 'all' || item.status === filteredStatus;
    return matchesSearch && matchesStatus;
  });
  
  // Calculate summary statistics
  const stats = {
    total: dummyData.length,
    processed: dummyData.filter(i => i.status === 'processed').length,
    pending: dummyData.filter(i => i.status === 'pending' || i.status === 'processing').length,
    failed: dummyData.filter(i => i.status === 'failed').length,
    totalErrors: dummyData.reduce((sum, item) => sum + item.errors, 0)
  };
  
  // Handle refresh action
  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };
  
  // Get appropriate status badge
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'processed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Processed
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1 animate-spin" />
            Processing
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Failed
          </span>
        );
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Batch Monitor</h2>
            <p className="text-sm text-gray-500 mt-1">
              Track and manage document processing status
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
              />
            </div>
            
            <button
              onClick={handleRefresh}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-white border-b border-gray-200">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-800">Total Files</p>
              <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FileText className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4 border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800">Processed</p>
              <p className="text-2xl font-bold text-green-900">{stats.processed}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-800">Pending</p>
              <p className="text-2xl font-bold text-yellow-900">{stats.pending}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Clock className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4 border border-red-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-800">Errors</p>
              <p className="text-2xl font-bold text-red-900">{stats.totalErrors}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <AlertCircle className="h-6 w-6 text-red-500" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="px-6 py-3 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
        <div className="flex items-center">
          <Filter className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-sm font-medium text-gray-700 mr-3">Filter:</span>
          <select
            value={filteredStatus}
            onChange={(e) => setFilteredStatus(e.target.value)}
            className="border border-gray-300 rounded-md text-sm py-1 px-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="processed">Processed</option>
            <option value="processing">Processing</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
        
        <div className="text-sm text-gray-500">
          Showing {filteredData.length} of {dummyData.length} files
        </div>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                File Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Size
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pages
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timestamp
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Errors
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FileText className="flex-shrink-0 h-5 w-5 text-gray-400 mr-3" />
                    <div className="text-sm font-medium text-gray-900">{item.file}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.size}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.pages}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.timestamp}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(item.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.errors > 0 ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                      {item.errors} {item.errors === 1 ? 'error' : 'errors'}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-500">None</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-3">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Empty State */}
      {filteredData.length === 0 && (
        <div className="text-center py-12">
          <div className="flex justify-center">
            <FileText className="h-12 w-12 text-gray-300" />
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No files found</h3>
          <p className="mt-1 text-sm text-gray-500">
            No files match your current search or filter criteria.
          </p>
          <div className="mt-6">
            <button
              onClick={() => {
                setSearchTerm('');
                setFilteredStatus('all');
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Clear filters
            </button>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1" /> Last updated: Just now
        </div>
        <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
          <Download className="h-4 w-4 mr-1" /> Export Results
        </button>
      </div>
    </div>
  );
};

export default BatchMonitor;