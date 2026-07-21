"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Package, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/shared/SearchBar";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        className="md:hidden text-muted-foreground hover:text-foreground hover:bg-muted rounded-full ml-1"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Open menu</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm md:hidden">
          <div className="fixed inset-y-0 left-0 w-3/4 max-w-sm bg-background border-r border-border shadow-xl p-6 flex flex-col gap-6 animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between">
              <span className="font-bold tracking-tight text-lg text-foreground">Menu</span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(false)}
                className="rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex flex-col gap-4">
              <div onClick={() => setIsOpen(false)}>
                <SearchBar />
              </div>

              <nav className="flex flex-col gap-2 mt-4">
                <Link 
                  href="/products" 
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-foreground font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  <Package className="w-5 h-5 text-muted-foreground" />
                  Products
                </Link>
                <Link 
                  href="/contact" 
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-foreground font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  <MessageSquare className="w-5 h-5 text-muted-foreground" />
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
