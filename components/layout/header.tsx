import Link from "next/link";
import Form from "next/form";
import { ShoppingCart, User, Search, Package, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 max-w-screen-2xl items-center px-4 md:px-8 mx-auto">
        <div className="flex items-center w-1/4 shrink-0">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary text-white p-1.5 rounded-lg shadow-sm">
              <ShoppingCart className="h-5 w-5" />
            </div>
            <span className="font-bold sm:inline-block tracking-tight text-lg text-foreground">DigitalStore</span>
          </Link>
        </div>

        <div className="flex-1 hidden md:flex justify-center max-w-xl px-4 mx-4">
          <Form action="/products" className="w-full relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
            <Input 
              type="search" 
              name="q"
              placeholder="Search products..." 
              className="w-full bg-muted border-border pl-9 rounded-full focus-visible:ring-primary/20 h-10 text-sm shadow-inner"
            />
          </Form>
        </div>

        <div className="flex items-center justify-end space-x-4 w-1/4 shrink-0">
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/products" className="transition-colors text-muted-foreground hover:text-foreground flex items-center gap-2 group">
              <Package className="w-4 h-4 group-hover:text-primary transition-colors" />
              Products
            </Link>
            <Link href="/contact" className="transition-colors text-muted-foreground hover:text-foreground flex items-center gap-2 group">
              <MessageSquare className="w-4 h-4 group-hover:text-primary transition-colors" />
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-1 pl-2 border-l border-border">
            <ThemeToggle />
            <Link href="/checkout">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-full">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-full">
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
