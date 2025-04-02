import fs from 'fs-extra';
import path from 'path';

async function createDirectoryStructure(config) {
    // Create main .ai directory
    const aiDir = path.join(process.cwd(), '.ai');
    await fs.ensureDir(aiDir);

    // Create standard subdirectories with a flatter structure
    const dirs = [
        '0-ai-config',
        '1-context',
        '2-technical-design',
        '2-technical-design/requirements',
        '2-technical-design/integrations',
        '2-technical-design/architecture',
        '3-development',
        '3-development/implementation',
        '3-development/product',
        '4-acceptance-reports',
        '4-acceptance-reports/security'
    ];

    // Create each directory
    for (const dir of dirs) {
        await fs.ensureDir(path.join(aiDir, dir));
    }

    // Create empty placeholder files to maintain directory structure
    const placeholders = [
        '1-context/target-users.md',
        '2-technical-design/environments_deployments.md',
        '2-technical-design/architecture/current_arch_standards.md',
        '2-technical-design/architecture/dev-conventions.md',
        '2-technical-design/requirements/security.md',
        '2-technical-design/requirements/performance.md',
        '2-technical-design/requirements/compliance.md',
        '2-technical-design/requirements/constraints.md',
        '2-technical-design/requirements/reliability.md',
        '2-technical-design/requirements/backup-recovery.md',
        '2-technical-design/requirements/client-support.md',
        '2-technical-design/requirements/observability.md',
        '2-technical-design/requirements/scalability.md',
        '2-technical-design/integrations/analytics.md',
        '2-technical-design/integrations/auth.md',
        '2-technical-design/integrations/messaging.md',
        '2-technical-design/integrations/payments.md',
        '2-technical-design/integrations/observability.md',
        '3-development/folder-locks.md'
    ];

    // Create placeholder files
    for (const file of placeholders) {
        const filePath = path.join(aiDir, file);
        if (!await fs.pathExists(filePath)) {
            await fs.writeFile(filePath, '# Placeholder\nThis file will be populated during initialization.\n');
        }
    }

    return true;
}

export default createDirectoryStructure; 