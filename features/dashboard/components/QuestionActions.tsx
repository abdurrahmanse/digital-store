"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Reply, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export function QuestionActions({ id, isUnanswered }: { id: string; isUnanswered: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleReply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const replyMessage = formData.get("replyMessage");

    try {
      const res = await fetch(`/api/questions/${id}/reply`, { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ replyMessage })
      });
      
      if (res.ok) {
        toast.success("Reply sent successfully");
        setOpen(false);
        router.refresh();
      } else {
        toast.error("Failed to send reply");
      }
    } catch {
      toast.error("Failed to send reply");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this question?")) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/questions/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Question deleted");
        router.refresh();
      } else {
        toast.error("Failed to delete question");
      }
    } catch {
      toast.error("Failed to delete question");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
      {isUnanswered && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20" 
              title="Reply to question"
            >
              <Reply className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reply to Question</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleReply} className="space-y-4 pt-4">
              <Textarea 
                name="replyMessage"
                placeholder="Type your reply here. This will be emailed to the customer."
                rows={5}
                required
              />
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Sending..." : "Send Reply"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
      
      <Button 
        size="icon" 
        variant="ghost" 
        className="h-8 w-8 text-rose-600 dark:text-rose-400 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-900/20" 
        title="Delete question"
        onClick={handleDelete}
        disabled={loading}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
