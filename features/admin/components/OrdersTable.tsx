"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

export function OrdersTable({ orders }: { orders: Order[] }) {
  const [activeTab, setActiveTab] = useState<string>("ALL");

  const filteredOrders = orders.filter(
    (o) => activeTab === "ALL" || o.status === activeTab
  );

  return (
    <Card className="border-slate-200 dark:border-slate-800/60 shadow-none rounded-xl bg-white dark:bg-slate-950 overflow-hidden">
      <CardHeader className="border-b border-slate-100 dark:border-slate-800/50 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-base font-semibold text-slate-800 dark:text-slate-200 tracking-tight">All Orders</CardTitle>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">A complete history of all customer purchases.</p>
          </div>
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg self-start">
            {["ALL", "PENDING", "PAID", "COMPLETED", "CANCELLED"].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  activeTab === tab 
                    ? "bg-white dark:bg-slate-950 text-slate-900 dark:text-white shadow-sm" 
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:text-slate-300"
                }`}
              >
                {tab === "ALL" ? "All Orders" : tab.charAt(0) + tab.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400 text-sm">
            <p>No orders found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-400 border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/50">
                <tr>
                  <th className="px-6 py-4 font-medium tracking-wide">Customer</th>
                  <th className="px-6 py-4 font-medium tracking-wide">Products</th>
                  <th className="px-6 py-4 font-medium tracking-wide">Amount</th>
                  <th className="px-6 py-4 font-medium tracking-wide">Status</th>
                  <th className="px-6 py-4 font-medium tracking-wide">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
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
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                        order.status === "COMPLETED" || order.status === "PAID"
                          ? "bg-emerald-100 text-emerald-700" 
                          : order.status === "PENDING"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-rose-100 text-rose-700"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400" suppressHydrationWarning>
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
