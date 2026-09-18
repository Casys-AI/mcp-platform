/**
 * `@casys/mcp-platform` — umbrella entry for the Casys MCP Platform.
 *
 * This package adds no API of its own: it re-exports the framework
 * (`@casys/mcp-server`) so new consumers can install the platform under its
 * own name. Existing `@casys/mcp-server` imports keep working unchanged —
 * both entries resolve to the same framework release line.
 */
export * from "@casys/mcp-server";
