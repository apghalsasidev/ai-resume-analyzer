import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import ResumeUploadCard from "./ResumeUploadCard";
import createTestFile  from "../../test/utils/testUtils";

describe("ResumeUploadCard", () => {
     describe('Rendering', () => {
        it('should render the upload heading', () => {
            // Arrange
            render(<ResumeUploadCard />);
            // Assert
            expect(
                screen.getByRole('heading', { name: /Upload Your Resume/i })
            ).toBeInTheDocument();
        });

        it('should render upload description', () => {
            // Arrange
            render(<ResumeUploadCard />);
            // Assert
            expect(
                screen.getByText(/Upload your resume in PDF, DOC or DOCX format to begin AI-powered resume analysis./i)
            ).toBeInTheDocument();
        });

        it('should render Browse Files button', () => {
            // Arrange
            render(<ResumeUploadCard />);
            // Assert
            expect(
                screen.getByRole('button', {name:/Browse Files/i})
            ).toBeInTheDocument();
        });
    });

    describe("File Upload", () => {
        it("should display the selected filename after uploading a valid file", async () => {
            // Arrange
            const user = userEvent.setup();
            render(<ResumeUploadCard />);
            const resumeFile = createTestFile({
                name: "Resume.pdf",
            });
            const fileInput = screen.getByTestId("resume-upload-input");
            // Act
            await user.upload(fileInput, resumeFile);
            // Assert
            const successAlert = await screen.findByRole("alert");
            expect(successAlert).toBeInTheDocument();
            expect(successAlert).toHaveTextContent("Selected File:");
            expect(successAlert).toHaveTextContent("Resume.pdf");
        });
    });
});