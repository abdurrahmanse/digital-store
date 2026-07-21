import { getAllOrders } from "@/features/admin/queries";
import { OrdersTable } from "@/features/admin/components/OrdersTable";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const session = await auth();
  
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const orders = await getAllOrders();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Orders</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage and view all customer orders</p>
        </div>
      </div>
      <OrdersTable orders={orders.data} />
    </div>
  );
}
