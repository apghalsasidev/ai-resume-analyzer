import { useState } from "react";
import { Container, Stack, Button } from "@mui/material";
import ResumeUploadCard from "./ResumeUploadCard";
import JobDescriptionInput from "@/features/job-description/JobDescriptionInput";
const ResumeUploadPage = () => {
    const [jobDescription, setJobDescription] = useState("");
    return(
        <Container sx={{
            marginTop: 2,
        }}>
            <Stack spacing={3}>
                <ResumeUploadCard />
                <JobDescriptionInput 
                    value={jobDescription}
                    onChange={setJobDescription}
                />
                <Button>
                    Analyze Resume
                </Button>
            </Stack>
        </Container>
    )
};

export default ResumeUploadPage;