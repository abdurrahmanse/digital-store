"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Key, 
  Users, 
  Ticket, 
  Settings,
  FolderTree 
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard, exact: true },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Categories", href: "/admin/categories", icon: FolderTree },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Customers", href: "/admin/users", icon: Users },
  { name: "Coupons", href: "/admin/coupons", icon: Ticket },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 py-6 px-4 space-y-1">
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = link.exact 
          ? pathname === link.href 
          : pathname.startsWith(link.href);

        return (
          <Link 
            key={link.name} 
            href={link.href} 
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors",
              isActive 
                ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground" 
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            )}
          >
            <Icon className="w-5 h-5" /> {link.name}
          </Link>
        );
      })}
    </nav>
  );
}
