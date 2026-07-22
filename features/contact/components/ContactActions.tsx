"use client";

import { Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

export function ContactActions({ id, isUnread }: { id: string; isUnread: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleMarkRead = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/contacts/${id}`, { method: "PATCH" });
      if (res.ok) {
        router.refresh();
      } else {
        toast.error("Failed to mark as read");
      }
    } catch {
      toast.error("Failed to mark as read");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/contacts/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Message deleted");
        router.refresh();
      } else {
        toast.error("Failed to delete message");
      }
    } catch {
      toast.error("Failed to delete message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
      {isUnread && (
        <Button 
          size="icon" 
          variant="ghost" 
          className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20" 
          title="Mark as read"
          onClick={handleMarkRead}
          disabled={loading}
        >
          <Check className="h-4 w-4" />
        </Button>
      )}
      <Button 
        size="icon" 
        variant="ghost" 
        className="h-8 w-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-900/20" 
        title="Delete message"
        onClick={handleDelete}
        disabled={loading}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
