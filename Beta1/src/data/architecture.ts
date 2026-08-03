export type PageLink = {
  href: string;
  code: string;
  title: string;
  zh: string;
  blurb: string;
  phase: 1 | 2 | 3 | 4 | 5 | 6 | 7;
};

/** Active beta release identity for this folder. */
export const BETA_RELEASE = {
  id: "beta1",
  label: "BETA 1",
  version: "1.0.0-beta.1",
  zh: "Beta 第1版",
  focusPhase: 1 as const,
  summary: "電影級入口 + 品牌落地 + 平台／商城骨架，供內測迭代。",
} as const;

export const PHASES = [
  {
    id: 1,
    title: "Landing Experience",
    zh: "品牌入口（Beta 第1版重點）",
    blurb: "電影級品牌入口與公司／價值頁，建立 GVG 第一印象。",
  },
  {
    id: 2,
    title: "Business Ecosystem",
    zh: "事業生態",
    blurb: "事業群、貿易、AI 資源與全球商城。",
  },
  {
    id: 3,
    title: "Interactive Platform",
    zh: "互動平台",
    blurb: "儀表板、地圖、專案與知識資源。",
  },
  {
    id: 4,
    title: "AI Operation",
    zh: "AI 營運",
    blurb: "Agent、自動化與分析決策中樞。",
  },
  {
    id: 5,
    title: "Community",
    zh: "社群生態",
    blurb: "會員、論壇與活動網絡。",
  },
  {
    id: 6,
    title: "About",
    zh: "關於我們",
    blurb: "公司、新聞與聯絡通道。",
  },
  {
    id: 7,
    title: "Admin OS",
    zh: "後台管理",
    blurb: "平台治理、CMS、數據與資安。",
  },
] as const;

export const PAGES: PageLink[] = [
  {
    href: "/",
    code: "01",
    title: "Hero Cinematic",
    zh: "沉浸式首頁",
    blurb: "全螢幕動畫、星系背景、Cyberpunk HUD 與 Start Experience。",
    phase: 1,
  },
  {
    href: "/company",
    code: "02",
    title: "Company Introduction",
    zh: "公司介紹",
    blurb: "Vision、Mission、Core Value、Timeline、Global Network。",
    phase: 1,
  },
  {
    href: "/why-gvg",
    code: "03",
    title: "Why GVG",
    zh: "平台價值",
    blurb: "全球整合、AI Automation、Business Matching、Investment、Supply Chain。",
    phase: 1,
  },
  {
    href: "/business",
    code: "04",
    title: "Business Division",
    zh: "事業群",
    blurb: "Trade、Real Estate、Construction、Investment、AI、Marketing 等事業體。",
    phase: 2,
  },
  {
    href: "/trade",
    code: "05",
    title: "Global Trade Platform",
    zh: "全球貿易",
    blurb: "商品搜尋、供應商、OEM/ODM、物流、關稅、報價、採購與媒合。",
    phase: 2,
  },
  {
    href: "/ai-resource",
    code: "06",
    title: "AI Resource Center",
    zh: "AI 資源中心",
    blurb: "AI Tools、Agent、Automation、Prompt、Workflow、Knowledge Base。",
    phase: 2,
  },
  {
    href: "/marketplace",
    code: "07",
    title: "GVG Marketplace",
    zh: "全球商城",
    blurb: "B2B/B2C、OEM、品牌館、商品搜尋、供應商與採購中心。",
    phase: 2,
  },
  {
    href: "/commerce",
    code: "07B",
    title: "Ecommerce Architecture",
    zh: "電商平台架構",
    blurb: "前台商城、賣家中心、交易營運、結算清算與信任合規分層。",
    phase: 2,
  },
  {
    href: "/products",
    code: "07C",
    title: "Product Center",
    zh: "商品中心",
    blurb: "廠家、代理與經銷商可直接上架商品、管理庫存與報價。",
    phase: 2,
  },
  {
    href: "/dashboard",
    code: "08",
    title: "AI Dashboard",
    zh: "智慧儀表板",
    blurb: "新聞、AI 分析、市場趨勢、商機、待辦與 AI Assistant。",
    phase: 3,
  },
  {
    href: "/global-map",
    code: "09",
    title: "Global Map",
    zh: "全球互動地圖",
    blurb: "點擊國家查看合作企業、市場、產品、代理商與商機。",
    phase: 3,
  },
  {
    href: "/projects",
    code: "10",
    title: "Project Center",
    zh: "專案中心",
    blurb: "房地產、營建、投資與合作案的 Timeline、文件與 AI 分析。",
    phase: 3,
  },
  {
    href: "/resources",
    code: "11",
    title: "Resource Center",
    zh: "資源中心",
    blurb: "PDF、Excel、CAD、影片、法規、政府 API、SOP 與文件管理。",
    phase: 3,
  },
  {
    href: "/ai-agents",
    code: "12",
    title: "AI Agent Center",
    zh: "AI 智能代理",
    blurb: "Business、Trade、Legal、Accounting、Marketing 等專業 Agent。",
    phase: 4,
  },
  {
    href: "/automation",
    code: "13",
    title: "AI Automation",
    zh: "流程自動化",
    blurb: "串接 Email、CRM、ERP、Google Workspace、OpenAI、n8n 等。",
    phase: 4,
  },
  {
    href: "/analytics",
    code: "14",
    title: "Analytics Center",
    zh: "分析中心",
    blurb: "KPI、全球市場、財務、ROI 與 AI Prediction。",
    phase: 4,
  },
  {
    href: "/members",
    code: "15",
    title: "Member Center",
    zh: "會員中心",
    blurb: "會員、企業、代理商、投資人、VIP 與合作夥伴。",
    phase: 5,
  },
  {
    href: "/forum",
    code: "16",
    title: "Forum",
    zh: "社群論壇",
    blurb: "討論區、案例分享、成功故事與知識庫。",
    phase: 5,
  },
  {
    href: "/events",
    code: "17",
    title: "Event",
    zh: "活動中心",
    blurb: "線上研討會、課程、論壇、活動與直播。",
    phase: 5,
  },
  {
    href: "/about",
    code: "18",
    title: "Company",
    zh: "關於公司",
    blurb: "歷史、團隊、據點與 CSR。",
    phase: 6,
  },
  {
    href: "/news",
    code: "19",
    title: "News",
    zh: "新聞中心",
    blurb: "公告、最新消息與 AI 產業資訊。",
    phase: 6,
  },
  {
    href: "/contact",
    code: "20",
    title: "Contact",
    zh: "聯絡我們",
    blurb: "客服、Google Map、LINE、WhatsApp、Email。",
    phase: 6,
  },
  {
    href: "/admin",
    code: "21",
    title: "Admin OS",
    zh: "平台後台",
    blurb: "Dashboard、會員、商品、供應商、Trade、AI、CMS、Analytics、Security。",
    phase: 7,
  },
];

