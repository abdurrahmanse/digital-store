import { Package, Key, UserCircle, Download, Clock } from "lucide-react";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";

interface OrderItemCardProps {
  item: any;
}

export function OrderItemCard({ item }: OrderItemCardProps) {
  // Use snapshot info if available, fallback to current product info
  const deliveryType = item.deliveryType || item.product.deliveryType;
  const deliveryInfo = (item.deliveryInfo || item.product.deliveryInfo) as any;
  const isCompleted = item.order.status === "COMPLETED";

  return (
    <div className="bg-white dark:bg-slate-950 rounded-xl border border-border p-6 shadow-sm flex flex-col">
      <div className="flex justify-between items-start mb-4 pb-4 border-b border-border">
        <div className="flex gap-4 items-center">
          {item.product.imageUrl ? (
            <img src={item.product.imageUrl} alt={item.product.name} className="w-14 h-14 rounded-lg object-cover bg-slate-100 dark:bg-slate-900 border border-border shrink-0" />
          ) : (
            <div className="w-14 h-14 rounded-lg bg-slate-100 dark:bg-slate-900 border border-border flex items-center justify-center shrink-0">
              <Package className="w-6 h-6 text-slate-400" />
            </div>
          )}
          <div>
            <h3 className="font-semibold text-lg text-slate-900 dark:text-white">
              {item.product.name}
            </h3>
            <div className="text-sm text-slate-500 mt-1 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              Purchased on {new Date(item.order.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
        <StatusBadge status={item.order.status} />
      </div>

      <div className="flex-1 space-y-4">
        {!isCompleted ? (
          <div className="text-sm text-blue-600 bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-900">
            Your order is currently <strong>{item.order.status}</strong>. Delivery information will be displayed here once your payment is confirmed and the order is completed.
          </div>
        ) : !deliveryInfo ? (
          <div className="text-sm text-amber-600 bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-900">
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
}
