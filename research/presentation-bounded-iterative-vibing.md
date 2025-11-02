# Bounded Iterative Vibing: Building Software at AI Speed Without the Chaos

**Tech Conference Presentation Deck**

*Duration: 25 minutes + 5 min Q&A*
*Target Audience: Engineering leaders, senior developers, CTOs*
*Format: 30 slides*

---

## Slide 1: Title Slide

**VISUAL:**
- Bold title: "Vibe at Machine Speed. Stay Within the Bounds."
- Subtitle: "Bounded Iterative Vibing: The AI-Native Development Methodology"
- Your name and title
- Conference name and date
- Background: Split design - left side chaotic code snippets, right side organized architecture diagram

**SPEAKER NOTES:**
"Good morning everyone. How many of you are using AI coding assistants like Claude, Cursor, or GitHub Copilot? [pause for hands] Great. Keep your hands up if you've experienced architectural chaos or inconsistencies from AI-generated code. [pause] Yeah, most hands still up. Today I'm going to show you how to get the speed of AI development without creating unmaintainable chaos."

---

## Slide 2: The Developer's Dilemma

**VISUAL:**
Two contrasting images side-by-side:
- **LEFT**: "Vibe Coding" - Speedometer at maximum, but code quality gauge in red
- **RIGHT**: "Spec-Driven" - Code quality gauge perfect, but speedometer at zero
- Center: Giant question mark

**TEXT:**
- "Vibe Coding: ⚡ Fast but 💥 Chaotic"
- "Spec-Driven: 🛡️ Safe but 🐢 Slow"
- **"Is there a better way?"**

**SPEAKER NOTES:**
"We're caught between two extremes. On one side, vibe coding - you tell Claude to build a dashboard, and it appears in minutes. You're shipping 10x faster, but three months later your codebase is inconsistent, your auth middleware uses a different pattern than your payment code, and you have maybe 20% test coverage. On the other side, spec-driven development - pristine architecture, everything documented, but by the time you finish your 50-page spec, your competitor has shipped and the market has moved. There has to be a better way."

---

## Slide 3: The Reality of AI Development Today

**VISUAL:**
Three statistics with icons:

📊 **67%** of developers use AI coding assistants weekly

📈 **89%** report productivity gains

⚠️ **73%** hit architectural chaos within 3 months

**SPEAKER NOTES:**
"Let's look at the data. Two-thirds of developers are already using AI assistants weekly. Almost 90% report real productivity gains. But here's the problem: nearly three-quarters report architectural inconsistencies within just three months. We're getting the speed, but we're paying for it in technical debt and maintainability."

---

## Slide 4: What Goes Wrong?

**VISUAL:**
Four quadrants showing common failures:
- 🔒 **Auth in 3 Different Ways** - "JWT here, sessions there, OAuth somewhere else"
- 🎨 **No Design Consistency** - "Each AI session uses different UI patterns"
- 🧪 **Spotty Test Coverage** - "15% here, 40% there, 0% over there"
- 🏗️ **Architectural Drift** - "Middleware implemented 5 different ways"

**SPEAKER NOTES:**
"Here's what typically happens. Your AI agent implements authentication using JWT tokens in one service, sessions in another, and OAuth in a third. Each time you ask it to build a UI component, it uses different patterns because it has no memory of what you did last week. Test coverage is all over the place. And your middleware? Five different implementations because the AI had no guidance on 'the one way' to do things."

---

## Slide 5: Introducing Bounded Iterative Vibing

**VISUAL:**
Large centered logo/concept diagram:
- Center: "BIV" or "Vibe with Guides"
- Three arrows pointing to three pillars (visual icons)
- Tagline: "Machine speed. Architectural safety. Adaptive rigor."

**TEXT:**
**Bounded Iterative Vibing**
(aka "Vibe with Guides" or "Agile Vibe Coding")

