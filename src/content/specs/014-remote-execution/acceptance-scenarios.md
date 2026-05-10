# S014 Acceptance Scenarios

### S014-AS-001 SSH remote execution [P1]
**Given** a workflow file `deploy.sir.yml` exists with a `deploy.app` task
**And** a remote SSH target `deploy-server` is configured in `remote-config.yml`
**When** the user runs `sir run deploy --remote ssh://deploy-server`
**Then** sir packages the workflow and transfers it to the remote host
**And** sir executes the workflow on the remote host via SSH
**And** sir streams stdout/stderr from the remote host to local stdout
**And** sir fetches the execution result back to the local machine

### S014-AS-002 Docker remote execution [P1]
**Given** a workflow file `build.sir.yml` exists
**And** a Docker remote is configured with image `php:8.2-cli`
**When** the user runs `sir run build --remote docker://php:8.2-cli`
**Then** sir packages the workflow
**And** sir transfers the package to the Docker container
**And** sir executes the workflow inside the container
**And** sir streams container output to local stdout
**And** sir cleans up the container after execution completes

### S014-AS-003 Kubernetes remote execution [P2]
**Given** a workflow file `test.sir.yml` exists
**And** a Kubernetes remote is configured with cluster `prod-cluster` and namespace `sir-jobs`
**When** the user runs `sir run test --remote k8s://prod-cluster/sir-jobs`
**Then** sir creates a pod in the specified namespace
**And** sir transfers the workflow package to the pod
**And** sir monitors pod status during execution
**And** sir streams pod logs to local stdout
**And** sir cleans up the pod after execution completes

### S014-AS-004 AWS Lambda remote execution [P2]
**Given** a workflow file `process.sir.yml` exists
**And** a Lambda remote is configured with function name `sir-processor`
**When** the user runs `sir run process --remote aws-lambda://sir-processor`
**Then** sir packages the workflow
**And** sir invokes the Lambda function with workflow payload
**And** sir retrieves the result from the Lambda response
**And** sir reports success or failure based on the Lambda exit code

### S014-AS-005 Workflow packaging and transfer [P1]
**Given** a workflow with multiple steps and pack dependencies
**When** the workflow is executed remotely
**Then** the WorkflowPackager bundles the workflow definition, all required packs, configuration, and environment references
**And** the package is compressed before transfer
**And** the package is transferred to the remote environment
**And** the remote environment extracts and validates the package

### S014-AS-006 Secrets injection at runtime [P1]
**Given** a workflow step references secrets via `{{vault:api-key}}` and `{{env:DB_PASSWORD}}`
**When** the workflow is executed remotely
**Then** secrets are resolved from the vault/env at execution time
**And** secrets are injected as environment variables in the remote environment
**And** secrets are never written to disk or stored in logs

### S014-AS-007 Streaming output [P2]
**Given** a workflow is executing on a remote target
**When** the user runs `sir run workflow --remote docker://image --follow`
**Then** output is streamed in real-time with latency under 500ms
**And** stdout and stderr are displayed in real-time
**And** streaming continues until the workflow completes or is interrupted

### S014-AS-008 Artifact transfer [P2]
**Given** a workflow step `build` produces artifacts at `build/dist`
**And** a subsequent step `deploy` references `artifacts: [build/dist]`
**When** the workflow runs on a remote target
**Then** artifacts from the `build` step are transferred to the remote environment
**And** the `deploy` step has access to `build/dist` at the expected path