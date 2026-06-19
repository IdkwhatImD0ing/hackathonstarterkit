# Claude Code Guidelines

How I run Claude Code across my repos, and how to maintain the `CLAUDE.md` that ships with each one. The companion `CLAUDE.md` in this repo is the template — copy it into a new repo and fill in the project-specific sections.

The four working principles in `CLAUDE.md` come from [Karpathy's CLAUDE.md](https://github.com/multica-ai/andrej-karpathy-skills/blob/main/CLAUDE.md). The honesty rules and verification protocol come from [rody's 4-layer honesty setup](https://x.com/0x_rody/status/2063295395434831922). The maintenance discipline below comes from the broader Claude Code best-practice consensus.

---

## The four principles (why they matter)

1. **Think before coding** — most bad output traces back to a misread request, not a coding mistake. A clarifying question up front is cheaper than a rewrite. The signal that this is working: questions *precede* implementation instead of following a mistake.

2. **Simplicity first** — the model defaults to over-engineering: extra abstraction, defensive branches for cases that can't happen, config nobody asked for. Naming "minimal code, stated problem only" counteracts that bias. If 200 lines could be 50, that's a bug.

3. **Surgical changes** — unrequested refactors and reformatting bury the real change in noise, make review harder, and break things that were fine. "Every changed line traces to the request" keeps diffs reviewable.

4. **Goal-driven execution** — without a verifiable success criterion, the model declares victory early and you re-clarify in a loop. Defining "done" as a testable outcome up front replaces that loop with a single check.

**Success indicators:** fewer junk diff lines, fewer rewrites caused by over-engineering, and clarifying questions arriving *before* code rather than after a mistake.

---

## Keeping CLAUDE.md effective

**Treat it like a token budget, not a wiki.** There's roughly a 150–200 instruction ceiling before the model starts ignoring instructions — and the system prompt already spends ~50. A bloated `CLAUDE.md` doesn't add safety; it *dilutes* the rules that matter.

**The one test for every line:** "Would removing this cause Claude to make a mistake?" If not, cut it. Don't restate what the model can read from the code, the file tree, or `git log`.

**What earns a place:**
- Commands the model can't infer (non-standard build/test/run/lint).
- Architecture facts that aren't visible in any single file.
- Conventions that, if violated, produce wrong-but-plausible code.
- Hard guardrails (don't touch X, never commit Y).

**What doesn't:**
- Restating language/framework defaults.
- Tutorials or background the model already knows.
- Aspirational style essays nobody enforces.

**Maintain it like code.** Check it into git so it's reviewed and shared. When the model does something wrong, the first question is "what line in `CLAUDE.md` would have prevented this?" — add that line, prune one that didn't pull its weight. Verify changes by watching whether behavior actually shifts. The file compounds in value over time.

---

## The anti-fabrication setup (4 layers)

Claude is a text predictor: when it doesn't know something, it predicts text that *looks* right. A made-up function name reads exactly like a real one until your code breaks two hours later. The fix isn't a smarter model — it's making output checkable in real time and making "I don't know" cheaper than guessing. Four layers, lying drops to roughly zero:

1. **Honesty rules** (in `CLAUDE.md`) — explicit permission to admit uncertainty, and instructions on when. The "I don't know" license is the most important line, because by default the model is optimized to *look* helpful and admitting ignorance feels unhelpful.
2. **Verification protocol** (in `CLAUDE.md`) — verify a symbol before writing code that uses it; mark unverified code with a comment. Costs a few extra tool calls, saves hours of debugging fake calls.
3. **Hooks** (in `settings.json`) — a `PostToolUse` hook runs the type checker/linter every time Claude writes a file, so a fabricated import fails instantly and the model must fix it before declaring done. A `Stop` hook runs the test suite so the model can't claim "tests pass" without them actually running. **Hook output must reach stdout** — if it logs silently, the model never learns it lied.
4. **Fact-checker subagent** (`.claude/agents/fact-checker.md`) — a read-only agent (`tools: Read, Grep, Glob, Bash`) whose only job is to verify every factual claim and report VERIFIED / WRONG / UNVERIFIABLE. Invoke it before commits and before sharing results. It catches what the other three layers missed.

Layers 1–2 ship in this repo's `CLAUDE.md`. Layers 3–4 are per-repo enforcement — set them up where the stack warrants it.

**The "I don't know" license is half config, half habit.** Reward "I haven't verified this" with patience and you get an honest model every session; react to it with frustration and the model goes back to guessing. It's the one layer that doesn't live in a file.

**It's working when:** the model asks before adding dependencies, references `file:line` when discussing existing code, and your linter/type-checker stop screaming because fabrications get caught and self-corrected before you look. Not seeing this after a day or two? A layer isn't loaded — usually `CLAUDE.md` in the wrong location or under the wrong name, or honesty rules buried below the first ~50 lines where the model skims.

## When CLAUDE.md isn't the right tool

`CLAUDE.md` instructions are **advisory** — the model usually follows them, but not with certainty. For three needs, reach for stronger mechanisms:

- **Must-happen-every-time actions → hooks.** Configured in `settings.json`, hooks run scripts deterministically at fixed points (e.g. format-on-save, block a commit). Use them for "with zero exceptions" rules — formatting, secret scanning, test gates. An advisory line in `CLAUDE.md` will eventually be skipped; a hook won't.

- **Reusable domain workflows → skills.** A `SKILL.md` under `.claude/skills/` packages a repeatable procedure or domain knowledge. The model loads it automatically when relevant, or you invoke it with `/skill-name`. Better than a long `CLAUDE.md` section for anything procedural.

- **Permissions / env / settings → `settings.json`.** Allowlists, environment variables, and harness config belong there, not in prose.

---

## Workflow habits

- **Start each repo with `/init`** to generate a `CLAUDE.md` draft from the actual structure, then replace the generic parts with this template's principles and prune hard.
- **Plan before large changes.** For anything multi-step, get the plan and the verification checkpoints agreed before code is written.
- **Review the diff like a human PR.** Surgical-changes discipline only pays off if you actually check that every line belongs.
- **Sync the template, not the project sections.** The principles/maintenance guidance is identical everywhere; the Project context / Commands / Conventions sections are per-repo.

---

## References

- [Karpathy CLAUDE.md](https://github.com/multica-ai/andrej-karpathy-skills/blob/main/CLAUDE.md) — source of the four working principles.
- [rody — 4-layer honesty setup](https://x.com/0x_rody/status/2063295395434831922) — source of the honesty rules, verification protocol, hooks, and fact-checker subagent.
- [Anthropic: Best practices for Claude Code](https://code.claude.com/docs/en/best-practices) — official guidance on CLAUDE.md, hooks, and skills.
