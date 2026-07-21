import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container px-4 md:px-8 mx-auto pb-12 pt-24 lg:pt-32">
      <section className="mx-auto flex max-w-[980px] flex-col items-center gap-4 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20 text-center">
        <h1 className="text-center text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
          Premium digital products, <br className="hidden sm:inline" />
          delivered instantly.
        </h1>
        <p className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl mt-4">
          Discover a curated collection of high-quality templates, tools, and assets to elevate your workflow. Simple, fast, and secure.
        </p>
        <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-10 mt-6">
          <Link href="/products">
            <Button size="lg" className="rounded-full px-8">Explore Products</Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="lg" className="rounded-full px-8">Sign In</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
