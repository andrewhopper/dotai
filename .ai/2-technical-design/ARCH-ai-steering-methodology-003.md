---
id: ARCH-ai-steering-methodology-003
created: 2025-11-02
parent: ARCH-ai-steering-dock-proposal-001
type: methodology
status: draft
---

# AI Steering Dock: Research Methodology
## Framework for Analyzing Open Source Project Evolution

This document outlines the specific methodology, tools, and frameworks for analyzing open source project evolution as part of the AI Steering Dock research initiative.

---

## Analysis Dimensions

### 1. Temporal Analysis
Track how projects change over time across multiple dimensions.

#### Git History Metrics
```
Key Metrics to Extract:
- Commit frequency (daily/weekly/monthly averages)
- Commit size distribution (lines changed)
- File churn rate (files modified per commit)
- Contributor count over time
- First-time vs. repeat contributors
- Fork and branch patterns
- Tag/release frequency
```

**Analysis Questions:**
- When does commit frequency stabilize?
- When do external contributors first appear?
- What triggers major refactoring commits?
- How does release cadence change over time?

#### Code Evolution Patterns
```
Metrics:
- Lines of code growth rate
- File count and organization changes
- Directory structure evolution
- Language/framework changes
- Dependency additions/removals
- Test coverage over time
```

**Analysis Questions:**
- When does architecture become stable?
- When does test coverage reach "good enough"?
- What triggers major reorganizations?
- How does dependency count evolve?

---

### 2. Documentation Analysis

#### README Evolution
Track changes to README.md over time:
```
Elements to Track:
- Length/complexity growth
- Feature list changes
- Installation instruction evolution
- Example code additions
- Badge additions (CI, coverage, version)
- Positioning/tagline changes
- Comparison to alternatives
- Sponsor/funding information
```

**Analysis Questions:**
- When does README grow most rapidly?
- When does positioning solidify?
- When do comparisons to alternatives appear?
- How do feature claims evolve?

#### Documentation Structure
```
Milestones to Identify:
- First dedicated docs site
- API reference creation
- Tutorial/guide additions
- Architecture documentation
- Contribution guidelines
- Code of conduct
- Migration guides
- Changelog formalization
```

**Analysis Questions:**
- What documentation comes first?
- When does docs structure stabilize?
- What triggers dedicated docs sites?
- How detailed should early docs be?

---

### 3. Community & Governance Analysis

#### Issue Patterns
```
Metrics:
- Issue creation rate
- Issue response time
- Issue close rate
- Bug vs. feature vs. question ratios
- Issue template introduction
- Label/triage system development
```

**Analysis Questions:**
- When do maintainers get overwhelmed?
- When are issue templates introduced?
- How does bug/feature ratio change?
- When does community start self-helping?

#### Pull Request Patterns
```
Metrics:
- PR submission rate
- External vs. core contributor PRs
- PR size distribution
- Review time
- Approval processes
- CI/CD integration
- PR template introduction
```

**Analysis Questions:**
- When do first external PRs arrive?
- When does review process formalize?
- How does PR quality gate change?
- When is automation introduced?

#### Governance Evolution
```
Milestones:
- CONTRIBUTING.md creation
- CODE_OF_CONDUCT.md addition
- GOVERNANCE.md establishment
- Core team formalization
- Decision-making process documentation
- RFC/proposal process
- Maintainer guidelines
```

**Analysis Questions:**
- When is governance needed?
- What triggers formalization?
- How does decision-making evolve?
- When do RFCs become necessary?

---

### 4. Technical Architecture Analysis

#### Code Quality Gates
```
Milestones to Track:
- First test addition
- CI setup
- Linting/formatting setup
- Type checking introduction
- Code coverage tracking
- Performance benchmarking
- Security scanning
- Dependency updates (Dependabot, Renovate)
```

**Analysis Questions:**
- What quality gates come first?
- When does CI become comprehensive?
- How strict are quality requirements early on?
- When does performance become a focus?

#### Architecture Patterns
```
Elements to Analyze:
- Monolith vs. modular structure
- Plugin/extension system
- Configuration approach
- Error handling patterns
- Logging/debugging capabilities
- Performance optimization points
- Breaking change frequency
```

