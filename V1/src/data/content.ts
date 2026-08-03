export const BOOT_LINES = [
  "SYSTEM INITIALIZING",
  "Loading Global Network...",
  "AI Core Online...",
  "Trade Grid Sync...",
  "Platform Modules Ready...",
  "Welcome to GVG OS...",
] as const;

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
    id: "company",
    code: "02",
    title: "Company",
    zh: "公司介紹",
    detail: "檢視企業願景、組織架構與全球據點資訊。",
  },
  {
    id: "business",
    code: "03",
    title: "Business",
    zh: "事業群",
    detail: "切換各事業群營運版圖與策略重點。",
  },
  {
    id: "trade",
    code: "04",
    title: "Trade",
    zh: "全球貿易",
    detail: "管理跨境貿易流程、清算通道與交易走廊。",
  },
  {
    id: "marketplace",
    code: "05",
    title: "Marketplace",
    zh: "全球商城",
    detail: "瀏覽與撮合全球商品、服務與數位資產。",
  },
  {
    id: "ai-center",
    code: "06",
    title: "AI Center",
    zh: "AI 工具中心",
    detail: "啟用企業級 AI 工具組與模型工作台。",
  },
  {
    id: "ai-agent",
    code: "07",
    title: "AI Agent",
    zh: "AI 智能代理",
    detail: "部署可自主執行任務的智能代理團隊。",
  },
  {
    id: "automation",
    code: "08",
    title: "Automation",
    zh: "工作流程自動化",
    detail: "編排跨系統工作流，縮短人工操作鏈。",
  },
  {
    id: "dashboard",
    code: "09",
    title: "Dashboard",
    zh: "智慧儀表板",
    detail: "即時監看 KPI、警報與營運健康度。",
  },
  {
    id: "analytics",
    code: "10",
    title: "Analytics",
    zh: "AI 商業分析",
    detail: "以 AI 驅動預測、洞察與決策模擬。",
  },
  {
    id: "crm",
    code: "11",
    title: "CRM",
    zh: "客戶關係管理",
    detail: "整合客戶旅程、商機與服務紀錄。",
  },
  {
    id: "erp",
    code: "12",
    title: "ERP",
    zh: "企業資源管理",
    detail: "串接財務、採購、人資與營運資源。",
  },
  {
    id: "supplier",
    code: "13",
    title: "Supplier",
    zh: "供應商管理",
    detail: "評估供應商績效、風險與合作條款。",
  },
  {
    id: "inventory",
    code: "14",
    title: "Inventory",
    zh: "庫存管理",
    detail: "追蹤多倉庫存、周轉率與補貨策略。",
  },
  {
    id: "logistics",
    code: "15",
    title: "Logistics",
    zh: "物流追蹤",
    detail: "即時掌握貨況、航線與末端配送狀態。",
  },
  {
    id: "investment",
    code: "16",
    title: "Investment",
    zh: "投資專區",
    detail: "配置資本、追蹤投報與資產組合。",
  },
  {
    id: "real-estate",
    code: "17",
    title: "Real Estate",
    zh: "不動產平台",
    detail: "管理物件、估值、租賃與交易流程。",
  },
  {
    id: "construction",
    code: "18",
    title: "Construction",
    zh: "營建工程管理",
    detail: "控管工期、成本、工地安全與進度。",
  },
  {
    id: "project-center",
    code: "19",
    title: "Project Center",
    zh: "專案管理",
    detail: "協調跨部門專案任務、里程碑與資源。",
  },
  {
    id: "resource-center",
    code: "20",
    title: "Resource Center",
    zh: "文件與知識庫",
    detail: "集中存放 SOP、文件與組織知識資產。",
  },
  {
    id: "global-map",
    code: "21",
    title: "Global Map",
    zh: "全球互動地圖",
    detail: "在互動地圖上檢視節點、航線與據點。",
  },
  {
    id: "member-center",
    code: "22",
    title: "Member Center",
    zh: "會員中心",
    detail: "管理會員資料、權限與個人化設定。",
  },
  {
    id: "community",
    code: "23",
    title: "Community",
    zh: "社群論壇",
    detail: "參與討論、分享情報與建立協作網絡。",
  },
  {
    id: "news-media",
    code: "24",
    title: "News & Media",
    zh: "新聞媒體中心",
    detail: "發布與追蹤產業新聞、公告與媒體素材。",
  },
  {
    id: "contact",
    code: "25",
    title: "Contact",
    zh: "客服與聯絡",
    detail: "連線客服、送出需求與追蹤服務案件。",
  },
  {
    id: "admin-os",
    code: "26",
    title: "Admin OS",
    zh: "平台後台管理",
    detail: "系統設定、權限治理與平台維運控制台。",
  },
] as const;

export type ModuleId = (typeof CORE_MODULES)[number]["id"];

/** @deprecated use CORE_MODULES / ModuleId */
export const MISSIONS = CORE_MODULES;
export type MissionId = ModuleId;
