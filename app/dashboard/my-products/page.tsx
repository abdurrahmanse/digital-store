import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Package, Key, UserCircle, Download, Clock } from "lucide-react";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "My Products | Digital Store",
};

export default async function MyProductsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const orderItems = await prisma.orderItem.findMany({
    where: {
      order: {
        userId: session.user.id,
        status: "COMPLETED",
      }
    },
    include: {
      product: true,
      order: true,
    },
    orderBy: {
      order: {
        createdAt: "desc"
      }
    }
  });

  return (
    <div className="space-y-6">
      <PageHeader 
        title="My Products" 
        description="Access your purchased digital products and delivery information."
      />

      {orderItems.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-950 border border-border rounded-xl">
          <Package className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No products yet</h3>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            You haven't purchased any digital products yet.
          </p>
          <Link href="/products" className="w-fit">
            <Button>
              Browse Store
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {orderItems.map((item) => {
            // Use snapshot info if available, fallback to current product info
            const deliveryType = item.deliveryType || item.product.deliveryType;
            const deliveryInfo = (item.deliveryInfo || item.product.deliveryInfo) as any;

            return (
              <div key={item.id} className="bg-white dark:bg-slate-950 rounded-xl border border-border p-6 shadow-sm flex flex-col">
                <div className="flex justify-between items-start mb-4 pb-4 border-b border-border">
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 dark:text-white">
                      {item.product.name}
                    </h3>
                    <div className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" />
                      Purchased on {new Date(item.order.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <StatusBadge status="COMPLETED" />
                </div>

                <div className="flex-1 space-y-4">
                  {!deliveryInfo ? (
                    <div className="text-sm text-amber-600 bg-amber-50 dark:bg-amber-950/30 p-3 rounded-lg border border-amber-200 dark:border-amber-900">
                      Delivery information is not available yet. Please contact support if this persists.
                    </div>
                  ) : (
                    <>
                      {deliveryType === "LICENSE_KEY" && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                            <Key className="w-4 h-4" /> License Key
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-lg">
                            <code className="font-mono text-primary text-sm break-all">
                              {deliveryInfo.productKey || "No key provided"}
                            </code>
                          </div>
                          {deliveryInfo.instructions && (
                            <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                              <strong>Instructions:</strong>
                              <p className="mt-1 whitespace-pre-wrap">{deliveryInfo.instructions}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {(deliveryType === "ACCOUNT_CREDENTIALS" || deliveryType === "SUBSCRIPTION_ACCESS") && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                            <UserCircle className="w-4 h-4" /> Account Details
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-lg space-y-2">
                            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2">
                              <span className="text-sm text-slate-500">Email/Username:</span>
                              <span className="font-medium text-slate-900 dark:text-white select-all">{deliveryInfo.loginEmail}</span>
                            </div>
                            <div className="flex justify-between items-center pt-1">
                              <span className="text-sm text-slate-500">Password:</span>
                              <span className="font-medium text-slate-900 dark:text-white font-mono select-all">{deliveryInfo.password}</span>
                            </div>
                          </div>
                          {deliveryInfo.duration && (
                            <div className="text-sm text-slate-600 dark:text-slate-400">
                              <strong>Duration:</strong> {deliveryInfo.duration}
                            </div>
                          )}
                          {deliveryInfo.notes && (
                            <div className="text-sm text-slate-600 dark:text-slate-400 mt-2 bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg border border-blue-100 dark:border-blue-900">
                              <strong className="text-blue-800 dark:text-blue-300">Notes:</strong>
                              <p className="mt-1 whitespace-pre-wrap text-blue-700 dark:text-blue-400">{deliveryInfo.notes}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {deliveryType === "DOWNLOAD_FILE" && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                            <Download className="w-4 h-4" /> Download Link
                          </div>
                          {deliveryInfo.downloadLink ? (
                            <a href={deliveryInfo.downloadLink} target="_blank" rel="noopener noreferrer" className="w-full">
                              <Button className="w-full">
                                Download File
                              </Button>
                            </a>
                          ) : (
                            <div className="text-sm text-slate-500">No download link provided.</div>
                          )}
                          
                          {deliveryInfo.instructions && (
                            <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                              <strong>Instructions:</strong>
                              <p className="mt-1 whitespace-pre-wrap">{deliveryInfo.instructions}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
