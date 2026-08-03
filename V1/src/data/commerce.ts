export type ProductCategory = {
  id: string;
  name: string;
  zh: string;
  image: string;
  subs?: string[];
};

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "health",
    name: "Health Food",
    zh: "保健食品",
    image: "/images/categories/cat-health.png",
    subs: ["男性保健", "女性保健", "維他命", "葉黃素", "關節保健", "益生菌", "魚油"],
  },
  {
    id: "food",
    name: "Food & Drink",
    zh: "食品飲料",
    image: "/images/categories/cat-food.png",
    subs: ["零食", "飲料", "進口食品", "有機食品"],
  },
  {
    id: "home",
    name: "Home Living",
    zh: "居家生活",
    image: "/images/categories/cat-home.png",
    subs: ["家具", "廚房", "收納", "家電"],
  },
  {
    id: "hardware",
    name: "Hardware Tools",
    zh: "五金工具",
    image: "/images/categories/cat-hardware.png",
    subs: ["電動工具", "手工具", "量測", "安全防護"],
  },
  {
    id: "building",
    name: "Building Materials",
    zh: "裝潢建材",
    image: "/images/categories/cat-building.png",
    subs: ["建材", "燈具", "衛浴", "五金配件"],
  },
  {
    id: "auto",
    name: "Auto Supplies",
    zh: "汽車用品",
    image: "/images/categories/cat-auto.png",
    subs: ["車用電子", "保養品", "改裝", "安全配備"],
  },
  {
    id: "office",
    name: "Office Equipment",
    zh: "辦公設備",
    image: "/images/categories/cat-office.png",
    subs: ["桌椅", "事務機", "耗材", "收納"],
  },
  {
    id: "fashion",
    name: "Fashion Clothing",
    zh: "品牌服飾",
    image: "/images/categories/cat-fashion.png",
    subs: ["男裝", "女裝", "配件", "鞋款"],
  },
  {
    id: "daily",
    name: "Daily Necessities",
    zh: "生活雜貨",
    image: "/images/categories/cat-daily.png",
  },
];

export const SUPPLIER_TYPES = [
  "Manufacturer",
  "Trading Company",
  "Brand Owner",
  "Wholesaler",
  "OEM",
] as const;

export const ORIGINS = ["Taiwan", "USA", "China", "Japan", "Korea", "Canada", "New Zealand"] as const;

export const AI_SERVICES = [
  {
    id: "overview",
    title: "Service Overview",
    zh: "服務總覽",
    image: "/images/pages/page-dashboard.png",
  },
  {
    id: "consultant",
    title: "AI Business Consultant",
    zh: "AI 商業顧問",
    image: "/images/pages/page-dashboard.png",
  },
  {
    id: "trends",
    title: "Market Trend Analysis",
    zh: "市場趨勢分析",
    image: "/images/pages/page-trade.png",
  },
  {
    id: "procurement",
    title: "Smart Procurement Assistant",
    zh: "智能採購助理",
    image: "/images/pages/page-marketplace.png",
  },
  {
    id: "supplier",
    title: "Supplier Recommendation",
    zh: "供應商推薦",
    image: "/images/pages/page-company.png",
  },
  {
    id: "price",
    title: "Price Prediction Analysis",
    zh: "價格預測分析",
    image: "/images/pages/page-dashboard.png",
  },
  {
    id: "marketing",
    title: "Smart Marketing Assistant",
    zh: "智慧行銷助手",
    image: "/images/pages/page-products.png",
  },
  {
    id: "translate",
    title: "Document Translation",
    zh: "文件翻譯服務",
    image: "/images/pages/page-company.png",
  },
] as const;

export type SellerRole = "manufacturer" | "agent" | "distributor";

export type Product = {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  price: string;
  moq: string;
  seller: string;
  role: SellerRole;
  region: string;
  image: string;
  tags: string[];
  rating?: number;
};