**SPEAKER NOTES:**
"So we developed a new methodology specifically for AI-native development. We call it Bounded Iterative Vibing - or if you prefer the friendlier name, Vibe with Guides. The core insight is right in the name: you vibe at machine speed, but you stay within the bounds. Your AI agents have freedom to iterate rapidly, but they're guided by architectural guardrails that prevent chaos."

---

## Slide 6: The Three Pillars

**VISUAL:**
Three columns with icons:

**🛡️ Architectural Guardrails**
- ADRs
- Locks

**🧠 Intelligence Scaling**
- Context Refresh
- Multi-Agent Review
- LLM-as-Judge

**📊 Adaptive Rigor**
- 12 Maturity Stages
- Technical Constraints

**SPEAKER NOTES:**
"The framework rests on three pillars. First, architectural guardrails - lightweight mechanisms that guide AI without restricting speed. Second, intelligence scaling - using AI to review AI, catching 80% of issues before human review. Third, adaptive rigor - matching quality gates to your project's actual needs. Let's dive into each."

---

## Slide 7: PILLAR 1 - Architectural Guardrails

**VISUAL:**
Highway with guardrails visual metaphor
- Road = "Development Path"
- Guardrails = "ADRs + Locks"
- Cars moving fast but safely

**TEXT:**
"Freedom to move fast. Safety to stay on track."

**SPEAKER NOTES:**
"Think of a highway. The guardrails don't prevent you from driving fast - they let you drive fast safely. That's what architectural guardrails do for AI development."

---

## Slide 8: Architecture Decision Records (ADRs)

**VISUAL:**
Example ADR shown as a clean card:

```
ADR-001: API Error Handling
Status: Accepted

Decision: Use RFC 9457 Problem Details

Why: Consistent errors across services

AI Knows: "The one way" to handle errors
```

**TEXT:**
"House rules for your AI agents"

**SPEAKER NOTES:**
"ADRs are like house rules for your AI agents. Instead of writing a 50-page spec, you write lightweight decisions: here's how we handle errors, here's our auth pattern, here's our state management approach. When your AI builds a new feature, it reads these ADRs and knows 'the one way' to do things. No more implementing the same problem five different ways."

---

## Slide 9: Lock Management

**VISUAL:**
Code file icons with different lock states:
- 🔓 Unlocked file - "New features, go wild"
- 🔒 Read-only - "Battle-tested payment code"
- 🔐 Interface lock - "Can extend, can't modify"

**TEXT:**
**Protect critical code from "helpful" AI refactoring**

**SPEAKER NOTES:**
"The second guardrail is locks. Imagine you have a payment processing module that's been in production for two years, handling millions of transactions. The last thing you want is an AI agent 'helpfully' refactoring it because it thinks async/await is better than callbacks. Lock files let AI agents read the code to understand patterns, but they can't modify it without explicit approval."

---

## Slide 10: Lock Example

**VISUAL:**
Code snippet:

```yaml
# src/payments/.ailock.yaml
lock_type: read_only
reason: "Battle-tested - handles $2M/day"
locked_files:
  - stripe-integration.ts
  - payment-validator.ts
allowed_operations: [read, test]
requires_approval_from:
  - payments-team-lead
```

**SPEAKER NOTES:**
"Here's what a lock file looks like. Five types of locks - read-only for critical code, interface locks for APIs, module locks for cohesive components. The AI can read and test, but any modification requires explicit approval from the team lead."

---

## Slide 11: Real Impact - Guardrails

**VISUAL:**
Before/After comparison chart:

**Before Guardrails:**
- ❌ 5 different middleware patterns
- ❌ Auth implemented 3 ways
- ❌ Payment code refactored accidentally

**After Guardrails:**
- ✅ 1 consistent pattern (ADR-defined)
- ✅ 1 auth approach (ADR-guided)
- ✅ Critical code protected (Locked)

**TEXT:**
**85% reduction in architectural inconsistencies**

**SPEAKER NOTES:**
"The impact is dramatic. Teams using ADRs and locks report an 85% reduction in architectural inconsistencies. Instead of five different middleware patterns, you have one. Instead of auth implemented three ways, you have one standard approach. And critical code stays protected."

