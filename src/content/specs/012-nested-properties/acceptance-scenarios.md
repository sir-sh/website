# S012 Acceptance Scenarios

### S012-AS-001 Simple dot-notation access [P1]
**Given** a `Context` with variable `workspace` set to `["root" => "/tmp/ws", "prefix" => "proj"]`
**When** the system resolves the template `"{{workspace.root}}/file.txt"`
**Then** the result **MUST** be `"/tmp/ws/file.txt"`

### S012-AS-002 Deep nesting (three levels) [P1]
**Given** a `Context` with variable `data` set to `["user" => ["profile" => ["name" => "Alice"]]]`
**When** the system resolves the template `"Hello, {{data.user.profile.name}}!"`
**Then** the result **MUST** be `"Hello, Alice!"`

### S012-AS-003 Array index access [P1]
**Given** a `Context` with variable `items` set to `["first", "second", "third"]`
**When** the system resolves the template `"First item: {{items.0}}"`
**Then** the result **MUST** be `"First item: first"`
**And** `{{items.2}}` **MUST** resolve to `"third"`

### S012-AS-004 Missing property returns empty string [P2]
**Given** a `Context` with variable `data` set to `["key" => "value"]`
**When** the system resolves the template `"{{data.missing.property}}"`
**Then** the result **MUST** be `""`
**And** no exception or warning **MAY** be emitted

### S012-AS-005 shellQuote with nested property [P2]
**Given** a `Context` with variable `file` set to `["name" => "my file.txt", "size" => 1234]`
**When** the system resolves the template `"cat {{shellQuote(file.name)}}"`
**Then** the result **MUST** contain `'my file.txt'` (shell-quoted)
**And** the resolved string **MUST** be safe for `Process::fromShellCommandline()`

### S012-AS-006 default with nested property [P2]
**Given** a `Context` with variable `config` set to `["output" => ["path" => "/tmp"]]`
**When** the system resolves the template `"{{default(config.missing, '/default')}}/file.txt"`
**Then** the result **MUST** be `"/default/file.txt"`
**And** `{{default(config.output.path, '/default')}}` **MUST** resolve to `"/tmp"`

### S012-AS-007 Workflow step chaining with saveAs [P1]
**Given** a workflow with steps:
  - Step 1: a task that returns `{"path": "/tmp/workspace", "url" => "https://github.com/user/repo"}` with `saveAs: clone`
  - Step 2: a shell command `"ls {{clone.path}}"`
**When** the workflow runner executes step 2
**Then** the shell command **MUST** be resolved to `"ls /tmp/workspace"`

### S012-AS-008 Mixed nested and flat variables [P2]
**Given** a `Context` with `base` set to `"/app"` and `workspace` set to `["root" => "/tmp/ws"]`
**When** the system resolves the template `"{{base}}{{workspace.root}}/config"`
**Then** the result **MUST** be `"/app/tmp/ws/config"`

### S012-AS-009 Array of objects access [P1]
**Given** a `Context` with variable `results` set to `[{"name" => "first", "value" => 100}, {"name" => "second", "value" => 200}]`
**When** the system resolves the template `"{{results.1.name}}"`
**Then** the result **MUST** be `"second"`

### S012-AS-010 Invalid intermediate path segment (scalar) [P1]
**Given** a `Context` with variable `scalar` set to `"just a string"`
**When** the system resolves the template `"{{scalar.property}}"`
**Then** the result **MUST** be `""`
**And** no exception or warning **MAY** be emitted