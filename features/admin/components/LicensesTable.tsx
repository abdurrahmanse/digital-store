import { Button } from "@/components/ui/button";
import { Key, Upload, Plus } from "lucide-react";
import { DataTable } from "@/components/dashboard/DataTable";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";

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
  const header = (
    <PageHeader 
      title="License Keys" 
      description="Manage and assign software keys."
      action={
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 text-slate-600 dark:text-slate-400">
            <Upload className="w-4 h-4" /> Import CSV
          </Button>
          <Button className="bg-slate-900 hover:bg-slate-800 text-white gap-2">
            <Plus className="w-4 h-4" /> Add Key
          </Button>
        </div>
      }
    />
  );

  return (
    <DataTable
      header={header}
      columns={["License Key", "Product", "Status", "Customer", "Generated On"]}
      isEmpty={licenses.length === 0}
      emptyMessage="No license keys found."
      currentPage={currentPage}
      totalPages={totalPages}
    >
      {licenses.map((license) => (
        <tr key={license.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/50 transition-colors group">
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
            <StatusBadge status={license.status} />
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
    </DataTable>
  );
}
