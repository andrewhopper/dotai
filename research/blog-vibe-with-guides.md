# Vibe with Guides: A New Way to Build Software with AI

*How to get the speed of "vibe coding" without the chaos, and the quality of spec-driven development without the slowdown*

---

## The Developer's Dilemma

You've probably experienced both sides of AI-assisted development. On one side, there's the exhilaration of **vibe coding**—telling Claude or Cursor to "build a user dashboard" and watching it materialize in minutes. It's intoxicating. You're shipping features at 10x speed, prototyping ideas that would've taken weeks in days.

But then reality hits. Your AI agent refactored the authentication middleware to use a different pattern than your payment middleware. Security wasn't considered because you were moving fast. Tests? Maybe 20% coverage if you're lucky. The codebase is inconsistent, and onboarding a new team member (or AI agent) is a nightmare because there's no clear architectural vision.

On the other side is **spec-driven development**—writing comprehensive technical specifications before any code gets written. The architecture is pristine. Security is baked in. Every decision is documented. But by the time you've finished the 50-page spec, the market has moved, your competitor shipped, and your team is exhausted from meetings about meetings.

There has to be a better way.

## Introducing Bounded Iterative Vibing

What if you could **vibe at machine speed, but stay within the bounds**? What if AI agents had the freedom to iterate rapidly, but were guided by architectural guardrails that prevented chaos?

This is the core insight behind what we're calling **Bounded Iterative Vibing** (or **Vibe with Guides** if you prefer the friendlier name). It's a development methodology specifically designed for the AI-native era—one that solves 25+ fundamental problems with both traditional vibe coding and spec-driven approaches.

The framework rests on three pillars:

1. **Architectural Guardrails** - ADRs and Locks that guide without restricting
2. **Intelligence Scaling** - Context refresh, multi-agent review, and LLM-as-Judge
3. **Adaptive Rigor** - Maturity-aware quality gates that tighten as projects evolve

Let's dive into each.

---

## Pillar 1: Architectural Guardrails

The first problem with vibe coding is **architectural drift**. When you have multiple AI agents (or even one agent across multiple sessions), they'll solve the same problem in different ways unless you give them clear guidance.

### Architecture Decision Records (ADRs)

Think of ADRs as "house rules" for your AI agents. Instead of prescriptive specifications, they're **steering input** that guides the hundreds of micro-decisions an AI makes during implementation.

For example:
```markdown
# ADR-001: API Error Handling

Status: Accepted
Date: 2025-01-15

## Decision
All API endpoints must use RFC 9457 Problem Details for error responses.

## Context
We need consistent error handling across microservices.

## Consequences
- ✅ Clients get predictable error formats
- ✅ New AI agents know the "one way" to handle errors
- ⚠️ Must refactor legacy endpoints gradually
```

When your AI agent builds a new API endpoint, it reads ADR-001 and automatically formats errors correctly. No need for a 50-page spec—just clear architectural guidance.

### Lock Management

The second guardrail is **locks**—protecting critical, stable code from well-intentioned but dangerous AI modifications.

Imagine you have a battle-tested payment processing module. It's been in production for two years, handling millions of transactions. The last thing you want is an AI agent "helpfully" refactoring it to use async/await instead of callbacks.

Lock files solve this:
```yaml
# src/payments/.ailock.yaml
lock_type: read_only
reason: "Battle-tested payment processor - DO NOT MODIFY"
locked_files:
  - stripe-integration.ts
  - payment-validator.ts
allowed_operations:
  - read
  - test
requires_approval_from:
  - payments-team-lead
```

AI agents can **read** the code (to understand patterns), but they can't modify it without explicit approval. This prevents architectural chaos and maintains system stability.

---

## Pillar 2: Intelligence Scaling

Traditional code review is a bottleneck. You write code, wait for a human to review it, fix issues, repeat. With AI development, you're shipping too fast for this to scale.

### Context Refresh (Context7)

One massive problem with LLMs is **knowledge cutoff**. Your AI agent doesn't know about React 19 features, Next.js 15 changes, or Tailwind v4 syntax—unless you solve this explicitly.

