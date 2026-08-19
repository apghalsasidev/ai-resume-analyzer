import React, { useRef, useState, ChangeEvent } from 'react';

import { Box, Card, CardContent, Stack, Typography, Button, Alert } from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { ACCEPTED_FILE_EXTENSIONS, MAX_FILE_SIZE_MB , DROP_MULTIPLE_FILES_ERROR} from '@/constants/file';
import { validateResumeFile } from './validateResumeFile';

const ResumeUploadCard = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const dragCounter = useRef(0);

    const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        dragCounter.current++;
        if (dragCounter.current === 1) {
            setIsDragging(true);
        }
    };
    
    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        dragCounter.current = Math.max(0, dragCounter.current - 1);

        if (dragCounter.current === 0) {
            setIsDragging(false);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };
    
    const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        dragCounter.current = 0;
        setIsDragging(false);
        const files = event.dataTransfer.files;
        if (files.length === 0) {
            return;
        }
        if (files.length > 1) {
            setError(DROP_MULTIPLE_FILES_ERROR );
            return;
        }
        const file = files[0];
        processSelectedFile(file);
    };

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
                        <Typography variant="body2"> Upload your resume in PDF, DOC or DOCX format to begin AI-powered resume analysis.</Typography>
                    </Stack>
                    {/* File Upload Section - Browse & Drag-and-Drop */}
                    <Box 
                        role="region"
                        aria-label="Resume upload area"
                        onClick={handleBrowseClick}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        onDrop={handleFileDrop}
                        sx={{
                            border: "2px dashed",
                            borderColor: isDragging ? "primary.main" : "#1976d2",
                            backgroundColor: isDragging
                                ? "action.hover"
                                : "transparent",
                            borderRadius: 2,
                            p: 4,
                            width: "100%",
                            textAlign: "center",
                            transition: "border-color 200ms ease, background-color 200ms ease"
                        }}
                        data-testid="resume-drop-zone"
                    >
                        <Stack spacing={2} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                            <CloudUploadOutlinedIcon 
                                color="primary"
                                sx={{ fontSize: 56 }}
                            />
                            <Typography variant="h6">
                                {
                                    isDragging ? "Drop your resume here" : "Drag & Drop your resume here"
                                }
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                or
                            </Typography>
                            <Button variant="contained" aria-label="Browse Files" data-testid="browse-files-button" onClick={handleBrowseClick}>
                                Browse Files
                            </Button> 
                            <Typography variant="caption" color="text.secondary">
                                {ACCEPTED_FILE_EXTENSIONS.join(' • ') } | Max file size: {MAX_FILE_SIZE_MB}MB
                            </Typography>
                        </Stack>
                        <input
                            data-testid="resume-upload-input"
                            ref={fileInputRef}
                            type="file"
                            hidden
                            accept={ACCEPTED_FILE_EXTENSIONS.join(',')}
                            onChange={handleFileSelect}
                            data-testid="resume-file-input"
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