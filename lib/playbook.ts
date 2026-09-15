export const PLAYBOOK_SECTIONS = [
  {
    step: 1,
    updated: "2026-09-14",
    slug: "team-formation",
    title: "Team Formation",
    subtitle:
      "Pick teammates who cover four roles, and build a steady squad if you want to keep winning.",
  },
  {
    step: 2,
    updated: "2026-09-14",
    slug: "ideation",
    title: "Ideation",
    subtitle:
      "Combine tools and problems you already know into an idea you can build in time.",
  },
  {
    step: 3,
    updated: "2026-09-14",
    slug: "validation",
    title: "Validation",
    subtitle:
      "Test the riskiest part of your idea early, and prep your stack if you're competing to win.",
  },
  {
    step: 4,
    updated: "2026-09-14",
    slug: "execution",
    title: "Execution",
    subtitle:
      "How to spend your hours so you finish with a working demo.",
  },
  {
    step: 5,
    updated: "2026-09-14",
    slug: "pitching",
    title: "Pitching",
    subtitle:
      "Build your pitch around the demo, and get ready for judge questions.",
  },
  {
    step: 6,
    updated: "2026-09-14",
    slug: "submission",
    title: "Submission",
    subtitle:
      "What to put in your Devpost, README, and demo video, and when to submit.",
  },
  {
    step: 7,
    updated: "2026-09-14",
    slug: "post-hackathon",
    title: "Post-Hackathon",
    subtitle:
      "Post your project and follow up with people you met, so it keeps helping you after judging.",
  },
] as const;

export type PlaybookSection = (typeof PLAYBOOK_SECTIONS)[number];
