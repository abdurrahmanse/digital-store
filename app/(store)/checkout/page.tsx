import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { CheckoutForm } from "@/features/checkout/components/CheckoutForm";
import { CheckoutSummary } from "@/features/checkout/components/CheckoutSummary";
import { Container } from "@/components/layout/container";
import { auth } from "@/auth";

export default async function CheckoutPage({ searchParams }: { searchParams: Promise<{ productId?: string }> }) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/checkout");
  }

  const params = await searchParams;
  const productId = params.productId;
  
  const product = productId ? await prisma.product.findUnique({
    where: { id: productId }
  }) : null;

  if (productId && !product) {
    return (
      <Container className="py-12 md:py-20 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">Product Not Found</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-6">The product you are trying to checkout does not exist or was not specified.</p>
        <Link href="/">
          <Button>Return Home</Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-12 md:py-20 max-w-5xl">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">Secure Checkout</h1>
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
    </Container>
  );
}
