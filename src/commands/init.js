import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';

import createDirectoryStructure from '../utils/createDirectoryStructure.js';
import copyTemplateFiles from '../utils/copyTemplateFiles.js';

// ... (keep existing question sets) ...

const ideQuestions = [
    {
        type: 'checkbox',
        name: 'selectedIDEs',
        message: 'Which AI-powered IDEs would you like to configure?',
        choices: [
            'Cursor',
            'GitHub Copilot',
            'Amazon Q',
            'Windsurf'
        ],
        default: ['Cursor']
    },
    {
        type: 'checkbox',
        name: 'ruleLocations',
        message: 'Where would you like to install the IDE rule files?',
        choices: [
            'Project Root (./.cursorrules, etc.)',
            'AI Config Directory (./.ai/0-ai-config/)',
            'Both Locations'
        ],
        default: ['AI Config Directory (./.ai/0-ai-config/)']
    }
];

async function generateIDERules(config, manifest) {
    const rules = {
        cursor: {
            filename: '.cursorrules',
            content: `// Cursor AI rules for ${config.projectName}
// Generated by dotai CLI

// Project context
You are assisting with ${config.projectName}, which follows the Dot AI structure.
Review the content in the .ai directory to understand project context.

// Architecture
This project uses the following architectural patterns:
${config.archPatterns.map(pattern => `- ${pattern}`).join('\n')}

// Design Patterns
Key design patterns:
${config.designPatterns.map(pattern => `- ${pattern}`).join('\n')}

// Integrations
${generateIntegrationsSection(config)}

// Security Level: ${config.securityLevel}
Security features required:
${config.securityFeatures.map(feature => `- ${feature}`).join('\n')}

// Performance Targets
- Scalability: ${config.scalabilityNeeds}
- Response Time: ${config.performanceTargets}

// Compliance Standards
${config.complianceStandards.map(standard => `- ${standard}`).join('\n')}

// Development Environments
${config.environments.map(env => `- ${env}`).join('\n')}
${config.envDetails}

// Client Platforms
Supported platforms:
${config.clientSupport.map(platform => `- ${platform}`).join('\n')}

// Workflow
Follow the development workflow in .ai/0-ai-config/workflow.md:
1. Document features before implementation
2. Implement according to specifications
3. Validate against standards
4. Create validation reports

// Guidelines
- Reference file IDs in documentation and code comments
- Check folder-locks.md before modifying locked directories
- Follow project conventions from .ai/1-context/project_conventions.md`
        },
        githubCopilot: {
            filename: '.copilot',
            content: `# GitHub Copilot configuration for ${config.projectName}

# Project Context
This project follows the Dot AI structure. All documentation is in the .ai directory.

# Architecture
${config.archPatterns.join(', ')}

# Design Patterns
${config.designPatterns.join(', ')}

# Security Level
${config.securityLevel}

# Performance Requirements
- Scale: ${config.scalabilityNeeds}
- Target Response: ${config.performanceTargets}

# Documentation Guidelines
- Use ID naming convention for files and sections
- Reference documentation IDs in comments
- Follow conventions in .ai/1-context/project_conventions.md`
        },
        amazonQ: {
            filename: '.amazonq',
            content: `# Amazon Q configuration for ${config.projectName}

# Project Overview
- Name: ${config.projectName}
- Architecture: ${config.archPatterns.join(', ')}
- Security Level: ${config.securityLevel}
- Performance Target: ${config.performanceTargets}

# Development Guidelines
- Follow Dot AI structure (.ai directory)
- Use ID naming convention
- Reference documentation in comments
- Follow project conventions

# Key Integrations
${generateIntegrationsSection(config)}`
        },
        windsurf: {
            filename: '.windsurf',
            content: `// Windsurf AI configuration for ${config.projectName}

/* Project Context */
project_name = "${config.projectName}"
architecture = [${config.archPatterns.map(p => `"${p}"`).join(', ')}]
security_level = "${config.securityLevel}"
performance_target = "${config.performanceTargets}"

/* Guidelines */
documentation_structure = ".ai directory (Dot AI structure)"
naming_convention = "ID-based (see .ai/1-context/project_conventions.md)"
reference_style = "Use documentation IDs in comments"`
        }
    };

    const ideMap = {
        'Cursor': 'cursor',
        'GitHub Copilot': 'githubCopilot',
        'Amazon Q': 'amazonQ',
        'Windsurf': 'windsurf'
    };

    for (const ide of config.selectedIDEs) {
        const ruleConfig = rules[ideMap[ide]];
        if (!ruleConfig) continue;

        // Write rules based on selected locations
        if (config.ruleLocations.includes('Project Root (./.cursorrules, etc.)') ||
            config.ruleLocations.includes('Both Locations')) {
            await fs.writeFile(
                path.join(process.cwd(), ruleConfig.filename),
                ruleConfig.content
            );
        }

        if (config.ruleLocations.includes('AI Config Directory (./.ai/0-ai-config/)') ||
            config.ruleLocations.includes('Both Locations')) {
            await fs.writeFile(
                path.join(process.cwd(), '.ai', '0-ai-config', ruleConfig.filename),
                ruleConfig.content
            );
        }
    }
}

