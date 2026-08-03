export const BOOT_LINES = [
  "SYSTEM INITIALIZING",
  "Checking Memory...",
  "GPU Online...",
  "Quantum Network...",
  "Neural Interface...",
  "Ready...",
] as const;

export const GLASS_SCAN_LINES = [
  "Open-field VR sync...",
  "Night City skyline locked...",
  "Depth / parallax stable...",
  "Panoramic feed online...",
] as const;

export const WEAR_PROGRESS = [0, 18, 35, 61, 82, 100] as const;

export const HIERARCHY = [
  {
    id: "corporation",
    title: "Corporation",
    blurb: "Capital towers that write the rules and own the skyline.",
  },
  {
    id: "alliance",
    title: "Alliance",
    blurb: "Cross-border syndicates balancing power between megas.",
  },
  {
    id: "operator",
    title: "Operator",
    blurb: "Licensed specialists who run the city's critical systems.",
  },
  {
    id: "citizen",
    title: "Citizen",
    blurb: "Registered residents living inside the civic grid.",
  },
  {
    id: "independent",
    title: "Independent",
    blurb: "Unbound freelancers moving between layers of the net.",
  },
] as const;

export const ENHANCEMENTS = [
  {
    id: "ai",
    title: "Artificial Intelligence",
    blurb: "Co-pilots that predict risk before you feel it.",
  },
  {
    id: "automation",
    title: "Automation",
    blurb: "Factories and ports that never sleep.",
  },
  {
    id: "digital-twin",
    title: "Digital Twin",
    blurb: "A mirrored city where every change is simulated first.",
  },
  {
    id: "neural",
    title: "Neural Interface",
    blurb: "Thought-speed control of tools, vehicles, and archives.",
  },
  {
    id: "robotics",
    title: "Robotics",
    blurb: "Bodies built for heights humans were never meant to reach.",
  },
  {
    id: "quantum",
    title: "Quantum Computing",
    blurb: "Encrypted markets settled in fractions of a blink.",
  },
] as const;

export const DISTRICTS = [
  { id: "financial", name: "Financial District", x: 62, y: 28 },
  { id: "trade", name: "Trade Center", x: 48, y: 40 },
  { id: "ai", name: "AI District", x: 72, y: 46 },
  { id: "medical", name: "Medical City", x: 34, y: 32 },
  { id: "construction", name: "Construction Zone", x: 22, y: 58 },
  { id: "manufacturing", name: "Manufacturing Hub", x: 40, y: 70 },
  { id: "energy", name: "Energy Center", x: 58, y: 74 },
  { id: "research", name: "Research Labs", x: 78, y: 62 },
  { id: "spaceport", name: "Space Port", x: 86, y: 34 },
] as const;

export const WORLD_NODES = [
  { id: "tw", name: "Taiwan", x: 78, y: 52 },
  { id: "us", name: "USA", x: 18, y: 38 },
  { id: "jp", name: "Japan", x: 86, y: 36 },
  { id: "sg", name: "Singapore", x: 72, y: 68 },
  { id: "de", name: "Germany", x: 48, y: 30 },
  { id: "ae", name: "Dubai", x: 58, y: 48 },
] as const;

export const WORLD_ROUTES: Array<[string, string]> = [
  ["tw", "jp"],
  ["tw", "sg"],
  ["tw", "ae"],
  ["us", "de"],
  ["us", "jp"],
  ["de", "ae"],
  ["sg", "ae"],
  ["jp", "us"],
];

export const MISSIONS = [
  {
    id: "enter",
    title: "ENTER",
    subtitle: "Access the civic layer",
    detail: "Cross the perimeter and initialize your citizen profile.",
  },
  {
    id: "trade",
    title: "TRADE",
    subtitle: "Open quantum markets",
    detail: "Route assets through encrypted settlement corridors.",
  },
  {
    id: "build",
    title: "BUILD",
    subtitle: "Shape the skyline",
    detail: "Claim construction rights and grow vertical districts.",
  },
  {
    id: "invest",
    title: "INVEST",
    subtitle: "Fund the grid",
    detail: "Allocate capital into energy, AI, and transit networks.",
  },
  {
    id: "create",
    title: "CREATE",
    subtitle: "Design the future",
    detail: "Prototype products inside the digital twin sandbox.",
  },
  {
    id: "connect",
    title: "CONNECT",
    subtitle: "Link global nodes",
    detail: "Establish alliances across Taiwan, USA, Japan, and beyond.",
  },
] as const;

export type MissionId = (typeof MISSIONS)[number]["id"];
