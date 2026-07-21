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
  FolderTree,
  ShoppingBag
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminLinks = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard, exact: true },
  { name: "Products", href: "/dashboard/products", icon: Package },
  { name: "Categories", href: "/dashboard/categories", icon: FolderTree },
  { name: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
  { name: "License Keys", href: "/dashboard/licenses", icon: Key },
  { name: "Customers", href: "/dashboard/customers", icon: Users },
  { name: "Coupons", href: "/dashboard/coupons", icon: Ticket },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

const userLinks = [
  { name: "My Purchases", href: "/dashboard", icon: ShoppingBag, exact: true },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function UnifiedSidebar({ role }: { role: string }) {
  const pathname = usePathname();
  const links = role === "ADMIN" ? adminLinks : userLinks;

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
