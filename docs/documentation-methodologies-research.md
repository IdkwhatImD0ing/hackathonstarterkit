# Proven Documentation, Technical Writing & Project Submission Methodologies

Research synthesis of frameworks, quotes, and attributions for writing compelling project documentation—especially READMEs, hackathon submissions (Devpost), and project presentations.

---

## 1. The Inverted Pyramid

### Origins & Attribution

**Note on Edward Murrow:** Research does not support a direct connection between Edward R. Murrow and the inverted pyramid. Murrow pioneered broadcast journalism; the inverted pyramid is a print journalism structure that developed separately through telegraph-era wire services.

**Actual origins:**
- **Telegraph (1845)** — Samuel Morse's invention created economic pressure for concise, "first news first" writing. At one point, telegraph cost was a penny per character; newspapers spent hundreds of thousands on Civil War coverage ([Poynter](https://poynter.org/reporting-editing/2003/birth-of-the-inverted-pyramid-a-child-of-technology-commerce-and-history)).
- **Associated Press** — The fledgling AP "established the trend with an agreement that stories would be brief, tailored for a national audience and deliberately stripped of the partisanship that characterized American newspapers" ([Poynter](https://poynter.org/reporting-editing/2003/birth-of-the-inverted-pyramid-a-child-of-technology-commerce-and-history)).
- **James Carey** (journalism scholar): The telegraph "provided the underlying structure for one of the most influential literary styles of the 20th century" ([Poynter](https://poynter.org/reporting-editing/2003/birth-of-the-inverted-pyramid-a-child-of-technology-commerce-and-history)).
- **David T. Z. Mindich** (journalism historian): Makes a persuasive case that "the inverted pyramid was born with the coverage of Lincoln's death" (April 15, 1865) ([Poynter](https://poynter.org/reporting-editing/2003/birth-of-the-inverted-pyramid-a-child-of-technology-commerce-and-history)).
- **AP Stylebook** (1953) — Standardizes the inverted pyramid; prescribes organizing stories in descending order of importance and answering the Five Ws + How in the opening ([Wikipedia](https://en.wikipedia.org/wiki/Inverted_pyramid_(journalism))).

### How It Works

- **Structure:** Most important information first, details in descending order of importance. Visualized as an upside-down triangle.
- **Also called:** "Bottom line up front" (BLUF).
- **Purpose:** Readers understand the story even if they stop partway through; editors can "cut from the bottom" for space.

### Application to Technical Documentation & Hackathon Submissions

- **README:** Lead with project name, one-line description, and "what it does" before installation, architecture, or credits.
- **Devpost:** Open with the problem, solution, and impact—not team bios or tech stack.
- **Demo video:** State the core value proposition in the first 10–15 seconds.

---

## 2. Show, Don't Tell

### Anton Chekhov's Principle

**The famous quote** (widely attributed, but a paraphrased summary):
> "Don't tell me the moon is shining; show me the glint of light on broken glass."
> — Attributed to Anton Chekhov ([Quote Investigator](https://quoteinvestigator.com/2013/07/30/moon-glint/))

**Original source:** Chekhov's May 1886 letter to his brother Alexander (translated by Avrahm Yarmolinsky, *The Unknown Chekhov*, 1954):

> "In descriptions of Nature one must seize on small details, grouping them so that when the reader closes his eyes he gets a picture. For instance, you'll have a moonlit night if you write that on the mill dam a piece of glass from a broken bottle glittered like a bright little star, and that the black shadow of a dog or a wolf rolled past like a ball."
> — [Quote Investigator](https://quoteinvestigator.com/2013/07/30/moon-glint/)

Chekhov used this technique in "Hydrophobia" (1886) and *The Seagull* (1896).

### Application to Documentation

| Instead of (Tell) | Do (Show) |
|-------------------|-----------|
| "Our app is fast and intuitive" | Screenshot of the UI with a clear workflow |
| "The API is easy to use" | Code snippet that runs in 3 lines |
| "We built a real-time collaboration feature" | GIF of two cursors editing the same doc |
| "Our architecture is scalable" | Architecture diagram with components and data flow |
| "The onboarding is smooth" | 30-second demo video of first-time user flow |

**Hackathon-specific:** Judges see hundreds of submissions. Screenshots, GIFs, architecture diagrams, and demo videos communicate more than paragraphs of description ([Devpost](https://info.devpost.com/blog/understanding-hackathon-submission-and-judging-criteria)).

---

## 3. README-Driven Development

### Tom Preston-Werner (GitHub Co-founder)

**Source:** [Readme Driven Development](https://tom.preston-werner.com/2010/08/23/readme-driven-development.html) (August 23, 2010)

**Core principle:**
> "Write your Readme first. First. As in, before you write any code or tests or behaviors or stories or ANYTHING."

**Key quote:**
> "Until you've written about your software, you have no idea what you'll be coding."

**Why it works:**
- "You're giving yourself a chance to think through the project without the overhead of having to change code every time you change your mind."
- "Consider the process of writing the Readme for your project as the true act of creation. This is where all your brilliant ideas should be expressed."
- "The Readme should be the single most important document in your codebase; writing it first is the proper thing to do."

**RDD vs. Documentation-Driven Development (DDD):** RDD restricts design to a single introductory file, avoiding waterfall-style over-specification while still preventing missing documentation.

**Proof of practice:** Preston-Werner's first commit to GitHub's Gollum wiki: "readme driven development!" ([GitHub](https://github.com/github/gollum/commit/c7875704971be998a5399ce83e66a5dada03aad4))

### Application to Hackathons

Write the Devpost description and README *before* or *alongside* coding. It forces clarity on the problem, solution, and differentiator before implementation.

---

## 4. Jeff Bezos / Amazon 6-Page Memo

### The Practice

At Amazon, executives write 6-page narrative memos instead of PowerPoint. Meetings begin with 20 minutes of silent reading.

**Bezos's 2004 email to senior team:**
> "The narrative structure of a good memo forces better thought and better understanding of what's more important than what."
> — [Business Insider](https://www.businessinsider.com/jeff-bezos-email-against-powerpoint-presentations-2015-7)

> "Writing a 4 page memo is harder than 'writing' a 20 page powerpoint" because narrative structure prevents glossing over ideas and reveals how things are interconnected.
> — [Business Insider](https://www.businessinsider.com/jeff-bezos-email-against-powerpoint-presentations-2015-7)

**Why narrative works:**
- Authors cannot hide behind bullet points; they must present arguments, data, and counter-arguments in a logical flow.
- The format forces prioritization and explanation of relationships between concepts.
- Great memos often take weeks to write and rewrite ([CNBC](https://www.cnbc.com/2018/04/23/what-jeff-bezos-learned-from-requiring-6-page-memos-at-amazon.html)).

### Application to Hackathon Submissions

Treat the Devpost "Inspiration," "What it does," and "How we built it" sections as a short narrative memo: problem → solution → how it works → impact. Avoid bullet-dumping; use connected prose that shows reasoning.

---

## 5. George Orwell's Writing Rules

### Source

"Politics and the English Language" (1946) — [Full text](https://www.orwell.ru/library/essays/politics/english/e_polit)

### The Six Rules

1. **Never use a metaphor, simile, or other figure of speech which you are used to seeing in print.**

2. **Never use a long word where a short one will do.**

3. **If it is possible to cut a word out, always cut it out.**

4. **Never use the passive where you can use the active.**

5. **Never use a foreign phrase, a scientific word, or a jargon word if you can think of an everyday English equivalent.**

6. **Break any of these rules sooner than say anything outright barbarous.**

([Duke University](https://sites.duke.edu/scientificwriting/orwells-6-rules/), [Open Culture](https://www.openculture.com/2016/05/george-orwells-six-rules-for-writing-clear-and-tight-prose.html))

### Broader Context

Orwell argued that unclear prose spreads as a "contagion" and that "The great enemy of clear language is insincerity." He also wrote: "It becomes ugly and inaccurate because our thoughts are foolish, but the slovenliness of our language makes it easier for us to have foolish thoughts."

### Application to Technical Documentation

- Prefer "use" over "utilize," "help" over "facilitate," "show" over "demonstrate" when they fit.
- Remove filler: "in order to" → "to," "due to the fact that" → "because."
- Use active voice: "The API returns the user" instead of "The user is returned by the API."
- Replace jargon with plain language where possible; keep technical terms only when necessary.

---

## 6. The Five Ws (and One H)

### Framework

**Who, What, Where, When, Why, How** — A journalism framework for complete coverage. A good news article answers these in the lede ([Wikinews](https://en.wikinews.org/wiki/Wikinews:Who_What_When_Why_Where_and_How)).

### Mapping to Hackathon Project Documentation

| Question | README / Devpost | Example |
|----------|------------------|---------|
| **Who** | Target users, team | "Students and educators overwhelmed by grading" |
| **What** | Product name, core feature | "GradeFlow — AI-assisted rubric grading" |
| **Where** | Context, platform | "Web app, works in Canvas and Google Classroom" |
| **When** | Timing, urgency | "Built in 36 hours at Hack the North 2025" |
| **Why** | Problem, motivation | "Teachers spend 10+ hours/week on grading" |
| **How** | Tech stack, architecture | "React frontend, FastAPI backend, Claude API" |

**5W2H variant:** Adds "How Much" (resources, cost, scale) for project planning ([Russell Rosario](https://russellrosario.com/thinker-tools/5w2h)).

---

## 7. Stripe's Documentation

### Why It's Considered the Gold Standard

- **Three-column layout:** Left nav, center prose, right-side examples. Widely copied ([Medium](https://medium.com/@garysvenson09/stripe-docs-the-gold-standard-and-what-every-api-team-should-steal-c6ccdfb82f4b)).
- **Examples first:** Code samples are prominent and runnable.
- **Progressive disclosure:** Quickstart → guides → reference; users choose depth.
- **API as product:** Stripe treats APIs as products, with a 20-page internal design doc, cross-functional review, and documentation quality in engineering career ladders ([APIDog](https://apidog.com/blog/why-stripes-api-is-the-gold-standard-design-patterns-that-every-api-builder-should-steal/)).
- **Developer experience:** ~99% satisfaction; converts developers to customers ~3x better than industry average ([APIDog](https://apidog.com/blog/why-stripes-api-is-the-gold-standard-design-patterns-that-every-api-builder-should-steal/)).

### Takeaways for Hackathon READMEs

- Lead with a quickstart or "Try it" section.
- Put code snippets and screenshots near the text they support.
- Use clear headings and a simple nav so judges can skim.
- Treat the README as part of the product, not an afterthought.

---

## 8. Documentation as Marketing

### The Idea

Documentation is often the first real interaction users have with a product. Developers trust working examples more than marketing claims ([DevScribe AI](https://www.devscribeai.com/blog/developer-documentation)).

**Industry consensus:**
- "Developers don't like being marketed to." Marketing terms like "fast," "easy," and "simple" are weak; documentation that shows implementation and trade-offs builds credibility ([The DevRel Collective](https://www.thedevrelcollective.com/blog/great-developer-documentation-is-your-best-marketing)).
- Documentation has become "the primary sales channel for developer products" ([DevScribe AI](https://www.devscribeai.com/blog/developer-documentation)).
- "Documentation builds trust through small wins: Each successful interaction—clear authentication, sensible error messages, findable information—moves developers closer to becoming customers" ([DevScribe AI](https://www.devscribeai.com/blog/developer-documentation)).

**What works:**
- 5-minute quickstarts
- Content structured from beginner to advanced
- Interactive or copy-pasteable code samples
- Examples that actually run ([FreeCodeCamp](https://www.freecodecamp.org/news/how-to-use-documentation-as-a-marketing-tool/)).

### Application to Hackathons

The README and Devpost page *are* your pitch. Judges form an opinion in seconds. Clear setup, working demo, and visible value matter more than hype.

---

## 9. Progressive Disclosure

### Definition

A UX technique that keeps essential information prominent and defers advanced content to secondary UI. Show what users need when they need it; reveal more on request ([Interaction Design Foundation](https://interaction-design.org/literature/topics/progressive-disclosure)).

### Benefits

- Reduces cognitive overload
- Helps new users succeed quickly
- Supports both beginners and experts
- Lowers the learning curve ([LogRocket](https://blog.logrocket.com/ux-design/progressive-disclosure-ux-types-use-cases))

### Patterns

- Accordions, expandable sections
- Step-by-step flows
- Truncated content with "Read more"
- Hover/click for details ([GitLab Pajamas](https://design.gitlab.com/patterns/progressive-disclosure))

### Application to README Structure

1. **Top:** Project name, one-line description, screenshot, quickstart.
2. **Middle:** Features, how it works, architecture diagram.
3. **Bottom:** Installation details, API reference, contributing, license.

Judges and users get the gist quickly; those who want depth can scroll. Avoid long walls of text at the top.

---

## 10. Hackathon-Specific Submission Tips

### From Devpost

- **Meet basic requirements first.** Many submissions are disqualified for missing eligibility, required tech, demo specs, or submission URLs ([Devpost](https://info.devpost.com/blog/understanding-hackathon-submission-and-judging-criteria)).
- **Demo video is critical.** Clearly explain problem, features, and benefits ([Devpost](https://info.devpost.com/blog/understanding-hackathon-submission-and-judging-criteria)).
- **Design and UX matter.** Clean, professional, functional design stands out ([Devpost](https://info.devpost.com/blog/hackathon-judging-tips)).
- **Technical implementation + UX.** Judges care about required tools, but prioritize intuitive design and smooth functionality ([Devpost](https://info.devpost.com/blog/understanding-hackathon-submission-and-judging-criteria)).
- **Submit early** — at least a week before the deadline — to allow proofreading and feedback ([Devpost Help](https://help.devpost.com/article/125-tips-for-planning-your-project)).

### From Devpost Winners

- **2–3 must-have features** that prove viability; avoid building everything ([Devpost](https://info.devpost.com/blog/tips-from-hackathon-winners)).
- **Solve a real, specific problem.** Judges notice forced use cases; start from genuine pain points ([BizThon/Medium](https://medium.com/@BizthonOfficial/10-winning-hacks-what-makes-a-hackathon-project-stand-out-818d72425a78)).
- **Explain in one or two sentences.** If you can't, the concept may be unclear ([Devpost](https://info.devpost.com/blog/understanding-hackathon-submission-and-judging-criteria)).

### From MLH / DoraHacks

- **3W1H model:** What problem? Why does it matter? Who is it for? How does it work? ([DoraHacks](https://dorahacks.io/blog/news/good-hackathon-submission/))
- **Substance over hype.** Avoid "revolutionary AI application"; let the work speak ([DoraHacks](https://dorahacks.io/blog/news/good-hackathon-submission/)).
- **Lead with what's different.** Highlight the core innovation upfront ([DoraHacks](https://dorahacks.io/blog/news/good-hackathon-submission/)).
- **Sponsor eligibility.** Make it obvious how you use required technologies/APIs ([DoraHacks](https://dorahacks.io/blog/news/good-hackathon-submission/)).
- **Transparent AI usage.** Document what you built vs. what you used ([MLH Guide](https://guide.mlh.io/general-information/judging-and-submissions/rules-for-your-hackathon)).

---

## Quick Reference: Hackathon README Checklist

- [ ] **Inverted pyramid:** Problem + solution in first 2–3 lines
- [ ] **Show, don't tell:** Screenshot, GIF, or demo video at top
- [ ] **Five Ws:** Who, What, Where, When, Why, How covered
- [ ] **Progressive disclosure:** Quickstart first, details below
- [ ] **Orwell's rules:** Short words, active voice, no filler
- [ ] **3W1H:** What, Why, Who, How explicit
- [ ] **Sponsor tech:** Clear use of required APIs/tools
- [ ] **One-sentence pitch:** Can you explain it in 10 seconds?

---

## Sources

- [Birth of the Inverted Pyramid - Poynter](https://poynter.org/reporting-editing/2003/birth-of-the-inverted-pyramid-a-child-of-technology-commerce-and-history)
- [Inverted Pyramid - Wikipedia](https://en.wikipedia.org/wiki/Inverted_pyramid_(journalism))
- [Quote Investigator: Chekhov Moon/Glass](https://quoteinvestigator.com/2013/07/30/moon-glint/)
- [Tom Preston-Werner: Readme Driven Development](https://tom.preston-werner.com/2010/08/23/readme-driven-development.html)
- [Jeff Bezos 2004 Email on Memos - Business Insider](https://www.businessinsider.com/jeff-bezos-email-against-powerpoint-presentations-2015-7)
- [Orwell's 6 Rules - Duke University](https://sites.duke.edu/scientificwriting/orwells-6-rules/)
- [Wikinews: Five Ws](https://en.wikinews.org/wiki/Wikinews:Who_What_When_Why_Where_and_How)
- [Stripe Docs: The Gold Standard - Medium](https://medium.com/@garysvenson09/stripe-docs-the-gold-standard-and-what-every-api-team-should-steal-c6ccdfb82f4b)
- [Why Stripe's API is the Gold Standard - APIDog](https://apidog.com/blog/why-stripes-api-is-the-gold-standard-design-patterns-that-every-api-builder-should-steal/)
- [Great Developer Documentation Is Your Best Marketing - DevRel Collective](https://www.thedevrelcollective.com/blog/great-developer-documentation-is-your-best-marketing)
- [Progressive Disclosure - Interaction Design Foundation](https://interaction-design.org/literature/topics/progressive-disclosure)
- [Devpost: Understanding Hackathon Submission Criteria](https://info.devpost.com/blog/understanding-hackathon-submission-and-judging-criteria)
- [Devpost: Tips from Hackathon Winners](https://info.devpost.com/blog/tips-from-hackathon-winners)
- [Devpost: Hackathon Judging Tips](https://info.devpost.com/blog/hackathon-judging-tips)
- [DoraHacks: Good Hackathon Submission](https://dorahacks.io/blog/news/good-hackathon-submission/)
- [MLH Hackathon Organizer Guide](https://guide.mlh.io/general-information/judging-and-submissions/rules-for-your-hackathon)
