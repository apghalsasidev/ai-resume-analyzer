import { useRef, useState, ChangeEvent } from 'react';

import { Box, Card, CardContent, Stack, Typography, Button, Alert } from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { ACCEPTED_FILE_EXTENSIONS, MAX_FILE_SIZE_MB } from '@/constants/file';
import { validateResumeFile } from './validateResumeFile';

const ResumeUploadCard = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    function processSelectedFile(file: File) {
        // 4.1 Validate
        const result = validateResumeFile(file);
        
        // 4.2 Handle Validation Result
        if (!result.valid) {
            setSelectedFile(null);
            setError(result.message);
            return;
        }

        // 4.3 Successful Validation: Set the selected file
        setSelectedFile(file);
        setError(null);
    }

    const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
        // 1. Read selected file
        const file = event.target.files?.[0];
        
        // 2. Handle Cancelled File Selection
        if (!file) {
            return;
        } 
        // 3. Process the selected file
        processSelectedFile(file);

        // 4. After selecting file, clear input value to allow re-selection
        event.target.value = '';
    };

    return (
    <Card elevation={3}> 
        <CardContent>
            <Stack direction="column" spacing={4} sx={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                {/* Header */}
                <Stack direction="column" spacing={2} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="h5">Upload Your Resume</Typography>
                    <Typography variant="body2"> Upload your resume in PDF or DOCX format to begin AI-powered
              resume analysis.</Typography>
                </Stack>
                {/* File Upload Section */}
                <Box 
                    onClick={handleBrowseClick}
                    sx={{ 
                        border: '2px dashed #1976d2', 
                        borderRadius: '8px', 
                        p: 4, 
                        width: '100%', 
                        textAlign: 'center' 
                    }}
                >
                    <Stack spacing={2} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                        <CloudUploadOutlinedIcon 
                            color="primary"
                            sx={{ fontSize: 56 }}
                        />
                        <Typography variant="h6">
                            Drag & Drop your resume here
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            or
                        </Typography>
                        <Button variant="contained">
                            Browse Files
                        </Button> 
                        <Typography variant="caption" color="text.secondary">
                            {ACCEPTED_FILE_EXTENSIONS.join(' • ') } | Max file size: {MAX_FILE_SIZE_MB}MB
                        </Typography>
                    </Stack>
                    <input
                        ref={fileInputRef}
                        type="file"
                        hidden
                        accept={ACCEPTED_FILE_EXTENSIONS.join(',')}
                        onChange={handleFileSelect}
                    />
                    {
                        error && (
                            <Alert severity="error" sx={{ mt: 2 }}>
                                {error} 
                            </Alert>
                        )
                    }
                    {
                        selectedFile && (
                            <Alert severity="success" sx={{ mt: 2 }}>
                                Selected File: {selectedFile.name}
                            </Alert>
                        )
                    }
                </Box>
            </Stack>
        </CardContent>
    </Card>
  )
};
export default ResumeUploadCard;