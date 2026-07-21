"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { ReactNode } from "react";

interface DataTableProps {
  header: ReactNode;
  columns: string[];
  isEmpty: boolean;
  emptyMessage?: string;
  currentPage?: number;
  totalPages?: number;
  children: ReactNode;
}

export function DataTable({
  header,
  columns,
  isEmpty,
  emptyMessage = "No items found.",
  currentPage = 1,
  totalPages = 1,
  children
}: DataTableProps) {
  return (
    <Card className="border-slate-200 dark:border-slate-800/60 shadow-none rounded-xl bg-white dark:bg-slate-950 overflow-hidden">
      <CardHeader className="border-b border-slate-100 dark:border-slate-800/50 pb-4">
        {header}
      </CardHeader>
      
      <CardContent className="p-0">
        {isEmpty ? (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400 text-sm">
            <p>{emptyMessage}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-400 border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/50">
                <tr>
                  {columns.map((col, i) => (
                    <th key={i} className={`px-6 py-4 font-medium tracking-wide ${i === columns.length - 1 ? "text-right" : ""}`}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {children}
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
