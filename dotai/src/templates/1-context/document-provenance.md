---
id: CTX-document-provenance-001
created: 2025-11-02
---

# Document Provenance and Lineage Tracking

## Overview

Document provenance (also known as lineage tracking) provides a way to track relationships, dependencies, and the evolution of documentation within the Dot AI framework. This enables better traceability, impact analysis, and understanding of how documents relate to each other across the project lifecycle.

## What is Provenance?

**Provenance** refers to the origin, history, and relationships of a document. In the context of Dot AI:

- **Origin**: Where a document came from (e.g., derived from a template, generated from a requirement, evolved from a previous version)
- **Dependencies**: What other documents this document depends on or references
- **Derived Documents**: What documents were created based on this document
- **Evolution**: How a document has changed over time and why

## Why Track Provenance?

1. **Impact Analysis**: Understand which documents are affected when a requirement or specification changes
2. **Traceability**: Follow the path from business requirement → technical spec → implementation → validation
3. **Consistency**: Ensure derived documents stay in sync with their source documents
4. **Knowledge Transfer**: Help new team members understand why decisions were made and how documents relate
5. **Validation**: Verify that all requirements have corresponding implementations and test reports
6. **Change Management**: Track which documents need to be updated when a foundational document changes

## Provenance Metadata Format

Add provenance metadata to the YAML frontmatter of each document:

```yaml
---
id: ARCH-auth-feature-001
created: 2025-03-15
updated: 2025-03-20
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
      sections: [REQ-001, REQ-003]
    - id: CTX-project-conventions-001
      type: convention
      relationship: adheres-to
  generates:
    - id: DEV-auth-implementation-001
      type: implementation
      relationship: implements-spec
    - id: QA-auth-validation-001
      type: validation
      relationship: validates
---
```

## Relationship Types

### Primary Relationships

| Relationship | Description | Example |
|-------------|-------------|---------|
| `derived_from` | This document was created based on another document | A technical spec derived from a product requirement |
| `depends_on` | This document relies on information from another document | An implementation depends on architecture decisions |
| `generates` | This document led to the creation of another document | A spec generates an implementation and validation report |
| `implements` | This document implements requirements from another | Implementation implements a specification |
| `validates` | This document validates another document | A QA report validates an implementation |
| `supersedes` | This document replaces a previous document | Version 2 of a spec supersedes version 1 |
| `relates_to` | General relationship between documents | Security spec relates to authentication spec |

### Relationship Metadata

Each relationship can include:

- `id`: The ID of the related document (required)
- `type`: The type of document (e.g., product-requirement, architecture, implementation)
- `relationship`: The type of relationship (required)
- `sections`: Specific section IDs referenced (optional)
- `reason`: Why this relationship exists (optional)
- `created`: When this relationship was established (optional)

## Provenance Tracking Workflow

### 1. Creating New Documents

When creating a new document, always specify its provenance:

```yaml
---
id: DEV-payment-impl-001
created: 2025-03-15
provenance:
  derived_from:
    - id: ARCH-payment-spec-001
      type: specification
      relationship: implements
      reason: "Implementing Stripe payment integration"
---
```

### 2. Updating Existing Documents

When a source document changes, track the impact:

1. Identify all documents in the `generates` list of the changed document
2. Review each generated document to see if it needs updates
3. Update the `updated` timestamp and add a change log entry

### 3. Validation and Compliance

During validation, check provenance chains:

```markdown
## Provenance Validation

| Source Doc | Relationship | Target Doc | Status |
|-----------|-------------|-----------|--------|
| PRD-auth-001:STORY-001 | implements | ARCH-auth-001:SPEC-001 | ✅ PASS |
| ARCH-auth-001:SPEC-001 | implements | DEV-auth-impl-001:IMPL-001 | ✅ PASS |
| DEV-auth-impl-001:IMPL-001 | validates | QA-auth-report-001:TEST-001 | ✅ PASS |
```

## Common Provenance Patterns

### Pattern 1: Feature Development Flow

```
PRD-feature-001 (Product Requirement)
    ↓ derived_from
ARCH-feature-001 (Technical Specification)
    ↓ implements
DEV-feature-impl-001 (Implementation)
    ↓ validates
QA-feature-report-001 (Validation Report)
```

### Pattern 2: Cross-Cutting Concerns

```
ARCH-security-001 (Security Architecture)
    ↓ depends_on (multiple features)
    ├─→ ARCH-auth-001
    ├─→ ARCH-payment-001
    └─→ ARCH-data-privacy-001
```

