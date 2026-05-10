# S011: Loop Constructs

| Field | Value |
|-------|-------|
| Spec | S011 |
| Feature | Loop Constructs |
| Date | 2026-04-24 |
| Status | Partial | Last Updated | 2026-05-10 |

## Implementation Notes

**Implemented (S011-FR-001 through S011-FR-009, S011-FR-012):**
- forEach iteration over arrays
- {{item}} and {{index}} variables
- as: property for renaming
- breakOn: and continueOn: flow control
- saveAs result collection
- Template resolution in forEach

**Not Yet Implemented:**
- S011-FR-005: parallel: true (concurrency not implemented)
- S011-FR-006: maxWorkers: limit (concurrency not implemented)
- S011-FR-010: Nested loops (child steps under forEach not supported)
- S011-FR-011: Matrix forEach (multi-key iteration not supported)

**Known Issues:**
- MAR-375: Loop logic bug being fixed
| Project | sir.sh CLI (`/Users/mark/Projects/Sir/cli`) |
| Tech Stack | PHP 8.2, Laravel Zero |

## Overview

Loop Constructs add iteration support to sir.sh workflow steps, enabling developers to repeat workflow steps over collections of items. Each iteration exposes `{{item}}` (the current collection element) and `{{index}}` (the zero-based iteration index). The `as:` property allows renaming the item variable for clarity. Parallel execution via `parallel: true` with `maxWorkers:` allows concurrent iteration. Loop controls `breakOn:` and `continueOn:` provide loop flow control. When `saveAs:` is applied to a loop step, results are collected as an array.

## User Scenarios

S011-US-001 [P1] As a workflow author, I want to iterate over a list of files so that I can process each file without writing repetitive step definitions.

S011-US-002 [P1] As a workflow author, I want to run iterations in parallel so that I can complete work faster when iterations are independent.

S011-US-003 [P2] As a workflow author, I want to break out of a loop early when a condition is met so that I can avoid unnecessary iterations.

S011-US-004 [P2] As a workflow author, I want to skip specific iterations based on a condition so that I can handle conditional processing cleanly.

S011-US-005 [P1] As a workflow author, I want to collect loop results into a named variable so that downstream steps can use the aggregated output.

S011-US-006 [P2] As a workflow author, I want nested loops so that I can iterate over multi-dimensional data structures.

## Requirements Summary

| ID | Type | Priority | Title |
|----|------|----------|-------|
| S011-FR-001 | Functional | P1 | forEach iterates over array |
| S011-FR-002 | Functional | P1 | {{item}} variable in loop context |
| S011-FR-003 | Functional | P1 | {{index}} variable in loop context |
| S011-FR-004 | Functional | P1 | as: renames item variable |
| S011-FR-005 | Functional | P1 | parallel: true executes iterations concurrently |
| S011-FR-006 | Functional | P1 | maxWorkers: limits concurrent workers |
| S011-FR-007 | Functional | P2 | breakOn: terminates loop early |
| S011-FR-008 | Functional | P2 | continueOn: skips iteration |
| S011-FR-009 | Functional | P1 | saveAs collects results as array |
| S011-FR-010 | Functional | P2 | Nested loops |
| S011-FR-011 | Functional | P2 | Matrix forEach (multi-key iteration) |
| S011-FR-012 | Functional | P1 | Template resolution in forEach |
| S011-AS-001 | Acceptance | P1 | Simple array iteration |
| S011-AS-002 | Acceptance | P1 | Parallel iteration |
| S011-AS-003 | Acceptance | P2 | breakOn early termination |
| S011-AS-004 | Acceptance | P2 | continueOn skip iteration |
| S011-AS-005 | Acceptance | P1 | saveAs result collection |
| S011-AS-006 | Acceptance | P2 | Nested loop iteration |
| S011-AS-007 | Acceptance | P2 | Matrix forEach iteration |
| S011-EC-001 | Edge Case | P1 | forEach resolves to non-array |
| S011-EC-002 | Edge Case | P2 | Empty array iteration |
| S011-EC-003 | Edge Case | P1 | Nested loop with variable shadowing |
| S011-EC-004 | Edge Case | P2 | Parallel with maxWorkers: 0 |
| S011-EC-005 | Edge Case | P2 | breakOn on last item |
| S011-SC-001 | Success Criteria | P1 | All iterations execute when no break/continue |
| S011-SC-002 | Success Criteria | P1 | Parallel execution completes within timeout |
| S011-SC-003 | Success Criteria | P1 | saveAs produces correct array length |
| S011-SC-004 | Success Criteria | P2 | breakOn terminates loop and preserves results |
| S011-SC-005 | Success Criteria | P2 | continueOn skips iteration and preserves index |
| S011-SC-006 | Success Criteria | P1 | continueOnError handles per-iteration failures |
| S011-SC-007 | Success Criteria | P2 | Nested loops produce Cartesian product count |
| S011-SC-008 | Success Criteria | P2 | Matrix forEach produces correct Cartesian product |
| S011-SC-009 | Success Criteria | P1 | forEach template resolves before iteration |
| S011-SC-010 | Success Criteria | P2 | {{item}} and {{index}} accessible throughout iteration |
| S011-IF-001 | Interface | P1 | forEach YAML schema |
| S011-IF-002 | Interface | P1 | {{item}} implicit variable |
| S011-IF-003 | Interface | P1 | {{index}} implicit variable |
| S011-IF-004 | Interface | P1 | Loop results array structure |
| S011-IF-005 | Interface | P1 | LoopExecutor PHP class |
| S011-IF-006 | Interface | P1 | ParallelLoopExecutor PHP class |
| S011-IF-007 | Interface | P2 | NestedLoopExecutor PHP class |
| S011-NF-001 | Non-Functional | P1 | Parallel execution completes within 30s per worker |
| S011-NF-002 | Non-Functional | P2 | Parallel loop throughput scales with maxWorkers |
| S011-NF-003 | Non-Functional | P1 | Memory bounded by maxWorkers, not iteration count |
| S011-NF-004 | Non-Functional | P2 | Memory usage is predictable for nested loops |
| S011-NF-005 | Non-Functional | P2 | Streaming output during parallel loops |
| S011-NF-006 | Non-Functional | P1 | Worker failure does not crash the loop |
| S011-NF-007 | Non-Functional | P2 | System resource exhaustion handling |
| S011-NF-008 | Non-Functional | P2 | Timeout during parallel execution |
| S011-NF-009 | Non-Functional | P1 | Serial loop memory usage is O(1) per iteration |
| S011-NF-010 | Non-Functional | P2 | Serial loop execution order is deterministic |

## Cross-Spec Dependencies

- **Depends on:** S003 (Workflow Engine) -- LoopExecutor integrates with the WorkflowRunner executeStep flow
- **Required by:** All workflow authors who need iteration behavior