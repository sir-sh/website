# S013 Edge Cases

| ID | Scenario | Expected Behavior |
|----|----------|-------------------|
| S013-EC-001 | Network error during `git fetch` | The system **MUST** display a network error message with the underlying Git error output. The backup **MUST** be restored. The lock file **MUST NOT** be modified. Exit code **MUST** be non-zero. |
| S013-EC-002 | Pack validation fails post-pull (`sir-pack.json` missing or invalid) | The system **MUST** display a validation error message. The backup **MUST** be restored. The lock file **MUST NOT** be modified. Exit code **MUST** be non-zero. |
| S013-EC-003 | Uncommitted local changes detected via `git status --porcelain` | The system **MUST** halt and prompt with three conflict resolution options. The update **MUST NOT** proceed until the user chooses an option or the command is cancelled. |
| S013-EC-004 | Pack directory is a git repo with no remote configured | The system **MUST** display an error: "No remote configured for pack <id>. Cannot update." The pack **MUST** be skipped. No backup or lock file change occurs. |
| S013-EC-005 | Lock file entry has no `commit` field (pre-update install) | The system **MUST** treat the pack as "unknown version" and **MUST** still fetch and update. The `commit` and `updated_at` fields **MUST** be added to the lock file entry during the update. |
| S013-EC-006 | Pack directory exists but pack ID is not in lock file | The system **MUST** display a warning: "Pack <id> found in filesystem but not in lock file. Skipping." No update is performed for that pack. |
| S013-EC-007 | Update target is already at the same commit | The system **MUST** display: "Pack <id> is already up to date." No backup is created. Lock file is unchanged. |
| S013-EC-008 | Backup directory `.sir/packs/.backup/` already exists | The system **MUST** create the new backup inside the existing `.backup/` directory with a unique timestamped subdirectory. No conflict or error occurs. |
| S013-EC-009 | Specified `<pack-id>` is not found in lock file | The system **MUST** display an error: "Pack '<id>' is not installed." No update is attempted. Exit code **MUST** be non-zero. |
| S013-EC-010 | `--ref` points to a non-existent ref on remote | The system **MUST** display an error: "Ref '<ref>' not found on remote." No update is performed. Exit code **MUST** be non-zero. |
| S013-EC-011 | `--project` flag used but no project-level `.sir/` directory exists | The system **MUST** display a warning: "No project-level packs directory found." No update is attempted. Exit code **MUST** be non-zero. |
| S013-EC-012 | `--all` is specified but `--yes` is not (interactive mode) | The system **MUST** prompt for confirmation before updating each pack with available updates. Updates proceed one by one upon user confirmation. |
| S013-EC-013 | Pack installed via SSH URL (`git@github.com:...`) with `--dry-run` | The `--dry-run` **MUST** still fetch remote info correctly without interactive SSH prompts (SSH agent must be available or connection must be non-interactive). |
| S013-EC-014 | `packs.lock.json` is corrupted (invalid JSON) during update | The system **MUST** treat the lock file as empty and **MUST** display an error: "Lock file is corrupted. Cannot update." No pack updates proceed. |
| S013-EC-015 | Backup directory is on a read-only or full filesystem | The system **MUST** display an error: "Failed to create backup: filesystem error." No update proceeds. Exit code **MUST** be non-zero. |
| S013-EC-016 | Multiple packs have updates but one fails mid-batch | The system **MUST** complete the batch update for remaining packs. The failed pack **MUST** be skipped with an error. The summary **MUST** show N updated, N failed, N skipped. |
| S013-EC-017 | Pack uses a Git reference (tag) that has been force-updated on remote | The system **MUST** fetch the updated tag and reset to the new SHA. The lock file `commit` field **MUST** be updated to the new SHA. |
| S013-EC-018 | `--ref` is a full 40-character commit SHA that is an ancestor of current HEAD | The system **MUST** reset to that specific SHA (downgrade). This is allowed. Lock file is updated with the older SHA. |
| S013-EC-019 | Pack directory deleted externally between backup and pull | The system **MUST** detect the missing directory after backup and before pull. An error **MUST** be displayed. Rollback **MUST** fail since the backup is the only remaining copy. Exit code **MUST** be non-zero. |
| S013-EC-020 | User cancels during conflict resolution prompt | The system **MUST** abort the update for that pack and continue to the next pack (if `--all`) or exit gracefully. No files are modified. Exit code **MUST** be non-zero. |
