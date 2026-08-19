import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import ResumeUploadCard from "./ResumeUploadCard";
import createTestFile  from "../../test/utils/testUtils";
import { MAX_RESUME_FILE_SIZE_BYTES, VALIDATION_ERROR_MESSAGES } from "./validationConstants";
import { DROP_MULTIPLE_FILES_ERROR } from "@/constants/file";

const setupResumeUpload = () => {
    // Arrange
    const user = userEvent.setup({
        applyAccept: false,
    });

    render(<ResumeUploadCard />);

    const fileInput = screen.getByTestId(
        "resume-upload-input"
    ) as HTMLInputElement;

    return {
        user,
        fileInput,
    };
};
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
            const { user, fileInput } = setupResumeUpload();
            const resumeFile = createTestFile({
                name: "Resume.pdf",
            });
            // Act
            await user.upload(fileInput, resumeFile);
            // Assert
            const successAlert = await screen.findByRole("alert");
            expect(successAlert).toBeInTheDocument();
            expect(successAlert).toHaveTextContent("Selected File:");
            expect(successAlert).toHaveTextContent("Resume.pdf");
        });
        it("should display an error after uploading an unsupported file", async () => {
            // Arrange
            const { user, fileInput } = setupResumeUpload();
            const invalidFile = createTestFile({
                name: "Resume.txt",
            });
            // Act
            await user.upload(fileInput, invalidFile);

            // Assert
            const errorAlert = await screen.findByRole("alert");
            expect(errorAlert).toBeInTheDocument();
            expect(errorAlert).toHaveTextContent(VALIDATION_ERROR_MESSAGES.INVALID_FILE_TYPE);
            expect(errorAlert).not.toHaveTextContent("Selected File:");
        });  
        it("should display an error after uploading an empty file", async () => {
            // Arrange
            const { user, fileInput } = setupResumeUpload();
            const emptyFile = createTestFile({
                size: 0
            })
            // Act
            await user.upload(fileInput, emptyFile);
            // Assert
            const errorAlert = await screen.findByRole("alert");
            expect(errorAlert).toBeInTheDocument();
            expect(errorAlert).toHaveTextContent(VALIDATION_ERROR_MESSAGES.EMPTY_FILE);
            expect(errorAlert).not.toHaveTextContent("Selected File:");
        });
        it("should display an error after uploading a file larger than the maximum size", async () => {
            // Arrange
            const { user, fileInput } = setupResumeUpload();
            const largeFile = createTestFile({
                size: MAX_RESUME_FILE_SIZE_BYTES + 1 // 6MB
            });
            // Act
            await user.upload(fileInput, largeFile);
            // Assert
            const errorAlert = await screen.findByRole("alert");
            expect(errorAlert).toBeInTheDocument();
            expect(errorAlert).toHaveTextContent(VALIDATION_ERROR_MESSAGES.FILE_TOO_LARGE);
            expect(errorAlert).not.toHaveTextContent("Selected File:");
        });
        it("should replace the error message with a success message after uploading a valid file", async () => {
            const { user, fileInput } = setupResumeUpload();
            const invalidFile = createTestFile({
                name: "Resume.txt",
            });
            // Act
            await user.upload(fileInput, invalidFile);

            // Assert
            const errorAlert = await screen.findByRole("alert");
            expect(errorAlert).toBeInTheDocument();
            expect(errorAlert).toHaveTextContent(VALIDATION_ERROR_MESSAGES.INVALID_FILE_TYPE);

            // Arrange 2
            const validFile = createTestFile({
                name: "Resume.pdf",
            });
            // Act 2
            await user.upload(fileInput, validFile);
            // Assert 2
            const successAlert = await screen.findByRole("alert");
            expect(successAlert).toBeInTheDocument();
            expect(successAlert).toHaveTextContent("Selected File:");
            expect(successAlert).toHaveTextContent("Resume.pdf");
            expect(
                screen.queryByText(
                    VALIDATION_ERROR_MESSAGES.INVALID_FILE_TYPE
                )
            ).not.toBeInTheDocument();
        });
    });
    describe("Drag and Drop", () => {
        it("should indicate when a file is being dragged over the upload area", () => {
            // Arrange
             render(<ResumeUploadCard />);

            const dropZone = screen.getByRole("region", {
                name: /resume upload area/i,
            });

            // Act
            fireEvent.dragEnter(dropZone);

            // Assert
            expect(
                screen.getByText(/Drop your resume here/i)
            ).toBeInTheDocument();
        });
        it("should reset the drag state when the file leaves the upload area", () => {
            // Arrange
            render(<ResumeUploadCard />);

            const dropZone = screen.getByRole("region", {
                name: /resume upload area/i,
            });

            // Act
            fireEvent.dragEnter(dropZone);
            expect(
                screen.getByText(/Drop your resume here/i)
            ).toBeInTheDocument();

            fireEvent.dragLeave(dropZone);

            // Assert
            expect(
                screen.getByText(/Drag & Drop your resume here/i)
            ).toBeInTheDocument();
        });
        it("should handle a valid file drop and display the selected filename", async () => {
            // Arrange
            render(<ResumeUploadCard />);
            const dropZone = screen.getByRole("region", {
                name: /resume upload area/i,
            });
             const resumeFile = createTestFile({
                name: "Resume.pdf",
            });
            // Act
            fireEvent.drop(dropZone, {
                dataTransfer: {
                    files: [resumeFile],
                },
            });
            // Assert
            const successAlert = await screen.findByRole("alert");

            expect(successAlert).toHaveTextContent("Selected File:");
            expect(successAlert).toHaveTextContent("Resume.pdf");
        });
        it("should display an error after dropping an unsupported file", async () => {
            // Arrange
            render(<ResumeUploadCard />);

            const dropZone = screen.getByRole("region", {
                name: /resume upload area/i,
            });

            const invalidFile = createTestFile({
                name: "Resume.txt",
                type: "text/plain",
            });

            // Act
            fireEvent.drop(dropZone, {
                dataTransfer: {
                    files: [invalidFile],
                },
            });

            // Assert
            const errorAlert = await screen.findByRole("alert");

            expect(errorAlert).toHaveTextContent(
                VALIDATION_ERROR_MESSAGES.INVALID_FILE_TYPE
            );

            expect(
                screen.queryByText("Selected File:")
            ).not.toBeInTheDocument();
        });
        it("should display an error when multiple files are dropped", async () => {
            // Arrange
            render(<ResumeUploadCard />);

            const dropZone = screen.getByRole("region", {
                name: /resume upload area/i,
            });

            const firstFile = createTestFile({
                name: "Resume.pdf",
            });

            const secondFile = createTestFile({
                name: "Resume2.pdf",
            });

            // Act
            fireEvent.drop(dropZone, {
                dataTransfer: {
                    files: [firstFile, secondFile],
                },
            });

            // Assert
            const errorAlert = await screen.findByRole("alert");

            expect(errorAlert).toHaveTextContent(
                DROP_MULTIPLE_FILES_ERROR
            );

            expect(
                screen.queryByText("Selected File:")
            ).not.toBeInTheDocument();
        });
        it("should display error message when an empty file is dropped", async () => {
            // Arrange
            render(<ResumeUploadCard />);
            const dropZone  = screen.getByRole("region", {
                name: /resume upload area/i,
            });
            const emptyFile = createTestFile({
                name: "EmptyResume.pdf",
                size: 0,
            });

            // Act
            fireEvent.drop(dropZone, {
                dataTransfer: {
                    files: [emptyFile],
                },
            });
            // Assert
            const errorAlert = await screen.findByRole("alert");
            expect(errorAlert).toHaveTextContent(
                VALIDATION_ERROR_MESSAGES.EMPTY_FILE
            );
            expect(
                screen.queryByText("Selected File:")
            ).not.toBeInTheDocument();
        });
        it("should remain in the idle state when no files are dropped", () => {
            // Arrange
            render(<ResumeUploadCard />);

            const dropZone = screen.getByRole("region", {
                name: /resume upload area/i,
            });

            // Act
            fireEvent.drop(dropZone, {
                dataTransfer: {
                    files: [],
                },
            });

            // Assert
            expect(
                screen.getByText(/Drag & Drop your resume here/i)
            ).toBeInTheDocument();

            expect(
                screen.queryByRole("alert")
            ).not.toBeInTheDocument();
        });
        it("should remain in dragging state until all drag enter events have been left", () => {
            // Arrange
            render(<ResumeUploadCard />);

            const dropZone = screen.getByRole("region", {
                name: /resume upload area/i,
            });

            // Act
            fireEvent.dragEnter(dropZone);
            // At this point counter = 1
            expect(
                screen.getByText(/Drop your resume here/i)
            ).toBeInTheDocument();

            fireEvent.dragEnter(dropZone);

            // counter = 2, so it should STILL be dragging
            expect(
                screen.getByText(/Drop your resume here/i)
            ).toBeInTheDocument();
            
            fireEvent.dragLeave(dropZone);

            // counter = 1, so it should STILL be dragging
            expect(
                screen.getByText(/Drop your resume here/i)
            ).toBeInTheDocument();

            fireEvent.dragLeave(dropZone);

            // counter = 0, so now it should return to idle
            // Assert
            expect(
                screen.getByText(/Drag & Drop your resume here/i)
            ).toBeInTheDocument();
        });
    });
    describe("Accessibility", () => {
        it("should allow keyboard users to focus the Browse Files button", async () => {
            // Arrange
            const user = userEvent.setup();
            render(<ResumeUploadCard />);

            const browseButton = screen.getByRole("button", {
                name: /Browse Files/i,
            });

            // Act
            await user.tab();
            // Assert
            expect(browseButton).toHaveFocus();
        });
    });
});