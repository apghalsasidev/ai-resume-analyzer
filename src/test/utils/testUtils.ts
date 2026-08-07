
type CreateTestFileOptions = {
    name?: string;
    type?: string;
    size?: number;
};

const DEFAULT_TEST_FILE = {
    name: "resume.pdf",
    type: "application/pdf",
    size: 1024,
};

const createTestFile = (options: CreateTestFileOptions = {}): File => {
    const { name, type, size } = { ...DEFAULT_TEST_FILE, ...options };
    return new File(
        [new Uint8Array(size)],
        name,
        { type }
    );
};

export default createTestFile;