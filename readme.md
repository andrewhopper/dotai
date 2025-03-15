**WARNING: This is a work in progress prototype**

## Dot AI is draft standard for creating and managing context in AI coding projects.

Dot AI provides a tool-agnostic way to create and manage context when coding AI projects. It establishes a standardized structure for project documentation, development workflows, and validation processes, enabling more effective collaboration between developers and AI tools.

The framework includes a structured development workflow that guides projects from initialization through feature development and validation, ensuring consistent quality and comprehensive documentation.

## Directory Structure

The `.ai` directory serves as a standardized location for AI-related context, documentation, and resources. This structure helps maintain consistent organization across projects and enables AI tools to easily locate and utilize project context.

```
.ai/
└── docs/
    ├── 0-ai-config/                # AI tool configuration
    │   ├── mcp.md                  # Model Context Protocol configuration
    │   ├── .cursorrules            # Cursor AI rules
    │   └── .clinerules             # Cline AI rules
    ├── 2-technical-design/         # Technical design documentation
    │   ├── development_workflow/   # Development process documentation
    │   │   └── workflow.md         # Standardized workflow with Mermaid diagram
    │   └── requirements/           # Project requirements
    │       └── security/           # Security requirements
    │           └── ssl_requirements.md # SSL implementation requirements
    ├── 3-development/              # Development documentation
    │   └── folder-locks.md         # Folder lock documentation
    └── 4-acceptence/               # Acceptance and validation
        └── compliance_reports/     # Compliance and validation reports
            └── security/           # Security compliance reports
                └── 2025-03-13_ssl.md # SSL implementation validation
```

### Key Components

#### docs/0-ai-config/
Contains configuration files for AI tools, including Model Context Protocol settings and rules for specific AI assistants like Cursor and Cline.

#### docs/2-technical-design/
Houses technical design documentation, including development workflows and project requirements.

##### docs/2-technical-design/development_workflow/
Documents the standardized development process and workflow for projects using the Dot AI framework. This includes step-by-step guides, best practices, and workflow diagrams to ensure consistent development practices.

##### docs/2-technical-design/requirements/
Stores detailed requirements for various aspects of the project, organized by category (e.g., security, performance, accessibility).

#### docs/3-development/
Contains documentation related to the development process, including folder lock documentation that specifies which folders should not be modified by AI tools.

#### docs/4-acceptence/
Houses acceptance criteria, validation reports, and compliance documentation.

##### docs/4-acceptence/compliance_reports/
Contains validation, compliance, and stability reports generated during project evaluation runs. These reports serve as evidence of the project's adherence to standards and requirements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Roadmap

* Create NPM CLI to configure repos for AI
* Create MCP server to manage and maintain context

## Creator

Andrew Hopper
x.com/andrewhopper
linkedin.com/in/andrewhopper
