import { test as base } from '@playwright/test';

import { ResumePage } from '../pages/ResumePage';
import { ResumeUploadComponent } from '../components/ResumeUploadComponent';

type TestFixtures = {
  resumePage: ResumePage;
  uploadComponent: ResumeUploadComponent;
};

export const test = base.extend<TestFixtures>({
  resumePage: async ({ page }, use) => {
    const resumePage = new ResumePage(page);

    await use(resumePage);
  },

  uploadComponent: async ({ page }, use) => {
    const uploadComponent =
      new ResumeUploadComponent(page);

    await use(uploadComponent);
  },
});

export { expect } from '@playwright/test';