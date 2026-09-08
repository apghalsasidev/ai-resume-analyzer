export const ALLOWED_RESUME_EXTENSIONS = [
    ".pdf",
    ".doc",
    ".docx",
] as const;

export const MAX_RESUME_FILE_SIZE_IN_BYTES = 5 * 1024 * 1024;
export const RESUME_VALIDATION_ERRORS = {
    EMPTY_FILE: {
        code: "EMPTY_FILE",
        message: "Resume file cannot be empty.",
    },
    UNSUPPORTED_FILE_TYPE: {
        code: "UNSUPPORTED_FILE_TYPE",
        message: "Unsupported resume file type.",
    },
    FILE_TOO_LARGE: {
        code: "FILE_TOO_LARGE",
        message: "Resume file exceeds the maximum allowed size.",
    },
} as const;