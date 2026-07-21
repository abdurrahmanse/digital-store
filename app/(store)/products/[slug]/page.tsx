import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/features/product/components/details/ProductGallery";
import { ProductInfo } from "@/features/product/components/details/ProductInfo";
import { ProductCheckoutCard } from "@/features/product/components/details/ProductCheckoutCard";
import { Container } from "@/components/layout/container";

export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const product = await prisma.product.findUnique({
    where: { slug }
  });

  if (!product) {
    notFound();
  }

  let whatsIncluded: string[] = [];
  if (product.whatsIncluded) {
    whatsIncluded = Array.isArray(product.whatsIncluded) 
      ? product.whatsIncluded as string[] 
      : JSON.parse(product.whatsIncluded as string);
  } else {
    whatsIncluded = [
      "1x Retail License Key",
      "Official Download Link",
      "Lifetime Activation",
      "24/7 Support"
    ];
  }

  return (
    <Container className="py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <ProductGallery imageUrl={product.imageUrl} name={product.name} />

        <div className="flex flex-col">
          <ProductInfo 
            name={product.name} 
            description={product.description || product.shortDescription} 
            productType={product.productType as any} 
            whatsIncluded={whatsIncluded} 
          />
          <div className="mt-10">
            <ProductCheckoutCard 
              productId={product.id} 
              price={product.price} 
              discountPrice={product.discountPrice} 
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
