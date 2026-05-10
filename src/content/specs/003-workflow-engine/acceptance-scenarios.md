# S003 Acceptance Scenarios

### S003-AS-001 [Run workflow with task step] [P1]
**Given** a workflow named `deploy` exists in the `.sir/workflows/` directory with a step that contains `task: deploy-service`
**When** the user runs `sir run deploy`
**Then** the runner **MUST** resolve the task via `TaskRegistry.get()`, execute it via `TaskInterface.execute()`, and display a success indicator with elapsed time

### S003-AS-002 [Run workflow with shell step] [P1]
**Given** a workflow named `backup` exists with a step containing `shell: "tar czf /tmp/backup.tar.gz /data"`
**When** the user runs `sir run backup`
**Then** the runner **MUST** execute the command via `Symfony\Component\Process\Process::fromShellCommandline()`, stream stdout/stderr in real-time, and display a success indicator with elapsed time

### S003-AS-003 [Run workflow with method step] [P1]
**Given** a workflow named `provision` exists with a step containing `method: aws.s3.upload` and `with` arguments including a bucket name
**When** the user runs `sir run provision`
**Then** the runner **MUST** resolve the method via `MethodRegistry.get()`, resolve template strings in the `with` values, execute via `MethodExecutor.execute()`, and display a success indicator with elapsed time

### S003-AS-004 [saveAs passes data between steps] [P1]
**Given** a workflow with two steps where step 1 contains `saveAs: result` and step 2 contains `with` arguments that reference `{{result}}`
**When** the user runs `sir run <workflow>`
**Then** the runner **MUST** store step 1's return value in the `Context` under `result`, then resolve `{{result}}` in step 2's arguments before execution

### S003-AS-005 [Dry-run skips execution] [P1]
**Given** a workflow with multiple steps
**When** the user runs `sir run <workflow> --dry-run`
**Then** the runner **MUST** output the step header for each step with `[DRY RUN]` appended, skip actual execution, and produce no side effects

### S003-AS-006 [Non-interactive uses defaults] [P1]
**Given** a workflow with an input that has a `default: production` value
**When** the user runs `sir run <workflow> --non-interactive`
**Then** the runner **MUST** use the default value for that input and **MUST NOT** prompt the user interactively

### S003-AS-007 [Plan shows step details] [P2]
**Given** a workflow with steps of types `method`, `task`, and `shell`
**When** the user runs `sir plan <workflow>`
**Then** the command **MUST** display each step's index, type, name, and `saveAs` variable if present, and show a summary with total step count

### S003-AS-008 [Workflows:list shows all workflows] [P2]
**Given** workflows exist in multiple layers
**When** the user runs `sir workflows:list`
**Then** the command **MUST** display a table with columns `Name`, `Type`, and `Layer` for all discovered workflows, showing the nearest-layer version when duplicates exist across layers

### S003-AS-009 [Workflows:show displays full definition] [P2]
**Given** a workflow named `provision` exists
**When** the user runs `sir workflows:show provision`
**Then** the command **MUST** display the workflow's path, layer, type, description, all input definitions with required/default/description annotations, and all steps with index, type, name, and `saveAs`

### S003-AS-010 [Step failure stops workflow] [P1]
**Given** a workflow where step 3 of 5 throws an exception
**When** the runner executes the workflow
**Then** the runner **MUST** halt execution of remaining steps (4 and 5), throw a `RuntimeException` with message `"Step 3 failed: {originalMessage}"`, and the CLI **MUST** display an error and return exit code 1

### S003-AS-011 [Template variables resolve in step args] [P1]
**Given** a workflow with step 1 that produces output captured via `saveAs: buildId` and step 2 whose `with` argument contains `"image: myapp:{{buildId}}"`
**When** the runner executes step 2
**Then** the template `{{buildId}}` **MUST** be resolved to the actual value from step 1's output before the method/task/shell is invoked