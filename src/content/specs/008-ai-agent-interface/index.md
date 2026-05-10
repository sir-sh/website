# S008: AI Agent Interface

| Field | Value |
|-------|-------|
| Spec | S008 |
| Feature | AI Agent Interface |
| Date | 2026-04-23 |
| Status | Implemented | Last Updated | 2026-05-10 |
| Project | sir.sh CLI (`/Users/mark/Projects/Sir/cli`) |
| Tech Stack | PHP 8.2, Laravel Zero |

## Overview

The AI Agent Interface provides an MCP-style tool surface that allows AI assistants (Claude, GPT, etc.) to discover, inspect, and execute sir.sh workflows programmatically. The interface is exposed through the `sir agent` command with three subcommands: `tools`, `plan`, and `run`.

The `tools` subcommand lists all available workflows, pack methods, and built-in tasks in a structured format that an AI agent can parse to understand what automation is available. The `plan` subcommand shows a dry-run execution plan for a named workflow, revealing each step, its type, effects (network, writes, interactive), and variable flow -- without executing anything. The `run` subcommand executes a workflow but interposes a confirmation prompt before proceeding, giving the AI (or supervising human) a chance to abort destructive operations.

The current implementation outputs human-readable text. This spec defines requirements for both the existing human-readable output and a future JSON output mode (`--json` flag) that produces machine-parseable structured output suitable for MCP tool integration. The JSON mode is the primary value-add for AI agent consumers.

## User Scenarios

S008-US-001 [P1] As an AI assistant, I want to list all available workflows, methods, and tasks so that I know what automation I can invoke on behalf of the user.

S008-US-002 [P1] As an AI assistant, I want to see the execution plan for a workflow before running it so that I can evaluate whether the steps are safe and appropriate.

S008-US-003 [P1] As an AI assistant, I want to execute a workflow with a confirmation gate so that destructive operations require explicit approval.

S008-US-004 [P2] As an AI assistant, I want to receive tool listings in JSON format so that I can programmatically parse capabilities without scraping human-readable text.

S008-US-005 [P2] As an AI assistant, I want to receive execution plans in JSON format so that I can evaluate effects (network, writes, interactive) programmatically.

S008-US-006 [P2] As an AI assistant, I want to skip the confirmation prompt with a `--yes` flag when running workflows so that I can execute non-interactively after independently confirming safety.

S008-US-007 [P3] As an AI assistant, I want the help output to describe available subcommands and their purpose so that I can self-discover the interface without documentation.

## Spec Files

| File | Description |
|------|-------------|
| `index.md` | This overview, user scenarios, and requirements summary |
| `functional-requirements.md` | FR items: command structure, tools, plan, run requirements |
| `acceptance-scenarios.md` | AS items: Given/When/Then test scenarios |
| `edge-cases.md` | EC items: boundary condition handling |
| `success-criteria.md` | SC items: measurable outcomes |
| `interface-requirements.md` | IF items: command signature, output formats, JSON schemas |
| `non-functional-requirements.md` | NF items: performance, reliability, compatibility |

## Requirements Summary

### Functional Requirements (FR)

| ID | Priority | Title |
|----|----------|-------|
| S008-FR-001 | P1 | Three subcommands: tools, plan, run |
| S008-FR-002 | P1 | Command signature: `sir agent {action=tools} {workflow?}` |
| S008-FR-003 | P1 | Unknown action shows help and exits 0 |
| S008-FR-004 | P1 | tools lists all discoverable workflows |
| S008-FR-005 | P1 | tools lists all discoverable methods |
| S008-FR-006 | P1 | tools lists all built-in tasks |
| S008-FR-007 | P1 | Tool discovery refreshes on each call (not cached) |
| S008-FR-008 | P1 | plan requires workflow argument |
| S008-FR-009 | P1 | plan delegates to PlanCommand |
| S008-FR-010 | P1 | plan shows step-by-step execution without executing |
| S008-FR-011 | P1 | run requires workflow argument |
| S008-FR-012 | P1 | run shows plan then prompts for confirmation |
| S008-FR-013 | P1 | run cancels execution if confirmation denied |
| S008-FR-014 | P1 | run delegates to RunWorkflowCommand on confirm |
| S008-FR-015 | P2 | JSON output mode for tools (`--json` flag) |
| S008-FR-016 | P2 | JSON output mode for plan (`--json` flag) |
| S008-FR-017 | P2 | --yes flag skips confirmation in run |
| S008-FR-018 | P1 | Exit code 0 on success, 1 on failure |

### Acceptance Scenarios (AS)

| ID | Priority | Title |
|----|----------|-------|
| S008-AS-001 | P1 | AI discovers tools via `sir agent tools` |
| S008-AS-002 | P1 | AI plans a workflow via `sir agent plan <workflow>` |
| S008-AS-003 | P1 | AI runs with confirmation (user answers y) |
| S008-AS-004 | P1 | AI runs without confirmation (user answers n) |
| S008-AS-005 | P2 | AI runs with --yes flag (skips confirmation) |
| S008-AS-006 | P1 | plan with missing workflow argument exits 1 |
| S008-AS-007 | P1 | run with missing workflow argument exits 1 |
| S008-AS-008 | P1 | Unknown action shows help and exits 0 |
| S008-AS-009 | P1 | Default action is tools |
| S008-AS-010 | P2 | JSON tools output is machine-parseable |
| S008-AS-011 | P2 | JSON plan output is machine-parseable |
| S008-AS-012 | P1 | Plan with non-existent workflow exits 1 |

