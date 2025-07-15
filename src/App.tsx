import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import DashboardOverview from './components/dashboard/DashboardOverview';
import QuickActions from './components/dashboard/QuickActions';
import RecentActivity from './components/dashboard/RecentActivity';

import UploadCases from './components/ingestion/UploadCases';
import BatchMonitor from './components/ingestion/BatchMonitor';
import RoutingRules from './components/ingestion/RoutingRules';

import AIPipelines from './components/aiProcessing/AIPipelines';
import ConfidenceSettings from './components/aiProcessing/ConfidenceSettings';
import ModelExplainability from './components/aiProcessing/ModelExplainability';
import ActiveLearningTuner from './components/aiProcessing/ActiveLearningTuner';
import EdgeInferenceToggle from './components/aiProcessing/EdgeInferenceToggle';
import FeedbackLoopStatus from './components/aiProcessing/FeedbackLoopStatus';
import ScrollToTop from './components/layout/ScrollToTop';
function App() {
  return (
    <Router>
<ScrollToTop/>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Dashboard Routes */}
          <Route index element={<Navigate to="/dashboard/overview" replace />} />
          <Route path="dashboard/overview" element={<DashboardOverview />} />
          <Route path="dashboard/recent-activity" element={<RecentActivity />} />
          <Route path="dashboard/quick-actions" element={<QuickActions />} />

          {/* Ingestion Routes */}
          <Route path="ingestion/upload-cases" element={<UploadCases />} />
          <Route path="ingestion/batch-monitor" element={<BatchMonitor />} />
          <Route path="ingestion/routing-rules" element={<RoutingRules />} />

          {/* AI Processing Routes */}
          <Route path="ai/pipelines" element={<AIPipelines />} />
          <Route path="ai/confidence-settings" element={<ConfidenceSettings />} />
          <Route path="ai/model-explainability" element={<ModelExplainability />} />
          <Route path="ai/active-learning-tuner" element={<ActiveLearningTuner />} />
          <Route path="ai/edge-inference-toggle" element={<EdgeInferenceToggle />} />
          <Route path="ai/feedback-loop-status" element={<FeedbackLoopStatus />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;