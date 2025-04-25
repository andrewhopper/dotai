# .ai Directory Structure Detailed Specifications

## Overview
This document details the structural specifications, naming conventions, and usage guidelines for the .ai directory. This directory structure is designed to provide a standardized documentation organization method for AI projects, ensuring completeness and accessibility of project information.

## Directory Structure Explained

### 0-ai-config/
Configuration directory used to store all AI-related configuration information.

#### workflow.md
- **Purpose**: Define AI workflow configuration
- **Core Content**:
  - Pre-processing and post-processing hook definitions
  - Input/output format specifications
  - Workflow trigger conditions
  - Error handling strategies

#### mcp.md (Model Context Protocol)
- **Purpose**: Define AI tool interaction protocol
- **Core Content**:
  - Context management rules
  - Model interaction format
  - Response handling specifications
  - Error recovery mechanisms

#### tools/
Stores configuration files for specific AI tools:
- **cursor.json**
  - Editor intelligent prompting configuration
  - Code completion rules
  - Custom command definitions
- **cline.json**
  - Command-line interaction rules
  - Automation script configuration
  - Response format definitions
- **copilot.json**
  - AI pair programming settings
  - Code generation rules
  - Comment style definitions

### 1-context/
Project context directory, containing all background information and specifications.

#### project-context/
- **background.md**
  - Project background and history
  - Business requirements explanation
  - Technology selection rationale
- **objectives.md**
  - Project goal definitions
  - Success criteria
  - Key metrics
- **constraints.md**
  - Technical limitations
  - Business constraints
  - Compliance requirements

#### conventions/
- **naming.md**
  - File naming standards
  - Variable naming rules
  - Function naming conventions
- **coding-style.md**
  - Code formatting standards
  - Comment requirements
  - Best practice guidelines
- **git-workflow.md**
  - Branch management strategy
  - Commit message standards
  - Version control process

### 2-technical-design/
Technical design document directory.

#### architecture/
- **system-architecture.md**
  - Overall system architecture
  - Component interaction relationships
  - Technology stack explanation
- **data-flow.md**
  - Data flow design
  - State management
  - Storage solutions

#### deployment/
- **environments.md**
  - Environment configuration explanation
  - Deployment process
  - Operations requirements

#### security/
- **security-standards.md**
  - Security standards
  - Access control
  - Data protection measures

### 3-development/
Development process and implementation documentation.

#### workflow/
- **development-process.md**
  - Development process explanation
  - Code review standards
  - Testing requirements
- **folder-locks.md**
  - Folder locking mechanisms
  - Access control rules
  - Concurrency handling

#### implementation/
- **guidelines.md**
  - Implementation guidelines
  - Code examples
  - Common problem solutions

### 4-acceptance/
Acceptance and quality assurance documentation.

#### qa/
- **testing-standards.md**
  - Testing standards
  - Acceptance criteria
  - Quality metrics
- **compliance.md**
  - Compliance checklists
  - Audit requirements
  - Acceptance processes

## Naming Conventions

### File Naming
- Use lowercase letters
- Separate words with hyphens (-)
- Clearly express file contents
- Avoid special characters

### Directory Naming
- Use numerical prefixes to indicate order
- Use descriptive names
- Maintain clear hierarchical structure

## Document Maintenance

### Update Process
1. Regularly review document contents
2. Record modification history
3. Synchronize updates to related documents
4. Maintain document index

### Version Control
- Use semantic versioning
- Record important changes
- Maintain backward compatibility

## Best Practices

### Document Writing
- Use clear title hierarchy
- Keep content concise
- Provide specific examples
- Include necessary reference links

### Directory Organization
- Follow logical grouping
- Avoid excessive nesting
- Maintain structural consistency
- Facilitate navigation and search