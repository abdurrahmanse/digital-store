import { 
  ShoppingCart, 
  Users, 
  Package, 
  Clock, 
  Tag, 
  ArrowRight,
  RefreshCcw,
  Activity
} from "lucide-react";
import { getDashboardStats, getRecentOrders } from "@/features/admin/queries";
import { StatCard } from "@/features/admin/components/StatCard";
import { RecentOrdersTable } from "@/features/admin/components/RecentOrdersTable";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export async function AdminOverview() {
  const [stats, recentOrders] = await Promise.all([
    getDashboardStats(),
    getRecentOrders(),
  ]);

  const quickActions = [
    { name: "Manage Products", icon: Package, href: "/dashboard/products", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
    { name: "View Orders", icon: ShoppingCart, href: "/dashboard/orders", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    { name: "Customers", icon: Users, href: "/dashboard/customers", color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-500/10" },
    { name: "Coupons", icon: Tag, href: "/dashboard/coupons", color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <PageHeader 
        title="Dashboard Overview"
        description="Here is what's happening with your store today."
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard 
          title="Total Orders" 
          value={stats.salesCount.toString()} 
          icon={<ShoppingCart className="h-4 w-4 text-slate-500" strokeWidth={2} />} 
          delay={0.1}
        />
        <StatCard 
          title="Total Products" 
          value={stats.totalProducts.toString()} 
          icon={<Package className="h-4 w-4 text-slate-500" strokeWidth={2} />} 
          delay={0.2}
        />
        <StatCard 
          title="Active Subscriptions" 
          value={stats.activeSubscriptions.toString()} 
          icon={<RefreshCcw className="h-4 w-4 text-slate-500" strokeWidth={2} />} 
          delay={0.3}
        />
        <StatCard 
          title="Pending Orders" 
          value={stats.pendingOrders.toString()} 
          icon={<Clock className="h-4 w-4 text-amber-500" strokeWidth={2} />} 
          delay={0.4}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Main Content: Recent Orders */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-slate-400" />
              Recent Orders
            </h2>
            <Link href="/dashboard/orders">
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                View All <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <Card className="border-border shadow-sm overflow-hidden">
            <RecentOrdersTable orders={recentOrders} />
          </Card>
        </div>

        {/* Sidebar Content: Quick Actions */}
        <div className="xl:col-span-1 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 xl:grid-cols-1 gap-3">
            {quickActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <Link key={idx} href={action.href}>
                  <Card className="group hover:border-primary/50 hover:shadow-md transition-all cursor-pointer border-border shadow-sm h-full">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${action.bg} transition-colors group-hover:scale-105 duration-200`}>
                        <Icon className={`w-5 h-5 ${action.color}`} />
                      </div>
                      <div className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">
                        {action.name}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
