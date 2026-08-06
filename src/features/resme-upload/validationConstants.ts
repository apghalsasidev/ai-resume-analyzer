export const ALLOWED_RESUME_FILE_TYPES = ['pdf', 'docx', 'doc'] as const;
export const MAX_RESUME_FILE_SIZE_BYTES = 5 * 1024 * 1024; // Maximum file size in bytes
export const VALIDATION_ERROR_CODES = {
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  EMPTY_FILE: 'EMPTY_FILE',
} as const;
export const VALIDATION_ERROR_MESSAGES = {
  INVALID_FILE_TYPE: 'Invalid file type. Only PDF, DOCX, and DOC files are allowed.',
  FILE_TOO_LARGE: 'File size exceeds the maximum limit of 5MB.',
  EMPTY_FILE: 'File is empty',
} as const;