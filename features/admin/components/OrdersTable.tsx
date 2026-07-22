"use client";

import { OrderStatus } from "@prisma/client";
import { toast } from "sonner";
import { useTransition, useState } from "react";
import { DataTable } from "@/components/dashboard/DataTable";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { FilterTabs } from "@/components/dashboard/FilterTabs";

type Order = {
  id: string;
  amount: number;
  status: string;
  createdAt: Date;
  user: {
    email: string;
    name: string | null;
  } | null;
  items: {
    product: {
      name: string;
    };
  }[];
};

export function OrdersTable({ 
  orders,
  currentPage,
  totalPages
}: { 
  orders: Order[];
  currentPage: number;
  totalPages: number;
}) {
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const [isPending, startTransition] = useTransition();

  const filteredOrders = orders.filter(
    (o) => activeTab === "ALL" || o.status === activeTab
  );

  const header = (
    <PageHeader 
      title="All Orders" 
      description="A complete history of all customer purchases."
      action={
        <FilterTabs 
          tabs={["ALL", "PENDING", "PROCESSING", "PAID", "COMPLETED", "CANCELLED"]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      }
    />
  );

  return (
    <DataTable
      header={header}
      columns={["Customer", "Products", "Amount", "Status", "Date", "Actions"]}
      isEmpty={filteredOrders.length === 0}
      emptyMessage="No orders found."
      currentPage={currentPage}
      totalPages={totalPages}
    >
      {filteredOrders.map((order) => (
        <tr key={order.id} className="hover:bg-slate-50/40 transition-colors group cursor-pointer">
          <td className="px-6 py-4">
            <div className="font-medium text-slate-900 dark:text-white">{order.user?.name || "Unknown"}</div>
            <div className="text-slate-400 text-xs mt-0.5">{order.user?.email || "No email"}</div>
          </td>
          <td className="px-6 py-4 text-slate-600 dark:text-slate-400 max-w-[200px] truncate">
            {order.items.map(i => i.product.name).join(", ")}
          </td>
          <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">
            ৳{(order.amount / 100).toFixed(2)}
          </td>
          <td className="px-6 py-4">
            <StatusBadge status={order.status} />
          </td>
          <td className="px-6 py-4 text-slate-500 dark:text-slate-400" suppressHydrationWarning>
            {new Date(order.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            })}
          </td>
          <td className="px-6 py-4 text-right">
            <select 
              disabled={isPending}
              value={order.status}
              onChange={(e) => {
                const newStatus = e.target.value as OrderStatus;
                startTransition(async () => {
                  try {
                    const response = await fetch(`/api/orders/${order.id}/status`, {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ status: newStatus }),
                    });
                    
                    if (response.ok) {
                      toast.success(`Order status updated to ${newStatus}`);
                    } else {
                      const result = await response.json();
                      toast.error(result.error || "Failed to update order status");
                    }
                  } catch (error) {
                    toast.error("Failed to update order status");
                  }
                });
              }}
              onClick={(e) => e.stopPropagation()}
              className="text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer disabled:opacity-50"
            >
              <option value="PENDING">Pending</option>
              <option value="PROCESSING">Processing</option>
              <option value="PAID">Paid</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </td>
        </tr>
      ))}
    </DataTable>
  );
}
