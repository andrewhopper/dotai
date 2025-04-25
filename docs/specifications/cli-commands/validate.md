### dotai validate

#### Function Description
The validate command is used to check project structure, documentation completeness, and configuration correctness.

#### Parameter Options
```bash
dotai validate [options] [path]

Options:
  --fix               Automatically fix discovered issues
  --report <format>   Generate report (json|text|html)
  --strict           Enable strict mode validation
```

#### Validation Items
1. **Structure Validation**
   - Directory completeness
   - Required files existence
   - Permission correctness

2. **Content Validation**
   - Document format
   - Configuration validity
   - Template completeness

3. **Relationship Validation**
   - Reference integrity
   - Dependency correctness
   - Version compatibility

#### Execution Flow
1. **Initial Check**
   - Validate project structure
   - Check configuration files
   - Confirm dependency status

2. **Detailed Validation**
   - Execute structure check
   - Validate document content
   - Check configuration correctness

3. **Report Generation**
   - Collect validation results
   - Format output
   - Generate detailed report

#### Usage Examples
```bash
# Basic validation
dotai validate

# Generate HTML report
dotai validate --report html

# Strict mode validation with automatic fixes
dotai validate --strict --fix
```

## Configuration File

