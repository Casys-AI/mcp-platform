# Changelog

All notable changes to `@casys/mcp-server` will be documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project adheres
to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.27.2] - 2026-09-19

### Changed

- Both JSR and npm publications now depend on `@casys/mcp-platform@^0.28.0`, with the npm build
  deriving that range from the Deno package manifest so the two registries cannot drift apart. The
  package remains a pure re-export, and compatible Platform patches are adopted without another
  alias release.
- The npm publication smoke now type-checks a strict NodeNext consumer through the deprecated
  package name as well as importing it at runtime, against both the newest compatible Platform and
  the declared `0.28.0` lower bound. This protects value and type re-exports without silently
  raising the alias floor.

### Documentation

- Added explicit npm and Deno migration steps plus the full migration guide, so consumers can adopt
  `@casys/mcp-platform` without treating the rename as an API migration.

## [0.27.1] - 2026-09-18

### Changed

- **Deprecated alias:** the framework moved to `@casys/mcp-platform@^0.28.0`. This package now
  re-exports it unchanged. Framework history continues in the `@casys/mcp-platform` changelog.
