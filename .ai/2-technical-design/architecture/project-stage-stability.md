---
id: ARCH-project-stage-stability-001
created: 2025-11-02
---

# Project Stage Stability Management

## Overview

This document defines how projects evolve organically through different stages of maturity, and provides guidance for AI assistants on appropriate levels of detail and verbosity at each stage. The core principle is: **early explorations should be lightweight and iterative, while mature projects require comprehensive detail and rigor**.

## Philosophy

Projects naturally evolve through stages of increasing stability:
- **Early stages** (~50% stable): Focus on exploration, rapid iteration, minimal ceremony
- **Middle stages** (~70-80% stable): Balance speed with emerging patterns and standards
- **Late stages** (~95%+ stable): Comprehensive documentation, rigorous validation, production-ready

**Key Goal**: Prevent premature optimization and excessive verbosity during early prototyping phases, while ensuring appropriate rigor as projects mature.

## Project Stage Definitions

### Stage 1: Concept/Idea (0-20% Stable)

**Purpose**: Validate the core idea and explore feasibility

**Characteristics**:
- Rough sketches and notes
- High-level problem statement
- Basic architectural ideas
- No code yet (or minimal proof-of-concept)

**AI Assistant Guidelines**:
- ✅ **DO**: Keep responses concise and focused on core concepts
- ✅ **DO**: Provide simple, direct answers
- ✅ **DO**: Offer 2-3 alternative approaches when relevant
- ✅ **DO**: Focus on feasibility and key trade-offs
- ❌ **DON'T**: Write detailed specifications
- ❌ **DON'T**: Create comprehensive documentation structures
- ❌ **DON'T**: Implement complex validation frameworks
- ❌ **DON'T**: Generate extensive boilerplate

**Documentation Level**: Minimal
- Brief README with problem statement
- High-level architecture sketch (1-2 paragraphs)
- Key assumptions and constraints

**Example Prompt Modifier**:
```
"This is a concept-stage project (20% stable). Keep your response brief and focused on validating the core idea. Avoid detailed documentation or extensive boilerplate."
```

### Stage 2: Prototype (20-40% Stable)

**Purpose**: Build a working proof-of-concept to validate core functionality

**Characteristics**:
- Functional but rough implementation
- Core features work but lack polish
- Rapid iteration and experimentation
- Technical feasibility proven
- Limited error handling and edge cases

**AI Assistant Guidelines**:
- ✅ **DO**: Generate functional code quickly
- ✅ **DO**: Focus on core functionality over edge cases
- ✅ **DO**: Use simple, direct implementations
- ✅ **DO**: Provide inline comments for complex logic
- ✅ **DO**: Create basic test cases for critical paths
- ❌ **DON'T**: Generate comprehensive test suites
- ❌ **DON'T**: Create detailed API documentation
- ❌ **DON'T**: Implement extensive error handling
- ❌ **DON'T**: Optimize prematurely
- ❌ **DON'T**: Write lengthy architectural documents

**Documentation Level**: Light
- README with setup and basic usage
- Core architecture decisions (1-2 pages)
- Key learnings and open questions
- Basic inline code comments

**Example Prompt Modifier**:
```
"This is a prototype-stage project (40% stable). Focus on functional code and core features. Skip comprehensive error handling, extensive tests, and detailed documentation for now."
```

### Stage 3: Alpha (40-60% Stable)

**Purpose**: Validate the feature set with early users and refine the approach

**Characteristics**:
- Core features implemented and tested
- Internal testing in progress
- Architecture patterns emerging
- Some error handling and validation
- Breaking changes still expected

