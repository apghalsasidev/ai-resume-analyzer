import { VALIDATION_ERROR_CODES } from './validationConstants';
export type ValidationErrorCode =
  (typeof VALIDATION_ERROR_CODES)[keyof typeof VALIDATION_ERROR_CODES];
export type ValidationResult =
  | {
      valid: true;
    }
  | {
      valid: false;
      code: ValidationErrorCode;
      message: string;
    };