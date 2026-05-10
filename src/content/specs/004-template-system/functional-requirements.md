# S004 Functional Requirements

## Variable Substitution

S004-FR-001 [P1] The system **MUST** replace `{{variableName}}` expressions in a template string with the value of the named variable from the current `Context`.

S004-FR-001.a The variable name is extracted by trimming whitespace from the content between `{{` and `}}`.

S004-FR-001.b The resolved value **MUST** be cast to a string via PHP's `(string)` cast before insertion.

S004-FR-002 [P1] When a referenced variable does not exist in the `Context`, the system **MUST** resolve the expression to the empty string `""`.

S004-FR-002.a The system **MUST NOT** throw an exception or emit a warning for missing variables.

## Template Functions

S004-FR-003 [P1] The system **MUST** support a `shellQuote(variableName)` function inside `{{...}}` expressions that returns the variable's value wrapped by PHP's `escapeshellarg()`.

S004-FR-003.a If the variable is undefined, `shellQuote` **MUST** shell-quote the empty string (producing `''`).

S004-FR-003.b The argument to `shellQuote()` **MUST** be a simple variable name (not a nested path or another function call).

S004-FR-004 [P2] The system **MUST** support a `default(variableName, 'fallback')` function inside `{{...}}` expressions that returns the variable's value when it exists in the `Context`, or the fallback literal otherwise.

S004-FR-004.a The fallback literal **MUST** be trimmed of surrounding single quotes, double quotes, and whitespace.

S004-FR-004.b If the variable exists but its value is the empty string, the system **MUST** return the fallback value (i.e., empty is treated as unset for `default()` purposes). **Note:** The current implementation returns the empty string rather than the fallback. This requirement documents the intended behavior; actual v1 behavior returns the context value even if empty.

S004-FR-004.c The first argument to `default()` **MUST** be a simple variable name.

## Call-Site Resolution

S004-FR-005 [P1] `WorkflowRunner` **MUST** resolve template expressions in every string value of the `with` argument map before passing arguments to `MethodExecutor::execute()`.

S004-FR-006 [P1] `WorkflowRunner` **MUST** resolve template expressions in every string value of the `with` argument map before passing arguments to `TaskRegistry` task execution.

S004-FR-007 [P1] `WorkflowRunner` **MUST** resolve template expressions in the `shell` value of a shell step before passing the command string to `Process::fromShellCommandline()`.

S004-FR-008 [P1] `MethodExecutor` **MUST** resolve template expressions in the `impl.command` string of a shell-type method before execution.

S004-FR-008.a `MethodExecutor` **MUST** set all validated method arguments into the `Context` before resolving the command template, so that argument values are available as `{{argName}}` in the command.

## Context Integration

S004-FR-009 [P1] When `Context::setInputs()` is called, all input key-value pairs **MUST** be merged into the variable store so that inputs are accessible via `{{inputName}}` expressions.

S004-FR-010 [P1] Template resolution **MUST** only be applied to string-typed values in `with` argument maps. Non-string values (integers, booleans, arrays, nulls) **MUST** be passed through unmodified.

## Composition

S004-FR-011 [P2] The system **MUST** support multiple `{{...}}` expressions within a single template string, resolving each independently.

S004-FR-011.a Example: `"Hello {{first}} {{last}}"` with `first=Jane`, `last=Doe` **MUST** resolve to `"Hello Jane Doe"`.

S004-FR-012 [P1] The system **MUST** tolerate whitespace inside expression delimiters. `{{ name }}`, `{{name}}`, and `{{ name}}` **MUST** all resolve identically.
