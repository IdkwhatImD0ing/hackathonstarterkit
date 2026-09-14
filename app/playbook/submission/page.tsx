import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  Github,
  Video,
  Newspaper,
  ArrowRight,
  Image,
  Camera,
  Layout,
  Lightbulb,
  BookOpen,
  Scissors,
  Layers,
  AlertTriangle,
  MessageSquareOff,
  Clock,
  Eye,
  FileImage,
  CheckCircle2,
  Bot,
  Megaphone,
} from "lucide-react";
import { SectionTemplate } from "@/components/section-template";
import { CopyButton } from "@/components/copy-button";
import { KeyTakeaway } from "@/components/key-takeaway";
import { Disclosure } from "@/components/disclosure";
import { PLAYBOOK_SECTIONS } from "@/lib/playbook";
import {
  DEVPOST_AGENT_PROMPT as SHARED_DEVPOST_AGENT_PROMPT,
  README_AGENT_PROMPT as SHARED_README_AGENT_PROMPT,
} from "@/lib/prompts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { markdownAlternate, SITE_URL } from "@/lib/site";

const section = PLAYBOOK_SECTIONS[5];

export const metadata: Metadata = {
  title: "Hackathon Submission — How to Write a Winning Devpost & Demo Video",
  description:
    "Write hackathon READMEs, record compelling demo videos, and submit deliverables that make judges remember you. Templates and examples from 36+ winning submissions.",
  alternates: {
    canonical: `${SITE_URL}/playbook/submission`,
    types: markdownAlternate("/playbook/submission"),
  },
  openGraph: {
    title: "How to Write a Winning Hackathon Submission",
    description:
      "README templates, demo video tips, and submission strategies that win hackathon prizes. From the 36-win playbook.",
  },
};

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="space-y-3">
      <h2 className="font-display text-3xl font-bold tracking-tight">
        {title}
      </h2>
      <p className="max-w-3xl font-body text-muted-foreground">{subtitle}</p>
      <Separator className="bg-primary/20" />
    </div>
  );
}

const DEVPOST_PROMPT = `You are a hackathon submission expert. Generate a Devpost README for my hackathon project using the information I provide below.

Follow these rules strictly:

INSPIRATION SECTION:
- Open with a striking statistic, vivid scenario, or concrete number that makes the reader feel the problem BEFORE describing any solution. Only use numbers that appear in my project information; if there are none, open with a scenario
- Use bold markdown for key stats
- Do NOT start with "We wanted to..." or "Our team decided to...". Lead with the problem, not yourself
- 2-3 short paragraphs maximum. Make every sentence earn its place.

WHAT IT DOES SECTION:
- Start with 2-3 sentences summarizing the product from the user's perspective
- Then list 3-5 key features as bullet points with bold titles
- Be concrete and specific: "Users check balances, transfer funds, and pay bills using voice commands" NOT "An AI-powered solution"
- If relevant, mention the core user flow

HOW WE BUILT IT SECTION:
- Group technologies by category: Frontend, Backend, AI/ML, Infrastructure, APIs
- Name EVERY API, framework, library, and service used, especially sponsor technologies
- Describe the architecture briefly (e.g., "User speaks → Twilio captures audio → GPT-4 processes → response streamed back")
- If there's a system design or architecture image, reference it with ![Architecture](URL)
- Mention any custom datasets, fine-tuned models, or novel technical approaches

CHALLENGES WE RAN INTO SECTION:
- List 3-5 real, specific challenges, NOT generic ones
- Be honest. "Integrating multiple real-time APIs with different auth patterns" is good. "Time management" is lazy.
- Briefly mention how you overcame each challenge or what you learned from it

ACCOMPLISHMENTS THAT WE'RE PROUD OF SECTION:
- Tie accomplishments back to the original problem statement
- Include quantitative results only if I gave them to you (e.g., "80% reduction in inference time", "supports 6 languages")
- Mention any technical firsts or novel approaches

WHAT WE LEARNED SECTION:
- Focus on genuine technical and personal growth
- Be specific: "How to orchestrate multi-agent LLM systems" NOT "We learned a lot about AI"
- 3-5 bullet points

WHAT'S NEXT SECTION:
- 3-5 concrete, realistic next steps
- Mix short-term (next month) and medium-term (next year) goals
- Show the idea has legs beyond the hackathon without being delusional

GENERAL RULES:
- Use markdown formatting: bold for emphasis, bullet points for lists, headers for sections
- Follow the inverted pyramid: most important information first in every section
- Apply Orwell's rule: if a word can be cut without losing meaning, cut it
- Write in first person plural ("we") with energy and confidence
- Never invent statistics, metrics, awards, or quotes. Every number must come from my project information below.
- Total length: 800-1500 words. Comprehensive but not bloated.

---

HERE IS MY PROJECT INFORMATION (replace this section with your actual details):

Project Name: [YOUR PROJECT NAME]
Hackathon: [HACKATHON NAME]
Problem/Inspiration: [Describe the problem you're solving and why it matters]
What it does: [Describe what your project does from the user's perspective]
Tech stack: [List all technologies, APIs, frameworks, and services used]
Sponsor technologies: [List any sponsor APIs or tools you used; these are critical]
Challenges: [List the main challenges you faced]
Accomplishments: [What went well? Any metrics or quantitative results?]
What you learned: [Genuine learnings, technical and personal]
What's next: [Future plans for the project]
Additional context: [Any other details: team background, special features, design process, etc.]`;

