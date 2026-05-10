# S001 Functional Requirements

## Directory Walk

S001-FR-001 [P1] The `LayerResolver::resolve()` method **MUST** begin at the provided `$startPath` (or the current working directory if `$startPath` is null) and walk upward through every parent directory until reaching the filesystem root `/`.

S001-FR-002 [P1] At each directory visited during the upward walk, the resolver **MUST** check whether a `.sir` subdirectory exists (`is_dir`) and, if so, append its absolute path to the result array.

S001-FR-003 [P1] The result array **MUST** be ordered with the nearest layer (closest to cwd) at index 0 and progressively more distant parent layers at higher indices.

S001-FR-010 [P1] When the walk reaches the filesystem root `/`, the resolver **MUST** check for `/.sir` and include it if it exists as a directory.

## Global Layer

S001-FR-004 [P1] After completing the directory walk, the resolver **MUST** check for a global `.sir` directory at the user's home path and append it to the result array if it exists and is not already present.

S001-FR-007 [P1] The global `.sir` path **MUST** be determined by reading the `HOME` environment variable first, falling back to `USERPROFILE` if `HOME` is not set.

S001-FR-009 [P2] The `ensureGlobalSirExists()` method **SHOULD** create the global `~/.sir` directory with mode `0755` (recursive) if it does not already exist.

## Path Handling

S001-FR-005 [P1] The resolver **MUST** canonicalize the `$startPath` using `realpath()` before beginning the walk, ensuring all returned paths are absolute and symlink-resolved.

S001-FR-011 [P1] The result array **MUST NOT** contain duplicate paths. If the global `~/.sir` path was already discovered during the directory walk, it **MUST NOT** be appended again.

S001-FR-008 [P1] If no `.sir` directories are found during the walk and the global `~/.sir` does not exist, the resolver **MUST** return an empty array.

## Git Boundary

S001-FR-006 [P2] When `$stopAtGit` is `true`, the resolver **SHOULD** stop the upward walk after processing a directory that contains a `.git` subdirectory. The `.sir` directory within the `.git`-containing directory itself **MUST** still be included if it exists.

S001-FR-006.a The `.git` boundary check **MUST** occur after checking for `.sir` in the current directory but before ascending to the parent.

## sir where Command

S001-FR-012 [P2] The `sir where` command **SHOULD** display all resolved layers in precedence order, numbered starting from 1, with the header "Loaded .sir layers (in precedence order):" and the footer "Nearest layer takes precedence.".

S001-FR-013 [P2] When no layers are found, the `sir where` command **SHOULD** display the warning "No .sir directories found." followed by guidance showing `mkdir ~/.sir` and `mkdir .sir` as remediation commands.

S001-FR-013.a The command **MUST** return exit code 0 (SUCCESS) regardless of whether layers are found.
