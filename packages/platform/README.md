# @casys/mcp-platform

[![npm](https://img.shields.io/npm/v/@casys/mcp-platform)](https://www.npmjs.com/package/@casys/mcp-platform)
[![JSR](https://jsr.io/badges/@casys/mcp-platform)](https://jsr.io/@casys/mcp-platform)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Umbrella entry for the **Casys MCP Platform**. It re-exports the framework
([`@casys/mcp-server`](https://github.com/Casys-AI/mcp-platform/blob/main/packages/server/README.md))
so new consumers can install the platform under its own name. Both entries expose the exact same API.

```bash
# npm
npm install @casys/mcp-platform

# Deno
deno add jsr:@casys/mcp-platform
```

```typescript
import { McpApp } from "@casys/mcp-platform";

const server = new McpApp({ name: "my-server", version: "1.0.0" });
await server.start();
```

See [`@casys/mcp-server`](https://github.com/Casys-AI/mcp-platform/blob/main/packages/server/README.md)
for the full documentation and API reference.

## Versioning

`@casys/mcp-platform` is versioned independently but tracks the framework's `0.27.x` line: the
dependency is `jsr:@casys/mcp-server@^0.27.0` (and the equivalent npm range), so a platform release
never silently pulls a new framework minor.
