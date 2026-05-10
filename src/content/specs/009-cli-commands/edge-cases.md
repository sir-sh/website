# S009 Edge Cases

| ID | Scenario | Expected Behavior |
|----|----------|-------------------|
| S009-EC-001 | Workflow name does not exist in any layer | Exit 1, error message "Workflow '{name}' not found" |
| S009-EC-002 | Required input not provided in non-interactive mode | Exit 1, error message "Missing required input: {input}" |
| S009-EC-003 | Empty workflow (no steps defined) | Display "No steps to execute", exit 0 |
| S009-EC-004 | No `.sir/` layers found in project or global | Display "No .sir/ layers found", exit 0 with empty workflow list |
| S009-EC-005 | Pack source URL is invalid or unreachable | Exit 1, error message "Failed to clone repository: {reason}" |
| S009-EC-006 | Pack already installed | Exit 1, error message "Pack '{id}' is already installed" |
| S009-EC-007 | Pack ID does not exist for removal | Exit 1, error message "Pack '{id}' not found" |
| S009-EC-008 | Pack removal fails due to permissions | Exit 1, error message "Failed to remove pack: permission denied" |
| S009-EC-009 | Confirmation denied on `recipes:remove` | Exit 0, no changes made, message "Removal cancelled" |
| S009-EC-010 | Non-interactive mode used without `--yes` on confirmation-gated command | Prompt is skipped, proceed with default (no), exit 0 |
| S009-EC-011 | Workflow with only shell steps | All steps execute via shell, output displayed, exit 0 on success |
| S009-EC-012 | Workflow with only method steps | All steps execute via PHP method calls, exit 0 on success |
| S009-EC-013 | Workflow with only task steps | All steps execute via task runner, exit 0 on success |
| S009-EC-014 | Workflow name exceeds 255 characters | Exit 1, error message "Workflow name exceeds maximum length (255)" |
| S009-EC-015 | Input value provided as positional argument after workflow name | Parse remaining positional arguments as input values in order |
| S009-EC-016 | Input value provided as `--key=value` option | Map option name to input parameter, validate type |
| S009-EC-017 | Input has a default value and is not provided | Use default value for input |
| S009-EC-018 | Workflow step fails during execution | Exit 1, display step error, rollback if applicable |
| S009-EC-019 | Workflow step has `saveAs` variable assignment | Store step output in variable for use by subsequent steps |
| S009-EC-020 | Multiple workflows with the same name across layers | Use first match by layer precedence (per S001) |
| S009-EC-021 | Pack with no metadata (missing pack.json) | Use pack directory name as ID, source as provided URL |
| S009-EC-022 | `sir run` with both `--yes` and `--non-interactive` | `--non-interactive` takes precedence for input gathering, `--yes` for confirmations |
| S009-EC-023 | Workflow step times out | Exit 1, error message "Step '{step}' timed out after {n} seconds" |
| S009-EC-024 | Empty input provided for optional input | Use empty string as the input value |
| S009-EC-025 | Workflow name is a path (e.g., `path/to/workflow`) | Parse as workflow name, resolve against layers |