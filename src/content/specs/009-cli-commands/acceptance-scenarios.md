# S009 Acceptance Scenarios

## `sir run <workflow>`

### S009-AS-001 [P1] User runs workflow with all required inputs provided
**Given** a workflow named "deploy" exists with one required input "environment"
**When** the user runs `sir run deploy` and provides "production" when prompted
**Then** the workflow executes successfully with environment="production" and exits 0

### S009-AS-002 [P1] User runs workflow with missing required inputs in interactive mode
**Given** a workflow named "deploy" exists with one required input "environment"
**When** the user runs `sir run deploy` and presses Ctrl+C to cancel during input prompt
**Then** the command exits 1 with message "Workflow execution cancelled"

### S009-AS-003 [P1] User runs workflow in non-interactive mode with missing required inputs
**Given** a workflow named "deploy" exists with one required input "environment"
**When** the user runs `sir run deploy --non-interactive`
**Then** the command exits 1 with error "Missing required input: environment"

### S009-AS-004 [P1] User runs workflow with `--dry-run`
**Given** a workflow named "deploy" exists with steps: [shell: "echo deploy", method: "AppService->deploy"]
**When** the user runs `sir run deploy --dry-run`
**Then** the plan is displayed showing all steps without execution
**And** the command exits 0

### S009-AS-005 [P1] User runs workflow with `--yes` flag
**Given** a workflow named "destroy" exists that would delete files and requires confirmation
**When** the user runs `sir run destroy --yes`
**Then** confirmation is auto-approved and workflow executes
**And** the command exits 0

### S009-AS-006 [P1] User runs non-existent workflow
**Given** no workflow named "nonexistent" exists in any `.sir/` layer
**When** the user runs `sir run nonexistent`
**Then** the command exits 1 with error "Workflow 'nonexistent' not found"

### S009-AS-007 [P1] User runs workflow and workflow fails during execution
**Given** a workflow named "failing" exists with a step that returns error
**When** the user runs `sir run failing`
**Then** the step error is displayed
**And** the command exits 1

### S009-AS-008 [P1] User runs workflow and workflow succeeds
**Given** a workflow named "hello" exists with step: shell "echo 'Hello, World!'"
**When** the user runs `sir run hello`
**Then** "Hello, World!" is printed
**And** the command exits 0

## `sir plan <workflow>`

### S009-AS-009 [P1] User views execution plan with `sir plan`
**Given** a workflow named "deploy" exists with steps: [shell: "build", method: "deploy", task: "notify"]
**When** the user runs `sir plan deploy`
**Then** the plan shows all three steps with types and names
**And** the command exits 0

### S009-AS-010 [P1] User views plan for non-existent workflow
**Given** no workflow named "nonexistent" exists
**When** the user runs `sir plan nonexistent`
**Then** the command exits 1 with error "Workflow 'nonexistent' not found"

### S009-AS-011 [P1] User views plan for workflow with no steps
**Given** a workflow named "empty" exists with no steps
**When** the user runs `sir plan empty`
**Then** "No steps to execute" is displayed
**And** the command exits 0

## `sir where`

### S009-AS-012 [P1] User views loaded layers with `sir where`
**Given** `.sir/` layers are loaded at paths: `/home/user/project/.sir/`, `~/.sir/`
**When** the user runs `sir where`
**Then** the output shows both layers in precedence order with paths
**And** the command exits 0

## `sir workflows:list`

### S009-AS-013 [P1] User lists workflows with `sir workflows:list`
**Given** workflows exist: "deploy" (project layer), "hello" (global layer)
**When** the user runs `sir workflows:list`
**Then** both workflows are listed with their types and layer sources
**And** project-layer workflow appears before global-layer workflow (higher precedence)
**And** the command exits 0

## `sir workflows:show <workflow>`

