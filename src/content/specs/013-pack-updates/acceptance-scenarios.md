# S013 Acceptance Scenarios

### S013-AS-001 [Update specific pack shows diff] [P1]
**Given** a pack `example-pack` is installed with commit `abc123` on branch `main`
**And** the remote repository has a new commit `def456` on `main`
**When** the user runs `sir recipes:update example-pack`
**Then** the system displays the number of commits behind/ahead
**And** updates the pack to commit `def456`
**And** the backup is created at `.sir/packs/.backup/example-pack-<timestamp>/`

### S013-AS-002 [Update with --dry-run shows changes without applying] [P1]
**Given** a pack `example-pack` is installed with commit `abc123`
**And** the remote has new commits available
**When** the user runs `sir recipes:update example-pack --dry-run`
**Then** a diff summary is shown (commits behind/ahead)
**And** the pack directory remains at commit `abc123`
**And** no backup is created
**And** `packs.lock.json` is not modified

### S013-AS-003 [Failed update triggers automatic rollback] [P1]
**Given** a pack `example-pack` is installed at commit `abc123`
**And** the backup exists at `.sir/packs/.backup/example-pack-<timestamp>/`
**When** a `git pull` is attempted but validation fails (e.g., `sir-pack.json` missing)
**Then** the system restores the pack directory from backup
**And** the lock file commit field remains `abc123`
**And** an error message is displayed indicating rollback occurred

### S013-AS-004 [Update adds commit and updated_at to lock file] [P1]
**Given** a pack `example-pack` is installed with only `url`, `ref`, `type`, `metadata`, and `installed_at` in the lock entry
**When** the user runs `sir recipes:update example-pack`
**Then** the lock file entry is updated to include `commit` (the current SHA)
**And** `updated_at` is set to the current ISO 8601 timestamp
**And** existing fields (`url`, `ref`, `type`, `metadata`, `installed_at`) are preserved

### S013-AS-005 [Update with --ref pins to specified ref] [P2]
**Given** a pack `example-pack` is installed tracking branch `main` at commit `abc123`
**When** the user runs `sir recipes:update example-pack --ref=v2.0.0`
**Then** the system fetches and resets to the tag `v2.0.0`
**And** the lock file `ref` field is updated to `v2.0.0`
**And** the `commit` field is updated to the SHA of `v2.0.0`

### S013-AS-006 [--all --yes updates all without prompts] [P2]
**Given** two packs `pack-a` and `pack-b` are installed
**And** both have remote updates available
**When** the user runs `sir recipes:update --all --yes`
**Then** both packs are updated sequentially without any confirmation prompts
**And** a summary is displayed: N updated, N skipped, N failed

### S013-AS-007 [Local changes trigger conflict prompt] [P1]
**Given** a pack `example-pack` is installed and has uncommitted local changes
**When** the user runs `sir recipes:update example-pack`
**Then** the system displays a warning about local changes
**And** prompts the user to choose: discard changes, skip, or backup and update
**And** the chosen action is executed

### S013-AS-008 [--project updates only project-level packs] [P1]
**Given** a global pack `example-pack` is installed at `~/.sir/packs/example-pack`
**And** a project-level pack `example-pack` is installed at `.sir/packs/example-pack`
**When** the user runs `sir recipes:update --project`
**Then** the global pack is not touched
**And** only the project-level pack is checked for updates

### S013-AS-009 [Update all packs reports summary] [P1]
**Given** three packs are installed: `pack-a` (has updates), `pack-b` (up to date), `pack-c` (has updates)
**When** the user runs `sir recipes:update`
**Then** a table is shown with pack name, current version, available version, and status
**And** after updates, a summary line shows: "Updated 2 packs, 1 already up to date"

### S013-AS-010 [Specifying --ref during update-all is rejected] [P1]
**Given** multiple packs are installed
**When** the user runs `sir recipes:update --all --ref=v2.0.0`
**Then** an error is displayed: "--ref cannot be used with --all"
**And** no updates are performed

### S013-AS-011 [Network failure during update triggers rollback] [P1]
**Given** a pack `example-pack` is installed
**When** the user runs `sir recipes:update example-pack` and the network is unavailable
**Then** the system displays a network error message
**And** restores the pack directory from backup
**And** the lock file is not modified

### S013-AS-012 [Update with pre-update install has no commit field] [P2]
**Given** a pack `example-pack` was installed before S013 (lock entry has no `commit` field)
**When** the user runs `sir recipes:update example-pack`
**Then** the system fetches the remote and updates to current HEAD
**And** the `commit` and `updated_at` fields are added to the lock file entry
