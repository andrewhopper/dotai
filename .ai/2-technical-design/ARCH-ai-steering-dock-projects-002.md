---
id: ARCH-ai-steering-dock-projects-002
created: 2025-11-02
parent: ARCH-ai-steering-dock-proposal-001
type: research-specification
status: draft
---

# AI Steering Dock: Target Projects for Research
## Detailed Project Selection with Rationale

This document provides specific project recommendations for the AI Steering Dock research initiative, with detailed rationale for each selection.

---

## Selection Criteria Summary

Each project is evaluated on:
- **Observability**: Rich commit history, good documentation, visible evolution
- **Diversity**: Different domains, team sizes, and adoption patterns
- **Success**: Demonstrated product-market fit and community adoption
- **Accessibility**: Open development process, public discussions
- **Representativeness**: Typical patterns vs. unique approaches

---

## Recommended Projects by Category

### Category A: Very Mature (Baseline Reference)
*Purpose: Understand full lifecycle, identify long-term patterns*

#### 1. **React**
- **Repository**: facebook/react
- **Age**: 10+ years (2013)
- **Stars**: 200k+
- **Rationale**:
  - Complete evolution from library to ecosystem
  - Multiple major paradigm shifts (classes → hooks → concurrent)
  - Excellent documentation of architectural decisions
  - Shows how to manage breaking changes at scale
- **Key Lessons**: API evolution, ecosystem management, community governance

#### 2. **Vue.js**
- **Repository**: vuejs/core
- **Age**: 8+ years (2014)
- **Stars**: 45k+
- **Rationale**:
  - Solo creator to large community transition
  - Gradual feature addition vs. React's major shifts
  - Strong focus on developer experience from day one
  - Complete rewrite (Vue 2 → Vue 3) case study
- **Key Lessons**: Progressive enhancement, rewrite strategies, solo → team transition

#### 3. **TypeScript**
- **Repository**: microsoft/TypeScript
- **Age**: 11+ years (2012)
- **Stars**: 95k+
- **Rationale**:
  - Language design evolution
  - Corporate backing but community-driven
  - Incremental adoption strategy
  - Backward compatibility management
- **Key Lessons**: Language design, tooling ecosystem, gradual adoption patterns

#### 4. **Express.js**
- **Repository**: expressjs/express
- **Age**: 13+ years (2010)
- **Stars**: 63k+
- **Rationale**:
  - Long-term stability and maturity
  - Minimal changes while ecosystem evolved around it
  - Shows "staying small" strategy
  - Governance transitions (TJ → StrongLoop → Node.js Foundation)
- **Key Lessons**: Stability vs. innovation, governance evolution, ecosystem delegation

---

### Category B: Mature Stage (3-5 years)
*Purpose: Understand growth to maturity transition*

#### 5. **Vite**
- **Repository**: vitejs/vite
- **Age**: 4+ years (2020)
- **Stars**: 60k+
- **Rationale**:
  - Rapid growth due to solving real pain points
  - Strong ecosystem strategy from early on
  - Integration with existing tools
  - Clear performance focus
- **Key Lessons**: Fast adoption patterns, ecosystem strategy, developer experience

#### 6. **Prisma**
- **Repository**: prisma/prisma
- **Age**: 5+ years (2019 as Prisma 2)
- **Stars**: 35k+
- **Rationale**:
  - Major pivot and rewrite in history
  - Strong TypeScript integration
  - Developer experience as primary differentiator
  - Commercial backing (Prisma Data Platform)
- **Key Lessons**: Pivoting, DX-first approach, open-core model

#### 7. **Supabase**
- **Repository**: supabase/supabase
- **Age**: 4+ years (2020)
- **Stars**: 65k+
- **Rationale**:
  - Platform/multi-repo project
  - Open source alternative strategy
  - Fast growth with VC funding
  - Complex architecture coordination
- **Key Lessons**: Platform development, multi-repo management, commercial OSS

