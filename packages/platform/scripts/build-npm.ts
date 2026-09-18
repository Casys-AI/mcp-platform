/**
 * Build @casys/mcp-platform as native ESM JavaScript for npm.
 *
 * Unlike the other workspace packages this build does NOT use dnt: dnt cannot
 * externalize an import-mapped `jsr:` dependency (its `mappings` lookup misses
 * once the bare specifier resolves through the import map, and the default is
 * to bundle the whole framework into the umbrella — duplicating it for any
 * consumer that also installs `@casys/mcp-server`). The umbrella entry is a
 * single re-export, so this script emits it directly and declares the
 * framework as a real npm dependency instead.
 */

const FRAMEWORK_NPM_RANGE = "^0.27.0";

const denoJsonText = await Deno.readTextFile(
  new URL("../deno.json", import.meta.url),
);
const denoJson = JSON.parse(denoJsonText) as {
  version?: string;
  imports?: Record<string, string>;
};
const version = denoJson.version;
if (!version) {
  throw new Error(
    "[build-npm] failed to read version from packages/platform/deno.json",
  );
}

// The JSR range in deno.json and the npm range emitted here must track the
// same framework minor — fail loudly instead of publishing a skewed umbrella.
// Patch drift inside the minor self-resolves through the ^ ranges on both
// registries, so only the minor is compared.
const jsrSpecifier = denoJson.imports?.["@casys/mcp-server"];
const jsrMinor = jsrSpecifier?.match(/^jsr:@casys\/mcp-server@\^(\d+\.\d+)\./)?.[1];
const npmMinor = FRAMEWORK_NPM_RANGE.match(/^\^(\d+\.\d+)\./)?.[1];
if (!jsrMinor || jsrMinor !== npmMinor) {
  throw new Error(
    `[build-npm] framework range skew: deno.json has ${jsrSpecifier}, ` +
      `npm range is ${FRAMEWORK_NPM_RANGE}`,
  );
}

console.log(`[build-npm] Version: ${version}`);
await Deno.remove("./dist-node", { recursive: true }).catch((error) => {
  if (!(error instanceof Deno.errors.NotFound)) throw error;
});
await Deno.mkdir("./dist-node/esm", { recursive: true });

const entry = 'export * from "@casys/mcp-server";\n';
await Deno.writeTextFile("./dist-node/esm/mod.js", entry);
await Deno.writeTextFile("./dist-node/esm/mod.d.ts", entry);

const packageJson = {
  name: "@casys/mcp-platform",
  version,
  // ESM-only output: without this, Node <20.19 parses esm/*.js as CommonJS
  // and the re-export breaks (engines floor is >=20).
  type: "module",
  description:
    "Umbrella entry for the Casys MCP Platform — re-exports the @casys/mcp-server framework",
  license: "MIT",
  repository: {
    type: "git",
    url: "git+https://github.com/Casys-AI/mcp-platform.git",
  },
  keywords: [
    "mcp",
    "model-context-protocol",
    "platform",
    "framework",
  ],
  engines: {
    node: ">=20.0.0",
  },
  dependencies: {
    "@casys/mcp-server": FRAMEWORK_NPM_RANGE,
  },
  main: "./esm/mod.js",
  types: "./esm/mod.d.ts",
  exports: {
    ".": {
      types: "./esm/mod.d.ts",
      import: "./esm/mod.js",
    },
  },
  files: ["esm", "README.md", "LICENSE", "CHANGELOG.md"],
};
await Deno.writeTextFile(
  "dist-node/package.json",
  `${JSON.stringify(packageJson, null, 2)}\n`,
);

for (const asset of ["README.md", "LICENSE", "CHANGELOG.md"] as const) {
  await Deno.copyFile(asset, `dist-node/${asset}`);
}

console.log("[build-npm] Done. Output: dist-node/");
