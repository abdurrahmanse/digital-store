import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ registered?: string }> }) {
  const { registered } = await searchParams;

  async function handleSubmit(formData: FormData) {
    "use server";
    const res = await loginUser(formData);
    if (res?.success) {
      redirect("/dashboard");
    } else {
      console.error(res?.error);
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Welcome back</h1>
        <p className="text-sm text-slate-500 mt-2">Enter your credentials to access your account</p>
        {registered && (
          <div className="mt-4 p-3 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-lg border border-emerald-200">
            Registration successful! Please sign in.
          </div>
        )}
      </div>

      <form action={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Email</label>
          <Input type="email" name="email" required placeholder="you@example.com" className="h-11 bg-slate-50 border-slate-200" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-700">Password</label>
            <Link href="/forgot-password" className="text-sm font-medium text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input type="password" name="password" required placeholder="••••••••" className="h-11 bg-slate-50 border-slate-200" />
        </div>
        
        <Button type="submit" className="w-full h-12 text-base font-semibold rounded-xl mt-4">Sign in</Button>
      </form>

      <div className="text-center text-sm text-slate-500 pt-6 mt-6 border-t border-slate-100">
        Don't have an account?{" "}
        <Link href="/register" className="font-semibold text-primary hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}
