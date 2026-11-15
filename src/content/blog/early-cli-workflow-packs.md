---
title: "Early CLI development added example workflow packs"
date: "2026-04-28T16:14:46+02:00"
excerpt: "April's development work added sample Git, npm, and shell packs alongside improvements to workflow conditions."
---

The Sir CLI development branch gained three example method packs in April. The Git pack defines methods for common operations such as status and branch. The npm pack covers tasks such as running tests. The shell pack includes generic execution and file existence checks.

Packs give workflow authors a way to reuse method definitions across projects. A workflow can reference a method by name and pass it arguments. The underlying method still runs with the permissions of the account invoking Sir.

The same round of work expanded the condition evaluator to cover operators such as `contains` and `exists`. It also added dot-notation access to nested workflow values. These were development commits. The first tagged CLI release followed in November.

[Sample pack commit](https://github.com/sir-sh/cli/commit/f725256f8dbe1f0cc15d2d858311f12dbbe14263) · [Condition evaluator and context changes](https://github.com/sir-sh/cli/commit/3a5c666f848bd41e47d94ae7b97d27d78300d9c5)