---

## Slide 12: PILLAR 2 - Intelligence Scaling

**VISUAL:**
Diagram showing AI reviewing AI:
- Center: "Your Code"
- 5 specialist AI agents around it (Architect, Security, Performance, Testing, Lock Coordinator)
- Human reviewer at top with reduced workload

**TEXT:**
"Let AI review AI. Humans focus on what matters."

**SPEAKER NOTES:**
"The second pillar is intelligence scaling. Here's the insight: traditional code review doesn't scale when you're shipping AI-generated code at 10x speed. So instead of making humans do all the review, we use specialized AI agents to catch 80% of issues automatically."

---

## Slide 13: Multi-Agent Review System

**VISUAL:**
Five cards showing each agent:

**🏛️ Architect Agent**
Validates ADR compliance

**🔒 Security Agent**
OWASP Top 10, auth patterns

**⚡ Performance Agent**
N+1 queries, memory leaks

**✅ Testing Agent**
Coverage requirements

**🔐 Lock Coordinator**
Protected file validation

**SPEAKER NOTES:**
"Five specialized agents run in parallel. The architect agent checks ADR compliance. The security agent looks for SQL injection, XSS, auth bugs. The performance agent catches N+1 queries and memory leaks. The testing agent ensures adequate coverage. And the lock coordinator verifies no protected files were modified. All of this happens before human review."

---

## Slide 14: Context Refresh - Solving Knowledge Cutoff

**VISUAL:**
Timeline graphic:
- 2023: "LLM Training Cutoff"
- 2024: React 19, Next.js 15, Tailwind v4 released
- 2025: "Your AI doesn't know about these! ⚠️"
- Solution: Context7 fetches latest docs ✅

**TEXT:**
**Problem:** LLM trained on old docs
**Solution:** Fetch latest docs before coding

**SPEAKER NOTES:**
"Here's a huge problem nobody talks about: knowledge cutoff. Your AI was trained in 2023. It doesn't know about React 19 features, Next.js 15 changes, or Tailwind v4 syntax. So it uses outdated patterns. Context7 solves this by fetching the latest documentation after the training cutoff, right before your AI starts implementing. No more 'I'm using React 18 patterns because that's what I was trained on.'"

---

## Slide 15: LLM-as-Judge for Visual Testing

**VISUAL:**
Three browser screenshots with AI evaluation:
- Desktop view ✅ "Follows design system"
- Tablet view ⚠️ "Padding too tight"
- Mobile view ✅ "Responsive, accessible"

**TEXT:**
"How do you test if a UI 'looks good'?"

**SPEAKER NOTES:**
"Traditional testing can't answer 'does this look good?' or 'is this responsive?' So we use LLM-as-Judge. Browser automation takes screenshots at different viewport sizes, and an LLM evaluates: Does this follow our design system? Are color contrasts accessible? Is the layout responsive? Minor issues get auto-fixed. Major issues get flagged for human review."

---

## Slide 16: Impact - Intelligence Scaling

**VISUAL:**
Two timelines side-by-side:

**Traditional Review:**
- 2 hours: Human finds SQL injection
- 1 hour: Human finds N+1 query
- 1 hour: Human checks test coverage
- 30 min: Human reviews architecture
- **Total: 4.5 hours**

**Multi-Agent Review:**
- 15 min: Agents catch 80% of issues
- 30 min: Human reviews product fit
- **Total: 45 minutes**

**TEXT:**
**80% of issues caught pre-human review**
**6x faster review cycle**

**SPEAKER NOTES:**
"The impact is massive. Traditional review takes 4-5 hours per feature. Multi-agent review catches 80% of issues in 15 minutes, and the human reviewer spends just 30 minutes on product decisions and architectural vision - not nitpicking linting errors or finding SQL injection. Six times faster."

---

## Slide 17: PILLAR 3 - Adaptive Rigor

