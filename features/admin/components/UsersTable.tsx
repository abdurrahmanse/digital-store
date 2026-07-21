"use client";

import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";
import { deleteCustomer } from "@/features/admin/actions/customers";
import { DataTable } from "@/components/dashboard/DataTable";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { ActionMenu } from "@/components/dashboard/ActionMenu";

type User = {
  id: string;
  name: string | null;
  email: string;
  role: string;
  createdAt: Date;
  _count: {
    orders: number;
  };
};

export function UsersTable({ 
  users,
  currentPage,
  totalPages
}: { 
  users: User[];
  currentPage: number;
  totalPages: number;
}) {
  const handleDelete = async (userId: string) => {
    try {
      await deleteCustomer(userId);
      return { success: true };
    } catch (error: any) {
      return { error: error.message || "Failed to delete customer" };
    }
  };

  const header = (
    <PageHeader 
      title="Customers" 
      description="Manage all registered users on your platform."
    />
  );

  return (
    <DataTable
      header={header}
      columns={["User", "Role", "Total Orders", "Joined", "Actions"]}
      isEmpty={users.length === 0}
      emptyMessage="No customers found."
      currentPage={currentPage}
      totalPages={totalPages}
    >
      {users.map((user) => (
        <tr key={user.id} className="hover:bg-slate-50/40 transition-colors group">
          <td className="px-6 py-4">
            <div className="font-medium text-slate-900 dark:text-white">{user.name || "Unknown"}</div>
            <div className="text-slate-400 text-xs mt-0.5">{user.email}</div>
          </td>
          <td className="px-6 py-4">
            <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
              user.role === "ADMIN" 
                ? "bg-indigo-100 text-indigo-700" 
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            }`}>
              {user.role}
            </span>
          </td>
          <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-medium">
            {user._count.orders} orders
          </td>
          <td className="px-6 py-4 text-slate-500 dark:text-slate-400" suppressHydrationWarning>
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            })}
          </td>
          <td className="px-6 py-4 text-right">
            <div className="flex items-center justify-end gap-2">
              <Link href={`/dashboard/customers/${user.id}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/50"
                  title="View Customer Details"
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </Link>
              {user.role !== "ADMIN" && (
                <ActionMenu 
                  onDelete={() => handleDelete(user.id)}
                  deleteConfirmMessage={`Are you sure you want to delete ${user.name || user.email}? This action cannot be undone.`}
                />
              )}
            </div>
          </td>
        </tr>
      ))}
    </DataTable>
  );
}
