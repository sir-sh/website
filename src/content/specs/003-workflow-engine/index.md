# S003: Workflow Engine

| Field | Value |
|-------|-------|
| Spec | S003 |
| Feature | Workflow Engine |
| Date | 2026-04-23 |
| Status | Implemented | Last Updated | 2026-05-10 |

## Overview

The workflow engine is the core execution subsystem of sir.sh. It discovers, loads, validates, and executes YAML-defined workflows from `.sir/workflows/` directories found across all resolved layers. Workflows define a sequence of steps -- each invoking a pack method, a built-in task, or a raw shell command -- with support for input parameters, template variable interpolation, and inter-step data passing via `saveAs`.

The engine exposes four CLI commands: `sir run` for execution, `sir plan` for dry inspection, `sir workflows:list` for discovery, and `sir workflows:show` for detailed display. Execution supports dry-run mode (preview without side effects) and non-interactive mode (no prompts, suitable for CI).

Workflow files may be `.yml`, `.yaml`, `.sh`, or `.php`. YAML workflows are the primary format and are fully parsed into a structured definition with `description`, `inputs`, and `steps`. Shell and PHP workflows are treated as opaque scripts with metadata only.

## User Scenarios

S003-US-001 [P1] As a developer, I want to define a multi-step workflow in YAML so that I can automate repetitive tasks.

S003-US-002 [P1] As a developer, I want to run a workflow with `sir run <name>` so that the defined steps execute in order.

S003-US-003 [P1] As a developer, I want to preview a workflow with `sir plan <name>` so that I can see what would happen without executing anything.

S003-US-004 [P2] As a developer, I want to list all available workflows with `sir workflows:list` so that I can discover what is available across layers.

S003-US-005 [P2] As a developer, I want to inspect a workflow with `sir workflows:show <name>` so that I can see its inputs, steps, and metadata.

S003-US-006 [P1] As a CI pipeline, I want to run workflows non-interactively with `--non-interactive` so that no prompts block execution.

S003-US-007 [P2] As a developer, I want to dry-run a workflow with `--dry-run` so that I can verify the plan without side effects.

S003-US-008 [P1] As a developer, I want step outputs captured via `saveAs` so that later steps can reference earlier results.

## Requirements Summary

| ID | Type | Priority | Title |
|----|------|----------|-------|
| S003-FR-001 | Functional | P1 | Workflow discovery from layers |
| S003-FR-002 | Functional | P1 | YAML workflow parsing |
| S003-FR-003 | Functional | P1 | Script workflow metadata |
| S003-FR-004 | Functional | P1 | Layer precedence for workflows |
| S003-FR-005 | Functional | P1 | Sequential step execution |
| S003-FR-006 | Functional | P1 | Method step execution |
| S003-FR-007 | Functional | P1 | Task step execution |
| S003-FR-008 | Functional | P1 | Shell step execution |
| S003-FR-009 | Functional | P1 | saveAs context capture |
| S003-FR-010 | Functional | P1 | Template variable resolution |
| S003-FR-011 | Functional | P1 | Input parameter gathering |
| S003-FR-012 | Functional | P1 | Dry-run mode |
| S003-FR-013 | Functional | P1 | Non-interactive mode |
| S003-FR-014 | Functional | P2 | Execution plan display |
| S003-FR-015 | Functional | P2 | Workflow listing |
| S003-FR-016 | Functional | P2 | Workflow detail display |
| S003-FR-017 | Functional | P1 | Step failure halts execution |
| S003-FR-018 | Functional | P2 | Execution output formatting |
| S003-FR-019 | Functional | P1 | Template functions |
| S003-IF-001 | Interface | P1 | Workflow YAML schema |
| S003-IF-002 | Interface | P1 | Step definition schema |
| S003-IF-003 | Interface | P1 | Input definition schema |
| S003-IF-004 | Interface | P1 | Run command signature |
| S003-IF-005 | Interface | P2 | Plan command signature |
| S003-IF-006 | Interface | P2 | Workflows:list command signature |
| S003-IF-007 | Interface | P2 | Workflows:show command signature |
| S003-IF-008 | Interface | P1 | WorkflowRunner return structure |
| S003-IF-009 | Interface | P1 | Shell step return structure |
| S003-AS-001 | Acceptance | P1 | Run workflow with task step |
| S003-AS-002 | Acceptance | P1 | Run workflow with shell step |
| S003-AS-003 | Acceptance | P1 | Run workflow with method step |
| S003-AS-004 | Acceptance | P1 | saveAs passes data between steps |
| S003-AS-005 | Acceptance | P1 | Dry-run skips execution |
| S003-AS-006 | Acceptance | P1 | Non-interactive uses defaults |
| S003-AS-007 | Acceptance | P2 | Plan shows step details |
| S003-AS-008 | Acceptance | P2 | Workflows:list shows all workflows |
| S003-AS-009 | Acceptance | P2 | Workflows:show displays full definition |
| S003-AS-010 | Acceptance | P1 | Step failure stops workflow |
| S003-AS-011 | Acceptance | P1 | Template variables resolve in step args |
| S003-EC-001 | Edge Case | P1 | Workflow not found |
| S003-EC-002 | Edge Case | P1 | Step with no type key |
| S003-EC-003 | Edge Case | P1 | Method not found at runtime |
| S003-EC-004 | Edge Case | P1 | Task not found at runtime |
| S003-EC-005 | Edge Case | P2 | Empty steps array |
| S003-EC-006 | Edge Case | P2 | No workflows in any layer |
| S003-EC-007 | Edge Case | P1 | Required input missing in non-interactive |
| S003-EC-008 | Edge Case | P2 | Undefined template variable |
| S003-EC-009 | Edge Case | P2 | Shell step non-zero exit code |
| S003-EC-010 | Edge Case | P2 | Duplicate workflow name across layers |
| S003-EC-011 | Edge Case | P3 | Malformed YAML file |
| S003-EC-012 | Edge Case | P3 | Workflow with no inputs key |
| S003-SC-001 | Success | P1 | All step types execute correctly |
| S003-SC-002 | Success | P1 | Context propagation end-to-end |
| S003-SC-003 | Success | P2 | Plan output matches execution |
| S003-SC-004 | Success | P2 | Layer precedence correct |
| S003-NF-001 | Non-Functional | P2 | Step timing output |
| S003-NF-002 | Non-Functional | P2 | Shell timeout handling |
| S003-NF-003 | Non-Functional | P3 | Large workflow performance |
| S003-NF-004 | Non-Functional | P2 | Streaming shell output |

## Cross-Spec Dependencies

- **Depends on:** S001 (Layer Resolution) -- workflow discovery relies on `LayerResolver.resolve()`
- **Related:** Pack system (method discovery via `MethodRegistry`), Task system (`TaskRegistry`)
