"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface QuestionFormProps {
  productId?: string;
}

export function QuestionForm({ productId }: QuestionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const question = formData.get("question");

    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, question, productId })
      });

      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 dark:bg-green-900/10 text-green-600 p-4 rounded-lg text-center text-sm border border-green-100 dark:border-green-900/30">
        <p className="font-medium">Question sent! We'll reply soon.</p>
        <button type="button" onClick={() => setIsSubmitted(false)} className="mt-2 text-xs underline">
          Ask another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input 
        name="email"
        type="email" 
        placeholder="Your email address" 
        required 
        className="h-10 text-sm"
      />
      <Textarea 
        name="question"
        placeholder="Ask a question about this product..." 
        required 
        rows={3}
        className="resize-none text-sm"
      />
      <Button 
        type="submit" 
        size="sm"
        className="w-full sm:w-auto font-medium"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Submit Question"}
      </Button>
    </form>
  );
}
