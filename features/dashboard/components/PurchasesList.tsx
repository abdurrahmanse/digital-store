"use client";

import { motion } from "framer-motion";
import { PurchaseCard, type Purchase } from "./PurchaseCard";
import { PackageOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PurchasesList({ purchases }: { purchases: Purchase[] }) {
  if (purchases.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 border border-slate-200 dark:border-slate-800 border-dashed rounded-2xl bg-slate-50/50 dark:bg-slate-900/50">
        <PackageOpen className="w-12 h-12 text-slate-300 mb-4" />
        <h3 className="text-lg font-medium text-slate-900 dark:text-white">No purchases yet</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-6 text-center max-w-sm">
          You haven't bought any products yet. Browse our store to find what you need.
        </p>
        <Link href="/" className="inline-block">
          <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8">
            Browse Products
          </Button>
        </Link>
      </div>
    );
  }

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
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      {purchases.map((purchase) => (
        <motion.div key={purchase.id} variants={item}>
          <PurchaseCard purchase={purchase} />
        </motion.div>
      ))}
    </motion.div>
  );
}
