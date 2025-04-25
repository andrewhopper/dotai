- Workflow guidelines
   - Documentation reference rules
   ```

3. **Context Reference Mechanism**
   ```
   .ai/
   ├── 0-ai-config/          # AI configuration directory
   │   ├── .cursorrules     # Points to project documentation
   │   └── workflow.md      # Defines workflow
   ├── 1-context/           # Project context
   │   └── project_context.md
   └── 2-technical-design/  # Technical design
       └── architecture.md
   ```

   Working principle:
   1. AI reads rules file
   2. Rules file points to relevant documents
   3. AI tools follow document specifications
   4. Maintains project consistency

4. **Rules Update Mechanism**
   ```markdown
   # Manual Update
   - Modify rule file content
   - Adjust document reference relationships
   - Update workflow definitions

   # Automatic Update
   - dotai init reconfiguration
   - When project structure changes
   - When adding new features or components
   ```

This mechanism ensures that AI tools can:
- Understand the complete project context
- Follow established standards and processes
- Maintain consistency between code and documentation
- Adapt to project evolution and changes

1. **Standard Directory Structure**
   ```
   .ai/
   ├── 0-ai-config/          # AI tool configuration
   │   ├── workflow.md       # Workflow definitions
   │   ├── .cursorrules     # Cursor AI rules
   │   ├── .clinerules      # Cline AI rules
   │   └── mcp.md           # MCP configuration
   ├── 1-context/           # Project context
   │   ├── project_context.md
   │   └── project_conventions.md
   ├── 2-technical-design/  # Technical design
   └── workspace/           # Workspace
   ```

2. **Context Transfer Mechanism**
   - .cursorrules/.clinerules define AI tool behavior rules
   - AI tools obtain project configuration and context through rules
   - MCP service manages workflows and template resources
   - Each AI interaction is based on complete project context

3. **Component Interaction**
   ```mermaid
   graph LR
     AI[AI Tools] --> |Read Rules| R[.cursorrules/.clinerules]
     R --> |Point to| C[Project Context]
     AI --> |Request Resources| M[MCP Service]
     M --> |Provide| W[Workflows/Templates]
   ```

4. **File System Structure**
   ```
   .ai/
   ├── config/           # Configuration files
   │   ├── rules/       # Validation rules
   │   └── templates/   # File templates
   ├── workspace/       # Workspace
   │   ├── tasks/       # Task records
   │   └── temp/        # Temporary files
   └── state.json       # Runtime state
   ```

## Usage Examples

### 1. Command Line Mode

Using CLI for direct operations:

```bash
# Initialize project
dotai init --template typescript-next

# Add API documentation template
dotai add template api-doc

# Validate project structure
dotai validate --strict
```

### 2. Natural Language Mode

Interacting through MCP service:

```
User: "Initialize project with TypeScript template"
MCP: "I will create a project using the typescript-next template..."
[Initialization executed]
MCP: "Project creation completed, including:
     1. TypeScript configuration
     2. Basic directory structure
     3. Next.js related settings"

User: "Check if the project meets the standards"
MCP: "I'll verify the project structure..."
[Validation executed]
MCP: "Validation complete, all checks passed"
```

### 3. File Structure Example

```diff
# Project structure after initialization
.ai/
├── 0-ai-config/
│   ├── .cursorrules
│   └── workflow.md
├── 1-context/
│   └── project_context.md
└── 2-technical-design/
    └── architecture.md
```

This example shows how to achieve the same document synchronization functionality through different methods. Users can choose the appropriate interaction method based on specific scenarios.

## Current Implementation Status

1. **Implemented Components**
   - dotai CLI tool basic framework
   - Command-line argument parsing
   - Workspace management
   - File system operations

2. **Components Under Development**
   - Context management system

3. **Planned Features**
   - Advanced validation rules
   - Real-time synchronization support

Before completing the components under development, the system runs in local mode, performing only basic file operations and document management functions. Complete AI assistance features will be released after the core system components are developed.