export type SellerRole = "manufacturer" | "agent" | "distributor";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  moq: string;
  seller: string;
  role: SellerRole;
  region: string;
  image: string;
  tags: string[];
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
    price: "US$ 1,280",
    moq: "20 pcs",
    seller: "Vista Fab TW",
    role: "manufacturer",
    region: "Taiwan",
    image: "/images/products/product-device.png",
    tags: ["OEM", "Modbus", "Edge AI"],
  },
  {
    id: "sku-crate-02",
    name: "Pulse Smart Cargo Crate",
    category: "Logistics Hardware",
    price: "US$ 460",
    moq: "50 pcs",
    seller: "Orbit Agent SG",
    role: "agent",
    region: "Singapore",
    image: "/images/products/product-container.png",
    tags: ["Cold-chain", "GPS", "Rental"],
  },
  {
    id: "sku-band-03",
    name: "Aether Field Wearable",
    category: "Wearable Tech",
    price: "US$ 189",
    moq: "100 pcs",
    seller: "Nova Distro JP",
    role: "distributor",
    region: "Japan",
    image: "/images/products/product-wearable.png",
    tags: ["B2C", "Health", "Private Label"],
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
  "/commerce": "/images/pages/page-marketplace.png",
};
