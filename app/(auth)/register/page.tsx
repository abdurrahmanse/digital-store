import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/actions/auth";
import { redirect } from "next/navigation";

export default function RegisterPage() {
  async function handleSubmit(formData: FormData) {
    "use server";
    const res = await registerUser(formData);
    if (res?.success) {
      redirect("/login?registered=true");
    } else {
      console.error(res?.error);
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Create an account</h1>
        <p className="text-sm text-slate-500 mt-2">Get instant access to premium digital products</p>
      </div>

      <form action={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Full Name</label>
          <Input type="text" name="name" required placeholder="John Doe" className="h-11 bg-slate-50 border-slate-200" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Email</label>
          <Input type="email" name="email" required placeholder="you@example.com" className="h-11 bg-slate-50 border-slate-200" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Password</label>
          <Input type="password" name="password" required placeholder="••••••••" className="h-11 bg-slate-50 border-slate-200" />
        </div>
        
        <Button type="submit" className="w-full h-12 text-base font-semibold rounded-xl mt-4">Create account</Button>
      </form>

      <div className="text-center text-sm text-slate-500 pt-6 mt-6 border-t border-slate-100">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
