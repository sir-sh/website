# S002 Acceptance Scenarios

### S002-AS-001 Single layer YAML config [P1]

**Given** a single `.sir/` layer exists at the current directory containing `config.yml` with `greeting: hello`
**When** `loadConfig()` is called
**Then** the returned array contains `['greeting' => 'hello']`

### S002-AS-002 Two-layer merge with override [P1]

**Given** a parent `.sir/` layer contains `config.yml` with `color: red` and `size: large`
**And** a child (nearer) `.sir/` layer contains `config.yml` with `color: blue`
**When** `loadConfig()` is called from the child directory
**Then** the returned array contains `color` as `['red', 'blue']` (per `array_merge_recursive` scalar collision) and `size` as `'large'`

### S002-AS-003 Dot-notation access [P1]

**Given** a config array `['database' => ['host' => 'localhost', 'port' => 3306]]`
**When** `get($config, 'database.host')` is called
**Then** the return value is `'localhost'`

### S002-AS-004 Default value for missing key [P1]

**Given** a config array `['database' => ['host' => 'localhost']]`
**When** `get($config, 'database.password', 'secret')` is called
**Then** the return value is `'secret'`

### S002-AS-005 JSON config loading [P1]

**Given** a single `.sir/` layer exists containing `config.json` with `{"timeout": 30}`
**And** no `config.yml` exists in that layer
**When** `loadConfig()` is called
**Then** the returned array contains `['timeout' => 30]`

### S002-AS-006 YAML and JSON in same layer [P1]

**Given** a single `.sir/` layer contains `config.yml` with `mode: fast` and `config.json` with `{"mode": "slow"}`
**When** `loadConfig()` is called
**Then** the returned array contains `mode` as `['fast', 'slow']` (JSON merged after YAML via `array_merge_recursive`)

### S002-AS-007 Three-layer deep merge [P2]

**Given** three `.sir/` layers (global, mid, project) each provide a `config.yml`
**And** global defines `log.level: debug`, mid defines `log.level: info` and `log.file: app.log`, project defines `log.level: warn`
**When** `loadConfig()` is called from the project directory
**Then** the merged result under `log` contains `level` as `['debug', 'info', 'warn']` and `file` as `'app.log'`

### S002-AS-008 No config files anywhere [P2]

**Given** the layer resolver returns layer paths, but none of them contain `config.yml` or `config.json`
**When** `loadConfig()` is called
**Then** the returned array is empty (`[]`)
