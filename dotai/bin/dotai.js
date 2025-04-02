#!/usr/bin/env node

import { program } from 'commander';
import initCommand from '../src/commands/init.js';
import addCommand from '../src/commands/add.js';
import validateCommand from '../src/commands/validate.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJson = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf8'));

program
    .name('dotai')
    .description('CLI to integrate Dot AI structure into repositories')
    .version(packageJson.version);

program
    .command('init')
    .description('Initialize Dot AI structure in the current directory. Interactively gathers information about:\n' +
        '  - Project basics (name, examples, git configuration)\n' +
        '  - Target users and personas\n' +
        '  - Security requirements and features\n' +
        '  - Performance and scalability targets\n' +
        '  - Compliance standards')
    .option('-y, --yes', 'Skip all prompts and use defaults')
    .option('-t, --template <template>', 'Use specific template', 'default')
    .action(initCommand);

program
    .command('add <component-type>')
    .description('Add a specific Dot AI component')
    .action(addCommand);

program
    .command('validate')
    .description('Validate current Dot AI structure')
    .action(validateCommand);

program.parse(process.argv);