### S009-AS-014 [P1] User shows workflow details with `sir workflows:show`
**Given** a workflow named "deploy" exists with inputs: [env (required), verbose (optional, default: false)]
**And** steps: [shell: "build.sh", method: "Deployer->deploy"]
**When** the user runs `sir workflows:show deploy`
**Then** the output displays inputs (env*, verbose), steps with types
**And** the command exits 0

## `sir recipes:install <source>`

### S009-AS-015 [P1] User installs pack with `sir recipes:install <source>`
**Given** a valid git source `https://github.com/user/packs.git` containing a pack
**When** the user runs `sir recipes:install https://github.com/user/packs.git`
**Then** the pack is cloned to the global packs directory
**And** lock file is updated
**And** the command exits 0

### S009-AS-016 [P1] User installs pack to project with `sir recipes:install <source> --project`
**Given** a valid git source `https://github.com/user/packs.git` containing a pack
**When** the user runs `sir recipes:install https://github.com/user/packs.git --project`
**Then** the pack is cloned to the project `.sir/packs/` directory
**And** lock file is updated
**And** the command exits 0

## `sir recipes:list`

### S009-AS-017 [P1] User lists global packs with `sir recipes:list`
**Given** packs are installed: "deploy-tools" (global), "notify-slack" (project)
**When** the user runs `sir recipes:list`
**Then** all global packs are listed with id, source, and install date
**And** the command exits 0

### S009-AS-018 [P1] User lists project packs with `sir recipes:list --project`
**Given** packs are installed: "deploy-tools" (global), "notify-slack" (project)
**When** the user runs `sir recipes:list --project`
**Then** only project-level packs are listed
**And** the command exits 0

## `sir recipes:remove <pack-id>`

### S009-AS-019 [P1] User removes pack with confirmation
**Given** pack "old-pack" is installed
**When** the user runs `sir recipes:remove old-pack` and answers "y" to confirmation
**Then** the pack files are removed
**And** lock file is updated
**And** the command exits 0

### S009-AS-020 [P1] User removes pack and declines confirmation
**Given** pack "old-pack" is installed
**When** the user runs `sir recipes:remove old-pack` and answers "n" to confirmation
**Then** the pack is not removed
**And** the command exits 0

## `sir recipes:update`

### S009-AS-021 [P2] User runs `sir recipes:update` and sees stub message
**Given** any configuration
**When** the user runs `sir recipes:update`
**Then** message "This feature is not yet implemented. See S013 for update functionality." is displayed
**And** the command exits 0

## `sir agent` Commands

### S009-AS-022 [P2] AI agent lists tools via `sir agent tools`
**Given** workflows exist: "deploy" (type: method), "backup" (type: shell)
**When** the AI agent runs `sir agent tools`
**Then** JSON output lists all workflows, methods, and tasks
**And** each entry includes name, type, and metadata
**And** the command exits 0

### S009-AS-023 [P2] AI agent plans workflow via `sir agent plan <workflow>`
**Given** a workflow named "deploy" exists
**When** the AI agent runs `sir agent plan deploy`
**Then** the plan is displayed (same as `sir plan deploy`)
**And** the command exits 0

### S009-AS-024 [P2] AI agent runs workflow via `sir agent run <workflow>`
**Given** a workflow named "deploy" exists
**When** the AI agent runs `sir agent run deploy` and confirms the prompt
**Then** the workflow executes
**And** the command exits 0

### S009-AS-025 [P2] AI agent declines confirmation in `sir agent run`
**Given** a workflow named "deploy" exists
**When** the AI agent runs `sir agent run deploy` and declines confirmation
**Then** the workflow does not execute
**And** the command exits 1

## `sir list`

### S009-AS-026 [P1] User runs `sir list` and sees all available commands
**Given** sir is installed with commands: run, plan, where, workflows:list, workflows:show, recipes:install, recipes:list, recipes:remove, recipes:update, agent
**When** the user runs `sir list`
**Then** all commands are listed alphabetically
**And** the command exits 0