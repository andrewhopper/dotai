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
- **Scale workflow rigor to match project stage** (see below)

## Project Stage Management
Projects evolve through stages of increasing stability. AI assistants should match verbosity and rigor to the current stage:

### Stage Overview
- **Concept (0-20%)**: Minimal verbosity, validate idea, brief responses
- **Prototype (20-40%)**: Low verbosity, functional code, skip comprehensive docs/tests
- **Alpha (40-60%)**: Moderate verbosity, proper error handling, document public APIs
- **Beta (60-80%)**: High verbosity, comprehensive tests/docs, rigorous validation
- **MVP (80-90%)**: Complete verbosity, production-ready, full workflow
- **Production (90-100%)**: Enterprise-grade, all standards, complete documentation

### Key Principles
- **Early stages**: Focus on exploration, rapid iteration, minimal ceremony
- **Late stages**: Comprehensive documentation, rigorous validation, production-ready
- **Check project stage** in `.ai/1-context/project_context.md` before generating output
- **Match detail level** to stage to prevent premature over-engineering

**Full details**: See `.ai/2-technical-design/architecture/project-stage-stability.md`

## AI Agent Guidelines
- **Check project stage first** in `.ai/1-context/project_context.md` to determine appropriate verbosity
- Match detail level and rigor to project stage (see Project Stage Management above)
- Assist with documentation using templates in workflow.md
- Implement features according to specifications in technical-design/
- Validate against standards in project_conventions.md (rigor scaled to stage)
- Generate compliance reports following validation (depth scaled to stage)
- Do not modify locked folders without explicit permission
- Always use and reference section IDs in validation reports
- **Avoid over-engineering early-stage projects** - prioritize speed in concept/prototype phases
- **Maintain quality in mature projects** - follow complete workflow for MVP/production