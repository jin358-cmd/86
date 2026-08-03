import { PlatformShell } from "@/components/platform/PlatformShell";
import { MarketplaceHub } from "@/components/commerce/MarketplaceHub";

export default function MarketplacePage() {
  return (
    <PlatformShell defaultImage="/images/market/market-hero.png">
      <MarketplaceHub />
    </PlatformShell>
  );
}
