import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

interface ProductCardProps {
  title: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  slug: string;
}

export function ProductCard({ title, price, originalPrice, imageUrl, slug }: ProductCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col group transition-all hover:shadow-md border-slate-200">
      <Link href={`/products/${slug}`} className="relative aspect-video overflow-hidden bg-slate-100">
        {/* Placeholder for actual image */}
        <div className="absolute inset-0 bg-slate-200 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center text-slate-500 text-sm font-medium">
          Product Image Preview
        </div>
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-white/90 backdrop-blur text-slate-900 border-transparent shadow-sm">
            <Zap className="w-3 h-3 mr-1 text-amber-500" /> Instant
          </Badge>
          {originalPrice && (
            <Badge variant="destructive" className="shadow-sm border-transparent">
              Sale
            </Badge>
          )}
        </div>
      </Link>
      <CardContent className="p-5 flex-1">
        <Link href={`/products/${slug}`}>
          <h3 className="font-semibold text-lg line-clamp-2 hover:text-primary transition-colors text-slate-900 mb-3">
            {title}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-auto">
          <span className="font-bold text-xl text-slate-900">${(price / 100).toFixed(2)}</span>
          {originalPrice && (
            <span className="text-sm text-slate-400 line-through">${(originalPrice / 100).toFixed(2)}</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <Link href={`/products/${slug}`} className="w-full">
          <Button className="w-full font-semibold rounded-xl bg-slate-900 text-white hover:bg-slate-800" variant="default">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
