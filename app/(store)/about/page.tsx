import { Globe, ShieldCheck, Zap } from "lucide-react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "About Us | Digital Store",
  description: "Learn more about our mission, what we do, and why you should choose us.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pb-20 pt-10">
      <Container className="space-y-24">
        
        {/* Section 1: Hero / Mission */}
        <section className="text-center space-y-6">
          <div className="inline-block rounded-full bg-blue-50 dark:bg-blue-900/20 px-3 py-1 text-sm font-semibold text-blue-600 dark:text-blue-400">
            Our Mission
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
            Empowering the Digital Future
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            We believe that access to high-quality digital assets should be seamless, secure, and instant. Our mission is to bridge the gap between creators and professionals by providing a modern platform for digital distribution.
          </p>
        </section>

        {/* Section 2: What We Do */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
              Curated Digital Products for Every Need
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              From premium software licenses and exclusive templates to high-quality media assets, our marketplace is meticulously curated. We partner with top-tier developers and creators to ensure you always get the best tools for your next big project.
            </p>
            <ul className="space-y-3 text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                  <Globe className="h-4 w-4" />
                </div>
                <span>Global accessibility 24/7</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                  <Zap className="h-4 w-4" />
                </div>
                <span>Instant automated delivery</span>
              </li>
            </ul>
          </div>
          <div className="relative h-[400px] w-full rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            {/* A subtle modern gradient placeholder instead of an image to keep it clean and fast */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-emerald-500/10" />
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="grid grid-cols-2 gap-4 w-full h-full opacity-50">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/50 dark:border-slate-700/50"></div>
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 mt-12"></div>
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 mb-12"></div>
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/50 dark:border-slate-700/50"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Why Choose Us */}
        <section className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
              Built on Trust and Quality
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
              We don't just sell products; we deliver peace of mind. Here is why thousands of professionals rely on us daily.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
              <ShieldCheck className="h-10 w-10 text-blue-600 dark:text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">Secure Transactions</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Bank-grade encryption and secure payment gateways ensure your data and purchases are always protected.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
              <Zap className="h-10 w-10 text-amber-500 dark:text-amber-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">Instant Delivery</h3>
              <p className="text-slate-600 dark:text-slate-400">
                No waiting. As soon as your payment clears, your digital assets and license keys are delivered instantly to your dashboard.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
              <Globe className="h-10 w-10 text-emerald-500 dark:text-emerald-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">24/7 Support</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Our dedicated support team is distributed globally, ensuring that you get the help you need, whenever you need it.
              </p>
            </div>
          </div>
        </section>

      </Container>
    </div>
  );
}
