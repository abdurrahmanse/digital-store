import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard, ShoppingBag, Truck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const { id } = await params;

  // Since our 'purchase' ID is actually the OrderItem ID, we fetch the OrderItem
  const orderItem = await prisma.orderItem.findUnique({
    where: {
      id: id,
      order: {
        userId: session.user.id,
      }
    },
    include: {
      order: true,
      product: true,
    }
  });

  if (!orderItem) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/purchases">
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">Order Details</h1>
          <p className="text-sm text-slate-500">Order #{orderItem.order.id.slice(-8).toUpperCase()}</p>
        </div>
      </div>

      <Card className="border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
        <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 rounded-t-2xl">
          <CardTitle className="text-lg flex justify-between items-center">
            <span>Item Summary</span>
            <span className={`px-2.5 py-1 text-xs font-bold tracking-wider rounded-md uppercase ${
                orderItem.order.status === "COMPLETED" || orderItem.order.status === "PAID"
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" 
                  : orderItem.order.status === "PROCESSING"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  : orderItem.order.status === "PENDING"
                  ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                  : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
              }`}>
              {orderItem.order.status}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-full sm:w-32 h-24 relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 flex-shrink-0 bg-slate-100 dark:bg-slate-900">
              {orderItem.product.imageUrl ? (
                <Image src={orderItem.product.imageUrl} alt={orderItem.product.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">No image</div>
              )}
            </div>
            
            <div className="flex-1 space-y-2">
              <h3 className="font-semibold text-lg bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">{orderItem.product.name}</h3>
              <p className="text-sm text-slate-500 line-clamp-2">{orderItem.product.description}</p>
              
              <div className="pt-2 flex items-center justify-between text-sm">
                <span className="text-slate-500">Price Paid:</span>
                <span className="font-semibold">৳{(orderItem.price / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-primary" />
              Order Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Order ID</span>
              <span className="font-medium text-right break-all">{orderItem.order.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Placed On</span>
              <span className="font-medium">
                {new Date(orderItem.order.createdAt).toLocaleDateString("en-US", {
                  year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Order Total</span>
              <span className="font-medium">৳{(orderItem.order.amount / 100).toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-primary" />
              Payment Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Payment Status</span>
              <span className="font-medium">
                {orderItem.order.status === "COMPLETED" || orderItem.order.status === "PAID" 
                  ? "Paid" 
                  : orderItem.order.status === "PENDING"
                  ? "Awaiting Payment"
                  : orderItem.order.status}
              </span>
            </div>
            
            {orderItem.order.status === "PENDING" && (
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <Link href={`/checkout?productId=${orderItem.product.id}`}>
                  <Button className="w-full">Continue to Payment</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
