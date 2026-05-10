# S010 Acceptance Scenarios

### S010-AS-001 [Step skips when condition is false] [P1]
**Given** a workflow with a step containing `if: "{{branch}} == 'develop'"`
**And** the runtime value of `branch` is `"main"`
**When** the `WorkflowRunner` executes that step
**Then** the step **MUST** be marked as skipped with `reason: "Condition not met"` and the workflow **MUST** continue to the next step

### S010-AS-002 [Step executes when condition is true] [P1]
**Given** a workflow with a step containing `if: "{{branch}} == 'main'"`
**And** the runtime value of `branch` is `"main"`
**When** the `WorkflowRunner` executes that step
**Then** the step **MUST** execute normally and produce its expected output

### S010-AS-003 [Step with no if property executes unconditionally] [P1]
**Given** a workflow with a step that contains only `task: notify.slack` and no `if:` property
**When** the `WorkflowRunner` executes that step
**Then** the step **MUST** execute normally regardless of any context variable values

### S010-AS-004 [continueOnError prevents workflow halt on step failure] [P1]
**Given** a workflow with two steps where step 1 contains `task: risky.operation` and `continueOnError: true` and step 2 is a shell step
**And** step 1 throws an exception at runtime
**When** the `WorkflowRunner` executes the workflow
**Then** step 1 **MUST** be marked as failed, a warning **MUST** be displayed, and step 2 **MUST** execute normally

### S010-AS-005 [timeout terminates step and throws exception] [P1]
**Given** a workflow with a step containing `task: slow.operation` and `timeout: 1`
**And** the task execution takes longer than 1 second
**When** the `WorkflowRunner` executes that step
**Then** the step **MUST** be terminated, a `RuntimeException` **MUST** be thrown with message `"Step {N} timed out after 1 seconds"`, and the workflow **MUST** halt unless `continueOnError: true`

### S010-AS-006 [Composite condition with && evaluates correctly] [P1]
**Given** a workflow with a step containing `if: "{{branch}} == 'main' && {{tests.passed}}"`
**And** the runtime value of `branch` is `"main"`
**And** the runtime value of `tests.passed` is `true`
**When** the `ConditionEvaluator` evaluates the condition
**Then** the result **MUST** be `true`
**And** the step **MUST** execute

### S010-AS-007 [Composite condition with || evaluates correctly] [P1]
**Given** a workflow with a step containing `if: "{{branch}} == 'main' || {{branch}} == 'develop'"`
**And** the runtime value of `branch` is `"develop"`
**When** the `ConditionEvaluator` evaluates the condition
**Then** the result **MUST** be `true` and the step **MUST** execute

### S010-AS-008 [String operator contains matches substring] [P1]
**Given** a workflow with a step containing `if: "{{env}} contains 'production'"`
**And** the runtime value of `env` is `"PRODUCTION_ENV"`
**When** the `ConditionEvaluator` evaluates the condition
**Then** the result **MUST** be `true`

### S010-AS-009 [exists operator returns true for defined variable] [P1]
**Given** a workflow with a step containing `if: "exists branch"`
**And** `branch` is defined in the context with value `"main"`
**When** the `ConditionEvaluator` evaluates the condition
**Then** the result **MUST** be `true`

### S010-AS-010 [isEmpty operator returns true for empty string] [P1]
**Given** a workflow with a step containing `if: "isEmpty optionalFlag"`
**And** `optionalFlag` is defined in the context with value `""`
**When** the `ConditionEvaluator` evaluates the condition
**Then** the result **MUST** be `true`

### S010-AS-011 [Invalid condition syntax produces warning] [P1]
**Given** a workflow with a step containing `if: "{{branch} == 'main'"` (unclosed template brace)
**When** the `WorkflowRunner` attempts to evaluate the condition
**Then** the step **MUST** be skipped with `reason: "Invalid condition syntax"`, a warning **MUST** be displayed, and the workflow **MUST NOT** halt

### S010-AS-012 [Undefined variable in condition produces warning] [P1]
**Given** a workflow with a step containing `if: "{{unknownVar}} == true"`
**And** `unknownVar` is not defined in the context
**When** the `ConditionEvaluator` evaluates the condition
**Then** the evaluator **MUST** log a warning about the undefined variable, treat the condition as `false`, and skip the step

### S010-AS-013 [Plan command displays conditional steps] [P2]
**Given** a workflow with a step containing `if: "{{branch}} == 'main'"` and `timeout: 30`
**When** the user runs `sir plan <workflow>`
**Then** the plan output **MUST** display the step with its `if:` condition and `timeout` value annotated
