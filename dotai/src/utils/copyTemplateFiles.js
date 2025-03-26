const fs = require('fs-extra');
const path = require('path');

async function copyTemplateFiles(config) {
  const templatesDir = path.join(__dirname, '..', 'templates');
  const targetDir = path.join(process.cwd(), '.ai');
  
  // Skip if user doesn't want examples
  if (!config.includeExamples) {
    return true;
  }
  
  // This would be expanded to actually copy all the template files
  // For now, create a simple README in each directory
  const directories = [
    '0-ai-config',
    '1-context',
    '2-technical-design',
    '3-development',
    '4-acceptance-reports'
  ];
  
  for (const dir of directories) {
    const readmePath = path.join(targetDir, dir, 'README.md');
    await fs.writeFile(
      readmePath,
      `# ${dir}\n\nThis directory is part of the Dot AI structure for ${config.projectName}.\n`
    );
  }
  
  return true;
}

module.exports = copyTemplateFiles;