# S005: Pack System

| Field | Value |
|-------|-------|
| Spec | S005 |
| Feature | Pack System |
| Date | 2026-04-23 |
| Status | Implemented | Last Updated | 2026-05-10 |
| Project | sir.sh CLI (`/Users/mark/Projects/Sir/cli`) |
| Tech Stack | PHP 8.2, Laravel Zero |

## Overview

Packs are reusable collections of methods that can be installed from Git repositories without requiring Composer. Each pack is a standalone Git repository containing a `sir-pack.json` metadata file, a `methods/` directory with JSON method definitions, and an optional `scripts/` directory for executable scripts referenced by methods.

The pack system provides three installation source formats: `github:owner/repo@ref` (explicit GitHub), `git:https://...#ref` (generic Git URL), and `owner/repo` shorthand (defaults to GitHub). Packs install to either `~/.sir/packs/` (global scope, default) or `.sir/packs/` (project scope, via `--project` flag). A `packs.lock.json` file at the corresponding scope tracks all installed packs with their source, ref, and metadata.

The CLI exposes pack management through the `recipes:` command namespace: `sir recipes:install` to add packs, `sir recipes:list` to display installed packs, and `sir recipes:remove` to uninstall packs. The `sir recipes:update` command is stubbed in v1 with a message directing users to remove-and-reinstall; full update behavior is deferred to S013. The `sir recipes:apply` command exists as a no-op informational stub. Once installed, pack methods are automatically discovered by the MethodRegistry (S006) through layer resolution (S001) and become available to workflows without further configuration.

## User Scenarios

S005-US-001 [P1] As a developer, I want to install a pack from a GitHub repository so that I can reuse pre-built method collections in my workflows.

S005-US-002 [P1] As a developer, I want to list all installed packs so that I can see which method collections are available.

S005-US-003 [P1] As a developer, I want to remove an installed pack so that I can clean up packs I no longer need.

S005-US-004 [P2] As a developer, I want to install a pack at project scope so that team members sharing the project can use the same packs without polluting their global configuration.

S005-US-005 [P2] As a developer, I want to install a pack from an arbitrary Git URL so that I can use packs hosted outside GitHub (e.g., GitLab, self-hosted).

S005-US-006 [P1] As a developer, I want installed pack methods to be automatically discoverable by workflows so that I do not need a separate activation step after installation.

## Requirements Summary

| ID | Type | Priority | Title |
|----|------|----------|-------|
| S005-FR-001 | Functional | P1 | Parse github: source format |
| S005-FR-002 | Functional | P1 | Parse git: source format |
| S005-FR-003 | Functional | P1 | Parse owner/repo shorthand |
| S005-FR-004 | Functional | P1 | Clone pack repository |
| S005-FR-005 | Functional | P1 | Read sir-pack.json metadata |
| S005-FR-006 | Functional | P1 | Install to global scope by default |
| S005-FR-007 | Functional | P2 | Install to project scope with --project |
| S005-FR-008 | Functional | P1 | Write packs.lock.json on install |
| S005-FR-009 | Functional | P1 | List installed packs |
| S005-FR-010 | Functional | P1 | Remove installed pack |
| S005-FR-011 | Functional | P1 | Remove pack from lock file |
| S005-FR-012 | Functional | P1 | Generate pack ID from repository name |
| S005-FR-013 | Functional | P2 | Confirm before remove |
| S005-FR-014 | Functional | P1 | Default ref to main when omitted |
| S005-FR-015 | Functional | P1 | Shallow clone (depth 1) |
| S005-FR-016 | Functional | P2 | recipes:update stub in v1 |
| S005-FR-017 | Functional | P2 | recipes:apply informational stub |
| S005-FR-018 | Functional | P1 | Overwrite existing pack on reinstall |
| S005-FR-019 | Functional | P1 | Create packs directory if absent |
| S005-FR-020 | Functional | P1 | Automatic method discovery from installed packs |
| S005-AS-001 | Acceptance | P1 | Install pack via github: format |
| S005-AS-002 | Acceptance | P1 | Install pack via owner/repo shorthand |
| S005-AS-003 | Acceptance | P2 | Install pack via git: URL |
| S005-AS-004 | Acceptance | P1 | List packs shows installed pack |
| S005-AS-005 | Acceptance | P1 | Remove pack deletes directory and lock entry |
| S005-AS-006 | Acceptance | P2 | Install to project scope |
| S005-AS-007 | Acceptance | P1 | No packs installed yields empty message |
| S005-AS-008 | Acceptance | P2 | Update command shows stub message |
| S005-AS-009 | Acceptance | P1 | Methods from installed pack are discoverable |
| S005-EC-001 | Edge Case | P1 | Invalid source format |
| S005-EC-002 | Edge Case | P1 | Missing sir-pack.json |
| S005-EC-003 | Edge Case | P1 | Malformed sir-pack.json |
| S005-EC-004 | Edge Case | P2 | Network unreachable during clone |
| S005-EC-005 | Edge Case | P2 | Invalid ref (branch/tag does not exist) |
| S005-EC-006 | Edge Case | P2 | Remove non-existent pack |
| S005-EC-007 | Edge Case | P2 | Lock file missing on list |
| S005-EC-008 | Edge Case | P2 | Lock file missing on remove |
| S005-EC-009 | Edge Case | P1 | Reinstall over existing pack |
| S005-EC-010 | Edge Case | P2 | Pack ID collision from different repos |
| S005-EC-011 | Edge Case | P2 | Repository URL without .git suffix |
| S005-SC-001 | Success Criteria | P1 | Pack cloned to correct path |
| S005-SC-002 | Success Criteria | P1 | Lock file accurately reflects state |
| S005-SC-003 | Success Criteria | P1 | Removal is clean |
| S005-SC-004 | Success Criteria | P1 | Methods discoverable post-install |
| S005-SC-005 | Success Criteria | P2 | Clone timeout enforced |
| S005-IF-001 | Interface | P1 | sir-pack.json schema |
| S005-IF-002 | Interface | P1 | packs.lock.json schema |
| S005-IF-003 | Interface | P1 | Source string formats |
| S005-IF-004 | Interface | P1 | Method definition JSON schema |
| S005-IF-005 | Interface | P1 | Pack directory structure |
| S005-IF-006 | Interface | P1 | CLI command signatures |

## Cross-Spec Dependencies

- **Depends on:** S001 (Layer Resolution -- resolves `.sir/` directories where packs are stored)
- **Required by:** S006 (Method System -- discovers and executes methods from installed packs), S013 (Pack Update -- extends pack lifecycle with update semantics)
