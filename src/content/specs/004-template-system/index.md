# S004: Template System

| Field | Value |
|-------|-------|
| Spec | S004 |
| Feature | Template expression resolution in workflow YAML values |
| Date | 2026-04-23 |
| Status | Implemented | Last Updated | 2026-05-10 |
| Source | `app/Services/Context.php` |

## Overview

The template system resolves `{{expression}}` patterns embedded in workflow YAML string values. It is the primary mechanism by which workflows reference dynamic data -- user inputs, variables set by prior steps, and results saved via `saveAs`.

Three expression forms are supported in v1:

1. **Simple variable substitution** -- `{{variable}}` looks up the named variable in the `Context` and replaces the expression with its string representation. Missing variables resolve to the empty string.
2. **Shell-safe quoting** -- `{{shellQuote(variable)}}` wraps the variable's value in `escapeshellarg()`, preventing shell injection when templates are interpolated into shell commands.
3. **Default fallback** -- `{{default(variable, 'fallback')}}` returns the variable's value if it exists, otherwise returns the fallback literal.

**v1 Behavior Note:** When a variable is set but empty (empty string), `default()` returns the empty string rather than the fallback. The intended behavior (per FR-004) is to return fallback for empty values, but v1 intentionally diverges for backward compatibility.

Template resolution occurs in four call sites: workflow step `with` arguments (method and task steps), shell step commands, method `impl.command` strings, and anywhere else `Context::resolveTemplate()` is invoked. The `Context` class owns all resolution logic -- there is no separate template engine.

## User Scenarios

S004-US-001 [P1] As a workflow author, I want to reference input parameters and step results inside YAML values so that steps can pass data to each other without shell workarounds.

S004-US-002 [P1] As a workflow author, I want to safely embed user-supplied values in shell commands so that special characters and spaces do not cause injection or breakage.

S004-US-003 [P2] As a workflow author, I want to provide fallback values for optional variables so that workflows remain functional when inputs are omitted.

## Requirements Summary

| ID | Type | Priority | Title |
|----|------|----------|-------|
| S004-FR-001 | Functional | P1 | Simple variable substitution |
| S004-FR-002 | Functional | P1 | Missing variable resolves to empty string |
| S004-FR-003 | Functional | P1 | shellQuote function |
| S004-FR-004 | Functional | P2 | default function with fallback |
| S004-FR-005 | Functional | P1 | Resolution in workflow method step args |
| S004-FR-006 | Functional | P1 | Resolution in workflow task step args |
| S004-FR-007 | Functional | P1 | Resolution in workflow shell step commands |
| S004-FR-008 | Functional | P1 | Resolution in method shell impl commands |
| S004-FR-009 | Functional | P1 | Inputs available as template variables |
| S004-FR-010 | Functional | P1 | Non-string args bypass resolution |
| S004-FR-011 | Functional | P2 | Multiple expressions in one string |
| S004-FR-012 | Functional | P1 | Whitespace tolerance in expressions |
| S004-AS-001 | Acceptance | P1 | Simple variable in shell step |
| S004-AS-002 | Acceptance | P1 | shellQuote prevents injection |
| S004-AS-003 | Acceptance | P2 | default provides fallback |
| S004-AS-004 | Acceptance | P1 | Step result chaining via saveAs |
| S004-AS-005 | Acceptance | P1 | Input parameters in method args |
| S004-AS-006 | Acceptance | P2 | Mixed literal and template string |
| S004-EC-001 | Edge Case | P1 | Undefined variable |
| S004-EC-002 | Edge Case | P1 | Empty string variable |
| S004-EC-003 | Edge Case | P2 | Non-string variable (array/object) |
| S004-EC-004 | Edge Case | P1 | shellQuote with special characters |
| S004-EC-005 | Edge Case | P2 | default with commas in fallback |
| S004-EC-006 | Edge Case | P2 | default with nested parentheses |
| S004-EC-007 | Edge Case | P1 | Nested property access |
| S004-EC-008 | Edge Case | P2 | No expressions in string |
| S004-EC-009 | Edge Case | P2 | Malformed expression (unclosed braces) |
| S004-EC-010 | Edge Case | P1 | shellQuote with undefined variable |
| S004-EC-011 | Edge Case | P2 | Non-string step arg values |
| S004-SC-001 | Success | P1 | All existing Context tests pass |
| S004-SC-002 | Success | P1 | Resolution coverage across call sites |
| S004-SC-003 | Success | P2 | No shell injection via template values |

## Cross-Spec Dependencies

- **Required by:** S012 (Nested Property Access -- future)
- **Related to:** S001 (Layer Resolution -- workflow discovery feeds template context)
- **Related to:** S002 (Configuration Loading -- config values may appear in context)
