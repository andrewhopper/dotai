# Dot AI Architecture Design and Implementation Roadmap

> **Note**: This document describes the planned system architecture. The MCP server component is currently under development (see issue #2) and has not yet been implemented. The current architecture diagram and process flow demonstrate the target design of the system.

## Design Principles

### 1. Dual Interaction Mode

The system supports two independent interaction methods:

1. **Command Line Mode**
   - Direct operation through CLI tools
   - Provides precise command control
   - Supports automation scripts

2. **Natural Language Mode**
   - Understands intent through MCP service
   - Provides intelligent interaction
   - Supports flexible task expression

### 2. Independent Operation Principle

CLI and MCP run completely independently, ensuring consistency through the file system:

```
.ai/
├── config/           # Framework configuration
├── templates/        # Template files
├── workspace/        # Workspace
└── state.json       # State records
```

Advantages:
- Conforms to Unix philosophy
- Simple and reliable architecture
