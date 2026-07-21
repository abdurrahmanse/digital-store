import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserPurchases } from "@/features/dashboard/queries";
import { PurchasesList } from "@/features/dashboard/components/PurchasesList";

export default async function PurchasesPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const purchases = await getUserPurchases(session.user.id);

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">My Purchases</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Access your downloads and license keys.</p>
      </div>

      <PurchasesList purchases={purchases} />
    </div>
  );
}
