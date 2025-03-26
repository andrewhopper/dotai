const { program } = require('commander');
const initCommand = require('../src/commands/init');
const addCommand = require('../src/commands/add');
const validateCommand = require('../src/commands/validate');
const packageJson = require('../package.json');

program
    .name('dotai')
    .description('CLI to integrate Dot AI structure into repositories')
    .version(packageJson.version);

program
    .command('init')
    .description('Initialize Dot AI structure in the current directory')
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