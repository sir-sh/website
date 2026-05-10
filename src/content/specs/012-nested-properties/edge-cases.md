# S012 Edge Cases

| ID | Scenario | Expected Behavior |
|----|----------|-------------------|
| S012-EC-001 | Partial path missing: `{{a.b.c}}` where `a.b` exists but `c` does not | Resolves to `""`. `a.b` is traversed successfully, but since `c` is not a property of the `a.b` value, the expression resolves to empty string. |
| S012-EC-002 | Array index out of bounds: `{{items.10}}` where `items` has only 3 elements | Resolves to `""`. Out-of-bounds array index is treated as missing property. |
| S012-EC-003 | Non-array at array index: `{{scalar.0}}` where `scalar` is a string `"text"` | Resolves to `""`. Cannot access index 0 on a scalar value. |
| S012-EC-004 | Empty variable name part: `{{a..b}}` (empty segment between dots) | Resolves to `""`. Empty segments are treated as missing properties. |
| S012-EC-005 | Intermediate value is scalar: `{{a.b.c}}` where `a.b` is the string `"text"` and `c` is accessed on it | Resolves to `""`. Cannot traverse into a scalar value; intermediate scalar terminates path resolution. |
| S012-EC-006 | Object property access on non-object: `{{val.property}}` where `val` is `null` | Resolves to `""`. Null has no properties to access. |
| S012-EC-007 | Negative array index: `{{items.-1}}` | Resolves to `""`. Negative indices are not supported. |
| S012-EC-008 | Leading dot: `{{.workspace}}` | Resolves to `""`. Leading dot indicates empty first segment, which is not a valid variable name. |
| S012-EC-009 | Trailing dot: `{{workspace.}}` | Resolves to `""`. Trailing dot indicates empty final segment, which is not a valid property name. |
| S012-EC-010 | Non-integer array-like key: `{{items.three}}` where `items` is a plain array `["a", "b", "c"]` | Resolves to `""`. String key `"three"` is not a valid integer index on a plain numeric array. |
| S012-EC-011 | Nested access on boolean: `{{val.trueProp}}` where `val` is `true` | Resolves to `""`. Booleans are scalar; cannot access properties on them. |
| S012-EC-012 | shellQuote on missing nested property: `{{shellQuote(obj.missing)}}` | Resolves to `''` (escapeshellarg of empty string). |
| S012-EC-013 | default on missing nested property with fallback containing dot: `{{default(obj.missing, 'a.b')}}` | Resolves to `a.b`. The fallback literal preserves the dot; it is NOT treated as nested access in the fallback value. |
| S012-EC-014 | Multiple dots in variable name handled by resolution order: `{{vars.key}}` where `vars` is `{"key.subkey": "value"}` | Resolves to `""` because `key` is not a property of `vars` (the actual key is `key.subkey`). The presence of a dot in what the user intended as a literal key name is ambiguous; resolution as nested access takes precedence. |