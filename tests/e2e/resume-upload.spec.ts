import { test } from '@playwright/test';
import { ResumePage } from '../pages/ResumePage';

test.describe('Resume Upload', () => {

  test('should load Resume Analyzer page', async ({ page }) => {

    const resumePage = new ResumePage(page);

    await resumePage.navigate();

    await resumePage.verifyPageLoaded();

  });

});