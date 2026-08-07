import { Page, Locator, expect } from '@playwright/test';

export class ResumeUploadPage {
  readonly page: Page;

  readonly browseButton: Locator;
  readonly fileInput: Locator;
  readonly successAlert: Locator;
  readonly errorAlert: Locator;

  constructor(page: Page) {
    this.page = page;

    this.browseButton = page.getByRole('button', {
      name: 'Browse Files',
    });

    this.fileInput = page.locator('input[type="file"]');

    this.successAlert = page.getByRole('alert').filter({
      hasText: 'Selected File:',
    });

    this.errorAlert = page.getByRole('alert');
  }

  async navigate() {
    await this.page.goto('/');
  }
}