# S006 Functional Requirements

## Method Discovery

S006-FR-001 [P1] The MethodRegistry **MUST** discover methods by scanning `packs/*/methods/*.json` within each layer path returned by LayerResolver.

S006-FR-002 [P1] The MethodRegistry **MUST** discover methods from `methods/*.json` directories directly within each layer path (non-pack methods).

S006-FR-003 [P1] The MethodRegistry **MUST** namespace pack methods by prepending the pack's `namespace` field from `sir-pack.json`, using dot notation (e.g., `git.clone`).

S006-FR-004 [P1] When `sir-pack.json` is missing or has no `namespace` field, the MethodRegistry **MUST** fall back to the pack directory's basename as the namespace.

S006-FR-005 [P1] The method name **MUST** be taken from the `method` field in the JSON definition; if absent, the filename (without `.json` extension) **MUST** be used.

S006-FR-019 [P2] The MethodRegistry **MUST** read pack metadata from `sir-pack.json` at the pack root directory and parse it as JSON.
S006-FR-019.a If `sir-pack.json` does not exist, an empty metadata array **MUST** be returned.
S006-FR-019.b If `sir-pack.json` contains invalid JSON, an empty metadata array **MUST** be returned.

## Method Registration and Lookup

S006-FR-006 [P1] The MethodRegistry **MUST** support the following operations:
S006-FR-006.a `register(string $name, array $definition)` -- stores a method definition under the given name.
S006-FR-006.b `get(string $name): ?array` -- returns the method definition or `null` if not found.
S006-FR-006.c `has(string $name): bool` -- returns whether a method is registered.
S006-FR-006.d `all(): array` -- returns all registered method definitions keyed by name.

## Argument Validation

S006-FR-007 [P1] The MethodExecutor **MUST** throw `InvalidArgumentException` with the message `"Required argument missing: {name}"` when a required argument (where `required` is `true`) is not provided and has no default.

S006-FR-008 [P1] The MethodExecutor **MUST** apply the `default` value from the argument definition when the argument is not provided by the caller.

S006-FR-009 [P1] The MethodExecutor **MUST** cast provided argument values to their declared type using the following mapping:
S006-FR-009.a `int` -- cast to integer via `(int)`.
S006-FR-009.b `bool` -- cast to boolean via `(bool)`.
S006-FR-009.c `string` -- cast to string via `(string)`.
S006-FR-009.d `path` -- cast to string via `(string)`.
S006-FR-009.e `enum` -- cast to string via `(string)`.
S006-FR-009.f Any unknown type -- pass value through unchanged.

S006-FR-017 [P1] After validation, the MethodExecutor **MUST** set each validated argument into the Context instance via `$context->set($key, $value)` so that template resolution can access them.

## Shell Execution

S006-FR-010 [P1] When `impl.type` is `"shell"`, the MethodExecutor **MUST** execute the `impl.command` string as a shell command via `Process::fromShellCommandline()`.

S006-FR-011 [P1] Before execution, the MethodExecutor **MUST** resolve all `{{expression}}` template placeholders in the shell command string via `$context->resolveTemplate()`.
S006-FR-011.a The `{{variable}}` syntax **MUST** substitute the variable's value from Context.
S006-FR-011.b The `{{shellQuote(variable)}}` syntax **MUST** substitute the shell-escaped value.
S006-FR-011.c The `{{default(variable, 'fallback')}}` syntax **MUST** substitute the variable's value or the fallback.

S006-FR-013 [P1] When `$stream` is `true`, the MethodExecutor **MUST** stream stdout to `echo` and stderr to `STDERR` in real-time during shell execution.

S006-FR-014 [P2] When `$stream` is `false`, the MethodExecutor **MUST** buffer all output and return it in the result array without printing to the terminal.

## Exec Execution

S006-FR-012 [P1] When `impl.type` is `"exec"`, the MethodExecutor **MUST**:
S006-FR-012.a Create a `Process` instance from the `impl.command` array (array of command segments, not a shell string).
S006-FR-012.b Pass the validated arguments as JSON-encoded string to the process via `setInput()`.
S006-FR-012.c Parse the process stdout as JSON into an associative array.

## Result Structure

S006-FR-015 [P1] Shell execution **MUST** return an associative array with keys: `exitCode` (int), `output` (string), `errorOutput` (string), `success` (bool).

S006-FR-015.a [P1] Exec execution **MUST** return the parsed JSON output merged with keys: `exitCode` (int), `errorOutput` (string), `success` (bool).
S006-FR-015.b [P1] If exec stdout is not valid JSON, the result **MUST** contain `raw_output` (string) with the raw stdout content.

## Error Handling

S006-FR-016 [P1] The MethodExecutor **MUST** throw `InvalidArgumentException` with the message `"Unknown implementation type: {type}"` when `impl.type` is not `"shell"` or `"exec"`.

## Effects Metadata

S006-FR-018 [P2] Method definitions **MAY** include an `effects` object declaring side-effect metadata. The system **MUST** preserve this metadata in the registered definition for downstream consumers to inspect.
S006-FR-018.a `effects.network` (bool) -- indicates whether the method makes network requests.
S006-FR-018.b `effects.writes` (array of strings) -- paths the method may write to (may contain template expressions).
S006-FR-018.c `effects.interactive` (bool) -- indicates whether the method requires interactive input.

## Timeout

S006-FR-020 [P1] Both shell and exec process execution **MUST** set the process timeout to `null` (no timeout), allowing long-running methods to complete without interruption.
