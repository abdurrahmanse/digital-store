import { LayoutGrid, Code, CreditCard, Globe, PenTool, Key, Download, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CATEGORIES = ["All Products", "Software Licenses", "Subscriptions", "Web & Hosting", "Creative & Learning"];
export const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "All Products": <LayoutGrid className="w-4 h-4" />,
  "Software Licenses": <Code className="w-4 h-4" />,
  "Subscriptions": <CreditCard className="w-4 h-4" />,
  "Web & Hosting": <Globe className="w-4 h-4" />,
  "Creative & Learning": <PenTool className="w-4 h-4" />
};

export const PRODUCT_TYPES = ["License Key", "Download", "Subscription"];
export const TYPE_ICONS: Record<string, React.ReactNode> = {
  "License Key": <Key className="w-4 h-4" />,
  "Download": <Download className="w-4 h-4" />,
  "Subscription": <Repeat className="w-4 h-4" />
};

interface CategoryFilterProps {
  selectedCategory: string;
  selectedTypes: string[];
  onCategoryChange: (cat: string) => void;
  onTypeChange: (type: string) => void;
  onReset: () => void;
}

export function CategoryFilter({
  selectedCategory,
  selectedTypes,
  onCategoryChange,
  onTypeChange,
  onReset
}: CategoryFilterProps) {
  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-8">
      <div>
        <h3 className="font-semibold text-foreground mb-4">Categories</h3>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <label key={cat} className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
              <input 
                type="radio" 
                name="category" 
                className="rounded border-border text-primary focus:ring-primary h-4 w-4 bg-background" 
                checked={selectedCategory === cat}
                onChange={() => onCategoryChange(cat)}
              />
              <span className="flex items-center gap-1.5">
                {CATEGORY_ICONS[cat]}
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold text-foreground mb-4">Product Type</h3>
        <div className="space-y-2">
          {PRODUCT_TYPES.map((type) => (
            <label key={type} className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
              <input 
                type="checkbox" 
                className="rounded border-border text-primary focus:ring-primary h-4 w-4 bg-background" 
                checked={selectedTypes.includes(type)}
                onChange={() => onTypeChange(type)}
              />
              <span className="flex items-center gap-1.5">
                {TYPE_ICONS[type]}
                {type}
              </span>
            </label>
          ))}
        </div>
      </div>
      
      <Button variant="outline" className="w-full" onClick={onReset}>
        Reset Filters
      </Button>
    </aside>
  );
}