function generateIntegrationsSection(config) {
    const integrations = [];

    if (config.analyticsIntegrations.length > 0 && !config.analyticsIntegrations.includes('None')) {
        integrations.push(`Analytics: ${config.analyticsIntegrations.join(', ')}`);
    }
    if (config.authIntegrations.length > 0 && !config.authIntegrations.includes('None')) {
        integrations.push(`Authentication: ${config.authIntegrations.join(', ')}`);
    }
    if (config.messagingIntegrations.length > 0 && !config.messagingIntegrations.includes('None')) {
        integrations.push(`Messaging: ${config.messagingIntegrations.join(', ')}`);
    }
    if (config.paymentIntegrations.length > 0 && !config.paymentIntegrations.includes('None')) {
        integrations.push(`Payments: ${config.paymentIntegrations.join(', ')}`);
    }
    if (config.observabilityIntegrations.length > 0 && !config.observabilityIntegrations.includes('None')) {
        integrations.push(`Observability: ${config.observabilityIntegrations.join(', ')}`);
    }

    return integrations.length > 0
        ? 'Integrations:\n' + integrations.map(int => `- ${int}`).join('\n')
        : 'No external integrations configured';
}

async function updateManifestFile(config) {
    const manifestPath = path.join(process.cwd(), '.ai', 'manifest.json');
    const manifest = await fs.readJson(manifestPath);

    // Ensure all required directories exist
    const directories = [
        path.join(process.cwd(), '.ai', '1-context'),
        path.join(process.cwd(), '.ai', '2-technical-design'),
        path.join(process.cwd(), '.ai', '2-technical-design', 'integrations'),
        path.join(process.cwd(), '.ai', '2-technical-design', 'requirements'),
        path.join(process.cwd(), '.ai', '2-technical-design', 'architecture')
    ];

    for (const dir of directories) {
        await fs.ensureDir(dir);
    }

    // Update target users context
    await fs.writeFile(
        path.join(process.cwd(), '.ai', '1-context', 'target-users.md'),
        `# Target Users\n\n## User Description\n${config.targetUsers}\n\n## User Personas\n${config.userPersonas.split(',').map(persona => `- ${persona.trim()}`).join('\n')}`
    );

    // Update environments configuration
    await fs.writeFile(
        path.join(process.cwd(), '.ai', '2-technical-design', 'environments_deployments.md'),
        `# Environments and Deployments\n\n## Environments\n${config.environments.map(env => `- ${env}`).join('\n')}\n\n## Environment Details\n${config.envDetails}`
    );

    // Update architecture standards
    await fs.writeFile(
        path.join(process.cwd(), '.ai', '2-technical-design', 'architecture', 'current_arch_standards.md'),
        `# Architecture Standards\n\n## Architectural Patterns\n${config.archPatterns.map(pattern => `- ${pattern}`).join('\n')}\n\n## Design Patterns\n${config.designPatterns.map(pattern => `- ${pattern}`).join('\n')}`
    );

    // Update integrations
    const integrationsPath = path.join(process.cwd(), '.ai', '2-technical-design', 'integrations');

    if (config.analyticsIntegrations.length > 0 && !config.analyticsIntegrations.includes('None')) {
        await fs.writeFile(
            path.join(integrationsPath, 'analytics.md'),
            `# Analytics Integrations\n\n## Services\n${config.analyticsIntegrations.map(service => `- ${service}`).join('\n')}`
        );
    }

    if (config.authIntegrations.length > 0 && !config.authIntegrations.includes('None')) {
        await fs.writeFile(
            path.join(integrationsPath, 'auth.md'),
            `# Authentication Integrations\n\n## Services\n${config.authIntegrations.map(service => `- ${service}`).join('\n')}`
        );
    }

    if (config.messagingIntegrations.length > 0 && !config.messagingIntegrations.includes('None')) {
        await fs.writeFile(
            path.join(integrationsPath, 'messaging.md'),
            `# Messaging Integrations\n\n## Services\n${config.messagingIntegrations.map(service => `- ${service}`).join('\n')}`
        );
    }

    if (config.paymentIntegrations.length > 0 && !config.paymentIntegrations.includes('None')) {
        await fs.writeFile(
            path.join(integrationsPath, 'payments.md'),
            `# Payment Integrations\n\n## Services\n${config.paymentIntegrations.map(service => `- ${service}`).join('\n')}`
        );
    }

    if (config.observabilityIntegrations.length > 0 && !config.observabilityIntegrations.includes('None')) {
        await fs.writeFile(
            path.join(integrationsPath, 'observability.md'),
            `# Observability Integrations\n\n## Services\n${config.observabilityIntegrations.map(service => `- ${service}`).join('\n')}`
        );
    }

    // Update requirements
    const requirementsPath = path.join(process.cwd(), '.ai', '2-technical-design', 'requirements');

    await fs.writeFile(
        path.join(requirementsPath, 'backup-recovery.md'),
        `# Backup and Recovery Requirements\n\n## Strategy\n${config.backupStrategy.map(strategy => `- ${strategy}`).join('\n')}`
    );

    await fs.writeFile(
        path.join(requirementsPath, 'client-support.md'),
        `# Client Support Requirements\n\n## Supported Platforms\n${config.clientSupport.map(platform => `- ${platform}`).join('\n')}`
    );

    await fs.writeFile(
        path.join(requirementsPath, 'reliability.md'),
        `# Reliability Requirements\n\n## Targets\n- Uptime Target: ${config.reliabilityTargets}`
    );

    await fs.writeFile(
        path.join(requirementsPath, 'constraints.md'),
        `# Technical Constraints\n\n## Limitations\n${config.constraints}`
    );

    await fs.writeFile(
        path.join(requirementsPath, 'security.md'),
        `# Security Requirements\n\n## Security Level\n${config.securityLevel}\n\n## Required Security Features\n${config.securityFeatures.map(feature => `- ${feature}`).join('\n')}`
    );

    await fs.writeFile(
        path.join(requirementsPath, 'performance.md'),
        `# Performance Requirements\n\n## Scalability Requirements\n${config.scalabilityNeeds}\n\n## Performance Targets\n${config.performanceTargets}`
    );

    await fs.writeFile(
        path.join(requirementsPath, 'compliance.md'),
        `# Compliance Requirements\n\n## Required Standards\n${config.complianceStandards.map(standard => `- ${standard}`).join('\n')}`
    );

    return manifest;
}

