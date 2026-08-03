import Image from "next/image";

export function MediaPanel({
  image,
  caption,
}: {
  image: string;
  caption: string;
}) {
  return (
    <figure className="glass-panel overflow-hidden">
      <div className="relative aspect-[16/9]">
        <Image
          src={image}
          alt={caption}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      </div>
      <figcaption className="border-t border-white/10 px-4 py-3 font-mono text-[10px] tracking-[0.2em] text-gvg-muted">
        {caption}
      </figcaption>
    </figure>
  );
}
