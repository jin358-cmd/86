import Image from "next/image";
import Link from "next/link";

type PageHeroProps = {
  code: string;
  title: string;
  zh?: string;
  lead: string;
  image: string;
  ctaHref?: string;
  ctaLabel?: string;
};

export function PageHero({
  code,
  title,
  zh,
  lead,
  image,
  ctaHref,
  ctaLabel,
}: PageHeroProps) {
  return (
    <section className="relative min-h-[72vh] overflow-hidden">
      <Image
        src={image}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-gvg-bg via-transparent to-black/40" />

      <div className="relative z-10 mx-auto flex min-h-[72vh] max-w-7xl flex-col justify-end px-4 pb-14 pt-28 md:px-6">
        <p className="font-mono text-xs tracking-[0.35em] text-gvg-cyan">
          MODULE {code}
          {zh ? ` · ${zh}` : ""}
        </p>
        <h1 className="mt-3 max-w-4xl font-display text-4xl tracking-[0.12em] text-gvg-yellow md:text-6xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-gvg-text/90 md:text-lg">
          {lead}
        </p>
        {ctaHref && ctaLabel ? (
          <Link
            href={ctaHref}
            className="mt-8 inline-flex w-fit border border-gvg-yellow bg-gvg-yellow px-6 py-3 font-display text-sm tracking-[0.24em] text-black transition hover:bg-transparent hover:text-gvg-yellow"
          >
            {ctaLabel}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
