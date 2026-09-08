import { ALLOWED_RESUME_EXTENSIONS, MAX_RESUME_FILE_SIZE_IN_BYTES, RESUME_VALIDATION_ERRORS } from "../constants/resume.js";

export type ResumeValidationResult =
    | {
          valid: true;
      }
    | {
          valid: false;
          code: string;
          message: string;
      };

export function validateResumeFile(
    file: Express.Multer.File
): ResumeValidationResult {
    if (file.size === 0) {
        return {
            valid: false,
            ...RESUME_VALIDATION_ERRORS.EMPTY_FILE,
        };
    }

    const extension = file.originalname
        .slice(file.originalname.lastIndexOf("."))
        .toLowerCase();
        
    const isAllowedExtension = ALLOWED_RESUME_EXTENSIONS.some( (allowedExtension) => allowedExtension === extension );

    if (!isAllowedExtension) {
        return {
            valid: false,
            ...RESUME_VALIDATION_ERRORS.UNSUPPORTED_FILE_TYPE,
        };
    }

    if (file.size > MAX_RESUME_FILE_SIZE_IN_BYTES) {
        return {
            valid: false,
            ...RESUME_VALIDATION_ERRORS.FILE_TOO_LARGE,
        };
    }

    return {
        valid: true,
    };
}