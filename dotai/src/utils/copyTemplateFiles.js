import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function copyTemplateFiles(config) {
  const templatesDir = path.join(__dirname, '..', 'templates');
  const targetDir = path.join(process.cwd(), '.ai');

  // Skip if user doesn't want examples
  if (!config.includeExamples) {
    return true;
  }

  // Recursively copy template files
  await copyTemplatesRecursively(templatesDir, targetDir, config);

  // Copy IDE rule files to project root if requested
  if (config.ruleLocations?.includes('Project Root (./.cursorrules, etc.)') ||
      config.ruleLocations?.includes('Both Locations')) {
    const aiConfigDir = path.join(templatesDir, '0-ai-config');
    const ruleFiles = ['.clinerules', '.cursorrules', '.roomodes', 'cline_modes.json'];
    
    for (const file of ruleFiles) {
      const sourcePath = path.join(aiConfigDir, file);
      const targetPath = path.join(process.cwd(), file);
      
      if (await fs.pathExists(sourcePath)) {
        let content = await fs.readFile(sourcePath, 'utf8');
        content = processTemplateContent(content, config);
        await fs.writeFile(targetPath, content);
      }
    }
  }

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
    .replace(/\{\{projectName\}\}/g, config.projectName || path.basename(process.cwd()))
    .replace(/\{\{currentYear\}\}/g, new Date().getFullYear().toString())
    .replace(/\{\{createdDate\}\}/g, new Date().toISOString().split('T')[0]);
}

export default copyTemplateFiles;