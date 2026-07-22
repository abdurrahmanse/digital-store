import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PricingStockSectionProps = {
  initialData?: any;
  imagePreview: string | null;
  setImagePreview: (url: string | null) => void;
};

export function PricingStockSection({ initialData, imagePreview, setImagePreview }: PricingStockSectionProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price (BDT) *</Label>
          <Input 
            id="price" 
            name="price" 
            type="number" 
            step="0.01" 
            min="0"
            required 
            defaultValue={initialData ? (initialData.price / 100).toFixed(2) : ""} 
            placeholder="29.00" 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="discountPrice">Discount Price (BDT)</Label>
          <Input 
            id="discountPrice" 
            name="discountPrice" 
            type="number" 
            step="0.01"
            min="0"
            defaultValue={initialData?.discountPrice ? (initialData.discountPrice / 100).toFixed(2) : ""} 
            placeholder="19.00" 
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="stock">Stock (Optional)</Label>
        <Input 
          id="stock" 
          name="stock" 
          type="number" 
          defaultValue={initialData?.stock ?? ""} 
          placeholder="Leave empty for infinite" 
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageFile">Product Image</Label>
        {imagePreview && (
          <div className="mb-2">
            <img 
              src={imagePreview} 
              alt="Product image preview" 
              className="h-20 w-auto rounded-md border border-border object-cover" 
            />
          </div>
        )}
        <Input 
          id="imageFile" 
          name="imageFile" 
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setImagePreview(URL.createObjectURL(file));
            } else {
              setImagePreview(initialData?.imageUrl || null);
            }
          }}
        />
        <p className="text-xs text-muted-foreground">
          {initialData?.imageUrl ? "Upload a new image to replace the current one." : "Upload a product image."}
        </p>
      </div>
    </div>
  );
}
