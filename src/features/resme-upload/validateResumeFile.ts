import {
  ALLOWED_RESUME_FILE_TYPES,
  MAX_RESUME_FILE_SIZE_BYTES,
  VALIDATION_ERROR_CODES,
} from './validationConstants';
import { ValidationResult } from './validationTypes';

export function validateResumeFile(file: File): ValidationResult {
    if (file.size === 0) {
        return {
            valid: false,
            code: VALIDATION_ERROR_CODES.EMPTY_FILE,
            message: 'The selected file is empty.',
        } as ValidationResult;  
    }
    const extensionStartIndex = file.name.lastIndexOf('.');
    if (extensionStartIndex === -1) {
        // Invalid file type
        return {
            valid: false,
            code: VALIDATION_ERROR_CODES.INVALID_FILE_TYPE,
            message: 'The selected file type is not supported.',
        } as ValidationResult;
    }
    const fileExtension = file.name
        .substring(extensionStartIndex + 1)
        .toLowerCase();
    console.log('File extension:', fileExtension);
    if (!ALLOWED_RESUME_FILE_TYPES.includes(fileExtension as "pdf" | "docx" | "doc")) {
        return {
            valid: false,
            code: VALIDATION_ERROR_CODES.INVALID_FILE_TYPE,
            message: 'Only PDF, DOC, and DOCX files are supported.',
        } as ValidationResult;
    }

    // File size validation
    if (file.size > MAX_RESUME_FILE_SIZE_BYTES) {
        return {
            valid: false,
            code: VALIDATION_ERROR_CODES.FILE_TOO_LARGE,
            message: 'The file size must not exceed 5 MB.',
        } as ValidationResult;
    }

  return {
    valid: true,
  } as ValidationResult;
}