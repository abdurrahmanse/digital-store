import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, ArrowRight, ShoppingCart } from "lucide-react";
import { PriceDisplay } from "@/components/shared/PriceDisplay";

interface ProductCardProps {
  title: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  slug: string;
}

export function ProductCard({ title, price, originalPrice, imageUrl, slug }: ProductCardProps) {
  const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0;

  return (
    <Card className="overflow-hidden flex flex-col group/card transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur-sm relative">
      <Link href={`/products/${slug}`} className="relative aspect-[4/3] overflow-hidden bg-muted block">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10 opacity-60" />
        
        {/* Placeholder for actual image */}
        <div className="absolute inset-0 bg-muted/30 group-hover/card:scale-105 transition-transform duration-700 ease-out flex items-center justify-center text-muted-foreground/40 text-sm font-medium">
          Product Preview
        </div>
        
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-md text-foreground font-medium border-border/50 shadow-sm px-2.5 py-0.5">
            <Zap className="w-3 h-3 mr-1.5 text-amber-500 fill-amber-500" /> Instant
          </Badge>
          {discount > 0 && (
            <Badge variant="destructive" className="shadow-sm border-transparent font-bold w-fit bg-red-500/90 backdrop-blur-md">
              -{discount}%
            </Badge>
          )}
        </div>
      </Link>
      
      <CardContent className="p-5 flex-1 flex flex-col relative z-20 -mt-8">
        {/* A subtle glass panel effect for the content area to overlap the image slightly */}
        <div className="bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl p-4 flex-1 flex flex-col shadow-sm transition-colors group-hover/card:border-border">
          <Link href={`/products/${slug}`}>
            <h3 className="font-semibold text-lg line-clamp-2 hover:text-primary transition-colors text-foreground mb-3 tracking-tight">
              {title}
            </h3>
          </Link>
          
          <div className="mt-auto">
            <PriceDisplay price={price} originalPrice={originalPrice} size="md" />
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-5 pb-5 pt-0">
        <Link href={`/products/${slug}`} className="w-full">
          <Button 
            className="w-full font-semibold rounded-xl group-hover/card:bg-primary group-hover/card:text-primary-foreground transition-all duration-300 shadow-sm hover:shadow" 
            variant="outline"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Get it now
            <ArrowRight className="w-4 h-4 ml-1.5 opacity-0 -translate-x-2 group-hover/card:opacity-100 group-hover/card:translate-x-0 transition-all duration-300" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
