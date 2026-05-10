# S002 Functional Requirements

### Layer Discovery and Loading

S002-FR-001 [P1] `ConfigLoader::loadConfig()` **MUST** obtain the ordered list of `.sir/` layer paths by calling `LayerResolver::resolve()` and **MUST** attempt to load config files from every returned layer path.

S002-FR-002 [P1] The system **MUST** load `config.yml` files using the Symfony YAML parser (`Yaml::parseFile`). A layer containing a valid `config.yml` **MUST** contribute its parsed array to the merged result.

S002-FR-003 [P1] The system **MUST** load `config.json` files using PHP's `json_decode` with associative array mode. A layer containing a valid `config.json` **MUST** contribute its parsed array to the merged result.

S002-FR-008 [P1] When both `config.yml` and `config.json` exist in the same layer, the system **MUST** load both. Within a single layer, `config.json` **MUST** be merged after `config.yml`, so JSON values override YAML values for the same keys within that layer.

S002-FR-009 [P2] `loadConfig()` **SHOULD** accept an optional `$startPath` parameter and pass it through to `LayerResolver::resolve()`. When `null`, the layer resolver **MUST** default to the current working directory.

S002-FR-010 [P2] If a YAML or JSON config file parses to a non-array value (e.g., a scalar string, `null`, or `false`), the system **MUST** silently skip that file without error and without affecting the merged result.

### Merge Strategy

S002-FR-004 [P1] Layers **MUST** be processed in reverse order (global/root first, nearest-to-cwd last) so that values from the nearest layer override values from parent layers.

S002-FR-005 [P1] Configuration arrays **MUST** be merged using PHP's `array_merge_recursive()`. This means:
S002-FR-005.a Associative keys present in both arrays produce a merged result where the child layer's values are appended after the parent layer's values.
S002-FR-005.b Numeric-indexed arrays from both layers are concatenated (values appended, not replaced).
S002-FR-005.c When the same associative key maps to a scalar in both layers, the result is an array containing both scalars (parent value first, child value second).

### Dot-Notation Access

S002-FR-006 [P1] `ConfigLoader::get($config, $key, $default)` **MUST** split `$key` on the `.` character and traverse the config array one level per segment. The final segment's value **MUST** be returned.

S002-FR-007 [P1] If any segment in the dot-notation path does not exist as an array key, or if an intermediate value is not an array, `get()` **MUST** return the `$default` parameter value.
S002-FR-007.a When no `$default` is provided, the return value **MUST** be `null`.
