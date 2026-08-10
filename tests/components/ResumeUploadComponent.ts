import { expect, Locator, Page } from "@playwright/test";

export class ResumeUploadComponent {

    readonly browseButton: Locator;
    readonly fileInput: Locator;
    readonly successAlert: Locator;
    readonly errorAlert: Locator;

    constructor(private page: Page) {

        this.browseButton =
            page.getByRole("button", {
                name: "Browse Files"
            });

        this.fileInput =
            page.getByTestId("resume-file-input");

        this.successAlert =
            page.getByRole("alert")
                .filter({
                    hasText: "Selected File:"
                });

        this.errorAlert =
            page.getByRole("alert");
    }

    async uploadResume(file: string) {

        await this.fileInput
            .setInputFiles(file);

    }

    async expectUploadedFile(fileName: string) {

        await expect(this.successAlert)
            .toContainText(fileName);

    }

    async expectError(message: string) {

        await expect(this.errorAlert)
            .toContainText(message);

    }

}