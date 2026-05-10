# S009 Functional Requirements

## Workflow Execution Commands

### sir run

S009-FR-001 [P1] The `sir run <workflow>` command **MUST** execute a named workflow found via layer resolution (S001).

S009-FR-002 [P1] The `sir run` command **MUST** require a valid workflow name argument; missing argument **MUST** print error `Workflow name required.` and exit with code 1.

S009-FR-003 [P1] The `--dry-run` flag **MUST** show the execution plan without executing any steps.

S009-FR-004 [P1] The `--yes` flag **MUST** skip all confirmation prompts (including destructive operation warnings) and proceed to execution.

S009-FR-005 [P1] The `--non-interactive` flag **MUST** run without any interactive prompts; required inputs **MUST** either have defaults or cause exit code 1.

S009-FR-006 [P1] Required inputs **MUST** be gathered interactively via `$this->ask()` unless `--non-interactive` is set.

S009-FR-007 [P1] Optional inputs **MUST** use their default values when not provided and not in non-interactive mode.

S009-FR-008 [P1] Inputs may be provided as a positional argument after the workflow name (first unmatched non-flag argument), as a named option (`--<name>`), or gathered interactively.

S009-FR-009 [P1] Workflow execution **MUST** display the resolved workflow path from `_meta.path` before running.

S009-FR-010 [P1] Successful workflow execution **MUST** print `Workflow completed successfully` and exit with code 0.

S009-FR-011 [P1] Failed workflow execution **MUST** print the error message and exit with code 1.

### sir plan

S009-FR-012 [P1] The `sir plan <workflow>` command **MUST** display the step-by-step execution plan without executing any steps.

S009-FR-013 [P1] The `sir plan` command **MUST** require a valid workflow name argument; missing argument **MUST** print error `Workflow not found: <name>` and exit with code 1.

S009-FR-014 [P1] Each step **MUST** display its number, type (`method`, `task`, `shell`), and name.

S009-FR-015 [P1] Each step **MUST** display its effects: network access (`⚠ Network access`), file writes (`✎ Writes: <paths>`), and interactive flag (`⌨ Interactive`).

S009-FR-016 [P1] Steps with `saveAs` **MUST** display `→ Saves to: <variable>`.

S009-FR-017 [P1] Plan output **MUST** end with a summary section showing total steps and all effect types present.

S009-FR-018 [P1] Workflows with no steps **MUST** display `No steps defined in workflow.` and exit with code 0.

### sir where

S009-FR-019 [P1] The `sir where` command **MUST** display all resolved `.sir/` layers in precedence order (first = highest priority).

S009-FR-020 [P1] Layer entries **MUST** be numbered in precedence order.

S009-FR-021 [P1] When no layers are found, `sir where` **MUST** display a help message and exit with code 0.

### sir workflows:list

S009-FR-022 [P1] The `sir workflows:list` command **MUST** list all discovered workflows via `WorkflowLoader::discoverWorkflows()`.

S009-FR-023 [P1] Each workflow entry **MUST** display: Name, Type, and Layer.

S009-FR-024 [P1] The output **MUST** be formatted as a table with headers `Name`, `Type`, `Layer`.

S009-FR-025 [P1] When no workflows are found, `sir workflows:list` **MUST** display `No workflows found.` with a hint about `.sir/workflows/` directories.

### sir workflows:show

S009-FR-026 [P1] The `sir workflows:show <workflow>` command **MUST** display detailed information about a named workflow.

S009-FR-027 [P1] The display **MUST** include: Workflow name, path, layer, type, description (if present), inputs (if present), and steps (if present).

S009-FR-028 [P1] Each input **MUST** display: name, required status `(required)`, default value `[default: <value>]`, and description.

S009-FR-029 [P1] Each step **MUST** display: step number, type `[method|task|shell]`, name, and `saveAs` if present.

S009-FR-030 [P1] Non-existent workflow **MUST** print `Workflow not found: <name>` and exit with code 1.

## Pack Management Commands

### sir recipes:install

S009-FR-031 [P1] The `sir recipes:install <source>` command **MUST** install a pack from a git source URL.

S009-FR-032 [P1] The `source` argument **MUST** be required; missing argument **MUST** cause appropriate error handling.

S009-FR-033 [P1] The `--project` flag **MUST** install the pack to project `.sir/packs/` instead of global `~/.sir/packs/`.

S009-FR-034 [P1] On success, `sir recipes:install` **MUST** display: pack ID, installation path, name, and description from metadata.

