import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Download, Copy, ArrowRight, Package } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/layout/container";

export default async function OrderSuccessPage({ searchParams }: { searchParams: Promise<{ orderId?: string }> }) {
  const params = await searchParams;
  const orderId = params.orderId;

  const order = orderId ? await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  }) : null;

  if (!order || order.items.length === 0) {
    return (
      <Container className="py-16 md:py-24 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">Order Not Found</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-6">We couldn't find the details for this order.</p>
        <Link href="/">
          <Button>Return Home</Button>
        </Link>
      </Container>
    );
  }

  const primaryItem = order.items[0];
  const product = primaryItem.product;

  return (
    <Container className="py-16 md:py-24 max-w-3xl">
      <div className="flex flex-col items-center text-center mb-12">
        <div className="w-24 h-24 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-900/50 rounded-full flex items-center justify-center mb-8 shadow-sm">
          <CheckCircle2 className="w-12 h-12 text-emerald-500" />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">Payment Successful!</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
          Thank you for your purchase. We've sent a receipt to your email. You can access your digital products immediately below.
        </p>
      </div>

      <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm mb-10 overflow-hidden rounded-2xl">
        <div className="bg-slate-50 dark:bg-slate-950 px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Order #{order.id.slice(-8).toUpperCase()}</span>
          <span className="text-sm font-medium text-slate-400 dark:text-slate-500">
            {new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} at {new Date(order.createdAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
          </span>
        </div>
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} className="w-32 h-24 rounded-xl shrink-0 object-cover border border-slate-200 dark:border-slate-700" />
            ) : (
              <div className="w-32 h-24 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shrink-0"></div>
            )}
            <div className="flex-1 text-center md:text-left w-full">
              <h3 className="text-xl font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">{product.name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">Lifetime Access</p>
              
              <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4 border border-slate-200 dark:border-slate-800 flex items-center justify-between w-full">
                <div className="text-left">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Your product access details are ready.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-4">
            <Link href="/dashboard/my-products" className="w-full flex-1">
              <Button size="lg" className="w-full h-14 rounded-xl text-base font-semibold shadow-sm text-white">
                <Package className="w-5 h-5 mr-2" /> View My Products
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full flex-1 h-14 rounded-xl text-base font-semibold bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
              View Documentation
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Link href="/">
          <Button variant="ghost" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium">
             Continue Shopping <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </Container>
  );
}