**Analysis Questions:**
- When does architecture stabilize?
- When are plugin systems added?
- What triggers major refactors?
- How are breaking changes managed?

#### API Surface Evolution
```
Metrics:
- Public API size growth
- API deprecation patterns
- Version stability (semver adherence)
- Configuration complexity
- Default vs. explicit options
```

**Analysis Questions:**
- How fast does API grow?
- When does API stabilize?
- How are breaking changes handled?
- When do defaults become opinionated?

---

### 5. Adoption & Success Metrics

#### Popularity Indicators
```
Metrics:
- GitHub stars over time
- NPM downloads (if applicable)
- Google Trends interest
- Stack Overflow questions
- Twitter/social mentions
- Job postings mentioning tool
```

**Analysis Questions:**
- What causes growth inflections?
- How long until critical mass?
- What marketing events matter?
- When does organic growth take over?

#### Ecosystem Development
```
Milestones:
- First third-party plugin
- First blog post/tutorial (external)
- First integration by other tools
- First conference talk
- First book/course
- Community packages/extensions
```

**Analysis Questions:**
- When does ecosystem emerge?
- What enables ecosystem growth?
- How important is early ecosystem?
- What integration patterns succeed?

---

## Data Collection Methods

### Automated Analysis Tools

#### Git History Analysis
```bash
# Commit frequency over time
git log --format='%ai' | cut -d' ' -f1 | uniq -c

# Contributor growth
git shortlog -sn --all

# File churn
git log --name-only --pretty=format: | sort | uniq -c | sort -nr

# Lines of code over time
git log --reverse --format='%H %ai' | while read hash date; do
  git checkout $hash 2>/dev/null
  echo "$date,$(find . -name '*.ts' | xargs wc -l | tail -1)"
done
```

#### Documentation Evolution
```bash
# README changes over time
git log -p README.md | grep '^+' | wc -l

# Documentation commits
git log --all --pretty='%ai %s' -- docs/

# File structure changes
git log --name-status --diff-filter=A -- docs/
```

#### Issue/PR Analysis
```
Using GitHub API:
- /repos/:owner/:repo/issues
- /repos/:owner/:repo/pulls
- /repos/:owner/:repo/events

Track:
- Creation dates
- Close dates
- Labels
- Participants
- Comments count
```

### Manual Analysis Activities

#### Code Reviews
For each project, manually review:
1. **Initial commit**: What did v0.0.1 look like?
2. **First release**: What made it "releasable"?
3. **Major versions**: What changed in 1.0, 2.0, etc.?
4. **Key refactors**: Identify and study major rewrites
5. **API evolution**: How did the public API change?

#### Documentation Reviews
1. **README progression**: How did messaging evolve?
2. **Docs structure**: When did organization solidify?
3. **Tutorial quality**: How deep were early tutorials?
4. **Migration guides**: How were breaking changes handled?

#### Community Interaction
1. **Key issues**: Read influential feature requests/bugs
2. **RFCs**: Study major decision discussions
3. **Release notes**: Analyze communication patterns
4. **Blog posts**: Review official announcements

---

## Stage Detection Framework

### Indicators Matrix

| Indicator | Stage 0 | Stage 1 | Stage 2 | Stage 3 | Stage 4 | Stage 5 |
|-----------|---------|---------|---------|---------|---------|---------|
| **Test Coverage** | None | Basic happy path | Edge cases | Comprehensive | + E2E | + Perf |
| **Documentation** | README only | + Examples | + Troubleshoot | + API docs | + Guides | + Best practices |
| **Contributors** | Solo/small team | First external | Small community | Regular contributors | Established team | Governance |
| **CI/CD** | None | Basic CI | + Linting | + Coverage | + Perf | + Release automation |
| **API Stability** | Volatile | Frequent changes | Stabilizing | Stable | Versioned | Backward compat |
| **Issue Response** | Ad-hoc | Same day | Triaged | Systematic | SLA-like | Process-driven |
| **Releases** | Ad-hoc | When done | Regular | Scheduled | Planned | Coordinated |
| **Architecture** | Experimental | Functional | Refactored | Modular | Extensible | Platform |

### Automated Stage Detection

