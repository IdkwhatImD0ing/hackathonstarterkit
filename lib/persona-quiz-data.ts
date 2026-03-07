export type Persona = "designer" | "pitcher" | "architect" | "strategist";

export interface QuizQuestion {
  id: string;
  scenario: string;
  options: {
    text: string;
    persona: Persona;
  }[];
}

export interface PersonaResult {
  id: Persona;
  name: string;
  tagline: string;
  description: string;
  strengths: string[];
  weakness: string;
  bestMatch: Persona;
  analogy: string;
}

export const PERSONA_RESULTS: Record<Persona, PersonaResult> = {
  designer: {
    id: "designer",
    name: "The Designer",
    tagline: "You turn chaos into clarity",
    description:
      "You see what others miss, the spacing, the flow, the feeling. In a sea of terminal-output demos, your instinct for polish is what makes a project feel real. You create first impressions that win before the pitch even starts.",
    strengths: [
      "Visual Storytelling",
      "User Empathy",
      "Detail-Oriented",
      "Creative Problem Solving",
      "Rapid Prototyping",
    ],
    weakness: "Perfectionism under time pressure, learning when 'good enough' ships",
    bestMatch: "architect",
    analogy: "The cinematographer, you define how the world sees the project",
  },
  pitcher: {
    id: "pitcher",
    name: "The Pitcher",
    tagline: "You make people believe",
    description:
      "You have the rare ability to translate technical complexity into compelling narrative. When the demo crashes or the judge looks skeptical, you don't flinch, you adapt. Every hackathon win starts with someone who can sell the vision.",
    strengths: [
      "Public Speaking",
      "Improvisation",
      "Persuasion",
      "Composure Under Pressure",
      "Audience Reading",
    ],
    weakness: "May over-promise features that aren't built yet",
    bestMatch: "designer",
    analogy: "The trial lawyer, you make the case and handle cross-examination",
  },
  architect: {
    id: "architect",
    name: "The Architect",
    tagline: "You see the whole board",
    description:
      "While others go deep on features, you ensure everything connects. API to frontend, ML model to UI, auth to database, you're the technical glue. The #1 killer of hackathon projects is integration failure, and you're the cure.",
    strengths: [
      "Systems Thinking",
      "Full-Stack Awareness",
      "Integration Design",
      "Pragmatic Trade-offs",
      "Debugging Under Pressure",
    ],
    weakness: "Over-engineering for a 48-hour sprint, building for scale when you need to build for demo",
    bestMatch: "strategist",
    analogy: "The city planner, you design how everything connects and flows",
  },
  strategist: {
    id: "strategist",
    name: "The Strategist",
    tagline: "You turn a team into a machine",
    description:
      "You're the one who says 'no' to feature creep at 3AM, runs the check-ins that keep everyone aligned, and makes the hard calls on what to cut. Under extreme time pressure, your decisiveness and scope discipline are what separate a working demo from an unfinished mess.",
    strengths: [
      "Decision Making",
      "Time Management",
      "Scope Discipline",
      "Team Communication",
      "Prioritization",
    ],
    weakness: "Over-planning and rigidity, sometimes the process needs to flex",
    bestMatch: "pitcher",
    analogy: "The film producer, you own the schedule, the scope, and the ship date",
  },
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    scenario: "It's 2AM and the frontend and backend won't talk to each other. You...",
    options: [
      { text: "Sketch a simpler UI flow so the demo still looks polished even with less data", persona: "designer" },
      { text: "Start planning what to say if the demo is half-broken, judges won't know what's missing", persona: "pitcher" },
      { text: "Dive into the API layer and debug the data flow until it connects", persona: "architect" },
      { text: "Call a quick standup, assess what's salvageable, and re-scope the MVP", persona: "strategist" },
    ],
  },
  {
    id: "q2",
    scenario: "30 minutes before judging starts. You...",
    options: [
      { text: "Do a final polish pass, fix that button alignment and tweak the color scheme", persona: "designer" },
      { text: "Run through the pitch one more time and prep answers for likely judge questions", persona: "pitcher" },
      { text: "Make sure the demo path works end-to-end with no crashes", persona: "architect" },
      { text: "Write the submission description and make sure every requirement is checked off", persona: "strategist" },
    ],
  },
  {
    id: "q3",
    scenario: "A teammate wants to add a cool new feature with 4 hours left. You...",
    options: [
      { text: "Get excited, if it looks impressive in the demo, it's worth the risk", persona: "designer" },
      { text: "Think about whether it makes the pitch story stronger or just adds noise", persona: "pitcher" },
      { text: "Evaluate the technical complexity, will it break existing integrations?", persona: "architect" },
      { text: "Ask: 'What do we cut to make room for this?', no free features", persona: "strategist" },
    ],
  },
  {
    id: "q4",
    scenario: "Someone at the event asks 'What does your project do?' You...",
    options: [
      { text: "Pull up the app and show them, the interface speaks for itself", persona: "designer" },
      { text: "Give them the 30-second elevator pitch you've been rehearsing in your head", persona: "pitcher" },
      { text: "Explain the architecture, how the pieces fit together is the impressive part", persona: "architect" },
      { text: "Start with the problem it solves and why it matters to the target user", persona: "strategist" },
    ],
  },
  {
    id: "q5",
    scenario: "Before the hackathon, you spend your prep time...",
    options: [
      { text: "Building a component library and design system you can deploy fast", persona: "designer" },
      { text: "Studying past winning pitches and practicing storytelling frameworks", persona: "pitcher" },
      { text: "Setting up boilerplate repos, CI/CD, and testing your API integrations", persona: "architect" },
      { text: "Researching sponsor prizes, judging criteria, and planning the team's strategy", persona: "strategist" },
    ],
  },
  {
    id: "q6",
    scenario: "The demo crashes mid-presentation to judges. You...",
    options: [
      { text: "Switch to the Figma mockups, at least the design vision is clear", persona: "designer" },
      { text: "Smoothly pivot: 'Let me walk you through what you would have seen...'", persona: "pitcher" },
      { text: "Quickly diagnose the issue, you might be able to fix it live", persona: "architect" },
      { text: "Redirect to the backup plan you prepared for exactly this scenario", persona: "strategist" },
    ],
  },
  {
    id: "q7",
    scenario: "Your team is debating which tech stack to use. You...",
    options: [
      { text: "Push for whatever lets you build the best-looking frontend fastest", persona: "designer" },
      { text: "Don't care about the stack, care about what's easiest to demo and explain", persona: "pitcher" },
      { text: "Evaluate trade-offs: what integrates best, what the team knows, what scales", persona: "architect" },
      { text: "Time-box the debate to 10 minutes, pick something and move on", persona: "strategist" },
    ],
  },
  {
    id: "q8",
    scenario: "Your hackathon teammates would describe you as...",
    options: [
      { text: "The one who makes everything look 10x better than it should for a hackathon", persona: "designer" },
      { text: "The one who somehow convinced the judges we were the best", persona: "pitcher" },
      { text: "The one who held the entire codebase together with duct tape and genius", persona: "architect" },
      { text: "The one who kept us focused and shipping when we wanted to add 'one more thing'", persona: "strategist" },
    ],
  },
];

export function calculateResult(answers: Persona[]): {
  primary: Persona;
  secondary: Persona | null;
  scores: Record<Persona, number>;
} {
  const scores: Record<Persona, number> = {
    designer: 0,
    pitcher: 0,
    architect: 0,
    strategist: 0,
  };

  for (const answer of answers) {
    scores[answer]++;
  }

  const sorted = (Object.entries(scores) as [Persona, number][]).sort(
    (a, b) => b[1] - a[1]
  );

  return {
    primary: sorted[0][0],
    secondary: sorted[1][1] > 0 ? sorted[1][0] : null,
    scores,
  };
}
