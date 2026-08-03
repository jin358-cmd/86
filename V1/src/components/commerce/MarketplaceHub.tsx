"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  AI_SERVICES,
  ORIGINS,
  PRODUCT_CATEGORIES,
  SAMPLE_PRODUCTS,
  SUPPLIER_TYPES,
} from "@/data/commerce";
import { playTone } from "@/lib/audio";

const SUPPLIERS = [
  {
    id: "s1",
    name: "Green Life Co., Ltd.",
    region: "Taiwan",
    image: "/images/categories/cat-health.png",
    tags: ["Verified", "Manufacturer"],
    rating: 4.9,
  },
  {
    id: "s2",
    name: "Bright Source Trading",
    region: "USA",
    image: "/images/categories/cat-home.png",
    tags: ["Verified", "Trading"],
    rating: 4.7,
  },
  {
    id: "s3",
    name: "Pacific Goods",
    region: "Japan",
    image: "/images/categories/cat-food.png",
    tags: ["OEM", "Wholesaler"],
    rating: 4.6,
  },
  {
    id: "s4",
    name: "Vista Fab TW",
    region: "Taiwan",
    image: "/images/categories/cat-hardware.png",
    tags: ["Manufacturer"],
    rating: 4.8,
  },
  {
    id: "s5",
    name: "Orbit Agent SG",
    region: "China",
    image: "/images/categories/cat-building.png",
    tags: ["Verified", "Agent"],
    rating: 4.5,
  },
];

export function MarketplaceHub() {
  const [bg, setBg] = useState("/images/pages/page-marketplace.png");

  return (
    <div className="relative min-h-[100dvh]">
      <div className="pointer-events-none fixed inset-0 z-0">
        <Image
          key={bg}
          src={bg}
          alt=""
          fill
          className="object-cover opacity-22 transition-opacity duration-500"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gvg-bg/65 via-gvg-bg/85 to-gvg-bg" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <p className="font-mono text-xs tracking-[0.35em] text-gvg-cyan">
          Home › Marketplace
        </p>
        <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div>
            <h1 className="font-display text-4xl tracking-[0.12em] text-gvg-yellow md:text-5xl">
              MARKETPLACE
            </h1>
            <p className="mt-3 max-w-xl font-body text-gvg-muted">
              連接全球供應商與買家。精選供應商、熱門商品與分類照片 Banner。
            </p>
          </div>
          <div className="relative aspect-[16/7] overflow-hidden border border-gvg-purple/30 lg:aspect-auto lg:min-h-[140px]">
            <Image
              src="/images/pages/page-marketplace.png"
              alt="Become a seller"
              fill
              className="object-cover"
              sizes="400px"
            />
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-0 flex flex-col justify-center p-5">
              <p className="font-display text-lg tracking-[0.14em] text-white">
                全球商機 · 無限延伸
              </p>
              <Link
                href="/products"
                className="mt-3 inline-flex w-fit border border-gvg-yellow bg-gvg-yellow px-4 py-2 font-hud text-[10px] tracking-[0.2em] text-black"
              >
                成為賣家
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="glass-panel h-fit space-y-5 p-4">
            <div>
              <p className="font-mono text-[10px] tracking-[0.28em] text-gvg-cyan">
                瀏覽分類
              </p>
              <ul className="mt-3 space-y-1">
                {PRODUCT_CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <button
                      type="button"
                      onMouseEnter={() => {
                        setBg(cat.image);
                        playTone("ui");
                      }}
                      className="flex w-full items-center justify-between px-2 py-1.5 text-left font-hud text-xs text-gvg-muted transition hover:bg-gvg-purple/20 hover:text-white"
                    >
                      <span>{cat.zh}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <Link
                href="/products"
                className="mt-2 block px-2 font-mono text-[10px] text-gvg-yellow"
              >
                View More →
              </Link>
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-[0.28em] text-gvg-cyan">
                供應商類型
              </p>
              <ul className="mt-2 space-y-1">
                {SUPPLIER_TYPES.map((t) => (
                  <li key={t} className="font-body text-xs text-gvg-muted">
                    □ {t}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-[0.28em] text-gvg-cyan">
                出貨地區
              </p>
              <ul className="mt-2 space-y-1">
                {ORIGINS.slice(0, 5).map((o) => (
                  <li key={o} className="font-body text-xs text-gvg-muted">
                    □ {o}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div>
            <section>
              <div className="mb-4 flex items-end justify-between">
                <h2 className="font-display text-2xl tracking-[0.14em] text-gvg-yellow">
                  精選供應商
                </h2>
                <Link
                  href="/company"
                  className="font-mono text-[10px] text-gvg-muted hover:text-gvg-purple"
                >
                  ALL SUPPLIERS
                </Link>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                {SUPPLIERS.map((s) => (
                  <article
                    key={s.id}
                    onMouseEnter={() => setBg(s.image)}
                    className="glass-panel overflow-hidden transition hover:border-gvg-purple/50"
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={s.image}
                        alt={s.name}
                        fill
                        className="object-cover"
                        sizes="200px"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-hud text-sm text-gvg-text">{s.name}</h3>
                      <p className="mt-1 font-mono text-[10px] text-gvg-cyan">
                        {s.region} · ★ {s.rating}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {s.tags.map((t) => (
                          <span
                            key={t}
                            className="border border-white/10 px-1.5 py-0.5 font-mono text-[9px] text-gvg-muted"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="mt-10">
              <h2 className="mb-4 font-display text-2xl tracking-[0.14em] text-gvg-yellow">
                熱門商品
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {SAMPLE_PRODUCTS.map((p) => {
                  const cat = PRODUCT_CATEGORIES.find(
                    (c) => c.id === p.categoryId,
                  );
                  return (
                    <article
                      key={p.id}
                      onMouseEnter={() => {
                        if (cat) setBg(cat.image);
                      }}
                      className="glass-panel overflow-hidden"
                    >
                      <div className="relative aspect-square">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          className="object-cover"
                          sizes="280px"
                        />
                      </div>
                      <div className="p-4">
                        <p className="font-mono text-[10px] text-gvg-cyan">
                          {p.region} · {p.category}
                        </p>
                        <h3 className="mt-1 font-display text-base tracking-[0.08em] text-gvg-yellow">
                          {p.name}
                        </h3>
                        <div className="mt-3 flex justify-between font-hud text-sm">
                          <span className="text-white">{p.price}</span>
                          <span className="text-gvg-muted">MOQ {p.moq}</span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            <section className="mt-10">
              <h2 className="mb-4 font-display text-2xl tracking-[0.14em] text-gvg-yellow">
                AI 智慧服務
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {AI_SERVICES.map((svc) => (
                  <button
                    key={svc.id}
                    type="button"
                    onMouseEnter={() => {
                      setBg(svc.image);
                      playTone("ui");
                    }}
                    className="glass-panel p-4 text-left transition hover:border-gvg-purple/50"
                  >
                    <p className="font-mono text-[10px] tracking-[0.2em] text-gvg-cyan">
                      {svc.title}
                    </p>
                    <p className="mt-2 font-hud text-sm text-gvg-text">{svc.zh}</p>
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
