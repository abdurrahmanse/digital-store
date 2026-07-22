import { Container } from "@/components/layout/container";
import { QuestionForm } from "@/components/shared/QuestionForm";
import { MessageCircleQuestion } from "lucide-react";

export const metadata = {
  title: "Ask a Question | Digital Store",
  description: "Ask us a question and our team will get back to you.",
};

export default function QuestionsPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-muted text-foreground py-12 md:py-16 px-4 relative overflow-hidden border-b border-border">
        <Container className="relative z-10 text-center flex flex-col items-center">
          <div className="bg-primary/10 text-primary p-3 rounded-full mb-4">
            <MessageCircleQuestion className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">Got a Question?</h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            We are here to help. Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </Container>
      </div>

      <Container className="mt-8 relative z-20">
        <div className="max-w-xl mx-auto">
          <QuestionForm />
        </div>
      </Container>
    </div>
  );
}
