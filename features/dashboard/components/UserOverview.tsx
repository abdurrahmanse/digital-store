import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, ExternalLink, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export async function UserOverview() {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ")[0] || "User";
  const userId = session?.user?.id;

  let totalPurchases = 0;
  let recentOrders: any[] = [];

  if (userId) {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true
          }
        },
        licenses: true
      },
      orderBy: { createdAt: 'desc' }
    });

    recentOrders = orders;
    totalPurchases = orders.length;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 md:space-y-10">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Welcome back, {firstName}!</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your purchases and account settings.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="border-slate-200 dark:border-slate-800 shadow-sm rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Total Purchases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">{totalPurchases}</div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-5">Recent Purchases</h2>
        <Card className="border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden rounded-2xl">
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {recentOrders.length === 0 ? (
              <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                You haven't made any purchases yet.
              </div>
            ) : (
              recentOrders.map((order) => {
                const item = order.items[0]; // Assuming one product per order for simplicity
                if (!item) return null;
                const product = item.product;
                const license = order.licenses.find((l: any) => l.productId === product.id);

                return (
                  <div key={order.id} className="flex flex-col md:flex-row md:items-center justify-between p-5 md:p-6 gap-4 bg-white dark:bg-slate-950 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="w-20 h-16 object-cover bg-slate-100 dark:bg-slate-800 rounded-lg shrink-0 border border-slate-200 dark:border-slate-800" />
                      ) : (
                        <div className="w-20 h-16 bg-slate-100 dark:bg-slate-800 rounded-lg shrink-0 border border-slate-200 dark:border-slate-800"></div>
                      )}
                      
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">{product.name}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                          Purchased on {new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </p>
                        {license && (
                          <div className="mt-2 flex items-center gap-2 text-xs font-mono bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded text-slate-700 dark:text-slate-300 w-fit">
                            <Key className="w-3 h-3" />
                            {license.key}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 self-start md:self-auto mt-2 md:mt-0">
                      <Button variant="outline" size="sm" className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 shadow-sm" disabled={!product.fileUrl}>
                        <Download className="w-4 h-4 mr-2" /> {product.fileUrl ? "Download" : "No file"}
                      </Button>
                      <Link href={`/success?orderId=${order.id}`}>
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-900 dark:text-white">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
