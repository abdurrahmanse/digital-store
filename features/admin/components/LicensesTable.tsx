import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Key, Upload, Plus } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";

type License = {
  id: string;
  key: string;
  status: string;
  createdAt: Date;
  product: {
    name: string;
  };
  user: {
    name: string | null;
    email: string;
  } | null;
  order: {
    id: string;
    amount: number;
  } | null;
};

export function LicensesTable({ 
  licenses,
  currentPage,
  totalPages
}: { 
  licenses: License[];
  currentPage: number;
  totalPages: number;
}) {
  return (
    <Card className="border-slate-200 dark:border-slate-800/60 shadow-none rounded-xl bg-white dark:bg-slate-950 overflow-hidden">
      <CardHeader className="border-b border-slate-100 dark:border-slate-800/50 pb-4 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base font-semibold text-slate-800 dark:text-slate-200 tracking-tight">License Keys</CardTitle>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage and assign software keys.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 text-slate-600 dark:text-slate-400">
            <Upload className="w-4 h-4" /> Import CSV
          </Button>
          <Button className="bg-slate-900 hover:bg-slate-800 text-white gap-2">
            <Plus className="w-4 h-4" /> Add Key
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {licenses.length === 0 ? (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400 text-sm">
            <p>No license keys found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-400 border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/50">
                <tr>
                  <th className="px-6 py-4 font-medium tracking-wide">License Key</th>
                  <th className="px-6 py-4 font-medium tracking-wide">Product</th>
                  <th className="px-6 py-4 font-medium tracking-wide">Status</th>
                  <th className="px-6 py-4 font-medium tracking-wide">Customer</th>
                  <th className="px-6 py-4 font-medium tracking-wide">Generated On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {licenses.map((license) => (
                  <tr key={license.id} className="hover:bg-slate-50/40 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Key className="w-4 h-4 text-slate-400" />
                        <code className="font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-xs">{license.key}</code>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-medium">
                      {license.product.name}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                        license.status === "AVAILABLE"
                          ? "bg-amber-100 text-amber-700" 
                          : "bg-emerald-100 text-emerald-700"
                      }`}>
                        {license.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900 dark:text-white">{license.user?.name || "Unknown"}</div>
                      <div className="text-slate-400 text-xs mt-0.5">{license.user?.email || "No email"}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400" suppressHydrationWarning>
                      {new Date(license.createdAt).toLocaleDateString("en-US", {
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
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </Card>
  );
}
