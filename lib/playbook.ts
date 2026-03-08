export const PLAYBOOK_SECTIONS = [
  {
    step: 1,
    slug: "team-formation",
    title: "Team Formation",
    subtitle:
      "Find the right people, define roles, and create a winning team dynamic.",
  },
  {
    step: 2,
    slug: "ideation",
    title: "Ideation",
    subtitle:
      "Brainstorm, evaluate, and select ideas that judges love and you can actually build.",
  },
  {
    step: 3,
    slug: "validation",
    title: "Validation",
    subtitle:
      "Validate your idea quickly against real constraints and judging criteria.",
  },
  {
    step: 4,
    slug: "execution",
    title: "Execution",
    subtitle:
      "Time management, tech stack selection, MVP strategy, and team coordination.",
  },
  {
    step: 5,
    slug: "pitching",
    title: "Pitching",
    subtitle:
      "Craft a pitch that wins judges over in the first 30 seconds.",
  },
  {
    step: 6,
    slug: "submission",
    title: "Submission",
    subtitle:
      "Write READMEs, record demos, and submit deliverables that make judges remember you.",
  },
  {
    step: 7,
    slug: "post-hackathon",
    title: "Post-Hackathon",
    subtitle:
      "Share your work, follow up with contacts, and turn weekend projects into career-changing portfolio pieces.",
  },
] as const;

export type PlaybookSection = (typeof PLAYBOOK_SECTIONS)[number];