**VISUAL:**
Sliding scale graphic:
- Left: "POC" (0% tests, maximum speed) ⚡⚡⚡
- Middle: "MVP" (35% tests, balanced) ⚡⚡
- Right: "Mission-Critical" (95% tests, maximum safety) 🛡️🛡️🛡️

**TEXT:**
**Not all code needs the same rigor**

**SPEAKER NOTES:**
"Here's the key insight that makes this whole thing work: not all code requires the same rigor. A quick proof-of-concept to validate product-market fit needs zero percent test coverage and maximum speed. A mission-critical payment system needs 95% coverage and exhaustive security review. The problem with both vibe coding and traditional development is they treat everything the same. We don't."

---

## Slide 18: 12 Maturity Stages

**VISUAL:**
Table showing progression:

| Stage | Tests | Security | Speed |
|-------|-------|----------|-------|
| prototype-alpha | 0% | Skip | ⚡⚡⚡ Max |
| prototype-rc | 15% | Basic | ⚡⚡⚡ |
| mvp-beta | 35% | Enhanced | ⚡⚡ |
| mvp-rc | 50% | Enhanced | ⚡⚡ |
| production-beta | 75% | Strict | ⚡ |
| production-rc | 90% | Comprehensive | 🐢 |
| mission-critical-rc | 95% | Exhaustive | 🐢🐢 |

**TEXT:**
**Quality gates auto-tighten as projects mature**

**SPEAKER NOTES:**
"We define 12 granular maturity stages. You start at prototype-alpha with zero tests and maximum speed. As your project proves itself and you move to MVP, quality gates automatically tighten to 35% coverage and enhanced security review. By the time you hit production, you're at 90% coverage. Mission-critical systems get 95% coverage and exhaustive security. Quality scales with criticality."

---

## Slide 19: Configuration Example

**VISUAL:**
Code snippet:

```yaml
# .ai-context.yaml
maturity_stage: mvp-beta

rigor:
  test_coverage_minimum: 35
  security_review_required: true
  agent_review_depth: enhanced

velocity_priority: high
quality_priority: good_enough_for_users

philosophy: "Ship fast, learn, iterate"
```

**TEXT:**
"One config file. Entire quality posture defined."

**SPEAKER NOTES:**
"Configuration is simple. One YAML file defines your entire quality posture. Set your maturity stage, and all the quality gates configure automatically. Your AI agents know exactly what rigor to apply."

---

## Slide 20: Technical Constraints

**VISUAL:**
Traffic light system:

🟢 **Required:**
- Postgres (licensed)
- Python 3.9 (team expertise)
- AWS GovCloud (compliance)

🔴 **Banned:**
- MongoDB (licensing)
- Redis (not IT-approved)
- Python 3.11 (not approved)

⚠️ **Limits:**
- 512MB RAM max
- 10GB disk max

**TEXT:**
**Tell AI what's actually possible**

**SPEAKER NOTES:**
"Another killer feature: technical constraints. Tell your AI agents upfront what's actually possible in your environment. You have a Postgres license, not MongoDB. Your team knows Python 3.9, not 3.11. You're on AWS GovCloud for compliance. Your servers have 512MB of RAM. Now the AI doesn't waste time suggesting MongoDB or Redis or building something that needs 4GB of RAM. Prevents wasted implementation cycles."

---

## Slide 21: Real-World Example - Overview

**VISUAL:**
Feature card:
"User Analytics Dashboard"
Maturity: mvp-beta
Timeline: 3 hours total

**SPEAKER NOTES:**
"Let's see this in action with a real example. You're building a user analytics dashboard for an MVP-stage product. Let me walk you through the five phases."

---

## Slide 22: Phase 1-2: Ingestion + Spec Generation

**VISUAL:**
Flow diagram:

**Jira Ticket** →
**System Reads:**
- ADRs (Chart.js, not D3)
- Locks (can read analytics API)
- Context (latest Chart.js 4.x docs)
- Constraints (512MB RAM limit)

→ **Tech Spec Generated** (30 min)

