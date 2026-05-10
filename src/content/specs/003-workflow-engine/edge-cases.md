# S003 Edge Cases

| ID | Scenario | Expected Behavior |
|----|----------|-------------------|
| S003-EC-001 | Workflow file not found | The runner **MUST** throw a `RuntimeException` with message `"Workflow not found: {name}"` and return exit code 1 |
| S003-EC-002 | Step with no type key (method/task/shell) | The runner **MUST** throw a `RuntimeException` with message `"Step {N} has no type key"` |
| S003-EC-003 | Method not found in registry | The runner **MUST** throw a `RuntimeException` with message `"Method not found: {methodName}"` |
| S003-EC-004 | Task not found in registry | The runner **MUST** throw a `RuntimeException` with message `"Task not found: {taskName}"` |
| S003-EC-005 | Empty steps array | The runner **MUST** complete successfully with no steps executed, displaying a message that no steps were run |
| S003-EC-006 | No workflows in any layer | The `workflows:list` command **MUST** display a warning message and a hint about where to create workflows |
| S003-EC-007 | Required input missing in non-interactive mode | The runner **MUST** skip the input, leave the variable undefined, and continue. If a subsequent step references the undefined variable, template resolution **MUST** produce an empty string |
| S003-EC-008 | Undefined template variable referenced | `Context.resolveTemplate()` **MUST** return an empty string for undefined variables without throwing |
| S003-EC-009 | Shell step returns non-zero exit code | The runner **MUST** throw a `RuntimeException` with message `"Step {N} failed: shell command exited with code {code}"` |
| S003-EC-010 | Circular saveAs dependency | The runner **MUST** throw a `RuntimeException` with message `"Circular saveAs dependency detected involving {varName}"` if a step references a variable that would be set by a later step |
| S003-EC-011 | Invalid workflow YAML (bad syntax) | `WorkflowLoader.load()` **MUST** throw a `RuntimeException` with message `"Failed to parse workflow file: {path}: {yamlError}"` |
| S003-EC-012 | Workflow YAML missing `inputs` key | The `RunWorkflowCommand` **MUST** treat it as zero inputs, not error |