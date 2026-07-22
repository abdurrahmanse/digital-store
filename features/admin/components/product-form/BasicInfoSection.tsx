import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type BasicInfoSectionProps = {
  initialData?: any;
  categories: { id: string; name: string }[];
};

export function BasicInfoSection({ initialData, categories }: BasicInfoSectionProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Product Name *</Label>
        <Input id="name" name="name" required defaultValue={initialData?.name} placeholder="e.g. Windows 11 Pro" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug *</Label>
        <Input id="slug" name="slug" required defaultValue={initialData?.slug} placeholder="e.g. windows-11-pro" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="categoryId">Category</Label>
        <select
          id="categoryId"
          name="categoryId"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          defaultValue={initialData?.categoryId || ""}
        >
          <option value="">Uncategorized</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">Product Visibility</h3>
        <div className="flex items-center justify-between rounded-lg border border-border p-4">
          <div className="space-y-0.5">
            <Label htmlFor="isFeatured" className="text-base">Featured Product</Label>
            <p className="text-sm text-muted-foreground">
              Display this product prominently on the home page and top of listings.
            </p>
          </div>
          <Switch 
            id="isFeatured" 
            name="isFeatured" 
            defaultChecked={initialData?.isFeatured ?? false} 
          />
        </div>
      </div>
    </div>
  );
}
