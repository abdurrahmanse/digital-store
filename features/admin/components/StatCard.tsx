"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  delay?: number;
}

export function StatCard({ title, value, icon, trend, trendUp, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Card className="border-slate-200 dark:border-slate-800/60 shadow-none rounded-xl bg-white dark:bg-slate-950 transition-all duration-300 hover:border-slate-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
            {icon}
          </div>
          <div className="text-3xl font-semibold text-slate-900 dark:text-white tracking-tight mt-1">{value}</div>
          {trend && (
            <p className={`text-sm flex items-center mt-3 font-medium ${trendUp ? 'text-emerald-600' : 'text-rose-600'}`}>
              <span className={`inline-block mr-2 px-2 py-0.5 rounded-full text-xs ${trendUp ? 'bg-emerald-100' : 'bg-rose-100'}`}>
                {trendUp ? '+' : ''}{trend}
              </span>
              <span className="text-slate-500 dark:text-slate-400 font-normal">from last month</span>
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
