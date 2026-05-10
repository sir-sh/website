# S011 Acceptance Scenarios

### S011-AS-001 Simple array iteration [P1]
**Given** a workflow step with `forEach: ["alpha", "beta", "gamma"]`
**When** the step is executed
**Then** three iterations occur
**And** iteration 1 has `{{item}}` bound to `"alpha"` and `{{index}}` bound to `0`
**And** iteration 2 has `{{item}}` bound to `"beta"` and `{{index}}` bound to `1`
**And** iteration 3 has `{{item}}` bound to `"gamma"` and `{{index}}` bound to `2`
**And** the step `shell:` command receives the resolved item value

### S011-AS-002 Parallel iteration [P1]
**Given** a workflow step with `forEach: [1, 2, 3, 4]`, `parallel: true`, and `maxWorkers: 2`
**When** the step is executed
**Then** iterations execute concurrently with at most 2 workers active simultaneously
**And** all 4 iterations complete
**And** the results array contains 4 entries in original index order

### S011-AS-003 breakOn early termination [P2]
**Given** a workflow step with `forEach: ["a", "b", "c", "d"]` and `breakOn: "{{item}} == 'c'"`
**When** the step is executed
**Then** iterations proceed for items `"a"`, `"b"`, and `"c"`
**And** the loop terminates before processing item `"d"`
**And** the results array contains 3 entries

### S011-AS-004 continueOn skip iteration [P2]
**Given** a workflow step with `forEach: ["a", "b", "c"]` and `continueOn: "{{item}} == 'b'"`
**When** the step is executed
**Then** iteration for item `"a"` executes normally
**And** iteration for item `"b"` is skipped
**And** iteration for item `"c"` executes normally
**And** the results array contains 3 entries with index 1 set to a skipped/null sentinel

### S011-AS-005 saveAs result collection [P1]
**Given** a workflow step with `forEach: ["x", "y"]`, `saveAs: "results"`, and a `shell:` that returns the item value
**When** the step is executed
**Then** the workflow context contains `results` as an array `["x", "y"]`
**And** subsequent steps can reference `{{results}}`

### S011-AS-006 Nested loop iteration [P2]
**Given** a workflow step with `forEach: ["outer1", "outer2"]`, `as: outer`, and `nested:` containing a child step with `forEach: ["inner1", "inner2"]`
**When** the step is executed
**Then** 4 total inner iterations occur (2 outer x 2 inner)
**And** `{{outer}}` is bound in the inner scope
**And** each inner iteration has its own `{{item}}` and `{{index}}`

### S011-AS-007 Matrix forEach iteration [P2]
**Given** a workflow step with `forEach:` mapping `os: ["ubuntu", "macos"]` and `node: ["16", "18"]`
**When** the step is executed
**Then** 4 iterations occur (Cartesian product: 2 os x 2 node)
**And** each iteration has `{{item.os}}` and `{{item.node}}` populated
**And** `{{index}}` reflects the outer iteration index only
