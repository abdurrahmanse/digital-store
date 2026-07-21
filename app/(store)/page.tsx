import { HeroSection } from "@/features/core/components/HeroSection";
import { BestSellingProducts } from "@/features/product/components/BestSellingProducts";
import { TrendingProducts } from "@/features/product/components/TrendingProducts";
import { FeaturedProducts } from "@/features/product/components/FeaturedProducts";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturedProducts />
      <BestSellingProducts />
      <TrendingProducts />
    </div>
  );
}
