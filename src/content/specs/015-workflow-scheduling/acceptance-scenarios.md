# S015 Acceptance Scenarios

### S015-AS-001 Cron-based schedule fires at correct time [P1]
**Given** a schedule named `nightly-backup` with cron `"0 2 * * *"` pointing to workflow `backup`
**When** the system clock reaches 02:00:00 on any day
**Then** the `backup` workflow **MUST** be executed by the scheduler daemon

---

### S015-AS-002 Missed runs execute on daemon restart [P1]
**Given** the scheduler daemon was stopped (system crash) for 3 hours during which a schedule with cron `"0 2 * * *"` was due
**When** the daemon restarts and performs its first evaluation cycle
**Then** the scheduler **MUST** detect the missed run and execute the workflow immediately

---

### S015-AS-003 Overlapping executions are prevented [P1]
**Given** a schedule `long-process` with `concurrency: prevent` is currently running (PID 12345) and its cron fires again
**When** the scheduler evaluates the schedule in its next cycle
**Then** the second execution **MUST** be skipped with a log message indicating the previous run is still active

---

### S015-AS-004 Failed executions retry with backoff [P1]
**Given** a schedule `flaky-task` with `retry.attempts: 3`, `retry.backoff: exponential`, and `retry.delay: 60s`
**When** the workflow execution fails on the first attempt
**Then** the scheduler **MUST** retry after 60 seconds, then after 120 seconds, then after 240 seconds, before recording a final failure

---

### S015-AS-005 Notifications sent on schedule completion [P1]
**Given** a schedule `critical-backup` with `notifications.onFailure.email: admin@example.com`
**When** the workflow execution fails
**Then** an email **MUST** be sent to `admin@example.com` within 30 seconds of failure

---

### S015-AS-006 History command shows past executions [P2]
**Given** multiple executions of schedule `backup` have occurred in the past week
**When** the operator runs `sir schedules:history backup`
**Then** a table **MUST** be displayed with columns: `Date`, `Time`, `Status`, `Duration` showing all recorded runs

---

### S015-AS-007 Schedules:list displays all schedules [P2]
**Given** multiple schedules are defined across project and global layers
**When** the operator runs `sir schedules:list`
**Then** a table **MUST** be displayed with columns: `Name`, `Workflow`, `Cron`, `Enabled`, `Next Run` for every loaded schedule

---

### S015-AS-008 Schedules:add creates new schedule [P2]
**Given** the operator runs `sir schedules:add nightly-backup --workflow backup --cron "0 2 * * *"`
**When** the command completes successfully
**Then** a new schedule entry **MUST** be persisted in the nearest layer's `schedules.yml` with the specified name, workflow, and cron expression

---

### S015-AS-009 Schedules:remove deletes schedule [P2]
**Given** a schedule named `backup` exists in a project layer's `schedules.yml`
**When** the operator runs `sir schedules:remove backup`
**Then** the schedule entry **MUST** be removed from the file

---

### S015-AS-010 Schedules:test performs dry-run [P2]
**Given** a schedule named `backup` exists
**When** the operator runs `sir schedules:test backup`
**Then** the scheduler **MUST** evaluate the schedule's cron and report whether it is currently due, without executing the workflow
**And** if `--dry-run` is passed, the workflow inputs **MUST** be resolved and displayed without executing

---

### S015-AS-011 Natural language schedule parsing [P2]
**Given** a schedule with `schedule: "every monday at 9am"`
**When** the schedule is loaded by `ScheduleManager`
**Then** the natural language string **MUST** be parsed into an equivalent cron expression and stored alongside the schedule

---

### S015-AS-012 Timeout enforcement [P2]
**Given** a schedule `long-task` with `timeout: 300s`
**When** the workflow execution runs longer than 300 seconds
**Then** the scheduler **MUST** terminate the process, record a timeout failure, and trigger failure notifications

---

### S015-AS-013 Git branch condition filtering [P2]
**Given** a schedule `deploy-main` with `conditions.branch: main`
**When** the schedule is due and the current git branch is `feature/x`
**Then** the scheduler **MUST** skip execution and log that the branch condition was not met

---

### S015-AS-014 File watcher triggers workflow [P2]
**Given** a schedule `process-csv` with `watch: "/data/*.csv"`
**When** a file matching `/data/*.csv` is created or modified
**Then** the `process-csv` workflow **MUST** be triggered with `{{event.file}}` set to the absolute path of the changed file