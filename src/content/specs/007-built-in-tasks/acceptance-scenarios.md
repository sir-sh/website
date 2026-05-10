# S007 Acceptance Scenarios

### S007-AS-001 Workflow step invokes task by name [P1]

**Given** a workflow YAML with a step `task: files.write` and `with: { path: '/tmp/out.txt', content: 'hello' }`
**When** the WorkflowRunner executes that step
**Then** it retrieves the task from TaskRegistry via `get('files.write')`, resolves template expressions in the `with` args, calls `execute()` with the resolved args and the current Context, and the file `/tmp/out.txt` is created with content `hello`.

### S007-AS-002 workspace.temp creates directory and returns path [P1]

**Given** the `workspace.temp` task is registered
**When** `execute(['prefix' => 'mywork'], $context)` is called
**Then** a directory matching `/tmp/mywork-*` is created on the filesystem, and the return array contains a `workspace` key whose value is the absolute path to the created directory.

### S007-AS-003 files.write creates file with content [P1]

**Given** the `files.write` task is registered and the directory `/tmp/test-dir` does not exist
**When** `execute(['path' => '/tmp/test-dir/output.txt', 'content' => 'test data'], $context)` is called
**Then** the directory `/tmp/test-dir` is created, the file `/tmp/test-dir/output.txt` exists with content `test data`, and the return array is `['path' => '/tmp/test-dir/output.txt', 'bytes' => 9]`.

### S007-AS-004 files.writeMd prepends title [P1]

**Given** the `files.writeMd` task is registered
**When** `execute(['path' => '/tmp/doc.md', 'content' => 'Body text', 'title' => 'My Title'], $context)` is called
**Then** the file `/tmp/doc.md` is created with content `# My Title\n\nBody text`, and the return `bytes` value equals `strlen("# My Title\n\nBody text")`.

### S007-AS-005 git.clone clones to target folder [P1]

**Given** the `git.clone` task is registered and a valid git repository URL
**When** `execute(['repo' => 'https://github.com/owner/repo.git', 'folder' => '/tmp/cloned-repo'], $context)` is called
**Then** the git clone process runs with `git clone https://github.com/owner/repo.git /tmp/cloned-repo`, and the return array contains `path`, `repo`, and `output` keys.

### S007-AS-006 tests.auto detects and runs npm tests [P1]

**Given** the `tests.auto` task is registered and the working directory contains a `package.json` with `{"scripts": {"test": "jest"}}`
**When** `execute(['cwd' => $workingDir], $context)` is called
**Then** the task runs `npm test`, and the return array contains `command` equal to `'npm test'`, `exitCode`, `output`, `errorOutput`, `markdown`, and `success` keys.

### S007-AS-007 tests.auto detects and runs composer tests [P1]

**Given** the `tests.auto` task is registered and the working directory contains a `composer.json` with `{"scripts": {"test": "pest"}}` but no `package.json`
**When** `execute(['cwd' => $workingDir], $context)` is called
**Then** the task runs `composer run-script test`, and the return array contains `command` equal to `'composer run-script test'`.

### S007-AS-008 coderabbit.review with coderabbit CLI [P2]

**Given** the `coderabbit.review` task is registered and the `coderabbit` CLI is installed and available on PATH
**When** `execute(['target' => 'feature/branch', 'base' => 'main'], $context)` is called
**Then** the task runs `coderabbit review --target feature/branch --base main`, and the return array contains `method` equal to `'coderabbit-cli'` and an `output` key with the CLI stdout.

### S007-AS-009 Task result captured via saveAs [P1]

**Given** a workflow step `task: workspace.temp` with `saveAs: ws`
**When** the WorkflowRunner executes that step and the task returns `['workspace' => '/tmp/sir-workspace-abc123']`
**Then** the Context variable `ws` is set to `['workspace' => '/tmp/sir-workspace-abc123']`, and subsequent steps can reference `{{ws.workspace}}` in template expressions.

### S007-AS-010 Unknown task name throws RuntimeException [P1]

**Given** a workflow step references `task: nonexistent.task`
**When** the WorkflowRunner attempts to execute that step
**Then** a `RuntimeException` is thrown with message `Task not found: nonexistent.task`.
