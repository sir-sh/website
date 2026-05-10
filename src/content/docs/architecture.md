# Architecture Overview

This document provides an overview of sir.sh's architecture and core components.

## Core Components

### LayerResolver
Discovers `.sir/` directories from current directory up to root.

**Key Features:**
- Walks up from current directory collecting any `.sir/` folders
- Includes global `~/.sir` directory
- Supports stopping at root (not `.git` boundaries)
- Nearest layer takes precedence

**Testing:**
- 5+ unit tests covering path resolution, layer precedence, symlink resolution, and global directory handling

### ConfigLoader
Loads and merges YAML/JSON config files from all layers.

**Key Features:**
- Supports both YAML and JSON config formats
- Nearest layer configuration overrides parent layers
- Dot notation support for accessing nested config values
- Recursive merging of configuration arrays

### Context
Manages variables and state across workflow execution.

**Key Features:**
- Template resolution with `{{variable}}` syntax
- Built-in template functions:
  - `shellQuote(var)` - Safe shell escaping via `escapeshellarg()`
  - `default(var, 'fallback')` - Default values for missing variables
- Nested property access via `{{object.property}}` (v1: `getPath()` method)
- Variable passing between workflow steps
- Input parameter management

**Testing:**
- 10+ unit tests covering variable storage, template resolution, nested properties, and function handling

### PackManager
Manages pack installation from Git repositories.

**Key Features:**
- Install from multiple Git source formats:
  - `github:owner/repo@ref`
  - `git:https://...repo.git#ref`
  - `owner/repo` (GitHub shorthand)
- Global (`~/.sir/packs/`) and project-level (`.sir/packs/`) installation
- Lock file maintenance (`packs.lock.json`)
- Pack cloning, listing, and removal

### MethodRegistry & MethodExecutor
Discovers and executes methods from packs.

**Key Features:**
- Method discovery from pack directories
- Argument validation against JSON schema
- Two execution types:
  - `shell` - Template-expanded shell commands
  - `exec` - External programs with JSON stdin/stdout
- Template resolution in method arguments
- Streaming output support

**Testing:**
- 6 unit tests covering validation, execution, and template resolution

### WorkflowLoader & WorkflowRunner
Loads and executes YAML workflows.

**Key Features:**
- Multi-format support: `.yml`, `.yaml`, `.sh`, `.php`
- Step execution types:
  - `method` - Call pack methods
  - `task` - Call built-in tasks
  - `shell` - Run shell commands
- Variable passing with `saveAs`
- Clean output with headers, timing, and status indicators

**Testing:**
- 2 integration tests for complete workflow execution

### TaskRegistry
Registry for built-in tasks.

**Built-in Tasks:**
- `workspace.temp` - Create temporary workspace directories
- `files.write` - Write content to files
- `files.writeMd` - Write markdown with optional title
- `git.clone` - Clone Git repositories
- `tests.auto` - Auto-detect and run tests (npm/composer)
- `coderabbit.review` - Request CodeRabbit reviews

## Data Flow

```
User Command
    ↓
CLI Command (RunWorkflowCommand)
    ↓
WorkflowLoader → Discovers workflow from layers
    ↓
WorkflowRunner → Executes steps sequentially
    ↓
    ├→ MethodExecutor (for method steps)
    ├→ TaskRegistry (for task steps)
    └→ Process (for shell steps)
    ↓
Context → Stores variables between steps
    ↓
Output → Step headers, timing, success/fail markers
```

## Design Principles

1. **Layered Resolution**: Configuration and workflows are discovered by walking up the directory tree, with nearest layers taking precedence.

2. **Fail Fast**: Tasks and methods throw exceptions with helpful error messages rather than returning skipped states.

3. **Template Safety**: All user input in templates is safely escaped when used in shell commands via `shellQuote()`.

4. **Streaming Output**: Command execution streams output in real-time for better user feedback.

5. **Clean Separation**: Core services are independent and testable, with dependency injection throughout.

## Extension Points

- **Custom Tasks**: Implement `TaskInterface` and register in `TaskRegistry`
- **Packs**: Create git repositories with `sir-pack.json` and method definitions
- **Workflows**: Add YAML files to any `.sir/workflows/` directory
- **Configuration**: Add YAML/JSON config files to `.sir/` directories
