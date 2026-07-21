import Link from "next/link";
import { Home, LogOut } from "lucide-react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { UnifiedSidebar } from "@/features/dashboard/components/UnifiedSidebar";
import { SignOutButton } from "@/features/dashboard/components/SignOutButton";
import { MobileSidebar } from "@/features/dashboard/components/MobileSidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-300 hidden md:flex flex-col border-r border-slate-200 dark:border-slate-800">
        <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800/50">
          <Link href="/" className="font-bold tracking-tight text-lg text-slate-900 dark:text-white">
            DigitalStore
          </Link>
        </div>
        
        <UnifiedSidebar role={session.user.role} />

        <div className="p-4 border-t border-slate-200 dark:border-slate-800/50">
          <SignOutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="h-16 flex items-center justify-between px-4 md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
          <span className="font-bold text-lg text-slate-900 dark:text-white">DigitalStore</span>
          <MobileSidebar role={session.user.role} />
        </header>
        
        <div className="flex-1 p-4 md:p-8 lg:p-10 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