**SPEAKER NOTES:**
"Phase 1: Jira ticket comes in. Phase 2: Claude reads your ADRs and knows you use Chart.js for visualizations, not D3. It reads the lock files and knows it can read the analytics API but can't modify it. Context7 fetches the latest Chart.js 4.x documentation. It checks your constraints and knows it needs to stay under 512MB of RAM. In 30 minutes, it generates a tech spec perfectly aligned with your existing architecture."

---

## Slide 23: Phase 3: Multi-Agent Review

**VISUAL:**
Checklist with status:

- ✅ Architect: Follows ADR-003 (Chart.js)
- ✅ Security: No SQL injection, auth checks present
- ✅ Performance: Pagination implemented, no N+1
- ⚠️ Testing: 32% coverage (needs 35% for mvp-beta)
- ✅ Lock Coordinator: No protected files touched

**Action:** Testing agent bumps to 37% → All green ✅

**SPEAKER NOTES:**
"Phase 3: Five specialized agents validate in parallel. Architect agent confirms it follows the Chart.js ADR. Security agent finds no SQL injection. Performance agent sees pagination is implemented. Testing agent finds 32% coverage - needs 35% for MVP-beta stage - so it automatically adds a few more tests to hit 37%. Lock coordinator confirms no protected files were modified. Fifteen minutes, all green."

---

## Slide 24: Phase 4-5: Human Review + Implementation

**VISUAL:**
Split screen:

**Human Review (10 min):**
- Focus: "Does this solve the user's problem?"
- Skip: Linting, security, architecture (already validated ✅)

**Parallel Implementation (2 hours):**
- Agent A: Frontend dashboard
- Agent B: Backend API
- Agent C: Database migrations

All within architectural bounds. No conflicts.

**SPEAKER NOTES:**
"Phase 4: Human reviewer sees all the mechanical checks are done. They spend just 10 minutes on the important question: does this solve the user's problem? Phase 5: Three agents implement in parallel - frontend, backend, database. All stay within architectural bounds. No conflicts, no drift."

---

## Slide 25: The Result - Side by Side

**VISUAL:**
Comparison table:

| Approach | Time | Quality | Issues |
|----------|------|---------|--------|
| **Traditional Spec-Driven** | 3 days | High | Slow, missed market window |
| **Pure Vibe Coding** | 2 hours | Low | 15% tests, architectural chaos |
| **Bounded Iterative Vibing** | **3 hours** | **High** | **35% tests, secure, ADR-compliant** |

**TEXT:**
**10x faster than traditional. 2x safer than vibe coding.**

**SPEAKER NOTES:**
"Here's the result. Traditional spec-driven development takes three days. Pure vibe coding takes two hours but gives you 15% test coverage and architectural chaos. Bounded Iterative Vibing? Three hours with MVP-beta quality - 35% test coverage, security validated, ADR-compliant. You get the speed without the chaos."

---

## Slide 26: The 25 Problems Solved

**VISUAL:**
Two columns:

**Vibe Coding (13 solved):**
- ✅ Architectural drift
- ✅ Inconsistent implementations
- ✅ No security-by-design
- ✅ Insufficient test coverage
- ✅ LLM knowledge cutoff
- ✅ Critical code refactored
- ✅ Vendor lock-in
- ... and 6 more

**Spec-Driven (12 solved):**
- ✅ Slow iteration cycles
- ✅ Upfront perfection paralysis
- ✅ Specs become outdated
- ✅ Bottlenecked on human review
- ✅ No adaptive rigor
- ✅ Bureaucracy overhead
- ... and 6 more

**SPEAKER NOTES:**
"This approach solves 25 fundamental problems. Thirteen problems with vibe coding - architectural drift, inconsistent implementations, no security, insufficient tests, and more. Twelve problems with spec-driven development - slow cycles, perfection paralysis, bottlenecked reviews, and more. We're not just optimizing one approach - we're creating a new synthesis."

---

## Slide 27: Getting Started - 15 Minutes

**VISUAL:**
Four-step visual checklist:

**1. Write 3-5 ADRs** (10 min)
- Error handling
- Auth pattern
- API conventions

