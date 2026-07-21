"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="container px-4 md:px-8 mx-auto max-w-screen-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <Link href="/" className="inline-block mb-2">
              <span className="font-bold tracking-tight text-xl text-foreground">
                DigitalStore
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              A premium marketplace for high-quality digital assets.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm font-medium text-muted-foreground/80">
            <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
            <Link href="/categories" className="hover:text-primary transition-colors">Categories</Link>
            <Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
            <Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
          </div>
        </div>

        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground/60">
            &copy; {new Date().getFullYear()} DigitalStore. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground/60">
            <Link href="#" className="hover:text-foreground transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-foreground transition-colors">GitHub</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Discord</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
