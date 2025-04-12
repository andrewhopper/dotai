# MCP Servers and Directories Overview

## Popular MCP Servers

### Firecrawl
- A powerful web scraping MCP server with 1.6k+ stars on GitHub
- Features:
  - Web scraping with JavaScript rendering
  - URL discovery and crawling
  - Web search with content extraction
  - Batch processing with rate limiting
  - Mobile/Desktop viewport support
  - Smart content filtering
- Installation: `npx -y firecrawl-mcp`
- Requires API key from firecrawl.dev

### Brave Search
- Official Brave Search API integration for MCP
- Provides web and local search capabilities
- Features:
  - Web search results
  - News articles
  - Image search
  - Local results
- Installation: `env BRAVE_API_KEY=[your-key] npx -y @modelcontextprotocol/server-brave-search`
- Requires Brave Search API key

### Qdrant
- Vector search engine MCP server with semantic memory capabilities
- Features:
  - Store and retrieve information with vector search
  - Semantic code snippet storage
  - Metadata support
  - SSE transport support for remote connections
- Installation: Requires running Qdrant instance
- GitHub: 260+ stars, Apache 2.0 license

### BrowserUse
- Browser automation and control MCP server
- Features:
  - Automated UI testing
  - Web scraping and research
  - Complex web task automation
  - Documentation checking
  - Integration testing support
- Installation: Available via Smithery
- Best suited for:
  - Frontend development workflows
  - Web application testing
  - Research and documentation tasks
  - Browser-based automation

## MCP Directories

### Smithery
- Primary registry for MCP servers
- Features:
  - Searchable directory of MCP servers
  - Quality ratings and reviews
  - Easy installation commands
  - Integration with Cursor IDE
- Website: smithery.ai

### Cursor Directory
- Official Cursor IDE MCP server directory
- Features:
  - Curated list of tested MCP servers
  - Installation instructions
  - Compatibility information
  - User ratings and reviews
- Website: cursor.directory/mcp

### mcp.so
- Community-driven MCP server directory
- Features:
  - Open-source server listings
  - Documentation and guides
  - Integration examples
  - Community contributions
- Focus on developer tools and utilities

## Best Practices

1. Server Installation:
   - Use stdio/local setup for personal use
   - Use SSE transport for team/remote setups
   - Always secure API keys properly

2. Configuration:
   - Add servers one at a time
   - Verify status indicators
   - Test functionality before production use

3. Usage:
   - MCP works in Composer and Agent modes
   - Explicitly instruct AI to use MCP tools
   - Accept tool usage prompts when they appear

4. Troubleshooting:
   - Check server status indicators
   - Verify API key formatting
   - Restart Cursor if tools don't appear
   - Update to latest Cursor version
