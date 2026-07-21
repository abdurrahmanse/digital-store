import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { verifyRegistrationOTP } from "@/features/auth/actions/otp";
import { redirect } from "next/navigation";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { email } = await searchParams;

  if (!email || typeof email !== "string") {
    redirect("/register");
  }

  async function handleSubmit(formData: FormData) {
    "use server";
    const res = await verifyRegistrationOTP(formData);
    if (res?.success) {
      redirect("/login?verified=true");
    } else {
      console.error(res?.error);
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Verify Your Email</h1>
        <p className="text-sm text-muted-foreground mt-2">
          We sent a 6-digit verification code to <strong>{email}</strong>
        </p>
      </div>

      <form action={handleSubmit} className="space-y-4">
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
        
        <Button type="submit" className="w-full h-12 text-base font-semibold rounded-xl mt-4">
          Verify Account
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
