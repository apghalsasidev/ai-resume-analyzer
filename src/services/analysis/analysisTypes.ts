export interface AnalyzeResumeRequest {
    resume: File;
    jobDescription: string;
}

export interface AnalyzeResumeResponse {
    overallScore: number;
    atsScore: number;

    skills: {
        matched: string[];
        missing: string[];
    };

    keywords: {
        matched: string[];
        missing: string[];
    };

    experienceMatch: {
        score: number;
        summary: string;
    };

    recommendations: string[];
}
export interface ApiErrorResponse {
    code: string;
    message: string;
}