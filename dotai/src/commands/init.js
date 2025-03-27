import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';

import createDirectoryStructure from '../utils/createDirectoryStructure.js';
import copyTemplateFiles from '../utils/copyTemplateFiles.js';

async function initCommand(options) {
    console.log(chalk.blue('📁 Initializing Dot AI structure...'));

    let config = {};

    if (!options.yes) {
        // Prompt user for configuration options
        config = await inquirer.prompt([
            {
                type: 'input',
                name: 'projectName',
                message: 'What is your project name?',
                default: path.basename(process.cwd())
            },
            {
                type: 'confirm',
                name: 'includeExamples',
                message: 'Include example files?',
                default: true
            },
            {
                type: 'confirm',
                name: 'addGitignore',
                message: 'Add .ai directory to .gitignore?',
                default: false
            }
        ]);

        // Additional questions for better template customization
        if (config.includeExamples) {
            const additionalConfig = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'projectType',
                    message: 'What type of project is this?',
                    choices: ['quick prototype', 'semi-production code', 'full production code'],
                    default: 'semi-production code'
                },
                {
                    type: 'input',
                    name: 'projectDomain',
                    message: 'What is the domain/industry of your project?',
                    default: 'Technology'
                }
            ]);

            // Merge the additional configuration
            config = { ...config, ...additionalConfig };
        }
    } else {
        // Use defaults
        config = {
            projectName: path.basename(process.cwd()),
            includeExamples: true,
            addGitignore: false
        };
    }

    const spinner = ora('Creating directory structure').start();

    try {
        // Create the .ai directory structure
        await createDirectoryStructure(config);
        spinner.succeed('Directory structure created');

        // Copy template files
        spinner.text = 'Copying template files';
        spinner.start();
        await copyTemplateFiles(config);
        spinner.succeed('Template files copied');

        // Update .gitignore if requested
        if (config.addGitignore) {
            spinner.text = 'Updating .gitignore';
            spinner.start();
            await updateGitignore();
            spinner.succeed('Updated .gitignore');
        }

        console.log(chalk.green('\n✅ Dot AI structure initialized successfully!'));
        console.log(chalk.blue('Run `dotai --help` to see available commands'));
    } catch (error) {
        spinner.fail('Initialization failed');
        console.error(chalk.red(`Error: ${error.message}`));
        process.exit(1);
    }
}

async function updateGitignore() {
    const gitignorePath = path.join(process.cwd(), '.gitignore');
    const content = fs.existsSync(gitignorePath)
        ? await fs.readFile(gitignorePath, 'utf8')
        : '';

    if (!content.includes('.ai/')) {
        await fs.writeFile(
            gitignorePath,
            content + (content.endsWith('\n') ? '' : '\n') + '.ai/\n',
            'utf8'
        );
    }
}

export default initCommand;