import type { Request, Response } from "express";

import { analyzeResume as runAnalysis } from "../services/analysisService.js";

export const analyzeResume = async (
    request: Request,
    response: Response
) => {
    const file = request.file;
    const { jobDescription } = request.body;

    if (!file) {
        response.status(400).json({
            code: "INVALID_RESUME",
            message: "Resume file is required.",
        });

        return;
    }

    if (!jobDescription?.trim()) {
        response.status(400).json({
            code: "INVALID_JOB_DESCRIPTION",
            message: "Job description is required.",
        });

        return;
    }

    const result = await runAnalysis({
        resume: file,
        jobDescription,
    });

    response.status(200).json(result);
};