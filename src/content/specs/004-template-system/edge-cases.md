# S004 Edge Cases

| ID | Scenario | Expected Behavior |
|----|----------|-------------------|
| S004-EC-001 | `{{undefinedVar}}` with no default | Resolves to empty string `""`. No exception or warning thrown. |
| S004-EC-002 | `{{shellQuote(undefinedVar)}}` -- undefined variable in shellQuote | Produces `''` (empty string safely quoted via `escapeshellarg`). The empty string is shell-safe. |
| S004-EC-003 | `{{default(v, 'fallback')}}` where `v` is defined but is an empty string `""` | Returns the empty string (v is defined and non-null). The fallback is not used because v exists, even though its value is empty. **Note:** Per S004-FR-004.b, intended behavior is to return fallback when value is empty string, but current v1 implementation returns the empty string. |
| S004-EC-004 | `{{shellQuote(value)}}` where value contains newlines, backticks, `$`, semicolons, or spaces | `escapeshellarg` produces a properly quoted string. Example: value `a b` → `'a b'`; value `` $HOME `` → `'$HOME'` (literal). Result is safe for `Process::fromShellCommandline()`. |
| S004-EC-005 | Template string `echo {{x}}` where `x` is backtick or other shell metacharacter | Variable substitution produces the raw value. For example, if `x` is `` ` ``, the result is `echo \`` (the backtick is inserted directly). No additional quoting is applied unless wrapped in `shellQuote`. |
| S004-EC-006 | `{{default(v, 'a,b')}}` -- comma inside fallback string | The fallback literal is trimmed of outer quotes and whitespace; literal comma is preserved inside the value. Example: `default(missing, 'a,b')` resolves to `a,b`. |
| S004-EC-007 | Template expression spans across a YAML line break | Template resolution operates on the already-loaded YAML string value (not raw YAML source). If the YAML parser has already joined the lines into one string, resolution proceeds normally. `{{` and `}}` must both be present within the same string value. |
| S004-EC-008 | Unclosed template expression: `{{variable` (no closing `}}`) | No substitution occurs; the literal `{{variable` is returned as-is. The resolution loop does not match an unclosed expression. |
| S004-EC-009 | Empty template expression: `{{}}` | No substitution occurs; the literal `{{}}` is returned as-is. The variable name extracted is empty, which resolves to empty string, so the net result is unchanged. |