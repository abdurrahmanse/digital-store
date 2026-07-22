"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";

export function CartBadge() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((state) => state.items);
  
  // Calculate total items
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  // Avoid hydration mismatch by waiting until component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link href="/cart">
      <Button 
        variant="ghost" 
        size="icon" 
        className="relative text-muted-foreground hover:text-foreground hover:bg-muted rounded-full"
      >
        <ShoppingCart className="h-5 w-5" />
        {mounted && itemCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center min-w-[1.25rem] h-5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full px-1">
            {itemCount}
          </span>
        )}
        <span className="sr-only">Cart</span>
      </Button>
    </Link>
  );
}
