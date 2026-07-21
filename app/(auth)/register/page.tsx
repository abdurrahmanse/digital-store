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
      if (res.pendingVerification) {
        const email = formData.get("email") as string;
        redirect(`/verify-email?email=${encodeURIComponent(email)}`);
      } else {
        redirect("/login?registered=true");
      }
    } else {
      // In a real app we'd show this error in the UI
      console.error(res?.error);
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Create an account</h1>
        <p className="text-sm text-muted-foreground mt-2">Get instant access to premium digital products</p>
      </div>

      <form action={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Full Name</label>
          <Input type="text" name="name" required placeholder="John Doe" className="h-11 bg-background border-input" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Email</label>
          <Input type="email" name="email" required placeholder="you@example.com" className="h-11 bg-background border-input" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Password</label>
          <Input type="password" name="password" required placeholder="••••••••" className="h-11 bg-background border-input" />
        </div>
        
        <Button type="submit" className="w-full h-12 text-base font-semibold rounded-xl mt-4">Create account</Button>
      </form>

      <div className="text-center text-sm text-muted-foreground pt-6 mt-6 border-t border-border">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
