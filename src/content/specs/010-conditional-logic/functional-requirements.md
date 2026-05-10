# S010 Functional Requirements

## Condition Evaluation

S010-FR-001 [P1] The `WorkflowRunner` **MUST** evaluate the `if:` condition on each step before execution by calling `ConditionEvaluator::evaluate()` with the condition string resolved via `Context::resolveTemplate()`.

S010-FR-001.a If the condition evaluates to `false`, the step **MUST** be marked as skipped.

S010-FR-001.b If the condition evaluates to `true`, the step **MUST** proceed to execution normally.

S010-FR-001.c If the step has no `if:` property, the step **MUST** proceed to execution unconditionally.

## Skipped Step Behavior

S010-FR-002 [P1] When a step is skipped due to a false condition, the `WorkflowRunner` **MUST** return a step result with `skipped: true` and `reason: "Condition not met"` and **MUST NOT** throw an exception.

S010-FR-002.a Skipped steps **MUST NOT** halt the workflow execution. Subsequent steps **MUST** continue normally.

S010-FR-002.b Skipped steps **MUST NOT** be counted as failures in the `success` field of the workflow result.

## continueOnError

S010-FR-003 [P1] When a step contains `continueOnError: true` and the step throws an exception, the `WorkflowRunner` **MUST** catch the exception, record the step as failed, and **MUST NOT** halt workflow execution.

S010-FR-003.a Failed steps with `continueOnError: true` **MUST** emit a warning message that includes the step index, step name, and error message.

S010-FR-003.b Steps without `continueOnError` or with `continueOnError: false` **MUST** halt workflow execution on exception per S003-FR-017.

## timeout

S010-FR-004 [P1] When a step contains a `timeout: int` property, the runner **MUST** enforce a maximum execution time of `timeout` seconds. If execution exceeds this limit, the runner **MUST** terminate the step and throw a `RuntimeException` with message `"Step {N} timed out after {seconds} seconds"`.

S010-FR-004.a If `timeout: 0` is specified, no timeout enforcement **MUST** apply.

S010-FR-004.b The timeout check **MUST** apply to the step's actual execution time, excluding condition evaluation.

## Comparison Operators

S010-FR-005 [P1] The `ConditionEvaluator` **MUST** support the following comparison operators:
- `==` -- equals (value equality, string-aware)
- `!=` -- not equals
- `>` -- greater than (numeric)
- `<` -- less than (numeric)
- `>=` -- greater than or equal (numeric)
- `<=` -- less than or equal (numeric)

S010-FR-005.a All comparison operators **MUST** perform type-aware comparison: numeric values **MUST** be compared numerically, non-numeric strings **MUST** be compared as strings.

## Logical Operators

S010-FR-006 [P1] The `ConditionEvaluator` **MUST** support the following logical operators:
- `&&` -- logical AND (both operands must evaluate to true)
- `||` -- logical OR (at least one operand must evaluate to true)
- `!` -- logical NOT (negates the boolean value of the operand)

S010-FR-006.a Logical operators **MUST** support short-circuit evaluation: `&&` **MUST** stop evaluating when the left operand is false, and `||` **MUST** stop when the left operand is true.

S010-FR-006.b Parentheses **MAY** be used to group sub-expressions for explicit precedence.

## String Operators

S010-FR-007 [P1] The `ConditionEvaluator` **MUST** support the following string operators:
- `contains` -- returns true if the left string contains the right substring
- `startsWith` -- returns true if the left string starts with the right prefix
- `endsWith` -- returns true if the left string ends with the right suffix
- `matches` -- returns true if the left string matches the right operand as a PCRE regex pattern

S010-FR-007.a String operators **MUST** be evaluated after template resolution has been applied to both the haystack and needle/pattern.

## Existence Operators

S010-FR-008 [P1] The `ConditionEvaluator` **MUST** support the following existence operators:
- `exists` -- returns true if the variable name referenced in the operand is defined in the `Context`
- `isEmpty` -- returns true if the variable name referenced in the operand is defined and its value is an empty string `""`

S010-FR-008.a `exists` **MUST** return `false` for variables that are not defined in the `Context`.

S010-FR-008.b `isEmpty` on an undefined variable **MUST** return `false` (undefined is not empty, it is absent).

## Template Resolution in Conditions

S010-FR-009 [P1] The `ConditionEvaluator` **MUST** resolve all `{{expression}}` template patterns in the condition string using `Context::resolveTemplate()` before parsing and evaluating the expression.

S010-FR-009.a If a `{{variable}}` resolves to a value that is not a boolean, string, or number, the evaluator **MUST** coerce it to a boolean: defined non-empty values are `true`, undefined or empty values are `false`.

## Backwards Compatibility

S010-FR-010 [P1] Steps without an `if:` property **MUST** execute unconditionally, preserving the behavior of workflows that existed before this feature was added.

S010-FR-010.a The presence of `continueOnError` or `timeout` on steps without an `if:` property **MUST** not change unconditional execution behavior.

## Invalid Condition Handling

S010-FR-011 [P1] When a step's `if:` condition contains invalid syntax that cannot be parsed, the `WorkflowRunner` **MUST** display a warning message with the step index and the parse error, mark the step as skipped with `reason: "Invalid condition syntax"`, and **MUST NOT** halt the workflow.

S010-FR-011.a When a step's `if:` condition references a variable that does not exist in the `Context` and no fallback is provided via `default()`, the evaluator **MUST** log a warning and treat the condition as `false`.

## Multi-line Conditions

S010-FR-012 [P2] The condition parser **MUST** support multi-line condition strings as the value of the `if:` property, treating newline whitespace as insignificant for expression parsing.
