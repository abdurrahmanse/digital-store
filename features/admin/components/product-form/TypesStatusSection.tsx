import { Label } from "@/components/ui/label";
import { ProductType, DeliveryType, ProductStatus } from "@prisma/client";

type TypesStatusSectionProps = {
  initialData?: any;
  deliveryType: DeliveryType;
  setDeliveryType: (type: DeliveryType) => void;
};

export function TypesStatusSection({ initialData, deliveryType, setDeliveryType }: TypesStatusSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-border">
      <div className="space-y-2">
        <Label htmlFor="productType">Product Type</Label>
        <select
          id="productType"
          name="productType"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          defaultValue={initialData?.productType || ProductType.DOWNLOAD}
        >
          {Object.values(ProductType).map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="deliveryType">Delivery Type</Label>
        <select
          id="deliveryType"
          name="deliveryType"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          value={deliveryType}
          onChange={(e) => setDeliveryType(e.target.value as DeliveryType)}
        >
          {Object.values(DeliveryType).map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <select
          id="status"
          name="status"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          defaultValue={initialData?.status || ProductStatus.PUBLISHED}
        >
          {Object.values(ProductStatus).map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
