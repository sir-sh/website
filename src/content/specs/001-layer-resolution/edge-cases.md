# S001 Edge Cases

| ID | Scenario | Expected Behavior |
|----|----------|-------------------|
| S001-EC-001 | cwd is the filesystem root `/` | The resolver checks `/.sir`, then appends `~/.sir` if it exists. No upward walk occurs beyond root. Returns at most two entries. |
| S001-EC-002 | `$startPath` contains symlinks (e.g., `/tmp` symlinked to `/private/tmp` on macOS) | `realpath()` resolves the symlink before the walk begins. All returned paths are canonical absolute paths with no symlink components. |
| S001-EC-003 | `HOME` environment variable is unset and `USERPROFILE` is also unset | `getGlobalSirPath()` returns a path based on an empty/falsy home value. The global `.sir` check calls `is_dir()` on this path and it will not exist, so no global layer is added. The resolver does not throw. |
| S001-EC-004 | `~/.sir` is located on the walk path (e.g., cwd is `~/projects/foo`) | The walk discovers `~/.sir` naturally. When the post-walk global append runs, the `in_array()` guard prevents duplication. The result contains `~/.sir` exactly once, at the position discovered during the walk (not moved to the end). |
| S001-EC-005 | A `.sir` file (not directory) exists at some level | `is_dir()` returns false for files. The file is silently skipped. Only `.sir` directories are collected. |
| S001-EC-006 | cwd is 20+ levels deep (e.g., `/a/b/c/d/.../t/u/`) | The walk completes without stack overflow or excessive delay. Each level is a single `dirname()` call. Performance remains under 50ms. |
| S001-EC-007 | `dirname($current)` returns the same value as `$current` (filesystem root loop guard) | The `$parent === $current` check breaks the loop, preventing infinite iteration. This is the secondary termination condition after `$current !== $root`. |
| S001-EC-008 | `$startPath` is `null` | The resolver defaults to `getcwd()` and proceeds with the normal walk. Behavior is identical to calling `resolve()` with no arguments. |
