import { QuestionForm } from "@/components/shared/QuestionForm";

export function FaqTab({ productId }: { productId?: string }) {
  return (
    <div className="max-w-md mx-auto py-6 bg-muted/10 p-6 rounded-2xl border border-border mt-4">
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-1">Have a Question?</h3>
        <p className="text-sm text-muted-foreground">Ask us anything about this product.</p>
      </div>
      <QuestionForm productId={productId} />
    </div>
  );
}
