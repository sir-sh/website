# S009: CLI Commands Surface

| Field | Value |
|-------|-------|
| Spec | S009 |
| Feature | CLI Commands Surface |
| Date | 2026-04-24 |
| Status | Implemented | Last Updated | 2026-05-10 |
| Project | sir.sh CLI (`/Users/mark/Projects/Sir/cli`) |
| Tech Stack | PHP 8.2, Laravel Zero |

## Overview

The CLI Commands Surface defines the complete command interface for sir.sh, covering workflow execution, pack management, and AI agent integration. The interface is designed around two primary modes: interactive (prompts for required inputs, confirmation gates) and non-interactive (skips prompts via `--non-interactive` or `--yes` flags).

All commands follow Laravel Zero conventions: exit code 0 for success, non-zero for failure, and human-readable output styled with Laravel's output decorators (`$this->info()`, `$this->error()`, etc.). Workflow name resolution follows the layer precedence order defined in S001.

## User Scenarios

S009-US-001 [P1] As a user, I want to run a named workflow so that I can execute automation defined in my `.sir/` layers.

S009-US-001 [P1] As a user, I want to preview a workflow execution plan so that I can understand what steps will run before committing to execution.

S009-US-002 [P1] As a user, I want to see which `.sir/` layers are loaded and in what precedence order so that I understand where workflows and configuration come from.

S009-US-003 [P1] As a user, I want to list all available workflows across layers so that I know what automation I can invoke.

S009-US-004 [P1] As a user, I want to view detailed information about a specific workflow including its inputs, steps, and metadata so that I can understand its behavior before running it.

S009-US-005 [P1] As a user, I want to install packs from git sources so that I can share and reuse automation across projects.

S009-US-006 [P1] As a user, I want to list installed packs so that I know which packs are available in my project or globally.

S009-US-007 [P1] As a user, I want to remove an installed pack so that I can clean up automation I no longer need.

S009-US-008 [P1] As a user, I want to run workflows non-interactively with `--yes` so that I can use sir in scripts and CI environments.

S009-US-009 [P1] As a user, I want to run workflows with `--dry-run` so that I can validate workflow behavior without executing any steps.

S009-US-010 [P2] As an AI agent, I want a machine-readable tool listing so that I can programmatically discover available workflows and methods.

S009-US-011 [P2] As an AI agent, I want to run workflows with confirmation so that destructive operations require explicit approval.

## Spec Files

| File | Description |
|------|-------------|
| `index.md` | This overview, user scenarios, and requirements summary |
| `functional-requirements.md` | FR items: command behavior, flags, input gathering |
| `acceptance-scenarios.md` | AS items: Given/When/Then test scenarios for each command |
| `edge-cases.md` | EC items: boundary condition handling |
| `success-criteria.md` | SC items: measurable outcomes |
| `interface-requirements.md` | IF items: exact command signatures and output formats |
| `non-functional-requirements.md` | NF items: performance, reliability, compatibility |

## Requirements Summary

### Functional Requirements (FR)

| ID | Type | Priority | Title |
|----|------|----------|-------|
| S009-FR-001 | FR | P1 | `sir run <workflow>` executes a named workflow |
| S009-FR-002 | FR | P1 | `sir run` requires a valid workflow name |
| S009-FR-003 | FR | P1 | `sir run --dry-run` shows plan without executing |
| S009-FR-004 | FR | P1 | `sir run --yes` skips all confirmation prompts |
| S009-FR-005 | FR | P1 | `sir run --non-interactive` runs without prompts |
| S009-FR-006 | FR | P1 | Required inputs are gathered interactively unless in non-interactive mode |
| S009-FR-007 | FR | P1 | Optional inputs use default values when not provided |
| S009-FR-008 | FR | P1 | `sir plan <workflow>` shows execution plan without running |
| S009-FR-009 | FR | P1 | `sir plan` requires a valid workflow name |
| S009-FR-010 | FR | P1 | `sir where` displays resolved `.sir/` layers in precedence order |
| S009-FR-011 | FR | P1 | `sir workflows:list` lists all discovered workflows with type and layer |
| S009-FR-012 | FR | P1 | `sir workflows:show <workflow>` displays workflow details |
| S009-FR-013 | FR | P1 | `sir recipes:install <source>` installs a pack from git source |
| S009-FR-014 | FR | P1 | `sir recipes:install --project` installs to project `.sir/packs` |
| S009-FR-015 | FR | P1 | `sir recipes:list` lists installed packs |
| S009-FR-016 | FR | P1 | `sir recipes:list --project` lists project-level packs |
| S009-FR-017 | FR | P1 | `sir recipes:remove <id>` removes an installed pack |
| S009-FR-018 | FR | P1 | `sir recipes:remove` prompts for confirmation |
| S009-FR-019 | FR | P1 | `sir recipes:update` is stubbed in v1 |
| S009-FR-020 | FR | P1 | Exit code 0 on success, non-zero on failure |
| S009-FR-021 | FR | P1 | Workflow name resolution across layers follows S001 precedence |
| S009-FR-022 | FR | P2 | `sir agent tools` lists workflows as machine-readable tools |
| S009-FR-023 | FR | P2 | `sir agent plan <workflow>` shows dry-run plan for AI |
| S009-FR-024 | FR | P2 | `sir agent run <workflow>` runs with confirmation |
| S009-FR-025 | FR | P1 | `sir list` auto-generated by Laravel Zero |

