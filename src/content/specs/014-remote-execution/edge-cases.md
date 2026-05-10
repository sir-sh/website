# S014 Edge Cases

| ID | Scenario | Expected Behavior |
|----|----------|-------------------|
| S014-EC-001 | Remote host is unreachable | The executor **MUST** return a clear error message indicating connection failure. The error **MUST** include the target host and port. Retry **MAY** be attempted if configured. |
| S014-EC-002 | SSH key authentication fails | The executor **MUST** return an authentication error. The error **MUST NOT** expose private key contents. The user **MUST** be directed to check SSH key configuration. |
| S014-EC-003 | Workflow packaging fails due to missing dependencies | The packager **MUST** fail with a descriptive error listing missing dependencies. The workflow **MUST NOT** be transferred to the remote environment. |
| S014-EC-004 | Remote execution exceeds timeout | The executor **MUST** terminate the remote execution and return a timeout error. Partial results **MAY** be retrieved if available. |
| S014-EC-005 | Artifact transfer is incomplete due to network interruption | The system **MUST** retry the transfer up to 3 times with exponential backoff. After 3 failures, the execution **MUST** fail with a descriptive error. |
| S014-EC-006 | Secrets vault is unavailable at runtime | The executor **MUST** fail with a vault unavailable error. Secrets **MUST NOT** fall back to plaintext or default values. |
| S014-EC-007 | Remote execution exceeds memory or CPU limit | The executor **MUST** terminate the execution and return a resource limit exceeded error. The error **MUST** specify which limit was exceeded. |
| S014-EC-008 | Remote target URI is malformed | The CLI **MUST** return a usage error with the valid URI scheme formats. The command **MUST NOT** attempt to connect. |
| S014-EC-009 | Remote configuration file contains invalid YAML | The CLI **MUST** return an error indicating the file is invalid and the specific parsing error. |
| S014-EC-010 | Docker image does not exist on remote Docker host | The executor **MUST** return an error indicating the image is not found. The user **MUST** be directed to pull the image or specify a valid image. |
| S014-EC-011 | Kubernetes cluster is unreachable | The executor **MUST** return a connection error with cluster details. |
| S014-EC-012 | Lambda function invocation fails | The executor **MUST** return the Lambda error message and logs if available. |
| S014-EC-013 | Workflow package exceeds size limit | The packager **MUST** fail with a size limit error. The user **MUST** be directed to reduce package size or exclude unnecessary dependencies. |
| S014-EC-014 | Concurrent remote executions exhaust connection pool | The system **MUST** limit concurrent connections to the configured maximum. Queued executions **MUST** wait for available connections. |
| S014-EC-015 | Symlink encountered in workflow directory during packaging | `realpath()` resolves symlinks before packaging. The packaged workflow contains canonical paths only. |
| S014-EC-016 | Remote execution is interrupted by user (Ctrl+C) | The executor **MUST** terminate the remote execution gracefully where possible. Partial results **MAY** be retrieved. Clean shutdown is attempted within 5 seconds. |
| S014-EC-017 | Known hosts file is missing or malformed | The SSH executor **MUST** fail with a known hosts configuration error. The user **MUST** be directed to configure known hosts or disable host key verification (with security warning). |
| S014-EC-018 | Secrets reference points to non-existent vault key | The executor **MUST** fail with a secrets not found error indicating the missing key. |