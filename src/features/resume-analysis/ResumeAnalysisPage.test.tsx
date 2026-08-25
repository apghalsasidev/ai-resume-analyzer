import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { describe, expect, it } from "vitest";

import ResumeAnalysisPage from "./ResumeAnalysisPage";
import createTestFile from "@/test/utils/testUtils";

describe("ResumeAnalysisPage", () => {
    it("should render the resume upload, job description and analyze button", () => {
        // Arrange
        render(<ResumeAnalysisPage />);

        // Assert
        expect(
            screen.getByRole("heading", {
                name: /Upload Your Resume/i,
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("heading", {
                name: /Job Description/i,
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", {
                name: /Analyze Resume/i,
            })
        ).toBeInTheDocument();
    });
    it("should disable Analyze Resume initially", () => {
        // Arrange
        render(<ResumeAnalysisPage />);

        // Assert
        expect(
            screen.getByRole("button", {
                name: /Analyze Resume/i,
            })
        ).toBeDisabled();
    });
    it("should keep Analyze Resume disabled when only a valid resume is provided", async () => {
        // Arrange
        const user = userEvent.setup({
            applyAccept: false,
        });

        render(<ResumeAnalysisPage />);

        const fileInput = screen.getByTestId("resume-upload-input");

        const resumeFile = createTestFile({
            name: "Resume.pdf",
        });

        // Act
        await user.upload(fileInput, resumeFile);

        // Assert
        expect(
            screen.getByRole("button", {
                name: /Analyze Resume/i,
            })
        ).toBeDisabled();
    });
    it("should keep Analyze Resume disabled when only a valid job description is provided", async () => {
        // Arrange
        const user = userEvent.setup();

        render(<ResumeAnalysisPage />);

        const textbox = screen.getByRole("textbox", {
            name: /Job Description/i,
        });

        // Act
        await user.type(textbox, "Senior React Developer with TypeScript experience");

        // Assert
        expect(
            screen.getByRole("button", {
                name: /Analyze Resume/i,
            })
        ).toBeDisabled();
    });
    it("should enable Analyze Resume when both resume and job description are provided", async () => {
        // Arrange
        const user = userEvent.setup({
            applyAccept: false,
        });

        render(<ResumeAnalysisPage />);

        const fileInput = screen.getByTestId("resume-upload-input");

        const resumeFile = createTestFile({
            name: "Resume.pdf",
        });

        const textbox = screen.getByRole("textbox", {
            name: /Job Description/i,
        });

        const analyzeButton = screen.getByRole("button", {
            name: /Analyze Resume/i,
        });

        // Act
        await user.upload(fileInput, resumeFile);

        await user.type(
            textbox,
            "Senior React Developer with TypeScript experience"
        );

        // Assert
        expect(analyzeButton).toBeEnabled();
    });

    it("should disable Analyze Resume when the selected resume becomes invalid", async () => {
        // Arrange
        const user = userEvent.setup({
            applyAccept: false,
        });

        render(<ResumeAnalysisPage />);

        const fileInput = screen.getByTestId("resume-upload-input");

        const validResume = createTestFile({
            name: "Resume.pdf",
        });

        const invalidResume = createTestFile({
            name: "Resume.txt",
            type: "text/plain",
        });

        const textbox = screen.getByRole("textbox", {
            name: /Job Description/i,
        });

        const analyzeButton = screen.getByRole("button", {
            name: /Analyze Resume/i,
        });

        // Act 1 — make the page analyzable
        await user.upload(fileInput, validResume);
        await user.type(
            textbox,
            "Senior React Developer with TypeScript experience"
        );

        // Assert 1
        expect(analyzeButton).toBeEnabled();

        // Act 2 — replace valid resume with invalid resume
        await user.upload(fileInput, invalidResume);

        // Assert 2
        expect(analyzeButton).toBeDisabled();
    });
});