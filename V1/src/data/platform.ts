export type NavItem = {
  href: string;
  label: string;
  code: string;
};

export const NAV: NavItem[] = [
  { href: "/", label: "HOME", code: "00" },
  { href: "/markets", label: "MARKETS", code: "01" },
  { href: "/routes", label: "ROUTES", code: "02" },
  { href: "/contracts", label: "CONTRACTS", code: "03" },
  { href: "/partners", label: "PARTNERS", code: "04" },
  { href: "/intel", label: "INTEL", code: "05" },
  { href: "/invest", label: "INVEST", code: "06" },
];

export const HOME = {
  eyebrow: "GVG INTERNATIONAL TRADE PLATFORM",
  title: "TRADE BEYOND BORDERS",
  lead:
    "賽博朋克風格的全球貿易作業系統。串接市場、航線、契約、夥伴、情報與資本——讓跨境交易在霓虹網格上即時清算。",
  image: "/images/trade-hero.png",
  stats: [
    { label: "ACTIVE CORRIDORS", value: "128" },
    { label: "SETTLEMENT LATENCY", value: "11ms" },
    { label: "NODE CITIES", value: "36" },
    { label: "CLEARANCE", value: "ROOT" },
  ],
};

export const PAGES = {
  markets: {
    code: "01",
    title: "MARKETS",
    zh: "全球市場",
    lead: "即時商品、能源、零部件與數位資產行情。霓虹報價牆同步六大樞紐時區。",
    image: "/images/trade-markets.png",
    features: [
      {
        title: "Commodity Grid",
        blurb: "金屬、能源、農業與稀有材料的跨市套利通道。",
      },
      {
        title: "Quantum Quotes",
        blurb: "毫秒級報價聚合，降低滑價與暗池風險。",
      },
      {
        title: "Sector Heat",
        blurb: "以熱圖呈現航運、製造、AI 與醫療板塊動能。",
      },
    ],
  },
  routes: {
    code: "02",
    title: "ROUTES",
    zh: "國際航線",
    lead: "台灣、美國、日本、新加坡、德國、杜拜——貨流、空運與數位物流走廊全圖可視化。",
    image: "/images/trade-routes.png",
    features: [
      {
        title: "Pacific Spine",
        blurb: "台灣 ↔ 日本 ↔ 美國西岸的主力貨櫃與空運脊樑。",
      },
      {
        title: "Euro-Gulf Bridge",
        blurb: "德國工業帶連接合灣再轉杜拜再出口網絡。",
      },
      {
        title: "ASEAN Relay",
        blurb: "新加坡節點負責東南亞中轉與溫控貨艙調度。",
      },
    ],
  },
  contracts: {
    code: "03",
    title: "CONTRACTS",
    zh: "智慧契約",
    lead: "加密簽章、履約條件與自動結算。每份契約都是可審計的鏈上作業單。",
    image: "/images/trade-contracts.png",
    features: [
      {
        title: "Smart Escrow",
        blurb: "貨況達標才釋放資金，減少跨境信任成本。",
      },
      {
        title: "Clause Studio",
        blurb: "以模組化條款快速組裝 Incoterms 與罰則。",
      },
      {
        title: "Audit Trail",
        blurb: "完整事件時間軸，供合規與爭議仲裁使用。",
      },
    ],
  },
  partners: {
    code: "04",
    title: "PARTNERS",
    zh: "貿易夥伴",
    lead: "企業、聯盟、運營商與獨立交易員組成的分層生態。找到對的對手方。",
    image: "/images/trade-partners.png",
    features: [
      {
        title: "Corporation Tier",
        blurb: "大型企業帳戶，支援批量採購與框架協議。",
      },
      {
        title: "Alliance Nodes",
        blurb: "跨國聯盟共享信用額度與艙位優先權。",
      },
      {
        title: "Operator Desk",
        blurb: "持牌運營商處理報關、保險與末端配送。",
      },
    ],
  },
  intel: {
    code: "05",
    title: "INTEL",
    zh: "貿易情報",
    lead: "風險雷達、關稅變化、港口壅塞與匯率衝擊——情報台為交易決策護航。",
    image: "/images/trade-intel.png",
    features: [
      {
        title: "Risk Radar",
        blurb: "政治、物流與信用風險的即時疊圖。",
      },
      {
        title: "Tariff Pulse",
        blurb: "追蹤主要市場關稅與原產地規則變動。",
      },
      {
        title: "Port Congestion",
        blurb: "預測港區排隊，提前改線或換運。",
      },
    ],
  },
  invest: {
    code: "06",
    title: "INVEST",
    zh: "資本配置",
    lead: "把流動性注入航線、倉儲、能源與數位雙生基礎設施。",
    image: "/images/trade-invest.png",
    features: [
      {
        title: "Corridor Funds",
        blurb: "投資高流量貿易走廊的收益權與容量擴張。",
      },
      {
        title: "Infra Notes",
        blurb: "倉儲自動化、冷鏈與碼頭設備的證券化產品。",
      },
      {
        title: "Liquidity Pool",
        blurb: "為結算層提供穩定幣與法幣雙軌流動性。",
      },
    ],
  },
} as const;

export const CORRIDORS = [
  { from: "Taiwan", to: "Japan", load: "92%", eta: "18h" },
  { from: "Taiwan", to: "USA", load: "88%", eta: "3d 4h" },
  { from: "Singapore", to: "Dubai", load: "76%", eta: "2d 1h" },
  { from: "Germany", to: "Dubai", load: "81%", eta: "1d 10h" },
  { from: "Japan", to: "USA", load: "85%", eta: "2d 20h" },
  { from: "Taiwan", to: "Singapore", load: "90%", eta: "9h" },
] as const;

export const TICKERS = [
  { symbol: "CU-LME", change: "+1.8%", tone: "up" },
  { symbol: "LNG-ASIA", change: "-0.6%", tone: "down" },
  { symbol: "SEMI-TW", change: "+2.4%", tone: "up" },
  { symbol: "FREIGHT-PX", change: "+0.9%", tone: "up" },
  { symbol: "GOLD-Q", change: "-0.2%", tone: "down" },
  { symbol: "AI-CHIP", change: "+3.1%", tone: "up" },
] as const;
