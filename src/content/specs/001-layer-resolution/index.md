# S001: Layer Resolution System

| Field | Value |
|-------|-------|
| Spec | S001 |
| Feature | Layer Resolution System |
| Date | 2026-04-23 |
| Status | Implemented | Last Updated | 2026-05-10 |
| Project | sir.sh CLI (`/Users/mark/Projects/Sir/cli`) |
| Tech Stack | PHP 8.2, Laravel Zero |

## Overview

The Layer Resolution System is the foundational discovery mechanism of sir.sh. It determines which `.sir/` configuration directories apply to the current working context by walking the filesystem from the current working directory upward to the root `/`, collecting every `.sir/` directory encountered along the way.

After the filesystem walk, the global `~/.sir` directory is appended if it exists and was not already discovered during the walk. The resulting ordered list of layers establishes the precedence chain used by all downstream systems (ConfigLoader, WorkflowLoader, PackManager): the nearest layer (closest to cwd) has the highest precedence, parent layers have decreasing precedence, and the global layer has the lowest precedence.

The `sir where` command exposes the resolved layer stack to the user, displaying all loaded layers in precedence order with numbered indices.

## User Scenarios

S001-US-001 [P1] As a developer working in a nested project directory, I want sir.sh to discover all `.sir/` directories between my cwd and the filesystem root so that project-level, organization-level, and global configurations all apply.

S001-US-002 [P1] As a developer, I want the nearest `.sir/` layer to override parent layers so that project-specific configuration always takes precedence over broader defaults.

S001-US-003 [P1] As a developer, I want my `~/.sir` global directory to always be included (with lowest precedence) so that I can define fallback workflows and configuration.

S001-US-004 [P2] As a developer, I want to run `sir where` to see which layers are loaded and in what order so that I can debug configuration issues.

S001-US-005 [P2] As a developer working in a git repository, I want the option to stop layer discovery at the `.git` boundary so that parent directories outside the repo are excluded.

## Requirements Summary

| ID | Type | Priority | Title |
|----|------|----------|-------|
| S001-FR-001 | Functional | P1 | Upward directory walk from cwd |
| S001-FR-002 | Functional | P1 | Collect .sir/ directories during walk |
| S001-FR-003 | Functional | P1 | Precedence order: nearest first |
| S001-FR-004 | Functional | P1 | Global ~/.sir appended last |
| S001-FR-005 | Functional | P1 | Resolve absolute paths via realpath |
| S001-FR-006 | Functional | P2 | Optional .git boundary stop |
| S001-FR-007 | Functional | P1 | Home directory detection via HOME or USERPROFILE |
| S001-FR-008 | Functional | P1 | Return empty array when no layers found |
| S001-FR-009 | Functional | P2 | Ensure global .sir directory creation |
| S001-FR-010 | Functional | P1 | Root / directory .sir check |
| S001-FR-011 | Functional | P1 | No duplicate paths in result |
| S001-FR-012 | Functional | P2 | sir where command output |
| S001-FR-013 | Functional | P2 | sir where empty state guidance |
| S001-AS-001 | Acceptance | P1 | Single layer at cwd |
| S001-AS-002 | Acceptance | P1 | Multiple layers with precedence |
| S001-AS-003 | Acceptance | P1 | Global layer appended |
| S001-AS-004 | Acceptance | P2 | Git boundary stop |
| S001-AS-005 | Acceptance | P1 | No layers found |
| S001-AS-006 | Acceptance | P2 | sir where displays layers |
| S001-AS-007 | Acceptance | P2 | sir where with no layers |
| S001-EC-001 | Edge Case | P1 | cwd is filesystem root |
| S001-EC-002 | Edge Case | P1 | Symlinked directories |
| S001-EC-003 | Edge Case | P2 | HOME env var unset |
| S001-EC-004 | Edge Case | P1 | Global .sir already in walk path |
| S001-EC-005 | Edge Case | P2 | .sir exists as file, not directory |
| S001-EC-006 | Edge Case | P2 | Deeply nested directory (20+ levels) |
| S001-EC-007 | Edge Case | P1 | Parent directory equals current (loop guard) |
| S001-EC-008 | Edge Case | P2 | startPath is null (defaults to cwd) |
| S001-SC-001 | Success Criteria | P1 | Correct layer ordering |
| S001-SC-002 | Success Criteria | P1 | No duplicates |
| S001-SC-003 | Success Criteria | P1 | Global layer always last |
| S001-SC-004 | Success Criteria | P1 | All paths absolute |
| S001-SC-005 | Success Criteria | P2 | Performance under 50ms |
| S001-NF-001 | Non-Functional | P1 | Resolution completes within 50ms |
| S001-NF-002 | Non-Functional | P1 | No filesystem writes during resolution |
| S001-NF-003 | Non-Functional | P2 | Graceful handling of permission errors |
| S001-NF-004 | Non-Functional | P1 | No external dependencies |

## Cross-Spec Dependencies

- **Depends on:** None (foundational service)
- **Required by:** ConfigLoader (config merging), WorkflowLoader (workflow discovery), PackManager (pack resolution), all CLI commands that need layer context