**AI Assistant Guidelines**:
- ✅ **DO**: Implement proper error handling for main flows
- ✅ **DO**: Write tests for critical functionality
- ✅ **DO**: Document public APIs and key functions
- ✅ **DO**: Follow emerging code patterns and conventions
- ✅ **DO**: Consider performance for critical paths
- ⚖️ **MODERATE**: Generate validation reports (lightweight versions)
- ⚖️ **MODERATE**: Follow standards (but don't be rigid)
- ❌ **DON'T**: Create exhaustive documentation
- ❌ **DON'T**: Implement every edge case
- ❌ **DON'T**: Obsess over perfect adherence to all standards

**Documentation Level**: Moderate
- Comprehensive README with examples
- Architecture overview (3-5 pages)
- API documentation for public interfaces
- Setup and deployment guides
- Known issues and limitations

**Example Prompt Modifier**:
```
"This is an alpha-stage project (60% stable). Implement proper error handling and tests for main flows. Document public APIs but keep it practical. Breaking changes are still acceptable."
```

### Stage 4: Beta (60-80% Stable)

**Purpose**: Refine quality and prepare for broader adoption

**Characteristics**:
- Feature-complete for planned scope
- External testing with real users
- Comprehensive error handling
- Performance optimized
- API/interface mostly stable
- Minor changes still possible

**AI Assistant Guidelines**:
- ✅ **DO**: Implement comprehensive error handling
- ✅ **DO**: Write thorough test coverage (aim for 80%+)
- ✅ **DO**: Generate detailed documentation
- ✅ **DO**: Follow all applicable standards strictly
- ✅ **DO**: Validate against requirements rigorously
- ✅ **DO**: Consider accessibility, security, performance
- ✅ **DO**: Create validation reports for changes
- ⚖️ **MODERATE**: Balance thoroughness with pragmatism
- ❌ **DON'T**: Make breaking changes without strong justification

**Documentation Level**: Comprehensive
- Full README with advanced usage examples
- Detailed architecture documentation
- Complete API reference
- Testing guide and coverage reports
- Deployment and operations guides
- Troubleshooting documentation

**Example Prompt Modifier**:
```
"This is a beta-stage project (80% stable). Follow standards rigorously, implement comprehensive tests and error handling, and generate detailed documentation. Avoid breaking changes unless necessary."
```

### Stage 5: MVP (80-90% Stable)

**Purpose**: Launch the minimum viable product to real users

**Characteristics**:
- Production-ready core functionality
- Stable public interfaces
- Comprehensive testing and validation
- Performance and security hardened
- Full documentation
- Monitoring and observability in place

**AI Assistant Guidelines**:
- ✅ **DO**: Follow ALL applicable standards without exception
- ✅ **DO**: Generate complete validation reports
- ✅ **DO**: Implement comprehensive test coverage (90%+ for critical paths)
- ✅ **DO**: Document everything thoroughly
- ✅ **DO**: Consider all edge cases and error scenarios
- ✅ **DO**: Validate security, performance, accessibility
- ✅ **DO**: Create detailed compliance reports
- ❌ **DON'T**: Cut corners on quality or documentation
- ❌ **DON'T**: Skip validation steps

**Documentation Level**: Complete
- Production-ready README
- Full architecture documentation
- Complete API documentation with examples
- Security and compliance documentation
- Operations runbooks
- Incident response procedures
- User guides (if applicable)

**Example Prompt Modifier**:
```
"This is an MVP-stage project (90% stable). Follow all standards rigorously, implement comprehensive testing and validation, and generate complete documentation. Treat this as production-ready code."
```

### Stage 6: Production (90-100% Stable)

**Purpose**: Maintain and evolve a production system serving real users

**Characteristics**:
- Battle-tested in production
- Mature processes and workflows
- Strict change control
- Comprehensive monitoring and alerting
- SLAs and performance requirements
- Backward compatibility requirements

**AI Assistant Guidelines**:
- ✅ **DO**: Follow the complete Dot AI workflow (all 8 steps)
- ✅ **DO**: Generate comprehensive validation and compliance reports
- ✅ **DO**: Consider backward compatibility for all changes
- ✅ **DO**: Implement extensive test coverage (95%+ target)
- ✅ **DO**: Document everything including migration guides
- ✅ **DO**: Follow security best practices rigorously
- ✅ **DO**: Consider performance and scalability implications
- ✅ **DO**: Validate against SLAs and requirements
- ❌ **DON'T**: Make any breaking changes without explicit approval
- ❌ **DON'T**: Skip any validation or approval steps

**Documentation Level**: Enterprise-grade
- Complete technical documentation
- Architecture Decision Records (ADRs)
- Change management procedures
- Migration guides for upgrades
- Security and compliance documentation
- Performance benchmarks and SLAs
- Complete API documentation with versioning
- Operations and maintenance guides

**Example Prompt Modifier**:
```
"This is a production-stage project (100% stable). Follow all standards and processes rigorously. Maintain backward compatibility, implement comprehensive testing, generate all required reports, and document everything thoroughly."
```

## Stage Transition Criteria

### Concept → Prototype
- ✅ Core idea validated
- ✅ Technical approach identified
- ✅ Basic feasibility confirmed
- ✅ Initial architecture sketched

### Prototype → Alpha
- ✅ Core functionality working
- ✅ Technical risks addressed
- ✅ Architecture patterns established
- ✅ Basic tests for critical paths
- ✅ Ready for internal testing

### Alpha → Beta
- ✅ All planned features implemented
- ✅ Internal testing completed
- ✅ Major bugs fixed
- ✅ API/interface stabilized
- ✅ Documentation drafted
- ✅ Ready for external testing

### Beta → MVP
- ✅ External testing completed
- ✅ Performance validated
- ✅ Security reviewed
- ✅ Documentation complete
- ✅ Deployment process validated
- ✅ Monitoring in place
- ✅ Ready for limited production use

### MVP → Production
- ✅ Real user validation
- ✅ Production operations proven
- ✅ SLAs defined and met
- ✅ Incident response procedures tested
- ✅ Scaling validated
- ✅ Full compliance achieved
- ✅ Ready for broad production use

## AI Verbosity Guidelines by Stage

| Stage | Code Verbosity | Documentation Detail | Validation Rigor | Test Coverage | Estimated Lines/Feature |
|-------|---------------|---------------------|------------------|---------------|------------------------|
| Concept | Minimal | Brief notes | None | None | 0-50 (sketches) |
| Prototype | Simple | Basic README | Light | Core paths only | 100-500 |
| Alpha | Moderate | Growing | Moderate | 50-70% | 500-2000 |
| Beta | Thorough | Comprehensive | Rigorous | 80%+ | 2000-5000 |
| MVP | Production-ready | Complete | Full workflow | 90%+ | 5000+ |
| Production | Enterprise-grade | Exhaustive | Complete | 95%+ | 10000+ |

## Practical Examples

### Example 1: Adding Authentication

**Concept Stage**:
```markdown
"We need user authentication. Consider OAuth vs JWT."
(AI provides 2-3 paragraph comparison, no code)
```

**Prototype Stage**:
```typescript
// Basic JWT implementation, ~50 lines
// Comments on key decisions
// No comprehensive error handling
```

**Alpha Stage**:
```typescript
// Structured auth module, ~200 lines
// Error handling for main flows
// Basic tests for login/logout
// Simple API documentation
```

**Beta Stage**:
```typescript
// Complete auth system, ~500 lines
// Comprehensive error handling
// 80% test coverage
// Full API docs with examples
// Security validation report
```

**MVP/Production Stage**:
```typescript
// Enterprise auth system, ~1500+ lines
// All edge cases handled
// 95% test coverage
// Complete documentation
// Security audit completed
// Compliance reports generated
// Rate limiting, monitoring, logging
```

### Example 2: Database Schema Change

**Concept**: "Sketch entity relationships" → Simple diagram

**Prototype**: "Create basic tables" → SQL with main fields only

**Alpha**: "Add relationships and indexes" → Proper schema + basic migrations

**Beta**: "Add validation and constraints" → Production-ready schema + rollback procedures

**MVP/Production**: "Generate full migration with testing" → Complete migration + validation + rollback + monitoring

## Integration with Dot AI Workflow

The project stage should inform which workflow steps to follow:

| Workflow Step | Concept | Prototype | Alpha | Beta | MVP | Production |
|---------------|---------|-----------|-------|------|-----|-----------|
| 1. Bootstrap | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 2. Define Context | Light | Light | Moderate | Full | Full | Full |
| 3. Document Feature | Skip | Basic | Moderate | Full | Full | Full |
| 4. Implement | Sketch | Quick | Proper | Rigorous | Complete | Complete |
| 5. Validate | Skip | Light | Moderate | Full | Full | Full |
| 6. Validation Report | Skip | Skip | Optional | Required | Required | Required |
| 7. Revise | Iterate | Iterate | Revise | Revise | Revise | Revise |
| 8. Compliance Review | Skip | Skip | Light | Full | Full | Full |

## Setting Project Stage

Projects should explicitly declare their stage in `.ai/1-context/project_context.md`:

```markdown
---
id: CTX-project-context-001
created: 2025-11-02
stage: alpha  # concept | prototype | alpha | beta | mvp | production
stability: 60%
---

# Project Context

## Current Stage
**Stage**: Alpha (60% stable)
**Next Milestone**: Beta release with external testing
**Target Stability**: 80% by Q2 2025

## Stage Rationale
We're transitioning from prototype to alpha. Core features are implemented and internal testing is underway. We're establishing architecture patterns but expect some breaking changes as we incorporate user feedback.
```

## AI Prompt Templates by Stage

### Concept Stage Template
```
PROJECT STAGE: Concept (20% stable)
VERBOSITY: Minimal
FOCUS: Validate idea and explore options

[Your question/request]

Guidelines for AI:
- Keep responses concise (2-3 paragraphs max)
- Focus on feasibility and key trade-offs
- Suggest 2-3 alternatives if relevant
- No detailed documentation or extensive code
```

### Prototype Stage Template
```
PROJECT STAGE: Prototype (40% stable)
VERBOSITY: Low
FOCUS: Build working proof-of-concept

[Your question/request]

Guidelines for AI:
- Generate functional code quickly
- Focus on core functionality
- Basic comments only
- Skip comprehensive tests and docs
```

### Alpha Stage Template
```
PROJECT STAGE: Alpha (60% stable)
VERBOSITY: Moderate
FOCUS: Validate feature set and refine approach

[Your question/request]

Guidelines for AI:
- Implement proper error handling for main flows
- Write tests for critical functionality
- Document public APIs
- Follow emerging patterns
```

### Beta Stage Template
```
PROJECT STAGE: Beta (80% stable)
VERBOSITY: High
FOCUS: Refine quality for broader adoption

[Your question/request]

Guidelines for AI:
- Follow standards rigorously
- Comprehensive error handling and tests
- Generate detailed documentation
- Create validation reports
```

### MVP/Production Stage Template
```
PROJECT STAGE: MVP/Production (90%+ stable)
VERBOSITY: Complete
FOCUS: Maintain production-quality system

[Your question/request]

Guidelines for AI:
- Follow complete Dot AI workflow
- Comprehensive validation and compliance
- Enterprise-grade documentation
- Consider backward compatibility
- Generate all required reports
```

## Best Practices

### For Project Teams

1. **Declare your stage explicitly** in project documentation
2. **Update stage as project evolves** with clear transition criteria
3. **Communicate stage changes** to all stakeholders and AI assistants
4. **Match processes to stage** - don't over-engineer early stages
5. **Plan stage transitions** with clear milestones and criteria

### For AI Assistants

1. **Always check project stage** before generating code or documentation
2. **Match verbosity to stage** - be concise early, comprehensive later
3. **Respect stage-appropriate workflows** - don't enforce MVP processes on prototypes
4. **Highlight stage mismatches** - warn if requests seem inappropriate for stage
5. **Suggest stage transitions** when appropriate criteria are met

### Red Flags

- 🚩 **Prototype with 100-page specification** → Over-documentation for stage
- 🚩 **Production system with no tests** → Under-engineering for stage
- 🚩 **Concept stage requesting enterprise architecture** → Premature complexity
- 🚩 **Beta project with breaking changes daily** → Should still be in alpha
- 🚩 **MVP without security review** → Missing critical requirement

## Conclusion

Project stage stability management ensures that development rigor matches project maturity. Early-stage projects benefit from lightweight processes and rapid iteration, while mature projects require comprehensive documentation, testing, and validation.

By explicitly declaring and managing project stages, teams can:
- **Avoid premature optimization** and over-engineering
- **Scale complexity appropriately** as projects mature
- **Set clear expectations** for AI assistance
- **Balance speed with quality** at each stage
- **Transition smoothly** between stages with clear criteria

Remember: **The goal is not to skip important work, but to do the right work at the right time.**
