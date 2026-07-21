import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white pt-12 pb-8">
      <div className="container px-4 md:px-8 mx-auto max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="font-bold tracking-tight text-lg text-slate-900">DigitalStore</span>
            </Link>
            <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
              A premium marketplace for high-quality digital assets, tools, and templates. Delivered instantly.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-4 text-sm">Products</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link href="/products" className="hover:text-primary transition-colors">All Products</Link></li>
              <li><Link href="/categories" className="hover:text-primary transition-colors">Categories</Link></li>
              <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-4 text-sm">Support</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/refunds" className="hover:text-primary transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-4 text-sm">Legal</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/licenses" className="hover:text-primary transition-colors">License Info</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} DigitalStore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
