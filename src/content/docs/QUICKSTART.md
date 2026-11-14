# Run a local Sir workflow

Requires PHP 8.2 or later, Composer, and Git.

## Setup

On Linux or macOS, clone into a directory where you can keep the checkout.

```sh
git clone --branch v0.3.0 https://github.com/sir-sh/cli.git
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
