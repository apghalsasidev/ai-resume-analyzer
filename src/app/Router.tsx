import { createBrowserRouter } from 'react-router-dom';

import ResumeUploadPage from '@/features/resme-upload/ResumeUploadPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ResumeUploadPage />,
  },
]);

export default router;