const GITHUB_PROMPT = `You are a developer documentation expert. Generate a polished GitHub README.md for my hackathon project using the information I provide below.

Follow these rules strictly:

STRUCTURE (in this exact order):

1. PROJECT TITLE AND BADGES
- Start with: # ProjectName
- If a prize was won, add a line like: ### 🏅 [Hackathon Name] - [Prize Won]
- Add a centered block of shields.io tech stack badges using this format:
  <img src="https://img.shields.io/badge/[TECH]-[COLOR]?style=for-the-badge&logo=[LOGO]&logoColor=white" alt="[TECH]">
- Group badges by "Frontend built with:" and "Backend built with:" with <br> tags
- Use the for-the-badge style for all badges

2. HERO SECTION
- Add a centered screenshot or demo video placeholder:
  <p align="center"><img width="1728" alt="Screenshot" src="YOUR_SCREENSHOT_URL"></p>
- Below it, write 2-3 sentences describing the project's purpose and impact
- Include a key statistic or problem statement in bold

3. WHAT IT DOES
- 2-3 sentence overview
- Bullet list of key features with bold titles

4. ARCHITECTURE / HOW WE BUILT IT
- Reference an architecture diagram: ![Architecture](URL)
- List the tech stack organized by category (Frontend, Backend, AI/ML, Infrastructure)
- For each technology, briefly explain WHY it was chosen and what role it plays
- Name every API and service

5. GETTING STARTED
- Prerequisites section with required tools/versions
- Step-by-step installation:
  \`\`\`bash
  git clone https://github.com/username/repo.git
  cd repo
  npm install  # or pip install -r requirements.txt
  \`\`\`
- Environment variables section:
  \`\`\`bash
  cp .env.example .env
  # Fill in your API keys
  \`\`\`
- How to run:
  \`\`\`bash
  npm run dev
  \`\`\`

6. KEY FEATURES (if not covered above)
- Detailed feature descriptions with sub-bullets if needed

7. CHALLENGES AND LEARNINGS
- Brief section on technical challenges overcome
- Key learnings from the project

8. WHAT'S NEXT
- 3-5 concrete future plans

9. TEAM / CONTRIBUTORS
- List team members with their roles and GitHub links
- Format: **Name** - Role - [@github](https://github.com/username)

10. LICENSE
- MIT License (or as specified)

GENERAL RULES:
- Use clean, consistent markdown formatting
- Code blocks should specify the language (bash, typescript, python, etc.)
- Keep descriptions concise — this README is for developers and technical judges
- Use shields.io badges for ALL technologies in the tech stack
- Include placeholder comments like <!-- Add screenshot here --> where images should go
- Write in a professional but energetic tone
- The README should make someone want to clone the repo and try it

---

HERE IS MY PROJECT INFORMATION (replace this section with your actual details):

Project Name: [YOUR PROJECT NAME]
One-line Description: [One sentence describing what it does]
Hackathon: [HACKATHON NAME]
Prize Won: [Prize name, or "N/A"]
Tech Stack - Frontend: [e.g., Next.js, React, TypeScript, Tailwind CSS, shadcn/ui]
Tech Stack - Backend: [e.g., Python, FastAPI, Node.js]
Tech Stack - AI/ML: [e.g., GPT-4, Whisper, custom fine-tuned model]
Tech Stack - Infrastructure: [e.g., Vercel, Supabase, Firebase, AWS]
APIs Used: [e.g., Twilio, Hume, Retell, Google Maps]
Key Features: [List 3-5 main features]
Install Steps: [How to set up and run the project locally]
Environment Variables Needed: [List required env vars like OPENAI_API_KEY, etc.]
Team Members: [Names, roles, and GitHub usernames]
License: [MIT / Apache 2.0 / etc.]
Additional Context: [Architecture details, special setup, hardware requirements, etc.]`;

// Both are shared with /cheat-sheet, so the two pages cannot drift apart.
const README_AGENT_PROMPT = SHARED_README_AGENT_PROMPT;
const DEVPOST_AGENT_PROMPT = SHARED_DEVPOST_AGENT_PROMPT;