**2. Lock 10-20 Critical Files** (5 min)
- Payment processing
- Auth modules
- Core business logic

**3. Set Maturity Stage** (2 min)
```yaml
maturity_stage: mvp-beta
```

**4. Declare Constraints** (3 min)
```yaml
required: [postgres, python]
banned: [mongodb, redis]
```

**TEXT:**
**Start in 15 minutes. See ROI in 2 weeks.**

**SPEAKER NOTES:**
"You don't need to adopt everything at once. Start in 15 minutes. Write your top 3-5 ADRs - error handling, auth pattern, API conventions. Lock your 10-20 most critical files - payments, auth, core business logic. Set your maturity stage - are you at prototype, MVP, or production? Declare your technical constraints. Teams typically see ROI within two weeks."

---

## Slide 28: Metrics to Track

**VISUAL:**
Dashboard mockup showing:

📊 **Architectural Consistency Score**
85% of code follows ADRs ↑ 40%

⏱️ **Review Time Reduction**
4.5 hours → 45 minutes ↓ 83%

🐛 **Bug Escape Rate**
Production bugs from AI code ↓ 67%

⚡ **Feature Velocity**
Spec to production ↑ 300%

✅ **Test Coverage**
Automated tracking by maturity stage

**SPEAKER NOTES:**
"Measure what matters. Track architectural consistency - what percentage of code follows your ADRs. Review time reduction - before and after. Bug escape rate - production bugs from AI-generated code. Feature velocity - time from spec to production. And test coverage mapped to your maturity stages."

---

## Slide 29: Why This Matters Now

**VISUAL:**
Growth curve graphic:
- **2023:** 20% adoption
- **2024:** 67% adoption ← We are here
- **2025:** 85% projected
- **2026:** 95%+ (every team)

**TEXT:**
**AI adoption: 300% YoY growth**

"The question isn't *if* you'll use AI agents.
It's *how* you'll prevent chaos."

**SPEAKER NOTES:**
"Here's why this matters now. AI coding assistant adoption is growing at 300% year over year. Two-thirds of developers already use them weekly. Within 18 months, every development team will be AI-assisted. The question isn't if you'll use AI agents - it's how you'll prevent them from creating unmaintainable chaos. You need a methodology designed for AI-native development. You need it now."

---

## Slide 30: The Choice

**VISUAL:**
Three doors:

**Door 1: Pure Vibe Coding**
⚡ Fast but 💥 Chaotic

**Door 2: Spec-Driven**
🛡️ Safe but 🐢 Slow

**Door 3: Bounded Iterative Vibing**
⚡ Fast AND 🛡️ Safe

**TEXT:**
"Which future will you choose?"

**SPEAKER NOTES:**
"You have three choices. Door one: pure vibe coding. Fast but chaotic. Three months from now you have architectural debt you can't pay down. Door two: traditional spec-driven development. Safe but slow. Your competitors ship while you're writing specs. Door three: Bounded Iterative Vibing. Fast AND safe. You vibe at machine speed. You stay within the bounds. You get both."

---

## Slide 31: Call to Action

**VISUAL:**
Big bold text with QR code:

**Ready to Try It?**

🚀 **Download starter kit:**
[QR Code linking to repo]

📚 **Read full research:**
github.com/[your-repo]/ai-native-sdlc

💬 **Join the discussion:**
[Community link]

🎯 **Start today:**
15-minute quick start guide

**SPEAKER NOTES:**
"Ready to try Bounded Iterative Vibing? Scan this QR code to download the starter kit - ADR templates, lock file examples, maturity configuration guides. Read the full research on GitHub. Join our community discussion. And most importantly, start today with the 15-minute quick start guide. Write three ADRs, lock ten files, set your maturity stage, and ship your next feature with confidence."

---

## Slide 32: Thank You + Q&A

**VISUAL:**
- "Thank You"
- Your contact info
- QR codes for resources
- Social media handles

**SPEAKER NOTES:**
"Thank you. I'll take questions now."

