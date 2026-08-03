import { PlatformShell } from "@/components/platform/PlatformShell";
import { ProductCenter } from "@/components/commerce/ProductCenter";

export default function ProductsPage() {
  return (
    <PlatformShell defaultImage="/images/categories/cat-health.png">
      <ProductCenter />
    </PlatformShell>
  );
}