**Context7** (or similar MCP servers) fetches the latest documentation **after** the training cutoff:
- Latest API docs for your tech stack
- Recent breaking changes
- New best practices
- Updated security advisories

Before your AI starts implementing, it refreshes its knowledge. No more "I'm using React 18 patterns because that's what I was trained on."

### Multi-Agent Review

Instead of waiting for human review, you run **parallel agent validation**:
- **Architect Agent**: Validates ADR compliance
- **Security Agent**: Checks OWASP Top 10, auth patterns
- **Performance Agent**: Reviews N+1 queries, memory leaks
- **Testing Agent**: Ensures adequate test coverage
- **Lock Coordinator**: Validates no protected files were modified

This **catches 80% of issues before human review**. The human reviewer focuses on product decisions and architectural vision—not nitpicking linting errors or finding SQL injection vulnerabilities.

### LLM-as-Judge for Visual Testing

How do you validate that a UI "looks good" or "feels responsive"? Traditional testing can't capture this.

**LLM-as-Judge** uses browser automation (via Puppeteer MCP) to:
1. Launch your app in a real browser
2. Take screenshots at different viewport sizes
3. Have an LLM evaluate: "Does this follow our design system? Are color contrasts accessible? Is the layout responsive?"

Minor issues get auto-fixed. Major issues get flagged for human review.

---

## Pillar 3: Adaptive Rigor

Here's the key insight: **not all code requires the same rigor**.

A quick POC to validate product-market fit needs **0% test coverage** and **maximum speed**. A mission-critical payment system needs **95% coverage** and **exhaustive security review**.

### Maturity Stages

The framework defines **12 granular maturity levels**:

| Stage | Test Coverage | Security Review | Documentation | ADR Enforcement |
|-------|--------------|-----------------|---------------|-----------------|
| **prototype-alpha** | 0% | Skip | None | None |
| **prototype-beta** | 5% | Basic | Minimal | Optional |
| **prototype-rc** | 15% | Standard | Basic | Recommended |
| **mvp-alpha** | 25% | Standard | Standard | Required |
| **mvp-beta** | 35% | Enhanced | Standard | Required |
| **mvp-rc** | 50% | Enhanced | Good | Strict |
| **production-alpha** | 60% | Strict | Good | Strict |
| **production-beta** | 75% | Strict | Comprehensive | Strict |
| **production-rc** | 90% | Comprehensive | Comprehensive | Strict |
| **mission-critical-alpha** | 90% | Comprehensive | Comprehensive | Absolute |
| **mission-critical-beta** | 93% | Exhaustive | Exhaustive | Absolute |
| **mission-critical-rc** | 95% | Exhaustive | Exhaustive | Absolute |

You configure this in `.ai-context.yaml`:
```yaml
maturity_stage: mvp-beta
rigor:
  test_coverage_minimum: 35
  security_review_required: true
  agent_review_depth: enhanced
velocity_priority: high
quality_priority: good_enough_for_users
```

As your project matures from POC → MVP → Production → Mission Critical, **quality gates automatically tighten**. You get the speed you need early, and the safety you need later.

### Technical Constraints

Another killer feature: explicitly declaring **technical constraints**:
```yaml
technical_constraints:
  required:
    database: postgres      # We have a Postgres license
    language: python        # Python 3.9 (team expertise)
    deployment: aws-govcloud

  infrastructure:
    max_memory_mb: 512      # Budget constraints
    max_disk_gb: 10

  banned:
    - mongodb               # Licensing issues
    - redis                 # Not approved by IT
```

Now your AI agent **knows upfront**: "Don't suggest MongoDB or Redis. Don't write Python 3.11 code. Stay within 512MB RAM."

This prevents wasted implementation cycles where the agent builds something technically impressive but operationally impossible.

---

## Real-World Example

Let's see this in action. You're building a new feature: "User Analytics Dashboard."

