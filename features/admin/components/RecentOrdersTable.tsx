"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

type Order = {
  id: string;
  amount: number;
  createdAt: Date;
  status: string;
  user: {
    email: string;
    name: string | null;
  } | null;
};

interface RecentOrdersTableProps {
  orders: Order[];
}

export function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="h-full"
    >
      <Card className="border-slate-200 dark:border-slate-800/60 shadow-none h-full rounded-xl bg-white dark:bg-slate-950">
        <CardHeader className="border-b border-slate-100 dark:border-slate-800/50 pb-4">
          <CardTitle className="text-base font-semibold text-slate-800 dark:text-slate-200 tracking-tight">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {orders.length === 0 ? (
            <div className="p-12 text-center text-slate-500 dark:text-slate-400 text-sm">
              <p>No orders yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-400 border-b border-slate-100 dark:border-slate-800/50">
                  <tr>
                    <th className="px-6 py-4 font-medium tracking-wide">Customer</th>
                    <th className="px-6 py-4 font-medium tracking-wide">Amount</th>
                    <th className="px-6 py-4 font-medium tracking-wide">Status</th>
                    <th className="px-6 py-4 font-medium tracking-wide">Date</th>
                  </tr>
                </thead>
                <motion.tbody 
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="divide-y divide-slate-100 dark:divide-slate-800"
                >
                  {orders.map((order) => (
                    <motion.tr 
                      variants={item}
                      key={order.id} 
                      className="hover:bg-slate-50/40 dark:hover:bg-slate-800/40 transition-colors group"
                    >
                      <td className="px-6 py-4 text-slate-900 dark:text-white">
                        <div className="font-medium text-slate-800 dark:text-slate-200">{order.user?.name || "Unknown"}</div>
                        <div className="text-slate-400 text-xs mt-0.5">{order.user?.email || "No email"}</div>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">
                        ৳{(order.amount / 100).toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-medium ${
                          order.status === "COMPLETED" 
                            ? "text-emerald-600"
                            : order.status === "PENDING"
                            ? "text-amber-600"
                            : "text-rose-600"
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
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
