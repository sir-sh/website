# S011 Edge Cases

| ID | Scenario | Expected Behavior |
|----|----------|-------------------|
| S011-EC-001 | `forEach:` resolves to a non-array value (e.g., string, integer) | The WorkflowRunner **MUST** throw an `InvalidArgumentException` with message indicating `forEach` must resolve to an array. No iterations execute. |
| S011-EC-002 | `forEach:` resolves to an empty array `[]` | The loop step completes immediately with zero iterations. If `saveAs:` is specified, the saved array is empty. No error is thrown. |
| S011-EC-003 | Nested loop with variable shadowing: inner `as: item` conflicts with parent `{{item}}` | Inner loop **MUST** shadow the parent `{{item}}`. Parent `{{item}}` **MUST NOT** be accessible within the inner loop scope. Parent loop variables with different names (e.g., `as: outer`) remain accessible. |
| S011-EC-004 | `maxWorkers: 0` or `maxWorkers: negative` | The WorkflowRunner **MUST** fall back to a default of `1` worker (sequential execution) or throw a validation error. Behavior is implementation-defined but **MUST NOT** cause undefined process counts. |
| S011-EC-005 | `breakOn:` triggers on the last item of the array | Loop terminates normally after the last iteration. No special behavior. Results array contains all processed iterations. |
| S011-EC-006 | `forEach:` template reference resolves to an undefined variable | The WorkflowRunner **MUST** treat the undefined variable as `null` or throw a template resolution error. If treated as null, and null is not an array, S011-EC-001 applies. |
| S011-EC-007 | `parallel: true` with a single-item array | Parallel execution is invoked but only one worker is needed. Behavior is identical to serial execution in terms of result, just with parallel infrastructure overhead. |
| S011-EC-008 | `continueOn:` and `breakOn:` both evaluate to truthy in the same iteration | `breakOn:` **MUST** take precedence. The loop terminates, not just the current iteration skipped. |
| S011-EC-009 | Nested loop with `parallel: true` on inner loop | Inner parallel loop **MUST** execute within the outer iteration context. Outer loop remains serial by default unless `parallel: true` is also set on the parent step. |
| S011-EC-010 | `forEach:` contains nested arrays as items (e.g., `[["a", "b"], ["c", "d"]]`) | Each item is the nested array. `{{item}}` binds to the full nested array. Template resolution of `{{item}}` in sub-properties works normally. |
