---
id: PRD-[feature-name]-001
created: {{createdDate}}
authors:
  - name: "[Author Name]"
    email: "[email@example.com]"
    role: "[Role]"
stakeholders:
  - name: "[Stakeholder Name]"
    department: "[Department]"
provenance:
  depends_on:
    - id: CTX-target-users-001
      type: context
      relationship: addresses
      reason: "Addresses user needs and personas defined in target users doc"
  generates:
    - id: ARCH-[feature-name]-001
      type: specification
      relationship: specifies
      reason: "This requirement generates the technical specification"
---

# [Feature Name] Requirements <!-- STORY-001 -->

## Overview <!-- INFO-001 -->
[Brief description of the feature]

## User Stories <!-- STORY-002 -->
- As a [user type], I want to [action] so that [benefit]
- As a [user type], I want to [action] so that [benefit]

## Acceptance Criteria <!-- TEST-001 -->
- [Criterion 1]
- [Criterion 2]
- [Criterion 3]

## UI/UX Requirements <!-- REQ-001 -->
[Description of UI/UX requirements]

## Business Rules <!-- REQ-002 -->
[Description of business rules]

## Technical Constraints <!-- REQ-003 -->
[Description of technical constraints]

## Dependencies <!-- REQ-004 -->
[Description of dependencies]

## Open Questions <!-- INFO-002 -->
[List of open questions]