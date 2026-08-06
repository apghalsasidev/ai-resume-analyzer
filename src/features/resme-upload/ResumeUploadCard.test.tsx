import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ResumeUploadCard from "./ResumeUploadCard";

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
});