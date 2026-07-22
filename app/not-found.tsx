import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="space-y-6">
        <h1 className="text-8xl md:text-9xl font-bold tracking-tighter select-none bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
          404
        </h1>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
            Page not found
          </h2>
          <p className="text-slate-500 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
        </div>

        <div className="pt-8">
          <Link href="/">
            <Button variant="default" className="rounded-full px-8 bg-slate-900 hover:bg-slate-800 text-white">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
