import express from "express";
import analysisRouter from "./routes/analysisRoutes.js";

const app = express();

app.use((request, _response, next) => {
    console.log(`${request.method} ${request.url}`);
    next();
});

app.use("/api", analysisRouter);

app.get("/", (_request, response) => {
    response.json({
        message: "Resume Analyzer API",
    });
});

export default app;