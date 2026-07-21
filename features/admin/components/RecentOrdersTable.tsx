"use client";

import { motion } from "framer-motion";
import { DataTable } from "@/components/dashboard/DataTable";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";

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
  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  const header = (
    <PageHeader 
      title="Recent Orders" 
      description=""
    />
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="h-full"
    >
      <DataTable
        header={header}
        columns={["Customer", "Amount", "Status", "Date"]}
        isEmpty={orders.length === 0}
        emptyMessage="No orders yet."
      >
        {orders.map((order, i) => (
          <motion.tr 
            variants={item}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.1 * i }}
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
              <StatusBadge status={order.status} />
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
      </DataTable>
    </motion.div>
  );
}