### Acceptance Scenarios (AS)

| ID | Type | Priority | Title |
|----|------|----------|-------|
| S009-AS-001 | AS | P1 | User runs workflow with all required inputs provided |
| S009-AS-002 | AS | P1 | User runs workflow with missing required inputs in interactive mode |
| S009-AS-003 | AS | P1 | User runs workflow in non-interactive mode with missing required inputs |
| S009-AS-004 | AS | P1 | User runs workflow with `--dry-run` |
| S009-AS-005 | AS | P1 | User runs workflow with `--yes` flag |
| S009-AS-006 | AS | P1 | User runs non-existent workflow |
| S009-AS-007 | AS | P1 | User runs workflow and workflow fails during execution |
| S009-AS-008 | AS | P1 | User runs workflow and workflow succeeds |
| S009-AS-009 | AS | P1 | User views execution plan with `sir plan` |
| S009-AS-010 | AS | P1 | User views plan for non-existent workflow |
| S009-AS-011 | AS | P1 | User views plan for workflow with no steps |
| S009-AS-012 | AS | P1 | User views loaded layers with `sir where` |
| S009-AS-013 | AS | P1 | User lists workflows with `sir workflows:list` |
| S009-AS-014 | AS | P1 | User shows workflow details with `sir workflows:show` |
| S009-AS-015 | AS | P1 | User installs pack with `sir recipes:install <source>` |
| S009-AS-016 | AS | P1 | User installs pack to project with `sir recipes:install <source> --project` |
| S009-AS-017 | AS | P1 | User lists global packs with `sir recipes:list` |
| S009-AS-018 | AS | P1 | User lists project packs with `sir recipes:list --project` |
| S009-AS-019 | AS | P1 | User removes pack with confirmation |
| S009-AS-020 | AS | P1 | User removes pack and declines confirmation |
| S009-AS-021 | AS | P2 | User runs `sir recipes:update` and sees stub message |
| S009-AS-022 | AS | P2 | AI agent lists tools via `sir agent tools` |
| S009-AS-023 | AS | P2 | AI agent plans workflow via `sir agent plan <workflow>` |
| S009-AS-024 | AS | P2 | AI agent runs workflow via `sir agent run <workflow>` |
| S009-AS-025 | AS | P2 | AI agent declines confirmation in `sir agent run` |
| S009-AS-026 | AS | P1 | User runs `sir list` and sees all available commands |

### Edge Cases (EC)

| ID | Priority | Scenario |
|----|----------|----------|
| S009-EC-001 | P1 | Workflow name does not exist |
| S009-EC-002 | P1 | Required input not provided in non-interactive mode |
| S009-EC-003 | P1 | Empty workflow (no steps) |
| S009-EC-004 | P1 | No `.sir/` layers found |
| S009-EC-005 | P2 | Pack source is invalid or unreachable |
| S009-EC-006 | P2 | Pack already installed |
| S009-EC-007 | P1 | Pack ID does not exist |
| S009-EC-008 | P2 | Pack removal fails (permissions, lock) |
| S009-EC-009 | P1 | Confirmation denied on `recipes:remove` |
| S009-EC-010 | P1 | Non-interactive mode without `--yes` on confirmation-gated commands |
| S009-EC-011 | P2 | Workflow with only shell steps |
| S009-EC-012 | P2 | Workflow with only method steps |
| S009-EC-013 | P2 | Workflow with only task steps |
| S009-EC-014 | P3 | Very long workflow name (255+ chars) |
| S009-EC-015 | P2 | Input value provided as CLI argument after workflow name |
| S009-EC-016 | P2 | Input value provided as CLI option |
| S009-EC-017 | P2 | Input has a default value |
| S009-EC-018 | P2 | Workflow step fails during execution |
| S009-EC-019 | P2 | Workflow step has saveAs variable |
| S009-EC-020 | P3 | Multiple workflows with the same name across layers |
| S009-EC-021 | P3 | Pack with no metadata |

### Success Criteria (SC)

