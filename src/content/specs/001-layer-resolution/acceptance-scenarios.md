# S001 Acceptance Scenarios

### S001-AS-001 Single layer at cwd [P1]
**Given** the directory `/tmp/project/.sir` exists
**When** `LayerResolver::resolve('/tmp/project')` is called
**Then** the result array contains `/tmp/project/.sir`
**And** `global ~/.sir` is appended if it exists

### S001-AS-002 Multiple layers with correct precedence [P1]
**Given** the following directories exist:
  - `/home/user/org/project/.sir`
  - `/home/user/org/.sir`
  - `/home/user/.sir` (which is also `~/.sir`)
**When** `LayerResolver::resolve('/home/user/org/project')` is called
**Then** the result array is ordered as:
  1. `/home/user/org/project/.sir`
  2. `/home/user/org/.sir`
  3. `/home/user/.sir`
**And** no duplicates exist even though `~/.sir` was found during the walk

### S001-AS-003 Global layer appended when not in walk path [P1]
**Given** the directory `/tmp/isolated/project/.sir` exists
**And** `~/.sir` exists at `/home/user/.sir`
**And** `/tmp/isolated/project` is not under `/home/user`
**When** `LayerResolver::resolve('/tmp/isolated/project')` is called
**Then** the result array is:
  1. `/tmp/isolated/project/.sir`
  2. `/home/user/.sir`

### S001-AS-004 Git boundary stops the walk [P2]
**Given** the following directories exist:
  - `/home/user/org/project/src/.sir`
  - `/home/user/org/project/.sir`
  - `/home/user/org/project/.git`
  - `/home/user/org/.sir`
**When** `LayerResolver::resolve('/home/user/org/project/src', stopAtGit: true)` is called
**Then** the result array contains:
  1. `/home/user/org/project/src/.sir`
  2. `/home/user/org/project/.sir`
**And** `/home/user/org/.sir` is NOT in the result (above the .git boundary)
**And** global `~/.sir` is still appended if it exists

### S001-AS-005 No layers found anywhere [P1]
**Given** no `.sir` directories exist anywhere in the walk path
**And** `~/.sir` does not exist
**When** `LayerResolver::resolve('/tmp/empty')` is called
**Then** the result is an empty array `[]`

### S001-AS-006 sir where displays loaded layers [P2]
**Given** two layers are resolved: `/home/user/project/.sir` and `/home/user/.sir`
**When** the user runs `sir where`
**Then** stdout contains:
```
Loaded .sir layers (in precedence order):

  1. /home/user/project/.sir
  2. /home/user/.sir

Nearest layer takes precedence.
```
**And** the exit code is 0

### S001-AS-007 sir where with no layers shows guidance [P2]
**Given** no `.sir` directories are found
**When** the user runs `sir where`
**Then** stdout contains the warning "No .sir directories found."
**And** stdout contains "mkdir ~/.sir"
**And** stdout contains "mkdir .sir"
**And** the exit code is 0
