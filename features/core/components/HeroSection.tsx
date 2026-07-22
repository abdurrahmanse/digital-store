import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { ArrowRight, Sparkles, Bot, Code2, Paintbrush, Video, PenTool, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/container";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-slate-50 dark:bg-[#030712] border-b border-slate-200 dark:border-slate-800 z-0">
      {/* Full-width Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-100/50 via-white to-violet-100/50 dark:from-blue-900/20 dark:via-[#030712] dark:to-violet-900/20"></div>
      
      {/* Grid pattern with radial mask to fade at edges */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      {/* Prominent glowing ambient gradients */}
      <div className="absolute left-1/4 top-0 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-blue-400/30 dark:bg-blue-600/20 blur-[80px]"></div>
      <div className="absolute right-1/4 top-0 -z-10 h-[500px] w-[500px] translate-x-1/2 -translate-y-1/3 rounded-full bg-violet-400/30 dark:bg-violet-600/20 blur-[80px]"></div>

      <Container as="section" className="relative pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center">
          
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center rounded-full border border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/50 px-3 py-1 text-sm text-slate-600 dark:text-slate-300 backdrop-blur-sm mb-8 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
              Instant Delivery on All Premium Subscriptions
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2} direction="up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
              Unlock Your Potential with <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                Premium Digital Tools
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3} direction="up">
            <p className="max-w-2xl text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
              Get instant access to top-tier subscriptions like ChatGPT Plus, Claude Pro, Cursor Pro, and Adobe CC at unbeatable prices. Work smarter, not harder.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.4} direction="up" className="w-full flex justify-center">
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link href="/products" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto rounded-full px-8 h-14 text-base font-medium shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-200 dark:text-slate-900 group">
                  Explore Products
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/products?category=subscriptions" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-8 h-14 text-base font-medium bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-900 dark:text-white transition-all">
                  View Subscriptions
                </Button>
              </Link>
            </div>
          </FadeIn>

          {/* Value Propositions */}
          <FadeIn delay={0.5} direction="up" className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-slate-500 dark:text-slate-400 font-medium">
            <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Instant Email Delivery</div>
            <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Secure Payments</div>
            <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 24/7 Customer Support</div>
          </FadeIn>

        </div>

        {/* Highlighted Brands/Products */}
        <FadeIn delay={0.6} direction="up" className="mt-20 lg:mt-28 border-t border-slate-200/50 dark:border-slate-800/50 pt-10">
          <p className="text-center text-xs font-semibold text-slate-400 dark:text-slate-500 mb-8 uppercase tracking-widest">
            Featuring Premium Licenses & Subscriptions
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 opacity-70 hover:opacity-100 transition-opacity duration-500">
            {[
              { name: "ChatGPT Plus", icon: Bot },
              { name: "Claude Pro", icon: Sparkles },
              { name: "Cursor Pro", icon: Code2 },
              { name: "Canva Pro", icon: Paintbrush },
              { name: "CapCut Pro", icon: Video },
              { name: "Adobe CC", icon: PenTool },
            ].map((brand) => (
              <div key={brand.name} className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm grayscale hover:grayscale-0 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 cursor-default">
                <brand.icon className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                <span className="font-semibold text-slate-700 dark:text-slate-300 text-sm md:text-base tracking-tight">{brand.name}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
