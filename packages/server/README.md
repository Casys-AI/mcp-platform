# @casys/mcp-server (deprecated alias)

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> **Deprecated:** the framework moved to
> [`@casys/mcp-platform`](https://github.com/Casys-AI/mcp-platform/blob/main/packages/platform/README.md).
> This package re-exports it unchanged so existing imports keep working. New code should install
> `@casys/mcp-platform` directly.

No immediate migration is required: the alias exposes the same API and keeps existing applications
working. When you are ready, switch the dependency and import name; no framework API rewrite is
needed.

## Migrate from npm

```bash
npm install @casys/mcp-platform
npm uninstall @casys/mcp-server
```

## Migrate from Deno / JSR

```bash
deno add jsr:@casys/mcp-platform
deno remove @casys/mcp-server
```

Then update only the package specifier:

```typescript
// Still supported through the compatibility alias:
import { McpApp } from "@casys/mcp-server";

// Canonical package:
import { McpApp } from "@casys/mcp-platform";
```

For dependency-file examples, lockfile guidance, and the compatibility guarantees, see the
[complete migration guide](https://github.com/Casys-AI/mcp-platform/blob/main/docs/migration/mcp-server-to-mcp-platform.md).
