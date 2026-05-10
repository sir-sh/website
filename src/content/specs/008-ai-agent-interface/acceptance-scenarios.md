# S008 Acceptance Scenarios

### S008-AS-001 AI discovers tools via `sir agent tools` [P1]

**Given** the sir CLI is installed and the working directory contains registered workflows, methods, and tasks
**When** an AI assistant calls `sir agent tools`
**Then** the output lists all workflow names under a `Workflows:` heading, all method names with descriptions under a `Methods:` heading, and all task names with descriptions under a `Built-in Tasks:` heading

### S008-AS-002 AI plans a workflow via `sir agent plan <workflow>` [P1]

**Given** a workflow named `deploy-app` exists and is loadable
**When** an AI assistant calls `sir agent plan deploy-app`
**Then** the output shows a step-by-step plan with each step's name and type, without executing any steps
**And** the exit code is 0

### S008-AS-003 AI runs with confirmation [P1]

**Given** a workflow named `deploy-app` exists and is loadable
**When** an AI assistant calls `sir agent run deploy-app` and the user answers `y` to the `Execute this workflow?` prompt
**Then** the workflow is executed and the output reflects the RunWorkflowCommand result

### S008-AS-004 AI runs without confirmation (decline) [P1]

**Given** a workflow named `deploy-app` exists and is loadable
**When** an AI assistant calls `sir agent run deploy-app` and the user answers `n` to the `Execute this workflow?` prompt
**Then** the output is `Cancelled.` and the workflow is not executed
**And** the exit code is 0

### S008-AS-005 AI runs without confirmation (--yes flag) [P2]

**Given** a workflow named `deploy-app` exists and is loadable
**When** an AI assistant calls `sir agent run deploy-app --yes`
**Then** the confirmation prompt is skipped and the workflow is executed immediately
**And** the output reflects the RunWorkflowCommand result

### S008-AS-006 Plan with missing workflow argument [P1]

**Given** no workflow argument is provided
**When** `sir agent plan` is called
**Then** the error message is `Please specify a workflow: sir agent plan <workflow>`
**And** the exit code is 1

### S008-AS-007 Run with missing workflow argument [P1]

**Given** no workflow argument is provided
**When** `sir agent run` is called
**Then** the error message is `Please specify a workflow: sir agent run <workflow>`
**And** the exit code is 1

### S008-AS-008 Unknown action shows help [P1]

**Given** an unknown action string is provided
**When** `sir agent unknown-action` is called
**Then** help text is displayed describing the three subcommands
**And** the exit code is 0

### S008-AS-009 Default action is tools [P1]

**Given** no action argument is provided
**When** `sir agent` is called
**Then** the `tools` subcommand executes as the default action
**And** all discoverable items are listed

### S008-AS-010 JSON tools output is machine-parseable [P2]

**Given** `sir agent tools --json` is called
**When** the AI assistant parses the output as JSON
**Then** the result is valid JSON with an array of tool objects, each containing `name`, `description`, `category`, and `inputs`

### S008-AS-011 JSON plan output is machine-parseable [P2]

**Given** a workflow named `deploy-app` exists
**When** `sir agent plan deploy-app --json` is called
**Then** the result is valid JSON with a `steps` array, each step containing `name`, `type`, and `effects`
**And** no steps are executed

### S008-AS-012 Plan with non-existent workflow [P1]

**Given** the workflow argument `nonexistent` does not match any known workflow
**When** `sir agent plan nonexistent` is called
**Then** the PlanCommand handles the error and outputs an appropriate message
**And** the exit code is 1