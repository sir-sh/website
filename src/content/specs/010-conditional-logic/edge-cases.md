# S010 Edge Cases

| ID | Scenario | Expected Behavior |
|----|----------|-------------------|
| S010-EC-001 | Condition references undefined variable | The evaluator **MUST** log a warning, treat the condition as `false`, and skip the step with `reason: "Condition not met"` |
| S010-EC-002 | Condition contains invalid syntax | The step **MUST** be skipped with `reason: "Invalid condition syntax"` and a warning **MUST** be displayed |
| S010-EC-003 | Empty condition string | The step **MUST** execute unconditionally as if no `if:` property were present |
| S010-EC-004 | Condition resolves to non-boolean value | The evaluator **MUST** coerce the value: defined non-empty values become `true`, empty/undefined values become `false` |
| S010-EC-005 | Regex operator with invalid pattern | If `matches` is given an invalid regex pattern, the evaluator **MUST** log a warning, skip the step with `reason: "Invalid condition syntax"`, and **MUST NOT** throw |
| S010-EC-006 | Step with both timeout and continueOnError | Both properties **MUST** apply independently: timeout terminates the step, and on failure `continueOnError` allows the workflow to continue |
| S010-EC-007 | timeout value of zero | No timeout **MUST** be enforced; the step executes without a time limit |
| S010-EC-008 | Nested logical groups in condition | Parenthesized sub-expressions **MUST** be evaluated correctly; e.g., `{{a}} && ({{b}} \|\| {{c}})` |
| S010-EC-009 | Condition with whitespace around operators | The parser **MUST** trim whitespace around operators and operands before evaluation |
| S010-EC-010 | isEmpty on undefined variable | **MUST** return `false` (undefined is not empty, it is absent) |
| S010-EC-011 | Shell step returns non-zero with continueOnError | The step **MUST** be marked as failed, a warning **MUST** be displayed, and the workflow **MUST** continue |
| S010-EC-012 | Negated condition that is true | `!{{branch}} == 'main'` where branch is `"main"` **MUST** evaluate to `false` and skip the step |
