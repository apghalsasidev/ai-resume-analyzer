import { describe, expect, it } from "vitest";
import { validateResumeFile } from './validateResumeFile';
import { MAX_RESUME_FILE_SIZE_BYTES, VALIDATION_ERROR_CODES,VALIDATION_ERROR_MESSAGES } from "./validationConstants";
import createTestFile  from "../../test/utils/testUtils";
describe("validateResumeFile", () => {

    describe("Valid files", () => { 
        it('should accept a valid PDF file', () => {
            // Arrange
            const file = createTestFile();
            // Act
            const result = validateResumeFile(file);
            // Assert
            expect(result).toEqual({
                valid: true,
                code: null,
                message: '',
            });

        });

        it('should accept a valid DOCX file', () => {
            // Arrange
            const file = createTestFile({
                name: 'resume.docx',
                type: 'application/docx'
            });
            // Act
            const result = validateResumeFile(file);
            // Assert
            expect(result).toEqual({
                valid:true,
                code: null,
                message: '',
            })
        });
    });

    describe("Invalid files", () => {
        it('should reject an empty file', () => {
            // Arrange
            const file  = createTestFile({ 
                size: 0 
            });
            // Act
            const result = validateResumeFile(file);
            // Assert
            expect(result).toEqual({
                valid: false,
                code: VALIDATION_ERROR_CODES.EMPTY_FILE,
                message: VALIDATION_ERROR_MESSAGES.EMPTY_FILE,
            });
        });

        it('should reject unsupported file extensions', () =>{
            // Arrange
            const file = createTestFile({
                name: 'resume.txt',
                type: 'application/pdf'
            });
            // Act
            const result = validateResumeFile(file);
            // Assert
            expect(result).toEqual({
                valid: false,
                code: VALIDATION_ERROR_CODES.INVALID_FILE_TYPE,
                message: VALIDATION_ERROR_MESSAGES.INVALID_FILE_TYPE,
            });
        });

        it(" should reject files without an extension", () => {
            // Arrange
            const file = createTestFile({
                name: 'resume',
                type: 'application/pdf'
            });
            // Act
            const result = validateResumeFile(file);
            // Assert
            expect(result).toEqual({
                valid: false,
                code: VALIDATION_ERROR_CODES.INVALID_FILE_TYPE,
                message: VALIDATION_ERROR_MESSAGES.INVALID_FILE_TYPE,
            });
        });
    });

    describe("Boundary conditions", () => {
        it('should accept a file exactly equal to the maximum allowed size', () => {
            // Arrange
            const file = createTestFile({ 
                size: MAX_RESUME_FILE_SIZE_BYTES 
            });
            // Act
            const result = validateResumeFile(file);
            // Assert
            expect(result).toEqual({
                valid: true,
                code: null,
                message: '',
            });
        });

        it("should reject files larger than the maximum allowed size", () => {
            // Arrange
            const file  =  createTestFile({
                size: MAX_RESUME_FILE_SIZE_BYTES + 1
            })
            // Act
            const result = validateResumeFile(file);
            // assert
            expect(result).toEqual({
                valid: false,
                code: VALIDATION_ERROR_CODES.FILE_TOO_LARGE,
                message: VALIDATION_ERROR_MESSAGES.FILE_TOO_LARGE,
            });
        });
    });

    describe("Edge cases", () => {
        it("should accept uppercase PDF extension",() =>{
            // Arrange
            const file = createTestFile({
                name: 'resume.PDF',
            });
            // Act
            const result = validateResumeFile(file);
            // Assert
            expect(result).toEqual({
                valid: true,
                code: null,
                message: '',
            });
        });

        it("should accept mixed-case PDF extension", () => {
            // Arrange
            const file = createTestFile({
                name: 'resume.PdF',
            });
            // Act
            const result = validateResumeFile(file);
            // Assert
            expect(result).toEqual({
                valid: true,
                code: null,
                message: '',
            });
        });

        it("should accept filenames with multiple dots" , () => {
            // Arrange
            const file = createTestFile({
                name: 'my.resume.v1.pdf',
            });
            // Act
            const result = validateResumeFile(file);
            // Assert
            expect(result).toEqual({
                valid: true,
                code: null,
                message: '',
            });
        });
    });

});