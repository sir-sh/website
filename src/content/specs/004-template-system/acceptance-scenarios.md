# S004 Acceptance Scenarios

### S004-AS-001 Simple variable in shell step [P1]
**Given** a `Context` with variable `name` set to `"World"`
**When** the system resolves the template `"Hello, {{name}}!"`
**Then** the result **MUST** be `"Hello, World!"`

### S004-AS-002 shellQuote prevents shell injection [P1]
**Given** a `Context` with variable `file` set to `"test file.txt"`
**When** the system resolves the template `"cat {{shellQuote(file)}}"`
**Then** the result **MUST** contain `'test file.txt'` (single-quoted by `escapeshellarg`)
**And** the resolved string **MUST** be safe to pass to `Process::fromShellCommandline()` without word-splitting on the space

### S004-AS-003 default provides fallback for missing variable [P2]
**Given** a `Context` with no variable `missing` defined
**When** the system resolves the template `'{{default(missing, "fallback")}}'`
**Then** the result **MUST** be `"fallback"`

### S004-AS-004 Step result chaining via saveAs [P1]
**Given** a workflow with two steps:
  - Step 1: a task that returns `{"path": "/tmp/workspace"}` with `saveAs: ws`
  - Step 2: a shell command `"ls {{ws}}"`
**When** the workflow runner executes both steps
**Then** step 2's shell command **MUST** be resolved to `"ls Array"` (since `ws` is an array, it is cast to string)
**And** the `Context` **MUST** contain `ws` as the array value `{"path": "/tmp/workspace"}`

### S004-AS-005 Input parameters available in method args [P1]
**Given** a workflow invoked with inputs `{"repo": "https://github.com/user/project.git"}`
**And** a method step with `with: { url: "{{repo}}" }`
**When** the workflow runner resolves the step arguments
**Then** the `url` argument **MUST** be `"https://github.com/user/project.git"`

### S004-AS-006 Mixed literal and template string [P2]
**Given** a `Context` with variables `host` set to `"localhost"` and `port` set to `"5432"`
**When** the system resolves the template `"psql -h {{host}} -p {{port}} mydb"`
**Then** the result **MUST** be `"psql -h localhost -p 5432 mydb"`
