import type {
    AnalyzeResumeRequest,
    AnalyzeResumeResponse,
} from "./analysisTypes";

export interface AnalysisService {
    analyzeResume(
        request: AnalyzeResumeRequest
    ): Promise<AnalyzeResumeResponse>;
}