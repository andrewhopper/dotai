# Dot AI Templates Documentation

## Available Templates

Dot AI provides a comprehensive set of template files organized within the standard `.ai` directory structure.

### 0-ai-config Templates

| Template | Purpose |
|----------|---------|
| `.cursorrules` | Configuration for Cursor AI with project-specific rules and contexts |
| `.clinerules` | Configuration for Cline AI with project-specific guidelines |
| `mcp.md` | Model Context Protocol configuration for web search and other AI agent capabilities |
| `workflow.md` | Documents the AI-assisted development workflow process |
| `hooks.md` | Defines pre/post hooks for consistent AI interaction patterns |
| `resolvers.md` | Configuration for documentation management and ID resolution |

### 1-context Templates

| Template | Purpose |
|----------|---------|
| `project_context.md` | Core project information including objectives, stakeholders, and glossary |
| `project_conventions.md` | Project-specific coding standards, naming conventions, and documentation rules |
| `target-users.md` | Detailed user personas, demographics, and user needs for the project |

### 2-technical-design Templates

| Template | Purpose |
|----------|---------|
| `architecture.md` | System architecture, components, data flow, and technology stack |
| `requirements/security.md` | Security requirements including authentication, data protection, and compliance |
| `environments_deployments.md` | Environment configurations and deployment strategies |

### 3-development Templates

| Template | Purpose |
|----------|---------|
| `folder-locks.md` | Defines folder locking strategy for controlling code modifications |
| `implementation/implementation-template.md` | Template for documenting technical implementations |
| `product/product-requirements-template.md` | Template for product requirements and user stories |

### 4-acceptance-reports Templates

| Template | Purpose |
|----------|---------|
| `qa-report-template.md` | Template for QA validation reports |
| `security/security-report-template.md` | Template for security testing reports |

## ID Naming Convention

All templates follow the ID naming convention:

- **Files**: `{folder-prefix}-{file-name}-{sequence}`
- **Sections**: `{file-id}:{section-type}-{sequence}`

Example folder prefixes:
- CFG: Configuration files (0-ai-config)
- CTX: Context files (1-context)
- ARCH: Architecture files (2-technical-design)
- DEV: Development files (3-development)
- QA: QA and testing files (4-acceptance-reports)

Example section types:
- INFO: Informational content
- SPEC: Technical specifications
- REQ: Requirements
- IMPL: Implementation details
- TEST: Testing information
- STORY: User stories
- BUG: Bug reports
- TASK: Task definitions
- PROC: Process descriptions

## Template Variables

Templates contain the following variables that are automatically replaced during initialization:

- `{{projectName}}`: The name of your project
- `{{createdDate}}`: The date the file was created
- `{{currentYear}}`: The current year

# Customizing Templates

Templates are populated with variables from your project configuration:

* Project name
* Creation date
* Project type
* Domain/industry

You can customize these templates to match your specific project needs.

## Template Directory Structure

.ai/
├── 0-ai-config/          # AI assistant configuration
├── 1-context/            # Project context and conventions
├── 2-technical-design/   # Architecture and technical specifications
├── 3-development/        # Implementation details
└── 4-acceptance-reports/ # Validation reports


See the templates documentation for a complete list of available templates and their purpose.

## Using Templates with AI Assistants

* Use the templates as starting points for your documentation.
* Follow the ID naming convention for consistent references.
* Reference document IDs in your code comments.
* Update the documentation as your project evolves.

AI assistants (like GitHub Copilot, Claude, or GPT) will use these documents as context when helping you develop your project.

