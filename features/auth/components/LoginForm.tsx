"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface LoginFormProps {
  registered?: string;
  reset?: string;
  verified?: string;
}

export function LoginForm({ registered, reset, verified }: LoginFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      
      const res = await response.json();
      
      if (response.ok && res.success) {
        toast.success("Successfully logged in");
        router.push("/dashboard");
      } else {
        if (res.error === "unverified") {
          router.push(`/verify-email?email=${encodeURIComponent(email)}`);
        } else {
          toast.error(res.error || "Login failed");
        }
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
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Welcome back</h1>
        <p className="text-sm text-muted-foreground mt-2">Enter your credentials to access your account</p>
        
        {registered && (
          <div className="mt-4 p-3 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-lg border border-emerald-200">
            Registration successful! Please sign in.
          </div>
        )}
        {verified && (
          <div className="mt-4 p-3 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-lg border border-emerald-200">
            Email verified successfully! Please sign in.
          </div>
        )}
        {reset === "success" && (
          <div className="mt-4 p-3 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-lg border border-indigo-200">
            Password reset successful! Please sign in with your new password.
          </div>
        )}
      </div>

      <form action={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Email</label>
          <Input type="email" name="email" required placeholder="you@example.com" className="h-11 bg-background border-input" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-foreground">Password</label>
            <Link href="/forgot-password" className="text-sm font-medium text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input type="password" name="password" required placeholder="••••••••" className="h-11 bg-background border-input" />
        </div>
        
        <Button type="submit" isLoading={loading} className="w-full h-12 text-base font-semibold rounded-xl mt-4">
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <div className="text-center text-sm text-muted-foreground pt-6 mt-6 border-t border-border">
        Don't have an account?{" "}
        <Link href="/register" className="font-semibold text-primary hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}
