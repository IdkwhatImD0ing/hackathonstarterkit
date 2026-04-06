---
name: domain-to-spec
description: "Turns domain expertise into a technical specification. Takes your profession and desired outcome, lists constraints, identifies error-prone steps, and proposes the simplest buildable flow. Modeled after hackathon-winning approaches from lawyers and doctors. Use when a domain expert wants to build something from their field."
---

# Domain to Spec

The user is a domain expert (doctor, lawyer, teacher, consultant, etc.) who wants to build a tool for their professional field. They understand the problem deeply but have no coding experience. Your job is to translate their expertise into a buildable specification.

## Step 1: Extract Domain Knowledge

Ask the user:

> "I'm a {profession} building a tool to {outcome}."

Then ask follow-up questions:
- What are the regulations or constraints in your field that this tool must respect?
- What are the 3 most error-prone or time-consuming steps in the current process?
- Who will use this tool? (you, your patients/clients, your staff, the public)
- What does success look like? (one sentence)

## Step 2: Map the Domain to Software

For each domain concept the user describes, translate it:

| Domain Concept | Software Equivalent |
|---|---|
| Form or checklist | Input form with validation |
| Decision tree | Conditional logic / wizard flow |
| Reference document | Searchable knowledge base |
| Approval process | Status workflow with roles |
| Report or summary | Generated output / PDF export |
| Compliance check | Rule engine with pass/fail |

## Step 3: Propose the Simplest Flow

Design the minimum viable product:
- One input (what the user provides)
- One process (what the app does with it)
- One output (what the user gets back)

Present it as:

```
INPUT: [what the user enters or uploads]
  |
PROCESS: [what happens behind the scenes]
  |
OUTPUT: [what the user sees or downloads]
```

## Step 4: Generate the Spec

Return exactly:
1. **One-Sentence Summary**: What this tool does
2. **Target User**: Who uses it and when
3. **Domain Constraints**: Rules, regulations, or standards it must follow
4. **Core Flow**: The input > process > output pipeline
5. **Data Model**: What information the app stores (in plain English)
6. **Risk Areas**: The 3 things most likely to go wrong
7. **MVP Scope**: What to build first (fits in one week)
8. **Out of Scope**: What to save for later

## Inspiration

This skill is modeled after two hackathon-winning approaches:

- **CrossBeam** (1st place, Anthropic hackathon): A lawyer encoded California ADU permit regulations into a tool that checks compliance and suggests corrections. The key insight: 28 reference documents became validation rules.

- **PostVisit.AI** (3rd place, Anthropic hackathon): A cardiologist built a platform that processes visit transcripts into patient-friendly summaries, medication checklists, and follow-up schedules. The key insight: clinical expertise became structured output templates.

Both winners succeeded because they understood the problem domain better than any developer could. Your domain expertise is the most valuable input.
