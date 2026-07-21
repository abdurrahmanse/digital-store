"use client";

import { useState, use, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { verifyOTPAndResetPassword } from "@/features/auth/actions/otp";

function VerifyOTPForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    formData.append("email", email);
    
    const res = await verifyOTPAndResetPassword(formData);
    
    setIsLoading(false);
    
    if (res.success) {
      router.push("/login?reset=success");
    } else {
      setError(res.error || "Failed to verify code");
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Enter Reset Code</h1>
        <p className="text-sm text-muted-foreground mt-2">
          We sent a 6-digit code to <strong>{email}</strong>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 text-red-600 text-sm font-medium rounded-lg border border-red-200">
            {error}
          </div>
        )}
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

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-semibold text-foreground">New Password</label>
          <Input 
            id="password" 
            name="password" 
            type="password" 
            required 
            placeholder="••••••••" 
            className="h-11 bg-background border-input" 
          />
        </div>
        
        <Button type="submit" disabled={isLoading} className="w-full h-12 text-base font-semibold rounded-xl mt-4">
          {isLoading ? "Verifying..." : "Reset Password"}
        </Button>
      </form>

      <div className="text-center text-sm text-muted-foreground pt-6 mt-6 border-t border-border">
        Didn't receive the code?{" "}
        <Link href="/forgot-password" className="font-semibold text-primary hover:underline">
          Try again
        </Link>
      </div>
    </div>
  );
}

export default function VerifyOTPPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
      <VerifyOTPForm />
    </Suspense>
  );
}
