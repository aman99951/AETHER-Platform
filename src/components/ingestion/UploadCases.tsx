import React, { useState } from 'react';

const UploadCases = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const simulateUpload = () => {
    if (files.length === 0) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsUploading(false), 500);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 rounded-t-xl">
        <h2 className="text-xl font-semibold text-gray-900">Upload Cases</h2>
        <p className="text-sm text-gray-500 mt-1">
          Upload case files for processing and analysis
        </p>
      </div>

      {/* Main content */}
      <div className="p-6">
        {/* Upload area */}
        <div 
          className={`
            border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors
            ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="mx-auto w-16 h-16 mb-4 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3-3m0 0l3 3m-3-3v12" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            Drag and drop files here
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            or select files from your computer
          </p>
          <label className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors cursor-pointer">
            Browse Files
            <input 
              type="file" 
              multiple 
              className="hidden" 
              onChange={handleFileSelect}
              accept=".pdf,.doc,.docx,.txt"
            />
          </label>
          <p className="text-xs text-gray-500 mt-3">
            Supported formats: PDF, DOC, DOCX, TXT (Max 100MB per file)
          </p>
        </div>

        {/* File list */}
        {files.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Selected Files ({files.length})</h3>
            <div className="border border-gray-200 rounded-md divide-y divide-gray-200 max-h-48 overflow-y-auto">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between py-3 px-4 hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-md text-blue-600 mr-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button 
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => removeFile(index)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload progress */}
        {isUploading && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Uploading...</span>
              <span className="text-sm text-gray-500">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <button 
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={simulateUpload}
            disabled={files.length === 0 || isUploading}
          >
            Upload Files
          </button>
          <button 
            className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            onClick={() => setFiles([])}
            disabled={files.length === 0 || isUploading}
          >
            Clear All
          </button>
        </div>

        {/* API Upload */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
          <h3 className="text-sm font-medium text-gray-700 mb-3">API Upload</h3>
          <div className="bg-gray-900 text-gray-200 rounded-md">
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700">
              <span className="text-xs font-mono">CURL Command</span>
              <button className="text-xs text-blue-400 hover:text-blue-300">
                Copy
              </button>
            </div>
            <pre className="p-4 text-xs font-mono overflow-x-auto">
{`curl -X POST https://api.aether.io/upload \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@/path/to/case.pdf" \\
  -F "metadata=@/path/to/metadata.json"`}
            </pre>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            For more information on API usage, please refer to the <a href="#" className="text-blue-600 hover:underline">API documentation</a>.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-xl">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <p className="text-xs text-gray-500">
            Files are securely processed according to your organization's compliance settings.
          </p>
          <button className="text-xs text-blue-600 hover:text-blue-800">
            View Upload History
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadCases;