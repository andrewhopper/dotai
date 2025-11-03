---
id: ARCH-anti-cruft-system-002
created: 2025-11-03
authors:
  - name: "Claude"
    role: "AI Assistant"
status: draft
---

# Anti-Cruft System: File Length Monitor & Information Density Analyzer

## Executive Summary <!-- SPEC-001 -->

This document specifies a comprehensive anti-cruft system designed to prevent technical debt accumulation from unstructured "vibe coding" in the Dot AI repository. The system consists of two primary components:

1. **File Length Monitor**: Prevents files from growing beyond manageable sizes
2. **Information Density Analyzer**: Ensures documentation maintains high signal-to-noise ratio

Both systems integrate into the existing Dot AI workflow through CLI commands, git hooks, and optional daemon processes.

---

## Problem Statement <!-- REQ-001 -->

### Current Challenges

**Vibe Coding Issues:**
- AI agents and developers create files without size constraints
- Documentation accumulates boilerplate and redundant content
- Large files become difficult to navigate and maintain
- No automated detection of low-value content

**Impact:**
- Technical debt accumulates silently
- Refactoring becomes overwhelming
- Code review quality decreases
- Project navigation deteriorates
- Documentation loses usefulness

### Success Criteria

1. ✅ No files exceed 500 lines without explicit justification
2. ✅ Documentation maintains >70% information density
3. ✅ Automated detection and reporting of violations
4. ✅ Auto-suggestion of refactoring strategies
5. ✅ Integration with git workflow (pre-commit hooks)
6. ✅ Minimal false positives (<5%)

---

## System Architecture <!-- SPEC-002 -->

### Component Overview

```
dotai/
├── src/
│   ├── commands/
│   │   ├── lint-size.js        # File length CLI command
│   │   └── lint-density.js     # Density analysis CLI command
│   ├── analyzer/
│   │   ├── file-splitter.js    # Size analysis & split suggestions
│   │   ├── density.js          # Information density metrics
│   │   ├── patterns.js         # Boilerplate pattern detection
│   │   └── refactor.js         # Auto-refactoring engine
│   ├── daemon/
│   │   └── cruft-watcher.js    # Optional continuous monitoring
│   ├── hooks/
│   │   ├── pre-commit-size.sh  # Git hook for size checking
│   │   └── pre-commit-density.sh # Git hook for density checking
│   └── config/
│       └── density-standards.js # Thresholds by folder/file type
└── .husky/
    └── pre-commit              # Husky integration point
```

---

## Component 1: File Length Monitor <!-- FEAT-001 -->

### Overview <!-- FEAT-001:SPEC-001 -->

Monitors file sizes and prevents files from exceeding configurable line count thresholds. Provides automated suggestions for splitting large files into smaller, more manageable components.

### Requirements <!-- FEAT-001:REQ-001 -->

**Functional Requirements:**
1. Scan files for line count violations
2. Generate violation reports with actionable suggestions
3. Suggest logical split points based on file type
4. Support configurable thresholds per file type/directory
5. Block commits containing oversized files (optional)
6. Maintain refactoring queue for tracking violations

**Non-Functional Requirements:**
1. Scan speed: <100ms for files under 10,000 lines
2. Zero false positives for generated files (e.g., package-lock.json)
3. Support all text file types
4. Minimal memory footprint (<50MB for full repo scan)

### Configuration Schema <!-- FEAT-001:SPEC-002 -->

```javascript
// dotai/src/config/size-standards.js
export const SIZE_STANDARDS = {
  // Global defaults
  default: {
    maxLines: 500,
    warnAt: 400,
    enforceInHook: true
  },

  // Per file type overrides
  fileTypes: {
    '.md': { maxLines: 500, warnAt: 400 },
    '.js': { maxLines: 300, warnAt: 250 },
    '.ts': { maxLines: 300, warnAt: 250 },
    '.jsx': { maxLines: 250, warnAt: 200 },
    '.tsx': { maxLines: 250, warnAt: 200 },
    '.py': { maxLines: 400, warnAt: 350 },
    '.json': { maxLines: 1000, warnAt: 800 } // Config files can be larger
  },

  // Per directory overrides
  directories: {
    '.ai/': { maxLines: 500 },
    'src/': { maxLines: 300 },
    'tests/': { maxLines: 600 }, // Test files can be longer
    'docs/': { maxLines: 800 }
  },

  // Exclusions (never check these)
  exclude: [
    'package-lock.json',
    'yarn.lock',
    'pnpm-lock.yaml',
    '*.min.js',
    '*.bundle.js',
    'node_modules/**',
    'dist/**',
    'build/**',
    '.git/**'
  ]
};
```

### CLI Commands <!-- FEAT-001:IMPL-001 -->

#### Command: `dotai lint-size`

**Syntax:**
```bash
dotai lint-size [options] [path]

Options:
  -t, --threshold <number>     Override default line threshold (default: 500)
  -f, --format <type>          Output format: table, json, markdown (default: table)
  -o, --output <file>          Write report to file
  --fix                        Generate auto-split suggestions
  --strict                     Exit with error code if violations found
  --exclude <pattern>          Additional exclude patterns
  --include-tests              Include test files in scan
  --top <number>               Show top N largest files (default: 10)

Examples:
  dotai lint-size                           # Scan current directory
  dotai lint-size src/                      # Scan src directory only
  dotai lint-size --threshold 300           # Use 300 line limit
  dotai lint-size --fix                     # Show split suggestions
  dotai lint-size --format markdown -o size-report.md  # Export report
```

**Output Format (Table):**
```
⚠️  File Size Violations (5 found)

┌─────────────────────────────────────┬────────┬───────────┬──────────────┐
│ File                                │ Lines  │ Threshold │ Suggestion   │
├─────────────────────────────────────┼────────┼───────────┼──────────────┤
│ src/services/user-management.js     │ 847    │ 300       │ Split by API │
│ .ai/1-context/project-context.md    │ 623    │ 500       │ Split by H2  │
│ src/utils/data-transformer.js       │ 512    │ 300       │ Extract util │
│ docs/api-reference.md               │ 1124   │ 800       │ Split by API │
│ src/components/Dashboard.tsx        │ 456    │ 250       │ Extract comp │
└─────────────────────────────────────┴────────┴───────────┴──────────────┘

💡 Run with --fix to see detailed split suggestions
```

**Output Format (with --fix):**
```
📄 src/services/user-management.js (847 lines → 300 threshold)

Suggested split strategy: Split by API domain

📦 Proposed files:
  → src/services/user-auth.js (234 lines)
     - login()
     - logout()
     - validateToken()
     - refreshToken()

  → src/services/user-profile.js (187 lines)
     - getProfile()
     - updateProfile()
     - uploadAvatar()
     - getPreferences()

  → src/services/user-admin.js (312 lines)
     - listUsers()
     - createUser()
     - deleteUser()
     - updatePermissions()
     - bulkImport()

  → src/services/user-types.js (114 lines)
     - Type definitions and interfaces

💾 Refactoring added to: .ai/4-acceptance-reports/refactoring-queue.md
```

#### Command: `dotai watch-size`

**Syntax:**
```bash
dotai watch-size [options]

Options:
  --daemon                     Run as background daemon
  --interval <seconds>         Check interval (default: 60)
  --alert                      Send system notifications

Example:
  dotai watch-size --daemon --interval 30
```

### File Splitter Logic <!-- FEAT-001:IMPL-002 -->

#### JavaScript/TypeScript Split Strategies

```javascript
// Analyze file structure
function analyzeJSFile(content, filePath) {
  const ast = parseToAST(content); // Using babel/typescript parser

  return {
    // 1. Extract exports and their dependencies
    exports: extractExports(ast),

    // 2. Build dependency graph
    dependencies: buildDependencyGraph(ast),

    // 3. Identify cohesive groups (functions that call each other)
    cohesionGroups: identifyCohesionGroups(ast),

    // 4. Detect architectural patterns
    patterns: detectPatterns(ast), // MVC, service layer, utils, etc.

    // 5. Calculate split points
    splitPoints: calculateOptimalSplits(ast, cohesionGroups)
  };
}

// Split strategies by pattern
const SPLIT_STRATEGIES = {
  // Strategy 1: By feature domain
  byFeature: (analysis) => {
    return groupByNaming(analysis.exports, [
      /^(get|set|update|delete)User/,  // user-operations.js
      /^(get|set|update|delete)Post/,  // post-operations.js
      /^validate/,                     // validators.js
      /^format/,                       // formatters.js
    ]);
  },

  // Strategy 2: By architectural layer
  byLayer: (analysis) => {
    return {
      controllers: analysis.exports.filter(e => e.type === 'controller'),
      services: analysis.exports.filter(e => e.type === 'service'),
      models: analysis.exports.filter(e => e.type === 'model'),
      utils: analysis.exports.filter(e => e.type === 'utility')
    };
  },

  // Strategy 3: By cohesion (functions that work together)
  byCohesion: (analysis) => {
    return analysis.cohesionGroups.map(group => ({
      suggestedName: inferNameFromGroup(group),
      functions: group.functions,
      sharedDependencies: group.sharedDeps
    }));
  },

  // Strategy 4: Extract types/interfaces
  extractTypes: (analysis) => {
    return {
      types: extractTypeDefinitions(analysis.ast),
      constants: extractConstants(analysis.ast),
      interfaces: extractInterfaces(analysis.ast)
    };
  }
};
```

#### Markdown Split Strategies

```javascript
function analyzeMarkdownFile(content, filePath) {
  const sections = parseMarkdownSections(content);

  return {
    // 1. Hierarchical structure
    structure: buildSectionHierarchy(sections),

    // 2. Section sizes
    sectionSizes: sections.map(s => ({
      heading: s.heading,
      lines: s.lines,
      subsections: s.subsections.length
    })),

    // 3. Detect topic boundaries
    topicBoundaries: detectTopicShift(sections),

    // 4. Suggest splits
    splitPoints: suggestMarkdownSplits(sections)
  };
}

const MD_SPLIT_STRATEGIES = {
  // Strategy 1: By top-level sections (H2)
  byH2Sections: (analysis) => {
    return analysis.structure
      .filter(s => s.level === 2)
      .map(section => ({
        filename: slugify(section.heading) + '.md',
        content: extractSectionContent(section),
        lines: section.lines
      }));
  },

  // Strategy 2: By topic similarity
  byTopicGroups: (analysis) => {
    const topics = clusterSectionsByTopic(analysis.sections);
    return topics.map(topic => ({
      filename: topic.name + '.md',
      sections: topic.sections,
      lines: topic.totalLines
    }));
  },

  // Strategy 3: Keep TOC, split detailed sections
  tocWithSplits: (analysis) => {
    return {
      index: createTOCFile(analysis.structure),
      details: splitDetailSections(analysis.structure)
    };
  }
};
```

### Git Hook Integration <!-- FEAT-001:IMPL-003 -->

**File: `.husky/pre-commit`**
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Run size check on staged files
dotai lint-size --staged --strict

if [ $? -ne 0 ]; then
  echo ""
  echo "❌ Commit blocked: File size violations detected"
  echo "   Run 'dotai lint-size --fix' for suggestions"
  echo "   Or use 'git commit --no-verify' to bypass (not recommended)"
  exit 1
fi
```

### Refactoring Queue Template <!-- FEAT-001:SPEC-003 -->

**File: `.ai/4-acceptance-reports/refactoring-queue.md`**
```markdown
---
id: QA-refactoring-queue-001
created: 2025-11-03
auto-generated: true
---

# Refactoring Queue

## File Size Violations

| File | Lines | Threshold | Priority | Suggested Split | Added |
|------|-------|-----------|----------|----------------|-------|
| src/services/user-management.js | 847 | 300 | HIGH | By API domain | 2025-11-03 |
| .ai/1-context/project-context.md | 623 | 500 | MEDIUM | By H2 sections | 2025-11-03 |

## Information Density Violations

| File | Density | Threshold | Issue | Suggested Fix | Added |
|------|---------|-----------|-------|--------------|-------|
| docs/getting-started.md | 45% | 70% | High boilerplate | Remove redundancy | 2025-11-03 |

## Completed Refactorings

| File | Completed | Lines Before → After | Strategy Used |
|------|-----------|---------------------|---------------|
| src/utils/helpers.js | 2025-11-02 | 612 → 3x180 | Split by category |
```

---

## Component 2: Information Density Analyzer <!-- FEAT-002 -->

### Overview <!-- FEAT-002:SPEC-001 -->

Analyzes documentation and code files to detect low-information-density content. Identifies boilerplate, redundancy, and verbose sections that can be condensed or removed.

### Requirements <!-- FEAT-002:REQ-001 -->

**Functional Requirements:**
1. Calculate information density score (0-100) for documentation
2. Detect and categorize boilerplate patterns
3. Identify redundant sections and paragraphs
4. Classify information types (requirements, examples, explanations, etc.)
5. Auto-refactor low-density content (with approval)
6. Generate density reports by folder/file type
7. Support threshold configuration per directory

**Non-Functional Requirements:**
1. Analysis speed: <500ms per markdown file under 5000 lines
2. Accuracy: >90% precision in boilerplate detection
3. Support for multiple documentation formats (Markdown, reStructuredText)
4. Extensible pattern system

### Density Metrics <!-- FEAT-002:SPEC-002 -->

```javascript
// Core density calculation
function calculateInformationDensity(content, fileType) {
  const metrics = {
    // 1. Content composition
    totalLines: countLines(content),
    codeBlocks: extractCodeBlocks(content),
    headings: extractHeadings(content),
    paragraphs: extractParagraphs(content),
    lists: extractLists(content),
    tables: extractTables(content),
    links: extractLinks(content),

    // 2. Information value
    uniqueConcepts: extractUniqueConcepts(content),
    technicalTerms: extractTechnicalTerms(content),
    actionableItems: extractActionableContent(content),
    examples: countExamples(content),

    // 3. Noise/boilerplate
    boilerplateLines: detectBoilerplate(content),
    redundantParagraphs: findRedundancy(content),
    verboseSections: detectVerbosity(content),
    emptyLines: countEmptyLines(content),

    // 4. Structural quality
    avgParagraphLength: calculateAvgParagraphLength(content),
    avgSentenceLength: calculateAvgSentenceLength(content),
    headingHierarchy: analyzeHeadingHierarchy(content),
    tocPresent: detectTOC(content)
  };

  // Calculate composite density score
  const densityScore = calculateDensityScore(metrics);

  return {
    score: densityScore,
    metrics: metrics,
    classification: classifyDensity(densityScore),
    issues: identifyIssues(metrics),
    recommendations: generateRecommendations(metrics)
  };
}
```

### Density Score Calculation <!-- FEAT-002:SPEC-003 -->

```javascript
function calculateDensityScore(metrics) {
  // Weighted scoring system (0-100)
  let score = 100;

  // Penalties
  score -= (metrics.boilerplateLines / metrics.totalLines) * 30;  // Max -30 for boilerplate
  score -= (metrics.redundantParagraphs.length / metrics.paragraphs.length) * 20; // Max -20 for redundancy
  score -= metrics.verboseSections.length * 5; // -5 per verbose section
  score -= (metrics.emptyLines / metrics.totalLines) * 10; // Max -10 for empty lines

  // Bonuses
  if (metrics.examples > 0) score += Math.min(metrics.examples * 2, 10); // +2 per example, max +10
  if (metrics.codeBlocks.length > 0) score += Math.min(metrics.codeBlocks.length * 3, 15); // +3 per code block, max +15
  if (metrics.tables.length > 0) score += Math.min(metrics.tables.length * 2, 10); // +2 per table, max +10
  if (metrics.actionableItems > 0) score += Math.min(metrics.actionableItems * 2, 10); // +2 per actionable, max +10

  // Normalize to 0-100
  return Math.max(0, Math.min(100, Math.round(score)));
}

function classifyDensity(score) {
  if (score >= 85) return { grade: 'A', label: 'Excellent', color: 'green' };
  if (score >= 70) return { grade: 'B', label: 'Good', color: 'green' };
  if (score >= 55) return { grade: 'C', label: 'Acceptable', color: 'yellow' };
  if (score >= 40) return { grade: 'D', label: 'Poor', color: 'orange' };
  return { grade: 'F', label: 'Very Poor', color: 'red' };
}
```

### Boilerplate Pattern Detection <!-- FEAT-002:SPEC-004 -->

```javascript
// Pattern definitions
const BOILERPLATE_PATTERNS = {
  // Meta-commentary (adds no value)
  metaCommentary: [
    /^This (document|section|file|chapter) (describes|contains|outlines|explains|covers|discusses)/i,
    /^(In this|The following) (section|document|chapter)/i,
    /^(As mentioned|As stated|As discussed|As noted) (above|previously|earlier|before)/i,
    /^(We will|We'll|Let's) (now|next) (discuss|examine|look at|explore)/i,
  ],

  // Redundant signposting
  signposting: [
    /^(For more information|To learn more), (see|refer to|check|visit)/i,
    /^(See also|Related|Further reading):/i,
    /^(Note|Important|Warning|Tip):\s*$/i, // Empty admonitions
  ],

  // Placeholder content
  placeholders: [
    /^(TODO|FIXME|XXX|HACK|NOTE):/i,
    /^TBD|To be determined|Coming soon/i,
    /^@todo/i,
    /^\[.*\]\(#\)$/, // Empty links
  ],

  // Repetitive structure
  repetitive: [
    /^## (Overview|Introduction|Summary)$/i, // When section already has content
    /^This feature (allows|enables|provides)/i,
    /^The purpose of this/i,
  ],

  // Empty sections
  emptySections: [
    /^##+ .*\n\n##+ /gm, // Heading followed immediately by another heading
    /^##+ .*\n\s*$/gm,   // Heading with no content
  ]
};

function detectBoilerplate(content) {
  const lines = content.split('\n');
  const violations = [];

  lines.forEach((line, index) => {
    for (const [category, patterns] of Object.entries(BOILERPLATE_PATTERNS)) {
      for (const pattern of patterns) {
        if (pattern.test(line)) {
          violations.push({
            line: index + 1,
            content: line,
            category: category,
            pattern: pattern.source,
            suggestion: getSuggestion(category, line)
          });
        }
      }
    }
  });

  return violations;
}

function getSuggestion(category, line) {
  const suggestions = {
    metaCommentary: 'Remove meta-commentary and state the information directly',
    signposting: 'Integrate references inline or remove if not essential',
    placeholders: 'Complete the content or remove the placeholder',
    repetitive: 'Consolidate with surrounding content',
    emptySections: 'Add content or remove the heading'
  };

  return suggestions[category] || 'Review and consider removing';
}
```

### Redundancy Detection <!-- FEAT-002:SPEC-005 -->

```javascript
function findRedundancy(content) {
  const sections = extractSections(content);
  const redundancies = [];

  // 1. Detect duplicate headings
  const headings = sections.map(s => s.heading);
  const duplicateHeadings = findDuplicates(headings);
  if (duplicateHeadings.length > 0) {
    redundancies.push({
      type: 'duplicate_headings',
      items: duplicateHeadings,
      severity: 'high',
      suggestion: 'Consolidate sections with duplicate headings'
    });
  }

  // 2. Detect similar paragraphs (>80% similarity)
  const paragraphs = sections.flatMap(s => s.paragraphs);
  for (let i = 0; i < paragraphs.length; i++) {
    for (let j = i + 1; j < paragraphs.length; j++) {
      const similarity = calculateSimilarity(paragraphs[i], paragraphs[j]);
      if (similarity > 0.8) {
        redundancies.push({
          type: 'similar_paragraphs',
          paragraph1: { index: i, content: truncate(paragraphs[i], 100) },
          paragraph2: { index: j, content: truncate(paragraphs[j], 100) },
          similarity: similarity,
          severity: 'medium',
          suggestion: 'Consolidate similar content into one paragraph'
        });
      }
    }
  }

  // 3. Detect repeated code blocks
  const codeBlocks = extractCodeBlocks(content);
  const duplicateCode = findDuplicateCodeBlocks(codeBlocks);
  if (duplicateCode.length > 0) {
    redundancies.push({
      type: 'duplicate_code',
      blocks: duplicateCode,
      severity: 'low',
      suggestion: 'Consider extracting to shared example file'
    });
  }

  // 4. Detect repeated lists
  const lists = extractLists(content);
  const similarLists = findSimilarLists(lists);
  if (similarLists.length > 0) {
    redundancies.push({
      type: 'similar_lists',
      lists: similarLists,
      severity: 'medium',
      suggestion: 'Consolidate or cross-reference lists'
    });
  }

  return redundancies;
}

function calculateSimilarity(text1, text2) {
  // Use Levenshtein distance or cosine similarity
  const words1 = tokenize(text1);
  const words2 = tokenize(text2);
  const intersection = words1.filter(w => words2.includes(w));
  const union = [...new Set([...words1, ...words2])];
  return intersection.length / union.length; // Jaccard similarity
}
```

### Information Type Classification <!-- FEAT-002:SPEC-006 -->

```javascript
function classifyInformationType(content) {
  const sections = extractSections(content);

  return sections.map(section => ({
    heading: section.heading,
    types: detectInformationTypes(section.content),
    density: calculateSectionDensity(section),
    value: assessInformationValue(section)
  }));
}

function detectInformationTypes(content) {
  const types = [];

  // Requirements (MUST, SHOULD, SHALL)
  if (/\b(must|shall|required|mandatory)\b/i.test(content)) {
    types.push({
      type: 'requirement',
      count: (content.match(/\b(must|shall|required)\b/gi) || []).length,
      value: 'high'
    });
  }

  // Examples (code blocks, "for example", "e.g.")
  const codeBlocks = (content.match(/```[\s\S]*?```/g) || []).length;
  const examplePhrases = (content.match(/\b(for example|e\.g\.|such as|like)\b/gi) || []).length;
  if (codeBlocks > 0 || examplePhrases > 0) {
    types.push({
      type: 'examples',
      count: codeBlocks + examplePhrases,
      value: 'high'
    });
  }

  // Explanations (narrative paragraphs)
  const paragraphs = extractParagraphs(content);
  if (paragraphs.length > 0) {
    types.push({
      type: 'explanations',
      count: paragraphs.length,
      value: 'medium'
    });
  }

  // References (links, citations)
  const links = (content.match(/\[.*?\]\(.*?\)/g) || []).length;
  if (links > 0) {
    types.push({
      type: 'references',
      count: links,
      value: 'medium'
    });
  }

  // Specifications (tables, lists of properties)
  const tables = (content.match(/\|.*\|/g) || []).length;
  const specLists = (content.match(/^[-*] \w+:/gm) || []).length;
  if (tables > 0 || specLists > 0) {
    types.push({
      type: 'specifications',
      count: tables + specLists,
      value: 'high'
    });
  }

  // Warnings/notes (admonitions)
  const admonitions = (content.match(/^>\s*(Note|Warning|Important|Tip):/gm) || []).length;
  if (admonitions > 0) {
    types.push({
      type: 'admonitions',
      count: admonitions,
      value: 'medium'
    });
  }

  return types;
}
```

### Density Standards by Directory <!-- FEAT-002:SPEC-007 -->

```javascript
// dotai/src/config/density-standards.js
export const DENSITY_STANDARDS = {
  // Global defaults
  default: {
    minDensity: 60,
    maxBoilerplate: 0.20,
    maxRedundancy: 0.15,
    enforceInHook: false // Warning only by default
  },

  // Context documentation - should be very clear and concise
  '1-context': {
    minDensity: 70,
    maxBoilerplate: 0.15,
    maxRedundancy: 0.10,
    requiredTypes: ['requirements', 'explanations'],
    description: 'Project context should be high-signal with minimal redundancy'
  },

  // Technical design - must be dense and specific
  '2-technical-design': {
    minDensity: 80,
    maxBoilerplate: 0.10,
    maxRedundancy: 0.05,
    requiredTypes: ['requirements', 'specifications', 'examples'],
    description: 'Technical specs must be precise with clear requirements'
  },

  // Development docs - can be more tutorial-style
  '3-development': {
    minDensity: 60,
    maxBoilerplate: 0.20,
    maxRedundancy: 0.15,
    requiredTypes: ['examples', 'explanations'],
    description: 'Development guides can be verbose for clarity'
  },

  // Acceptance reports - should be factual and dense
  '4-acceptance-reports': {
    minDensity: 75,
    maxBoilerplate: 0.15,
    maxRedundancy: 0.10,
    requiredTypes: ['specifications', 'references'],
    description: 'Reports should be fact-based and concise'
  },

  // Config files - minimal prose, mostly structure
  '0-ai-config': {
    minDensity: 50,
    maxBoilerplate: 0.25,
    maxRedundancy: 0.20,
    description: 'Config files may contain more boilerplate for clarity'
  },

  // Code files - different criteria
  'src/**/*.{js,ts,jsx,tsx}': {
    minDensity: 70,
    maxBoilerplate: 0.15, // Comments and whitespace
    maxRedundancy: 0.10,
    requiredTypes: ['examples'], // Code is the example
    description: 'Code should be concise with meaningful comments'
  }
};
```

### CLI Commands <!-- FEAT-002:IMPL-001 -->

#### Command: `dotai lint-density`

**Syntax:**
```bash
dotai lint-density [options] [path]

Options:
  -t, --threshold <number>     Minimum density score (default: 70)
  -f, --format <type>          Output format: table, json, markdown (default: table)
  -o, --output <file>          Write report to file
  --refactor                   Generate auto-refactoring suggestions
  --apply                      Apply auto-refactoring (requires confirmation)
  --strict                     Exit with error code if violations found
  --exclude <pattern>          Additional exclude patterns
  --show-issues                Show detailed issue breakdown

Examples:
  dotai lint-density                              # Scan .ai/ directory
  dotai lint-density docs/                        # Scan docs directory
  dotai lint-density --threshold 80               # Use 80% density minimum
  dotai lint-density --refactor                   # Show refactoring suggestions
  dotai lint-density --apply                      # Apply auto-refactoring
  dotai lint-density --format json -o density.json # Export JSON report
```

**Output Format (Table):**
```
📊 Information Density Report

Overall Statistics:
  Files scanned: 23
  Average density: 68%
  Violations: 5
  Boilerplate detected: 847 lines
  Redundancy detected: 12 sections

┌─────────────────────────────────────────┬─────────┬───────────┬───────────────┐
│ File                                    │ Density │ Threshold │ Primary Issue │
├─────────────────────────────────────────┼─────────┼───────────┼───────────────┤
│ .ai/1-context/project-context.md        │ 45%     │ 70%       │ High boilerpl │
│ .ai/2-technical-design/api-spec.md      │ 62%     │ 80%       │ Redundancy    │
│ docs/getting-started.md                 │ 38%     │ 60%       │ Verbose       │
│ docs/architecture.md                    │ 58%     │ 60%       │ Empty section │
│ .ai/3-development/workflow.md           │ 52%     │ 60%       │ Repetitive    │
└─────────────────────────────────────────┴─────────┴───────────┴───────────────┘

💡 Run with --refactor to see improvement suggestions
⚠️  Run with --show-issues for detailed breakdown
```

**Output Format (with --show-issues):**
```
📄 .ai/1-context/project-context.md (45% density → 70% threshold)

Issues Detected:
  ❌ Boilerplate (34 lines, 28% of content)
     Line 12: "This document describes the project context..."
     Line 45: "As mentioned above, the project uses..."
     Line 89: "For more information, see the technical design..."
     → Suggestion: Remove meta-commentary and state information directly

  ❌ Redundancy (3 similar sections)
     Lines 23-34 ≈ Lines 156-167 (85% similar)
     → Suggestion: Consolidate similar content

  ❌ Empty Sections (2 found)
     Line 78: "## Future Enhancements" (no content)
     Line 142: "## References" (no content)
     → Suggestion: Add content or remove headings

  ⚠️  Low information types:
     - Requirements: 2 found (should have more)
     - Examples: 0 found (should have some)

Potential Density After Auto-Refactoring: 73% ✅
```

**Output Format (with --refactor):**
```
📄 .ai/1-context/project-context.md

🔧 Auto-Refactoring Plan:

1. Remove boilerplate (34 lines)
   ❌ Remove: "This document describes..."
   ❌ Remove: "As mentioned above..."
   ❌ Remove: "For more information..."

2. Consolidate redundant sections (28 lines → 12 lines)
   📦 Merge: "Project Goals" + "Objectives" → "Goals and Objectives"

3. Remove empty sections (2 headings)
   ❌ Remove: "## Future Enhancements"
   ❌ Remove: "## References"

4. Condense verbose sections
   ✏️  Lines 45-67: Convert narrative to bullet list (saves 15 lines)

📊 Result: 123 lines → 58 lines (53% reduction)
📈 Density: 45% → 87% (+42 points)

💾 Preview saved to: /tmp/project-context-refactored.md
✅ Run with --apply to accept changes
```

### Auto-Refactoring Engine <!-- FEAT-002:IMPL-002 -->

```javascript
// dotai/src/analyzer/refactor.js

export async function autoRefactorDocument(content, analysis, options = {}) {
  let refactored = content;
  const changes = [];

  // Step 1: Remove boilerplate
  if (options.removeBoilerplate !== false) {
    const result = removeBoilerplate(refactored, analysis.boilerplate);
    refactored = result.content;
    changes.push(...result.changes);
  }

  // Step 2: Consolidate redundancy
  if (options.consolidateRedundancy !== false) {
    const result = consolidateRedundantSections(refactored, analysis.redundancy);
    refactored = result.content;
    changes.push(...result.changes);
  }

  // Step 3: Remove empty sections
  if (options.removeEmptySections !== false) {
    const result = removeEmptySections(refactored);
    refactored = result.content;
    changes.push(...result.changes);
  }

  // Step 4: Condense verbose sections
  if (options.condenseVerbose !== false) {
    const result = condenseVerboseSections(refactored, analysis.verbosity);
    refactored = result.content;
    changes.push(...result.changes);
  }

  // Step 5: Convert narrative to lists (where appropriate)
  if (options.narrativeToLists !== false) {
    const result = convertNarrativeToLists(refactored);
    refactored = result.content;
    changes.push(...result.changes);
  }

  // Step 6: Optimize code examples
  if (options.optimizeCodeExamples !== false) {
    const result = optimizeCodeExamples(refactored);
    refactored = result.content;
    changes.push(...result.changes);
  }

  // Calculate improvements
  const originalDensity = analysis.score;
  const newAnalysis = await analyzeDensity(refactored);
  const newDensity = newAnalysis.score;

  return {
    original: content,
    refactored: refactored,
    changes: changes,
    metrics: {
      originalLines: countLines(content),
      refactoredLines: countLines(refactored),
      linesRemoved: countLines(content) - countLines(refactored),
      originalDensity: originalDensity,
      newDensity: newDensity,
      densityImprovement: newDensity - originalDensity
    }
  };
}

// Individual refactoring functions
function removeBoilerplate(content, boilerplateViolations) {
  let refactored = content;
  const changes = [];

  // Sort violations by line number (descending) to avoid index shifts
  const sorted = [...boilerplateViolations].sort((a, b) => b.line - a.line);

  for (const violation of sorted) {
    const lines = refactored.split('\n');
    const removedLine = lines[violation.line - 1];
    lines.splice(violation.line - 1, 1);
    refactored = lines.join('\n');

    changes.push({
      type: 'remove_boilerplate',
      line: violation.line,
      removed: removedLine,
      reason: violation.category
    });
  }

  return { content: refactored, changes };
}

function consolidateRedundantSections(content, redundancies) {
  let refactored = content;
  const changes = [];

  // Handle similar paragraphs
  const similarParagraphs = redundancies.filter(r => r.type === 'similar_paragraphs');

  for (const redundancy of similarParagraphs) {
    // Keep the longer/more detailed paragraph, remove the other
    const keep = redundancy.paragraph1.content.length > redundancy.paragraph2.content.length
      ? redundancy.paragraph1
      : redundancy.paragraph2;
    const remove = keep === redundancy.paragraph1 ? redundancy.paragraph2 : redundancy.paragraph1;

    refactored = refactored.replace(remove.content, '');

    changes.push({
      type: 'consolidate_redundancy',
      removed: truncate(remove.content, 100),
      kept: truncate(keep.content, 100),
      similarity: redundancy.similarity
    });
  }

  // Clean up extra newlines
  refactored = refactored.replace(/\n{3,}/g, '\n\n');

  return { content: refactored, changes };
}

function removeEmptySections(content) {
  let refactored = content;
  const changes = [];

  // Pattern: heading followed by another heading or end of file
  const emptyPattern = /(^##+ .+$)\n+(?=##+ |$)/gm;

  refactored = refactored.replace(emptyPattern, (match, heading) => {
    changes.push({
      type: 'remove_empty_section',
      removed: heading
    });
    return '';
  });

  return { content: refactored, changes };
}

function condenseVerboseSections(content, verbosity) {
  // Advanced: Use NLP to identify and condense verbose explanations
  // For now, implement basic rules

  let refactored = content;
  const changes = [];

  // Pattern: Very long paragraphs (>300 words) → suggest splitting
  const paragraphs = extractParagraphs(content);

  for (const para of paragraphs) {
    const wordCount = para.split(/\s+/).length;
    if (wordCount > 300) {
      // Try to split into bullet points at sentence boundaries
      const sentences = para.match(/[^.!?]+[.!?]+/g) || [];
      if (sentences.length > 3) {
        const bulletList = sentences.map(s => `- ${s.trim()}`).join('\n');
        refactored = refactored.replace(para, bulletList);

        changes.push({
          type: 'condense_verbose',
          original: truncate(para, 100),
          conversion: 'paragraph → bullet list',
          wordCount: wordCount
        });
      }
    }
  }

  return { content: refactored, changes };
}

function convertNarrativeToLists(content) {
  // Detect patterns like "First, ... Second, ... Third, ..."
  // Convert to markdown lists

  let refactored = content;
  const changes = [];

  const sequentialPattern = /(First|Firstly|1\.|One),\s+(.+?)\.\s+(Second|Secondly|2\.|Two),\s+(.+?)\.\s+(Third|Thirdly|3\.|Three),\s+(.+?)\.?$/gim;

  refactored = refactored.replace(sequentialPattern, (match, f1, text1, s1, text2, t1, text3) => {
    const listVersion = `1. ${text1}\n2. ${text2}\n3. ${text3}`;

    changes.push({
      type: 'narrative_to_list',
      original: truncate(match, 100),
      conversion: 'sequential narrative → numbered list'
    });

    return listVersion;
  });

  return { content: refactored, changes };
}
```

### Git Hook Integration <!-- FEAT-002:IMPL-003 -->

**File: `.husky/pre-commit` (append to existing)**
```bash
# Run density check on staged documentation files
dotai lint-density .ai/ --staged --strict

if [ $? -ne 0 ]; then
  echo ""
  echo "⚠️  Warning: Documentation density issues detected"
  echo "   Run 'dotai lint-density --refactor' for suggestions"
  echo ""
  # Allow commit but warn (change to exit 1 to block)
fi
```

---

## Integration with Existing Workflow <!-- SPEC-003 -->

### Workflow Hooks Addition

Update `.ai/0-ai-config/workflow.md` to include:

```markdown
### Pre-Flight Hooks (Before Starting Work)

1. Environment Check
2. **File Size Check** ← NEW
   ```bash
   dotai lint-size --threshold 500
   ```
3. **Documentation Density Check** ← NEW
   ```bash
   dotai lint-density --threshold 70
   ```
4. Lock Verification
5. Template Loading

### Post-Flight Hooks (After Completing Work)

1. Validation
2. Testing
3. **Size Compliance Check** ← NEW
   ```bash
   dotai lint-size --strict
   ```
4. **Density Compliance Check** ← NEW
   ```bash
   dotai lint-density --strict
   ```
5. Report Generation
```

### CLI Integration

Add to `package.json`:
```json
{
  "scripts": {
    "lint": "npm run lint:size && npm run lint:density",
    "lint:size": "dotai lint-size",
    "lint:density": "dotai lint-density",
    "fix:size": "dotai lint-size --fix",
    "fix:density": "dotai lint-density --refactor",
    "watch:cruft": "dotai watch-size --daemon"
  }
}
```

---

## Implementation Phases <!-- IMPL-001 -->

### Phase 1: File Length Monitor (Week 1)
- [ ] Create `src/analyzer/file-splitter.js`
- [ ] Implement size standards config
- [ ] Create `src/commands/lint-size.js`
- [ ] Add basic split suggestions (by function/section)
- [ ] Create refactoring queue template
- [ ] Write tests
- [ ] Documentation

**Deliverables:**
- Working `dotai lint-size` command
- Pre-commit hook template
- Refactoring queue system

### Phase 2: Information Density Analyzer (Week 2)
- [ ] Create `src/analyzer/density.js`
- [ ] Implement `src/analyzer/patterns.js` (boilerplate detection)
- [ ] Create density standards config
- [ ] Create `src/commands/lint-density.js`
- [ ] Write tests
- [ ] Documentation

**Deliverables:**
- Working `dotai lint-density` command
- Density reporting system

### Phase 3: Auto-Refactoring Engine (Week 3)
- [ ] Create `src/analyzer/refactor.js`
- [ ] Implement boilerplate removal
- [ ] Implement redundancy consolidation
- [ ] Implement verbose section condensation
- [ ] Add interactive approval system
- [ ] Write tests
- [ ] Documentation

**Deliverables:**
- Auto-refactoring functionality
- Interactive approval flow

### Phase 4: Advanced Features (Week 4)
- [ ] Watch daemon (`dotai watch-size`)
- [ ] Enhanced split suggestions using AST analysis
- [ ] NLP-based density improvements
- [ ] IDE integration (VSCode extension)
- [ ] CI/CD integration guide
- [ ] Performance optimization

**Deliverables:**
- Optional daemon for continuous monitoring
- Advanced analysis features

---

## Testing Strategy <!-- TEST-001 -->

### Unit Tests

```javascript
// tests/analyzer/file-splitter.test.js
describe('File Splitter', () => {
  test('detects files exceeding threshold', () => {
    const result = analyzeFileSize('test-file.js', 600, { threshold: 500 });
    expect(result.violation).toBe(true);
  });

  test('suggests split by function for JS files', () => {
    const suggestions = suggestSplit('large-service.js', jsContent);
    expect(suggestions).toHaveLength(3);
    expect(suggestions[0].strategy).toBe('by_feature');
  });
});

// tests/analyzer/density.test.js
describe('Density Analyzer', () => {
  test('calculates density score correctly', () => {
    const score = calculateDensityScore(mockMetrics);
    expect(score).toBeGreaterThan(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  test('detects boilerplate patterns', () => {
    const content = 'This document describes the project...';
    const violations = detectBoilerplate(content);
    expect(violations).toHaveLength(1);
    expect(violations[0].category).toBe('metaCommentary');
  });

  test('finds redundant sections', () => {
    const redundancies = findRedundancy(contentWithDuplicates);
    expect(redundancies).not.toHaveLength(0);
  });
});
```

### Integration Tests

```javascript
describe('CLI Integration', () => {
  test('dotai lint-size scans directory', async () => {
    const result = await runCLI(['lint-size', 'test-fixtures/']);
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('violations');
  });

  test('dotai lint-density generates report', async () => {
    const result = await runCLI(['lint-density', 'test-fixtures/docs/']);
    expect(result.stdout).toContain('density');
  });
});
```

### Test Fixtures

```
tests/fixtures/
├── oversized-file.js (600 lines)
├── good-size-file.js (200 lines)
├── low-density.md (lots of boilerplate)
├── high-density.md (concise, high-value)
└── redundant-content.md (duplicate sections)
```

---

## Success Metrics <!-- VAL-001 -->

### Quantitative Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Average file size | <300 lines | Weekly scan |
| Documentation density | >70% | Weekly scan |
| Refactoring queue size | <10 files | Continuous |
| False positive rate | <5% | User reports |
| Analysis speed | <100ms per file | Performance tests |

### Qualitative Metrics

- Developer satisfaction with refactoring suggestions
- Reduction in "I can't find where X is implemented" questions
- Improved code review efficiency
- Better onboarding experience for new developers

---

## Configuration Files <!-- SPEC-004 -->

### `.dotai.config.json`

```json
{
  "cruft": {
    "size": {
      "enabled": true,
      "threshold": 500,
      "warnAt": 400,
      "enforceInHook": true,
      "exclude": [
        "node_modules/**",
        "*.min.js",
        "package-lock.json"
      ],
      "fileTypes": {
        ".md": { "maxLines": 500 },
        ".js": { "maxLines": 300 },
        ".ts": { "maxLines": 300 }
      }
    },
    "density": {
      "enabled": true,
      "minDensity": 70,
      "enforceInHook": false,
      "standards": {
        "1-context": { "minDensity": 70 },
        "2-technical-design": { "minDensity": 80 },
        "3-development": { "minDensity": 60 }
      }
    },
    "watch": {
      "enabled": false,
      "interval": 60
    }
  }
}
```

---

## Documentation Requirements <!-- REQ-002 -->

### User Documentation

- [ ] README.md with quick start
- [ ] CLI command reference
- [ ] Configuration guide
- [ ] Integration guide (git hooks, CI/CD)
- [ ] Examples and use cases
- [ ] Troubleshooting guide

### Developer Documentation

- [ ] Architecture overview
- [ ] API reference
- [ ] Contributing guide
- [ ] Testing guide
- [ ] Pattern extension guide

---

## Future Enhancements <!-- SPEC-005 -->

### Advanced Features (Post-MVP)

1. **AI-Powered Split Suggestions**
   - Use LLM to suggest semantically coherent splits
   - Understand domain context for better suggestions

2. **Cross-File Refactoring**
   - Detect functionality that should be shared across files
   - Suggest extraction to shared modules

3. **Real-time IDE Integration**
   - VSCode extension with inline warnings
   - Real-time density indicators
   - Quick-fix actions

4. **Learning System**
   - Learn from accepted/rejected suggestions
   - Customize patterns based on project style

5. **Team Analytics**
   - Dashboard showing team-wide cruft metrics
   - Gamification for maintaining clean codebase
   - Trend analysis over time

6. **Natural Language Refactoring**
   - "Make this section more concise"
   - "Split this file by feature"
   - Conversational refactoring interface

---

## Appendix A: Example Reports <!-- SPEC-006 -->

### Example Size Report

```markdown
# File Size Report
Generated: 2025-11-03 14:32:00

## Summary
- Files scanned: 127
- Violations: 5
- Total oversized lines: 2,847

## Violations

### 🔴 HIGH PRIORITY
**src/services/user-management.js** (847 lines, threshold: 300)
- Strategy: Split by API domain
- Estimated effort: 2 hours
- Suggested files:
  - `src/services/user-auth.js` (234 lines)
  - `src/services/user-profile.js` (187 lines)
  - `src/services/user-admin.js` (312 lines)
  - `src/services/user-types.js` (114 lines)

### 🟡 MEDIUM PRIORITY
**.ai/1-context/project-context.md** (623 lines, threshold: 500)
- Strategy: Split by H2 sections
- Estimated effort: 1 hour
- Suggested files:
  - `project-overview.md` (145 lines)
  - `target-users.md` (178 lines)
  - `goals-objectives.md` (201 lines)
  - `constraints.md` (99 lines)

[Additional violations...]

## Size Distribution
```

### Example Density Report

```markdown
# Information Density Report
Generated: 2025-11-03 14:32:00

## Summary
- Files analyzed: 23 documentation files
- Average density: 68%
- Violations (below threshold): 5
- Boilerplate detected: 847 lines (18% of total)

## Violations by Severity

### 🔴 CRITICAL (Density < 50%)
**.ai/1-context/project-context.md** (45%)
- Primary issue: High boilerplate (28% of content)
- Secondary issue: Redundant sections (3 found)
- Potential density after refactoring: 73%
- Estimated effort: 30 minutes

### 🟡 WARNING (Density 50-70%)
**.ai/2-technical-design/api-spec.md** (62%)
- Primary issue: Redundant sections
- Potential density after refactoring: 78%
- Estimated effort: 20 minutes

[Additional violations...]

## Density Distribution by Folder
- `1-context/`: 58% average (target: 70%)
- `2-technical-design/`: 74% average (target: 80%) ✅
- `3-development/`: 65% average (target: 60%) ✅
```

---

## Appendix B: API Reference <!-- SPEC-007 -->

### JavaScript API

```javascript
// Programmatic usage
import { analyzeFileSize, analyzeDensity, autoRefactor } from 'dotai-cli';

// File size analysis
const sizeAnalysis = await analyzeFileSize('src/large-file.js', {
  threshold: 300,
  suggestSplits: true
});

// Density analysis
const densityAnalysis = await analyzeDensity('docs/guide.md', {
  minDensity: 70,
  detectBoilerplate: true,
  findRedundancy: true
});

// Auto-refactoring
const refactored = await autoRefactor('docs/guide.md', {
  removeBoilerplate: true,
  consolidateRedundancy: true,
  preview: true
});
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 0.1.0 | 2025-11-03 | Initial specification |

---

## References <!-- SPEC-008 -->

- [Dot AI Documentation Structure](/.ai/1-context/)
- [Workflow Guidelines](/.ai/0-ai-config/workflow.md)
- [Development Conventions](/.ai/2-technical-design/architecture/dev-conventions.md)
- [Project ID Naming Convention](/CLAUDE.md)

---

**Document Status:** Draft
**Next Review:** After implementation of Phase 1
**Owner:** Development Team
