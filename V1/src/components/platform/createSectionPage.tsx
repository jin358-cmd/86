import { SectionPage } from "@/components/platform/SectionPage";
import { PlatformShell } from "@/components/platform/PlatformShell";
import { PAGES } from "@/data/architecture";
import { PAGE_IMAGES } from "@/data/commerce";

export function createSectionPage(href: string) {
  const page = PAGES.find((p) => p.href === href);
  if (!page) {
    throw new Error(`Missing page config for ${href}`);
  }

  return function GeneratedPage() {
    return (
      <PlatformShell defaultImage={PAGE_IMAGES[href]}>
        <SectionPage page={page} />
      </PlatformShell>
    );
  };
}
