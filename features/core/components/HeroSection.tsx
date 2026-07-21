import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/layout/container";

export function HeroSection() {
  return (
    <Container as="section" className="pb-12 pt-20 lg:pt-32 border-b border-border relative overflow-hidden">
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
    </Container>
  );
}
