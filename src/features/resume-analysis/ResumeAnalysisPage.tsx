import { useState } from "react";
import { Button, Container, Stack } from "@mui/material";

import ResumeUploadCard from "@/features/resme-upload/ResumeUploadCard";
import JobDescriptionInput from "@/features/job-description/JobDescriptionInput";

const ResumeAnalysisPage = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [jobDescription, setJobDescription] = useState("");
    const canAnalyze = selectedFile !== null && jobDescription.trim().length > 0;
    return (
        <Container sx={{ mt: 2 }}>
            <Stack spacing={3}>
                <ResumeUploadCard
                    selectedFile={selectedFile}
                    onFileSelected={setSelectedFile}
     />

                <JobDescriptionInput 
                    value={jobDescription}
                    onChange={setJobDescription}
                />
                <Button
                    variant="contained"
                    disabled={!canAnalyze}
                >
                    Analyze Resume
                </Button>
            </Stack>
        </Container>
    );
};

export default ResumeAnalysisPage;