---
title: "Announcing sir.sh v0.1.0"
date: "2024-01-15"
excerpt: "Today we're excited to announce the release of sir.sh v0.1.0 - a local-first workflow/task runner built on Laravel Zero."
---

Today we're excited to announce the release of **sir.sh v0.1.0** - a local-first workflow/task runner built on Laravel Zero.

## What is sir.sh?

sir.sh lets you define, share, and execute complex development workflows with AI assistance. It discovers `.sir/` directories from your current working directory to the filesystem root, merging configuration from all layers.

## Key Features

- **Layer-based Configuration**: Configuration cascades from global to project-specific
- **YAML Workflows**: Define workflows in YAML with support for loops, conditionals, and nested variables
- **Template System**: Use `{{variable}}` syntax with functions like `shellQuote()` and `default()`
- **Pack System**: Install workflows from Git repositories with `sir pack install github:owner/repo`
- **AI Agent Interface**: MCP-style tool surface for AI assistants to discover and execute workflows safely

## Getting Started

```bash
curl -fsSL https://sir.sh/install.sh | bash
sir init
sir run my-workflow
```

## What's Next

We're working on:
- Remote execution support (SSH, Docker, Kubernetes)
- Workflow scheduling with cron
- More built-in tasks and methods
- Enhanced AI agent capabilities

Check the [Specs](/specs) page for our full roadmap.

## Links

- [GitHub](https://github.com/sir-sh/cli)
- [Documentation](/docs)
- [Specifications](/specs)