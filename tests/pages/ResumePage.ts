import { expect, Locator, Page } from "@playwright/test";

export class ResumePage {
    readonly heading: Locator;

    constructor(private page: Page) {
        this.page = page;
        this.heading = this.page.getByRole("heading", {
            name: "Upload Your Resume"
        });
    }

    async navigate() {
        await this.page.goto("/");
    }

    async verifyPageLoaded() {
        await expect(
            this.heading
        ).toBeVisible();
    }
}