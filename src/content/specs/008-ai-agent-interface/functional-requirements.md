# S008 Functional Requirements

## Core Command Structure

S008-FR-001 [P1] The `sir agent` command **MUST** accept exactly three subcommands: `tools`, `plan`, and `run`.

S008-FR-001.a The default action when no subcommand is provided **MUST** be `tools`.

S008-FR-002 [P1] The command signature **MUST** be `sir agent {action=tools} {workflow?}`.

S008-FR-003 [P1] Unknown action values **MUST** display help text and exit with code 0.

## sir agent tools

S008-FR-004 [P1] The `tools` subcommand **MUST** list all discoverable workflows, methods, and built-in tasks.

S008-FR-005 [P1] The tools listing **MUST** discover workflows via `WorkflowLoader::discoverWorkflows()` and list each by name.

S008-FR-006 [P1] The tools listing **MUST** discover methods via `MethodRegistry::discoverMethods()` and list each by name with its description.

S008-FR-007 [P1] The tools listing **MUST** list all built-in tasks from `TaskRegistry::all()` with their descriptions.

S008-FR-008 [P1] Tool discovery **MUST** refresh on each call (not cached between invocations).

S008-FR-009 [P2] In human-readable mode, workflow entries **SHOULD** show only the name; method entries **SHOULD** show name and description.

S008-FR-010 [P2] In JSON mode (`--json` flag), each workflow entry **MUST** include `name`, `description`, and `inputs` array.

S008-FR-011 [P2] In JSON mode, each method entry **MUST** include `name`, `description`, and `inputs` array.

S008-FR-012 [P2] In JSON mode, each task entry **MUST** include `name`, `description`, and `inputs` array.

S008-FR-013 [P2] Each tool's `inputs` array entry **MUST** include `name` (string), `type` (string), `required` (bool), and `description` (string).

## sir agent plan

S008-FR-014 [P1] The `plan` subcommand **MUST** require a workflow argument; absent argument **MUST** print an error and exit with code 1.

S008-FR-015 [P1] When a workflow argument is provided, `plan` **MUST** delegate to `PlanCommand` via `$this->call('plan', ['workflow' => $workflow])`.

S008-FR-016 [P1] The plan output **MUST** show step-by-step execution plan without executing any steps.

S008-FR-017 [P1] The plan output **MUST** display each step's type and effects (network, writes, interactive).

S008-FR-018 [P2] In JSON mode, plan output **MUST** be valid JSON with `steps` array containing `name`, `type`, `effects` objects.

## sir agent run

S008-FR-019 [P1] The `run` subcommand **MUST** require a workflow argument; absent argument **MUST** print an error and exit with code 1.

S008-FR-020 [P1] When a workflow argument is provided, `run` **MUST** first show the execution plan.

S008-FR-021 [P1] After displaying the plan, `run` **MUST** prompt for confirmation: `Execute this workflow? [y/N]`.

S008-FR-022 [P1] If the user declines confirmation, `run` **MUST** output `Cancelled.` and exit with code 0 (no execution).

S008-FR-023 [P1] If the user confirms, `run` **MUST** delegate to `RunWorkflowCommand` via `$this->call('run', ['workflow' => $workflow])`.

S008-FR-024 [P2] When `--yes` flag is provided, `run` **MUST** skip the confirmation prompt and proceed directly to execution.

S008-FR-025 [P2] Destructive or conflicting steps **SHOULD** trigger a secondary confirmation prompt before proceeding.

## Output Requirements

S008-FR-026 [P1] Human-readable output **MUST** use Laravel's output styles (comment, info, error, line).

S008-FR-027 [P1] Exit code **MUST** be 0 on success and 1 on failure.

S008-FR-028 [P2] JSON output **MUST** be valid, parseable JSON with no trailing commas or malformed structures.

## Help Text

S008-FR-029 [P2] The help output **MUST** describe all three subcommands: `tools`, `plan <workflow>`, and `run <workflow>`.

S008-FR-030 [P2] The help output **MUST** explain that `run` executes with confirmation.