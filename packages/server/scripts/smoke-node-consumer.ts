import { createStaticTokenAuthProvider, McpApp, type McpUiToolMeta } from "@casys/mcp-server";

const ui: McpUiToolMeta = {
  resourceUri: "ui://node-consumer/legacy-alias-smoke",
  visibility: ["model", "app"],
  emits: ["ready"],
};
const provider = createStaticTokenAuthProvider(
  [{ token: "consumer-token", subject: "consumer", scopes: ["read"] }],
  { resource: "https://node-consumer.example" },
);
const app = new McpApp({
  name: "legacy-alias-type-smoke",
  version: "0.0.0",
  auth: { provider },
});

void app;
void ui;
