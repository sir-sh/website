---
title: "Sir's website adds build checks"
date: "2026-10-26T09:18:45+01:00"
excerpt: "The October website CI workflow added TypeScript and production build checks to pull requests and main."
---

The Sir website gained a GitHub Actions workflow in October. It runs on pull requests and pushes to the main branch. The job installs locked dependencies on Node.js 22, runs the TypeScript checker, and builds the production site.

The production build covers the site's documentation and specification pages alongside the homepage. The October workflow used read-only repository permissions and had no deploy step.

[Website CI change](https://github.com/sir-sh/website/commit/157307d192c02873f5569272389129f5de146206) · [Documentation](/docs) · [Specifications](/specs)
