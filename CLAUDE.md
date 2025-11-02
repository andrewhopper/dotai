# CLAUDE.md - AI Assistant Guide for Dot AI

## ID Naming Convention
Each file and section will follow this ID structure:
- Files: `{folder-prefix}-{file-name}-{sequence}` (e.g., `CTX-project-conventions-001`)
- Sections: `{file-id}:{section-type}-{sequence}` (e.g., `CTX-project-conventions-001:REQ-001`)

### Folder Prefixes
- `CFG`: 0-ai-config
- `CTX`: 1-context
- `ARCH`: 2-technical-design
- `DEV`: 3-development (implementation tasks)
- `PRD`: 3-development (product requirements)
- `QA`: 4-acceptence-reports

### Section Types
- `REQ`: Requirement
- `SPEC`: Specification
- `IMPL`: Implementation
- `TEST`: Test
- `VAL`: Validation
- `FEAT`: Feature
- `BUG`: Bug fix
- `CHORE`: Maintenance task
- `TASK`: General task
- `STORY`: User story
- `EPIC`: Collection of related stories
- `SPIKE`: Research or exploration task

## Example Usage
A feature requirement might be referenced as:
```
ARCH-auth-feature-001:REQ-003 (PASS)
```

This references:
- File: `/2-technical-design/features/auth-feature.md` (ID: ARCH-auth-feature-001)
- Section: Requirement #3 in that file (ID: REQ-003)
- Status: PASS

## Implementation Guidelines
- Add ID frontmatter to each file:
  ```yaml
  ---
  id: ARCH-auth-feature-001
  created: 2025-03-15
  ---
  ```
- Add section IDs as HTML comments or in headings:
  ```markdown
  ## Authentication Flow <!-- REQ-003 -->
  ```
- Reference IDs in validation reports:
  ```markdown
  | Requirement ID | Status | Notes |
  |---------------|--------|-------|
  | ARCH-auth-feature-001:REQ-003 | PASS | All tests passing |
  | PRD-login-feature-002:STORY-001 | PASS | Verified by QA |
  ```

## Document Provenance (Lineage Tracking)

Track relationships and dependencies between documents using provenance metadata. This enables impact analysis, traceability, and understanding of how documents evolve.

### Provenance Metadata Structure

Add provenance information to document frontmatter:

```yaml
---
id: ARCH-auth-feature-001
created: 2025-03-15
provenance:
  derived_from:
    - id: PRD-user-auth-001
      type: product-requirement
      relationship: implements
      sections: [STORY-001, STORY-002]
  depends_on:
    - id: ARCH-security-001
      type: architecture
      relationship: follows
  generates:
    - id: DEV-auth-implementation-001
      type: implementation
      relationship: implements-spec
---
```

### Key Relationship Types

- `derived_from`: This document was created based on another document
- `depends_on`: This document relies on information from another document
- `generates`: This document led to the creation of another document
- `implements`: This document implements requirements from another
- `validates`: This document validates another document
- `supersedes`: This document replaces a previous document
- `relates_to`: General relationship between documents

### Provenance Best Practices

1. **Always add provenance metadata** to new documents (except root context docs)
2. **Reference specific section IDs** when possible, not just document IDs
3. **Maintain bidirectional links**: Update both source and derived documents
4. **Document the "why"**: Use the `reason` field for non-obvious relationships
5. **Validate provenance chains** during compliance reviews
6. **Track document evolution** using `supersedes` relationships

For detailed guidance, see [document-provenance.md](dotai/src/templates/1-context/document-provenance.md)

## ID Usage Examples
- `PRD-login-feature-001:STORY-002`: Product requirement for login feature, story #2
- `DEV-authentication-001:IMPL-005`: Development implementation for authentication, implementation detail #5
- `QA-security-report-001:TEST-003`: QA security test report, test case #3

## Project Commands
- Install: `npm install` (future)
- Build: `npm run build` (future) 
- Lint: `npm run lint` (future)
- Test: `npm test` (future)
- Test single file: `npm test -- -f path/to/test` (future)

## Code Style Guidelines
- **File Naming**: Use kebab-case for files, folders (lowercase, hyphens)
- **Code Style**: camelCase for variables/functions, descriptive naming
- **Indentation**: 2 spaces for most languages (see dev-conventions.md)
- **Documentation**: Markdown for all docs, JSDoc for code comments
- **Error Handling**: Use exceptions, provide meaningful error messages
- **Imports**: Group imports by type, alphabetize within groups

## Development Workflow
- Document features before implementation (spec → implement → validate)
- Create validation reports for all completed features
- Check folder-locks.md before modifying directories (.ailock files)
- Follow preflight/post-flight hook patterns in workflow.md

## AI Agent Guidelines
- Assist with documentation using templates in workflow.md
- Implement features according to specifications in technical-design/
- Validate against standards in project_conventions.md
- Generate compliance reports following validation
- Do not modify locked folders without explicit permission
- Always use and reference section IDs in validation reports