```python
def detect_stage(project):
    score = 0

    # File existence checks
    if exists('tests/'): score += 10
    if exists('docs/'): score += 10
    if exists('CONTRIBUTING.md'): score += 15
    if exists('.github/workflows'): score += 10

    # Git metrics
    if commit_count > 100: score += 5
    if commit_count > 500: score += 10
    if contributor_count > 5: score += 10
    if contributor_count > 20: score += 15

    # Documentation
    if readme_length > 1000: score += 5
    if readme_length > 5000: score += 10
    if has_dedicated_docs: score += 15

    # Quality gates
    if has_ci: score += 10
    if has_tests: score += 10
    if test_coverage > 70: score += 15

    # Community
    if issue_count > 50: score += 5
    if pr_count > 20: score += 10

    # Stability
    if major_version >= 1: score += 20
    if breaking_changes_last_6mo == 0: score += 15

    # Map score to stage
    if score < 20: return 0
    if score < 40: return 1
    if score < 60: return 2
    if score < 80: return 3
    if score < 100: return 4
    return 5
```

---

## Pattern Extraction Process

### Step 1: Chronological Mapping
For each project, create a timeline:
```
T0: First commit (date, features, LOC)
T1: First external user (how identified?)
T2: First external contributor
T3: First breaking change
T4: v1.0.0 release
T5: Documentation site launch
...
```

### Step 2: Cross-Project Comparison
Compare timelines across projects:
```
Pattern: "When does testing become comprehensive?"
- React: Month 6
- Vue: Month 3
- Vite: Month 1
- Bun: Month 2
Average: ~3 months
Variance: High
```

### Step 3: Pattern Clustering
Group similar evolution patterns:
```
Cluster A: "Fast to stability"
- Vite, Astro, Hono
- Characteristics: Experienced authors, clear vision, modern tools

Cluster B: "Organic growth"
- Vue, Prisma
- Characteristics: Solo start, community-driven, iterative

Cluster C: "Corporate-backed"
- TypeScript, Playwright, Supabase
- Characteristics: Resources, structure, polish
```

### Step 4: Stage Definition Refinement
Based on patterns, refine stage definitions:
```
Stage X should include:
- Technical: [patterns found in 70%+ of projects]
- Documentation: [common docs at this stage]
- Community: [typical interaction patterns]
- Quality: [quality gates present]
```

---

## AI Guidance Extraction

### For Each Stage, Define:

#### Focus Priorities
```
Stage 2 example:
PRIMARY: User feedback incorporation, edge case handling
SECONDARY: Basic docs, error messages
AVOID: Premature optimization, extensive architecture
```

#### Code Suggestions
```
Stage 2 example:
SUGGEST:
- Add validation for user inputs
- Improve error messages
- Write tests for reported bugs
- Document common use cases

DON'T SUGGEST:
- Large-scale refactoring
- Performance optimization
- Plugin systems
- Complex abstraction layers
```

#### Documentation Guidance
```
Stage 2 example:
NEEDED:
- Installation instructions
- Basic usage examples
- Common errors/troubleshooting
- How to report issues

NOT YET:
- Architecture deep-dives
- API reference (unless API is stable)
- Migration guides
- Best practices
```

#### Quality Standards
```
Stage 2 example:
REQUIRED:
- Tests for happy path
- Basic CI
- README with examples

NICE TO HAVE:
- Comprehensive test coverage
- Linting/formatting
- Documentation site

TOO EARLY:
- Performance benchmarks
- Security audits
- Release automation
```

---

## Validation Methods

### Historical Validation
Test framework against project histories:
```
For each project:
1. Apply detection algorithm at various points in history
2. Compare detected stage to manual assessment
3. Measure accuracy
4. Identify false positives/negatives
5. Refine indicators
```

### Expert Validation
Interview/survey experienced maintainers:
```
Questions:
- Do these stages resonate with your experience?
- Are priorities accurate for each stage?
- What's missing from our framework?
- Would this have helped your project?
```

### Practical Testing
Use framework in real scenarios:
```
Test cases:
1. Apply to new greenfield project
2. Apply to mid-stage project seeking guidance
3. Apply to mature project considering v2
4. Measure usefulness of guidance
5. Collect feedback on accuracy
```

