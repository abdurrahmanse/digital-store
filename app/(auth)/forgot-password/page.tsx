import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Reset Password</h1>
        <p className="text-sm text-slate-500 mt-2">Enter your email and we'll send you a reset link</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Email</label>
          <Input type="email" placeholder="you@example.com" className="h-11 bg-slate-50 border-slate-200" />
        </div>
        
        <Button className="w-full h-12 text-base font-semibold rounded-xl mt-4">Send reset link</Button>
      </div>

      <div className="text-center text-sm text-slate-500 pt-6 mt-6 border-t border-slate-100">
        Remember your password?{" "}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
