# S007: Built-in Tasks

| Field | Value |
|-------|-------|
| Spec | S007 |
| Feature | Built-in Tasks |
| Date | 2026-04-23 |
| Status | Implemented | Last Updated | 2026-05-10 |
| Project | sir.sh CLI (`/Users/mark/Projects/Sir/cli`) |
| Tech Stack | PHP 8.2, Laravel Zero, Symfony Process |

## Overview

Sir.sh ships with six built-in tasks that cover common development workflow operations: temporary workspace creation, file writing, git cloning, test execution, and code review. These tasks are registered as a singleton `TaskRegistry` in the Laravel service container during application boot (via `AppServiceProvider`) and are invoked by the `WorkflowRunner` when a workflow step specifies `task:` instead of `method:` or `shell:`.

Every built-in task implements `TaskInterface`, which defines two methods: `execute(array $args, Context $context): mixed` for performing the task's work, and `getMetadata(): array` for exposing the task's name, description, argument schema, and side-effect declarations. The metadata contract enables the AI agent interface (`sir agent tools`) and the plan command (`sir plan`) to introspect task capabilities without executing them.

Tasks are organized into namespace-prefixed groups: `workspace.*` for workspace management, `files.*` for file operations, `git.*` for version control, `tests.*` for test execution, and `coderabbit.*` for code review integration. Each task receives resolved template arguments from the workflow engine and returns structured arrays that can be captured via `saveAs` for use in subsequent workflow steps.

## User Scenarios

S007-US-001 [P1] As a workflow author, I want to create temporary workspace directories so that workflow steps can operate in isolated locations without polluting the project tree.

S007-US-002 [P1] As a workflow author, I want to write files with arbitrary content so that workflows can generate output artifacts (reports, configs, results).

S007-US-003 [P1] As a workflow author, I want to write markdown files with auto-generated titles so that workflow outputs are well-formatted documentation.

S007-US-004 [P1] As a workflow author, I want to clone git repositories into specified directories so that workflows can operate on external codebases.

S007-US-005 [P1] As a workflow author, I want to auto-detect and run project tests so that workflows can verify code quality without knowing the project's test framework.

S007-US-006 [P2] As a workflow author, I want to trigger CodeRabbit reviews so that workflows can include automated code review as a step.

S007-US-007 [P1] As a workflow engine consumer, I want all tasks to follow a consistent interface so that the runner can invoke any task uniformly via `TaskInterface::execute()`.

S007-US-008 [P2] As an AI agent, I want to query task metadata so that I can discover available tasks and their argument schemas without executing them.

## Requirements Summary

