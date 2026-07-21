import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Shield, Zap, Download } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const product = await prisma.product.findUnique({
    where: { slug }
  });

  if (!product) {
    notFound();
  }

  // Handle parsing whatsIncluded and gallery which are Json types
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
    <div className="container px-4 md:px-8 mx-auto py-12 md:py-20 max-w-screen-xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        
        {/* Left Column: Image Gallery */}
        <div className="space-y-6">
          <div className="aspect-[4/3] rounded-3xl bg-muted border border-border flex items-center justify-center overflow-hidden">
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-muted-foreground font-medium">Product Box Art / Image</span>
            )}
          </div>
        </div>

        {/* Right Column: Details & Checkout */}
        <div className="flex flex-col">
          <div className="mb-6">
            <Badge variant="secondary" className="mb-4 text-primary bg-primary/10">
              {product.productType === 'LICENSE' ? 'Software Licenses' : 'Digital Download'}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4 leading-tight">
              {product.name}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {product.description || product.shortDescription}
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-end gap-3 mb-2">
              <span className="text-4xl font-bold text-foreground tracking-tight">৳{(product.price / 100).toFixed(2)}</span>
              {product.discountPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through mb-1">৳{(product.discountPrice / 100).toFixed(2)}</span>
                  <Badge variant="destructive" className="mb-2 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-transparent">Sale</Badge>
                </>
              )}
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-2">
              <Shield className="w-4 h-4 text-emerald-500" /> Secure payment via Stripe
            </p>
          </div>

          <Card className="mb-10 border-border shadow-sm rounded-2xl overflow-hidden bg-muted/30">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4">
                <Link href={`/checkout?productId=${product.id}`} className="w-full">
                  <Button size="lg" className="w-full text-base font-semibold h-14 rounded-xl shadow-sm">
                    Buy Now — ৳{(product.price / 100).toFixed(2)}
                  </Button>
                </Link>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border mt-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                    <Zap className="w-4 h-4 text-amber-500" /> Instant Delivery
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                    <Shield className="w-4 h-4 text-primary" /> Genuine Guarantee
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <div>
              <h3 className="font-semibold text-xl text-foreground mb-5 tracking-tight">What's Included</h3>
              <ul className="space-y-4">
                {whatsIncluded.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <div className="bg-emerald-100 dark:bg-emerald-900/40 rounded-full p-1 mt-0.5 shrink-0">
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-8 border-t border-border">
              <h3 className="font-semibold text-xl text-foreground mb-5 tracking-tight">Delivery Method</h3>
              <div className="flex gap-3">
                <Badge variant="outline" className="px-4 py-1.5 bg-background text-sm font-medium rounded-lg border-primary text-primary">
                  {product.productType === 'LICENSE' ? 'License Key' : 'Digital Download'}
                </Badge>
                <Badge variant="outline" className="px-4 py-1.5 bg-background text-sm font-medium rounded-lg">Email Delivery</Badge>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