#### 8. **tRPC**
- **Repository**: trpc/trpc
- **Age**: 3+ years (2021)
- **Stars**: 30k+
- **Rationale**:
  - Novel approach to existing problem (APIs)
  - Academic concept to production tool
  - Type safety as core value prop
  - Ecosystem integration strategy
- **Key Lessons**: Novel patterns, type-driven development, ecosystem positioning

#### 9. **Playwright**
- **Repository**: microsoft/playwright
- **Age**: 4+ years (2020)
- **Stars**: 60k+
- **Rationale**:
  - Built by experienced team (ex-Puppeteer)
  - Corporate backing but community-driven
  - Comprehensive testing approach
  - Strong documentation from start
- **Key Lessons**: Building on experience, corporate OSS, comprehensive solutions

---

### Category C: Growth Stage (1-3 years)
*Purpose: Understand scaling and stabilization challenges*

#### 10. **Astro**
- **Repository**: withastro/astro
- **Age**: 3+ years (2021)
- **Stars**: 40k+
- **Rationale**:
  - Content-focused framework
  - Strong architectural vision (islands)
  - Active development and iteration
  - Balancing flexibility and opinions
- **Key Lessons**: Architectural vision, rapid iteration, content-first approach

#### 11. **Bun**
- **Repository**: oven-sh/bun
- **Age**: 2+ years (2022)
- **Stars**: 70k+
- **Rationale**:
  - Ambitious scope (runtime + bundler + test + package manager)
  - Performance as primary value prop
  - Complex implementation (Zig + JavaScriptCore)
  - High expectations management
- **Key Lessons**: Ambitious projects, performance focus, hype management

#### 12. **Biome**
- **Repository**: biomejs/biome
- **Age**: 2+ years (2022, fork of Rome)
- **Rationale**:
  - Community fork/continuation
  - Rust-based JavaScript tooling
  - Replacing multiple tools (ESLint + Prettier)
  - Performance and simplicity focus
- **Key Lessons**: Forks/continuations, all-in-one tools, Rust tooling trend

#### 13. **Drizzle ORM**
- **Repository**: drizzle-team/drizzle-orm
- **Age**: 2+ years (2022)
- **Stars**: 20k+
- **Rationale**:
  - TypeScript-first ORM
  - Lightweight alternative approach
  - SQL-like API design
  - Rapid feature development
- **Key Lessons**: Alternative positioning, API design philosophy, rapid growth

#### 14. **Effect-TS**
- **Repository**: Effect-TS/effect
- **Age**: 2+ years (active development)
- **Stars**: 5k+
- **Rationale**:
  - Functional programming paradigm
  - Complex/advanced concepts
  - Educational challenge
  - Niche but dedicated community
- **Key Lessons**: Advanced concepts, community education, paradigm shifts

---

### Category D: Early Stage (< 2 years)
*Purpose: Understand initial development and validation*

#### 15. **Hono**
- **Repository**: honojs/hono
- **Age**: 1-2 years (2021-2022)
- **Stars**: 15k+
- **Rationale**:
  - Fast-growing web framework
  - Edge/modern runtime focus
  - Simple and performant
  - International developer (Japanese)
- **Key Lessons**: Modern runtime patterns, simplicity, international OSS

#### 16. **Oxc**
- **Repository**: oxc-project/oxc
- **Age**: 1-2 years (2023)
- **Stars**: 10k+
- **Rationale**:
  - Next-gen JavaScript tooling in Rust
  - Parser, linter, formatter, minifier
  - Performance-first approach
  - Ambitious scope
- **Key Lessons**: Greenfield rewrites, Rust tooling, performance benchmarking

#### 17. **Tempo**
- **Repository**: formkit/tempo
- **Age**: < 1 year (2024)
- **Stars**: 1k+
- **Rationale**:
  - Modern date/time library
  - TypeScript-first design
  - Replacing established libraries (date-fns, day.js)
  - Clean slate approach
