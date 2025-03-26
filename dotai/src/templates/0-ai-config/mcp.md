---
id: CFG-mcp-001
created: {{createdDate}}
---

# Model Context Protocol Configuration <!-- SPEC-001 -->

This file defines the MCP servers and configurations used for this project.

## MCP Servers <!-- SPEC-002 -->

```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-brave-search"
      ],
      "env": {
        "BRAVE_API_KEY": "YOUR_API_KEY_HERE"
      },
      "disabled": false,
      "autoApprove": ["search"]
    }
  }
}