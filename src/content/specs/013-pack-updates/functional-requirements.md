# S013 Functional Requirements

## Command Interface

S013-FR-001 [P1] The `sir recipes:update` command **MUST** accept an optional `<pack-id>` argument to update a single named pack.

S013-FR-001.a [Sub-criterion] When `<pack-id>` is provided, the command **MUST** operate only on that pack.

S013-FR-002 [P1] The `sir recipes:update` command **MUST** update all installed packs when called without arguments.

S013-FR-002.a [Sub-criterion] Updating all packs **MUST** process each pack sequentially, collecting results and summary.

S013-FR-003 [P1] The `sir recipes:update <pack-id>` command **MUST** accept a `--ref=<ref>` option to pin the pack to a specific branch, tag, or commit.

S013-FR-004 [P2] The `sir recipes:update` command **MUST** accept a `--project` flag to limit updates to project-level packs only.

S013-FR-005 [P1] The `sir recipes:update` command **MUST** accept a `--dry-run` flag that previews changes without applying them.

S013-FR-005.a [Sub-criterion] In dry-run mode, the command **MUST NOT** modify the pack directory, create backups, or update the lock file.

S013-FR-006 [P2] The `sir recipes:update --all --yes` command **MUST** update all packs non-interactively without prompting for confirmation.

S013-FR-006.a [Sub-criterion] The `--all` flag **MUST** be required in combination with `--yes` for non-interactive behavior.

## Version Detection

S013-FR-007 [P1] The system **MUST** read the current commit hash from `packs.lock.json` (field `commit`) to determine the installed version.

S013-FR-007.a [Sub-criterion] If the `commit` field is absent (packs installed before this spec), the system **MUST** treat the pack as having an unknown version and **MUST** perform a full update.

S013-FR-008 [P1] The system **MUST** run `git fetch origin` in the pack directory to fetch the latest commits from the remote.

S013-FR-009 [P1] The system **MUST** compare the current commit with the remote commit (HEAD of the tracked ref) to detect whether changes are available.

S013-FR-009.a [Sub-criterion] When `--ref` is specified, the system **MUST** compare against that specific ref instead of the default tracked branch.

S013-FR-019 [P1] If the remote HEAD commit matches the current commit, the system **MUST** skip the update and report the pack as already up to date.

## Backup

S013-FR-010 [P1] Before any update, the system **MUST** create a backup of the current pack directory at `.sir/packs/.backup/<pack-id>-<timestamp>/`.

S013-FR-010.a [Sub-criterion] The timestamp **MUST** be an ISO 8601-formatted string with colons replaced by underscores (e.g., `2026-04-24T10_30_00`).

S013-FR-010.b [Sub-criterion] The backup **MUST** be a recursive copy of the entire pack directory.

S013-FR-010.c [Sub-criterion] The backup **MUST** be created even when `--dry-run` is specified (dry-run still creates backup so rollback is possible if needed).

## Pull and Update

S013-FR-011 [P1] The system **MUST** perform the update via `git fetch origin` followed by `git reset --hard <target-ref>` where `<target-ref>` is either the specified `--ref` value or the current tracked branch.

S013-FR-011.a [Sub-criterion] When `--ref` is a branch or tag, the system **MUST** use `origin/<ref>` as the reset target.

S013-FR-011.b [Sub-criterion] When `--ref` is a commit SHA, the system **MUST** use that SHA directly as the reset target.

## Lock File Update

S013-FR-012 [P1] The system **MUST** update `packs.lock.json` after a successful pull with the new commit hash and a new `updated_at` timestamp.

S013-FR-012.a [Sub-criterion] The `commit` field **MUST** store the full 40-character Git commit SHA.

S013-FR-012.b [Sub-criterion] The `updated_at` field **MUST** store an ISO 8601 timestamp in UTC.

S013-FR-020 [P1] The system **MUST** add the `commit` field to lock file entries that do not have it (backward compatibility with pre-update installs).

S013-FR-021 [P1] The system **MUST** add the `updated_at` field to lock file entries that do not have it, setting it to the initial installation time if this is the first update.

## Validation

S013-FR-013 [P1] After pulling, the system **MUST** verify that `sir-pack.json` exists and is valid JSON in the pack root.

S013-FR-013.a [Sub-criterion] The system **MUST** verify that required fields (`name`, `version`, `methods`) are present in `sir-pack.json`.

S013-FR-013.b [Sub-criterion] The system **MUST** verify that the `methods/` directory exists and contains at least one `.json` file.

## Rollback

S013-FR-014 [P1] If pack validation fails after a pull, the system **MUST** restore the pack directory from the backup and **MUST NOT** update the lock file.

S013-FR-015 [P1] If a network error occurs during `git fetch` or `git reset`, the system **MUST** restore the pack directory from the backup and **MUST NOT** update the lock file.

S013-FR-015.a [Sub-criterion] Network errors **MUST** be distinguished from validation errors in the error message shown to the user.

## Conflict Detection

S013-FR-016 [P1] The system **MUST** detect uncommitted local changes in the pack directory by running `git status --porcelain`.

S013-FR-016.a [Sub-criterion] If any files are listed by `git status --porcelain`, local changes **MUST** be considered present.

S013-FR-017 [P2] When local changes are detected, the system **MUST** prompt the user with three options: (1) discard local changes and update, (2) skip this pack, (3) backup local changes and update.

S013-FR-017.a [Sub-criterion] In non-interactive mode (`--all --yes`), the system **MUST** automatically choose option 2 (skip) when local changes are detected.

## Default Ref

S013-FR-018 [P1] When `--ref` is omitted during update, the system **MUST** use the ref currently tracked in the lock file (the `ref` field).
