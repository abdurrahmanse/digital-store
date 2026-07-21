import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";

export default function Home() {
  // Mock data for featured products covering various digital products
  const featuredProducts = [
    { title: "Windows 11 Pro License Key", price: 2900, originalPrice: 19900, slug: "windows-11-pro", imageUrl: "/images/p1.jpg" },
    { title: "JetBrains All Products Pack (1 Year)", price: 14900, slug: "jetbrains-pack", imageUrl: "/images/p2.jpg" },
    { title: "Premium VPS Hosting - 8GB RAM", price: 1200, originalPrice: 2400, slug: "vps-8gb", imageUrl: "/images/p3.jpg" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="container px-4 md:px-8 mx-auto pb-12 pt-20 lg:pt-28 border-b border-slate-100">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20 text-center">
          <h1 className="text-center text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.15] text-slate-900">
            Premium digital products, <br className="hidden sm:inline" />
            delivered instantly.
          </h1>
          <p className="max-w-[750px] text-center text-lg text-slate-500 sm:text-xl mt-6 leading-relaxed">
            Discover a curated collection of Software Licenses, VPS Hosting, Subscriptions, API Keys, and digital assets. Simple, fast, and secure.
          </p>
          <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-10 mt-8">
            <Link href="/products">
              <Button size="lg" className="rounded-full px-8 shadow-sm text-base h-12">Explore Products</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="rounded-full px-8 bg-white text-slate-600 border-slate-200 text-base h-12">Sign In</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container px-4 md:px-8 mx-auto py-16 md:py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Featured Products</h2>
            <p className="text-slate-500 mt-2 text-lg">Top selling software, subscriptions, and assets.</p>
          </div>
          <Link href="/products">
            <Button variant="ghost" className="hidden md:flex text-primary hover:bg-primary/5">View all collection &rarr;</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.slug} {...product} />
          ))}
        </div>
        
        <div className="mt-10 flex justify-center md:hidden">
          <Link href="/products">
            <Button variant="outline" className="w-full">View all products</Button>
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-slate-50 py-16 md:py-24 border-y border-slate-100">
        <div className="container px-4 md:px-8 mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-center text-slate-900 mb-12">Browse by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: "Software Licenses", icon: "🔑", desc: "Windows, Office, Adobe" },
              { name: "Subscriptions", icon: "🔄", desc: "VPNs, AI Tools" },
              { name: "Web & Hosting", icon: "☁️", desc: "VPS, Domains" },
              { name: "Creative & Learning", icon: "🎨", desc: "Themes, Courses, E-books" }
            ].map((category) => (
              <Link key={category.name} href={`/categories/${category.name.toLowerCase().replace(/ /g, '-')}`} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 hover:border-primary/50 hover:shadow-md transition-all text-center flex flex-col items-center justify-center min-h-[160px]">
                <div className="text-3xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-lg text-slate-900 group-hover:text-primary transition-colors">{category.name}</h3>
                <p className="text-sm text-slate-400 mt-2">{category.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
