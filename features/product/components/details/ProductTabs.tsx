"use client";

import { useState } from "react";
import { MessageSquare, HelpCircle, FileText } from "lucide-react";

import { OverviewTab } from "./tabs/OverviewTab";
import { ReviewsTab, Review } from "./tabs/ReviewsTab";
import { FaqTab } from "./tabs/FaqTab";

interface ProductTabsProps {
  description: string | null;
  productId?: string;
  initialReviews?: Review[];
  isLoggedIn?: boolean;
}

export function ProductTabs({ description, productId, initialReviews = [], isLoggedIn = false }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<"details" | "reviews" | "questions">("details");

  return (
    <div className="mt-16 lg:mt-24 border-t border-border pt-10">
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto pb-4 border-b border-border gap-6 md:gap-10 hide-scrollbar">
        <button
          onClick={() => setActiveTab("details")}
          className={`flex items-center gap-2 pb-4 text-base font-semibold whitespace-nowrap transition-colors relative ${
            activeTab === "details" ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <FileText className="w-4 h-4" />
          Product Details
          {activeTab === "details" && (
            <div className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-primary rounded-t-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("reviews")}
          className={`flex items-center gap-2 pb-4 text-base font-semibold whitespace-nowrap transition-colors relative ${
            activeTab === "reviews" ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Reviews {initialReviews.length > 0 && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{initialReviews.length}</span>}
          {activeTab === "reviews" && (
            <div className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-primary rounded-t-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("questions")}
          className={`flex items-center gap-2 pb-4 text-base font-semibold whitespace-nowrap transition-colors relative ${
            activeTab === "questions" ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          Questions
          {activeTab === "questions" && (
            <div className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-primary rounded-t-full" />
          )}
        </button>
      </div>

      {/* Tab Content */}
      <div className="pt-8 min-h-[300px]">
        {activeTab === "details" && <OverviewTab description={description} />}
        {activeTab === "reviews" && <ReviewsTab productId={productId} initialReviews={initialReviews} isLoggedIn={isLoggedIn} />}
        {activeTab === "questions" && <FaqTab productId={productId} />}
      </div>
    </div>
  );
}
