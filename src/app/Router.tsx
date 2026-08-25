import { createBrowserRouter } from 'react-router-dom';

import ResumeAnalysisPage from "@/features/resume-analysis/ResumeAnalysisPage";
const router = createBrowserRouter([
  {
    path: '/',
    element: <ResumeAnalysisPage />,
  },
]);

export default router;