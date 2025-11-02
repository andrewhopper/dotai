---
id: ARCH-ai-steering-dock-proposal-001
created: 2025-11-02
type: research-proposal
status: draft
---

# AI Steering Dock Research Proposal
## Research into Open Source Project Evolution Stages

<!-- SPIKE-001 -->
### Executive Summary

This proposal outlines a research initiative to study the evolution patterns of successful open source projects, from initial concept through maturity. The goal is to identify distinct development stages with specific focus areas, objectives, and best practices that can guide AI coding tools in providing contextually appropriate assistance throughout a project's lifecycle.

The deliverable will be an "AI Steering Dock" - a framework that helps AI assistants understand where a project is in its evolution and what priorities, patterns, and practices are most appropriate for that stage.

---

<!-- REQ-001 -->
### Research Objectives

1. **Identify Evolution Stages**: Map common stages that open source projects progress through from concept to maturity
2. **Define Stage Characteristics**: Document the key focus areas, priorities, and activities typical of each stage
3. **Extract Best Practices**: Identify patterns, practices, and anti-patterns specific to each stage
4. **Create Guidance Framework**: Develop a structured framework (AI Steering Dock) that AI tools can use to provide stage-appropriate assistance
5. **Enable Stage Detection**: Define markers/indicators that help identify which stage a project is currently in

---

<!-- SPEC-001 -->
### Proposed Project Selection Criteria

We will analyze **15-20 successful open source projects** across different domains, selected based on:

#### Size & Maturity Diversity
- **Early Stage** (< 6 months old, < 100 stars): 3-4 projects
- **Growth Stage** (6-24 months, 100-5k stars): 5-6 projects
- **Mature Stage** (2+ years, 5k+ stars): 5-6 projects
- **Very Mature** (5+ years, 50k+ stars): 3-4 projects

#### Domain Diversity
- **Developer Tools**: 3-4 projects (e.g., Vite, esbuild, Turbo)
- **Web Frameworks**: 3-4 projects (e.g., SvelteKit, Remix, Astro)
- **Backend/Infrastructure**: 3-4 projects (e.g., Supabase, Prisma, tRPC)
- **Developer Experience**: 3-4 projects (e.g., Zod, Vitest, Playwright)
- **Novel/Emerging**: 2-3 projects (recent innovative projects)

#### Specific Candidate Projects

**Very Mature (Baseline Reference)**
- React (10+ years, UI library evolution)
- Vue.js (8+ years, progressive framework)
- Node.js (14+ years, runtime evolution)
- TypeScript (11+ years, language tooling)

**Mature Stage**
- Vite (4+ years, build tool)
- Prisma (5+ years, ORM)
- Supabase (4+ years, backend platform)
- tRPC (3+ years, API framework)
- Playwright (4+ years, testing)

**Growth Stage**
- Astro (3 years, web framework)
- Bun (2+ years, JavaScript runtime)
- Biome (2 years, toolchain)
- Drizzle (2 years, ORM)
- Effect (2+ years, functional programming)

**Early Stage**
- Hono (1-2 years, web framework)
- Oxc (1-2 years, JavaScript tooling)
- Tempo (< 1 year, date/time library)
- Recent notable projects from GitHub trending

---

<!-- SPEC-002 -->
### Research Methodology

#### Data Collection
For each project, we will analyze:

1. **Git History Analysis**
   - Commit patterns over time (frequency, size, scope)
   - Contributor growth patterns
   - Branch/release strategy evolution
   - File structure changes over time

2. **Documentation Evolution**
   - README progression (features, claims, positioning)
   - Documentation structure changes
   - API stability and versioning
   - Migration guides and breaking changes

3. **Code Architecture Analysis**
   - Initial architecture decisions
   - Major refactoring points
   - Testing strategy evolution
   - Performance optimization timing
   - API surface area growth

4. **Community & Governance**
   - Issue/PR patterns over time
   - Community guidelines development
   - Contribution process maturation
   - Governance model establishment

5. **Key Milestones**
   - First commit to first user
   - First external contributor
   - First major refactor
   - First breaking change
   - Adoption inflection points

#### Analysis Framework
We will categorize findings into:
- **Technical Focus Areas**: What code/architecture priorities dominated each stage
- **Documentation Priorities**: What needed to be documented when
- **Quality Gates**: What quality measures were implemented at each stage
- **Community Activities**: How community interaction evolved
- **Risk Areas**: Common pitfalls and mistakes at each stage

---

<!-- SPEC-003 -->
### Proposed Evolution Stages Framework (Hypothesis)

Based on preliminary understanding, we hypothesize 5-7 distinct stages:

#### Stage 0: Concept/Exploration
**Focus**: Validate the core idea
- Rapid prototyping, experimentation
- Minimal structure, maximum flexibility
- Documentation: Basic README with concept/vision
- No users, solo or small team
- **AI Assistance Priority**: Help explore alternatives, rapid iteration

#### Stage 1: Initial Implementation
**Focus**: Make it work
- Core functionality implementation
- Proof of concept that solves the problem
- Basic happy-path testing
- Documentation: Usage examples, installation
- First external users (dogfooding)
- **AI Assistance Priority**: Feature implementation, basic patterns

#### Stage 2: Validation/Feedback
**Focus**: Make it useful
- Incorporate early user feedback
- Handle edge cases discovered by users
- Error handling and validation
- Documentation: Common use cases, troubleshooting
- Small community forming
- **AI Assistance Priority**: Bug fixes, UX improvements, docs

