"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import { useState } from "react";

interface ProductCheckoutCardProps {
  productId: string;
  price: number;
  discountPrice: number | null;
  name?: string;
  imageUrl?: string | null;
  slug?: string;
}

export function ProductCheckoutCard({ productId, price, discountPrice, name, imageUrl, slug }: ProductCheckoutCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    if (!name || !slug) return;
    
    setIsAdding(true);
    addItem({
      id: productId,
      name,
      price: discountPrice || price,
      imageUrl: imageUrl || null,
      slug,
    });
    
    toast.success(`${name} added to cart!`);
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <PriceDisplay price={price} originalPrice={discountPrice || undefined} size="lg" />
        {discountPrice && (
          <Badge variant="destructive" className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-transparent">
            Sale
          </Badge>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link href={`/checkout?productId=${productId}`} className="flex-1">
          <Button size="lg" className="w-full text-base font-semibold h-12 rounded-xl shadow-sm">
            Buy Now
          </Button>
        </Link>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="flex-1 text-base font-semibold h-12 rounded-xl"
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          <ShoppingCart className="w-5 h-5 mr-2" /> 
          {isAdding ? "Added!" : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
}
