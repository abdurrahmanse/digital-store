import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: any[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {products.map((product) => (
        <ProductCard 
          key={product.slug || product.id} 
          title={product.title || product.name}
          price={product.price}
          originalPrice={product.originalPrice || product.discountPrice}
          imageUrl={product.imageUrl}
          slug={product.slug}
        />
      ))}
    </div>
  );
}