export default function SubmissionPage() {
  return (
    <SectionTemplate
      step={section.step}
      title={section.title}
      subtitle={section.subtitle}
    >
      <div className="space-y-24">
        {/* ============================================================
            THE SUBMISSION ADVANTAGE
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="The Submission Advantage"
            subtitle="Judges pick winners after you've left the room. When they can't remember a project, the Devpost, repo, and demo video are the tiebreaker."
          />

          <KeyTakeaway>Set aside 1-2 hours before the deadline for the Devpost, the README, and the demo video.</KeyTakeaway>

          <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-3">
            <Card className="glow-hover border-volt/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                    <FileText className="size-5 text-volt" />
                  </div>
                  <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                    DEVPOST
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-volt">
                  Devpost README
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* [NEEDS SPECIFIC: what judges actually looked at while deliberating, e.g. something you saw judging LA Hacks 2026. This page's main claim has no story behind it.] */}
                <p className="font-body text-sm text-foreground/80">
                  <span className="font-semibold text-foreground">For judges who missed your live demo, this is the project.</span>{" "}
                  Tell the whole story: problem, solution, tech, and what&apos;s
                  next.
                </p>
              </CardContent>
            </Card>

            <Card className="glow-hover border-spark/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-spark/10">
                    <Github className="size-5 text-spark" />
                  </div>
                  <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                    GITHUB
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-spark">
                  GitHub README
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-body text-sm text-foreground/80">
                  <span className="font-semibold text-foreground">Technical judges click through to your repo</span>{" "}
                  to see how it works.
                </p>
                <div className="rounded-lg border border-spark/10 bg-spark/5 p-3">
                  <p className="font-code text-xs text-spark/80">
                    The Devpost is for every judge and the README is for the
                    developers, so you need both.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glow-hover border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Video className="size-5 text-primary" />
                  </div>
                  <Badge className="border-primary/20 bg-primary/10 text-primary font-code text-xs">
                    VIDEO
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-primary">
                  Demo Video
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-body text-sm text-foreground/80">
                  <span className="font-semibold text-foreground">The only part of your demo that&apos;s still there at deliberation.</span>{" "}
                  If a judge has forgotten your project, the video is how they
                  see it working again.
                </p>
                <div className="rounded-lg border border-primary/10 bg-primary/5 p-3">
                  <p className="font-code text-xs text-primary/80">
                    Devpost calls the demo video{" "}
                    <a href="https://help.devpost.com/article/84-video-making-best-practices" target="_blank" rel="noopener noreferrer" className="underline decoration-primary/30 hover:decoration-primary">one of the most important elements</a>
                    {" "}of your submission.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ============================================================
            THE DEVPOST README — SECTION BY SECTION
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="The Devpost README — Section by Section"
            subtitle="Devpost gives every project the same seven sections, in this order."
          />

          <KeyTakeaway>Open every section with its most concrete line, like a number or a named sponsor API.</KeyTakeaway>

          <div className="space-y-4">
            {[
              // [CONFIRM: 82% is now cited with the source the pitching page uses ("the 2023 NENA and Carbyne survey"). lib/blog/posts/hackathon-pitch-mistakes-la-hacks.ts names it in full and also says 82%; the spoken pitch rounded to "over 80%". Check the quoted wording matches your slide.]
              // [NEEDS SOURCE: TalkTuahBank's "1.7 billion adults without access to a bank" opener was cut from this step because nothing on the site sources it. Add it back with a citation if you have one.]
              {
                step: 1,
                title: "Inspiration",
                description:
                  "Start with a number that makes the judge feel the problem. Our Dispatch AI opener (UC Berkeley AI Hackathon 2024) was \"82% of emergency call centers are understaffed,\" from the 2023 NENA and Carbyne survey.",
                tip: "Skip \"We wanted to help people.\" If you don't have a number you can source, open with a concrete scenario instead.",
                accent: "volt" as const,
              },
              {
                step: 2,
                title: "What It Does",
                description:
                  "Two or three sentences, then bullet the features. \"Users check balances, transfer funds, and pay bills using voice commands\" says something. \"An AI-powered banking solution\" doesn't.",
                tip: "The test: could a judge explain your project to another judge from this section alone?",
                accent: "spark" as const,
              },
              {
                step: 3,
                title: "How We Built It",
                description:
                  "Diagram first, then every API, framework, and service, grouped by frontend, backend, AI/ML, and infrastructure.",
                tip: "Sponsor judges want to see how you used their tech, so name it (Intel Dev Cloud, Hume, Retell) where they can't miss it.",
                accent: "primary" as const,
              },
              {
                step: 4,
                title: "Challenges We Ran Into",
                description:
                  "Name the ones that actually slowed you down. \"Integrating multiple real-time APIs with different auth patterns\" tells a judge what was hard. \"We didn't have any challenges\" reads like you didn't push.",
                accent: "success" as const,
              },
              {
                step: 5,
                title: "Accomplishments",
                description:
                  "Tie them back to the problem you opened with. On Dispatch AI, \"fine-tuned Mistral for emergency response\" answered the understaffing stat.",
                tip: "If you measured something, put the number in, like \"80% decrease in processing time\" or \"support for 6 languages.\"",
                accent: "volt" as const,
              },
              {
                step: 6,
                title: "What We Learned",
                description:
                  "Name the specific thing you learned, like \"how to design multi-agent systems\" or \"the importance of multi-layered security.\"",
                tip: "This one matters more on educational and \"best beginner\" tracks.",
                accent: "spark" as const,
              },
              {
                step: 7,
                title: "What's Next",
                description:
                  "Two to four concrete steps, like \"expand training data\" or \"partner with local emergency services for testing.\" Leave out the pie-in-the-sky stuff.",
                accent: "primary" as const,
              },
            ].map((item) => {
              const colors = {
                volt: {
                  bg: "bg-volt/10",
                  text: "text-volt",
                  border: "border-volt/20",
                },
                spark: {
                  bg: "bg-spark/10",
                  text: "text-spark",
                  border: "border-spark/20",
                },
                primary: {
                  bg: "bg-primary/10",
                  text: "text-primary",
                  border: "border-primary/20",
                },
                success: {
                  bg: "bg-success/10",
                  text: "text-success",
                  border: "border-success/20",
                },
              };
              const c = colors[item.accent];
              return (
                <div
                  key={item.step}
                  className={`rounded-xl border ${c.border} bg-card p-5 transition-all`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${c.bg} font-display text-lg font-bold ${c.text}`}
                    >
                      {item.step}
                    </span>
                    <div className="space-y-2">
                      <p
                        className={`font-display text-lg font-semibold ${c.text}`}
                      >
                        {item.title}
                      </p>
                      <p className="font-body text-sm text-foreground/80">
                        {item.description}
                      </p>
                      {item.tip && (
                        <div
                          className={`rounded-lg border ${c.border} ${c.bg} p-3`}
                        >
                          <p className="font-code text-xs text-foreground/70">
                            {item.tip}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================================
            THE GITHUB README
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="The GitHub README — Structure for Credibility"
            subtitle="Technical judges open this one. Write it for someone who wants to know how it works and how to run it."
          />

          <KeyTakeaway>Get the seven essentials into your repo README before you touch any of the extras.</KeyTakeaway>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto_1fr]">
            <Card className="glow-hover border-volt/20">
              <CardHeader>
                <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                  MUST HAVE
                </Badge>
                <CardTitle className="font-display text-2xl text-volt">
                  Essential Elements
                </CardTitle>
                <CardDescription className="font-body text-base">
                  Do these first.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    Project title + one-line description
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    Prize/award badge at the top (shields.io)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    Demo video or hero screenshot
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    Tech stack badges (React, TypeScript, Tailwind, etc.)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    Architecture diagram
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    Getting started / installation steps
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt" />
                    Key features list
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Desktop connector */}
            <div className="hidden items-center md:flex">
              <div className="flex flex-col items-center gap-2">
                <div className="h-16 w-px bg-gradient-to-b from-volt to-spark" />
                <ArrowRight className="size-6 text-spark" />
                <div className="h-16 w-px bg-gradient-to-b from-spark to-spark/0" />
                <p className="font-code text-xs text-muted-foreground [writing-mode:vertical-lr]">
                  bonus points
                </p>
              </div>
            </div>

            {/* Mobile connector */}
            <div className="flex items-center justify-center py-2 md:hidden">
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-volt to-spark" />
                <ArrowRight className="size-5 text-spark" />
                <p className="font-code text-xs text-muted-foreground">
                  bonus points
                </p>
              </div>
            </div>

            <Card className="glow-hover border-spark/20">
              <CardHeader>
                <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                  NICE TO HAVE
                </Badge>
                <CardTitle className="font-display text-2xl text-spark">
                  Bonus Elements
                </CardTitle>
                <CardDescription className="font-body text-base">
                  Worth adding if you have time, or if the project will keep
                  going after the hackathon.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 font-body text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    Contributing guide
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    Detailed API documentation
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    Environment variable reference
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    Deployment instructions
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-spark" />
                    License file
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ============================================================
            WHY THIS WORKS — THE SCIENCE (collapsible)
            ============================================================ */}
        <section className="space-y-8">
          <Disclosure
            title="Why This Works: The Science of Great Documentation"
            subtitle="Optional: the writing ideas behind this page, from newspapers to Chekhov."
            badge="Optional: the science"
            accent="primary"
          >
            <KeyTakeaway>Put the point in the first line and move the detail further down.</KeyTakeaway>

          <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-2">
            <Card className="glow-hover border-volt/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                    <Newspaper className="size-5 text-volt" />
                  </div>
                  <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                    JOURNALISM
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-volt">
                  The Inverted Pyramid
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-body text-sm text-foreground/80">
                  <span className="font-semibold text-foreground">Put the most important information first.</span>{" "}
                  Judges skim, so your first line decides whether they keep
                  reading.
                </p>
                <div className="rounded-lg border border-volt/10 bg-volt/5 p-3">
                  <p className="font-code text-xs text-volt/80">
                    Opening with &ldquo;We&apos;re a team of four students
                    who&hellip;&rdquo; spends that line on you instead of the
                    problem.
                  </p>
                </div>
                <p className="font-code text-xs text-volt/60">
                  —{" "}
                  <a href="https://en.wikipedia.org/wiki/Inverted_pyramid_(journalism)" target="_blank" rel="noopener noreferrer" className="underline decoration-volt/30 hover:decoration-volt">Inverted pyramid, in widespread newspaper use since the early 1900s</a>
                </p>
              </CardContent>
            </Card>

            <Card className="glow-hover border-spark/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-spark/10">
                    <BookOpen className="size-5 text-spark" />
                  </div>
                  <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                    JEFF BEZOS
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-spark">
                  The 6-Page Memo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <blockquote className="border-l-2 border-spark/30 pl-4 font-body text-sm italic text-foreground/80">
                  &ldquo;The reason writing a good 4 page memo is harder than
                  &lsquo;writing&rsquo; a 20 page powerpoint is because the
                  narrative structure of a good memo forces better thought and
                  better understanding of what&apos;s more important than what,
                  and how things are related.&rdquo;
                </blockquote>
                <p className="font-body text-sm text-foreground/60">
                  Bezos banned PowerPoint at Amazon in 2004 in favor of
                  narrative memos. On a Devpost, &ldquo;how things are
                  related&rdquo; is step 5: tying what you built back to the
                  problem you opened with.
                </p>
                <p className="font-code text-xs text-spark/60">
                  —{" "}
                  <a href="https://slab.com/blog/jeff-bezos-writing-management-strategy/" target="_blank" rel="noopener noreferrer" className="underline decoration-spark/30 hover:decoration-spark">Jeff Bezos, Amazon founder and CEO, email to Amazon&apos;s S-Team, June 9, 2004</a>
                </p>
              </CardContent>
            </Card>

            <Card className="glow-hover border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Scissors className="size-5 text-primary" />
                  </div>
                  <Badge className="border-primary/20 bg-primary/10 text-primary font-code text-xs">
                    GEORGE ORWELL
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-primary">
                  6 Rules for Clear Writing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <blockquote className="border-l-2 border-primary/30 pl-4 font-body text-sm italic text-foreground/80">
                  &ldquo;If it is possible to cut a word out, always cut it
                  out.&rdquo;
                </blockquote>
                <p className="font-body text-sm text-foreground/60">
                  The same essay says to use the short word over the long one
                  and the active voice over the passive.
                </p>
                <p className="font-code text-xs text-primary/60">
                  —{" "}
                  <a href="https://www.orwellfoundation.com/the-orwell-foundation/orwell/essays-and-other-works/politics-and-the-english-language/" target="_blank" rel="noopener noreferrer" className="underline decoration-primary/30 hover:decoration-primary">George Orwell, English novelist and essayist, &ldquo;Politics and the English Language,&rdquo; 1946</a>
                </p>
              </CardContent>
            </Card>

            <Card className="glow-hover border-success/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-success/10">
                    <Layers className="size-5 text-success" />
                  </div>
                  <Badge className="border-success/20 bg-success/10 text-success font-code text-xs">
                    UX PRINCIPLE
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-success">
                  Progressive Disclosure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-body text-sm text-foreground/80">
                  <span className="font-semibold text-foreground">Show essentials first, let readers drill deeper.</span>{" "}
                  Stripe&apos;s docs put the quickstart at the top and the
                  architecture further down.
                </p>
                <div className="rounded-lg border border-success/10 bg-success/5 p-3">
                  <p className="font-code text-xs text-success/80">
                    In your README: hero screenshot and one-liner first,
                    architecture and install steps after.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glow-hover border-spark/20 md:col-span-2">
              <CardContent className="space-y-4 pt-6">
                <blockquote className="border-l-2 border-spark/30 pl-4 font-body text-sm italic text-foreground/80">
                  &ldquo;In descriptions of Nature one must seize on small
                  details, grouping them so that when the reader closes his eyes
                  he gets a picture. For instance, you&apos;ll have a moonlit
                  night if you write that on the mill dam a piece of glass from a
                  broken bottle glittered like a bright little
                  star&hellip;&rdquo;
                </blockquote>
                <p className="font-code text-xs text-spark/60">
                  —{" "}
                  <a href="https://en.wikipedia.org/wiki/Show,_don%27t_tell" target="_blank" rel="noopener noreferrer" className="underline decoration-spark/30 hover:decoration-spark">Anton Chekhov, Russian playwright and short-story writer, letter to his brother Alexander, May 1886 (trans. Avrahm Yarmolinsky, The Unknown Chekhov, 1954)</a>
                </p>
                <p className="font-body text-sm text-foreground/60">
                  In a Devpost, the small detail is a screenshot or a clip of
                  the app working.
                </p>
              </CardContent>
            </Card>
          </div>
          </Disclosure>
        </section>

        {/* ============================================================
            SHOW, DON'T TELL
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Show, Don't Tell"
            subtitle="What to put in the Devpost besides text, and how much of each."
          />

          <KeyTakeaway>Add an architecture diagram, 4-6 annotated screenshots, and a 60-90 second demo video.</KeyTakeaway>

          <div className="stagger-children grid grid-cols-1 gap-5 md:grid-cols-2">
            <Card className="glow-hover border-volt/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                    <Layout className="size-5 text-volt" />
                  </div>
                  <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                    DIAGRAMS
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-volt">
                  Architecture Diagrams
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* [NEEDS SPECIFIC: the old line said every winning Devpost "in the examples above" had a diagram, but the page shows none. Which of your winning Devposts had one? Second pass: the card now points to the Dispatch AI pitch's architecture slide (lib/blog/posts/hackathon-pitch-mistakes-la-hacks.ts). Did the same diagram go on the Devpost?] */}
                <p className="font-body text-sm text-foreground/80">
                  <span className="font-semibold text-foreground">Draw the flow:</span>{" "}
                  user action → frontend → API → AI model → response. Put it at
                  the top of &ldquo;How We Built It.&rdquo; The{" "}
                  <Link href="/blog/hackathon-pitch-mistakes-la-hacks" className="underline decoration-volt/30 hover:decoration-volt">
                    architecture slide from our Dispatch AI pitch
                  </Link>{" "}
                  showed the 911 call audio pipeline, the fine-tuned model, the
                  dashboard, and where Twilio, Retell, and Hume fit in.
                </p>
                <div className="rounded-lg border border-volt/10 bg-volt/5 p-3">
                  <p className="font-code text-xs text-volt/80">
                    A diagram in Excalidraw takes about 15 minutes. Figma or a whiteboard
                    photo works too.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glow-hover border-spark/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-spark/10">
                    <Image className="size-5 text-spark" />
                  </div>
                  <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                    SCREENSHOTS
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-spark">
                  Annotated Screenshots
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* [CONFIRM: is DoggoAI yours? PLAN.md lists it among your notable projects, but the page never introduces it. If it is, tell it in first person and name the hackathon. Second pass cut the verdict "its submission was much stronger for it" because nothing backs it; put it back with what actually changed if you know.] */}
                <p className="font-body text-sm text-foreground/80">
                  <span className="font-semibold text-foreground">Label the key flows with callouts and arrows.</span>{" "}
                  Then add a design-process image, the way DoggoAI&apos;s
                  submission did: user personas, wireframes, and high-fidelity
                  mockups next to the final product.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="stagger-children grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                icon: Camera,
                title: "Recording Tools",
                descriptionNode: (
                  <>
                    <a
                      href="https://screenstudio.lemonsqueezy.com?aff=LpD9R"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-volt underline decoration-volt/30 hover:decoration-volt"
                    >
                      Screen Studio
                    </a>{" "}
                    (Mac, my pick) or CanVid (Windows). Auto-zoom and webcam
                    overlay mean editing takes minutes.
                  </>
                ),
                accent: "volt" as const,
              },
              {
                icon: Eye,
                title: "Video Length",
                descriptionNode:
                  "60-90 seconds: the main flow, once. One take is fine.",
                accent: "spark" as const,
              },
              {
                icon: FileImage,
                title: "Screenshot Count",
                descriptionNode:
                  "4-6 images: hero shot, architecture diagram, 2-3 key flows, one design-process image.",
                accent: "primary" as const,
              },
            ].map((item) => {
              const colors = {
                volt: {
                  bg: "bg-volt/10",
                  text: "text-volt",
                  border: "border-volt/20",
                },
                spark: {
                  bg: "bg-spark/10",
                  text: "text-spark",
                  border: "border-spark/20",
                },
                primary: {
                  bg: "bg-primary/10",
                  text: "text-primary",
                  border: "border-primary/20",
                },
              };
              const c = colors[item.accent];
              return (
                <div
                  key={item.title}
                  className={`glow-hover rounded-xl border ${c.border} bg-card p-5 transition-all`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${c.bg}`}
                    >
                      <item.icon className={`size-4 ${c.text}`} />
                    </div>
                    <div className="space-y-1">
                      <p className="font-display text-sm font-semibold">
                        {item.title}
                      </p>
                      <p className="font-body text-sm text-muted-foreground">
                        {item.descriptionNode}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================================
            THE DEMO VIDEO
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="The Demo Video"
            subtitle="The video goes on the Devpost with everything else. The question is when you record it."
          />

          <KeyTakeaway>If your event lets you edit the Devpost after the deadline, record the video in the gap before judging.</KeyTakeaway>

          {/* --- INSIDER TIMING TIP: the demo video does not eat your build hours --- */}
          <div className="animate-glow-pulse glass rounded-xl border border-volt/15 p-6">
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-volt/10">
                <Clock className="size-5 text-volt" />
              </div>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                    TIMING TIP
                  </Badge>
                </div>
                <h3 className="font-display text-lg font-bold tracking-tight">
                  The demo video doesn&apos;t have to come out of your coding hours
                </h3>
                {/* [NEEDS SPECIFIC: which hackathon did you first record the video in this gap?] */}
                <p className="font-body text-sm text-foreground/80">
                  At a lot of events the deadline freezes your{" "}
                  <span className="font-display font-semibold text-foreground">
                    code
                  </span>{" "}
                  but not the Devpost entry, and judging often starts 1 to 2
                  hours later. If so, lock the repo, submit, then record the
                  video and paste the YouTube link in that gap, so it
                  doesn&apos;t eat 2 hours of feature work.
                </p>
                <p className="font-body text-xs text-foreground/60">
                  Check your event&apos;s rules first. Some count any edit after
                  the deadline as a violation, or require the video link to
                  submit. In that case, record before the deadline.
                </p>
              </div>
            </div>
          </div>

          <Link href="/playbook/pitching#the-demo-video" className="group block">
            <div className="glow-hover flex items-center justify-between gap-4 rounded-xl border border-volt/30 bg-card p-5 transition-all hover:border-volt/60">
              <div className="space-y-1">
                <p className="font-display font-semibold">See two winning demo videos broken down, plus the recorder I use</p>
                <p className="font-body text-sm text-muted-foreground">On the pitching page: the TalkTuahBank and SoundSearch demos, and why they work.</p>
              </div>
              <ArrowRight className="size-5 shrink-0 text-volt transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </section>

        {/* ============================================================
            COMMON MISTAKES
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Common Mistakes"
            subtitle="A README nobody can skim, and a submission that lands a minute late."
          />

          <KeyTakeaway>Submit 30 minutes before the deadline, with a README a judge can skim.</KeyTakeaway>

          <div className="stagger-children grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                icon: MessageSquareOff,
                title: "Wall of Text",
                description:
                  "A 2,000-word README with no images is hard to skim. Add headers, and put each screenshot beside the paragraph it illustrates.",
                accent: "volt" as const,
              },
              // [NEEDS SPECIFIC: have you seen a team miss the deadline because Devpost lagged? The old line said it happens "every hackathon," which I cut.]
              {
                icon: Clock,
                title: "Late Submission",
                description:
                  "Devpost deadlines are hard cutoffs. If you hit \"submit\" at 11:59 and Devpost lags, you're out.",
                accent: "primary" as const,
              },
            ].map((item) => {
              const accentMap = {
                volt: {
                  bg: "bg-volt/10",
                  text: "text-volt",
                  border: "border-volt/20",
                },
                spark: {
                  bg: "bg-spark/10",
                  text: "text-spark",
                  border: "border-spark/20",
                },
                primary: {
                  bg: "bg-primary/10",
                  text: "text-primary",
                  border: "border-primary/20",
                },
                success: {
                  bg: "bg-success/10",
                  text: "text-success",
                  border: "border-success/20",
                },
              };
              const a = accentMap[item.accent];
              return (
                <div
                  key={item.title}
                  className={`glow-hover rounded-xl border ${a.border} bg-card p-5 transition-all`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${a.bg}`}
                    >
                      <item.icon className={`size-4 ${a.text}`} />
                    </div>
                    <div className="space-y-1">
                      <p className="font-display text-sm font-semibold">
                        {item.title}
                      </p>
                      <p className="font-body text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================================
            SUBMISSION CHECKLIST
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Submission Checklist"
            subtitle="The whole page as a list, in the order you'd do it."
          />

          <KeyTakeaway>Work this list top to bottom in the 1-2 hours you blocked off before the deadline.</KeyTakeaway>

          <Card className="glow-hover border-volt/20">
            <CardContent className="space-y-4 pt-6">
              {[
                {
                  text: "Write the Devpost README before the hackathon ends",
                  accent: "volt",
                },
                {
                  text: "Open Inspiration with a sourced number or a concrete scenario",
                  accent: "spark",
                },
                {
                  text: "Include an architecture diagram and 4-6 annotated screenshots in the submission",
                  accent: "primary",
                },
                {
                  text: "Record a 60-90 second demo video with a webcam overlay (Screen Studio or CanVid)",
                  accent: "success",
                },
                {
                  text: "Write a separate GitHub README with tech badges, install instructions, and the architecture diagram",
                  accent: "volt",
                },
                {
                  text: "Name every sponsor technology in \"How We Built It\"",
                  accent: "spark",
                },
                {
                  text: "Submit to Devpost 30 minutes before the deadline",
                  accent: "primary",
                },
                {
                  text: "Proofread once and cut every word you don't need",
                  accent: "success",
                },
              ].map((item) => {
                const colorMap: Record<string, string> = {
                  volt: "text-volt",
                  spark: "text-spark",
                  primary: "text-primary",
                  success: "text-success",
                };
                return (
                  <div
                    key={item.text}
                    className="flex items-start gap-3 rounded-lg border border-border bg-surface p-4 transition-all hover:border-volt/20"
                  >
                    <CheckCircle2
                      className={`mt-0.5 size-5 shrink-0 ${colorMap[item.accent]}`}
                    />
                    <p className="font-body text-sm text-foreground/80">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </section>

        {/* ============================================================
            AI PROMPT TEMPLATES
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="AI Prompt Templates"
            subtitle="Paste one into Claude, ChatGPT, or any AI tool, then fill in your project details at the bottom."
          />

          <KeyTakeaway>Paste messy, detailed notes into the project section, then check every number in the output against them.</KeyTakeaway>

          <div className="space-y-6">
            <Card className="border-volt/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-volt/10">
                      <Bot className="size-5 text-volt" />
                    </div>
                    <Badge className="border-volt/20 bg-volt/10 text-volt font-code text-xs">
                      DEVPOST
                    </Badge>
                  </div>
                  <CopyButton text={DEVPOST_PROMPT} />
                </div>
                <CardTitle className="font-display text-2xl text-volt">
                  Devpost README Generator
                </CardTitle>
                <CardDescription className="font-body text-base">
                  Writes all seven Devpost sections using the rules on this
                  page, and only uses numbers you give it.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    What to Paste Along With the Prompt
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Project name",
                      "Problem / inspiration",
                      "What it does",
                      "Tech stack & APIs used",
                      "Challenges faced",
                      "Key accomplishments",
                      "What you learned",
                      "Future plans",
                      "Sponsor technologies used",
                    ].map((item) => (
                      <Badge
                        key={item}
                        variant="outline"
                        className="border-volt/30 text-volt font-code text-xs"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
                <pre className="max-h-80 overflow-auto rounded-lg border border-volt/10 bg-volt/5 p-4 font-code text-xs leading-relaxed text-foreground/80">
                  {DEVPOST_PROMPT}
                </pre>
              </CardContent>
            </Card>

            <Card className="border-spark/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-spark/10">
                      <Github className="size-5 text-spark" />
                    </div>
                    <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                      GITHUB
                    </Badge>
                  </div>
                  <CopyButton text={GITHUB_PROMPT} />
                </div>
                <CardTitle className="font-display text-2xl text-spark">
                  GitHub README Generator
                </CardTitle>
                <CardDescription className="font-body text-base">
                  Writes a GitHub README with badges, architecture placeholders,
                  and install instructions.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    What to Paste Along With the Prompt
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Project name",
                      "One-line description",
                      "Tech stack",
                      "Key features",
                      "Install / setup steps",
                      "Prize won (if any)",
                      "Hackathon name",
                      "Team members",
                    ].map((item) => (
                      <Badge
                        key={item}
                        variant="outline"
                        className="border-spark/30 text-spark font-code text-xs"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
                <pre className="max-h-80 overflow-auto rounded-lg border border-spark/10 bg-spark/5 p-4 font-code text-xs leading-relaxed text-foreground/80">
                  {GITHUB_PROMPT}
                </pre>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ============================================================
            GENERATE IT WITH A SKILL
            ============================================================ */}
        <section id="generate-it-with-a-skill" className="space-y-8 scroll-mt-20">
          <SectionHeading
            title="Generate It With a Skill"
            subtitle="If you'd rather have an agent read your repo and draft both, install these two skills from the Ship-It Toolkit."
          />

          <KeyTakeaway>Install the readme-writer and devpost-writer skills to draft the GitHub README and the Devpost from your repo.</KeyTakeaway>

          <div className="space-y-5">
            {/* 1 — README */}
            <Card className="glow-hover border-success/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-success/10">
                    <Github className="size-5 text-success" />
                  </div>
                  <Badge className="border-success/20 bg-success/10 text-success font-code text-xs">
                    GITHUB WRITER SKILL
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-success">
                  1. Write Your GitHub README
                </CardTitle>
                <CardDescription className="font-body text-base">
                  Reads your repo, asks for what it can&apos;t find, and writes
                  the README (hero, badges, demo video, architecture diagram,
                  team cards) plus the repo&apos;s About section. It won&apos;t
                  invent awards or stats.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-xl border border-success/20 bg-success/5 p-4">
                  <div className="float-right ml-3 mb-2">
                    <CopyButton text={README_AGENT_PROMPT} />
                  </div>
                  <pre className="whitespace-pre-wrap break-words font-code text-xs leading-relaxed text-foreground/80">{README_AGENT_PROMPT}</pre>
                </div>
                <Link
                  href="/non-coders/skills/readme-writer"
                  className="inline-flex items-center gap-2 font-code text-xs text-success transition-colors hover:text-success/80"
                >
                  See the full GitHub Writer skill
                  <ArrowRight className="size-3.5" />
                </Link>
              </CardContent>
            </Card>

            {/* 2 — Devpost */}
            <Card className="glow-hover border-spark/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-spark/10">
                    <Megaphone className="size-5 text-spark" />
                  </div>
                  <Badge className="border-spark/20 bg-spark/10 text-spark font-code text-xs">
                    DEVPOST WRITER SKILL
                  </Badge>
                </div>
                <CardTitle className="font-display text-xl text-spark">
                  2. Write Your Devpost
                </CardTitle>
                <CardDescription className="font-body text-base">
                  Reads your repo and writes the Devpost section by section,
                  plus the Built With tags and Try it out links. It won&apos;t
                  invent awards, stats, or challenges.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl border border-spark/20 bg-spark/5 p-4">
                  <div className="float-right ml-3 mb-2">
                    <CopyButton text={DEVPOST_AGENT_PROMPT} />
                  </div>
                  <pre className="whitespace-pre-wrap break-words font-code text-xs leading-relaxed text-foreground/80">{DEVPOST_AGENT_PROMPT}</pre>
                </div>
              </CardContent>
            </Card>
          </div>

          <Link href="/playbook/post-hackathon#the-ship-it-toolkit" className="group block">
            <div className="glow-hover flex items-center justify-between gap-4 rounded-xl border border-primary/30 bg-card p-5 transition-all hover:border-primary/60">
              <div className="space-y-1">
                <p className="font-display font-semibold">Building your portfolio site or YouTube description too?</p>
                <p className="font-body text-sm text-muted-foreground">The full Ship-It Toolkit, plus a single prompt that generates all four deliverables, is on the post-hackathon page.</p>
              </div>
              <ArrowRight className="size-5 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </section>
      </div>
    </SectionTemplate>
  );
}
