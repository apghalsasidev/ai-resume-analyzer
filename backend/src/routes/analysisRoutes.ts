import { Router } from "express";

import upload from "../middleware/uploadMiddleware.js";
import { analyzeResume } from "../controller/analysisController.js";

const analysisRouter = Router();

analysisRouter.post(
    "/resume/analyze",
    upload.single("resume"),
    analyzeResume
);

export default analysisRouter;