# Run a local Sir workflow

Requires PHP 8.2 or later, Composer, and Git.

## Setup

On Linux or macOS, clone into a directory where you can keep the checkout.

```sh
git clone --branch v0.5.0 https://github.com/sir-sh/cli.git
cd cli
composer install --no-dev --no-interaction
mkdir -p "$HOME/.local/bin"
ln -s "$PWD/application" "$HOME/.local/bin/sir"
export PATH="$HOME/.local/bin:$PATH"
```

## Run a pinned workflow

Choose a workflow from the [Sir workflow registry](https://github.com/sir-sh/workflows).
The commands below install the release-note preview at a fixed revision. Review
the YAML before copying it into your Sir profile. It executes with your account's
permissions.

```sh
git clone https://github.com/sir-sh/workflows.git sir-workflows
git -C sir-workflows checkout --detach ef3b005ddd174b2cb2593f2c884b0e901132aff0
mkdir -p "$HOME/.sir/workflows"
cp sir-workflows/workflows/release-notes/release-notes.yml "$HOME/.sir/workflows/"
sir workflows:list
```

From a Git checkout, replace `HEAD~1` with the previous release tag or another
ancestor ref. The preview prints commits and leaves the checkout and remote unchanged.

```sh
sir run release-notes --dry-run --non-interactive --input=base=HEAD~1
sir run release-notes --non-interactive --input=base=HEAD~1
```

Pass `--input=name=value` once per named input, or pass positional values in
declaration order. Named inputs take precedence and positional values fill the
remaining inputs. A missing required input in non-interactive mode causes a
nonzero exit. By default, a failing step stops the local run before subsequent
steps. A step can opt into continuing with `continueOnError: true`.

When a shell step fails, Sir shows the step, underlying exit code, and command
with template values redacted. Programs can still print their own output, so
avoid commands that print secrets.



## Inspect and preview workflows as JSON

Install the three registry workflows at the pinned revision above. From the
directory containing the `sir-workflows` checkout, run:

```sh
for workflow in project-setup pre-release-checks release-notes; do
    cp "sir-workflows/workflows/$workflow/$workflow.yml" "$HOME/.sir/workflows/"
done

sir workflows:list --json
for workflow in project-setup pre-release-checks release-notes; do
    sir workflows:show "$workflow" --json
done

sir run project-setup --dry-run --json
sir run pre-release-checks --dry-run --json --input='command=git status --short'
sir run release-notes --dry-run --json --input=base=HEAD~1
```

## JSON contract

Each request handled by one of these commands emits one JSON object to stdout.
The commands exit 0 on success and 1 for the structured errors below. Console
syntax errors, such as an unknown option or a missing command argument, follow
the CLI parser's error reporting.

- Discovery returns `workflows`, an array of objects with `name`, `type`,
  `path`, and `layer`. An empty result is `{"workflows":[]}`.
- Inspection and preview return `workflow` with the same source fields,
  `opaque`, `inputs`, and `steps`. Shell and PHP workflow files are opaque.
  They have empty input and step lists, and Sir does not inspect their contents.
- Each input reports `name`, `required`, `hasDefault`, and `defaultRedacted`.
  Authors can expose a non-sensitive scalar default with `publicDefault: true`.
  Defaults marked `sensitive: true` and templated defaults stay redacted.
- Each step reports a one-based `index`, `name`, and `type`. Preview adds
  `condition` and `loop`. An absent condition or loop is `null`. Static
  conditions report `"true"` or `"false"` and static loops report an iteration
  count. Expressions with templates are `"unresolved"`; Sir does not infer
  their outcome from the supplied inputs or from earlier steps.
- Structured failures are `{"error":"CODE"}`. Handle `workflow_not_found` by
  refreshing discovery, `invalid_workflow` by fixing the definition, and
  `invalid_inputs` by inspecting and supplying the declared inputs. Other
  error codes are `dry_run_required` and `remote_preview_unsupported`.

A JSON preview validates the supplied inputs without prompting. It does not
print supplied values, shell source, or step arguments. It executes no steps
and does not contact remote runners. Treat names in workflow files as public
metadata.

## Connect an MCP client

Sir v0.5.0 exposes workflow discovery, inspection, preview, and run requests
to a local MCP client. The stdio server starts discovery at the directory passed to
`--project-dir` and also searches ancestor and global Sir layers. Use an
absolute project path when configuring a client.

With the pinned workflows installed as shown above, open a terminal from the
project you want to inspect. Use Node.js 22.23.4 or another version supported by MCP Inspector 2.15.0:

```sh
SIR_BIN="$(command -v sir)"
SIR_PROJECT="$PWD"

sir_inspect() {
    npx -y @modelcontextprotocol/inspector@2.15.0 --cli --quiet \
        --method "$@" -- "$SIR_BIN" mcp:serve --project-dir="$SIR_PROJECT"
}

sir_inspect tools/list
sir_inspect tools/call --tool-name list_workflows
sir_inspect tools/call --tool-name show_workflow --tool-arg name=project-setup
sir_inspect tools/call --tool-name preview_workflow --tool-arg name=project-setup
```

The first command lists `list_workflows`, `show_workflow`,
`preview_workflow`, `request_workflow_run`, and `get_workflow_run_status`. The second lists workflows, including the three registry
examples installed above. For another stdio client, set its command to the
absolute path printed by `command -v sir` and its arguments to
`["mcp:serve", "--project-dir=/absolute/path/to/project"]`.

Tool results contain the same data as the JSON CLI commands. Preview accepts
optional `values` and `inputs` arrays of strings, matching positional
arguments and named `name=value` assignments. Missing or invalid workflow
inputs return `invalid_inputs`. Preview reports static conditions and loop
counts and marks templated expressions as `unresolved`. It omits supplied
values and step arguments and leaves the project untouched.

## Approve a workflow requested by an MCP client

On Linux or macOS, install the `hello` workflow from the pinned registry checkout
used above. Choose an empty project directory for the example.

```sh
cp sir-workflows/workflows/hello/hello.yml "$HOME/.sir/workflows/"
SIR_APPROVAL_DEMO="$(mktemp -d)"
cd "$SIR_APPROVAL_DEMO"
SIR_PROJECT="$PWD"

sir_inspect tools/call --tool-name request_workflow_run \
    --tool-args-json '{"name":"hello","inputs":["name=Taylor"]}'
test ! -e greeting.txt
```

The MCP result includes `requestId`, `expiresIn` (600 seconds), and a preview
without input values. Replace `REQUEST_ID` with the returned ID and run this
command in your terminal.

```sh
sir approve REQUEST_ID
```

Review the project, workflow path, SHA-256 revision, step definitions, method
definitions, and inputs. Values declared with `sensitive: true` are redacted.
Type `approve` to execute. Any other response declines the request. Sir runs
from the project directory the MCP server recorded, even if you invoke
`sir approve` from another directory. Check the approved result with
`cat greeting.txt`. It should contain `Hello, Taylor!`.

Approval applies once to the same YAML definition, project directory identity,
resolved method definitions, and recorded inputs. If Sir detects a change,
make a new request. A pipe, `--no-interaction`, and an expired, declined, or
already claimed request cannot start a run.

Query the request from an MCP server configured for the same project before
approval, while the workflow runs, or after it finishes.

```sh
sir_inspect tools/call --tool-name get_workflow_run_status \
    --tool-arg requestId=REQUEST_ID
```

The response contains `requestId`, `state`, `requestedAt`, `expiresAt`,
`startedAt`, `finishedAt`, `elapsedSeconds`, and `outcome`. Timestamps are
Unix seconds. Start and finish times are null until available. Elapsed time
is null before execution and for an interrupted run whose end time is unknown.

| State | Outcome |
| --- | --- |
| `pending` | null |
| `declined` | `declined` |
| `expired` | `expired` |
| `running` | null |
| `succeeded` | `completed` |
| `failed` | `step_failed`, `execution_error`, or `interrupted` |

Status checks leave workflows and request files untouched. Unknown, expired
beyond retention, and other projects' request IDs return `request_unavailable`.
Status records are available for 24 hours after a terminal state, measured from
the start time for interrupted runs because the actual end time is unknown.

Sir stores request data under `~/.sir/pending-runs/` with owner-only permissions.
The execution payload is removed at approval or decline. New requests clean up
expired payloads and records past retention. Re-request any pending runs
after upgrading from v0.5. Status excludes input values,
subprocess output, and exception details. Workflow commands run with your
account's permissions. Review workflow and method definitions before approving.
