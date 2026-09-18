import { assert, assertEquals } from "@std/assert";
import * as framework from "@casys/mcp-server";
import * as platform from "./mod.ts";

Deno.test("@casys/mcp-platform re-exports the framework", () => {
  assertEquals(typeof platform.McpApp, "function");
  // Export parity: the umbrella must expose exactly the framework's API —
  // no dropped or added names. (export * skips only `default`, which the
  // framework does not define.)
  const platformKeys = Object.keys(platform).sort();
  assert(platformKeys.length > 0);
  assertEquals(platformKeys, Object.keys(framework).sort());
});
