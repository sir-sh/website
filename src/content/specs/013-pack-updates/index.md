# S013: Pack Updates

| Field | Value |
|-------|-------|
| Spec | S013 |
| Feature | Pack Update Functionality |
| Date | 2026-04-24 |
| Status | Implemented | Last Updated | 2026-05-10 |
| Project | sir.sh CLI (`/Users/mark/Projects/Sir/cli`) |
| Tech Stack | PHP 8.2, Laravel Zero |

## Overview

The `sir recipes:update` command extends the pack system (S005) with a full update lifecycle: checking for new commits, detecting local conflicts, creating backups, pulling updates, validating pack structure, and updating the lock file. It supports both interactive and non-interactive modes, and provides automatic rollback on failure. The enhanced lock file format adds `commit` and `updated_at` fields to track the exact Git state of each installed pack.

Update is triggered via `sir recipes:update` (all packs), `sir recipes:update <pack-id>` (specific pack), `sir recipes:update <pack-id> --ref=v2.0.0` (pin to ref), `sir recipes:update --project` (project scope only), `sir recipes:update --dry-run` (preview), and `sir recipes:update --all --yes` (non-interactive all). The process detects uncommitted local changes before updating and prompts the user to choose a conflict resolution strategy. A backup is created before every update; if validation fails or a network error occurs, the pack is restored from backup automatically.

## User Scenarios

S013-US-001 [P1] As a developer, I want to update a single pack so that I can get the latest methods from that pack without touching others.

S013-US-002 [P1] As a developer, I want to preview updates before applying them so that I can see which packs have new versions.

S013-US-003 [P1] As a developer, I want automatic rollback if an update fails so that my workflows are never left in a broken state.

S013-US-004 [P2] As a developer, I want to pin a pack to a specific ref (tag or commit) so that I can lock onto a known-good version.

S013-US-005 [P2] As a developer, I want to update all packs at once non-interactively so that I can automate updates in CI.

S013-US-006 [P2] As a developer, I want to be prompted when there are local changes so that I can decide whether to discard or preserve them.

## Requirements Summary

| ID | Type | Priority | Title |
|----|------|----------|-------|
| S013-FR-001 | Functional | P1 | Update single pack by ID |
| S013-FR-002 | Functional | P1 | Update all installed packs |
| S013-FR-003 | Functional | P1 | Update with pinned ref via --ref flag |
| S013-FR-004 | Functional | P2 | Update project-level packs only via --project |
| S013-FR-005 | Functional | P1 | Dry-run preview via --dry-run flag |
| S013-FR-006 | Functional | P2 | Non-interactive update via --all --yes |
| S013-FR-007 | Functional | P1 | Check current version from lock file |
| S013-FR-008 | Functional | P1 | Fetch latest commits from remote |
| S013-FR-009 | Functional | P1 | Detect changes between current and remote |
| S013-FR-010 | Functional | P1 | Create backup before update |
| S013-FR-011 | Functional | P1 | Pull updates via git fetch + reset |
| S013-FR-012 | Functional | P1 | Update lock file with new commit and timestamp |
| S013-FR-013 | Functional | P1 | Validate pack structure post-update |
| S013-FR-014 | Functional | P1 | Rollback on validation failure |
| S013-FR-015 | Functional | P1 | Rollback on network error |
| S013-FR-016 | Functional | P1 | Detect uncommitted local changes |
| S013-FR-017 | Functional | P2 | Conflict resolution options for local changes |
| S013-FR-018 | Functional | P1 | Update --ref to main when omitted during update |
| S013-FR-019 | Functional | P1 | Skip pack with no remote changes |
| S013-FR-020 | Functional | P1 | Add commit field to lock file entry |
| S013-FR-021 | Functional | P1 | Add updated_at field to lock file entry |
| S013-AS-001 | Acceptance | P1 | Update specific pack shows diff |
| S013-AS-002 | Acceptance | P1 | Update with --dry-run shows changes without applying |
| S013-AS-003 | Acceptance | P1 | Failed update triggers automatic rollback |
| S013-AS-004 | Acceptance | P1 | Update adds commit and updated_at to lock file |
| S013-AS-005 | Acceptance | P2 | Update with --ref pins to specified ref |
| S013-AS-006 | Acceptance | P2 | --all --yes updates all without prompts |
| S013-AS-007 | Acceptance | P1 | Local changes trigger conflict prompt |
| S013-AS-008 | Acceptance | P1 | --project updates only project-level packs |
| S013-EC-001 | Edge Case | P1 | Network error during git fetch |
| S013-EC-002 | Edge Case | P1 | Pack validation fails post-pull |
| S013-EC-003 | Edge Case | P1 | Uncommitted local changes detected |
| S013-EC-004 | Edge Case | P2 | Pack directory is a git repo with no remote |
| S013-EC-005 | Edge Case | P2 | Lock file entry has no commit field (pre-update install) |
| S013-EC-006 | Edge Case | P2 | Pack not in lock file but directory exists |
| S013-EC-007 | Edge Case | P1 | Update to same ref (no changes) |
| S013-EC-008 | Edge Case | P2 | Backup directory already exists |
| S013-EC-009 | Edge Case | P1 | Specified pack ID not found |
| S013-SC-001 | Success Criteria | P1 | Lock file has commit and updated_at after update |
| S013-SC-002 | Success Criteria | P1 | Rollback restores exact pre-update state |
| S013-SC-003 | Success Criteria | P1 | --dry-run never modifies files or lock file |
| S013-SC-004 | Success Criteria | P1 | --all --yes proceeds without any prompts |
| S013-SC-005 | Success Criteria | P2 | Backup is created at .sir/packs/.backup/ |
| S013-IF-001 | Interface | P1 | Enhanced packs.lock.json schema with commit and updated_at |
| S013-IF-002 | Interface | P1 | sir recipes:update command signature |
| S013-NF-001 | Non-Functional | P2 | Update must complete in under 120 seconds per pack |
| S013-NF-002 | Non-Functional | P2 | Backup storage must not exceed pack size |
| S013-NF-003 | Non-Functional | P1 | Clear, actionable error messages for all failure modes |

## Cross-Spec Dependencies

- **Depends on:** S005 (Pack System -- install, lock file format, pack structure)
- **Required by:** (none yet -- this is the first spec to extend pack lifecycle)
