/**
 * Education timeline and certifications, based on the CV. Entries render
 * newest first. `period` and `year` are optional — add them when known.
 */
export type EducationEntry = {
  institution: string;
  qualification: string;
  /** e.g. "2021 — 2025". */
  period?: string;
  location: string;
  highlights: readonly string[];
  focus?: readonly string[];
};

export type Certification = {
  title: string;
  issuer: string;
  year?: string;
};

export const education: readonly EducationEntry[] = [
  {
    institution: "Shiv Nadar University",
    qualification: "Bachelor of Technology, Computer Science",
    location: "Greater Noida, India",
    highlights: [
      "Captain of the university squash team (2021 – 2024)",
      "Led the team to the quarterfinals of the All India University Squash Championship (2024)",
      "Software internship at Cadence Design Systems (2022)",
    ],
  },
  {
    institution: "JEE Main",
    qualification: "Joint Entrance Examination — India's national engineering entrance exam",
    period: "96th percentile",
    location: "India",
    highlights: [
      "Scored in the 96th percentile nationally",
      "Built on a strong foundation in mathematics and physics",
    ],
    focus: ["Mathematics", "Physics", "Chemistry"],
  },
];

export const certifications: readonly Certification[] = [
  {
    title: "Anthropic Academy — full course catalog (17 courses)",
    issuer: "Anthropic · Skilljar",
  },
];
