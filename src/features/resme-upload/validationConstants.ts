export const ALLOWED_RESUME_FILE_TYPES = ['pdf', 'docx', 'doc'] as const;
export const MAX_RESUME_FILE_SIZE_BYTES = 5 * 1024 * 1024; // Maximum file size in bytes
export const VALIDATION_ERROR_CODES = {
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  EMPTY_FILE: 'EMPTY_FILE',
} as const;