import path from 'path';

export const resumeFiles = {
  validPdf: {
    path: path.resolve(
      'tests/resources/resumes/Aishwarya_Ghalsasi_Resume.pdf'
    ),
    fileName: 'Aishwarya_Ghalsasi_Resume.pdf',
    type: 'PDF'
  },

  validDocx: {
    path: path.resolve(
      'tests/resources/resumes/Aishwarya_Ghalsasi_Resume.docx'
    ),
    fileName: 'Aishwarya_Ghalsasi_Resume.docx',
    type: 'DOCX'
  },

  invalidTxt: {
    path: path.resolve(
      'tests/resources/resumes/Aishwarya_Ghalsasi_Resume.txt'
    ),
    fileName: 'Aishwarya_Ghalsasi_Resume.txt',
    type: 'TXT',
    expectedError:
      'Invalid file type. Only PDF, DOCX, and DOC files are allowed.',
  },
} as const;

