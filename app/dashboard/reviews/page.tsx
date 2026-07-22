import { prisma } from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";
import { Star } from "lucide-react";
import Link from "next/link";
import { ReviewActions } from "@/features/dashboard/components/ReviewActions";

export const metadata = {
  title: "Reviews | Dashboard",
};

export default async function ReviewsPage() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      product: true,
      user: true
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Reviews</h1>
        <p className="text-muted-foreground">View and manage customer product reviews.</p>
      </div>

      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 bg-slate-50/50 dark:bg-slate-900/50 uppercase border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4 font-medium">Rating</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Review</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {reviews.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <Star className="h-8 w-8 text-slate-400" />
                      <p>No reviews found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                reviews.map((review) => (
                  <tr 
                    key={review.id} 
                    className="group transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-900/50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-slate-900 dark:text-white">{review.rating}</span>
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-900 dark:text-white">
                          {review.user?.name || "Anonymous"}
                        </span>
                        {review.user?.email && (
                          <span className="text-muted-foreground text-xs">{review.user.email}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/products/${review.product.slug}`} className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline line-clamp-1">
                        {review.product.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 min-w-[300px] max-w-[400px]">
                      <p className="text-slate-900 dark:text-white leading-relaxed line-clamp-2">{review.comment}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                      {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ReviewActions id={review.id} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
