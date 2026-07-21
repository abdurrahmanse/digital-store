"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Package } from "lucide-react";

type TopProduct = {
  id: string;
  name: string;
  sales: number;
  revenue: number;
};

interface TopProductsListProps {
  products: TopProduct[];
}

export function TopProductsList({ products }: TopProductsListProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="h-full"
    >
      <Card className="border-slate-200 dark:border-slate-800/60 shadow-none h-full rounded-xl bg-white dark:bg-slate-950">
        <CardHeader className="border-b border-slate-100 dark:border-slate-800/50 pb-4">
          <CardTitle className="text-base font-semibold text-slate-800 dark:text-slate-200 tracking-tight flex items-center gap-2">
            Top Products
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-5">
          {products.length === 0 ? (
            <div className="py-8 text-center text-slate-500 dark:text-slate-400 text-sm">
              No sales data available yet.
            </div>
          ) : (
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-6"
            >
              {products.map((product) => (
                <motion.div 
                  variants={item}
                  key={product.id} 
                  className="flex items-center justify-between group p-2 -mx-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 dark:bg-slate-950 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white line-clamp-1">{product.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="font-medium text-sm text-slate-700 dark:text-slate-300">
                    ৳{(product.revenue / 100).toFixed(2)}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
