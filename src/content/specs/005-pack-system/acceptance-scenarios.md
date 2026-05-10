# S005 Acceptance Scenarios

### S005-AS-001 [Install pack via github: format] [P1]
**Given** a valid GitHub repository `sir-sh/example-pack` exists with a valid `sir-pack.json`
**When** the user runs `sir recipes:install github:sir-sh/example-pack@main`
**Then** the pack is cloned to `~/.sir/packs/example-pack`
**And** `~/.sir/packs.lock.json` is created or updated with the pack entry
**And** the pack metadata is stored in the lock entry

### S005-AS-002 [Install pack via owner/repo shorthand] [P1]
**Given** a valid GitHub repository `sir-sh/example-pack` exists with a valid `sir-pack.json`
**When** the user runs `sir recipes:install sir-sh/example-pack`
**Then** the pack is cloned to `~/.sir/packs/example-pack`
**And** the default ref `main` is used

### S005-AS-003 [Install pack via git: URL] [P2]
**Given** a valid Git repository at `https://gitlab.com/sir-sh/example-pack.git` exists with a valid `sir-pack.json`
**When** the user runs `sir recipes:install git:https://gitlab.com/sir-sh/example-pack.git#develop`
**Then** the pack is cloned from the GitLab URL using the `develop` branch

### S005-AS-004 [List packs shows installed pack] [P1]
**Given** a pack `example-pack` has been installed to global scope
**When** the user runs `sir recipes:list`
**Then** the output includes `example-pack` with its source URL and install path
**And** the output shows the pack metadata from `sir-pack.json`

### S005-AS-005 [Remove pack deletes directory and lock entry] [P1]
**Given** a pack `example-pack` is installed to global scope at `~/.sir/packs/example-pack`
**And** `~/.sir/packs.lock.json` contains the `example-pack` entry
**When** the user runs `sir recipes:remove example-pack`
**Then** the directory `~/.sir/packs/example-pack` is deleted
**And** the `example-pack` entry is removed from `~/.sir/packs.lock.json`

### S005-AS-006 [Install to project scope] [P2]
**Given** the current working directory is a project root with a `.sir/` directory
**When** the user runs `sir recipes:install sir-sh/example-pack --project`
**Then** the pack is cloned to `{cwd}/.sir/packs/example-pack`
**And** a project-level `packs.lock.json` is created at `{cwd}/.sir/packs.lock.json`

### S005-AS-007 [No packs installed yields empty message] [P1]
**Given** no pack has ever been installed (no lock file exists)
**When** the user runs `sir recipes:list`
**Then** an empty list is displayed with a message indicating no packs are installed

### S005-AS-008 [Update command shows stub message] [P2]
**Given** any state (packs installed or not)
**When** the user runs `sir recipes:update`
**Then** an informational message is displayed directing the user to remove and reinstall

### S005-AS-009 [Methods from installed pack are discoverable] [P1]
**Given** a pack `example-pack` has been installed with method files in `methods/` directory
**When** the MethodRegistry (S006) performs method discovery
**Then** the methods from `example-pack` are included in the discovered method set
**And** they are available for use in workflow YAML files via `method:` directive

### S005-AS-010 [Reinstall over existing pack] [P1]
**Given** a pack `example-pack` is already installed at `~/.sir/packs/example-pack`
**When** the user runs `sir recipes:install github:sir-sh/example-pack@develop`
**Then** the existing directory is replaced with the new clone
**And** the lock file entry is updated with the new ref `develop`

### S005-AS-011 [Install with shorthand and explicit ref] [P1]
**Given** a valid GitHub repository `sir-sh/example-pack` with a branch `v2.0`
**When** the user runs `sir recipes:install sir-sh/example-pack@v2.0`
**Then** the pack is cloned using branch `v2.0`

### S005-AS-012 [Invalid source format rejected] [P1]
**Given** an invalid source string `not-a-valid-format`
**When** the user runs `sir recipes:install not-a-valid-format`
**Then** an error is displayed indicating the source format is invalid
**And** no pack directory or lock entry is created
