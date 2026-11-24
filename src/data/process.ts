/** The project workflow followed on every Teravex Digital project. */
export const projectSteps: string[] = [
  "We learn what you need",
  "Plan the work & set dates",
  "Choose the best way to build it",
  "Design your website or app",
  "Build it with our team",
  "Double-check every detail",
  "Test & fix any problems",
  "Final quality check",
  "Put it live online",
  "Show you the finished work",
  "Follow-up & help",
  "Updates & security",
  "Domain & hosting reminders",
];

export const regularWork: string[] = ["Social media posts & ads", "Weekly updates for you"];

/**
 * How many of `projectSteps` belong to each phase in `processPhases`
 * (Plan, Build, Launch, Support, Grow). Must add up to projectSteps.length.
 */
export const stepsPerPhase: number[] = [3, 3, 3, 2, 2];