async function initCommand(options) {
    console.log(chalk.blue('📁 Initializing Dot AI structure...'));

    let config = {};

    if (!options.yes) {
        // Basic project configuration
        const basicConfig = await inquirer.prompt([
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

        config = { ...basicConfig };

        console.log(chalk.blue('\n📝 Let\'s gather some information about your project...'));

        // Context questions
        console.log(chalk.yellow('\n🎯 User Context'));
        const contextAnswers = await inquirer.prompt(contextQuestions);
        config = { ...config, ...contextAnswers };

        // Environment questions
        console.log(chalk.yellow('\n🌍 Environments'));
        const envAnswers = await inquirer.prompt(environmentQuestions);
        config = { ...config, ...envAnswers };

        // Architecture questions
        console.log(chalk.yellow('\n🏗️ Architecture'));
        const archAnswers = await inquirer.prompt(architectureQuestions);
        config = { ...config, ...archAnswers };

        // Integration questions
        console.log(chalk.yellow('\n🔌 Integrations'));
        const integrationAnswers = await inquirer.prompt(integrationQuestions);
        config = { ...config, ...integrationAnswers };

        // Additional requirements
        console.log(chalk.yellow('\n📋 Additional Requirements'));
        const additionalAnswers = await inquirer.prompt(additionalRequirements);
        config = { ...config, ...additionalAnswers };

        // Security questions
        console.log(chalk.yellow('\n🔒 Security Requirements'));
        const securityAnswers = await inquirer.prompt(securityQuestions);
        config = { ...config, ...securityAnswers };

        // Performance questions
        console.log(chalk.yellow('\n⚡ Performance Requirements'));
        const performanceAnswers = await inquirer.prompt(performanceQuestions);
        config = { ...config, ...performanceAnswers };

        // Compliance questions
        console.log(chalk.yellow('\n📋 Compliance Requirements'));
        const complianceAnswers = await inquirer.prompt(complianceQuestions);
        config = { ...config, ...complianceAnswers };

        // IDE questions
        console.log(chalk.yellow('\n🛠️ IDE Configuration'));
        const ideAnswers = await inquirer.prompt(ideQuestions);
        config = { ...config, ...ideAnswers };
    } else {
        // Use defaults
        config = {
            projectName: path.basename(process.cwd()),
            includeExamples: true,
            addGitignore: false,
            targetUsers: 'General users',
            userPersonas: 'Regular users, Administrators',
            environments: ['Development', 'Staging', 'Production'],
            envDetails: 'Dev: local setup, Staging: cloud-based, Prod: high-availability',
            archPatterns: ['MVC'],
            designPatterns: ['Repository Pattern', 'Dependency Injection'],
            analyticsIntegrations: ['None'],
            authIntegrations: ['None'],
            messagingIntegrations: ['None'],
            paymentIntegrations: ['None'],
            observabilityIntegrations: ['None'],
            backupStrategy: ['Automated Backups'],
            clientSupport: ['Web Browser'],
            reliabilityTargets: '99.9%',
            constraints: 'None',
            securityLevel: 'Medium',
            securityFeatures: ['Authentication', 'Authorization'],
            scalabilityNeeds: 'Medium (1000-10000 users)',
            performanceTargets: '200ms',
            complianceStandards: ['None'],
            selectedIDEs: ['Cursor'],
            ruleLocations: ['AI Config Directory (./.ai/0-ai-config/)']
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

        // Update manifest and requirements files
        spinner.text = 'Updating manifest and requirements';
        spinner.start();
        const manifest = await updateManifestFile(config);
        spinner.succeed('Updated manifest and requirements');

        // Generate IDE rule files
        spinner.text = 'Generating IDE configuration files';
        spinner.start();
        await generateIDERules(config, manifest);
        spinner.succeed('Generated IDE configuration files');

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