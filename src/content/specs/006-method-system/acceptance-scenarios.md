# S006 Acceptance Scenarios

## Method Discovery

### S006-AS-001 [Shell method with required args executes correctly] [P1]
**Given** a method definition with `impl.type: "shell"`, `impl.command: "echo {{name}}"`, and a required argument `name` of type `string`
**When** the method is called with `args: {"name": "hello"}`
**Then** the shell command `echo hello` executes and returns `success: true` with `output: "hello\n"`

### S006-AS-002 [Missing required argument throws exception] [P1]
**Given** a method definition with a required argument `repo` (type `string`, `required: true`) and no default
**When** the method is called with an empty args array `{}`
**Then** an `InvalidArgumentException` is thrown with message `"Required argument missing: repo"`

### S006-AS-003 [Default value applied when argument omitted] [P1]
**Given** a method definition with an argument `depth` (type `int`, `required: false`, `default: 1`)
**When** the method is called with `args: {}`
**Then** the validated args contain `depth: 1` (integer, not string)

### S006-AS-004 [Integer argument cast from string] [P1]
**Given** a method definition with an argument `port` of type `int`
**When** the method is called with `args: {"port": "8080"}`
**Then** the validated args contain `port: 8080` (integer type)

### S006-AS-005 [Template variables resolved in shell command] [P1]
**Given** a method with `impl.command: "git clone {{repo}} --depth {{depth}}"` and args `{"repo": "https://github.com/example/repo", "depth": 3}`
**When** the method is executed
**Then** the shell command `git clone https://github.com/example/repo --depth 3` is passed to the shell

### S006-AS-006 [Exec method receives JSON stdin and returns JSON stdout] [P1]
**Given** a method definition with `impl.type: "exec"`, `impl.command: ["python", "script.py"]`, and args `{"path": "/tmp/test", "recursive": true}`
**When** the method is executed
**Then** the process receives stdin containing `{"path": "/tmp/test", "recursive": true}` (JSON-encoded args) and stdout JSON is parsed into the result

### S006-AS-007 [Method discovered from pack with namespace] [P1]
**Given** a pack `git` in `layers/1/packs/git/` with a file `sir-pack.json` containing `{"namespace": "git"}` and a method file `methods/clone.json` with `{"method": "clone", "impl": {...}}`
**When** `MethodRegistry::discoverMethods()` is called
**Then** the method is registered under the name `git.clone`

### S006-AS-008 [Streaming output appears in real-time] [P1]
**Given** a shell method with a long-running command that outputs multiple lines
**When** the method is executed with `stream: true`
**Then** each line of output appears in the terminal in real-time (not buffered until completion)

### S006-AS-009 [Unknown impl type throws exception] [P1]
**Given** a method definition with `impl.type: "unknown-type"`
**When** `MethodExecutor::execute()` is called
**Then** an `InvalidArgumentException` is thrown with message `"Unknown implementation type: unknown-type"`

### S006-AS-010 [Boolean argument cast from string] [P1]
**Given** a method definition with an argument `recursive` of type `bool`
**When** the method is called with `args: {"recursive": "true"}`
**Then** the validated args contain `recursive: true` (boolean type, not string)

### S006-AS-011 [Path argument cast to string] [P1]
**Given** a method definition with an argument `path` of type `path`
**When** the method is called with `args: {"path": "/home/user/file.txt"}`
**Then** the validated args contain `path: "/home/user/file.txt"` (string type)

### S006-AS-012 [Buffering mode suppresses terminal output] [P2]
**Given** a shell method with a command that produces stdout
**When** the method is executed with `stream: false`
**Then** no output is printed to the terminal during execution, and the output is returned in the result array only

### S006-AS-013 [Exec with non-JSON stdout falls back to raw_output] [P1]
**Given** a method definition with `impl.type: "exec"` and the external program outputs plain text `"hello world"` (not JSON)
**When** the method is executed
**Then** the result contains `raw_output: "hello world"` and `success: false` if the exit code was non-zero

### S006-AS-014 [Duplicate method names later in layer order overwrite earlier] [P2]
**Given** two packs both register a method named `utils.run` (the second pack's method loaded later in layer order)
**When** `MethodRegistry::get("utils.run")` is called
**Then** the definition from the later-loaded pack is returned (last-wins semantics)
