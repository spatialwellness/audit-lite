export type Question = {
  id: string;
  category: "lighting" | "acoustics" | "layout" | "sensory";
  text: string;
  options: { label: string; score: number }[];
};

export type Category = {
  id: "lighting" | "acoustics" | "layout" | "sensory";
  label: string;
  icon: string;
  description: string;
};

export const categories: Category[] = [
  {
    id: "lighting",
    label: "Lighting",
    icon: "✧",
    description: "Light shapes mood, energy, and cognitive performance more than most people realise.",
  },
  {
    id: "acoustics",
    label: "Acoustics",
    icon: "◯",
    description: "Sound is the most underestimated drain on concentration and wellbeing in the workplace.",
  },
  {
    id: "layout",
    label: "Layout & Choice",
    icon: "▢",
    description: "The ability to choose where and how to work is fundamental to autonomy and performance.",
  },
  {
    id: "sensory",
    label: "Sensory & Neuro-Inclusive",
    icon: "◆",
    description: "One in five people processes sensory input differently. Your workspace should work for all brains.",
  },
];

export const questions: Question[] = [
  // Lighting
  {
    id: "l1",
    category: "lighting",
    text: "How would you describe access to natural daylight in your workspace?",
    options: [
      { label: "Almost none, your desk is far from windows", score: 1 },
      { label: "Some, but limited to certain spots", score: 2 },
      { label: "Good natural light reaches your workspace", score: 3 },
      { label: "Excellent, you have direct daylight access", score: 4 },
    ],
  },
  {
    id: "l2",
    category: "lighting",
    text: "Can you adjust the artificial lighting in your immediate work area?",
    options: [
      { label: "No, one fixed setting for the entire space", score: 1 },
      { label: "Limited, only per zone or room", score: 2 },
      { label: "Some control is available", score: 3 },
      { label: "Yes, you can personalise your lighting", score: 4 },
    ],
  },
  {
    id: "l3",
    category: "lighting",
    text: "How would you describe the colour temperature of your artificial lighting?",
    options: [
      { label: "Very cool/blue-white - feels clinical or harsh", score: 1 },
      { label: "Neutral white - functional but flat", score: 2 },
      { label: "Warm white - comfortable for most of the day", score: 3 },
      { label: "Mixed or adjustable - suited to different times of day", score: 4 },
    ],
  },
  {
    id: "l4",
    category: "lighting",
    text: "Do you experience screen glare, reflections, or eye fatigue?",
    options: [
      { label: "Frequently, it's a real problem", score: 1 },
      { label: "Sometimes, certain times of day are difficult", score: 2 },
      { label: "Rarely", score: 3 },
      { label: "Never, screens and lighting work well together", score: 4 },
    ],
  },

  // Acoustics
  {
    id: "a1",
    category: "acoustics",
    text: "How would you describe the general noise level during a typical workday?",
    options: [
      { label: "Very loud, concentration is genuinely difficult", score: 1 },
      { label: "Noisy, you often get distracted", score: 2 },
      { label: "Generally manageable", score: 3 },
      { label: "Calm, you can focus without effort", score: 4 },
    ],
  },
  {
    id: "a2",
    category: "acoustics",
    text: "Can you find a quiet, distraction-free space when you need to focus?",
    options: [
      { label: "No, there is no escape from noise", score: 1 },
      { label: "Sometimes, but it takes effort or compromise", score: 2 },
      { label: "Usually, you have a reasonable option", score: 3 },
      { label: "Yes, you can always find silence when you need it", score: 4 },
    ],
  },
  {
    id: "a3",
    category: "acoustics",
    text: "Can you take calls without background noise or interruptions?",
    options: [
      { label: "No, calls are always disrupted by noise around you", score: 1 },
      { label: "It's hit or miss, you often have to apologise for background sounds", score: 2 },
      { label: "Mostly fine, with occasional interruptions", score: 3 },
      { label: "Yes, you have a reliably quiet space for calls", score: 4 },
    ],
  },
  {
    id: "a4",
    category: "acoustics",
    text: "How often do you use headphones to block out noise?",
    options: [
      { label: "Almost all the time", score: 1 },
      { label: "Daily, you rely on them", score: 2 },
      { label: "Occasionally", score: 3 },
      { label: "Rarely needed, the acoustics work", score: 4 },
    ],
  },

  // Layout
  {
    id: "y1",
    category: "layout",
    text: "Can you choose where and how you work based on the task at hand?",
    options: [
      { label: "No, you have one fixed desk or spot", score: 1 },
      { label: "Limited, a few alternative spots exist", score: 2 },
      { label: "Some variety is available", score: 3 },
      { label: "Many different settings to choose from", score: 4 },
    ],
  },
  {
    id: "y2",
    category: "layout",
    text: "Does your workspace support different types of work, from focused tasks to video calls?",
    options: [
      { label: "No, you do everything in the same spot the same way", score: 1 },
      { label: "Somewhat, but your setup doesn't really change between tasks", score: 2 },
      { label: "You can adjust a few things depending on what you're doing", score: 3 },
      { label: "Yes, your space adapts well to different types of work", score: 4 },
    ],
  },
  {
    id: "y3",
    category: "layout",
    text: "Do you have access to natural elements like plants, outdoor views, or fresh air?",
    options: [
      { label: "None, the environment is fully artificial", score: 1 },
      { label: "Minimal, a few plants or partial window views", score: 2 },
      { label: "Some access to nature or daylight views", score: 3 },
      { label: "Good connection to nature throughout your space", score: 4 },
    ],
  },
  {
    id: "y4",
    category: "layout",
    text: "Can you adjust your immediate workspace to suit how your body feels?",
    options: [
      { label: "No, fixed furniture, no personalisation", score: 1 },
      { label: "Very limited, minor adjustments only", score: 2 },
      { label: "Some flexibility is available", score: 3 },
      { label: "Good ergonomic flexibility and personal control", score: 4 },
    ],
  },

  // Sensory & Neuro-Inclusive
  {
    id: "s1",
    category: "sensory",
    text: "How would you describe the visual environment of your workspace?",
    options: [
      { label: "Very cluttered or visually busy, hard to filter out distractions", score: 1 },
      { label: "Somewhat cluttered, some visual noise", score: 2 },
      { label: "Generally calm, a few distractions", score: 3 },
      { label: "Visually calm and organised, easy to focus", score: 4 },
    ],
  },
  {
    id: "s2",
    category: "sensory",
    text: "Can you control or reduce sensory input when you need to?",
    options: [
      { label: "No, you're stuck with whatever the environment throws at you", score: 1 },
      { label: "Limited options, you can block some things out", score: 2 },
      { label: "Some control, you can adjust lighting or use headphones", score: 3 },
      { label: "Full control, you can dim lights, reduce noise, and retreat when needed", score: 4 },
    ],
  },
  {
    id: "s3",
    category: "sensory",
    text: "Do you have access to a quiet space where you can decompress or reset?",
    options: [
      { label: "No, there's nowhere to escape sensory overload", score: 1 },
      { label: "Rarely, you have to leave the building or improvise", score: 2 },
      { label: "Sometimes, but it's not always available", score: 3 },
      { label: "Yes, there's a designated quiet zone or retreat space", score: 4 },
    ],
  },
  {
    id: "s4",
    category: "sensory",
    text: "How much control do you have over your immediate environment?",
    options: [
      { label: "None, everything is fixed and you can't adjust anything", score: 1 },
      { label: "Minimal, maybe a lamp or a cushion", score: 2 },
      { label: "Some, you can adjust a few things to suit your needs", score: 3 },
      { label: "High control, you can personalise temperature, light, position, and setup", score: 4 },
    ],
  },
];

