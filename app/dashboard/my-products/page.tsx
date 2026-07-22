import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Package } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { OrderItemCard } from "@/features/dashboard/components/OrderItemCard";

export const metadata = {
  title: "My Products | Digital Store",
};

export default async function MyProductsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const orderItems = await prisma.orderItem.findMany({
    where: {
      order: {
        userId: session.user.id,
      }
    },
    include: {
      product: true,
      order: true,
    },
    orderBy: {
      order: {
        createdAt: "desc"
      }
    }
  });

  return (
    <div className="space-y-6">
      <PageHeader 
        title="My Products" 
        description="Access your purchased digital products and delivery information."
      />

      {orderItems.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-950 border border-border rounded-xl">
          <Package className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No products yet</h3>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            You haven't purchased any digital products yet.
          </p>
          <Link href="/products" className="w-fit">
            <Button>
              Browse Store
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {orderItems.map((item) => (
            <OrderItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
