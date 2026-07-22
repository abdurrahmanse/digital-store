"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { toast } from "sonner";

function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [loading, setLoading] = useState(false);

  if (!email) {
    router.push("/register");
    return null;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const token = formData.get("token") as string;
    
    try {
      const response = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, type: "registration" })
      });
      
      const res = await response.json();
      
      if (response.ok) {
        router.push("/login?verified=true");
      } else {
        toast.error(res.error || "Verification failed");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">Verify Your Email</h1>
        <p className="text-sm text-muted-foreground mt-2">
          We sent a 6-digit verification code to <strong>{email}</strong>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="email" value={email} />
        
        <div className="space-y-2">
          <label htmlFor="token" className="text-sm font-semibold text-foreground">6-Digit Code</label>
          <Input 
            id="token" 
            name="token" 
            type="text" 
            maxLength={6} 
            required 
            placeholder="123456" 
            className="h-11 bg-background border-input text-center tracking-widest text-lg" 
          />
        </div>
        
        <Button type="submit" disabled={loading} className="w-full h-12 text-base font-semibold rounded-xl mt-4">
          {loading ? "Verifying..." : "Verify Account"}
        </Button>
      </form>

      <div className="text-center text-sm text-muted-foreground pt-6 mt-6 border-t border-border">
        Didn't receive the code?{" "}
        <Link href="/register" className="font-semibold text-primary hover:underline">
          Register again
        </Link>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
      <VerifyEmailForm />
    </Suspense>
  );
}
