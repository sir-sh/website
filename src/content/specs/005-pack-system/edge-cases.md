# S005 Edge Cases

| ID | Scenario | Expected Behavior |
|----|----------|-------------------|
| S005-EC-001 | Installing from a repository that has no `sir-pack.json` | The system **MUST** throw a `RuntimeException` with message "Pack metadata file not found: sir-pack.json" and abort the installation. No pack directory or lock entry is created. |
| S005-EC-002 | Installing from a repository with malformed `sir-pack.json` (invalid JSON) | The system **MUST** throw a `RuntimeException` with message "Invalid pack metadata format". No pack directory or lock entry is created. |
| S005-EC-003 | Duplicate install of the same pack (same source and ref) | The system **MUST** overwrite the existing pack directory with a fresh clone. The lock file entry is updated with the current timestamp. No error is thrown. |
| S005-EC-004 | Duplicate install with different ref (e.g., same pack, `@develop` then `@main`) | The system **MUST** overwrite the existing pack directory and update the lock file entry with the new ref. |
| S005-EC-005 | Invalid Git URL format in `git:` source | The system **MUST** throw an `InvalidArgumentException` during parsing. No network call is made. |
| S005-EC-006 | Network failure during clone (Git server unreachable) | The system **MUST** throw a `RuntimeException` with message "Failed to clone repository: {error output}". No lock entry is created. |
| S005-EC-007 | Invalid ref (branch or tag does not exist on remote) | The system **MUST** throw a `RuntimeException` with message "Failed to clone repository". Git error output is included. |
| S005-EC-008 | Removing a pack that does not exist (no directory, no lock entry) | The system **MUST** return `true` silently without error. No lock file modification occurs. |
| S005-EC-009 | Removing a pack that exists in filesystem but not in lock file | The system **MUST** delete the pack directory. The lock file remains unchanged (no entry to remove). |
| S005-EC-010 | Lock file is missing when running `recipes:list` | The system **MUST** return an empty array and display an empty list message. No error is thrown. |
| S005-EC-011 | Lock file is missing when running `recipes:remove` | The system **MUST** attempt to delete the pack directory if it exists. Return `true` silently. No lock file modification occurs. |
| S005-EC-012 | Lock file is corrupted (invalid JSON) | The system **SHOULD** treat the lock file as empty and overwrite with valid data on next install. |
| S005-EC-013 | Installing to project when global already has the same pack ID | Both installations are independent. Project-level pack is stored at `.sir/packs/`. Global pack remains at `~/.sir/packs/`. Lock files are separate. |
| S005-EC-014 | Pack ID collision: two different repos generate the same ID | The system **SHOULD** display a warning to the console. The second install overwrites the first in the lock file and filesystem. |
| S005-EC-015 | Repository URL without `.git` suffix (e.g., `https://github.com/owner/repo`) | The system **MUST** still correctly extract the repository name and clone successfully via GitHub's automatic `.git` resolution. |
| S005-EC-016 | Clone timeout exceeded (300 seconds) | The system **MUST** throw a `RuntimeException` with a timeout-related message. No lock entry is created. |
| S005-EC-017 | Pack installed with non-existent parent directory (e.g., `~/.sir` does not exist) | The system **MUST** create `~/.sir/packs/` recursively before cloning. Installation succeeds. |
| S005-EC-018 | `recipes:list --project` when no project `.sir/` directory exists | The system **MUST** return an empty array. No error is thrown. No directory is created. |
