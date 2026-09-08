import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "./app.js";

describe("POST /api/resume/analyze", () => {
    it("should accept a valid resume and job description", async () => {
        const response = await request(app)
            .post("/api/resume/analyze")
            .attach("resume", Buffer.from("fake resume content"), {
                filename: "resume.pdf",
                contentType: "application/pdf",
            })
            .field(
                "jobDescription",
                "Senior React Developer with TypeScript experience"
            );

        expect(response.status).toBe(200);
    });
});