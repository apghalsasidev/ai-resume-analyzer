import { test } from '../fixtures/test';
import { resumeFiles } from '../data/resumeFiles';
const validResumeFiles = [
  resumeFiles.validPdf,
  resumeFiles.validDocx,
];
test.describe('Resume Upload', { tag: '@resume-upload',}, () => {
  test.beforeEach(async ({ resumePage}) => {
      await resumePage.navigate();
  });

  test('should load Resume Analyzer page',{
      tag: '@smoke',
    },
    async ({ resumePage }) => {
    await resumePage.verifyPageLoaded();
  });
  
  validResumeFiles.forEach((file) => {
    test('should upload a valid ' + file.type + ' resume successfully', async ({ uploadComponent }) => {
      await uploadComponent.uploadResume( file.path );

      await uploadComponent.expectUploadedFile( file.fileName );
    });
  });

  test('should reject an unsupported TXT resume', async ({ uploadComponent }) => {
    await uploadComponent.uploadResume( resumeFiles.invalidTxt.path );

    await uploadComponent.expectError( resumeFiles.invalidTxt.expectedError );
    
    await uploadComponent.expectNoUploadedFile();
  });
});