- **Key Lessons**: Modern library patterns, replacing incumbents, API design

#### 18. **Nuqs**
- **Repository**: 47ng/nuqs
- **Age**: 1-2 years (active growth)
- **Stars**: 3k+
- **Rationale**:
  - Focused, single-purpose library
  - Type-safe URL search params
  - React Server Components compatible
  - Solving specific pain point
- **Key Lessons**: Focused libraries, RSC patterns, specific problem solving

---

## Alternative/Backup Projects

In case primary selections are insufficient, consider:

### Additional Mature Projects
- **Webpack** (webpack/webpack): Bundler evolution, plugin ecosystem
- **Next.js** (vercel/next.js): Framework evolution, commercial backing
- **Nest.js** (nestjs/nest): Backend framework, enterprise focus
- **Electron** (electron/electron): Desktop apps, long-term maintenance

### Additional Growth Projects
- **Solid.js** (solidjs/solid): Alternative framework, reactive primitives
- **Fresh** (denoland/fresh): Deno-first framework, island architecture
- **Nitro** (unjs/nitro): Server toolkit, framework-agnostic
- **Turborepo** (vercel/turborepo): Monorepo tooling, acquisition story

### Additional Early Projects
- **Rspack** (web-infra-dev/rspack): Rust bundler, webpack compatible
- **Ark Type** (arktypeio/arktype): Runtime type validation
- **Oslo** (pilcrowonpaper/oslo): Auth utilities
- **TanStack Router** (tanstack/router): Type-safe routing

---

## Research Prioritization

### Tier 1: Must Analyze (12 projects)
Essential for comprehensive understanding:
1. React
2. Vue.js
3. TypeScript
4. Vite
5. Prisma
6. tRPC
7. Astro
8. Bun
9. Biome
10. Hono
11. Oxc
12. Playwright

### Tier 2: Should Analyze (6 projects)
Important for pattern validation:
13. Supabase
14. Drizzle
15. Effect-TS
16. Express
17. Tempo
18. Solid.js

### Tier 3: Nice to Have (4+ projects)
Additional validation and edge cases:
- Fresh, Nitro, Turborepo, Nuqs, etc.

---

## Data Collection Template

For each project, collect:

### Basic Metrics
- Creation date
- Current stars/contributors
- Release frequency
- Breaking change frequency
- Documentation page count

### Key Milestones
- First commit
- First release
- First external contributor
- First 1k stars
- First breaking change
- Major version releases

### Evolution Markers
- When did testing become comprehensive?
- When was CI/CD established?
- When did documentation structure solidify?
- When did governance model formalize?
- When did ecosystem/plugins emerge?

### Architecture Analysis
- Initial architecture pattern
- Major refactoring points
- Performance optimization timing
- API stability periods

---

## Analysis Tools & Scripts

To be developed:
- Git history analyzer
- Documentation evolution tracker
- Contributor pattern analyzer
- Release timeline visualizer
- Architecture change detector

---

## Expected Insights

From this project selection, we expect to learn:

1. **Stage Duration**: How long projects typically spend in each stage
2. **Transition Triggers**: What causes movement between stages
3. **Success Patterns**: Common traits of successful projects at each stage
4. **Failure Patterns**: Anti-patterns that slow or derail projects
5. **Domain Differences**: How libraries vs. frameworks vs. platforms differ
6. **Modern vs. Legacy**: How recent projects differ from older ones
7. **Team Size Impact**: How solo vs. team vs. corporate projects evolve differently
8. **Funding Impact**: How funding affects evolution speed and quality

---

## Next Steps

1. Validate project selection with stakeholders
2. Create data collection scripts
3. Set up project tracking/notes system
4. Begin Tier 1 project analysis
5. Document initial findings
6. Adjust methodology based on early learnings

---

## Related Documents

- `ARCH-ai-steering-dock-proposal-001`: Main research proposal
- `DEV-*`: Implementation tasks (to be created)
- `QA-*`: Analysis reports (to be created)
