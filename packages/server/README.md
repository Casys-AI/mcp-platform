# @casys/mcp-server (deprecated alias)

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> **Deprecated:** the framework moved to
> [`@casys/mcp-platform`](https://github.com/Casys-AI/mcp-platform/blob/main/packages/platform/README.md).
> This package re-exports it unchanged so existing imports keep working. New code should install
> `@casys/mcp-platform` directly.

```bash
npm install @casys/mcp-server   # works, but deprecated
npm install @casys/mcp-platform # canonical
```

```typescript
// Old imports keep working:
import { McpApp } from "@casys/mcp-server";

// New code should use:
import { McpApp } from "@casys/mcp-platform";
```
