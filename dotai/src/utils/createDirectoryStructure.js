const fs = require('fs-extra');
const path = require('path');

async function createDirectoryStructure(config) {
    const baseDir = path.join(process.cwd(), '.ai');

    // Create main .ai directory
    await fs.ensureDir(baseDir);

    // Create subdirectories
    const directories = [
        '0-ai-config',
        '1-context',
        '2-technical-design',
        '3-development',
        '4-acceptance-reports'
    ];

    for (const dir of directories) {
        await fs.ensureDir(path.join(baseDir, dir));
    }

    return true;
}

module.exports = createDirectoryStructure;