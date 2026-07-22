import { prisma } from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";
import { MessageCircleQuestion, HelpCircle } from "lucide-react";
import Link from "next/link";
import { QuestionActions } from "@/features/dashboard/components/QuestionActions";

export const metadata = {
  title: "Questions | Dashboard",
};

export default async function QuestionsPage() {
  const questions = await prisma.question.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      product: true
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">Questions</h1>
        <p className="text-muted-foreground">View and manage customer product questions.</p>
      </div>

      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 bg-slate-50/50 dark:bg-slate-900/50 uppercase border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Sender</th>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Question</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {questions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <MessageCircleQuestion className="h-8 w-8 text-slate-400" />
                      <p>No questions found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                questions.map((q) => (
                  <tr 
                    key={q.id} 
                    className={`group transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-900/50 ${q.status === "UNANSWERED" ? "bg-slate-50 dark:bg-slate-900/20" : ""}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {q.status === "UNANSWERED" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-600 dark:bg-amber-400"></span>
                          Unanswered
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                          Answered
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <a href={`mailto:${q.email}`} className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
                          {q.email}
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {q.product ? (
                        <Link href={`/products/${q.product.slug}`} className="font-medium hover:underline line-clamp-1 text-slate-900 dark:text-white">
                          {q.product.name}
                        </Link>
                      ) : (
                        <span className="text-muted-foreground italic">General Question</span>
                      )}
                    </td>
                    <td className="px-6 py-4 min-w-[300px] max-w-[400px]">
                      <p className="text-slate-900 dark:text-white leading-relaxed">{q.question}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                      {formatDistanceToNow(new Date(q.createdAt), { addSuffix: true })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <QuestionActions id={q.id} isUnanswered={q.status === "UNANSWERED"} />
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
