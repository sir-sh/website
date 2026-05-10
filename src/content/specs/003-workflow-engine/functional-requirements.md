# S003 Functional Requirements

## Workflow Discovery

S003-FR-001 [P1] The `WorkflowLoader` **MUST** discover workflow files by iterating over all layer paths returned by `LayerResolver.resolve()` and scanning each layer's `workflows/` subdirectory for files matching `*.yml`, `*.yaml`, `*.sh`, and `*.php` extensions.

S003-FR-001.a The discovery **MUST** use `GLOB_BRACE` to match all four extensions in a single pass.

S003-FR-001.b Each discovered workflow **MUST** be represented as an associative array with keys: `name` (filename without extension), `path` (absolute file path), `layer` (the layer directory path), and `type` (file extension).

S003-FR-002 [P1] For YAML workflows (`.yml` and `.yaml`), the `WorkflowLoader.load()` method **MUST** parse the file using `Symfony\Component\Yaml\Yaml::parseFile()` and return the parsed definition with a `_meta` key containing the workflow's discovery metadata.

S003-FR-003 [P1] For script workflows (`.sh` and `.php`), the `WorkflowLoader.load()` method **MUST** return a definition with `type: 'script'`, empty `inputs` array, empty `steps` array, and the `_meta` key.

S003-FR-004 [P1] When multiple layers contain a workflow file with the same name, the first layer encountered (nearest layer) **MUST** take precedence. Subsequent layers **MUST NOT** override an already-discovered workflow name.

## Step Execution

S003-FR-005 [P1] The `WorkflowRunner.run()` method **MUST** execute steps sequentially in array order. Each step **MUST** complete (or fail) before the next step begins.

S003-FR-006 [P1] When a step contains a `method` key, the runner **MUST** resolve the method via `MethodRegistry.get()`, resolve template strings in the `with` arguments using `Context.resolveTemplate()`, and execute via `MethodExecutor.execute()`.

S003-FR-006.a If the method is not found in the registry, the runner **MUST** throw a `RuntimeException` with the message `"Method not found: {methodName}"`.

S003-FR-007 [P1] When a step contains a `task` key, the runner **MUST** resolve the task via `TaskRegistry.get()`, resolve template strings in the `with` arguments, and execute via `TaskInterface.execute()`.

S003-FR-007.a If the task is not found in the registry, the runner **MUST** throw a `RuntimeException` with the message `"Task not found: {taskName}"`.

S003-FR-008 [P1] When a step contains a `shell` key, the runner **MUST** resolve the shell command string via `Context.resolveTemplate()` and execute it using `Symfony\Component\Process\Process::fromShellCommandline()`.

S003-FR-008.a Shell execution **MUST** stream stdout and stderr in real-time during execution.

S003-FR-008.b The shell step **MUST** return an array with keys `exitCode`, `output`, `errorOutput`, and `success`.

S003-FR-009 [P1] When a step contains a `saveAs` key, the runner **MUST** store the step's return value in the `Context` under the specified variable name, making it available to all subsequent steps via template resolution.

## Template Resolution

S003-FR-010 [P1] The `Context.resolveTemplate()` method **MUST** replace all `{{expression}}` patterns in a string with the resolved value from the context variables.

S003-FR-010.a For simple variable references (`{{varName}}`), the system **MUST** return the variable's string value, or an empty string if the variable is not set.

S003-FR-010.b Template resolution in step `with` arguments **MUST** only apply to values that are strings. Non-string values **MUST** be passed through unchanged.

S003-FR-019 [P1] The template engine **MUST** support the following built-in functions:

S003-FR-019.a `shellQuote(varName)` -- **MUST** resolve the variable and return the value wrapped in `escapeshellarg()`.

S003-FR-019.b `default(varName, 'fallback')` -- **MUST** resolve the variable and return it if set, otherwise return the fallback value with surrounding quotes stripped.

## Input Handling

S003-FR-011 [P1] The `RunWorkflowCommand` **MUST** gather input values for each entry in the workflow's `inputs` definition by checking (in order): positional arguments after the workflow name, command-line options, and interactive prompts.

S003-FR-011.a When a required input is missing and the command is not in non-interactive mode, the command **MUST** prompt the user interactively, showing the input's `description` and `default` value.

S003-FR-011.b When a default is specified and the input is not provided, the default value **MUST** be used.

## Execution Modes

S003-FR-012 [P1] When the `--dry-run` flag is passed, the `WorkflowRunner` **MUST** iterate over all steps, output the step header for each, print a `[DRY RUN]` message, and skip actual execution. No side effects **MUST** occur.

S003-FR-013 [P1] When the `--non-interactive` flag is passed, the `RunWorkflowCommand` **MUST NOT** prompt the user for any input. Required inputs without defaults **MUST** be skipped (not gathered).

S003-FR-013.a The `--yes` flag **MUST** skip confirmation prompts during workflow execution.

## Plan Command

S003-FR-014 [P2] The `sir plan` command **MUST** load the specified workflow, iterate over its steps, and display each step's index, type (`method`, `task`, or `shell`), and name.

S003-FR-014.a For method and task steps, the plan command **SHOULD** display effect metadata (network access, file writes, interactive requirements) when available from the method/task definition.

S003-FR-014.b If a step has a `saveAs` key, the plan command **MUST** display the target variable name.

S003-FR-014.c The plan command **MUST** display a summary with total step count and aggregate effect flags.

## Listing and Display

S003-FR-015 [P2] The `sir workflows:list` command **MUST** display a table with columns `Name`, `Type`, and `Layer` for all discovered workflows.

S003-FR-015.a If no workflows are found, the command **MUST** display a warning message and a hint about where to create workflows.

S003-FR-016 [P2] The `sir workflows:show` command **MUST** display the workflow's path, layer, type, description (if present), all input definitions (with required/default/description annotations), and all steps (with index, type, name, and saveAs if present).

## Error Handling

S003-FR-017 [P1] If any step throws an exception during execution, the `WorkflowRunner` **MUST** immediately halt execution of remaining steps and re-throw a `RuntimeException` with the message `"Step {N} failed: {originalMessage}"`.

S003-FR-017.a The `RunWorkflowCommand` **MUST** catch the exception, display an error message, and return exit code `FAILURE` (1).

## Output Formatting

S003-FR-018 [P2] During execution, each step **MUST** be preceded by a header line showing the step number, name, and type in the format `"=== Step {N}: {name} [{type}] ==="`.

S003-FR-018.a On success, the runner **MUST** display a checkmark with the elapsed time in seconds.

S003-FR-018.b On failure, the runner **MUST** display a cross mark with the elapsed time and the error message.