| ID | Type | Priority | Title |
|----|------|----------|-------|
| S007-FR-001 | Functional | P1 | TaskInterface contract |
| S007-FR-002 | Functional | P1 | TaskRegistry singleton registration |
| S007-FR-003 | Functional | P1 | Six built-in tasks registered by name |
| S007-FR-004 | Functional | P1 | workspace.temp: create temp directory |
| S007-FR-005 | Functional | P1 | workspace.temp: optional repo subdirectory |
| S007-FR-006 | Functional | P1 | files.write: write content to path |
| S007-FR-007 | Functional | P1 | files.write: create parent directories |
| S007-FR-008 | Functional | P1 | files.writeMd: write markdown with optional title |
| S007-FR-009 | Functional | P1 | files.writeMd: prepend H1 when title provided |
| S007-FR-010 | Functional | P1 | git.clone: clone repository to folder |
| S007-FR-011 | Functional | P1 | git.clone: optional branch specification |
| S007-FR-012 | Functional | P1 | git.clone: default folder from repo basename |
| S007-FR-013 | Functional | P1 | tests.auto: detect npm test command |
| S007-FR-014 | Functional | P1 | tests.auto: detect composer test command |
| S007-FR-015 | Functional | P1 | tests.auto: npm takes precedence over composer |
| S007-FR-016 | Functional | P1 | tests.auto: throw when no test command found |
| S007-FR-017 | Functional | P2 | coderabbit.review: invoke coderabbit CLI |
| S007-FR-018 | Functional | P2 | coderabbit.review: fallback to gh CLI guidance |
| S007-FR-019 | Functional | P2 | coderabbit.review: throw when no CLI available |
| S007-FR-020 | Functional | P1 | All tasks return structured arrays |
| S007-FR-021 | Functional | P1 | Metadata includes name, description, args, effects |
| S007-FR-022 | Functional | P1 | Template args resolved before task execution |
| S007-IF-001 | Interface | P1 | TaskInterface method signatures |
| S007-IF-002 | Interface | P1 | TaskRegistry API |
| S007-IF-003 | Interface | P1 | workspace.temp input/output schema |
| S007-IF-004 | Interface | P1 | files.write input/output schema |
| S007-IF-005 | Interface | P1 | files.writeMd input/output schema |
| S007-IF-006 | Interface | P1 | git.clone input/output schema |
| S007-IF-007 | Interface | P1 | tests.auto input/output schema |
| S007-IF-008 | Interface | P2 | coderabbit.review input/output schema |
| S007-IF-009 | Interface | P1 | Metadata structure schema |
| S007-AS-001 | Acceptance | P1 | Workflow step invokes task by name |
| S007-AS-002 | Acceptance | P1 | workspace.temp creates directory and returns path |
| S007-AS-003 | Acceptance | P1 | files.write creates file with content |
| S007-AS-004 | Acceptance | P1 | files.writeMd prepends title |
| S007-AS-005 | Acceptance | P1 | git.clone clones to target folder |
| S007-AS-006 | Acceptance | P1 | tests.auto detects and runs npm tests |
| S007-AS-007 | Acceptance | P1 | tests.auto detects and runs composer tests |
| S007-AS-008 | Acceptance | P2 | coderabbit.review with coderabbit CLI |
| S007-AS-009 | Acceptance | P1 | Task result captured via saveAs |
| S007-AS-010 | Acceptance | P1 | Unknown task name throws RuntimeException |
| S007-EC-001 | Edge Case | P1 | workspace.temp with empty prefix |
| S007-EC-002 | Edge Case | P1 | files.write with missing path arg |
| S007-EC-003 | Edge Case | P1 | files.write with empty content |
| S007-EC-004 | Edge Case | P2 | files.write to read-only directory |
| S007-EC-005 | Edge Case | P1 | files.writeMd with null title |
| S007-EC-006 | Edge Case | P1 | git.clone with invalid repo URL |
| S007-EC-007 | Edge Case | P1 | git.clone with nonexistent branch |
| S007-EC-008 | Edge Case | P2 | git.clone folder already exists |
| S007-EC-009 | Edge Case | P1 | tests.auto with no package.json or composer.json |
| S007-EC-010 | Edge Case | P2 | tests.auto with both package.json and composer.json |
| S007-EC-011 | Edge Case | P2 | tests.auto with package.json but no test script |
| S007-EC-012 | Edge Case | P2 | coderabbit.review missing target arg |
| S007-EC-013 | Edge Case | P1 | Registering duplicate task name |
| S007-EC-014 | Edge Case | P2 | tests.auto process timeout (600s) |
| S007-EC-015 | Edge Case | P2 | git.clone process timeout (300s) |
| S007-SC-001 | Success Criteria | P1 | All 6 tasks registered at boot |
| S007-SC-002 | Success Criteria | P1 | All tasks implement TaskInterface |
| S007-SC-003 | Success Criteria | P1 | All tasks return arrays |
| S007-SC-004 | Success Criteria | P1 | All tasks expose valid metadata |
| S007-SC-005 | Success Criteria | P1 | Required args throw on missing |
| S007-SC-006 | Success Criteria | P1 | File tasks create parent directories |

## Cross-Spec Dependencies

- **Depends on:** S003 (WorkflowRunner invokes tasks via `executeTask`), S004 (template resolution in task args via `Context::resolveTemplate`)
- **Required by:** Any workflow that uses `task:` steps, `sir agent tools` command (reads metadata), `sir plan` command (reads effects from metadata)
