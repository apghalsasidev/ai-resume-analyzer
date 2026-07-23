import { Box, Card, CardContent, Stack, Typography, Button } from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { ACCEPTED_FILE_EXTENSIONS, MAX_FILE_SIZE_MB } from '@/constants/file';
import { useRef } from 'react';
const ResumeUploadCard = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleBrowseClick = () => {
        fileInputRef.current?.click();
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
                    />
                </Box>
            </Stack>
        </CardContent>
    </Card>
  )
};
export default ResumeUploadCard;