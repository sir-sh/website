# S008 Edge Cases

| ID | Scenario | Expected Behavior |
|----|----------|-------------------|
| S008-EC-001 | No workflows, methods, or tasks discovered | `tools` output shows the section headings but each section is empty. Exit code 0. |
| S008-EC-002 | Workflow with zero steps | `plan` shows an empty steps list. `run` shows plan then prompts for confirmation. Execution proceeds with no steps. |
| S008-EC-003 | Workflow name does not exist (plan) | PlanCommand throws RuntimeException. Error message describes the missing workflow. Exit code 1. |
| S008-EC-004 | Workflow name does not exist (run) | RunWorkflowCommand throws RuntimeException. Error message describes the missing workflow. Exit code 1. |
| S008-EC-005 | Method with no description | The method entry in `tools` output shows the name without a trailing description. In JSON mode, `description` is `null` or empty string. |
| S008-EC-006 | Task with no description | The task entry in `tools` output shows the name without a trailing description. In JSON mode, `description` is `null` or empty string. |
| S008-EC-007 | Unknown action string | Help text is displayed. Exit code 0. No error is printed to stderr. |
| S008-EC-008 | Workflow file becomes unavailable after `tools` listing | The `tools` command succeeds (listing is a snapshot). Later `plan` or `run` on that workflow fails with RuntimeException. |
| S008-EC-009 | Confirmation timeout during `sir agent run` | If the terminal is non-interactive (no TTY), `$this->confirm()` returns `false`. Execution is cancelled. Exit code 0. |
| S008-EC-010 | Non-interactive mode with `sir agent run` (no --yes) | The `confirm()` call returns `false` because there is no TTY. Output is `Cancelled.` Exit code 0. |
| S008-EC-011 | Non-interactive mode with `sir agent run --yes` | Confirmation is bypassed. Execution proceeds. Exit code reflects RunWorkflowCommand result. |
| S008-EC-012 | Invalid workflow YAML in discovered workflow file | `discoverWorkflows()` skips the invalid file silently or logs a warning. `tools` output excludes the malformed workflow. No failure at discovery time. |
| S008-EC-013 | Very long workflow name (255+ chars) | `tools` output truncates display but preserves the full name. `plan` and `run` pass the full name to the underlying commands. |
| S008-EC-014 | Workflow with only shell steps (no effects metadata) | `plan` output shows steps with default `effects: {}`. No special handling required. |
| S008-EC-015 | Confirmation denied in run | Output is `Cancelled.`. Exit code 0. No side effects occur. |
| S008-EC-016 | JSON mode with empty tool list | Output is valid JSON: `{"workflows": [], "methods": [], "tasks": []}`. Exit code 0. |
| S008-EC-017 | Workflow argument is an empty string | Treated as missing workflow. Error message printed. Exit code 1. |