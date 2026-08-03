"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import {
  SAMPLE_PRODUCTS,
  SELLER_ROLES,
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
  const [role, setRole] = useState<SellerRole>("manufacturer");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [moq, setMoq] = useState("");
  const [seller, setSeller] = useState("");
  const [region, setRegion] = useState("Taiwan");
  const [message, setMessage] = useState("");

  const counts = useMemo(() => {
    return {
      manufacturer: products.filter((p) => p.role === "manufacturer").length,
      agent: products.filter((p) => p.role === "agent").length,
      distributor: products.filter((p) => p.role === "distributor").length,
    };
  }, [products]);

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
      category: category.trim() || "General",
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
    setCategory("");
    setPrice("");
    setMoq("");
    setMessage(`已送出上架申請：${next.name}（待審核後同步至商城）`);
    playTone("confirm");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
      <p className="font-mono text-xs tracking-[0.35em] text-gvg-cyan">
        MODULE 07C · PRODUCT CENTER
      </p>
      <h1 className="mt-3 font-display text-4xl tracking-[0.12em] text-gvg-yellow md:text-5xl">
        PRODUCT CENTER
      </h1>
      <p className="mt-2 font-hud text-lg text-gvg-text">商品中心</p>
      <p className="mt-4 max-w-3xl font-body text-gvg-muted">
        廠家、代理與經銷商可直接上架商品。上架資料會進入審核流，通過後同步到
        Marketplace 與 Trade 採購通道。
      </p>

      <div className="relative mt-8 aspect-[16/7] overflow-hidden border border-white/10">
        <Image
          src="/images/pages/page-products.png"
          alt="Product Center"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25" />
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-3">
        {SELLER_ROLES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setRole(item.id);
              playTone("ui");
            }}
            className={`glass-panel p-4 text-left transition ${
              role === item.id
                ? "border-gvg-yellow/70"
                : "hover:border-gvg-yellow/40"
            }`}
          >
            <p className="font-mono text-[10px] tracking-[0.24em] text-gvg-cyan">
              {item.title}
            </p>
            <h3 className="mt-2 font-display text-xl tracking-[0.12em] text-gvg-yellow">
              {item.zh}
            </h3>
            <p className="mt-2 font-body text-sm text-gvg-muted">{item.blurb}</p>
            <p className="mt-3 font-mono text-xs text-gvg-text">
              LISTED · {counts[item.id]}
            </p>
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <form onSubmit={onSubmit} className="glass-panel space-y-4 p-5">
          <p className="font-mono text-[10px] tracking-[0.28em] text-gvg-cyan">
            DIRECT LISTING · {ROLE_LABEL[role]}
          </p>
          <label className="block">
            <span className="font-hud text-xs tracking-[0.16em] text-gvg-muted">
              商品名稱
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full border border-white/15 bg-black/40 px-3 py-2 font-body text-sm text-gvg-text outline-none focus:border-gvg-yellow/60"
              placeholder="e.g. Quantum Sensor Kit"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="font-hud text-xs tracking-[0.16em] text-gvg-muted">
                分類
              </span>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 w-full border border-white/15 bg-black/40 px-3 py-2 font-body text-sm text-gvg-text outline-none focus:border-gvg-yellow/60"
                placeholder="Industrial IoT"
              />
            </label>
            <label className="block">
              <span className="font-hud text-xs tracking-[0.16em] text-gvg-muted">
                賣家名稱
              </span>
              <input
                value={seller}
                onChange={(e) => setSeller(e.target.value)}
                className="mt-1 w-full border border-white/15 bg-black/40 px-3 py-2 font-body text-sm text-gvg-text outline-none focus:border-gvg-yellow/60"
                placeholder="Your company"
              />
            </label>
            <label className="block">
              <span className="font-hud text-xs tracking-[0.16em] text-gvg-muted">
                報價
              </span>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 w-full border border-white/15 bg-black/40 px-3 py-2 font-body text-sm text-gvg-text outline-none focus:border-gvg-yellow/60"
                placeholder="US$ 999"
              />
            </label>
            <label className="block">
              <span className="font-hud text-xs tracking-[0.16em] text-gvg-muted">
                MOQ
              </span>
              <input
                value={moq}
                onChange={(e) => setMoq(e.target.value)}
                className="mt-1 w-full border border-white/15 bg-black/40 px-3 py-2 font-body text-sm text-gvg-text outline-none focus:border-gvg-yellow/60"
                placeholder="50 pcs"
              />
            </label>
          </div>
          <label className="block">
            <span className="font-hud text-xs tracking-[0.16em] text-gvg-muted">
              出貨地區
            </span>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="mt-1 w-full border border-white/15 bg-black/40 px-3 py-2 font-body text-sm text-gvg-text outline-none focus:border-gvg-yellow/60"
            >
              {["Taiwan", "USA", "Japan", "Singapore", "Germany", "Dubai"].map(
                (r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ),
              )}
            </select>
          </label>
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
            也可先了解{" "}
            <Link href="/commerce" className="text-gvg-yellow underline">
              電商平台架構
            </Link>{" "}
            或前往{" "}
            <Link href="/marketplace" className="text-gvg-yellow underline">
              全球商城
            </Link>
            。
          </p>
        </form>

        <div>
          <p className="font-mono text-[10px] tracking-[0.28em] text-gvg-cyan">
            LIVE CATALOG
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {products.map((product) => (
              <article key={product.id} className="glass-panel overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 280px"
                  />
                </div>
                <div className="p-4">
                  <p className="font-mono text-[10px] tracking-[0.2em] text-gvg-cyan">
                    {ROLE_LABEL[product.role]} · {product.region}
                  </p>
                  <h3 className="mt-1 font-display text-base tracking-[0.08em] text-gvg-yellow">
                    {product.name}
                  </h3>
                  <p className="mt-1 font-body text-xs text-gvg-muted">
                    {product.category} · {product.seller}
                  </p>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className="font-hud text-sm text-gvg-text">
                      {product.price}
                    </span>
                    <span className="font-mono text-[10px] text-gvg-muted">
                      MOQ {product.moq}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-white/10 px-2 py-0.5 font-mono text-[10px] text-gvg-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
