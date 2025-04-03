import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';

async function validateCommand(options) {
    console.log(chalk.blue('🔍 Validating Dot AI structure...'));

    // Basic validation: Check if .ai directory exists with required subdirectories
    const baseDir = path.join(process.cwd(), '.ai');

    if (!await fs.pathExists(baseDir)) {
        console.log(chalk.red('❌ Validation failed: .ai directory not found'));
        return;
    }

    const requiredDirs = [
        '0-ai-config',
        '1-context',
        '2-technical-design',
        '3-development',
        '4-acceptance-reports'
    ];

    let valid = true;

    // Check directories
    for (const dir of requiredDirs) {
        const dirPath = path.join(baseDir, dir);
        if (!await fs.pathExists(dirPath)) {
            console.log(chalk.red(`❌ Missing directory: ${dir}`));
            valid = false;
        }
    }

    // Check manifest and custom modes
    const manifestPath = path.join(baseDir, 'manifest.json');
    if (!await fs.pathExists(manifestPath)) {
        console.log(chalk.red('❌ Missing manifest.json'));
        valid = false;
    } else {
        try {
            const manifest = await fs.readJson(manifestPath);
            
            // Check for customModes
            if (!manifest.customModes) {
                console.log(chalk.yellow('⚠️ Warning: No custom modes defined in manifest'));
            } else {
                // Validate custom modes structure
                const requiredModeFields = ['slug', 'name', 'roleDefinition', 'customInstructions'];
                for (const mode of manifest.customModes) {
                    const missingFields = requiredModeFields.filter(field => !mode[field]);
                    if (missingFields.length > 0) {
                        console.log(chalk.yellow(`⚠️ Warning: Custom mode "${mode.slug || 'unnamed'}" missing required fields: ${missingFields.join(', ')}`));
                    }
                }
            }
        } catch (error) {
            console.log(chalk.red('❌ Invalid manifest.json format'));
            valid = false;
        }
    }

    if (valid) {
        console.log(chalk.green('✅ Dot AI structure is valid'));
    } else {
        console.log(chalk.red('❌ Validation failed: missing components'));
    }
}

export default validateCommand;