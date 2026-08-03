"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  ORIGINS,
  PRODUCT_CATEGORIES,
  SAMPLE_PRODUCTS,
  SELLER_ROLES,
  SUPPLIER_TYPES,
  type Product,
  type SellerRole,
} from "@/data/commerce";
import { playTone } from "@/lib/audio";

const ROLE_LABEL: Record<SellerRole, string> = {
  manufacturer: "廠家",
  agent: "代理",
  distributor: "經銷商",
};

export function ProductCenter() {
  const [products, setProducts] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [activeCat, setActiveCat] = useState(PRODUCT_CATEGORIES[0].id);
  const [bgImage, setBgImage] = useState(PRODUCT_CATEGORIES[0].image);
  const [role, setRole] = useState<SellerRole>("manufacturer");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [moq, setMoq] = useState("");
  const [seller, setSeller] = useState("");
  const [region, setRegion] = useState("Taiwan");
  const [message, setMessage] = useState("");
  const [supplierFilters, setSupplierFilters] = useState<string[]>([]);
  const [originFilters, setOriginFilters] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState("0");
  const [priceMax, setPriceMax] = useState("2000");

  const active = useMemo(
    () =>
      PRODUCT_CATEGORIES.find((c) => c.id === activeCat) ??
      PRODUCT_CATEGORIES[0],
    [activeCat],
  );

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (p.categoryId !== activeCat) return false;
      if (originFilters.length && !originFilters.includes(p.region)) return false;
      return true;
    });
  }, [products, activeCat, originFilters]);

  useEffect(() => {
    setBgImage(active.image);
  }, [active]);

  const switchCategory = (id: string, image: string) => {
    setActiveCat(id);
    setBgImage(image);
    playTone("ui");
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !seller.trim()) {
      setMessage("請至少填寫商品名稱與賣家名稱。");
      playTone("warn");
      return;
    }

    const next: Product = {
      id: `sku-${Date.now()}`,
      name: name.trim(),
      category: active.name,
      categoryId: active.id,
      price: price.trim() || "詢價",
      moq: moq.trim() || "1 pcs",
      seller: seller.trim(),
      role,
      region,
      image: "/images/products/product-device.png",
      tags: ["New", ROLE_LABEL[role]],
    };

    setProducts((prev) => [next, ...prev]);
    setName("");
    setPrice("");
    setMoq("");
    setMessage(`已送出上架申請：${next.name}（待審核後同步至商城）`);
    playTone("confirm");
  };

  const toggleFilter = (
    value: string,
    list: string[],
    setList: (v: string[]) => void,
  ) => {
    playTone("ui");
    setList(
      list.includes(value) ? list.filter((x) => x !== value) : [...list, value],
    );
  };

  return (
    <div className="relative min-h-[100dvh]">
      {/* Hover / category-driven background plane */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <Image
          key={bgImage}
          src={bgImage}
          alt=""
          fill
          className="object-cover opacity-25 transition-opacity duration-500"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gvg-bg/70 via-gvg-bg/85 to-gvg-bg" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,255,0.18),transparent_40%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <p className="font-mono text-xs tracking-[0.35em] text-gvg-cyan">
          MODULE 07C · PRODUCT CENTER
        </p>
        <h1 className="mt-3 font-display text-4xl tracking-[0.12em] text-gvg-yellow md:text-5xl">
          PRODUCT CENTER
        </h1>
        <p className="mt-2 font-hud text-lg text-gvg-text">商品中心</p>
        <p className="mt-4 max-w-3xl font-body text-gvg-muted">
          瀏覽分類使用實景照片 Banner。滑鼠移至分類時背景同步切換。廠家 /
          代理 / 經銷可直接上架。
        </p>

        {/* Photo category banners */}
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onMouseEnter={() => {
                setBgImage(cat.image);
                playTone("ui");
              }}
              onFocus={() => setBgImage(cat.image)}
              onClick={() => switchCategory(cat.id, cat.image)}
              className={`group relative aspect-[16/7] overflow-hidden border text-left transition ${
                activeCat === cat.id
                  ? "border-gvg-yellow/80"
                  : "border-white/10 hover:border-gvg-purple/60"
              }`}
            >
              <Image
                src={cat.image}
                alt={cat.zh}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <p className="font-mono text-[10px] tracking-[0.24em] text-gvg-cyan">
                  {cat.name}
                </p>
                <p className="font-display text-xl tracking-[0.14em] text-white">
                  {cat.zh}
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* Sidebar filters */}
          <aside className="glass-panel h-fit space-y-6 p-4">
            <div>
              <p className="font-mono text-[10px] tracking-[0.28em] text-gvg-cyan">
                瀏覽分類
              </p>
              <ul className="mt-3 space-y-1">
                {PRODUCT_CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setBgImage(cat.image)}
                      onClick={() => switchCategory(cat.id, cat.image)}
                      className={`flex w-full items-center justify-between px-2 py-1.5 text-left font-hud text-xs tracking-[0.12em] transition ${
                        activeCat === cat.id
                          ? "bg-gvg-yellow text-black"
                          : "text-gvg-muted hover:text-gvg-purple"
                      }`}
                    >
                      <span>{cat.zh}</span>
                      <span className="font-mono text-[9px] opacity-70">
                        {cat.name.split(" ")[0]}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <FilterBlock title="供應商類型">
              {SUPPLIER_TYPES.map((t) => (
                <label
                  key={t}
                  className="flex cursor-pointer items-center gap-2 font-body text-xs text-gvg-muted"
                >
                  <input
                    type="checkbox"
                    checked={supplierFilters.includes(t)}
                    onChange={() =>
                      toggleFilter(t, supplierFilters, setSupplierFilters)
                    }
                    className="accent-[#a855ff]"
                  />
                  {t}
                </label>
              ))}
            </FilterBlock>

            <FilterBlock title="出貨地區">
              {ORIGINS.map((o) => (
                <label
                  key={o}
                  className="flex cursor-pointer items-center gap-2 font-body text-xs text-gvg-muted"
                >
                  <input
                    type="checkbox"
                    checked={originFilters.includes(o)}
                    onChange={() =>
                      toggleFilter(o, originFilters, setOriginFilters)
                    }
                    className="accent-[#a855ff]"
                  />
                  {o}
                </label>
              ))}
            </FilterBlock>

            <FilterBlock title="價格區間 (USD)">
              <div className="flex items-center gap-2">
                <input
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  className="w-full border border-white/15 bg-black/40 px-2 py-1 font-mono text-xs text-gvg-text"
                />
                <span className="text-gvg-muted">–</span>
                <input
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  className="w-full border border-white/15 bg-black/40 px-2 py-1 font-mono text-xs text-gvg-text"
                />
              </div>
              <button
                type="button"
                onClick={() => playTone("confirm")}
                className="mt-2 w-full border border-gvg-purple/50 py-1.5 font-hud text-[10px] tracking-[0.2em] text-gvg-purple"
              >
                確定
              </button>
            </FilterBlock>
          </aside>

          <div>
            {/* Active category hero banner (photo) */}
            <div className="relative mb-6 aspect-[21/7] overflow-hidden border border-white/10">
              <Image
                src={active.image}
                alt={active.zh}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-8">
                <p className="font-mono text-[10px] tracking-[0.3em] text-gvg-cyan">
                  CATEGORY BANNER · PHOTO
                </p>
                <h2 className="mt-1 font-display text-3xl tracking-[0.14em] text-white md:text-4xl">
                  {active.zh}
                </h2>
                <p className="mt-1 max-w-md font-body text-sm text-gvg-muted">
                  {active.name} · 品質嚴選 · 全球出貨
                </p>
              </div>
            </div>

            {active.subs ? (
              <div className="mb-6 flex flex-wrap gap-2">
                {["全部", ...active.subs].map((sub) => (
                  <span
                    key={sub}
                    className="border border-white/10 bg-black/40 px-3 py-1.5 font-hud text-[10px] tracking-[0.14em] text-gvg-muted"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            ) : null}

            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-xs tracking-wider text-gvg-muted">
                TOTAL {filtered.length} 件商品
              </p>
              <div className="flex gap-2">
                {SELLER_ROLES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setRole(item.id);
                      playTone("ui");
                    }}
                    className={`px-3 py-1 font-hud text-[10px] tracking-[0.16em] transition ${
                      role === item.id
                        ? "bg-gvg-yellow text-black"
                        : "border border-white/15 text-gvg-muted hover:text-gvg-purple"
                    }`}
                  >
                    {item.zh}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((product) => (
                <article
                  key={product.id}
                  className="glass-panel overflow-hidden transition hover:border-gvg-purple/40"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 280px"
                    />
                    {product.tags[0] ? (
                      <span className="absolute left-2 top-2 bg-gvg-danger/90 px-2 py-0.5 font-mono text-[9px] tracking-wider text-white">
                        {product.tags[0]}
                      </span>
                    ) : null}
                  </div>
                  <div className="p-4">
                    <p className="font-mono text-[10px] tracking-[0.2em] text-gvg-cyan">
                      {ROLE_LABEL[product.role]} · {product.region}
                    </p>
                    <h3 className="mt-1 font-display text-base tracking-[0.08em] text-gvg-yellow">
                      {product.name}
                    </h3>
                    <p className="mt-1 font-body text-xs text-gvg-muted">
                      {product.seller}
                    </p>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <span className="font-hud text-sm text-white">
                        {product.price}
                      </span>
                      <span className="font-mono text-[10px] text-gvg-muted">
                        MOQ {product.moq}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
              {filtered.length === 0 ? (
                <p className="col-span-full font-body text-sm text-gvg-muted">
                  此分類暫無商品，歡迎上架。
                </p>
              ) : null}
            </div>

            {/* Listing form */}
            <form
              onSubmit={onSubmit}
              className="glass-panel mt-10 space-y-4 border-gvg-purple/20 p-5"
            >
              <p className="font-mono text-[10px] tracking-[0.28em] text-gvg-purple">
                DIRECT LISTING · {ROLE_LABEL[role]} · {active.zh}
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="font-hud text-xs tracking-[0.16em] text-gvg-muted">
                    商品名稱
                  </span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full border border-white/15 bg-black/40 px-3 py-2 font-body text-sm text-gvg-text outline-none focus:border-gvg-purple/60"
                    placeholder="e.g. L-Arginine 1000mg"
                  />
                </label>
                <label className="block">
                  <span className="font-hud text-xs tracking-[0.16em] text-gvg-muted">
                    賣家名稱
                  </span>
                  <input
                    value={seller}
                    onChange={(e) => setSeller(e.target.value)}
                    className="mt-1 w-full border border-white/15 bg-black/40 px-3 py-2 font-body text-sm text-gvg-text outline-none focus:border-gvg-purple/60"
                  />
                </label>
                <label className="block">
                  <span className="font-hud text-xs tracking-[0.16em] text-gvg-muted">
                    出貨地區
                  </span>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="mt-1 w-full border border-white/15 bg-black/40 px-3 py-2 font-body text-sm text-gvg-text outline-none focus:border-gvg-purple/60"
                  >
                    {ORIGINS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="font-hud text-xs tracking-[0.16em] text-gvg-muted">
                    報價
                  </span>
                  <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="mt-1 w-full border border-white/15 bg-black/40 px-3 py-2 font-body text-sm text-gvg-text outline-none focus:border-gvg-purple/60"
                    placeholder="US$ 18.90"
                  />
                </label>
                <label className="block">
                  <span className="font-hud text-xs tracking-[0.16em] text-gvg-muted">
                    MOQ
                  </span>
                  <input
                    value={moq}
                    onChange={(e) => setMoq(e.target.value)}
                    className="mt-1 w-full border border-white/15 bg-black/40 px-3 py-2 font-body text-sm text-gvg-text outline-none focus:border-gvg-purple/60"
                    placeholder="24 pcs"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="w-full border border-gvg-yellow bg-gvg-yellow px-4 py-3 font-display text-sm tracking-[0.22em] text-black transition hover:bg-transparent hover:text-gvg-yellow"
              >
                SUBMIT LISTING
              </button>
              {message ? (
                <p className="font-mono text-xs tracking-wider text-gvg-cyan">
                  {message}
                </p>
              ) : null}
              <p className="font-body text-xs text-gvg-muted">
                前往{" "}
                <Link href="/marketplace" className="text-gvg-yellow underline">
                  Marketplace
                </Link>{" "}
                或{" "}
                <Link href="/commerce" className="text-gvg-yellow underline">
                  電商架構
                </Link>
                。
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.28em] text-gvg-cyan">
        {title}
      </p>
      <div className="mt-3 space-y-2">{children}</div>
    </div>
  );
}
