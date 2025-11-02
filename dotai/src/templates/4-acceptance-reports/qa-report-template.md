---
id: QA-[feature-name]-001
created: {{createdDate}}
authors:
  - name: "[QA Engineer Name]"
    email: "[email@example.com]"
    role: "QA Engineer"
provenance:
  derived_from:
    - id: DEV-[feature-name]-001
      type: implementation
      relationship: validates
      reason: "Validates the implementation against specifications"
  validates:
    - id: ARCH-[feature-name]-001
      type: specification
      relationship: confirms-compliance
      sections: [SPEC-001, SPEC-002]
      reason: "Confirms implementation complies with specification"
    - id: PRD-[feature-name]-001
      type: product-requirement
      relationship: confirms-requirements
      sections: [STORY-001, STORY-002]
      reason: "Confirms all user stories and requirements are met"
tested:
  - ARCH-[architecture-doc]-001
  - PRD-[product-doc]-001
  - DEV-[implementation-doc]-001
test_date: {{createdDate}}
---

# [Feature Name] Validation Report <!-- TEST-001 -->

## Test Summary <!-- TEST-002 -->
[Summary of testing performed]

## Test Environment <!-- TEST-003 -->
- **Environment**: [Environment details]
- **Browser/Device**: [Browser/device details]
- **Version**: [Version details]

## Test Results <!-- TEST-004 -->

| Requirement ID | Status | Notes |
|---------------|--------|-------|
| ARCH-[doc]-001:REQ-001 | [PASS/FAIL] | [Notes] |
| PRD-[doc]-001:STORY-001 | [PASS/FAIL] | [Notes] |
| DEV-[doc]-001:IMPL-001 | [PASS/FAIL] | [Notes] |

## Issues Found <!-- BUG-001 -->
[Description of issues found, if any]

## Recommendations <!-- INFO-001 -->
[Recommendations for improvement]

## Conclusion <!-- INFO-002 -->
[Conclusion of the validation report]