### Edge Cases (EC)

| ID | Priority | Scenario |
|----|----------|----------|
| S008-EC-001 | P1 | No workflows, methods, or tasks discovered |
| S008-EC-002 | P1 | Workflow with zero steps |
| S008-EC-003 | P1 | Workflow name does not exist (plan) |
| S008-EC-004 | P1 | Workflow name does not exist (run) |
| S008-EC-005 | P2 | Method with no description |
| S008-EC-006 | P2 | Task with no description |
| S008-EC-007 | P1 | Unknown action string shows help |
| S008-EC-008 | P1 | Workflow file unavailable after tools listing |
| S008-EC-009 | P1 | Confirmation timeout in non-interactive mode |
| S008-EC-010 | P2 | Non-interactive run without --yes fails gracefully |
| S008-EC-011 | P2 | Non-interactive run with --yes succeeds |
| S008-EC-012 | P2 | Invalid workflow YAML in discovered file |
| S008-EC-013 | P3 | Very long workflow name (255+ chars) |
| S008-EC-014 | P2 | Workflow with only shell steps |
| S008-EC-015 | P1 | Confirmation denied in run |
| S008-EC-016 | P2 | JSON mode with empty tool list |
| S008-EC-017 | P1 | Empty string workflow argument |

### Success Criteria (SC)

| ID | Priority | Criterion |
|----|----------|-----------|
| S008-SC-001 | P1 | All three subcommands respond without error |
| S008-SC-002 | P1 | tools output includes all discoverable items |
| S008-SC-003 | P1 | plan output matches PlanCommand output |
| S008-SC-004 | P1 | run delegates to RunWorkflowCommand |
| S008-SC-005 | P1 | Default action is tools |
| S008-SC-006 | P1 | Unknown action shows help and exits 0 |
| S008-SC-007 | P1 | Missing workflow argument (plan) exits 1 |
| S008-SC-008 | P1 | Missing workflow argument (run) exits 1 |
| S008-SC-009 | P1 | Confirmation cancellation exits 0 |
| S008-SC-010 | P2 | JSON tools output is valid JSON |
| S008-SC-011 | P2 | JSON plan output is valid JSON |
| S008-SC-012 | P2 | --yes skips confirmation |
| S008-SC-013 | P2 | Agent can round-trip tools then plan |
| S008-SC-014 | P2 | Tool discovery is not cached |

### Interface Requirements (IF)

| ID | Priority | Description |
|----|----------|-------------|
| S008-IF-001 | P1 | AgentCommand signature: `sir agent {action=tools} {workflow?} {--yes}` |
| S008-IF-002 | P1 | Human-readable `sir agent tools` output format |
| S008-IF-003 | P1 | Human-readable `sir agent plan` delegates to PlanCommand |
| S008-IF-004 | P1 | `sir agent run` confirmation flow |
| S008-IF-005 | P1 | Error output format |
| S008-IF-006 | P2 | `sir agent tools --json` JSON schema |
| S008-IF-007 | P2 | `sir agent plan <workflow> --json` JSON schema |
| S008-IF-008 | P2 | `sir agent run --json` passthrough |
| S008-IF-009 | P2 | Help text format |

### Non-Functional Requirements (NF)

| ID | Priority | Description |
|----|----------|-------------|
| S008-NF-001 | P1 | Tool discovery latency within 2s for 100 workflows, 50 methods, 20 tasks |
| S008-NF-002 | P1 | Plan generation within 1s for workflows with up to 50 steps |
| S008-NF-003 | P1 | tools subcommand must not cache discovery results |
| S008-NF-004 | P1 | Workflow file errors surfaced clearly with name and reason |
| S008-NF-005 | P1 | Invalid YAML in workflow file does not cause tools to fail |
| S008-NF-006 | P1 | Human-readable output uses distinct visual styling |
| S008-NF-007 | P1 | JSON output formatted with 2-space indentation |
| S008-NF-008 | P2 | Output compatible with MCP tool schema |
| S008-NF-009 | P2 | Works in non-interactive (TTY-less) environments |
| S008-NF-010 | P1 | Missing workflow argument errors include correct usage string |
| S008-NF-011 | P1 | Runtime errors from workflow execution propagated with exit code 1 |
| S008-NF-012 | P2 | Memory usage during tools stays below 128MB |

## Cross-Spec Dependencies

- **Depends on:** S001 (LayerResolver -- layer discovery for workflow/method resolution), S003 (WorkflowEngine -- workflow loading and execution), S004 (TemplateSystem -- template resolution in method arguments)
- **Required by:** Future MCP server integration, AI agent tooling consumers