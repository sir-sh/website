# S012 Functional Requirements

## Property Access

S012-FR-001 [P1] The system **MUST** support dot-notation property access in `{{expression}}` templates. When the expression contains one or more dots, it **MUST** be treated as a nested property path rather than a flat variable name.

S012-FR-001.a The path separator is the ASCII period character (`.`). No other separator **MAY** be used for nesting.

S012-FR-001.b Example: `{{workspace.root}}` means "access the `root` property of the `workspace` variable."

S012-FR-002 [P1] The system **MUST** support deep nesting with three or more path segments. `{{a.b.c}}`, `{{a.b.c.d}}`, and deeper **MUST** all be supported.

S012-FR-002.a The resolution traverses each segment in order, treating each as a property or index access on the current value.

S012-FR-003 [P1] The system **MUST** support array index access using a numeric segment. `{{items.0}}` **MUST** return the first element of the `items` array.

S012-FR-003.a Numeric segments **MUST** be cast to integers before use as an array index.

S012-FR-003.b Negative indices **MUST NOT** be supported; out-of-bounds negative indices resolve to empty string.

S012-FR-004 [P1] When any segment of a nested path does not exist in the data structure, the system **MUST** resolve the entire expression to the empty string `""`.

S012-FR-004.a No exception or warning **MAY** be emitted for missing nested properties.

## Function Support with Nested Properties

S012-FR-005 [P2] The system **MUST** support nested property expressions inside the `shellQuote()` function. `{{shellQuote(object.property)}}` **MUST** resolve the nested property and then apply `escapeshellarg()` to the resulting value.

S012-FR-005.a If the nested property resolves to empty string, `shellQuote` **MUST** return `''`.

S012-FR-006 [P2] The system **MUST** support nested property expressions inside the `default()` function. `{{default(object.property, 'fallback')}}` **MUST** resolve the nested property first, then apply the fallback logic to the resolved value.

S012-FR-006.a If the nested property resolves to empty string (missing or explicitly empty), the fallback **MUST** be returned.

## Call-Site Resolution

S012-FR-007 [P1] `WorkflowRunner` **MUST** resolve nested property expressions in every string value of the `with` argument map before passing arguments to `MethodExecutor::execute()`.

S012-FR-008 [P1] `WorkflowRunner` **MUST** resolve nested property expressions in the `shell` value of a shell step before passing the command string to `Process::fromShellCommandline()`.

## Backward Compatibility

S012-FR-009 [P1] The system **MUST** maintain full backward compatibility. Expressions without dots **MUST** continue to behave exactly as before S012-FR-001. `{{variable}}` with no dot **MUST** resolve to the top-level variable exactly as in v1.

S012-FR-009.a There **MUST NOT** be any change in behavior for workflows that do not use nested property access.

## Context Traversal Rules

S012-FR-010 [P1] When traversing a nested path, the system **MUST** first check if the current value is an array. If so, it **MUST** use integer array access.

S012-FR-011 [P1] When traversing a nested path, if the current value is an object (stdClass or associative array with string keys), the system **MUST** use property access.

S012-FR-012 [P1] If the current value is a scalar (string, integer, float, boolean) and more path segments remain, the system **MUST** resolve to empty string (cannot traverse further into a scalar).

## Performance

S012-FR-013 [P3] The system **SHOULD** cache resolved nested paths within a single `resolveTemplate()` call to avoid redundant traversals when the same path appears multiple times in a template string.