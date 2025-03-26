const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');

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
  
  for (const dir of requiredDirs) {
    const dirPath = path.join(baseDir, dir);
    if (!await fs.pathExists(dirPath)) {
      console.log(chalk.red(`❌ Missing directory: ${dir}`));
      valid = false;
    }
  }
  
  if (valid) {
    console.log(chalk.green('✅ Dot AI structure is valid'));
  } else {
    console.log(chalk.red('❌ Validation failed: missing components'));
  }
}

module.exports = validateCommand;