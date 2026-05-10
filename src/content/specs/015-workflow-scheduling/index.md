# S015: Workflow Scheduling

| Field | Value |
|-------|-------|
| Spec | S015 |
| Feature | Workflow Scheduling |
| Date | 2026-04-24 |
| Status | Future | Last Updated | 2026-05-10 |

## Implementation Notes

**Not Yet Implemented.** Schedule configuration format is defined but no scheduler daemon exists.

**Planned:**
- schedules.yml configuration file
- Cron expression evaluation
- sir schedules:run daemon
- Concurrency control (prevent overlapping runs)
- Retry logic with exponential backoff
- Notification delivery (email, Slack, PagerDuty)
- Execution history in schedule_history.json
- File-watcher event-based triggers

**Dependencies:** Requires S003 (Workflow Engine) to be complete first.
| Project | sir.sh CLI (`/Users/mark/Projects/Sir/cli`) |
| Tech Stack | PHP 8.2, Laravel Zero |

## Overview

Workflow Scheduling adds support for automated, time-based workflow execution, allowing workflows to run at specific times or intervals without manual invocation. Users define schedules in `.sir/schedules.yml` using cron expressions or natural language, and a long-running daemon (`sir schedules:run`) evaluates schedules and executes workflows when due.

The scheduler persists execution history in `.sir/schedule_history.json` to enable missed-run detection, supports retry with exponential backoff for transient failures, and delivers notifications via email, Slack, and PagerDuty on workflow success or failure. Concurrency control prevents overlapping executions of the same schedule.

## User Scenarios

S015-US-001 [P1] As an operator, I want to run backup workflows nightly at 2 AM so that production data is backed up automatically without manual intervention.

S015-US-002 [P1] As an SRE, I want health-check workflows to run every 5 minutes so that service degradations are detected promptly.

S015-US-003 [P1] As an analyst, I want weekly reports to generate every Monday at 9 AM so that stakeholders receive timely data summaries.

S015-US-004 [P2] As a developer, I want old files removed daily so that storage is managed automatically.

S015-US-005 [P2] As an automation engineer, I want file-change-triggered workflows so that processing reacts to filesystem events.

S015-US-006 [P2] As an operator, I want to list, add, remove, and test schedules via CLI commands so that I can manage the schedule lifecycle interactively.

## Requirements Summary

| ID | Type | Priority | Title |
|----|------|----------|-------|
| S015-FR-001 | Functional | P1 | Schedule configuration file format and loading |
| S015-FR-002 | Functional | P1 | Cron expression evaluation |
| S015-FR-003 | Functional | P2 | Natural language schedule parsing |
| S015-FR-004 | Functional | P1 | Scheduler daemon execution loop |
| S015-FR-005 | Functional | P1 | Workflow execution via schedule trigger |
| S015-FR-006 | Functional | P1 | Concurrency control (prevent overlapping runs) |
| S015-FR-007 | Functional | P1 | Retry logic with exponential backoff |
| S015-FR-008 | Functional | P2 | Notification delivery on success/failure |
| S015-FR-009 | Functional | P1 | CLI commands for schedule management |
| S015-FR-010 | Functional | P1 | Execution history tracking |
| S015-FR-011 | Functional | P2 | Condition-based schedule filtering |
| S015-FR-012 | Functional | P2 | File-watcher event-based triggers |
| S015-FR-013 | Functional | P2 | Timeout enforcement per schedule |
| S015-FR-014 | Functional | P1 | Enable/disable schedules |
| S015-FR-015 | Functional | P1 | Schedule state persistence |
| S015-AS-001 | Acceptance | P1 | Cron-based schedule fires at correct time |
| S015-AS-002 | Acceptance | P1 | Missed runs execute on daemon restart |
| S015-AS-003 | Acceptance | P1 | Overlapping executions are prevented |
| S015-AS-004 | Acceptance | P1 | Failed executions retry with backoff |
| S015-AS-005 | Acceptance | P1 | Notifications sent on schedule completion |
| S015-AS-006 | Acceptance | P2 | History command shows past executions |
| S015-AS-007 | Acceptance | P2 | Schedules:list displays all schedules |
| S015-AS-008 | Acceptance | P2 | Schedules:add creates new schedule |
| S015-AS-009 | Acceptance | P2 | Schedules:remove deletes schedule |
| S015-AS-010 | Acceptance | P2 | Schedules:test performs dry-run |
| S015-EC-001 | Edge Case | P1 | System was down; missed runs must execute on restart |
| S015-EC-002 | Edge Case | P1 | Overlapping execution requested; must skip |
| S015-EC-003 | Edge Case | P1 | Invalid cron expression; must log error and skip |
| S015-EC-004 | Edge Case | P1 | Referenced workflow does not exist; must log error |
| S015-EC-005 | Edge Case | P1 | schedules.yml missing; must create empty on first run |
| S015-EC-006 | Edge Case | P2 | Notification delivery fails; must log and continue |
| S015-EC-007 | Edge Case | P2 | Systemd service fails; must restart automatically |
| S015-EC-008 | Edge Case | P2 | Clock skew; must use monotonic time for interval checks |
| S015-EC-009 | Edge Case | P2 | History file corrupted; must reset gracefully |
| S015-EC-010 | Edge Case | P2 | Long-running workflow exceeds timeout |
| S015-SC-001 | Success Criteria | P1 | Schedule executes within 60 seconds of due time |
| S015-SC-002 | Success Criteria | P1 | Missed runs detected and executed on restart |
| S015-SC-003 | Success Criteria | P1 | No duplicate executions for a schedule |
| S015-SC-004 | Success Criteria | P1 | Notifications delivered within 30 seconds of completion |
| S015-SC-005 | Success Criteria | P2 | History query returns within 100ms |
| S015-SC-006 | Success Criteria | P2 | Daemon memory usage stays below 50MB |
| S015-IF-001 | Interface | P1 | Schedule config YAML schema |
| S015-IF-002 | Interface | P1 | sir schedules:list command signature |
| S015-IF-003 | Interface | P1 | sir schedules:add command signature |
| S015-IF-004 | Interface | P1 | sir schedules:remove command signature |
| S015-IF-005 | Interface | P1 | sir schedules:run command signature |
| S015-IF-006 | Interface | P1 | sir schedules:test command signature |
| S015-IF-007 | Interface | P1 | sir schedules:history command signature |
| S015-IF-008 | Interface | P2 | sir schedules:health command signature |
| S015-NF-001 | Non-Functional | P1 | Daemon monitors missed runs on startup |
| S015-NF-002 | Non-Functional | P1 | Schedule state persisted in schedule_history.json |
| S015-NF-003 | Non-Functional | P1 | Notifications delivered on error conditions |
| S015-NF-004 | Non-Functional | P1 | Daemon auto-restarts via systemd |
| S015-NF-005 | Non-Functional | P2 | Graceful shutdown on SIGTERM |
| S015-NF-006 | Non-Functional | P2 | Daemon runs as low-privilege user |
| S015-NF-007 | Non-Functional | P1 | Execution history retained for 30 days |

## Cross-Spec Dependencies

- **Depends on:** S003 (Workflow Engine) — the scheduler invokes the WorkflowRunner
- **Required by:** Future S016 (Distributed Scheduling), S017 (Web UI for schedules)