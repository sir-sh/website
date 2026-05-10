# S015 Functional Requirements

## Schedule Configuration

S015-FR-001 [P1] The scheduler **MUST** load schedule definitions from `.sir/schedules.yml` in each layer, merging schedules from all layers with nearest-layer precedence.

S015-FR-001.a If `schedules.yml` does not exist in any layer, the scheduler **MUST** proceed with an empty schedule list without error.

S015-FR-001.b The `ScheduleManager::loadSchedules()` method **MUST** iterate over all layer paths via `LayerResolver::resolve()`, parse each layer's `schedules.yml` if present, and return a merged array.

S015-FR-001.c Duplicate schedule names across layers **MUST** be resolved by nearest-layer precedence (the nearest layer's definition wins).

## Schedule Evaluation

S015-FR-002 [P1] The `ScheduleManager::shouldRun(array $schedule): bool` method **MUST** evaluate the cron expression using `CronExpression::isDue()` and return `true` only when the current time matches the schedule.

S015-FR-002.a If the schedule has `enabled: false`, `shouldRun()` **MUST** return `false` regardless of cron match.

S015-FR-003 [P2] The scheduler **SHOULD** support natural language schedule strings (e.g., `"every monday at 9am"`) parsed via a natural language parser, as an alternative to cron expressions.

S015-FR-003.a The `schedule:` key **MUST** be treated as mutually exclusive with the `cron:` key. If both are present, the scheduler **MUST** log a warning and use `cron:`.

## Scheduler Daemon

S015-FR-004 [P1] The `SchedulerDaemon::run()` method **MUST** enter an infinite loop that loads all schedules, evaluates `shouldRun()` for each, and executes the corresponding workflow via `executeSchedule()`.

S015-FR-004.a The daemon **MUST** sleep for 60 seconds between evaluation cycles.

S015-FR-004.b The daemon **MUST** log each evaluation cycle with the current timestamp and the count of schedules evaluated.

S015-FR-004.c On each cycle, the daemon **MUST** detect missed runs by comparing the last-executed timestamp in `schedule_history.json` against the cron schedule.

S015-FR-005 [P1] The `SchedulerDaemon::executeSchedule(array $schedule)` method **MUST** load the referenced workflow via `WorkflowLoader::load()`, resolve template strings in `inputs` using `Context::resolveTemplate()`, and execute the workflow via `WorkflowRunner::run()`.

S015-FR-005.a If the workflow fails to load, `executeSchedule()` **MUST** log a fatal error with the schedule name and the exception message, and **MUST NOT** throw (the daemon continues).

S015-FR-005.b If the workflow execution throws, `executeSchedule()` **MUST** log the error, record the failure in history, trigger notifications, and **MUST NOT** propagate the exception.

## Concurrency Control

S015-FR-006 [P1] When a schedule's `concurrency` key is set to `"prevent"`, the scheduler **MUST** check whether a previous execution of the same schedule is still running before starting a new execution.

S015-FR-006.a If a previous execution is active (as determined by the `pid` field in `schedule_history.json`), the scheduler **MUST** skip the new execution and log a warning.

S015-FR-006.b When `concurrency` is `"allow"`, the scheduler **MUST** allow overlapping executions.

S015-FR-006.c When `concurrency` is `"queue"`, the scheduler **MUST** queue the execution to run after the active one completes (max queue depth: 1).

## Retry Logic

S015-FR-007 [P1] When a schedule defines a `retry` block with `attempts` greater than 1, the scheduler **MUST** retry a failed execution up to `attempts` times with exponential backoff.

S015-FR-007.a The backoff interval **MUST** be calculated as `delay * 2^(attemptNumber - 1)` seconds.

S015-FR-007.b The `backoff` value **MUST** be `"exponential"` (only supported value in v1; others reserved for future).

S015-FR-007.c Retry attempts **MUST** be recorded individually in `schedule_history.json`.

S015-FR-007.d If all retry attempts fail, the scheduler **MUST** trigger failure notifications.

## Timeout

S015-FR-013 [P2] When a schedule defines a `timeout` value (e.g., `"3600s"`), the scheduler **MUST** enforce the maximum execution time for the workflow.

S015-FR-013.a If the workflow execution exceeds the timeout, the scheduler **MUST** send SIGTERM to the subprocess, wait 10 seconds, send SIGKILL if still running, and record the timeout as a failure.

## Notifications

S015-FR-008 [P2] The scheduler **MUST** support notification delivery when a schedule completes (success or failure).

S015-FR-008.a The `notifications.onSuccess` array **MUST** be processed only when the workflow exits with code 0.

S015-FR-008.b The `notifications.onFailure` array **MUST** be processed on any non-zero exit code or exception.

S015-FR-008.c Each notification entry **MUST** support `email: <address>`, `slack: <channel>`, and `pagerduty: <service-id>` keys.

S015-FR-008.d If notification delivery fails, the scheduler **MUST** log the error and **MUST NOT** interrupt workflow execution or schedule evaluation.

## CLI Commands

S015-FR-009 [P1] The scheduler **MUST** provide the following CLI commands:

S015-FR-009.a `sir schedules:list` **MUST** display all loaded schedules in a table with columns: `Name`, `Workflow`, `Cron`, `Enabled`, `Next Run`.

S015-FR-009.b `sir schedules:add <name> --workflow <workflow> --cron <expression>` **MUST** create a new schedule entry in the nearest layer's `schedules.yml`.

S015-FR-009.c `sir schedules:remove <name>` **MUST** remove the schedule from the nearest layer's `schedules.yml`.

S015-FR-009.d `sir schedules:run` **MUST** start the scheduler daemon (blocking).

S015-FR-009.e `sir schedules:test <name> [--dry-run]` **MUST** evaluate whether the named schedule is due and, in non-dry-run mode, execute the workflow.

## Execution History

S015-FR-010 [P1] The scheduler **MUST** record each schedule execution in `.sir/schedule_history.json` as a JSON array of entries.

S015-FR-010.a Each history entry **MUST** contain: `scheduleName`, `startTime` (ISO 8601), `endTime` (ISO 8601), `status` (`"success"` or `"failure"`), `duration` (seconds), `exitCode` (integer), `attempt` (integer for retries), and `pid` (integer process ID).

S015-FR-010.b The history file **MUST** be append-only for performance.

S015-FR-010.c History entries older than 30 days **MUST** be pruned on daemon startup.

S015-FR-015 [P1] The schedule state **MUST** be persisted so that missed runs can be detected on daemon restart.

S015-FR-015.a The `schedule_history.json` file **MUST** store the last completed run timestamp for each schedule to enable missed-run detection.

## Enable/Disable

S015-FR-014 [P1] When a schedule entry has `enabled: false`, the scheduler **MUST** skip all execution evaluation for that schedule.

S015-FR-014.a Disabled schedules **MUST** still appear in `sir schedules:list` output with an `Enabled` column showing `false`.

## Condition-based Filtering

S015-FR-011 [P2] When a schedule defines `conditions.branch` or `conditions.tag`, the scheduler **MUST** evaluate the condition against the current git context before executing.

S015-FR-011.a If the condition is not met, the scheduler **MUST** skip the execution and log the skip reason.

## File Watcher

S015-FR-012 [P2] When a schedule defines a `watch` key with a filesystem glob pattern (e.g., `"/data/*.csv"`), the scheduler **MUST** monitor the matching files for changes and trigger the workflow when a change is detected.

S015-FR-012.a The file watcher **MUST** use `inotify` on Linux and `FSEvents` on macOS.

S015-FR-012.b The file path that triggered the event **MUST** be available in the workflow as `{{event.file}}`.