import { SectionPage } from "@/components/platform/SectionPage";
import { PlatformShell } from "@/components/platform/PlatformShell";
import { PAGES } from "@/data/architecture";

export function createSectionPage(href: string) {
  const page = PAGES.find((p) => p.href === href);
  if (!page) {
    throw new Error(`Missing page config for ${href}`);
  }

  return function GeneratedPage() {
    return (
      <PlatformShell>
        <SectionPage page={page} />
      </PlatformShell>
    );
  };
}
