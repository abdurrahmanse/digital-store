import Link from "next/link";
import { Home, Package, Settings, LogOut } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <Link href="/" className="font-bold tracking-tight text-lg text-slate-900">
            DigitalStore
          </Link>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 text-primary bg-primary/5 rounded-lg font-medium">
            <Home className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="/dashboard/purchases" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg font-medium transition-colors">
            <Package className="w-5 h-5" /> My Purchases
          </Link>
          <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg font-medium transition-colors">
            <Settings className="w-5 h-5" /> Settings
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-200">
          <button className="flex w-full items-center gap-3 px-3 py-2 text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-lg font-medium transition-colors">
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="h-16 flex items-center justify-between px-4 md:hidden bg-white border-b border-slate-200">
          <span className="font-bold text-lg text-slate-900">DigitalStore</span>
          <button className="text-slate-600"><Home className="w-5 h-5"/></button>
        </header>
        
        <div className="flex-1 p-4 md:p-8 lg:p-10 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
