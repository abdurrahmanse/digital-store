import { LoginForm } from "@/features/auth/components/LoginForm";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ registered?: string, reset?: string, verified?: string }> }) {
  const { registered, reset, verified } = await searchParams;

  return (
    <LoginForm 
      registered={registered} 
      reset={reset} 
      verified={verified} 
    />
  );
}