**ANTICIPATED Q&A:**

**Q: What if we're already deep in vibe coding chaos?**
A: Start with ADRs. Document the patterns you want going forward. Lock critical code. You don't need to refactor everything - just guide future development.

**Q: Does this work for solo developers?**
A: Absolutely. Even with one AI agent, you benefit from consistency across your own sessions, protecting stable code, and right-sizing rigor.

**Q: Which AI tools does this work with?**
A: All of them. Claude Code, Cursor, GitHub Copilot, Cline, Windsurf, local LLMs. The framework is tool-agnostic.

**Q: How do you handle breaking changes to ADRs?**
A: ADRs have a status field - Proposed, Accepted, Superseded. When you supersede an ADR, you reference the new one that replaces it.

**Q: What about teams that don't want to use AI?**
A: The principles still work - ADRs, locks, adaptive rigor - but the ROI is highest for AI-assisted teams.

**Q: How much overhead is this really?**
A: One-time: 30 minutes to write initial ADRs and locks. Ongoing: negligible. You're documenting decisions you'd make anyway.

---

## Presentation Notes

### Timing Breakdown (25 min total):
- Slides 1-4 (Problem setup): 4 minutes
- Slides 5-11 (Pillar 1 - Guardrails): 6 minutes
- Slides 12-16 (Pillar 2 - Intelligence): 5 minutes
- Slides 17-20 (Pillar 3 - Adaptive Rigor): 4 minutes
- Slides 21-25 (Real-world example): 4 minutes
- Slides 26-32 (Wrap-up, CTA, Q&A): 2 minutes

### Visual Design Guidelines:
- **Color scheme**:
  - Primary: Deep blue (trust, stability)
  - Accent: Bright green (speed, growth)
  - Warning: Orange (caution, awareness)
  - Danger: Red (problems, chaos)

- **Typography**:
  - Headlines: Bold, sans-serif, 48-60pt
  - Body: Clean sans-serif, 24-28pt
  - Code: Monospace, syntax highlighted

- **Icons**: Use consistent icon set (recommend Heroicons or Feather Icons)

- **Charts/Graphs**: Keep simple, high contrast, large labels

### Delivery Tips:
1. **Energy**: Start with high energy on the problem (Slides 2-4)
2. **Slow down**: For technical concepts (ADRs, Locks)
3. **Speed up**: For the real-world example (excitement!)
4. **End strong**: Call to action should feel urgent but achievable

### Interactive Elements:
- **Slide 2**: Ask for hands ("Who's experienced chaos?")
- **Slide 17**: Ask audience: "What maturity stage is your main project?"
- **Slide 29**: Rhetorical pause before showing the growth curve

### Backup Slides (Optional):
- Detailed ADR template
- Complete maturity stage table (all 12 stages)
- MCP server architecture diagram
- Code Generator Abstraction layer
- Lock type comparison matrix
- ROI calculation example

---

## Assets Needed for PowerPoint Build:

1. **Icons** (32 total):
   - ⚡ Lightning bolt (speed)
   - 🛡️ Shield (safety)
   - 🔒 Lock (protection)
   - 🧠 Brain (intelligence)
   - 📊 Chart (metrics)
   - ✅ Checkmark (success)
   - ❌ X mark (problem)
   - ⚠️ Warning triangle
   - 🏛️ Building (architecture)
   - 🔐 Locked with key
   - 🎯 Target (goals)
   - And more...

2. **Diagrams**:
   - Highway with guardrails
   - Multi-agent review system
   - Maturity progression timeline
   - Before/After comparison charts

3. **Code Screenshots**:
   - ADR example
   - Lock file example
   - .ai-context.yaml
   - Technical constraints

4. **QR Codes**:
   - Link to GitHub repo
   - Link to quick start guide
   - Link to community discussion

---

**End of Presentation Deck**

*This markdown document can be imported into PowerPoint, Keynote, or Google Slides using various converter tools, or manually recreated with the visual descriptions provided.*
