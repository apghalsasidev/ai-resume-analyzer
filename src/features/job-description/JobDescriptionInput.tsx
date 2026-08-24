import React, { useState } from "react";

import { Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import {
    JOB_DESCRIPTION_PLACEHOLDER,
    MAX_JOB_DESCRIPTION_LENGTH,
} from "./jobDescriptionConstants";
import { validateJobDescription } from "./validateJobDescription";

interface JobDescriptionInputProps {
    value: string;
    onChange: (value: string) => void;
}

const JobDescriptionInput = React.memo(({value, onChange}: JobDescriptionInputProps) => {
    const [error, setError] = useState<string | null>(null);
    const handleBlur = () => {
        const result = validateJobDescription(value);

        if (!result.valid) {
            setError(result.message);
            return;
        }

        setError(null);
    };
    
    const handleChange = (newValue: string) => {
        onChange(newValue);

        if (error) {
            const result = validateJobDescription(newValue);

            if (result.valid) {
                setError(null);
            }
        }
    };
    return (
        <Card elevation={3}>
            <CardContent>
                <Stack spacing={2}>
                    <Stack spacing={1}>
                        <Typography variant="h5">
                            Job Description
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            Paste the job description you're applying for.
                            We'll compare your resume against this position.
                        </Typography>
                    </Stack>

                    <TextField
                        label="Job Description"
                        placeholder={JOB_DESCRIPTION_PLACEHOLDER}
                        multiline
                        minRows={6}
                        maxRows={12}
                        value={value}
                        onChange={(event) =>
                            handleChange(event.target.value)
                        }
                        onBlur={handleBlur}
                        error={!!error}         
                        helperText={error ?? " "}
                        slotProps={{
                            htmlInput: {
                                maxLength: MAX_JOB_DESCRIPTION_LENGTH,
                            },
                        }}
                        fullWidth
                    />
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ textAlign: "right" }}
                    >
                        {value.length} / {MAX_JOB_DESCRIPTION_LENGTH}
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
});

export default JobDescriptionInput;