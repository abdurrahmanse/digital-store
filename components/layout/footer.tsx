"use client";

import Link from "next/link";
import { Container } from "./container";
import { Store, MessagesSquare } from "lucide-react";

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

export function Footer() {
  return (
    <footer className="relative border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#030712] pt-16 pb-8 overflow-hidden">
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-[300px] w-[800px] rounded-full bg-blue-500/10 dark:bg-blue-600/10 blur-[100px] pointer-events-none -z-10"></div>
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
              <div className="bg-blue-600 p-1.5 rounded-lg group-hover:bg-blue-700 transition-colors">
                <Store className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold tracking-tight text-xl text-slate-900 dark:text-white">
                DigitalStore
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm mb-8 leading-relaxed">
              Your ultimate marketplace for premium digital assets. Unlock your potential with instant access to top-tier subscriptions, APIs, and software.
            </p>
            <div className="flex items-center gap-4 text-slate-400 dark:text-slate-500">
              <Link href="#" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors" aria-label="Twitter">
                <TwitterIcon className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors" aria-label="GitHub">
                <GithubIcon className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors" aria-label="Discord">
                <MessagesSquare className="w-5 h-5" />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">Products</h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/products?category=subscriptions" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Subscriptions</Link></li>
              <li><Link href="/products?category=software" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Software Licenses</Link></li>
              <li><Link href="/products?category=api-keys" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">API Keys</Link></li>
              <li><Link href="/products?category=vps" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">VPS Hosting</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">Company</h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</Link></li>
              <li><Link href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Blog</Link></li>
              <li><Link href="/faq" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">Legal</h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/refunds" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-500">
            &copy; {new Date().getFullYear()} DigitalStore. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse mr-1"></span>
            All systems operational
          </div>
        </div>
      </Container>
    </footer>
  );
}
