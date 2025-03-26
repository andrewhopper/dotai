<!------------- -Main documentation file------------- -->

## Template Usage

Dot AI provides a comprehensive set of templates to help you structure your AI-assisted development workflow.

### Initializing Templates

When you run `dotai init`, you'll be asked if you want to include example templates. If you select 'yes', the CLI will create a complete `.ai` directory structure with template files.

```bash
# Initialize a new Dot AI project with templates
npx dotai init
```


## 3. Create a Quick Start Guide for Templates

```markdown
# Dot AI Quick Start Guide

## Getting Started with Templates

Dot AI templates provide a structured way to document your project for better AI collaboration. Here's how to get started:

### 1. Initialize Your Project

```bash
# Create a new project with templates
npx dotai init
```

# 2. Explore the Template Structure

The initialization creates a `.ai` directory with the following structure:

.ai/
├── 0-ai-config/          # AI assistant configuration
├── 1-context/            # Project context and conventions
├── 2-technical-design/   # Architecture and technical specifications
├── 3-development/        # Implementation details
└── 4-acceptance-reports/ # Validation reports


# 3. Complete Core Templates First

Start by filling out these essential templates:

* `project_context.md` - Define your project objectives and scope
* `project_conventions.md` - Establish coding and documentation standards
* `target-users.md` - Define your target audience

# 4. Define Technical Architecture

Next, document your technical approach:

* `.ai/2-technical-design/architecture.md` - System components and data flow
* `requirements` - Project requirements

# 5. Document as You Develop

As you implement features:

* Use `implementation` templates to document implementation details
* Record product requirements in `product`
* Track validation in `4-acceptance-reports`

# 6. Configure AI Assistants

* Update `.cursorrules` and `.clinerules` files
* Configure MCP in `mcp.md` if using tools like web search

# Best Practices

* **Keep Documentation Updated:** Maintain documentation as your project evolves
* **Follow ID Convention:** Use the document ID system for easy references
* **Cross-Reference:** Link related documents using their IDs
* **Lock Stable Components:** Use `folder-locks.md` to indicate stable parts of your project

For more detailed information, see the templates documentation.
