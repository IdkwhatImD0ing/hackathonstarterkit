---
name: bugfix-doctor
description: "Systematic bug-fixing workflow for non-coders. Walks through reproduce, isolate, fix, test, and verify. Explains all errors in plain English. Use when something is broken and the user does not understand why."
---

# Bugfix Doctor

Something is broken and the user does not understand why. Walk them through a systematic fix using plain English at every step.

## Step 1: Reproduce

Ask the user:
- What did you expect to happen?
- What actually happened?
- Can you show me the error? (screenshot, error message, or description)

If they provide an error message, translate it into plain English before doing anything else.

## Step 2: Isolate

- Identify the most likely root cause
- Explain the cause in one sentence without jargon
- If multiple causes are possible, list them ranked by likelihood
- Show the user exactly which file and which section contains the problem

## Step 3: Fix

- Apply the smallest possible change that fixes the issue
- Never refactor unrelated code during a bugfix
- Never change more than 3 files for a single bug
- Explain what you changed and why in plain English

## Step 4: Test

- Run the project and verify the fix
- Walk the user through the same steps that triggered the bug
- Confirm the bug is gone
- Check that nothing else broke (run existing tests if available)

## Step 5: Report

Return exactly these sections:

1. **Symptom**: What the user saw (their words)
2. **Cause**: What went wrong (plain English)
3. **Fix**: What was changed (file names and a one-line summary per file)
4. **Verification**: How to confirm it works
5. **Prevention**: One suggestion to avoid this type of bug in the future

## Rules

- Always explain errors in plain English first, before showing code
- Never blame the user for the bug
- If the fix is uncertain, say so and propose a safe experiment
- If you cannot find the cause, say so honestly and suggest next steps
