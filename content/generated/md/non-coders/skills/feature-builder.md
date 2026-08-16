# Feature Builder

> Structured workflow for implementing a new feature. Returns a plan, files list, commands, test steps, and rollback plan.

Canonical: https://thehackathonplaybook.dev/non-coders/skills/feature-builder

---

Structured workflow for implementing a new feature. Returns a plan, files list, commands, test steps, and rollback plan.

Category: Building

Usage: `/feature-builder [describe the feature you want]` (Structured feature implementation workflow)

Build one feature at a time. The user may not code, so keep the work visible, bounded, and reversible.

## Understand The Feature

Extract or ask for:

- What the feature should do in the user's words
- Who uses it and why it matters
- What screen, page, or flow it belongs to
- What it should look like, using screenshots, sketches, examples, or plain description
- What counts as "done"

If the request is vague, propose two or three concrete interpretations and ask the user to choose. If the feature depends on auth, payments, database writes, external APIs, or secrets, call that out before implementation.

## Decide State And Persistence

Before building features that save, remember, notify, or share data, identify where the state lives:

- Local component state for temporary UI-only behavior
- Browser storage for single-device preferences or drafts
- Existing backend/database for account-level or cross-device data
- New backend/database work only after the user approves the added scope

Do not quietly choose persistence. Ask when the product behavior depends on whether data survives refreshes, appears across devices, or belongs to a signed-in user.

## Plan First

Before editing, provide a compact plan with:

1. **Goal**: one sentence
2. **Steps**: five to ten small steps
3. **Files**: files to create or change
4. **Dependencies**: new libraries, if any, with a recommendation and reason
5. **Commands**: copy-paste-ready commands
6. **Manual Test**: step-by-step verification path
7. **Rollback Plan**: how to undo the feature safely

Ask before installing new dependencies or making destructive changes.

When a feature touches email, payments, AI APIs, auth, databases, analytics, or file storage, include a short **External Services** note covering provider choice, required keys, local testing, and what happens if the service fails.

## Implement In A Vertical Slice

Start with the smallest path that shows value:

1. Input or trigger
2. Minimal processing
3. Visible output

Then improve styling, empty states, validation, and error handling. Prefer existing app patterns and helper APIs over new architecture. Do not add adjacent features just because they are easy.

## Keep The User Oriented

Use plain English updates:

- What changed
- Why it changed
- How the user can see it
- What remains

If an error appears, switch into a debugging posture and explain the error before fixing it.

## Verify

Run the most relevant check for the change:

- Unit or integration tests if they exist and cover the feature
- Typecheck or build for shared code changes
- Browser/manual flow for UI behavior
- API request for backend behavior
- Failure cases for external services, empty states, validation, and permission errors when relevant

If verification cannot run, state why and give manual steps the user can perform.

## Final Response

Return:

1. **What Changed**: short user-facing summary
2. **Files**: changed files and why they matter
3. **How To Test**: commands and manual steps
4. **Rollback**: simplest safe undo path
5. **Risks**: any remaining uncertainty

Do not commit unless the user explicitly asks.
