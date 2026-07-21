import Link from "next/link";
import { ShoppingCart, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container flex h-16 max-w-screen-2xl items-center px-4 md:px-8 mx-auto">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <div className="bg-primary text-white p-1.5 rounded-lg shadow-sm">
            <ShoppingCart className="h-5 w-5" />
          </div>
          <span className="font-bold sm:inline-block tracking-tight text-lg text-slate-900">DigitalStore</span>
        </Link>
        
        <div className="flex flex-1 items-center justify-between space-x-4 md:justify-end">
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium pr-6">
            <Link href="/products" className="transition-colors hover:text-primary text-slate-600">
              Products
            </Link>
            <Link href="/categories" className="transition-colors hover:text-primary text-slate-600">
              Categories
            </Link>
          </nav>
          
          <div className="flex-1 max-w-md hidden md:flex items-center relative mr-4">
            <Search className="absolute left-3 h-4 w-4 text-slate-400" />
            <Input 
              type="search" 
              placeholder="Search products, categories..." 
              className="w-full bg-slate-50 border-slate-200 pl-9 rounded-full focus-visible:ring-primary/20 h-9 text-sm shadow-inner"
            />
          </div>

          <div className="flex items-center space-x-1">
            <Link href="/checkout">
              <Button variant="ghost" size="icon" className="text-slate-600 hover:text-primary hover:bg-slate-50 rounded-full">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="icon" className="text-slate-600 hover:text-primary hover:bg-slate-50 rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
