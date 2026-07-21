import { auth } from "@/auth";
import { AdminOverview } from "@/features/dashboard/components/AdminOverview";
import { UserOverview } from "@/features/dashboard/components/UserOverview";
import { redirect } from "next/navigation";

export default async function UnifiedDashboardPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role === "ADMIN") {
    return <AdminOverview />;
  }

  return <UserOverview />;
}