S009-FR-035 [P1] On failure, `sir recipes:install` **MUST** print `Failed to install pack: <error message>` and exit with code 1.

### sir recipes:list

S009-FR-036 [P1] The `sir recipes:list` command **MUST** list all installed packs from the global packs directory.

S009-FR-037 [P1] The `--project` flag **MUST** list packs from the project `.sir/packs/` directory instead.

S009-FR-038 [P1] Pack entries **MUST** display: ID, Name, Ref, and first 40 characters of description.

S009-FR-039 [P1] The output **MUST** be formatted as a table with headers `ID`, `Name`, `Ref`, `Description`.

S009-FR-040 [P1] When no packs are found, `sir recipes:list` **MUST** display `No <scope> packs installed.` with a hint about `sir recipes:install`.

### sir recipes:remove

S009-FR-041 [P1] The `sir recipes:remove <id>` command **MUST** remove an installed pack by ID.

S009-FR-042 [P1] The `id` argument **MUST** be required; missing argument **MUST** cause appropriate error handling.

S009-FR-043 [P1] The `--project` flag **MUST** remove from project `.sir/packs/` instead of global.

S009-FR-044 [P1] Before removal, `sir recipes:remove` **MUST** prompt for confirmation: `Remove <scope> pack '<id>'?`.

S009-FR-045 [P1] If confirmation is denied, `sir recipes:remove` **MUST** output `Cancelled.` and exit with code 0.

S009-FR-046 [P1] On successful removal, `sir recipes:remove` **MUST** output `Pack removed: <id>` and exit with code 0.

S009-FR-047 [P1] On failure, `sir recipes:remove` **MUST** print `Failed to remove pack: <error message>` and exit with code 1.

### sir recipes:update

S009-FR-048 [P1] The `sir recipes:update` command **MUST** be stubbed in v1.

S009-FR-049 [P1] `sir recipes:update` **MUST** output `Pack update functionality is not yet implemented.` and exit with code 0.

S009-FR-050 [P1] `sir recipes:update` **MUST** suggest the remove-and-reinstall workaround.

## AI Agent Commands

### sir agent tools

S009-FR-051 [P1] The `sir agent tools` command **MUST** list all discoverable workflows, methods, and built-in tasks.

S009-FR-052 [P1] Workflows **MUST** be discovered via `WorkflowLoader::discoverWorkflows()` on each call.

S009-FR-053 [P1] Methods **MUST** be discovered via `MethodRegistry::discoverMethods()` on each call.

S009-FR-054 [P1] Tool discovery **MUST NOT** be cached between invocations.

### sir agent plan

S009-FR-055 [P1] The `sir agent plan <workflow>` command **MUST** require a workflow argument.

S009-FR-056 [P1] `sir agent plan` **MUST** delegate to `PlanCommand` via `$this->call('plan', [...])`.

### sir agent run

S009-FR-057 [P1] The `sir agent run <workflow>` command **MUST** require a workflow argument.

S009-FR-058 [P1] `sir agent run` **MUST** first display the execution plan.

S009-FR-059 [P1] `sir agent run` **MUST** prompt for confirmation: `Execute this workflow? [y/N]`.

S009-FR-060 [P1] If confirmed, `sir agent run` **MUST** delegate to `RunWorkflowCommand`.

S009-FR-061 [P1] If denied, `sir agent run` **MUST** output `Cancelled.` and exit with code 0.

## General CLI Conventions

S009-FR-062 [P1] Exit code **MUST** be 0 on success and 1 on failure for all commands.

S009-FR-063 [P1] Error messages **MUST** be printed via `$this->error()` (red text in Laravel output).

S009-FR-064 [P1] Informational messages **MUST** be printed via `$this->info()`.

S009-FR-065 [P1] `sir list` **MUST** be auto-generated by Laravel Zero and list all available commands.

S009-FR-066 [P1] All commands **MUST** have `--help` available via Laravel Zero's built-in handling.

S009-FR-067 [P2] Confirmation prompts **SHOULD** accept `y`, `yes` (case-insensitive) as affirmative.

S009-FR-068 [P2] Confirmation prompts **SHOULD** accept `n`, `no`, or ENTER as negative (default).

## Workflow Name Resolution

S009-FR-069 [P1] Workflow names **MUST** be resolved across all `.sir/` layers per S001 precedence order.

S009-FR-070 [P1] The first matching workflow found in precedence order **MUST** be used.

S009-FR-071 [P2] When multiple workflows share the same name across layers, the higher-precedence layer wins.
