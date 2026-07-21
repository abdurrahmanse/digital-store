import { CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <CardTitle className="text-base font-semibold text-slate-800 dark:text-slate-200 tracking-tight">
          {title}
        </CardTitle>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {description}
        </p>
      </div>
      {action && (
        <div className="self-start sm:self-auto">
          {action}
        </div>
      )}
    </div>
  );
}