| ID | Priority | Criterion |
|----|----------|-----------|
| S009-SC-001 | P1 | `sir run <workflow>` executes the workflow and exits 0 on success |
| S009-SC-002 | P1 | `sir run --dry-run` prints plan without executing and exits 0 |
| S009-SC-003 | P1 | `sir run --yes` skips confirmation prompts and executes |
| S009-SC-004 | P1 | `sir run --non-interactive` skips interactive prompts |
| S009-SC-005 | P1 | `sir run <nonexistent>` exits 1 with error message |
| S009-SC-006 | P1 | `sir plan <workflow>` displays step-by-step plan and exits 0 |
| S009-SC-007 | P1 | `sir plan <nonexistent>` exits 1 with error message |
| S009-SC-008 | P1 | `sir where` displays layers in precedence order and exits 0 |
| S009-SC-009 | P1 | `sir workflows:list` shows all workflows with type and layer |
| S009-SC-010 | P1 | `sir workflows:show <workflow>` displays inputs, steps, metadata |
| S009-SC-011 | P1 | `sir recipes:install <source>` installs pack and exits 0 |
| S009-SC-012 | P1 | `sir recipes:install` with invalid source exits 1 |
| S009-SC-013 | P1 | `sir recipes:list` shows installed packs |
| S009-SC-014 | P1 | `sir recipes:remove <id>` removes pack after confirmation |
| S009-SC-015 | P1 | `sir recipes:remove` cancelled exits 0 |
| S009-SC-016 | P1 | `sir recipes:update` outputs stub message and exits 0 |
| S009-SC-017 | P1 | Failed workflow step results in exit code 1 |
| S009-SC-018 | P2 | `sir agent tools` lists all workflows, methods, tasks |
| S009-SC-019 | P2 | `sir agent plan` delegates to PlanCommand |
| S009-SC-020 | P2 | `sir agent run` shows plan, prompts confirmation, delegates |
| S009-SC-021 | P1 | `sir list` shows all available commands |
| S009-SC-022 | P1 | All commands follow exit code conventions (0 success, non-zero failure) |

### Interface Requirements (IF)

| ID | Priority | Description |
|----|----------|-------------|
| S009-IF-001 | P1 | `sir run <workflow>` signature and output format |
| S009-IF-002 | P1 | `sir plan <workflow>` signature and output format |
| S009-IF-003 | P1 | `sir where` signature and output format |
| S009-IF-004 | P1 | `sir workflows:list` signature and output format |
| S009-IF-005 | P1 | `sir workflows:show <workflow>` signature and output format |
| S009-IF-006 | P1 | `sir recipes:install <source>` signature and output format |
| S009-IF-007 | P1 | `sir recipes:list` signature and output format |
| S009-IF-008 | P1 | `sir recipes:remove <id>` signature and output format |
| S009-IF-009 | P1 | `sir recipes:update` signature and output format |
| S009-IF-010 | P2 | `sir agent tools` signature and output format |
| S009-IF-011 | P2 | `sir agent plan <workflow>` signature and output format |
| S009-IF-012 | P2 | `sir agent run <workflow>` signature and output format |
| S009-IF-013 | P1 | Error output format |
| S009-IF-014 | P1 | Confirmation prompt format |
| S009-IF-015 | P1 | Input gathering prompt format |

### Non-Functional Requirements (NF)

| ID | Priority | Description |
|----|----------|-------------|
| S009-NF-001 | P1 | Command execution latency within 2s for workflows with up to 50 steps |
| S009-NF-002 | P1 | Plan generation within 1s for workflows with up to 50 steps |
| S009-NF-003 | P1 | Workflow discovery completes within 2s for 100 workflows |
| S009-NF-004 | P1 | Pack installation completes within 30s for typical git sources |
| S009-NF-005 | P1 | All commands exit with code 0 on success, non-zero on failure |
| S009-NF-006 | P1 | Error messages are descriptive and include the failed entity name |
| S009-NF-007 | P1 | Commands work in non-interactive (TTY-less) environments |
| S009-NF-008 | P1 | `--yes` flag suppresses all confirmation prompts |
| S009-NF-009 | P1 | `--non-interactive` flag suppresses all interactive input gathering |
| S009-NF-010 | P1 | Help text available via `--help` on all commands |
| S009-NF-011 | P2 | Pack removal is idempotent (safe to re-run) |
| S009-NF-012 | P2 | Workflow execution output uses distinct visual styling |
| S009-NF-013 | P2 | Table output uses Laravel Zero's `$this->table()` formatting |

## Cross-Spec Dependencies

- **Depends on:** S001 (Layer Resolution), S003 (Workflow Engine), S005 (Pack System)
- **Required by:** S008 (AI Agent Interface), Future MCP server integration

## Notes

- `sir recipes:update` is explicitly stubbed in v1; S013 will implement pack updates.
- The `--yes` flag behavior is distinct from `--non-interactive`: `--yes` answers "yes" to confirmation prompts but still gathers required inputs interactively (unless combined with `--non-interactive`). `--non-interactive` skips all interactive prompts and uses defaults for optional inputs.
- Workflow name resolution across layers means the first match wins, per S001 layer precedence.
