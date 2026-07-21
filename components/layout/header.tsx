import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center px-4 md:px-8 mx-auto">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold sm:inline-block tracking-tight text-lg">DigitalStore</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-4 text-sm font-medium pr-4 border-r border-border/40">
            <Link href="/products" className="transition-colors hover:text-foreground text-muted-foreground">
              Products
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            <Link href="/checkout">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="icon">
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
