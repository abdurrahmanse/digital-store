import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 md:space-y-10">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Overview</h1>
        <p className="text-slate-500 mt-1">Here's what's happening in your store today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-slate-200 shadow-sm rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-semibold text-slate-500">Total Revenue</p>
              <DollarSign className="h-5 w-5 text-slate-400" />
            </div>
            <div className="text-3xl font-bold text-slate-900 tracking-tight">$45,231.89</div>
            <p className="text-sm text-emerald-600 flex items-center mt-2 font-medium">
              <TrendingUp className="w-4 h-4 mr-1" /> +20.1% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 shadow-sm rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-semibold text-slate-500">Sales</p>
              <ShoppingCart className="h-5 w-5 text-slate-400" />
            </div>
            <div className="text-3xl font-bold text-slate-900 tracking-tight">+2350</div>
            <p className="text-sm text-slate-500 mt-2 font-medium">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-semibold text-slate-500">Active Users</p>
              <Users className="h-5 w-5 text-slate-400" />
            </div>
            <div className="text-3xl font-bold text-slate-900 tracking-tight">+12,234</div>
            <p className="text-sm text-emerald-600 flex items-center mt-2 font-medium">
              <TrendingUp className="w-4 h-4 mr-1" /> +19% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-slate-200 shadow-sm h-full rounded-2xl overflow-hidden">
            <CardHeader className="bg-white border-b border-slate-100 pb-4">
              <CardTitle className="text-lg">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-500 uppercase bg-slate-50/50">
                    <tr>
                      <th className="px-6 py-4 font-semibold tracking-wider">Order ID</th>
                      <th className="px-6 py-4 font-semibold tracking-wider">Customer</th>
                      <th className="px-6 py-4 font-semibold tracking-wider">Amount</th>
                      <th className="px-6 py-4 font-semibold tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { id: "ORD-8492-AX", customer: "john@example.com", amount: "$49.00", date: "Oct 24, 2023" },
                      { id: "ORD-8493-BY", customer: "sarah@example.com", amount: "$29.00", date: "Oct 24, 2023" },
                      { id: "ORD-8494-CZ", customer: "mike@example.com", amount: "$99.00", date: "Oct 23, 2023" },
                      { id: "ORD-8495-DW", customer: "emily@example.com", amount: "$49.00", date: "Oct 23, 2023" },
                    ].map((order, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 bg-white transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">{order.id}</td>
                        <td className="px-6 py-4 text-slate-500">{order.customer}</td>
                        <td className="px-6 py-4 font-medium text-slate-900">{order.amount}</td>
                        <td className="px-6 py-4 text-slate-500">{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card className="border-slate-200 shadow-sm h-full rounded-2xl">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-lg">Top Products</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {[
                  { name: "SaaS Dashboard UI Kit", sales: 423, amount: "$20,727" },
                  { name: "Next.js Portfolio", sales: 382, amount: "$11,078" },
                  { name: "E-Commerce Wireframes", sales: 214, amount: "$8,346" },
                  { name: "Mobile App Starter", sales: 154, amount: "$4,500" },
                ].map((product, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900 line-clamp-1">{product.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{product.sales} sales</p>
                    </div>
                    <div className="font-semibold text-sm text-slate-900">
                      {product.amount}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
