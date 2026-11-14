# Run a local Sir workflow

Requires PHP 8.2 or later, Composer, and Git.

## Setup

On Linux or macOS, clone into a directory where you can keep the checkout.

```sh
git clone --branch v0.2.0 https://github.com/sir-sh/cli.git
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

