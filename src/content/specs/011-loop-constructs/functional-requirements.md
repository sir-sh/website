# S011 Functional Requirements

## Iteration

### S011-FR-001 [P1] forEach iterates over array
The `forEach:` property on a workflow step **MUST** accept either a YAML inline array or a template reference that resolves to an array. Each element in the array triggers one iteration of the step.

### S011-FR-001.a forEach **MUST** support inline YAML arrays.
```yaml
steps:
  - shell: "echo {{item}}"
    forEach: ["file1.txt", "file2.txt", "file3.txt"]
```

### S011-FR-001.b forEach **MUST** support template references.
```yaml
steps:
  - shell: "echo {{item}}"
    forEach: "{{files}}"
```
The template `{{files}}` **MUST** be resolved against the current workflow context and the result **MUST** be an array.

### S011-FR-001.c forEach **MUST** support a map/object of arrays (matrix iteration).
```yaml
steps:
  - task: test.run
    forEach:
      os: ["ubuntu", "macos", "windows"]
      node: ["16", "18", "20"]
    with:
      os: "{{item.os}}"
      nodeVersion: "{{item.node}}"
```

## Loop Variables

### S011-FR-002 [P1] {{item}} variable in loop context
During each iteration, the current collection element **MUST** be bound to the variable `{{item}}` in the loop step's context. This variable **MUST** be accessible in `shell:`, `task:`, `with:`, `as:`, `breakOn:`, and `continueOn:` properties.

### S011-FR-002.a {{item}} **MUST** be resolvable within `with:` mappings.
```yaml
steps:
  - task: process.file
    forEach: "{{files}}"
    with:
      file: "{{item}}"
```
The `with.file` argument receives the value of the current `{{item}}`.

### S011-FR-003 [P1] {{index}} variable in loop context
During each iteration, the zero-based integer index **MUST** be bound to the variable `{{index}}` in the loop step's context. This variable **MUST** be accessible alongside `{{item}}`.

### S011-FR-003.a {{index}} **MUST** be a zero-based integer starting at 0.

### S011-FR-004 [P1] as: renames item variable
The `as:` property **MUST** rename the `{{item}}` variable to a custom name within the loop step's scope.

### S011-FR-004.a When `as: outer` is specified, `{{outer}}` **MUST** be bound to the current item instead of `{{item}}`.
```yaml
steps:
  - shell: "echo {{outer}}"
    forEach: "{{categories}}"
    as: outer
```

### S011-FR-004.b The default item variable name **MUST** be `item` when `as:` is not specified.

### S011-FR-004.c Both renamed and default item variables **MUST NOT** coexist in the same loop scope.

## Parallel Execution

### S011-FR-005 [P1] parallel: true executes iterations concurrently
When `parallel: true` is specified on a step with `forEach:`, the WorkflowRunner **MUST** execute iterations concurrently rather than sequentially.

### S011-FR-005.a Serial execution remains the default when `parallel:` is absent or `false`.

### S011-FR-006 [P1] maxWorkers: limits concurrent workers
The `maxWorkers:` property **MUST** set an upper bound on the number of concurrent worker processes or threads for parallel loop execution. When absent, the system **MAY** use a reasonable default limit.

### S011-FR-006.a `maxWorkers:` **MUST** be a positive integer.

## Loop Flow Control

### S011-FR-007 [P2] breakOn: terminates loop early
The `breakOn:` property **MUST** accept a template expression. When the resolved value is truthy, the loop **MUST** terminate immediately, skipping all remaining iterations.

### S011-FR-007.a breakOn evaluation happens after the current iteration's step completes.

### S011-FR-007.b When breakOn triggers, previously collected results **MUST** still be available via `saveAs`.

### S011-FR-007.c breakOn template has access to `{{item}}`, `{{index}}`, and the step result via `{{result}}`.

### S011-FR-008 [P2] continueOn: skips iteration
The `continueOn:` property **MUST** accept a template expression. When the resolved value is truthy, the current iteration **MUST** skip execution and proceed to the next item.

### S011-FR-008.a When continueOn triggers, the iteration result **MUST** be recorded as `null` or a skipped sentinel in the results array to preserve index alignment.

### S011-FR-008.b continueOn template has access to `{{item}}`, `{{index}}`, and the prior step result via `{{result}}` (if available).

## Result Collection

### S011-FR-009 [P1] saveAs collects results as array
When `saveAs:` is specified on a loop step, the WorkflowRunner **MUST** collect the result of each iteration into an array and store it in the workflow context under the given name.

### S011-FR-009.a The collected array **MUST** maintain index alignment with the input `forEach:` array.

### S011-FR-009.b Each entry in the collected array **MUST** be the return value of the step's execution for that iteration.

### S011-FR-009.c When no iterations execute (e.g., empty array), the saved array **MUST** be empty.

### S011-FR-009.d The saved array **MUST** be accessible as `{{saveAsName}}` in subsequent steps.

## Nested Loops

### S011-FR-010 [P2] Nested loops
When a step with `forEach:` contains child steps (under a `nested:` key), each child step **MUST** be executed within the same loop iteration context (with the same `{{item}}` and `{{index}}` values). The parent loop variables **MUST** remain accessible in the nested scope.

### S011-FR-010.a Child steps **MAY** define their own `forEach:`, creating nested iteration depth.

### S011-FR-010.b Variable shadowing: inner `as:` or `{{item}}` **MUST NOT** override parent loop variables unless explicitly scoped.

## Template Resolution

### S011-FR-011 [P2] Matrix forEach (multi-key iteration)
When `forEach:` is a map/object where each value is an array, the system **MUST** iterate over the Cartesian product of all array values, producing an `{{item}}` object with all keys.

### S011-FR-011.a In matrix iteration, `{{item}}` **MUST** be an object with all keys present in the forEach map.

### S011-FR-012 [P1] Template resolution in forEach
Any string value within the `forEach:` property (including the `forEach:` key itself when it is a string) **MUST** be resolved as a template against the current workflow context before evaluation.

### S011-FR-012.a If `forEach:` resolves to a non-array value, the system **MUST** throw an error with a descriptive message.
