# S007 Edge Cases

| ID | Scenario | Expected Behavior |
|----|----------|-------------------|
| S007-EC-001 | `workspace.temp` called with no args (prefix defaults) | Directory created with pattern `sir-workspace-{uniqid}` under `sys_get_temp_dir()`. Return array has `workspace` key only. |
| S007-EC-002 | `files.write` called without `path` arg | `InvalidArgumentException` thrown with message `path is required`. |
| S007-EC-003 | `files.write` called with `content` omitted | File is created at `path` with empty content (`''`). Return `bytes` is `0`. |
| S007-EC-004 | `files.write` target directory is not writable (permission denied) | PHP `file_put_contents` triggers a warning/error. The task does not catch this; it propagates as an error to the WorkflowRunner which wraps it in a `RuntimeException`. |
| S007-EC-005 | `files.writeMd` called with `title` as `null` | The `title` check is falsy, so content is written verbatim without any `# Title` prefix. |
| S007-EC-006 | `git.clone` with an invalid/unreachable repo URL | The `git clone` process exits with non-zero code. `RuntimeException` is thrown with the message `Git clone failed: {stderr}`. |
| S007-EC-007 | `git.clone` with a `branch` that does not exist in the remote | The `git clone --branch` process exits with non-zero code. `RuntimeException` is thrown with the error output from git. |
| S007-EC-008 | `git.clone` where `folder` already exists and is non-empty | Git clone fails because the target directory is not empty. `RuntimeException` is thrown with git's error message. |
| S007-EC-009 | `tests.auto` in a directory with no `package.json` or `composer.json` | `RuntimeException` thrown with a multi-line message listing supported project types and providing an example `scripts.test` entry. |
| S007-EC-010 | `tests.auto` in a directory with both `package.json` (with test script) and `composer.json` (with test script) | npm test is used because `package.json` is checked first. Composer is only checked when the npm check fails or `package.json` lacks a test script. |
| S007-EC-011 | `tests.auto` with `package.json` present but no `scripts.test` key, and `composer.json` with `scripts.test` | npm detection fails (no test script), falls through to composer detection, runs `composer run-script test`. |
| S007-EC-012 | `coderabbit.review` called without `target` arg | `InvalidArgumentException` thrown with message `target branch is required`. |
| S007-EC-013 | `TaskRegistry::register()` called with a name that is already registered | The new task silently overwrites the previously registered task. No error is thrown. |
| S007-EC-014 | `tests.auto` test process exceeds 600-second timeout | Symfony Process throws a `ProcessTimedOutException`. The task does not catch this; it propagates to the WorkflowRunner. |
| S007-EC-015 | `git.clone` process exceeds 300-second timeout | Symfony Process throws a `ProcessTimedOutException`. The task does not catch this; it propagates to the WorkflowRunner. |
