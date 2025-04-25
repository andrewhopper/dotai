### dotai init

#### Function Description
The initialization command is used to create and set up the .ai directory structure in a new project.

#### Parameter Options
```bash
dotai init [options]

Options:
  --template <n>       Initialize project with specified template (default: "standard")
  --force              Force reinitialization, overwrite existing files
  --skip-hooks         Skip git hooks setup
  --config <path>      Specify custom configuration file path
  -y, --yes            Automatically select default values for all prompts
```

#### Execution Flow
1. **Environment Check**
   - Verify Node.js version
   - Check necessary dependencies
   - Validate directory permissions

2. **Directory Creation**
   - Create .ai main directory
   - Build subdirectory structure
   - Set directory permissions

3. **Template Processing**
   - Copy base template files
   - Apply custom templates (if specified)
   - Replace template variables

4. **Configuration Initialization**
   - Create configuration file
   - Set default parameters
   - Initialize tool configuration

5. **Git Integration**
   - Set up git hooks
   - Configure .gitignore
   - Initialize version control

#### Usage Examples
```bash
# Basic initialization
dotai init

# Use custom template
dotai init --template typescript-next

# Force reinitialization
dotai init --force
```

