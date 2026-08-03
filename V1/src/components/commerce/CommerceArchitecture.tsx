import Image from "next/image";
import Link from "next/link";
import { ECOMMERCE_LAYERS } from "@/data/commerce";

export function CommerceArchitecture() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
      <p className="font-mono text-xs tracking-[0.35em] text-gvg-cyan">
        MODULE 07B · ECOMMERCE ARCHITECTURE
      </p>
      <h1 className="mt-3 font-display text-4xl tracking-[0.12em] text-gvg-yellow md:text-5xl">
        ECOMMERCE ARCHITECTURE
      </h1>
      <p className="mt-2 font-hud text-lg text-gvg-text">電商平台架構</p>
      <p className="mt-4 max-w-3xl font-body text-gvg-muted">
        以前台商城、賣家中心、交易營運、結算清算與信任合規五層，支撐廠家 /
        代理 / 經銷的全球上架與成交。
      </p>

      <div className="relative mt-8 aspect-[16/7] overflow-hidden border border-white/10">
        <Image
          src="/images/pages/page-marketplace.png"
          alt="Ecommerce architecture"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {ECOMMERCE_LAYERS.map((layer, index) => (
          <article key={layer.id} className="glass-panel p-5">
            <p className="font-mono text-[10px] tracking-[0.28em] text-gvg-cyan">
              LAYER {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-2 font-display text-xl tracking-[0.12em] text-gvg-yellow">
              {layer.title}
            </h2>
            <p className="mt-1 font-hud text-sm text-gvg-text">{layer.zh}</p>
            <ul className="mt-4 space-y-2">
              {layer.items.map((item) => (
                <li
                  key={item}
                  className="border-l border-gvg-yellow/40 pl-3 font-body text-sm text-gvg-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
        <article className="glass-panel flex flex-col justify-between p-5">
          <div>
            <p className="font-mono text-[10px] tracking-[0.28em] text-gvg-cyan">
              NEXT ACTION
            </p>
            <h2 className="mt-2 font-display text-xl tracking-[0.12em] text-gvg-yellow">
              Product Center
            </h2>
            <p className="mt-3 font-body text-sm text-gvg-muted">
              立刻讓廠家、代理、經銷商上架商品，打通賣家中心到商城前台。
            </p>
          </div>
          <Link
            href="/products"
            className="mt-6 inline-flex border border-gvg-yellow bg-gvg-yellow px-4 py-3 font-display text-sm tracking-[0.2em] text-black transition hover:bg-transparent hover:text-gvg-yellow"
          >
            OPEN PRODUCT CENTER
          </Link>
        </article>
      </div>
    </div>
  );
}
