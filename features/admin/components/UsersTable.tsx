"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

export function UsersTable({ users }: { users: User[] }) {
  return (
    <Card className="border-slate-200 dark:border-slate-800/60 shadow-none rounded-xl bg-white dark:bg-slate-950 overflow-hidden">
      <CardHeader className="border-b border-slate-100 dark:border-slate-800/50 pb-4">
        <CardTitle className="text-base font-semibold text-slate-800 dark:text-slate-200 tracking-tight">Customers</CardTitle>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage all registered users on your platform.</p>
      </CardHeader>
      <CardContent className="p-0">
        {users.length === 0 ? (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400 text-sm">
            <p>No customers found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-400 border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/50">
                <tr>
                  <th className="px-6 py-4 font-medium tracking-wide">User</th>
                  <th className="px-6 py-4 font-medium tracking-wide">Role</th>
                  <th className="px-6 py-4 font-medium tracking-wide">Total Orders</th>
                  <th className="px-6 py-4 font-medium tracking-wide">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
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
