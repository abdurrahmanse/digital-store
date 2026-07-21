import { DollarSign, ShoppingCart, Users, Package } from "lucide-react";
import { getDashboardStats, getRecentOrders, getTopProducts } from "@/features/admin/queries";
import { StatCard } from "@/features/admin/components/StatCard";
import { RecentOrdersTable } from "@/features/admin/components/RecentOrdersTable";
import { TopProductsList } from "@/features/admin/components/TopProductsList";

export async function AdminOverview() {
  const [stats, recentOrders, topProducts] = await Promise.all([
    getDashboardStats(),
    getRecentOrders(),
    getTopProducts(),
  ]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">Dashboard Overview</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Real-time metrics and recent activity for your store.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          title="Total Revenue" 
          value={`৳${(stats.totalRevenue / 100).toFixed(2)}`} 
          icon={<DollarSign className="h-4 w-4 text-slate-400" strokeWidth={2} />} 
          delay={0.1}
        />
        <StatCard 
          title="Total Orders" 
          value={stats.salesCount.toString()} 
          icon={<ShoppingCart className="h-4 w-4 text-slate-400" strokeWidth={2} />} 
          delay={0.2}
        />
        <StatCard 
          title="Total Customers" 
          value={stats.activeUsers.toString()} 
          icon={<Users className="h-4 w-4 text-slate-400" strokeWidth={2} />} 
          delay={0.3}
        />
        <StatCard 
          title="Total Products" 
          value={stats.totalProducts.toString()} 
          icon={<Package className="h-4 w-4 text-slate-400" strokeWidth={2} />} 
          delay={0.4}
        />
        <StatCard 
          title="Pending Orders" 
          value={stats.pendingOrders.toString()} 
          icon={<ShoppingCart className="h-4 w-4 text-slate-400" strokeWidth={2} />} 
          delay={0.5}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentOrdersTable orders={recentOrders} />
        </div>
        
        <div className="lg:col-span-1">
          <TopProductsList products={topProducts} />
        </div>
      </div>
    </div>
  );
}
