import fs from 'fs-extra';
import path from 'path';

async function copyTemplateFiles(config) {
  const templatesDir = path.join(__dirname, '..', 'templates');
  const targetDir = path.join(process.cwd(), '.ai');

  // Skip if user doesn't want examples
  if (!config.includeExamples) {
    return true;
  }

  // Recursively copy template files
  await copyTemplatesRecursively(templatesDir, targetDir, config);

  return true;
}

async function copyTemplatesRecursively(sourceDir, targetDir, config) {
  // Create target directory if it doesn't exist
  await fs.ensureDir(targetDir);

  // Get all items in the source directory
  const items = await fs.readdir(sourceDir);

  for (const item of items) {
    const sourcePath = path.join(sourceDir, item);
    const targetPath = path.join(targetDir, item);

    const stats = await fs.stat(sourcePath);

    if (stats.isDirectory()) {
      // Recursively copy subdirectories
      await copyTemplatesRecursively(sourcePath, targetPath, config);
    } else {
      // Process and copy files
      let content = await fs.readFile(sourcePath, 'utf8');

      // Replace template variables with config values
      content = processTemplateContent(content, config);

      // Write processed content to target file
      await fs.writeFile(targetPath, content);
    }
  }
}

function processTemplateContent(content, config) {
  // Replace template variables with config values
  return content
    .replace(/\{\{projectName\}\}/g, config.projectName)
    .replace(/\{\{currentYear\}\}/g, new Date().getFullYear().toString())
    .replace(/\{\{createdDate\}\}/g, new Date().toISOString().split('T')[0]);
}

export default copyTemplateFiles;