"use client";

import { useState } from "react";
import { MessageSquare, HelpCircle, FileText, Star, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { QuestionForm } from "@/components/shared/QuestionForm";

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    name: string | null;
  } | null;
}

interface ProductTabsProps {
  description: string | null;
  productId?: string;
  initialReviews?: Review[];
  isLoggedIn?: boolean;
}

export function ProductTabs({ description, productId, initialReviews = [], isLoggedIn = false }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<"details" | "reviews" | "questions">("details");
  
  // Reviews state
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setError("Please log in to leave a review.");
      return;
    }
    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }
    if (!comment.trim()) {
      setError("Please write a comment.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      const res = await fetch(`/api/products/${productId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit review");
      }

      const newReview = await res.json();
      setReviews([newReview, ...reviews]);
      setRating(0);
      setComment("");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <div className="mt-16 lg:mt-24 border-t border-border pt-10">
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto pb-4 border-b border-border gap-6 md:gap-10 hide-scrollbar">
        <button
          onClick={() => setActiveTab("details")}
          className={`flex items-center gap-2 pb-4 text-base font-semibold whitespace-nowrap transition-colors relative ${
            activeTab === "details" ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <FileText className="w-4 h-4" />
          Product Details
          {activeTab === "details" && (
            <div className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-primary rounded-t-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("reviews")}
          className={`flex items-center gap-2 pb-4 text-base font-semibold whitespace-nowrap transition-colors relative ${
            activeTab === "reviews" ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Reviews {reviews.length > 0 && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{reviews.length}</span>}
          {activeTab === "reviews" && (
            <div className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-primary rounded-t-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("questions")}
          className={`flex items-center gap-2 pb-4 text-base font-semibold whitespace-nowrap transition-colors relative ${
            activeTab === "questions" ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          Questions
          {activeTab === "questions" && (
            <div className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-primary rounded-t-full" />
          )}
        </button>
      </div>

      {/* Tab Content */}
      <div className="pt-8 min-h-[300px]">
        {activeTab === "details" && (
          <div className="prose prose-slate dark:prose-invert max-w-none">
            {description ? (
              <div className="space-y-6">
                {description.split('.').map(s => s.trim()).filter(Boolean).map((step, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <div className="text-muted-foreground leading-relaxed pt-1">
                      {step}.
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <FileText className="w-12 h-12 text-muted-foreground/30 mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-1">No description available</h3>
                <p className="text-muted-foreground">More details about this product will be added soon.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-12">
            {/* Reviews List */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold">Customer Reviews</h3>
              
              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-border pb-6 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{review.user?.name || "Anonymous User"}</div>
                        <div className="text-sm text-muted-foreground">{formatDate(review.createdAt)}</div>
                      </div>
                      <div className="flex mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`w-4 h-4 ${star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-muted/30"}`} 
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/20 rounded-2xl border border-dashed border-border">
                  <MessageSquare className="w-12 h-12 text-muted-foreground/30 mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-1">No reviews yet</h3>
                  <p className="text-muted-foreground max-w-sm">Be the first to share your experience with this product.</p>
                </div>
              )}
            </div>

            {/* Write Review Form */}
            <div className="bg-muted/10 p-6 md:p-8 rounded-2xl border border-border">
              <h3 className="text-xl font-bold mb-6">Write a Review</h3>
              
              {!isLoggedIn ? (
                <div className="text-center p-6 bg-background rounded-xl border border-border">
                  <p className="mb-4 text-muted-foreground">You must be logged in to leave a review.</p>
                  <a href="/login" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                    Log In
                  </a>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-6">
                  {error && (
                    <div className="p-3 bg-red-500/10 text-red-500 rounded-md text-sm">
                      {error}
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Rating</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 transition-transform hover:scale-110 focus:outline-none"
                        >
                          <Star 
                            className={`w-8 h-8 transition-colors ${
                              star <= (hoverRating || rating) 
                                ? "text-yellow-400 fill-yellow-400" 
                                : "text-muted/30 hover:text-yellow-400/50"
                            }`} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Your Review</label>
                    <Textarea 
                      placeholder="What did you like or dislike? What did you use this product for?"
                      className="min-h-[120px] resize-y"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting || rating === 0 || !comment.trim()}
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none w-full sm:w-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Review"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {activeTab === "questions" && (
          <div className="max-w-md mx-auto py-6 bg-muted/10 p-6 rounded-2xl border border-border mt-4">
            <div className="mb-4">
              <h3 className="text-lg font-bold mb-1">Have a Question?</h3>
              <p className="text-sm text-muted-foreground">Ask us anything about this product.</p>
            </div>
            <QuestionForm productId={productId} />
          </div>
        )}
      </div>
    </div>
  );
}
