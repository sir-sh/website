---
title: "From the workflow registry to terminal approval"
date: "2026-11-14T08:46:11+01:00"
excerpt: "Sir gained a separate workflow registry, structured previews, and a local MCP interface for requesting approved runs."
---

Sir v0.2 moved shared examples into a separate Git repository. Its first workflows cover project setup, pre-release checks, and release note previews. You can review a YAML file at a fixed commit and copy it into your Sir profile before running it.

Version 0.3 added JSON output to workflow discovery, inspection, and dry runs. A structured preview reports declared inputs and planned step types without executing steps. It keeps supplied values and step arguments out of the response.

Version 0.4 brought those operations to a local MCP server. With v0.5, a client can also request a run and receive a request ID. Open a terminal and use `sir approve REQUEST_ID` to see the workflow and decide whether to run it. The request itself executes no workflow steps, and pending requests expire after ten minutes.

[Workflow registry](https://github.com/sir-sh/workflows) · [Quickstart and MCP setup](/docs/QUICKSTART) · [v0.5.0 release](https://github.com/sir-sh/cli/releases/tag/v0.5.0)
