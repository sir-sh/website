# Development Guide

This guide helps developers contribute to sir.sh or extend it with custom functionality.

## Setting Up Development Environment

### Prerequisites
- PHP 8.3 or higher
- Git
- Composer

### Installation

```bash
# Clone the repository
git clone https://github.com/sir-sh/cli.git
cd cli

# Install dependencies
composer install

# Make executable
chmod +x application

# Run application
./application list
```

## Running Tests

### All Tests
```bash
./vendor/bin/pest
```

### Specific Test Suites
```bash
# Unit tests only
./vendor/bin/pest tests/Unit/

# Feature tests only
./vendor/bin/pest tests/Feature/

# Specific test file
./vendor/bin/pest tests/Unit/ContextTest.php
```

### Test Structure
- `tests/Unit/` - Unit tests for individual components
- `tests/Feature/` - Integration tests for CLI commands
- `tests/TestCase.php` - Base test case class
- `tests/Pest.php` - Pest configuration

## Code Style

### Check Code Style
```bash
./vendor/bin/pint --test
```

### Fix Code Style
```bash
./vendor/bin/pint
```

The project follows PSR-12 coding standards via Laravel Pint.

## Creating Custom Tasks

### 1. Implement TaskInterface

```php
<?php

namespace App\Services\Tasks\Custom;

use App\Services\Context;
use App\Services\Tasks\TaskInterface;

class MyCustomTask implements TaskInterface
{
    public function execute(array $args, Context $context): mixed
    {
        // Validate required arguments
        $input = $args['input'] ?? throw new \InvalidArgumentException('input is required');
        
        // Do work here
        $result = doSomething($input);
        
        // Return results
        return [
            'output' => $result,
            'success' => true,
        ];
    }
    
    public function getMetadata(): array
    {
        return [
            'name' => 'custom.mytask',
            'description' => 'Does something custom',
            'args' => [
                'input' => ['type' => 'string', 'required' => true],
            ],
            'effects' => [
                'network' => false,
                'writes' => [],
            ],
        ];
    }
}
```

### 2. Register in AppServiceProvider

```php
// In app/Providers/AppServiceProvider.php

$registry->register('custom.mytask', new \App\Services\Tasks\Custom\MyCustomTask());
```

## Creating Packs

### Pack Structure

```
my-pack/
├── sir-pack.json
├── methods/
│   └── my-method.json
└── scripts/         # Optional, for exec implementations
    └── script.py
```

### sir-pack.json

```json
{
  "name": "my-pack",
  "namespace": "mypack",
  "version": "1.0.0",
  "description": "My custom pack",
  "author": "Your Name",
  "methods": [
    "my-method"
  ]
}
```

### Method Definition (methods/my-method.json)

```json
{
  "method": "my-method",
  "description": "Does something useful",
  "args": {
    "input": {
      "type": "string",
      "required": true,
      "description": "Input parameter"
    }
  },
  "effects": {
    "network": false,
    "writes": []
  },
  "impl": {
    "type": "shell",
    "command": "echo {{shellQuote(input)}}"
  }
}
```

### Publishing a Pack

1. Create a Git repository with your pack structure
2. Tag a release: `git tag v1.0.0`
3. Push to GitHub: `git push origin v1.0.0`
4. Users install with: `sir recipes:install owner/repo`

## Creating Workflows

### Basic Workflow (workflows/example.yml)

```yaml
description: "Example workflow"

inputs:
  message:
    type: string
    required: true
    description: "Message to display"

steps:
  - shell: "echo {{shellQuote(message)}}"
  
  - task: files.write
    with:
      path: "/tmp/output.txt"
      content: "{{message}}"
    saveAs: writeResult
```

### Advanced Workflow

```yaml
description: "Advanced example"

inputs:
  repo:
    type: string
    required: true
  branch:
    type: string
    default: "main"

steps:
  # Create workspace
  - task: workspace.temp
    with:
      prefix: "my-workflow"
    saveAs: workspace
  
  # Clone repository
  - task: git.clone
    with:
      repo: "{{repo}}"
      folder: "{{workspace.workspace}}/repo"
      branch: "{{branch}}"
    saveAs: cloneResult
  
  # Run tests
  - task: tests.auto
    with:
      cwd: "{{cloneResult.path}}"
    saveAs: testResult
```

## Debugging

### Enable Verbose Output

Add debug statements in your code:

```php
$this->line("Debug: Variable value is {$value}");
```

### Inspect Context

In workflow steps, use shell commands to inspect:

```yaml
steps:
  - shell: "echo 'Debug: {{variable}}'"
```

### Check Layer Resolution

```bash
sir where
```

## Common Issues

### Tests Not Found
Make sure Pest is installed: `composer install`

### Style Checks Failing
Run `./vendor/bin/pint` to auto-fix most issues.

### Layer Not Loading
Check that `.sir` directory exists and contains expected files.
Run `sir where` to see loaded layers.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Ensure code style passes
7. Submit a pull request

## Project Structure

```
├── app/
│   ├── Commands/         # CLI commands
│   ├── Providers/        # Service providers
│   └── Services/         # Core services
│       ├── Methods/      # Method registry & executor
│       ├── Packs/        # Pack manager
│       ├── Tasks/        # Task registry & built-in tasks
│       └── Workflows/    # Workflow loader & runner
├── config/              # Laravel Zero configuration
├── docs/                # Documentation
├── examples/            # Example packs and workflows
├── tests/              # Test suite
└── application         # Main executable
```
