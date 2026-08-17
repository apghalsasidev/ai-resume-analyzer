import { JOB_DESCRIPTION_ERROR_MESSAGES } from "./jobDescriptionConstants";
type ValidationResult =
    | {
          valid: true;
      }
    | {
          valid: false;
          message: string;
      };
export function validateJobDescription( jobDescription: string): ValidationResult {
    if (!jobDescription.trim()) {
        return {
            valid: false,
            message: JOB_DESCRIPTION_ERROR_MESSAGES.REQUIRED,
        } as ValidationResult;
    }

    return {
        valid: true,
        message: "",
    } as ValidationResult;
}