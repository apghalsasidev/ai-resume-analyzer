import type { Express } from "express";

interface AnalyzeResumeInput {
    resume: Express.Multer.File;
    jobDescription: string;
}

export const analyzeResume = async ({
    resume,
    jobDescription,
}: AnalyzeResumeInput) => {
    // Resume parsing and analysis will be implemented here.
    
    return {
        message: "Analysis service received the request.",
        resumeName: resume.originalname,
        jobDescription,
    };
};