### Phase 1: Issue Ingestion (10 minutes)
Jira ticket comes in. System extracts:
- User story
- Acceptance criteria
- Business context (maturity stage: mvp-beta)

### Phase 2: Tech Spec Generation (30 minutes)
Claude reads:
- ADRs (we use Chart.js for visualizations, not D3)
- Locks (can read `/analytics-api` but can't modify)
- Context (fetches latest Chart.js 4.x docs)
- Constraints (must run in 512MB RAM)

Generates tech spec aligned with existing architecture.

### Phase 3: Multi-Agent Review (15 minutes)
5 specialized agents validate:
- ✅ Architect: Follows ADR-003 (Chart.js)
- ✅ Security: No SQL injection, proper auth checks
- ✅ Performance: Pagination implemented, no N+1 queries
- ⚠️ Testing: 32% coverage (needs 35% for mvp-beta)
- ✅ Lock Coordinator: No protected files modified

Testing agent bumps coverage to 37%. All green.

### Phase 4: Human Review (10 minutes)
Human reviewer sees:
- All ADR compliance validated ✅
- Security cleared ✅
- Performance cleared ✅
- Tests passing ✅

Focuses on: "Does this solve the user's problem?" Approves in 10 minutes instead of 2 hours.

### Phase 5: Implementation (2 hours)
Parallel agents implement:
- Frontend dashboard (Agent A)
- Backend API (Agent B)
- Database migrations (Agent C)

All stay within architectural bounds. No conflicts. No drift.

### Result
Feature ships in **3 hours** with **mvp-beta quality** (35% test coverage, security validated, ADR-compliant). Traditional approach: 3 days. Pure vibe coding: 2 hours but with 15% test coverage and architectural inconsistencies.

---

## The 25 Problems Solved

This approach solves:

**Vibe Coding Problems:**
1. Architectural drift across sessions
2. Inconsistent implementations
3. No security-by-design
4. Insufficient test coverage
5. No business context awareness
6. No technical constraints enforcement
7. LLM knowledge cutoff
8. Critical code gets refactored
9. No design system compliance
10. Debugging nightmares
11. Vendor lock-in to one AI tool
12. Context window limitations
13. Documentation rot

**Spec-Driven Problems:**
1. Slow iteration cycles
2. Upfront perfection paralysis
3. Specs become outdated
4. Bottlenecked on human review
5. No adaptive rigor
6. Bureaucracy overhead
7. Missed market windows
8. Inflexible to change
9. Human review fatigue
10. No business context in process
11. No technical constraints in specs
12. Specification becomes the product (not the code)

---

## Getting Started

Want to try this approach?

1. **Start with ADRs**: Document your 3-5 most important architectural decisions
2. **Add Locks**: Protect your most critical 10-20 files
3. **Define Maturity**: Set your current stage (prototype? MVP? production?)
4. **Configure Constraints**: List required tech, infrastructure limits, banned technologies
5. **Try Multi-Agent Review**: Set up parallel validation before shipping

You don't need to adopt everything at once. Start with ADRs and locks. Add maturity stages when you're ready to scale.

---

## The Future of Development

AI-assisted development isn't going away. The question is: **will we build with chaos or with structure?**

Vibe coding gives you speed but no safety. Spec-driven gives you safety but no speed. **Bounded Iterative Vibing** (or Vibe with Guides, or Agile Vibe Coding—pick your favorite name) gives you **both**.

You vibe at machine speed. You stay within the bounds. Your AI agents have the freedom to iterate rapidly, guided by architectural guardrails that prevent chaos. Quality gates tighten automatically as projects mature from prototype to production.

Welcome to the AI-native era of software development.

---

**Want to learn more?** Check out the full research document with implementation details, MCP server configurations, and code examples: [AI-Native SDLC Research](./ai-native-sdlc.md)

**Have thoughts on the naming?** We're still exploring: Bounded Iterative Vibing (BIV), Vibe with Guides, Agile Vibe Coding (AVC), or Self-Refining Vibe Coding. See the full brainstorm: [Naming Variants](./naming-brainstorm.md)
