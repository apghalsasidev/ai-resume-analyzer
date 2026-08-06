import {
  ALLOWED_RESUME_FILE_TYPES,
  MAX_RESUME_FILE_SIZE_BYTES,
  VALIDATION_ERROR_CODES,
  VALIDATION_ERROR_MESSAGES,
} from './validationConstants';
import { ValidationResult } from './validationTypes';

export function validateResumeFile(file: File): ValidationResult {
    if (file.size === 0) {
        return {
            valid: false,
            code: VALIDATION_ERROR_CODES.EMPTY_FILE,
            message: VALIDATION_ERROR_MESSAGES.EMPTY_FILE,
        } as ValidationResult;  
    }
    const extensionStartIndex = file.name.lastIndexOf('.');
    if (extensionStartIndex === -1) {
        // Invalid file type
        return {
            valid: false,
            code: VALIDATION_ERROR_CODES.INVALID_FILE_TYPE,
            message: VALIDATION_ERROR_MESSAGES.INVALID_FILE_TYPE,
        } as ValidationResult;
    }
    const fileExtension = file.name
        .substring(extensionStartIndex + 1)
        .toLowerCase();
    if (!ALLOWED_RESUME_FILE_TYPES.includes(fileExtension as "pdf" | "docx" | "doc")) {
        return {
            valid: false,
            code: VALIDATION_ERROR_CODES.INVALID_FILE_TYPE,
            message: VALIDATION_ERROR_MESSAGES.INVALID_FILE_TYPE,
        } as ValidationResult;
    }

    // File size validation
    if (file.size > MAX_RESUME_FILE_SIZE_BYTES) {
        return {
            valid: false,
            code: VALIDATION_ERROR_CODES.FILE_TOO_LARGE,
            message: VALIDATION_ERROR_MESSAGES.FILE_TOO_LARGE,
        } as ValidationResult;
    }

  return {
    valid: true,
    code: null,
    message: '',
  } as ValidationResult;
}