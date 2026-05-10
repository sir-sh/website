# S002: Configuration Loading

| Field | Value |
|-------|-------|
| Spec | S002 |
| Feature | Configuration Loading |
| Date | 2026-04-23 |
| Status | Implemented | Last Updated | 2026-05-10 |
| Author | spec-writer-agent |

## Overview

Sir's `ConfigLoader` is responsible for loading, merging, and querying configuration data from all resolved `.sir/` layers. It consumes the ordered layer list produced by `LayerResolver` (specified in S001) and builds a single merged configuration array that workflows, methods, and tasks can query at runtime.

The loader supports two file formats -- YAML (`config.yml`) and JSON (`config.json`) -- and processes both per layer. Configuration merging follows a "nearest layer wins" strategy: when the same key exists in multiple layers, the value from the layer closest to the working directory takes precedence. The merged result is a plain PHP array; consumers access nested values through a dot-notation helper (`get()`).

This component sits between layer resolution and all downstream consumers (WorkflowRunner, MethodExecutor, TaskRegistry). Every runtime decision that depends on user configuration flows through ConfigLoader.

## User Scenarios

S002-US-001 [P1] As a workflow author, I want configuration from my project's `.sir/config.yml` to override global `~/.sir/config.yml` so that project-specific settings take precedence.

S002-US-002 [P1] As a CLI user, I want to use either YAML or JSON for my config files so that I can choose the format I prefer.

S002-US-003 [P1] As a workflow author, I want to access deeply nested config values using dot notation (e.g. `database.host`) so that I do not need to manually traverse arrays.

S002-US-004 [P2] As a CLI user, I want config files at every `.sir/` layer to be merged so that I can share common settings in parent directories while overriding specific values per project.

## Requirements Summary

| ID | Type | Priority | Title | Status |
|----|------|----------|-------|--------|
| S002-FR-001 | Functional | P1 | Load config from all resolved layers | Draft |
| S002-FR-002 | Functional | P1 | YAML format support | Draft |
| S002-FR-003 | Functional | P1 | JSON format support | Draft |
| S002-FR-004 | Functional | P1 | Nearest-layer-wins merge order | Draft |
| S002-FR-005 | Functional | P1 | Recursive array merging | Draft |
| S002-FR-006 | Functional | P1 | Dot-notation value access | Draft |
| S002-FR-007 | Functional | P1 | Default value on missing key | Draft |
| S002-FR-008 | Functional | P1 | YAML and JSON coexist in same layer | Draft |
| S002-FR-009 | Functional | P2 | Optional startPath parameter | Draft |
| S002-FR-010 | Functional | P2 | Non-array parse results ignored | Draft |
| S002-AS-001 | Acceptance | P1 | Single layer YAML config | Draft |
| S002-AS-002 | Acceptance | P1 | Two-layer merge with override | Draft |
| S002-AS-003 | Acceptance | P1 | Dot-notation access | Draft |
| S002-AS-004 | Acceptance | P1 | Default value for missing key | Draft |
| S002-AS-005 | Acceptance | P1 | JSON config loading | Draft |
| S002-AS-006 | Acceptance | P1 | YAML and JSON in same layer | Draft |
| S002-AS-007 | Acceptance | P2 | Three-layer deep merge | Draft |
| S002-AS-008 | Acceptance | P2 | No config files anywhere | Draft |
| S002-EC-001 | Edge Case | P1 | Config file exists but is empty | Draft |
| S002-EC-002 | Edge Case | P1 | YAML parses to scalar (not array) | Draft |
| S002-EC-003 | Edge Case | P1 | JSON decode failure (malformed) | Draft |
| S002-EC-004 | Edge Case | P1 | Dot-notation on non-array intermediate | Draft |
| S002-EC-005 | Edge Case | P2 | Numeric-keyed arrays merge behavior | Draft |
| S002-EC-006 | Edge Case | P2 | Scalar collision across layers | Draft |
| S002-EC-007 | Edge Case | P2 | Deeply nested key (5+ levels) | Draft |
| S002-EC-008 | Edge Case | P2 | Empty string as dot-notation key | Draft |
| S002-EC-009 | Edge Case | P3 | Key contains literal dot | Draft |
| S002-SC-001 | Success | P1 | All P1 acceptance scenarios pass | Draft |
| S002-SC-002 | Success | P1 | Nearest-layer override verified | Draft |
| S002-SC-003 | Success | P1 | Both formats load correctly | Draft |
| S002-SC-004 | Success | P2 | Edge case coverage | Draft |

## Cross-Spec Dependencies

- **Depends on:** S001 (LayerResolver -- provides ordered layer paths)
- **Required by:** workflow loading, method execution, task configuration (future specs)
