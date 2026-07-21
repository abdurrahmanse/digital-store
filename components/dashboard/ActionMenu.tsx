"use client";

import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionMenuProps {
  editUrl?: string;
  onDelete?: () => Promise<{ success?: boolean; error?: string }>;
  deleteConfirmMessage?: string;
}

export function ActionMenu({ editUrl, onDelete, deleteConfirmMessage = "Are you sure you want to delete this item?" }: ActionMenuProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (onDelete && confirm(deleteConfirmMessage)) {
      startTransition(async () => {
        try {
          const result = await onDelete();
          if (result && result.success) {
            toast.success("Item deleted successfully.");
          } else if (result && result.error) {
            toast.error(result.error);
          }
        } catch (error) {
          toast.error("An error occurred during deletion.");
        }
      });
    }
  };

  return (
    <div className="flex items-center justify-end gap-2 transition-opacity">
      {editUrl && (
        <Link href={editUrl}>
          <Button variant="outline" size="icon" className="h-8 w-8 text-slate-500 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-800 dark:bg-slate-900 hover:text-slate-900 dark:hover:text-white">
            <Edit2 className="h-4 w-4" />
          </Button>
        </Link>
      )}
      {onDelete && (
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 text-red-500 dark:text-red-400 dark:border-slate-700 dark:bg-slate-900 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/40 dark:hover:text-red-300"
          onClick={handleDelete}
          disabled={isPending}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
