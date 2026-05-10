# S006: Method System

| Field | Value |
|-------|-------|
| Spec | S006 |
| Feature | Method System |
| Date | 2026-04-23 |
| Status | Implemented | Last Updated | 2026-05-10 |
| Project | sir.sh CLI (`/Users/mark/Projects/Sir/cli`) |
| Tech Stack | PHP 8.2, Laravel Zero |

## Overview

The Method System provides the extensibility layer for sir.sh. It enables packs to define reusable, parameterized operations as JSON files that can be discovered, validated, and executed by the CLI. The system consists of two core components: the MethodRegistry (discovery and lookup) and the MethodExecutor (validation and execution).

Methods are JSON files located in `pack/methods/` directories. Each method declares a name, description, typed arguments with validation constraints, side-effect metadata, and an implementation block. The MethodRegistry discovers methods from all loaded packs across all resolved layers, namespacing them by the pack's declared namespace (e.g., `git.clone`). The MethodExecutor validates incoming arguments against the method's declared schema, applies defaults, casts types, resolves template expressions via the Context service, and dispatches execution to one of two backends: `shell` (template-expanded shell command) or `exec` (external program with JSON stdin/stdout).

Output streams in real-time by default, with an option to buffer for programmatic consumption. The system integrates with the WorkflowRunner as the handler for `method` step types in workflows.

## User Scenarios

S006-US-001 [P1] As a pack author, I want to define methods as JSON files in `methods/` so that my pack provides reusable operations to any sir.sh user who installs it.

S006-US-002 [P1] As a workflow author, I want to call pack methods by namespace-qualified name (e.g., `git.clone`) so that I can compose complex workflows from pack-provided building blocks.

S006-US-003 [P1] As a developer, I want method arguments validated before execution so that missing required arguments fail fast with clear error messages instead of producing broken shell commands.

S006-US-004 [P2] As an AI agent, I want to inspect method `effects` metadata so that I can determine whether a method performs network calls or filesystem writes before deciding to execute it.

S006-US-005 [P1] As a developer running a workflow, I want to see method output streamed in real-time so that long-running operations provide immediate feedback.

S006-US-006 [P2] As a pack author, I want to use the `exec` implementation type to delegate to external programs (Python, Node, etc.) communicating via JSON stdin/stdout so that methods are not limited to shell commands.

## Requirements Summary

| ID | Type | Priority | Title |
|----|------|----------|-------|
| S006-FR-001 | Functional | P1 | Discover methods from pack directories |
| S006-FR-002 | Functional | P1 | Discover methods from layer methods directories |
| S006-FR-003 | Functional | P1 | Namespace methods by pack namespace |
| S006-FR-004 | Functional | P1 | Fallback namespace to directory name |
| S006-FR-005 | Functional | P1 | Method name from JSON field or filename |
| S006-FR-006 | Functional | P1 | Register and retrieve methods by name |
| S006-FR-007 | Functional | P1 | Validate required arguments |
| S006-FR-008 | Functional | P1 | Apply default argument values |
| S006-FR-009 | Functional | P1 | Cast arguments to declared types |
| S006-FR-010 | Functional | P1 | Execute shell type methods |
| S006-FR-011 | Functional | P1 | Resolve template expressions before shell execution |
| S006-FR-012 | Functional | P1 | Execute exec type methods with JSON I/O |
| S006-FR-013 | Functional | P1 | Stream output in real-time |
| S006-FR-014 | Functional | P2 | Buffer output when streaming disabled |
| S006-FR-015 | Functional | P1 | Return structured result from execution |
| S006-FR-016 | Functional | P1 | Reject unknown implementation types |
| S006-FR-017 | Functional | P1 | Set validated args into Context |
| S006-FR-018 | Functional | P2 | Support effects metadata |
| S006-FR-019 | Functional | P2 | Read pack metadata from sir-pack.json |
| S006-AS-001 | Acceptance | P1 | Shell method with required args executes correctly |
| S006-AS-002 | Acceptance | P1 | Missing required argument throws exception |
| S006-AS-003 | Acceptance | P1 | Default value applied when argument omitted |
| S006-AS-004 | Acceptance | P1 | Integer argument cast from string |
| S006-AS-005 | Acceptance | P1 | Template variables resolved in shell command |
| S006-AS-006 | Acceptance | P1 | Exec method receives JSON stdin and returns JSON stdout |
| S006-AS-007 | Acceptance | P1 | Method discovered from pack with namespace |
| S006-AS-008 | Acceptance | P2 | Streaming output appears in real-time |
| S006-AS-009 | Acceptance | P1 | Unknown impl type throws exception |
| S006-EC-001 | Edge Case | P1 | Malformed JSON method file |
| S006-EC-002 | Edge Case | P1 | Empty command string |
| S006-EC-003 | Edge Case | P2 | Pack directory with no methods subdirectory |
| S006-EC-004 | Edge Case | P1 | Exec program returns non-JSON output |
| S006-EC-005 | Edge Case | P2 | sir-pack.json missing from pack directory |
| S006-EC-006 | Edge Case | P1 | Duplicate method names across packs |
| S006-EC-007 | Edge Case | P2 | Methods directory contains non-JSON files |
| S006-EC-008 | Edge Case | P1 | Argument type not in supported set |
| S006-EC-009 | Edge Case | P2 | Shell command exits with non-zero code |
| S006-EC-010 | Edge Case | P1 | No args defined in method (args block absent) |
| S006-SC-001 | Success Criteria | P1 | Methods discoverable from all loaded packs |
| S006-SC-002 | Success Criteria | P1 | Argument validation catches all required violations |
| S006-SC-003 | Success Criteria | P1 | Type casting covers all declared types |
| S006-SC-004 | Success Criteria | P1 | Shell and exec types both produce structured results |
| S006-SC-005 | Success Criteria | P2 | Streaming and buffered modes both functional |
| S006-IF-001 | Interface | P1 | Method JSON schema |
| S006-IF-002 | Interface | P1 | sir-pack.json schema |
| S006-IF-003 | Interface | P1 | Shell execution result schema |
| S006-IF-004 | Interface | P1 | Exec execution result schema |
| S006-IF-005 | Interface | P1 | MethodRegistry public API |
| S006-IF-006 | Interface | P1 | MethodExecutor public API |

## Cross-Spec Dependencies

- **Depends on:** S001 (LayerResolver -- provides layer paths for method discovery), Context service (template resolution)
- **Required by:** WorkflowRunner (executes method steps), AgentCommand (exposes methods as tools), PlanCommand (includes method steps in plans)
