---
title: "Sir v0.1.0 ships the local workflow runner"
date: "2026-11-14T06:51:45+01:00"
excerpt: "Define a workflow in YAML, preview its steps, and run it locally with named inputs."
---

Sir v0.1.0 is the first tagged release of the local workflow runner. It discovers workflows from the current project and other `.sir` configuration layers. A workflow can declare its inputs and define a sequence of steps in YAML.

The release includes a small greeting workflow. A dry run shows the planned step. Running it for real writes `greeting.txt` in the current directory.

```sh
sir workflows:list
sir run hello --dry-run --non-interactive --input='name=Sir'
sir run hello --non-interactive --input='name=Sir'
```

In v0.1.0, copy the workflow from `examples/workflows/hello.yml` into `~/.sir/workflows/` first. A missing required input returns a nonzero exit in non-interactive mode. A failing step stops the run unless the workflow author opts into continuing.

[Tagged v0.1.0 source and installation instructions](https://github.com/sir-sh/cli/tree/v0.1.0)
