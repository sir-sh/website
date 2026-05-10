# S015 Edge Cases

| ID | Scenario | Expected Behavior |
|----|----------|-------------------|
| S015-EC-001 | System was down; missed runs must execute on restart | On daemon startup, compare last-executed timestamps in `schedule_history.json` against each schedule's cron expression. Any missed intervals **MUST** be executed before normal cycle resumes. Log each missed run. |
| S015-EC-002 | Overlapping execution requested; must skip | When `concurrency: prevent` and an active `pid` exists in history, log `"Skipping {name}: previous execution still active (PID {pid})"` and skip execution. |
| S015-EC-003 | Invalid cron expression; must log error and skip | Catch `InvalidArgumentException` from `CronExpression`. Log `"Invalid cron for schedule {name}: {expression}"`. Set `enabled: false` implicitly. Do not crash. |
| S015-EC-004 | Referenced workflow does not exist; must log error | When `WorkflowLoader::load()` throws, log `"Workflow '{workflow}' not found for schedule '{name}'"` with fatal severity. Do not execute. Continue processing other schedules. |
| S015-EC-005 | schedules.yml missing; must create empty on first run | When `ScheduleManager::loadSchedules()` finds no `schedules.yml` in any layer, return an empty array. Do not error. |
| S015-EC-006 | Notification delivery fails; must log and continue | If a notification channel throws, log `"Notification failed for {name}: {error}"`. Continue workflow execution and schedule evaluation. Do not retry notification. |
| S015-EC-007 | Systemd service fails; must restart automatically | Systemd unit configured with `Restart=always` **MUST** restart the daemon within 5 seconds of any exit. |
| S015-EC-008 | Clock skew; must use monotonic time for interval checks | Use `hrtime()` or equivalent monotonic clock for sleep interval measurement, not wall-clock time, to avoid issues with NTP adjustments. |
| S015-EC-009 | History file corrupted; must reset gracefully | If `schedule_history.json` fails to decode as JSON, rename the corrupted file to `schedule_history.json.bak`, start with an empty history array, log a warning. |
| S015-EC-010 | Long-running workflow exceeds timeout | Send SIGTERM. After 10 seconds, send SIGKILL if still alive. Record exit code -1, status `"timeout"`. Trigger `onFailure` notifications. |
| S015-EC-011 | Duplicate schedule name across layers; nearest wins | When merging schedules, if `name` appears in multiple layers, keep only the entry from the nearest layer. Log a debug message: `"Schedule '{name}' overridden by layer {path}"`. |
| S015-EC-012 | Queue depth exceeded for `concurrency: queue` | If a queued execution exists and a second execution is requested, log `"Queue full for {name}: skipping execution"` and skip. |
| S015-EC-013 | Both `cron` and `schedule` keys present | Log warning `"Schedule '{name}' has both cron and schedule keys; using cron"`. Use `cron` value, ignore `schedule`. |
| S015-EC-014 | Empty `inputs` object on schedule | When `inputs` is null or absent, pass an empty array to `WorkflowRunner::run()`. Do not error. |
| S015-EC-015 | Daemon receives SIGTERM during workflow execution | Wait for the running workflow to complete (up to timeout). Write final history entry. Exit cleanly with code 0. |