### Pattern 3: Document Evolution

```
ARCH-api-v1-001 (Version 1)
    ↓ supersedes
ARCH-api-v2-001 (Version 2)
    └─→ reason: "Added GraphQL support and deprecated REST endpoints"
```

### Pattern 4: Shared Dependencies

```
CTX-project-conventions-001 (Conventions)
    ↓ adheres-to (multiple implementations)
    ├─→ DEV-frontend-001
    ├─→ DEV-backend-001
    └─→ DEV-mobile-001
```

## Provenance Query Examples

### Find All Implementations of a Requirement

```bash
# Search for documents that implement PRD-auth-001
grep -r "derived_from.*PRD-auth-001" .ai/docs/
```

### Find All Documents That Depend on an Architecture Decision

```bash
# Search for documents that depend on ARCH-security-001
grep -r "depends_on.*ARCH-security-001" .ai/docs/
```

### Find Orphaned Documents

Documents without provenance metadata may indicate:
- Missing relationships
- Documents that should be deprecated
- Root documents (e.g., initial project context)

## Automated Provenance Tools (Future)

Future enhancements could include:

1. **Provenance Validator**: Verify all relationships are valid and documents exist
2. **Impact Analyzer**: Generate reports showing which documents are affected by a change
3. **Lineage Visualizer**: Create visual diagrams of document relationships
4. **Orphan Detector**: Find documents without proper provenance
5. **Consistency Checker**: Ensure derived documents are up-to-date with source documents

## Best Practices

1. **Always Add Provenance**: Every document should have provenance metadata (except root context docs)
2. **Be Specific**: Reference specific section IDs when possible, not just document IDs
3. **Bidirectional Links**: When A derives from B, update both A's `derived_from` and B's `generates`
4. **Keep It Current**: Update provenance metadata when relationships change
5. **Document Why**: Use the `reason` field to explain non-obvious relationships
6. **Validate Regularly**: Check that all provenance links are valid and up-to-date
7. **Use Standard Relationships**: Stick to the defined relationship types for consistency

## Integration with Existing ID System

Provenance tracking builds on the existing ID system defined in CLAUDE.md:

- **File IDs**: `{folder-prefix}-{file-name}-{sequence}` (e.g., `CTX-project-conventions-001`)
- **Section IDs**: `{file-id}:{section-type}-{sequence}` (e.g., `CTX-project-conventions-001:REQ-001`)

Provenance metadata references these IDs to create a traceable network of relationships across all project documentation.

## Example: Complete Feature Provenance Chain

```yaml
# PRD-login-feature-001.md
---
id: PRD-login-feature-001
created: 2025-03-10
provenance:
  depends_on:
    - id: CTX-target-users-001
      type: context
      relationship: addresses
      sections: [USER-001, USER-002]
  generates:
    - id: ARCH-login-spec-001
      type: specification
      relationship: specifies
---
```

```yaml
# ARCH-login-spec-001.md
---
id: ARCH-login-spec-001
created: 2025-03-12
provenance:
  derived_from:
    - id: PRD-login-feature-001
      type: product-requirement
      relationship: implements
      sections: [STORY-001, STORY-002, STORY-003]
  depends_on:
    - id: ARCH-security-001
      type: architecture
      relationship: follows
      sections: [REQ-001, REQ-003, REQ-005]
    - id: CTX-project-conventions-001
      type: convention
      relationship: adheres-to
  generates:
    - id: DEV-login-impl-001
      type: implementation
      relationship: implements-spec
---
```

```yaml
# DEV-login-impl-001.md
---
id: DEV-login-impl-001
created: 2025-03-15
provenance:
  derived_from:
    - id: ARCH-login-spec-001
      type: specification
      relationship: implements
  depends_on:
    - id: CTX-project-conventions-001
      type: convention
      relationship: adheres-to
  generates:
    - id: QA-login-report-001
      type: validation
      relationship: validates
---
```

```yaml
# QA-login-report-001.md
---
id: QA-login-report-001
created: 2025-03-18
provenance:
  derived_from:
    - id: DEV-login-impl-001
      type: implementation
      relationship: validates
  validates:
    - id: ARCH-login-spec-001
      type: specification
      relationship: confirms-compliance
      sections: [SPEC-001, SPEC-002, SPEC-003]
    - id: PRD-login-feature-001
      type: product-requirement
      relationship: confirms-requirements
      sections: [STORY-001, STORY-002, STORY-003]
---
```

This creates a complete, traceable chain from user needs → requirements → specification → implementation → validation.
