import { HeroSection } from "@/features/core/components/HeroSection";
import { FeaturesSection } from "@/features/core/components/FeaturesSection";
import { FeaturedProducts } from "@/features/product/components/FeaturedProducts";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <FeaturedProducts />
    </div>
  );
}
