# S006 Edge Cases

| ID | Scenario | Expected Behavior |
|----|----------|-------------------|
| S006-EC-001 | Method with missing required arg | `InvalidArgumentException` thrown with message `"Required argument missing: {name}"` |
| S006-EC-002 | Method arg type mismatch (string provided for int) | Value is cast to integer via `(int)`; `"8080"` becomes `8080` |
| S006-EC-003 | Unknown method called via `MethodRegistry::get()` | Returns `null`; no exception thrown |
| S006-EC-004 | Template in method arg resolves to empty string | The empty string is substituted; no error thrown |
| S006-EC-005 | exec type method with invalid JSON on stdin | The external program receives malformed JSON on stdin; result depends on program's error handling |
| S006-EC-006 | exec type method producing non-JSON stdout | Result contains `raw_output` with the raw stdout string; no exception thrown |
| S006-EC-007 | Method with `effects.network: false` but underlying impl calls network | The `effects` metadata is informational only; system does not enforce it -- network calls may still occur |
| S006-EC-008 | Method timeout handling | Process timeout is set to `null` (no timeout); long-running methods run to completion without interruption |
| S006-EC-009 | Streaming output with large output | Output is streamed line-by-line as it is produced; no buffering cutoff |
| S006-EC-010 | Malformed JSON method file in methods directory | File is skipped; `json_decode()` returns `null` and `is_array()` check fails; processing continues with other files |
| S006-EC-011 | Empty command string for shell type method | `InvalidArgumentException` thrown with message `"Shell command is required"` |
| S006-EC-012 | Empty command array for exec type method | `InvalidArgumentException` thrown with message `"Exec command is required"` |
| S006-EC-013 | Pack directory with no `methods` subdirectory | No error; the pack is silently skipped during method discovery |
| S006-EC-014 | Methods directory contains non-JSON files | Non-JSON files are silently ignored; only `*.json` files are loaded |
| S006-EC-015 | Argument type not in supported set (unknown type) | Value is passed through unchanged (no cast applied) |
| S006-EC-016 | Shell command exits with non-zero code | Result returns `exitCode` with the non-zero value and `success: false`; no exception thrown |
| S006-EC-017 | `args` block absent from method definition | `validateAndApplyDefaults()` iterates over an empty array; all provided args are ignored; no error thrown |
| S006-EC-018 | `sir-pack.json` missing from pack directory | Fallback namespace is set to `basename($packPath)` |
| S006-EC-019 | `sir-pack.json` contains invalid JSON | Empty metadata array `[]` is returned; no error thrown |
| S006-EC-020 | Method name not in JSON and filename is `foo-bar.json` | Method name falls back to `foo-bar` (filename without extension) |
| S006-EC-021 | `impl` block absent from method definition | `impl` defaults to `[]`; `impl['type']` is `null`; `executeShell()` is called with empty command string, throwing `"Shell command is required"` |
| S006-EC-022 | `effects.writes` contains template expressions | Template expressions are NOT resolved in `effects` metadata; the raw template strings are preserved as-is |
| S006-EC-023 | Boolean `false` provided as argument value | `(bool)false` returns `false`; value is preserved correctly |
| S006-EC-024 | Integer `0` provided as default or argument | `(int)0` and `(bool)0` both return `0`/`false` respectively; zero values are preserved through type casting |
