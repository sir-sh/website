# Run a local Sir workflow

Requires PHP 8.2 or later, Composer, and Git.

### Setup

On Linux or macOS, clone into a directory where you can keep the checkout.

```sh
git clone https://github.com/sir-sh/cli.git
cd cli
composer install --no-dev --no-interaction
mkdir -p "$HOME/.local/bin"
ln -s "$PWD/application" "$HOME/.local/bin/sir"
export PATH="$HOME/.local/bin:$PATH"
```

### Run a local workflow

```sh
mkdir -p "$HOME/.sir/workflows"
cp examples/workflows/hello.yml "$HOME/.sir/workflows/"
sir workflows:list
sir run hello --dry-run --non-interactive --input='name=Sir'
sir run hello --non-interactive --input='name=Sir'
cat greeting.txt
```

The dry run previews the step. The actual run writes `Hello, Sir!` to
`greeting.txt` in the current directory.

Pass `--input=name=value` once per named input, or pass positional values in
declaration order. Named inputs take precedence and positional values fill the
remaining inputs. A missing required input in non-interactive mode causes a
nonzero exit. A failing step stops the local run before subsequent steps.

To check discovery, dry run, execution, and failure handling in an isolated
profile, run `sh tests/smoke-local.sh "$(command -v sir)"` from the checkout.

