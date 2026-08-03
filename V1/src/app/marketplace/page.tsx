import { PlatformShell } from "@/components/platform/PlatformShell";
import { MarketplaceHub } from "@/components/commerce/MarketplaceHub";

export default function MarketplacePage() {
  return (
    <PlatformShell defaultImage="/images/pages/page-marketplace.png">
      <MarketplaceHub />
    </PlatformShell>
  );
}
