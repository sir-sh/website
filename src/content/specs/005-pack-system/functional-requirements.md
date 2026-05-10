# S005 Functional Requirements

## Source Parsing

S005-FR-001 [P1] The system **MUST** parse the `github:owner/repo@ref` source format, extracting `owner/repo` as the repository and `@ref` as the Git reference (defaults to `main` when omitted).

S005-FR-001.a [Sub-criterion] The system **MUST** construct the full Git URL as `https://github.com/{owner}/{repo}.git` when parsing `github:` format.

S005-FR-002 [P1] The system **MUST** parse the `git:https://...#ref` source format, extracting the URL and `#ref` as the Git reference (defaults to `main` when omitted).

S005-FR-003 [P1] The system **MUST** parse the `owner/repo` shorthand format as equivalent to `github:owner/repo@main`, constructing `https://github.com/{owner}/{repo}.git`.

S005-FR-003.a [Sub-criterion] The shorthand format **MUST** also accept `@ref` suffix (e.g., `owner/repo@develop`).

S005-FR-004 [P1] The system **MUST** throw an `InvalidArgumentException` when the source string does not match any of the three supported formats.

## Installation

S005-FR-005 [P1] The system **MUST** clone the pack repository using `git clone --depth 1 --branch {ref}` to perform a shallow clone.

S005-FR-005.a [Sub-criterion] The clone operation **MUST** set a timeout of 300 seconds.

S005-FR-006 [P1] The system **MUST** install packs to `~/.sir/packs/{packId}` when `--project` flag is absent.

S005-FR-007 [P2] The system **MUST** install packs to `{cwd}/.sir/packs/{packId}` when `--project` flag is present.

S005-FR-008 [P1] The system **MUST** create the parent packs directory (global or project) if it does not exist prior to cloning.

S005-FR-009 [P1] The system **MUST** overwrite an existing pack directory if the same pack is reinstalled (idempotent reinstall).

S005-FR-010 [P1] The system **MUST** read and validate `sir-pack.json` from the cloned repository root before updating the lock file.

S005-FR-011 [P1] The system **MUST** throw a `RuntimeException` when `sir-pack.json` is absent from the cloned repository.

S005-FR-012 [P1] The system **MUST** throw a `RuntimeException` when `sir-pack.json` is malformed (not valid JSON or not an array/object).

S005-FR-013 [P1] The system **MUST** generate the pack ID from the repository name extracted from the Git URL (e.g., `sir-git` from `https://github.com/sir-sh/sir-git.git`).

S005-FR-014 [P2] The system **MAY** fall back to `pack-{md5}` of the URL if repository name extraction fails.

## Lock File

S005-FR-015 [P1] The system **MUST** create `packs.lock.json` at the global path (`~/.sir/packs.lock.json`) or project path (`{cwd}/.sir/packs.lock.json`) on first install.

S005-FR-016 [P1] The lock file **MUST** contain a `packs` object keyed by pack ID, with each entry storing `url`, `ref`, `type`, `metadata`, and `installed_at`.

S005-FR-017 [P1] The system **MUST** append or update the pack entry in `packs.lock.json` on each install.

S005-FR-018 [P1] The system **MUST** write lock files with `JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES` flags.

S005-FR-019 [P1] The system **MUST** remove the pack entry from `packs.lock.json` when the pack is removed.

S005-FR-020 [P2] The system **SHOULD** skip lock file update gracefully when the lock file is absent during remove operations.

## Pack Listing

S005-FR-021 [P1] The `sir recipes:list` command **MUST** read from the appropriate lock file based on `--project` flag.

S005-FR-022 [P1] The `sir recipes:list` command **MUST** return an empty array when no lock file exists.

S005-FR-023 [P1] The `sir recipes:list` command output **MUST** display pack ID, source, and installation path for each pack.

## Pack Removal

S005-FR-024 [P1] The `sir recipes:remove` command **MUST** delete the pack directory from the filesystem.

S005-FR-025 [P1] The `sir recipes:remove` command **MUST** update `packs.lock.json` to remove the pack entry.

S005-FR-026 [P1] The `sir recipes:remove` command **MUST** succeed silently (return true) when the pack directory does not exist.

S005-FR-027 [P2] The `sir recipes:remove` command **SHOULD** prompt for confirmation before deletion.

S005-FR-028 [P2] The `sir recipes:remove --project` variant **MUST** operate on the project-level pack directory and lock file.

## Method Discovery

S005-FR-029 [P1] Installed pack methods **MUST** be automatically discoverable by the MethodRegistry through layer resolution without requiring a separate activation step.

S005-FR-030 [P1] The PackManager **MUST** store pack metadata (from `sir-pack.json`) in the lock file entry for retrieval by the MethodRegistry.

## Stub Commands

S005-FR-031 [P2] The `sir recipes:update` command **MUST** output an informational message directing users to remove and reinstall packs (stub in v1).

S005-FR-032 [P2] The `sir recipes:apply` command **MUST** exist as a no-op informational stub in v1.

## Duplicate Detection

S005-FR-033 [P1] The system **MUST** detect and handle duplicate pack installations by overwriting the existing pack directory (not failing).

S005-FR-034 [P2] The system **MUST** detect pack ID collisions between different repositories and warn via a console message.
