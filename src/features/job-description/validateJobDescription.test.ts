import { describe, expect, it } from "vitest";

import { validateJobDescription } from "./validateJobDescription";
import { JOB_DESCRIPTION_ERROR_MESSAGES } from "./jobDescriptionConstants";

describe("validateJobDescription", () => {
    it("should return invalid for an empty job description", () => {
        const result = validateJobDescription("");

        expect(result.valid).toBe(false);

        if (!result.valid) {
            expect(result.message).toBe(
                JOB_DESCRIPTION_ERROR_MESSAGES.REQUIRED
            );
        }
    });

    it("should return invalid for a whitespace-only job description", () => {
        const result = validateJobDescription("   ");

        expect(result.valid).toBe(false);

        if (!result.valid) {
            expect(result.message).toBe(
                JOB_DESCRIPTION_ERROR_MESSAGES.REQUIRED
            );
        }
    });

    it("should return valid for a non-empty job description", () => {
        const result = validateJobDescription(
            "Senior React Developer with TypeScript experience"
        );

        expect(result.valid).toBe(true);
    });
});