export const ECOMMERCE_LAYERS = [
  {
    id: "storefront",
    title: "Storefront",
    zh: "前台商城",
    items: ["商品瀏覽", "分類搜尋", "品牌館", "B2B / B2C 雙模式"],
  },
  {
    id: "seller",
    title: "Seller Hub",
    zh: "賣家中心",
    items: ["廠家上架", "代理上架", "經銷上架", "庫存與報價"],
  },
  {
    id: "trade",
    title: "Trade Ops",
    zh: "交易營運",
    items: ["詢價單", "訂單", "物流追蹤", "關稅試算"],
  },
  {
    id: "settle",
    title: "Settlement",
    zh: "結算清算",
    items: ["多幣別付款", "保證金", "對帳", "發票"],
  },
  {
    id: "trust",
    title: "Trust & Compliance",
    zh: "信任合規",
    items: ["賣家認證", "品質稽核", "合約存證", "爭議處理"],
  },
] as const;

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "sku-neo-01",
    name: "NEO Modular Control Unit",
    category: "Industrial IoT",
    categoryId: "hardware",
    price: "US$ 1,280",
    moq: "20 pcs",
    seller: "Vista Fab TW",
    role: "manufacturer",
    region: "Taiwan",
    image: "/images/products/product-device.png",
    tags: ["OEM", "Best Seller"],
    rating: 4.8,
  },
  {
    id: "sku-crate-02",
    name: "Pulse Smart Cargo Crate",
    category: "Logistics Hardware",
    categoryId: "building",
    price: "US$ 460",
    moq: "50 pcs",
    seller: "Orbit Agent SG",
    role: "agent",
    region: "Singapore",
    image: "/images/products/product-container.png",
    tags: ["New", "Verified"],
    rating: 4.6,
  },
  {
    id: "sku-band-03",
    name: "Aether Field Wearable",
    category: "Wearable Tech",
    categoryId: "fashion",
    price: "US$ 189",
    moq: "100 pcs",
    seller: "Nova Distro JP",
    role: "distributor",
    region: "Japan",
    image: "/images/products/product-wearable.png",
    tags: ["B2C", "Hot"],
    rating: 4.7,
  },
  {
    id: "sku-health-04",
    name: "Vital Neon Complex",
    category: "Health Food",
    categoryId: "health",
    price: "US$ 48.90",
    moq: "24 pcs",
    seller: "Green Life Co.",
    role: "manufacturer",
    region: "USA",
    image: "/images/products/product-device.png",
    tags: ["Best Seller", "Verified"],
    rating: 4.9,
  },
  {
    id: "sku-home-05",
    name: "Lumen Home Node",
    category: "Home Living",
    categoryId: "home",
    price: "US$ 220",
    moq: "10 pcs",
    seller: "Bright Source Trading",
    role: "agent",
    region: "Taiwan",
    image: "/images/products/product-container.png",
    tags: ["New"],
    rating: 4.5,
  },
  {
    id: "sku-food-06",
    name: "Orbit Snack Pack",
    category: "Food & Drink",
    categoryId: "food",
    price: "US$ 12.50",
    moq: "100 pcs",
    seller: "Pacific Goods",
    role: "distributor",
    region: "Japan",
    image: "/images/products/product-wearable.png",
    tags: ["Hot", "Ready to ship"],
    rating: 4.4,
  },
];

export const SELLER_ROLES: Array<{
  id: SellerRole;
  title: string;
  zh: string;
  blurb: string;
}> = [
  {
    id: "manufacturer",
    title: "Manufacturer",
    zh: "廠家",
    blurb: "直接上架產線商品、OEM/ODM 規格與 MOQ。",
  },
  {
    id: "agent",
    title: "Agent",
    zh: "代理",
    blurb: "代理授權商品、區域報價與客戶媒合。",
  },
  {
    id: "distributor",
    title: "Distributor",
    zh: "經銷商",
    blurb: "批次進貨、通路鋪貨與在地履約。",
  },
];

export const PAGE_IMAGES: Record<string, string> = {
  "/company": "/images/pages/page-company.png",
  "/why-gvg": "/images/pages/page-company.png",
  "/business": "/images/pages/page-trade.png",
  "/trade": "/images/pages/page-trade.png",
  "/ai-resource": "/images/pages/page-dashboard.png",
  "/marketplace": "/images/pages/page-marketplace.png",
  "/products": "/images/pages/page-products.png",
  "/commerce": "/images/pages/page-marketplace.png",
  "/dashboard": "/images/pages/page-dashboard.png",
  "/global-map": "/images/pages/page-trade.png",
  "/projects": "/images/pages/page-company.png",
  "/resources": "/images/pages/page-dashboard.png",
  "/ai-agents": "/images/pages/page-dashboard.png",
  "/automation": "/images/pages/page-dashboard.png",
  "/analytics": "/images/pages/page-dashboard.png",
  "/members": "/images/pages/page-company.png",
  "/forum": "/images/pages/page-company.png",
  "/events": "/images/pages/page-company.png",
  "/about": "/images/pages/page-company.png",
  "/news": "/images/pages/page-company.png",
  "/contact": "/images/pages/page-company.png",
  "/admin": "/images/pages/page-dashboard.png",
};
