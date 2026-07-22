"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function ReviewActions({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/reviews/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Review deleted");
        router.refresh();
      } else {
        toast.error("Failed to delete review");
      }
    } catch {
      toast.error("Failed to delete review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity">
      <Button 
        size="icon" 
        variant="ghost" 
        className="h-8 w-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-900/20" 
        title="Delete review"
        onClick={handleDelete}
        disabled={loading}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
