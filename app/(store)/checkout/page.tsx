import Link from "next/link";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { CheckoutForm } from "@/features/checkout/components/CheckoutForm";
import { CheckoutSummary } from "@/features/checkout/components/CheckoutSummary";

export default async function CheckoutPage({ searchParams }: { searchParams: Promise<{ productId?: string }> }) {
  const params = await searchParams;
  const productId = params.productId;
  
  const product = productId ? await prisma.product.findUnique({
    where: { id: productId }
  }) : null;

  if (!product) {
    return (
      <div className="container px-4 md:px-8 mx-auto py-12 md:py-20 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">Product Not Found</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-6">The product you are trying to checkout does not exist or was not specified.</p>
        <Link href="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container px-4 md:px-8 mx-auto py-12 md:py-20 max-w-5xl">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">Secure Checkout</h1>
        <p className="text-slate-500 dark:text-slate-400">Complete your purchase to get instant access.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7">
          <CheckoutForm />
        </div>

        <div className="lg:col-span-5">
          <CheckoutSummary product={product} />
        </div>
      </div>
    </div>
  );
}
