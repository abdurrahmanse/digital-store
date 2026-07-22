"use client";

import { useState } from "react";
import { MessageSquare, Star, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

export interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    name: string | null;
  } | null;
}

interface ReviewsTabProps {
  productId?: string;
  initialReviews: Review[];
  isLoggedIn: boolean;
}

export function ReviewsTab({ productId, initialReviews, isLoggedIn }: ReviewsTabProps) {
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
  );
}