export const PAGE_DETAILS: Record<
  string,
  { headline: string; points: string[]; actions: string[] }
> = {
  "/company": {
    headline: "Global Vista Group",
    points: [
      "Vision — 以科技連結全球商業機會",
      "Mission — 打造 AI 驅動的跨境營運系統",
      "Core Value — Trust / Speed / Intelligence / Integration",
      "Company Timeline — 從區域貿易到全球平台",
      "Global Network — TW · US · JP · SG · DE · AE",
    ],
    actions: ["查看全球據點", "下載公司簡報", "預約簡報會"],
  },
  "/why-gvg": {
    headline: "Why Global Vista Group",
    points: [
      "全球整合 — 一站式串接貿易、投資與供應鏈",
      "AI Automation — 降低人工流程與決策延遲",
      "Business Matching — 精準媒合供需雙方",
      "Investment — 資本與專案對接",
      "Global Supply Chain — 端到端可視與可控",
    ],
    actions: ["比較方案", "申請試用", "聯繫顧問"],
  },
  "/business": {
    headline: "Business Divisions",
    points: [
      "Global Trade",
      "Real Estate",
      "Construction",
      "Investment",
      "AI Platform",
      "Digital Marketing",
      "Property Management",
      "Consulting",
      "Education",
    ],
    actions: ["進入事業群", "查看案例", "合作洽談"],
  },
  "/trade": {
    headline: "Global Trade Platform",
    points: [
      "全球商品搜尋",
      "供應商 / OEM / ODM",
      "物流與關稅試算",
      "即時報價與採購單",
      "智能媒合引擎",
    ],
    actions: ["搜尋商品", "發布採購需求", "供應商入駐"],
  },
  "/ai-resource": {
    headline: "AI Resource Center",
    points: [
      "AI Tools 工具庫",
      "AI Agent 模板",
      "Automation 工作流",
      "Prompt Library",
      "Knowledge Base",
    ],
    actions: ["開啟工具", "部署 Agent", "建立 Workflow"],
  },
  "/marketplace": {
    headline: "GVG Marketplace",
    points: ["B2B 交易", "B2C 通路", "OEM 專區", "品牌館", "採購中心"],
    actions: ["進入商城", "開設品牌館", "成為供應商"],
  },
  "/commerce": {
    headline: "Ecommerce Platform Stack",
    points: [
      "Storefront 前台商城",
      "Seller Hub 賣家中心",
      "Trade Ops 詢價/訂單/物流",
      "Settlement 多幣別結算",
      "Trust & Compliance 認證合規",
    ],
    actions: ["檢視架構圖", "進入商品中心", "申請賣家資格"],
  },
  "/products": {
    headline: "Product Center · Direct Listing",
    points: [
      "廠家直接上架產線商品",
      "代理商上架授權商品",
      "經銷商上架通路商品",
      "支援圖檔、規格、MOQ、報價",
      "上架後同步至 Marketplace",
    ],
    actions: ["立即上架", "管理我的商品", "查看審核狀態"],
  },
  "/dashboard": {
    headline: "AI Dashboard",
    points: [
      "今日新聞",
      "AI 分析摘要",
      "市場趨勢",
      "商機推薦",
      "個人待辦 + AI Assistant",
    ],
    actions: ["登入儀表板", "同步資料源", "呼叫 AI Assistant"],
  },
  "/global-map": {
    headline: "Interactive Global Map",
    points: [
      "3D / 互動地球節點",
      "合作企業與代理商",
      "市場資訊與產品",
      "區域商機熱區",
    ],
    actions: ["開啟地圖", "篩選國家", "匯出市場報告"],
  },
  "/projects": {
    headline: "Project Center",
    points: [
      "房地產 / 營建 / 投資 / 合作案",
      "Timeline 與進度",
      "文件與照片資產",
      "AI 風險與進度分析",
    ],
    actions: ["建立專案", "上傳文件", "檢視進度"],
  },
  "/resources": {
    headline: "Resource Center",
    points: [
      "PDF / Excel / CAD / 影片",
      "法規與政府 API",
      "SOP 知識庫",
      "權限化文件管理",
    ],
    actions: ["上傳資源", "搜尋知識庫", "連接政府 API"],
  },
  "/ai-agents": {
    headline: "AI Agent Center",
    points: [
      "Business / Trade / Legal Agents",
      "Accounting / Marketing / Real Estate",
      "Construction / HR / Customer Service",
    ],
    actions: ["啟動 Agent", "設定權限", "查看執行紀錄"],
  },
  "/automation": {
    headline: "AI Automation",
    points: [
      "Email · CRM · ERP",
      "Airtable · Google Workspace",
      "OpenAI · Claude · Gemini",
      "Zapier · Make · n8n",
    ],
    actions: ["建立自動化", "連接系統", "監控流程"],
  },
  "/analytics": {
    headline: "Analytics Center",
    points: ["KPI Dashboard", "全球市場圖表", "財務與 ROI", "AI Prediction"],
    actions: ["開啟分析", "匯出報表", "設定預警"],
  },
  "/members": {
    headline: "Member Center",
    points: ["會員 / 企業 / 代理商", "投資人 / VIP", "合作夥伴分級"],
    actions: ["註冊會員", "升級 VIP", "管理資料"],
  },
  "/forum": {
    headline: "Community Forum",
    points: ["討論區", "案例分享", "成功故事", "知識庫互動"],
    actions: ["發表討論", "瀏覽案例", "追蹤話題"],
  },
  "/events": {
    headline: "Events & Live",
    points: ["線上研討會", "課程", "論壇", "活動與直播"],
    actions: ["報名活動", "觀看直播", "下載講義"],
  },
  "/about": {
    headline: "About GVG",
    points: ["公司歷史", "核心團隊", "全球據點", "CSR 責任"],
    actions: ["認識團隊", "據點資訊", "CSR 報告"],
  },
  "/news": {
    headline: "News & Media",
    points: ["新聞公告", "最新消息", "AI 產業資訊", "媒體素材"],
    actions: ["閱讀新聞", "訂閱更新", "媒體洽詢"],
  },
  "/contact": {
    headline: "Contact & Support",
    points: ["客服通道", "Google Map", "LINE / WhatsApp / Email"],
    actions: ["送出訊息", "開啟地圖", "加入 LINE"],
  },
  "/admin": {
    headline: "Admin OS Control Deck",
    points: [
      "Dashboard / 平台數據",
      "User · Product · Supplier Management",
      "Trade Center · AI Center · CMS",
      "Analytics · Security · Audit",
    ],
    actions: ["管理員登入", "檢視數據", "權限設定"],
  },
};
