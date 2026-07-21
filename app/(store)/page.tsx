import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product/product-card";
import { FadeIn } from "@/components/ui/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger-container";
import { Zap, ShieldCheck, Clock, CreditCard, ChevronRight } from "lucide-react";

export default function Home() {
  // Mock data for featured products covering various digital products
  const featuredProducts = [
    { title: "Windows 11 Pro License Key", price: 2900, originalPrice: 19900, slug: "windows-11-pro", imageUrl: "/images/p1.jpg" },
    { title: "JetBrains All Products Pack (1 Year)", price: 14900, slug: "jetbrains-pack", imageUrl: "/images/p2.jpg" },
    { title: "Premium VPS Hosting - 8GB RAM", price: 1200, originalPrice: 2400, slug: "vps-8gb", imageUrl: "/images/p3.jpg" },
  ];

  const features = [
    {
      title: "Instant Delivery",
      description: "Get your digital assets, license keys, and downloads immediately after purchase via email and dashboard.",
      icon: <Zap className="w-6 h-6 text-amber-500" />,
    },
    {
      title: "Secure Payments",
      description: "We use industry-leading encryption and Stripe to ensure your payment information is always protected.",
      icon: <CreditCard className="w-6 h-6 text-emerald-500" />,
    },
    {
      title: "Genuine Licenses",
      description: "All our software licenses and API keys are 100% genuine and verified directly from the manufacturers.",
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    },
    {
      title: "24/7 Premium Support",
      description: "Our dedicated support team is available around the clock to assist you with installation and troubleshooting.",
      icon: <Clock className="w-6 h-6 text-indigo-500" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="container px-4 md:px-8 mx-auto pb-12 pt-20 lg:pt-32 border-b border-border relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20 text-center relative z-10">
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-sm text-muted-foreground mb-6 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              New products added daily
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2} direction="up">
            <h1 className="text-center text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl lg:leading-[1.1] text-foreground">
              Premium digital products, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600 dark:from-primary dark:to-indigo-400">delivered instantly.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3} direction="up">
            <p className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl mt-6 leading-relaxed">
              Discover a curated collection of Software Licenses, VPS Hosting, Subscriptions, API Keys, and digital assets. Simple, fast, and secure.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.4} direction="up" className="w-full">
            <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-10 mt-8">
              <Link href="/products">
                <Button size="lg" className="rounded-full px-8 shadow-md text-base h-14 group">
                  Explore Products
                  <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="rounded-full px-8 bg-background text-foreground border-border hover:bg-muted text-base h-14">
                  Sign In
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 py-20 md:py-32 border-b border-border">
        <div className="container px-4 md:px-8 mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Why choose DigitalStore?</h2>
              <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">We provide the best digital shopping experience with zero compromises.</p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <StaggerItem key={i}>
                <div className="bg-card p-8 rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="bg-muted w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed flex-1">
                    {feature.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="relative overflow-hidden border-t border-border bg-background/50 py-24 md:py-32">
        {/* Subtle background element */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="container px-4 md:px-8 mx-auto relative z-10">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
              <div className="max-w-2xl">
                <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 transition-colors border-none">
                  Curated Collection
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter text-foreground md:text-5xl mb-4">
                  Featured Products
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                  Hand-picked software, subscriptions, and assets designed to elevate your workflow and unlock your creative potential.
                </p>
              </div>
              <Link href="/products" className="shrink-0">
                <Button variant="outline" className="hidden md:flex group rounded-full px-8 h-12 border-border/50 hover:border-primary/50 transition-all">
                  Explore all products
                  <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform text-primary" />
                </Button>
              </Link>
            </div>
          </FadeIn>
          
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
            {featuredProducts.map((product) => (
              <StaggerItem key={product.slug}>
                <ProductCard {...product} />
              </StaggerItem>
            ))}
          </StaggerContainer>
          
          <div className="mt-12 flex justify-center md:hidden">
            <Link href="/products" className="w-full max-w-sm">
              <Button variant="outline" className="w-full rounded-full h-12 border-border/50">Explore all products</Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
