/**
 * Build @casys/mcp-server (deprecated alias) as native ESM JavaScript for npm.
 *
 * Like the former platform umbrella, this package ships no code of its own:
 * `mod.ts` re-exports the framework, so dnt (which cannot externalize an
 * import-mapped `jsr:` dependency and would bundle the whole framework) is
 * the wrong tool. This script emits the one-line re-export directly and
 * declares the framework as a real npm dependency instead.
 */

const FRAMEWORK_NPM_RANGE = "^0.28.0";

const denoJsonText = await Deno.readTextFile(
  new URL("../deno.json", import.meta.url),
);
const denoJson = JSON.parse(denoJsonText) as { version?: string };
const version = denoJson.version;
if (!version) {
  throw new Error(
    "[build-npm] failed to read version from packages/server/deno.json",
  );
}

// The alias tracks the workspace framework: fail loudly if the framework's
// minor drifted past the emitted npm range instead of publishing a stale pin.
// Patch drift inside the minor self-resolves through the ^ range.
const platformDenoJson = JSON.parse(
  await Deno.readTextFile(new URL("../../platform/deno.json", import.meta.url)),
) as { version?: string };
const platformMinor = platformDenoJson.version?.match(/^(\d+\.\d+)\./)?.[1];
const npmMinor = FRAMEWORK_NPM_RANGE.match(/^\^(\d+\.\d+)\./)?.[1];
if (!platformMinor || platformMinor !== npmMinor) {
  throw new Error(
    `[build-npm] framework skew: workspace platform is ${platformDenoJson.version}, ` +
      `npm range is ${FRAMEWORK_NPM_RANGE}`,
  );
}

console.log(`[build-npm] Version: ${version}`);
await Deno.remove("./dist-node", { recursive: true }).catch((error) => {
  if (!(error instanceof Deno.errors.NotFound)) throw error;
});
await Deno.mkdir("./dist-node/esm", { recursive: true });

const entry = 'export * from "@casys/mcp-platform";\n';
await Deno.writeTextFile("./dist-node/esm/mod.js", entry);
await Deno.writeTextFile("./dist-node/esm/mod.d.ts", entry);

const packageJson = {
  name: "@casys/mcp-server",
  version,
  // ESM-only output: without this, Node <20.19 parses esm/*.js as CommonJS
  // and the re-export breaks (engines floor is >=20).
  type: "module",
  description: "Deprecated alias — re-exports the @casys/mcp-platform framework",
  license: "MIT",
  repository: {
    type: "git",
    url: "git+https://github.com/Casys-AI/mcp-platform.git",
  },
  keywords: [
    "mcp",
    "model-context-protocol",
    "framework",
  ],
  engines: {
    node: ">=20.0.0",
  },
  dependencies: {
    "@casys/mcp-platform": FRAMEWORK_NPM_RANGE,
  },
  // npm surfaces this on install and on `npm view`: the rename notice reaches
  // consumers at the moment they depend on the old name.
  deprecated: "Package renamed to @casys/mcp-platform — same API, please migrate.",
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
