# S014 Functional Requirements

## Remote Executor Interface

S014-FR-001 [P1] The system **MUST** define a `RemoteExecutor` interface with the following methods:
- `execute(Workflow $workflow, array $inputs): Result` — executes the workflow on the remote target
- `isAvailable(): bool` — returns whether the executor is available and configured
- `getCapabilities(): array` — returns supported features and limitations

S014-FR-001.a The interface **MUST** be implemented by all remote execution providers (SSH, Docker, Kubernetes, Cloud Functions).

## SSH Executor

S014-FR-002 [P1] The `SSHExecutor` implementation **MUST** support the following functionality:
- Connect to remote hosts via SSH protocol
- Authenticate using SSH keys (no password in plaintext)
- Package workflows and transfer to remote hosts
- Execute packaged workflows remotely
- Fetch execution results back to the local machine
- Stream stdout/stderr in real-time

S014-FR-002.a The SSH executor **MUST** support `known_hosts` verification for host key checking.

## Docker Executor

S014-FR-003 [P1] The `DockerExecutor` implementation **MUST** support:
- Execute workflows inside Docker containers
- Specify container images (e.g., `php:8.2-cli`)
- Configure required dependencies in the container definition
- Pass environment variables to containers
- Transfer workflow packages to containers
- Stream container output in real-time

## Kubernetes Executor

S014-FR-004 [P2] The `KubernetesExecutor` implementation **SHOULD** support:
- Execute workflows in Kubernetes pods
- Specify cluster and namespace context
- Configure resource limits (cpu, memory)
- Monitor pod status during execution
- Stream pod logs in real-time

## Cloud Function Executor

S014-FR-005 [P2] The `CloudFunctionExecutor` implementation **SHOULD** support:
- Execute workflows on AWS Lambda
- Configure function name and region
- Pass inputs as Lambda event payload
- Retrieve results from Lambda response
- Handle Lambda-specific timeouts and limits

## Workflow Packaging

S014-FR-006 [P1] The `WorkflowPackager` class **MUST** package workflows with the following components:
- `workflow` — serialized workflow definition
- `packs` — required dependency packs
- `config` — configuration files needed
- `environment` — environment variables and secrets references

S014-FR-006.a The packager **MUST** compress packages before transfer to reduce bandwidth.

S014-FR-006.b The packager **MUST** include all pack dependencies transitively.

## CLI Integration

S014-FR-007 [P1] The CLI **MUST** support a `--remote` flag for the `sir run` command with the following URI schemes:
- `ssh://user@host` — SSH execution
- `docker://image` — Docker container execution
- `k8s://cluster/namespace` — Kubernetes execution
- `aws-lambda://function-name` — AWS Lambda execution

S014-FR-007.a The `--remote` flag **MUST** accept a target URI or a reference to a configured remote.

S014-FR-008 [P1] The CLI **MUST** support a `--remote-config` flag that accepts a YAML configuration file defining remote targets.

S014-FR-008.a The remote configuration file **MUST** support defining multiple named remotes with type, host, user, and authentication details.

## Secrets Management

S014-FR-009 [P1] The system **MUST** support secrets injection via the following reference patterns:
- `{{vault:secret-name}}` — resolved from a secrets vault at runtime
- `{{env:VAR_NAME}}` — resolved from environment variables at runtime

S014-FR-009.a Secrets **MUST NOT** be stored in plaintext in any configuration file or workflow definition.

S014-FR-009.b The system **MUST** support integrating with external secrets managers (e.g., HashiCorp Vault, AWS Secrets Manager).

## Streaming Output

S014-FR-010 [P2] The CLI **SHOULD** support a `--follow` flag that streams remote execution output in real-time with latency under 500ms.

S014-FR-010.a When `--follow` is enabled, the system **MUST** stream stdout and stderr as they are produced.

## Artifact Transfer

S014-FR-011 [P2] The system **SHOULD** support automatic artifact transfer between execution steps:
- Steps can save outputs as named artifacts using `saveAs`
- Subsequent remote steps can reference artifacts via `artifacts` configuration
- Artifact paths **MUST** be transferred to the remote environment before execution

## Resource Management

S014-FR-012 [P2] The system **SHOULD** support resource limits for remote execution:
- `timeout` — maximum execution time (default: unlimited)
- `cpu` — CPU cores allocated
- `memory` — memory allocated (e.g., `4GB`)
- `disk` — disk space allocated

S014-FR-012.a Resource limits **MUST** be enforced by the remote executor where supported.

## Caching

S014-FR-013 [P2] The system **SHOULD** support caching of dependencies across remote executions:
- Cache paths (e.g., `vendor/`, `node_modules/`) can be configured
- Cache key can be derived from dependency file checksums (e.g., `{{checksum('composer.lock')}}`)
- Cached content **MUST** be preserved across executions when cache key matches

## Sandboxing

S014-FR-014 [P1] Remote execution **MUST** support sandbox isolation with the following options:
- `sandbox: true` — enable isolated execution environment
- `network: false` — disable network access during execution
- Resource limits enforced within the sandbox