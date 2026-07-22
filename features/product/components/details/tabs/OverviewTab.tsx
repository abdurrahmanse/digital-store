import { FileText } from "lucide-react";

export function OverviewTab({ description }: { description: string | null }) {
  return (
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
          <h3 className="text-lg font-semibold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">No description available</h3>
          <p className="text-muted-foreground">More details about this product will be added soon.</p>
        </div>
      )}
    </div>
  );
}
