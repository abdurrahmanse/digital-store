import { getAllOrders } from "@/features/admin/queries";
import { OrdersTable } from "@/features/admin/components/OrdersTable";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function OrdersPage({
  searchParams
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const session = await auth();
  
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const params = await searchParams;
  const page = parseInt(params?.page || "1", 10);
  const orders = await getAllOrders({ page, limit: 10 });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">Orders</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage and view all customer orders</p>
        </div>
      </div>
      <OrdersTable 
        orders={orders.data} 
        currentPage={orders.currentPage}
        totalPages={orders.totalPages}
      />
    </div>
  );
}
