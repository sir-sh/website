# Testing Guide

This document describes the testing strategy and how to write tests for sir.sh.

## Test Structure

### Test Organization

```
tests/
├── Feature/              # Integration tests
│   ├── InspireCommandTest.php
│   └── WorkflowExecutionTest.php
├── Unit/                 # Unit tests
│   ├── ContextTest.php
│   ├── LayerResolverTest.php
│   └── MethodExecutorTest.php
├── Pest.php             # Pest configuration
└── TestCase.php         # Base test case
```

## Test Coverage

### Current Coverage (v1)

- **25 tests** with **48 assertions**
- **Unit Tests**: 22 tests
  - ContextTest: 10 tests
  - LayerResolverTest: 5 tests
  - MethodExecutorTest: 6 tests
  - ExampleTest: 1 test
- **Feature Tests**: 3 tests
  - WorkflowExecutionTest: 2 tests
  - InspireCommandTest: 1 test

### Coverage by Component

| Component | Tests | Coverage |
|-----------|-------|----------|
| Context | 10 | High |
| LayerResolver | 5 | High |
| MethodExecutor | 6 | High |
| WorkflowRunner | 2 | Medium |
| Commands | 1 | Low |

## Writing Tests

### Unit Tests

Unit tests test individual components in isolation.

**Example: Testing Context**

```php
<?php

use App\Services\Context;

test('sets and gets variables', function () {
    $context = new Context();
    $context->set('foo', 'bar');
    
    expect($context->get('foo'))->toBe('bar');
});

test('resolves template with variables', function () {
    $context = new Context();
    $context->set('name', 'World');
    
    $result = $context->resolveTemplate('Hello, {{name}}!');
    
    expect($result)->toBe('Hello, World!');
});
```

### Feature Tests

Feature tests test the application from end-to-end.

**Example: Testing Workflow Execution**

```php
<?php

use App\Services\Workflows\WorkflowLoader;
use App\Services\Workflows\WorkflowRunner;

test('executes a complete workflow', function () {
    // Setup
    $tempDir = sys_get_temp_dir().'/sir-test-'.uniqid();
    mkdir($tempDir.'/.sir/workflows', 0755, true);
    
    // Create workflow
    file_put_contents($tempDir.'/.sir/workflows/test.yml', <<<'YAML'
steps:
  - shell: "echo 'test'"
YAML);
    
    // Execute
    $loader = app(WorkflowLoader::class);
    $runner = app(WorkflowRunner::class);
    
    $workflow = $loader->load('test');
    $result = $runner->run($workflow, [], false);
    
    // Assert
    expect($result['success'])->toBeTrue();
    
    // Cleanup
    unlink($tempDir.'/.sir/workflows/test.yml');
    rmdir($tempDir.'/.sir/workflows');
    rmdir($tempDir.'/.sir');
    rmdir($tempDir);
});
```

## Test Best Practices

### 1. Use Descriptive Test Names

```php
// Good
test('throws exception when required argument is missing', function () {
    // ...
});

// Bad
test('test validation', function () {
    // ...
});
```

### 2. Test One Thing Per Test

```php
// Good
test('resolves simple template', function () {
    $context = new Context();
    $context->set('var', 'value');
    expect($context->resolveTemplate('{{var}}'))->toBe('value');
});

test('resolves template with shell quote', function () {
    $context = new Context();
    $context->set('file', 'test file.txt');
    $result = $context->resolveTemplate('{{shellQuote(file)}}');
    expect($result)->toContain("'test file.txt'");
});

// Bad - testing two things
test('resolves templates', function () {
    // Tests both simple and shellQuote
});
```

### 3. Clean Up Resources

Always clean up temporary files and directories:

```php
test('creates temp directory', function () {
    $tempDir = sys_get_temp_dir().'/test-'.uniqid();
    mkdir($tempDir);
    
    // Your test logic
    
    // Cleanup
    rmdir($tempDir);
});
```

### 4. Use Expectations

Pest provides fluent expectations:

```php
expect($value)->toBe('expected');
expect($array)->toHaveKey('key');
expect($value)->toBeTrue();
expect($value)->toBeArray();
expect($exception)->toBeInstanceOf(RuntimeException::class);
```

### 5. Test Error Cases

Don't just test the happy path:

```php
test('throws exception when CLI tools not found', function () {
    $task = new CodeRabbitReviewTask();
    $context = new Context();
    
    $task->execute([
        'target' => 'feature/test',
        'base' => 'main'
    ], $context);
})->throws(RuntimeException::class);
```

## Running Specific Tests

### By File
```bash
./vendor/bin/pest tests/Unit/ContextTest.php
```

### By Test Name
```bash
./vendor/bin/pest --filter="resolves template"
```

### With Coverage (if xdebug installed)
```bash
./vendor/bin/pest --coverage
```

## Continuous Integration

Tests run automatically on:
- Every push
- Every pull request
- Multiple PHP versions (8.2, 8.3, 8.4)
- Multiple OS (Ubuntu, macOS, Windows)

See `.github/workflows/tests.yml` for CI configuration.

## Adding New Tests

When adding new features:

1. **Write tests first** (TDD approach)
2. **Test both success and failure** cases
3. **Test edge cases** (empty input, null, etc.)
4. **Update this guide** if adding new test patterns

### Test Checklist

- [ ] Unit tests for new services/classes
- [ ] Feature tests for new commands
- [ ] Tests for error handling
- [ ] Tests for edge cases
- [ ] All tests pass locally
- [ ] Code style passes

## Debugging Tests

### Show Output
```bash
./vendor/bin/pest --verbose
```

### Stop on First Failure
```bash
./vendor/bin/pest --stop-on-failure
```

### Run Single Test
```bash
./vendor/bin/pest --filter="specific test name"
```

## Test Data

### Using Fixtures

Create test data in `tests/Fixtures/`:

```php
// tests/Fixtures/workflows/example.yml
description: "Test workflow"
steps:
  - shell: "echo test"
```

Load in tests:

```php
$workflow = file_get_contents(__DIR__.'/../Fixtures/workflows/example.yml');
```

## Mocking

For external dependencies, use Mockery:

```php
use Mockery;

test('calls external service', function () {
    $mock = Mockery::mock(ExternalService::class);
    $mock->shouldReceive('call')->once()->andReturn('result');
    
    // Use mock in test
});
```

## Performance Testing

For performance-critical code:

```php
test('executes within time limit', function () {
    $start = microtime(true);
    
    // Code to test
    
    $duration = microtime(true) - $start;
    expect($duration)->toBeLessThan(1.0); // 1 second max
});
```
