---
name: feature-builder
description: "Structured workflow for implementing a new feature when you have no coding experience. Returns a plan, files list, commands, manual test steps, and rollback plan. Use when the user wants to add a feature to their project."
---

# Feature Builder

The user wants to implement a new feature. They have no coding background. Guide them through a structured, safe process.

## Step 1: Understand the Feature

Ask the user to describe:
- What the feature should do (in their own words)
- Who will use it
- What it should look like (screenshots, sketches, or descriptions are all fine)

If the description is vague, propose 2-3 concrete interpretations and ask which one is closest.

## Step 2: Create the Plan

Generate a plan with exactly these sections:

1. **Goal**: One sentence describing the feature
2. **Steps**: 5-10 numbered steps, each with a single goal
3. **Files**: List every file that will be created or changed
4. **Dependencies**: Any new libraries needed (ask before installing)
5. **Commands**: Copy-paste terminal commands to run
6. **Manual Test**: Step-by-step instructions to verify the feature works
7. **Rollback Plan**: How to undo the changes if something breaks

## Step 3: Implement

- Build the smallest vertical slice first: input > minimal processing > visible output
- Implement one step at a time; confirm each step works before moving to the next
- Use the simplest libraries and hosted services available
- Target a visible, working demo in under 60 minutes

## Step 4: Verify

After implementation:
- Run the project and capture any errors
- Walk the user through the manual test steps
- If errors occur, explain them in plain English and propose fixes
- Ask: "Does this match what you had in mind?"

## Constraints

- Never add features the user did not ask for
- Never make changes outside the scope of this feature
- Keep changes minimal, testable, and reversible
- Prefer high-level libraries over low-level implementations