---

## Deliverable Structure

### Research Report Format
```
1. Executive Summary
2. Methodology
3. Project Analyses (individual)
4. Cross-Project Patterns
5. Stage Definitions
6. Transition Indicators
7. AI Guidance Framework
8. Validation Results
9. Limitations & Future Work
10. Appendices
```

### AI Steering Dock Format
```
For each stage:
1. Stage Name & Description
2. Duration Benchmarks
3. Entry Criteria
4. Focus Priorities (ranked)
5. Technical Guidelines
6. Documentation Guidelines
7. Quality Standards
8. Common Pitfalls
9. Exit Criteria
10. Example Projects at This Stage
```

---

## Timeline & Milestones

### Week-by-Week Breakdown

**Weeks 1-2: Setup & Tools**
- Finalize project list
- Build/configure analysis tools
- Create data collection templates
- Set up project tracking

**Weeks 3-6: Data Collection**
- Automated git analysis for all projects
- Manual code review (Tier 1 projects)
- Documentation evolution tracking
- Community metrics gathering

**Weeks 7-8: Pattern Analysis**
- Timeline comparison
- Pattern clustering
- Stage definition
- Indicator identification

**Weeks 9-10: Framework Development**
- Write stage definitions
- Create AI guidance
- Build detection logic
- Develop validation tests

**Weeks 11-12: Validation & Documentation**
- Historical validation
- Expert review
- Documentation
- Final report

---

## Tools & Resources Needed

### Analysis Tools
- **Git history**: Custom scripts, git-stats
- **GitHub API**: Octokit, REST API
- **Visualization**: D3.js, Chart.js
- **NPM stats**: npm-stat, download-counts
- **Code metrics**: cloc, SonarQube

### Infrastructure
- Database for metrics storage (SQLite)
- Scripts for automated collection
- Dashboard for visualization
- Documentation site generator

### Team Resources
- Git/GitHub expertise
- Data analysis skills
- Open source experience
- Technical writing

---

## Risk Mitigation

### Potential Issues

**Issue: Projects too diverse to find patterns**
- Mitigation: Start with similar projects, expand gradually
- Mitigation: Allow for project-type variations in framework

**Issue: Historical data insufficient**
- Mitigation: Focus on well-documented projects
- Mitigation: Supplement with maintainer interviews

**Issue: Stages not distinct enough**
- Mitigation: Use fuzzy boundaries, overlapping indicators
- Mitigation: Focus on primary characteristics, not rigid definitions

**Issue: Framework not actionable for AI**
- Mitigation: Test with AI tools throughout development
- Mitigation: Focus on clear, boolean indicators where possible

---

## Success Metrics

- **Coverage**: Framework applies to 90%+ of analyzed projects
- **Accuracy**: Stage detection 80%+ accurate vs. manual assessment
- **Usefulness**: Maintainers rate guidance as helpful (>4/5)
- **Implementable**: AI tools can integrate framework within 2 weeks
- **Comprehensive**: All major evolution aspects covered

---

## Related Documents

- `ARCH-ai-steering-dock-proposal-001`: Main proposal
- `ARCH-ai-steering-dock-projects-002`: Project selection
- `DEV-*`: Implementation tasks (to be created)

---

## Appendix: Example Analysis Template

### Project: [Name]
**Repository**: owner/repo
**Analysis Date**: YYYY-MM-DD
**Analyzer**: Name

#### Timeline
- First commit: YYYY-MM-DD
- First release: YYYY-MM-DD (version)
- v1.0.0: YYYY-MM-DD
- Current: YYYY-MM-DD (version)

#### Metrics
- Total commits: N
- Contributors: N
- Stars: N
- Forks: N
- Open issues: N
- Closed issues: N

#### Key Milestones
1. [Date] [Event description]
2. [Date] [Event description]

#### Stage Assessment
Current stage: X
Evidence: [Indicators present]

#### Patterns Observed
- [Pattern 1]
- [Pattern 2]

#### Unique Characteristics
- [What makes this project different]

#### Lessons Learned
- [Key takeaway 1]
- [Key takeaway 2]

#### Notes
[Additional observations]
