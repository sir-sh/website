# S007 Functional Requirements

## TaskInterface Contract

S007-FR-001 [P1] Every built-in task **MUST** implement `App\Services\Tasks\TaskInterface`, which defines exactly two public methods: `execute(array $args, Context $context): mixed` and `getMetadata(): array`.

S007-FR-001.a The `execute` method **MUST** accept an associative array of arguments and a `Context` instance, and **MUST** return the task's result (typically an associative array).

S007-FR-001.b The `getMetadata` method **MUST** return an associative array containing at minimum the keys `name`, `description`, `args`, and `effects`.

## TaskRegistry

S007-FR-002 [P1] The `TaskRegistry` **MUST** be registered as a singleton in the Laravel service container via `AppServiceProvider::register()`.

S007-FR-002.a The singleton **MUST** be constructed once and reused across all injections (WorkflowRunner, AgentCommand, PlanCommand, RunWorkflowCommand).

S007-FR-003 [P1] The `AppServiceProvider` **MUST** register exactly six built-in tasks with the following names: `workspace.temp`, `files.write`, `files.writeMd`, `git.clone`, `tests.auto`, `coderabbit.review`.

S007-FR-003.a Each task name **MUST** follow the `namespace.action` or `namespace.actionModifier` naming convention.

## workspace.temp

S007-FR-004 [P1] The `workspace.temp` task **MUST** create a temporary directory under `sys_get_temp_dir()` using the pattern `{prefix}-{uniqid}`.

S007-FR-004.a The `prefix` argument **SHOULD** default to `sir-workspace` when not provided.

S007-FR-004.b The created directory **MUST** have permissions `0755`.

S007-FR-005 [P1] When the optional `repo` argument is provided, the task **MUST** also create a subdirectory named after the repository basename (without `.git` extension) inside the workspace directory.

S007-FR-005.a When `repo` is provided, the return array **MUST** include both `workspace` (parent temp dir) and `repoPath` (subdirectory path) keys.

S007-FR-005.b When `repo` is not provided, the return array **MUST** include only the `workspace` key.

## files.write

S007-FR-006 [P1] The `files.write` task **MUST** write the `content` argument to the file at `path` using `file_put_contents`.

S007-FR-006.a The `path` argument is required; the task **MUST** throw `InvalidArgumentException` if `path` is not provided.

S007-FR-006.b The `content` argument **MUST** default to an empty string when not provided.

S007-FR-007 [P1] If the parent directory of `path` does not exist, the task **MUST** create it recursively with permissions `0755` before writing.

## files.writeMd

S007-FR-008 [P1] The `files.writeMd` task **MUST** write markdown content to the file at `path`.

S007-FR-008.a The `path` argument is required; the task **MUST** throw `InvalidArgumentException` if `path` is not provided.

S007-FR-008.b The `content` argument **MUST** default to an empty string when not provided.

S007-FR-009 [P1] When the optional `title` argument is provided and truthy, the task **MUST** prepend `# {title}\n\n` to the content before writing.

S007-FR-009.a When `title` is `null` or not provided, the task **MUST** write `content` verbatim without any title prefix.

S007-FR-009.b The task **MUST** create parent directories recursively (same as `files.write`) if they do not exist.

## git.clone

S007-FR-010 [P1] The `git.clone` task **MUST** execute `git clone {repo} {folder}` via `Symfony\Component\Process\Process`.

S007-FR-010.a The `repo` argument is required; the task **MUST** throw `InvalidArgumentException` if `repo` is not provided.

S007-FR-011 [P1] When the optional `branch` argument is provided, the task **MUST** append `--branch {branch}` to the git clone command.

S007-FR-012 [P1] When the `folder` argument is not provided, the task **MUST** derive the target folder as `getcwd() . '/' . basename(repo, '.git')`.

S007-FR-012.a The clone process **MUST** have a timeout of 300 seconds.

S007-FR-012.b If the clone process fails (non-zero exit code), the task **MUST** throw `RuntimeException` with the error output.

## tests.auto

S007-FR-013 [P1] The `tests.auto` task **MUST** check for `package.json` in the working directory and detect an npm test command if the file contains a `scripts.test` key.

S007-FR-013.a When npm test is detected, the command **MUST** be `npm test`.

S007-FR-014 [P1] If no npm test command is found, the task **MUST** check for `composer.json` and detect a composer test command if the file contains a `scripts.test` key.

S007-FR-014.a When composer test is detected, the command **MUST** be `composer run-script test`.

S007-FR-015 [P1] When both `package.json` and `composer.json` exist with test scripts, npm **MUST** take precedence (checked first; composer is only checked if npm detection fails).

S007-FR-016 [P1] If neither package.json nor composer.json contains a test script, the task **MUST** throw `RuntimeException` with a message listing both supported project types and an example.

S007-FR-016.a The `cwd` argument **SHOULD** default to `getcwd()` when not provided.

S007-FR-016.b The test process **MUST** have a timeout of 600 seconds.

## coderabbit.review

S007-FR-017 [P2] The `coderabbit.review` task **MUST** first check if the `coderabbit` CLI is available via `which coderabbit`, and if so, execute `coderabbit review --target {target} --base {base}` in the working directory.

S007-FR-017.a The `target` argument is required; the task **MUST** throw `InvalidArgumentException` if `target` is not provided.

S007-FR-017.b The `base` argument **MUST** default to `main` when not provided.

S007-FR-017.c The coderabbit process **MUST** have a timeout of 300 seconds.

S007-FR-018 [P2] If the `coderabbit` CLI is not found, the task **MUST** check for the `gh` CLI via `which gh`, and if found, return guidance markdown instructing the user to create a PR manually for CodeRabbit to review.

S007-FR-018.a The gh CLI fallback return **MUST** include `method: 'gh-cli'` and a `markdown` key with step-by-step instructions.

S007-FR-019 [P2] If neither `coderabbit` nor `gh` CLI is available, the task **MUST** throw `RuntimeException` with installation instructions for both tools.

## Return Values and Metadata

S007-FR-020 [P1] Every built-in task **MUST** return an associative array from `execute()`. The specific keys depend on the task (documented in S007-IF-003 through S007-IF-008).

S007-FR-021 [P1] Every built-in task's `getMetadata()` **MUST** return an array with keys: `name` (string, dot-notation task name), `description` (string, human-readable), `args` (associative array of argument definitions), and `effects` (associative array declaring side effects).

S007-FR-021.a Each entry in `args` **MUST** include a `type` key (one of `string`, `path`).

S007-FR-021.b Each entry in `args` **SHOULD** include either `required: true`, `required: false`, or `default: <value>` to indicate obligation.

S007-FR-021.c The `effects` array **SHOULD** declare `writes` (array of path patterns) and/or `network` (boolean) as applicable.

## Workflow Integration

S007-FR-022 [P1] The `WorkflowRunner` **MUST** resolve template expressions in task arguments (via `Context::resolveTemplate`) before passing them to `TaskInterface::execute()`.

S007-FR-022.a Only string-typed argument values **MUST** be template-resolved; non-string values **MUST** be passed through unchanged.
