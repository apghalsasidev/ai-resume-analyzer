import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "./app.js";

describe("GET /", () => {
    it("should return the API message", async () => {
        const response = await request(app)
            .get("/");

        expect(response.status).toBe(200);

        expect(response.body).toEqual({
            message: "Resume Analyzer API",
        });
    });
});