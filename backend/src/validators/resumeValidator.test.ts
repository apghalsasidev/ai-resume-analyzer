import { describe, expect, it } from "vitest";
import { validateResumeFile } from "./resumeValidator.js";

describe("validateResumeFile", () => {
    it("should accept a valid PDF resume", () => {
        const file = {
            originalname: "resume.pdf",
            size: 1024,
        } as Express.Multer.File;

        const result = validateResumeFile(file);

        expect(result).toEqual({ valid: true });
    });
    it("should accept a valid DOC resume", () => {
        const file = {
            originalname: "resume.doc",
            size: 1024,
        } as Express.Multer.File;

        expect(validateResumeFile(file)).toEqual({ valid: true });
    });

    it("should accept a valid DOCX resume", () => {
        const file = {
            originalname: "resume.docx",
            size: 1024,
        } as Express.Multer.File;

        expect(validateResumeFile(file)).toEqual({ valid: true });
    });

    it("should accept resume extensions case-insensitively", () => {
        const file = {
            originalname: "resume.PDF",
            size: 1024,
        } as Express.Multer.File;

        expect(validateResumeFile(file)).toEqual({ valid: true });
    });

    it("should reject an empty resume file", () => {
        const file = {
            originalname: "resume.pdf",
            size: 0,
        } as Express.Multer.File;

        expect(validateResumeFile(file)).toEqual({
            valid: false,
            code: "EMPTY_FILE",
            message: "Resume file cannot be empty.",
        });
    });

    it("should reject an unsupported file type", () => {
        const file = {
            originalname: "resume.txt",
            size: 1024,
        } as Express.Multer.File;

        expect(validateResumeFile(file)).toEqual({
            valid: false,
            code: "UNSUPPORTED_FILE_TYPE",
            message: "Unsupported resume file type.",
        });
    });

    it("should reject a resume larger than 5 MB", () => {
        const file = {
            originalname: "resume.pdf",
            size: 5 * 1024 * 1024 + 1,
        } as Express.Multer.File;

        expect(validateResumeFile(file)).toEqual({
            valid: false,
            code: "FILE_TOO_LARGE",
            message: "Resume file exceeds the maximum allowed size.",
        });
    });
});