#### Stage 3: Stabilization
**Focus**: Make it reliable
- API stabilization
- Comprehensive testing
- Performance optimization (first pass)
- Documentation: API reference, migration guides
- Growing community, first contributors
- **AI Assistance Priority**: Testing, refactoring, API design

#### Stage 4: Scaling/Growth
**Focus**: Make it production-ready
- Performance & scale optimization
- Plugin/extension architecture
- Comprehensive error handling
- Documentation: Best practices, architecture guides
- Active community, regular contributors
- **AI Assistance Priority**: Architecture, performance, extensibility

#### Stage 5: Maturity/Ecosystem
**Focus**: Make it robust & sustainable
- Backward compatibility management
- Ecosystem support (plugins, integrations)
- Advanced optimization
- Documentation: Migration paths, upgrade guides
- Established governance
- **AI Assistance Priority**: Maintenance, compatibility, governance

#### Stage 6: Evolution/Renewal (Optional)
**Focus**: Prevent stagnation
- Major version transitions
- Architecture modernization
- New paradigm adoption
- Documentation: Deprecation guides, future vision
- **AI Assistance Priority**: Breaking changes, migration tooling

---

<!-- SPEC-004 -->
### Deliverables

#### 1. Research Report
A comprehensive document containing:
- Analysis of all studied projects
- Identified evolution stages with characteristics
- Common patterns and anti-patterns per stage
- Transition indicators between stages
- Timeline benchmarks (how long projects typically spend in each stage)

#### 2. AI Steering Dock Framework
A structured guideline system including:
- **Stage Detection Guide**: How to identify current project stage
- **Stage-Specific Priorities**: What matters most at each stage
- **AI Assistance Guidelines**: How AI should help differently at each stage
- **Red Flags**: What to avoid at each stage
- **Transition Checklist**: When to move between stages

#### 3. Implementation Specifications
Technical specifications for:
- Automated stage detection (file patterns, metrics, markers)
- Context provision for AI tools
- Integration points for AI coding assistants
- Validation criteria for stage progression

#### 4. Validation Case Studies
- 3-5 detailed case studies of project evolutions
- Before/after comparisons of projects at different stages
- Success stories and cautionary tales

---

<!-- IMPL-001 -->
### Implementation Timeline

**Phase 1: Project Selection & Setup** (Week 1)
- Finalize project list
- Set up analysis tools/scripts
- Create data collection templates

**Phase 2: Data Collection** (Weeks 2-4)
- Analyze git histories
- Review documentation evolution
- Study architecture changes
- Collect community metrics

**Phase 3: Pattern Analysis** (Weeks 5-6)
- Identify common stages across projects
- Extract patterns and anti-patterns
- Define stage characteristics
- Create transition indicators

**Phase 4: Framework Development** (Weeks 7-8)
- Design AI Steering Dock structure
- Write stage-specific guidelines
- Create detection mechanisms
- Develop validation criteria

**Phase 5: Validation & Refinement** (Weeks 9-10)
- Test framework against case studies
- Gather feedback from developers
- Refine stages and guidelines
- Document findings

**Phase 6: Documentation & Delivery** (Weeks 11-12)
- Complete research report
- Finalize AI Steering Dock framework
- Create implementation specs
- Prepare presentation/demos

---

<!-- REQ-002 -->
### Success Criteria

The research will be considered successful if it produces:

1. **Clear Stage Definitions**: 5-7 distinct, well-defined stages with clear boundaries
2. **Actionable Guidelines**: Specific, practical guidance for each stage that AI can apply
3. **Reliable Detection**: Markers that accurately identify project stage with >80% confidence
4. **Validated Patterns**: Patterns confirmed across multiple projects in different domains
5. **Practical Value**: Framework demonstrably improves AI assistance quality
6. **Community Validation**: Positive feedback from experienced open source maintainers

---

<!-- TEST-001 -->
### Validation Approach

We will validate the framework by:

1. **Historical Validation**: Apply framework to project histories and verify it correctly identifies stages
2. **Expert Review**: Have experienced OSS maintainers review and validate stage definitions
3. **Practical Testing**: Use framework to guide AI assistance on real projects and measure outcomes
4. **Cross-Project Consistency**: Ensure framework works across different project types and sizes

---

### Open Questions

1. Do different project types (libraries vs. frameworks vs. applications) have significantly different evolution patterns?
2. How do modern projects differ from older projects due to ecosystem maturity (e.g., TypeScript, testing tools)?
3. Should stage progression be linear or can projects move backward or skip stages?
4. How do we handle projects that intentionally stay small/focused vs. those that aim for broad adoption?
5. What role does funding/sponsorship play in evolution patterns?

---

### Next Steps

1. **Review & Approve**: Get stakeholder feedback on this proposal
2. **Refine Scope**: Adjust project list and timeline based on feedback
3. **Begin Research**: Start with Phase 1 (Project Selection & Setup)
4. **Regular Updates**: Provide weekly progress reports
5. **Iterate**: Adjust methodology based on early findings

---

### Related Documents

- `CTX-project-conventions-001`: Project conventions and structure
- `DEV-*`: Implementation tasks (to be created)
- `QA-*`: Validation reports (to be created)

---

### Notes

This research will inform not just AI coding assistants but also:
- Developer education (knowing what to focus on when)
- Project planning (realistic timelines and priorities)
- Tool development (stage-appropriate tooling)
- Open source best practices (when to adopt certain practices)

The AI Steering Dock will be a living framework, updated as we learn from new projects and evolution patterns.
