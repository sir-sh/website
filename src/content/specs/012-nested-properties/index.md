# S012: Nested Property Access in Templates

| Field | Value |
|-------|-------|
| Spec | S012 |
| Feature | Nested Property Access in Templates |
| Date | 2026-04-24 |
| Status | Implemented | Last Updated | 2026-05-10 |

## Overview

Currently v1 supports only flat variable substitution: `{{variable}}`. When a workflow step uses `saveAs`, the entire result is stored as a top-level variable. Accessing nested properties within saved results requires manual top-level variable assignment, which is cumbersome and breaks workflow readability.

This spec defines adding dot-notation support for accessing nested properties of saved results and context variables: `{{savedAs.property}}`, deep nesting: `{{savedAs.nested.key}}`, array index access: `{{items.0}}`, and null-safe access for missing keys.

After implementation, a user will be able to reference `{{clone.path}}` directly rather than having to work around the limitation with shell-based variable extraction.

## User Scenarios

S012-US-001 [P1] As a workflow author, I want to access nested properties of step results so that I can pass deep data to subsequent steps without manual flattening.

S012-US-002 [P1] As a workflow author, I want to access array elements by index so that I can work with list results from tasks or methods.

S012-US-003 [P2] As a workflow author, I want missing properties to resolve to empty strings so that workflows remain functional even when optional properties are absent.

S012-US-004 [P2] As a workflow author, I want to combine nested property access with `shellQuote` and `default` functions so that I can safely embed nested values in shell commands.

## Requirements Summary

| ID | Type | Priority | Title |
|----|------|----------|-------|
| S012-FR-001 | Functional | P1 | Dot-notation property access |
| S012-FR-002 | Functional | P1 | Deep nesting (multi-level paths) |
| S012-FR-003 | Functional | P1 | Array index access |
| S012-FR-004 | Functional | P1 | Missing property resolves to empty string |
| S012-FR-005 | Functional | P2 | Nested property in shellQuote function |
| S012-FR-006 | Functional | P2 | Nested property in default function |
| S012-FR-007 | Functional | P1 | Resolution in workflow step with args |
| S012-FR-008 | Functional | P1 | Resolution in workflow shell step |
| S012-FR-009 | Functional | P1 | Backward compatibility with flat variables |
| S012-AS-001 | Acceptance | P1 | Simple dot-notation access |
| S012-AS-002 | Acceptance | P1 | Deep nesting (three+ levels) |
| S012-AS-003 | Acceptance | P1 | Array index access |
| S012-AS-004 | Acceptance | P2 | Missing property returns empty string |
| S012-AS-005 | Acceptance | P2 | shellQuote with nested property |
| S012-AS-006 | Acceptance | P2 | default with nested property |
| S012-EC-001 | Edge Case | P1 | Partial path missing |
| S012-EC-002 | Edge Case | P1 | Array index out of bounds |
| S012-EC-003 | Edge Case | P1 | Non-array at array index |
| S012-EC-004 | Edge Case | P2 | Empty variable name part |
| S012-EC-005 | Edge Case | P1 | Intermediate value is scalar (not object/array) |
| S012-EC-006 | Edge Case | P1 | Object property access on non-object |
| S012-SC-001 | Success | P1 | All existing Context tests pass |
| S012-SC-002 | Success | P1 | Nested property access works end-to-end |
| S012-SC-003 | Success | P2 | No performance regression on template resolution |
| S012-NF-001 | Non-Functional | P2 | Resolution performance remains O(N) |
| S012-NF-002 | Non-Functional | P2 | Memory usage unchanged for simple variables |

## Cross-Spec Dependencies

- **Depends on:** S004 (Template System) -- this spec extends the template resolution engine
- **Required by:** S013 (Workflow Chaining -- relies on nested property access for step result data flow)

## Reference Implementation Notes

The current `Context::resolveTemplate()` method handles only flat variable names. A new `resolveNestedProperty()` private method will traverse dot-separated paths, supporting both array and object property access. Numeric path segments are treated as array indices.