import fs from 'fs-extra';
import path from 'path';

async function createDirectoryStructure(config) {
    // Create main .ai directory
    const aiDir = path.join(process.cwd(), '.ai');
    await fs.ensureDir(aiDir);

    // Create standard subdirectories
    const dirs = [
        '0-ai-config',
        '1-context',
        '2-technical-design',
        '2-technical-design/requirements',
        '2-technical-design/integrations',
        '3-development',
        '3-development/implementation',
        '3-development/product',
        '4-acceptance-reports',
        '4-acceptance-reports/security',
    ];

    // Create each directory
    for (const dir of dirs) {
        await fs.ensureDir(path.join(aiDir, dir));
    }

    return true;
}

export default createDirectoryStructure;