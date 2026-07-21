import Link from "next/link";
import { LayoutDashboard, ShoppingCart, Users, Tag, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col shadow-xl z-10">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <span className="font-bold tracking-tight text-lg">Admin Panel</span>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 bg-primary/20 text-primary-foreground rounded-lg font-medium">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg font-medium transition-colors">
            <Tag className="w-5 h-5" /> Products
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg font-medium transition-colors">
            <ShoppingCart className="w-5 h-5" /> Orders
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg font-medium transition-colors">
            <Users className="w-5 h-5" /> Users
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <Link href="/" className="flex w-full items-center gap-3 px-3 py-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg font-medium transition-colors">
            <LogOut className="w-5 h-5" /> Back to Store
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="h-16 flex items-center justify-between px-4 md:hidden bg-slate-900 text-white">
          <span className="font-bold text-lg">Admin Panel</span>
          <button className="text-slate-400"><LayoutDashboard className="w-5 h-5"/></button>
        </header>
        
        <div className="flex-1 p-4 md:p-8 lg:p-10 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
