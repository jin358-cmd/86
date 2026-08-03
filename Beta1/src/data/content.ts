export const BOOT_LINES = [
  "SYSTEM INITIALIZING",
  "Loading Global Network...",
  "AI Core Online...",
  "Trade Grid Sync...",
  "Platform Modules Ready...",
  "Welcome to GVG OS...",
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

export const CORE_MODULES = [
  {
    id: "landing",
    code: "01",
    title: "Landing",
    zh: "沉浸式首頁",
    detail: "進入 GVG OS 的沉浸式入口層，總覽平台狀態與核心捷徑。",
  },
  {
    id: "products",
    code: "02",
    title: "Product Center",
    zh: "商品中心",
    detail: "廠家、代理、經銷商上架與分類瀏覽。",
  },
  {
    id: "marketplace",
    code: "03",
    title: "Marketplace",
    zh: "全球商城",
    detail: "B2B/B2C 交易、精選供應商與熱門商品。",
  },
  {
    id: "trade",
    code: "04",
    title: "Trade",
    zh: "國際貿易",
    detail: "採購、物流、關稅與跨境媒合。",
  },
  {
    id: "ai-services",
    code: "05",
    title: "AI Services",
    zh: "AI 智慧服務",
    detail: "商業顧問、採購助理、價格預測與翻譯。",
  },
  {
    id: "partners",
    code: "06",
    title: "Partners",
    zh: "合作夥伴",
    detail: "企業、代理商與投資人專區。",
  },
] as const;

export type ModuleId = (typeof CORE_MODULES)[number]["id"];
export type MissionId = ModuleId;
export const MISSIONS = CORE_MODULES;
