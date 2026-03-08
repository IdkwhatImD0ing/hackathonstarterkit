import type { Metadata } from "next";
import {
  FileText,
  Github,
  Video,
  Quote,
  Newspaper,
  Pen,
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
  Search,
  FileImage,
  CheckCircle2,
  Sparkles,
  Shield,
  Bot,
} from "lucide-react";
import { SectionTemplate } from "@/components/section-template";
import { CopyButton } from "@/components/copy-button";
import { PLAYBOOK_SECTIONS } from "@/lib/playbook";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const section = PLAYBOOK_SECTIONS[5];

export const metadata: Metadata = {
  title: section.title,
  description: section.subtitle,
  openGraph: { title: section.title, description: section.subtitle },
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
- Open with a striking statistic, vivid scenario, or concrete number that makes the reader feel the problem BEFORE describing any solution
- Use bold markdown for key stats (e.g., **82% of call centers are understaffed**)
- Do NOT start with "We wanted to..." or "Our team decided to..." — lead with the problem, not yourself
- 2-3 short paragraphs maximum. Make every sentence earn its place.

WHAT IT DOES SECTION:
- Start with 2-3 sentences summarizing the product from the user's perspective
- Then list 3-5 key features as bullet points with bold titles
- Be concrete and specific: "Users check balances, transfer funds, and pay bills using voice commands" NOT "An AI-powered solution"
- If relevant, mention the core user flow

HOW WE BUILT IT SECTION:
- Group technologies by category: Frontend, Backend, AI/ML, Infrastructure, APIs
- Name EVERY API, framework, library, and service used — especially sponsor technologies
- Describe the architecture briefly (e.g., "User speaks → Twilio captures audio → GPT-4 processes → response streamed back")
- If there's a system design or architecture image, reference it with ![Architecture](URL)
- Mention any custom datasets, fine-tuned models, or novel technical approaches

CHALLENGES WE RAN INTO SECTION:
- List 3-5 real, specific challenges — NOT generic ones
- Be honest. "Integrating multiple real-time APIs with different auth patterns" is good. "Time management" is lazy.
- Briefly mention how you overcame each challenge or what you learned from it

ACCOMPLISHMENTS THAT WE'RE PROUD OF SECTION:
- Tie accomplishments back to the original problem statement
- Include quantitative results where possible (e.g., "80% reduction in inference time", "supports 6 languages")
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
- Total length: 800-1500 words. Comprehensive but not bloated.

---

HERE IS MY PROJECT INFORMATION (replace this section with your actual details):

Project Name: [YOUR PROJECT NAME]
Hackathon: [HACKATHON NAME]
Problem/Inspiration: [Describe the problem you're solving and why it matters]
What it does: [Describe what your project does from the user's perspective]
Tech stack: [List all technologies, APIs, frameworks, and services used]
Sponsor technologies: [List any sponsor APIs or tools you used — these are critical]
Challenges: [List the main challenges you faced]
Accomplishments: [What went well? Any metrics or quantitative results?]
What you learned: [Genuine learnings — technical and personal]
What's next: [Future plans for the project]
Additional context: [Any other details — team background, special features, design process, etc.]`;

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
            subtitle="Your submission is the artifact that outlives your pitch. Judges deliberate without you — your Devpost, README, and demo video speak on your behalf."
          />

          <p className="font-body text-foreground/80">
            Most teams treat the submission as an afterthought, something to
            rush through in the last 30 minutes. Winning teams treat it as a{" "}
            <span className="font-display font-semibold text-foreground">
              first-class deliverable
            </span>
            . Your Devpost README, GitHub repo, and demo video are what judges
            reference during deliberation. If they can&apos;t remember your
            project, your submission is the tiebreaker.
          </p>

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
                <p className="font-body text-sm text-foreground/80">
                  The narrative that frames your project for every judge,
                  including those who never saw your live demo. This is the
                  document most judges read during deliberation. It needs to tell
                  the full story: problem, solution, tech, and vision.
                </p>
                <div className="rounded-lg border border-volt/10 bg-volt/5 p-3">
                  <p className="font-code text-xs text-volt/80">
                    Most hackathon winners allocate 1-2 hours specifically for
                    writing this. It&apos;s not an afterthought.
                  </p>
                </div>
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
                  The technical credibility signal that proves you built
                  something real. Technical judges will click your repo link.
                  Clean code, good structure, and a proper README with
                  architecture diagrams separate serious teams from weekend
                  projects.
                </p>
                <div className="rounded-lg border border-spark/10 bg-spark/5 p-3">
                  <p className="font-code text-xs text-spark/80">
                    The GitHub README is for developers. The Devpost is for
                    everyone. Write both.
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
                  The visual proof that persists into deliberation. When judges
                  forget your project (which happens more than you&apos;d
                  expect), your demo video is the reminder. Nothing beats seeing
                  the product actually work.
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

          <div className="animate-glow-pulse glass rounded-xl border border-volt/10 p-6">
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-volt/10">
                <Pen className="size-5 text-volt" />
              </div>
              <div className="space-y-1">
                <p className="font-display font-semibold">
                  <a href="https://tom.preston-werner.com/2010/08/23/readme-driven-development" target="_blank" rel="noopener noreferrer" className="underline decoration-volt/30 hover:decoration-volt">Tom Preston-Werner</a> — GitHub Co-founder
                </p>
                <blockquote className="font-body text-sm italic text-foreground/80">
                  &ldquo;Until you&apos;ve written about your software, you have
                  no idea what you&apos;ll be coding.&rdquo;
                </blockquote>
                <p className="font-body text-sm text-foreground/60">
                  Writing the README forces you to understand what you actually
                  built. The act of documenting is the act of clarifying: for
                  yourself and for judges.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            THE DEVPOST README — SECTION BY SECTION
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="The Devpost README — Section by Section"
            subtitle="Every Devpost submission follows the same template. Here's how to write each section so judges remember your project during deliberation."
          />

          <div className="space-y-4">
            {[
              {
                step: 1,
                title: "Inspiration",
                description:
                  "Lead with a striking stat or scenario that makes judges feel the problem. \"82% of emergency call centers are understaffed.\" \"Over 5 million children are hospitalized every year.\" \"1.7 billion adults worldwide remain unbanked.\" Make them care before you describe your solution.",
                tip: "Avoid vague openers like \"We wanted to help people.\" Concrete numbers and vivid scenarios stick in judges' minds during deliberation.",
                accent: "volt" as const,
              },
              {
                step: 2,
                title: "What It Does",
                description:
                  "2-3 sentences max, then bullet the key features. Be concrete and specific: \"Users check balances, transfer funds, and pay bills using voice commands\" beats \"An AI-powered banking solution.\"",
                tip: "Name the user. Name the action. Name the outcome. Judges should be able to repeat your pitch to another judge from this section alone.",
                accent: "spark" as const,
              },
              {
                step: 3,
                title: "How We Built It",
                description:
                  "Architecture diagram first, then a bullet list naming every API, framework, and service. Include a system design image; one visual explains what 500 words cannot. Group by Frontend, Backend, AI/ML, and Infrastructure.",
                tip: "Name-drop sponsor technologies prominently. If you used Intel Dev Cloud, Hume, Retell, or any sponsor API, make it impossible to miss.",
                accent: "primary" as const,
              },
              {
                step: 4,
                title: "Challenges We Ran Into",
                description:
                  "Be honest. \"Integrating multiple APIs seamlessly\" and \"Fine-tuning the model to handle edge cases\" are relatable. Saying \"We didn't have any challenges\" is a red flag that suggests you didn't push hard enough.",
                tip: "Challenges show maturity. Judges want to see that you faced real problems and solved them, not that everything went perfectly.",
                accent: "success" as const,
              },
              {
                step: 5,
                title: "Accomplishments",
                description:
                  "What went right. Tie accomplishments back to the original problem: \"Successfully fine-tuned Mistral for emergency response scenarios\" connects to the 82% understaffing stat. Make the loop from problem to proof.",
                tip: "Include quantitative wins: \"80% decrease in processing time,\" \"multi-language support in 6 languages,\" \"functional prototype in 18 hours.\"",
                accent: "volt" as const,
              },
              {
                step: 6,
                title: "What We Learned",
                description:
                  "Growth signal. Judges want to see you're reflective, not just productive. \"How to design multidimensional agentic systems\" and \"The importance of multi-layered security\" show depth of understanding beyond the code.",
                tip: "This section is especially important for educational and \"best beginner\" tracks. It proves the hackathon taught you something.",
                accent: "spark" as const,
              },
              {
                step: 7,
                title: "What's Next",
                description:
                  "Future vision that shows the idea has legs beyond the weekend. \"Expand training data,\" \"Partner with local emergency services for real-world testing,\" \"Mobile app integration.\" Show judges this isn't a throwaway project.",
                tip: "2-4 concrete next steps. Avoid pie-in-the-sky claims; judges can tell the difference between ambition and delusion.",
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
                      <div
                        className={`rounded-lg border ${c.border} ${c.bg} p-3`}
                      >
                        <p className="font-code text-xs text-foreground/70">
                          {item.tip}
                        </p>
                      </div>
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
            subtitle="Technical judges will click your repo link. A clean GitHub README with architecture diagrams and install instructions separates serious teams from weekend projects."
          />

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
                  Every winning GitHub README includes these. No exceptions.
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
                <div className="rounded-lg bg-volt/5 p-3 text-center">
                  <p className="font-display text-lg font-bold text-volt">
                    Non-negotiable
                  </p>
                  <p className="font-code text-xs text-volt/70">
                    these make or break technical credibility
                  </p>
                </div>
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
                  Extra polish that signals you care about quality beyond the
                  hackathon.
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
                <div className="rounded-lg bg-spark/5 p-3 text-center">
                  <p className="font-display text-lg font-bold text-spark">
                    Extra credit
                  </p>
                  <p className="font-code text-xs text-spark/70">
                    separates good from great
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="font-body text-sm text-muted-foreground">
              <span className="font-display font-semibold text-foreground">
                Remember:
              </span>{" "}
              The GitHub README is for developers and technical judges. The
              Devpost is for everyone. They serve different audiences; write
              both, and tailor each to its reader.
            </p>
          </div>
        </section>

        {/* ============================================================
            WHY THIS WORKS — THE SCIENCE
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Why This Works — The Science of Great Documentation"
            subtitle="The best hackathon submissions follow the same principles that make great journalism, great memos, and great products memorable."
          />

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
                  Journalism&apos;s most fundamental structure: put the most
                  important information first. Judges skim, so your opening line
                  determines whether they keep reading or move on to the next
                  project.
                </p>
                <div className="rounded-lg border border-volt/10 bg-volt/5 p-3">
                  <p className="font-code text-xs text-volt/80">
                    Lead with impact, not backstory. &ldquo;82% of call centers
                    are understaffed&rdquo; hooks instantly.
                    &ldquo;We&apos;re a team of four students
                    who&hellip;&rdquo; does not.
                  </p>
                </div>
                <p className="font-code text-xs text-volt/60">
                  —{" "}
                  <a href="https://en.wikipedia.org/wiki/Inverted_pyramid_(journalism)" target="_blank" rel="noopener noreferrer" className="underline decoration-volt/30 hover:decoration-volt">Associated Press style, standardized 1953</a>
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
                  &ldquo;The narrative structure of a good memo forces better
                  thought and better understanding of what&apos;s more important
                  than what.&rdquo;
                </blockquote>
                <p className="font-body text-sm text-foreground/60">
                  Bezos banned PowerPoint at Amazon in favor of structured
                  narrative memos. The same principle applies to your Devpost:
                  writing a coherent story forces you to understand what you
                  actually built and why it matters.
                </p>
                <p className="font-code text-xs text-spark/60">
                  —{" "}
                  <a href="https://www.aboutamazon.com/news/company-news/2017-letter-to-shareholders" target="_blank" rel="noopener noreferrer" className="underline decoration-spark/30 hover:decoration-spark">Jeff Bezos, Amazon shareholder letter</a>
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
                  Orwell&apos;s 1946 rules for clear prose apply perfectly to
                  hackathon submissions: never use a long word where a short one
                  will do, never use the passive where you can use the active,
                  and break any of these rules sooner than say anything
                  barbarous.
                </p>
                <p className="font-code text-xs text-primary/60">
                  —{" "}
                  <a href="https://www.orwellfoundation.com/the-orwell-foundation/orwell/essays-and-other-works/politics-and-the-english-language/" target="_blank" rel="noopener noreferrer" className="underline decoration-primary/30 hover:decoration-primary">Politics and the English Language, 1946</a>
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
                  Show the essential information first, then let readers drill
                  deeper if they want. Stripe&apos;s documentation, widely
                  regarded as the gold standard, follows this principle:
                  quickstart at the top, architecture details further down.
                </p>
                <div className="rounded-lg border border-success/10 bg-success/5 p-3">
                  <p className="font-code text-xs text-success/80">
                    Apply to your README: hero screenshot and one-liner first.
                    Architecture and install instructions for those who want
                    depth.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ============================================================
            SHOW, DON'T TELL
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Show, Don't Tell"
            subtitle="A screenshot is worth a thousand words. An architecture diagram is worth a thousand meetings. A demo video is worth a thousand Devpost entries."
          />

          <Card className="glow-hover border-spark/20">
            <CardContent className="space-y-4 pt-6">
              <blockquote className="border-l-2 border-spark/30 pl-4 font-body text-sm italic text-foreground/80">
                &ldquo;Don&apos;t tell me the moon is shining; show me the glint
                of light on broken glass.&rdquo;
              </blockquote>
              <p className="font-code text-xs text-spark/60">
                —{" "}
                <a href="https://en.wikipedia.org/wiki/Show,_don%27t_tell" target="_blank" rel="noopener noreferrer" className="underline decoration-spark/30 hover:decoration-spark">Anton Chekhov, letter to his brother, 1886</a>
              </p>
              <p className="font-body text-sm text-foreground/60">
                Chekhov&apos;s principle for fiction applies perfectly to
                hackathon submissions. Don&apos;t describe your
                app; show it. Don&apos;t explain your architecture; diagram
                it. Don&apos;t claim it works; record it working.
              </p>
            </CardContent>
          </Card>

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
                <p className="font-body text-sm text-foreground/80">
                  One system design image explains what 500 words of
                  &ldquo;How We Built It&rdquo; text cannot. Show the flow:
                  user action → frontend → API → AI model → response. Use
                  Excalidraw, Figma, or even a whiteboard photo.
                </p>
                <div className="rounded-lg border border-volt/10 bg-volt/5 p-3">
                  <p className="font-code text-xs text-volt/80">
                    Every winning Devpost in the examples above included an
                    architecture diagram. It&apos;s not optional.
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
                <p className="font-body text-sm text-foreground/80">
                  4-6 annotated screenshots of key flows. Not raw screen
                  captures; add callouts, arrows, and labels that guide the
                  reader through the experience. The DoggoAI submission included
                  design process images that dramatically elevated it.
                </p>
                <div className="rounded-lg border border-spark/10 bg-spark/5 p-3">
                  <p className="font-code text-xs text-spark/80">
                    Include: user personas, wireframes, high-fidelity mockups,
                    and the final product side-by-side. Show the journey.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="stagger-children grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                icon: Camera,
                title: "Recording Tools",
                description:
                  "Screen Studio (Mac) or CanVid (Windows). Auto-zoom, instant effects, webcam overlay. Minutes, not hours.",
                accent: "volt" as const,
              },
              {
                icon: Eye,
                title: "Video Length",
                description:
                  "60-90 seconds. Long enough to show the flow, short enough to hold attention. One take is fine; authenticity beats polish.",
                accent: "spark" as const,
              },
              {
                icon: FileImage,
                title: "Screenshot Count",
                description:
                  "4-6 annotated images. Hero shot, architecture diagram, 2-3 key flow screenshots, and one design process image.",
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
            COMMON MISTAKES
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Common Mistakes"
            subtitle="These six submission mistakes kill otherwise strong projects. Avoid them and you're already ahead of 80% of teams."
          />

          <div className="stagger-children grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Video,
                title: "No Demo Video",
                description:
                  "Instant disadvantage. Judges can't remember what they can't see. A 60-second recording is the highest-ROI activity of your hackathon.",
                accent: "spark" as const,
              },
              {
                icon: MessageSquareOff,
                title: "Wall of Text",
                description:
                  "Nobody reads a 2000-word README with no images. Break it up with screenshots, diagrams, and headers. If a judge has to scroll to find the point, you've lost them.",
                accent: "volt" as const,
              },
              {
                icon: Search,
                title: "Vague Inspiration",
                description:
                  "\"We wanted to help people\" vs \"82% of call centers are understaffed.\" The second makes judges care. The first makes them yawn.",
                accent: "primary" as const,
              },
              {
                icon: Shield,
                title: "Missing Tech Details",
                description:
                  "Judges, especially sponsor judges, want to know HOW you built it, not just WHAT. Name every API, framework, and service. Include the architecture diagram.",
                accent: "success" as const,
              },
              {
                icon: Layout,
                title: "No Architecture Diagram",
                description:
                  "Makes the project feel unplanned and thrown together. One Excalidraw diagram takes 15 minutes and completely changes the perception of technical depth.",
                accent: "volt" as const,
              },
              {
                icon: Clock,
                title: "Late Submission",
                description:
                  "Devpost deadlines are hard cutoffs. Submit 30 minutes early. Teams lose every hackathon because they hit \"submit\" at 11:59 and Devpost lagged.",
                accent: "spark" as const,
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
            GOLDEN RULE — BEZOS QUOTE
            ============================================================ */}
        <section className="space-y-8">
          <div className="animate-glow-pulse glass rounded-2xl border border-primary/10 p-8 md:p-12">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <Quote className="mx-auto size-10 text-spark/40" />
              <blockquote className="font-display text-2xl font-bold italic tracking-tight md:text-4xl">
                &ldquo;The narrative structure of a good memo forces{" "}
                <span className="animate-shimmer">better thought</span> and
                better understanding of what&apos;s more important than
                what.&rdquo;
              </blockquote>
              <p className="font-body text-sm text-muted-foreground">
                —{" "}
                <a href="https://www.aboutamazon.com/news/company-news/2017-letter-to-shareholders" target="_blank" rel="noopener noreferrer" className="underline decoration-primary/30 hover:decoration-primary">Jeff Bezos, Amazon shareholder letter, 2017</a>
              </p>
              <Separator className="mx-auto max-w-xs bg-primary/20" />
              <div className="space-y-4 text-left">
                <p className="font-body text-foreground/80">
                  <span className="font-display font-semibold text-foreground">
                    Your submission isn&apos;t an afterthought; it&apos;s the
                    document that represents your project when you&apos;re not
                    in the room.
                  </span>{" "}
                  The teams that write great Devpost READMEs aren&apos;t adding
                  fluff. They&apos;re forcing themselves to understand what they
                  actually built, why it matters, and how to make someone else
                  care.
                </p>
                <p className="font-body text-foreground/80">
                  Every section of your submission is an act of clarity. The
                  Inspiration section forces you to articulate the problem. The
                  &ldquo;How We Built It&rdquo; section forces you to understand
                  your own architecture. The &ldquo;What&apos;s Next&rdquo;
                  section forces you to think beyond the weekend.
                </p>
                <p className="font-body text-foreground/80">
                  <span className="font-display font-semibold text-foreground">
                    The best submission doesn&apos;t describe the project; it
                    makes the reader wish they had built it.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SUBMISSION CHECKLIST
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="Submission Checklist"
            subtitle="A step-by-step summary for crafting your submission. Allocate 1-2 hours before the deadline — this is not optional."
          />

          <Card className="glow-hover border-volt/20">
            <CardContent className="space-y-4 pt-6">
              {[
                {
                  text: "Write the Devpost README BEFORE the hackathon ends. Allocate 1-2 dedicated hours.",
                  accent: "volt",
                },
                {
                  text: "Lead Inspiration with a striking stat or scenario, not \"we wanted to help people\"",
                  accent: "spark",
                },
                {
                  text: "Include an architecture diagram and 4-6 annotated screenshots in the submission",
                  accent: "primary",
                },
                {
                  text: "Record a 60-90 second demo video with Screen Studio or CanVid, with webcam overlay for personality",
                  accent: "success",
                },
                {
                  text: "Write a separate GitHub README with tech badges, install instructions, and the architecture diagram",
                  accent: "volt",
                },
                {
                  text: "Name-drop every sponsor technology prominently in \"How We Built It\"; make it impossible to miss",
                  accent: "spark",
                },
                {
                  text: "Submit to Devpost 30 minutes before the deadline; never cut it close",
                  accent: "primary",
                },
                {
                  text: "Proofread once for Orwell: cut every word that doesn't earn its place",
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

          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="font-body text-sm text-muted-foreground">
              <span className="font-display font-semibold text-foreground">
                Remember:
              </span>{" "}
              Judges deliberate without you in the room. Your Devpost README,
              demo video, and GitHub repo are your advocates. Make them count.
              They&apos;re the difference between &ldquo;I think that project
              was good&rdquo; and &ldquo;I remember exactly why we should pick
              that one.&rdquo;
            </p>
          </div>
        </section>

        {/* ============================================================
            AI PROMPT TEMPLATES
            ============================================================ */}
        <section className="space-y-8">
          <SectionHeading
            title="AI Prompt Templates"
            subtitle="Copy these prompts into Claude, ChatGPT, or any AI tool along with your project details. They're designed to generate submission-ready READMEs that follow every principle on this page."
          />

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
                  Generates a complete Devpost submission following the winning
                  patterns from this page. Paste the prompt below into any AI
                  tool, then add your project details where indicated.
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
                  Generates a polished GitHub README with badges, architecture
                  placeholders, and install instructions. Paste into any AI tool
                  with your project details.
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

          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="font-body text-sm text-muted-foreground">
              <span className="font-display font-semibold text-foreground">
                Pro tip:
              </span>{" "}
              These prompts work best when you give them raw, detailed input,
              even messy bullet points. The AI will structure it. After
              generating, proofread with Orwell&apos;s rule: cut every word that
              doesn&apos;t earn its place.
            </p>
          </div>
        </section>
      </div>
    </SectionTemplate>
  );
}