export function getScore(answers: Record<string, number>) {
  const scores: Record<string, number[]> = { lighting: [], acoustics: [], layout: [], sensory: [] };
  for (const [id, score] of Object.entries(answers)) {
    const q = questions.find((q) => q.id === id);
    if (q) scores[q.category].push(score);
  }

  const avg = (arr: number[]) =>
    arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

  const lighting = avg(scores.lighting);
  const acoustics = avg(scores.acoustics);
  const layout = avg(scores.layout);
  const sensory = avg(scores.sensory);
  const overall = avg([lighting, acoustics, layout, sensory]);

  return { lighting, acoustics, layout, sensory, overall };
}

export function getColor(score: number): "red" | "orange" | "green" {
  if (score < 2) return "red";
  if (score < 3) return "orange";
  return "green";
}

export function getQuickWins(scores: ReturnType<typeof getScore>, workspaceType: "home" | "office" = "office"): string[] {
  const wins: string[] = [];
  const sorted = [
    { cat: "lighting" as const, score: scores.lighting },
    { cat: "acoustics" as const, score: scores.acoustics },
    { cat: "layout" as const, score: scores.layout },
    { cat: "sensory" as const, score: scores.sensory },
  ].sort((a, b) => a.score - b.score);

  const lightingWinsOffice = [
    "Position desks closer to windows. Daylight reduces fatigue and improves mood by up to 30%.",
    "Switch to warm-white bulbs (2700 to 3000K) for areas where people spend most of the day.",
    "Add adjustable desk lamps. Personal lighting control reduces eye strain significantly.",
    "Install anti-glare screens or reposition monitors perpendicular to windows.",
  ];
  const lightingWinsHome = [
    "Move your desk closer to a window. Natural light reduces fatigue and improves focus.",
    "Switch your overhead light to a warm-white bulb (2700 to 3000K). Cool white exhausts your eyes faster.",
    "Get a desk lamp with adjustable brightness. One light source is never enough.",
    "Reposition your monitor to avoid glare. Perpendicular to the window works best.",
  ];
  const acousticsWinsOffice = [
    "Designate at least one silent zone. Even a small room without a phone makes a difference.",
    "Add soft furnishings: rugs, curtains, or acoustic panels can reduce ambient noise by 40%.",
    "Introduce a clear phone/call etiquette policy and one designated call area.",
    "Consider white noise or ambient sound in open areas. It masks distracting speech.",
  ];
  const acousticsWinsHome = [
    "If you can hear your household, try soft furnishings. A rug, curtains, even a bookshelf dampens sound.",
    "Noise-cancelling headphones are worth every euro if you share your home with others.",
    "Find your quietest room and make that your workspace. Not the living room.",
    "Set boundaries with housemates. A closed door needs to mean something.",
  ];
  const layoutWinsOffice = [
    "Create at least one alternative work setting. A sofa corner, a standing desk, anything different from rows of desks.",
    "Add plants. Even a few pots reduce stress markers and improve perceived air quality.",
    "Introduce height-adjustable desks or a standing area. Movement resets focus.",
    "Ask your team where they actually focus best, then design around the answer.",
  ];
  const layoutWinsHome = [
    "Create a second work spot. Even a standing corner breaks the monotony and resets focus.",
    "Add one plant to your desk. It sounds small but it measurably reduces stress.",
    "If your chair doesn't adjust properly, that's your number one investment.",
    "Separate work from life physically. A dedicated corner beats working from the sofa.",
  ];
  const sensoryWinsOffice = [
    "Declutter one surface at a time. Visual noise drains focus before you realise it's happening.",
    "Invest in quality noise-cancelling headphones. Make them part of your standard equipment budget.",
    "Create a designated quiet room with soft lighting and minimal stimulation. Even 10 minutes resets the nervous system.",
    "Introduce a fidget-friendly culture. Simple tools like thinking putty or smooth stones can improve focus for neurodivergent team members.",
  ];
  const sensoryWinsHome = [
    "Clear your desk completely, then only put back what you actually use daily. Visual clutter exhausts your brain.",
    "Get noise-cancelling headphones. Not earbuds - proper over-ear ones that signal 'do not disturb'.",
    "Add a weighted lap pad or shoulder wrap. Deep pressure calms the nervous system during stressful tasks.",
    "Try a 5-minute sensory reset: dim the lights, close your eyes, breathe. Build it into your routine.",
  ];

  const winMap: Record<string, string[]> = workspaceType === "home" 
    ? {
        lighting: lightingWinsHome,
        acoustics: acousticsWinsHome,
        layout: layoutWinsHome,
        sensory: sensoryWinsHome,
      }
    : {
        lighting: lightingWinsOffice,
        acoustics: acousticsWinsOffice,
        layout: layoutWinsOffice,
        sensory: sensoryWinsOffice,
      };

  for (const { cat, score } of sorted) {
    const pool = winMap[cat];
    const idx = score < 2 ? 0 : score < 3 ? 1 : 2;
    wins.push(pool[idx]);
    if (wins.length >= 3) break;
  }

  return wins;
}
