import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DeliveryType } from "@prisma/client";

type DeliveryInfoSectionProps = {
  deliveryType: DeliveryType;
  deliveryInfo: any;
  setDeliveryInfo: (info: any) => void;
};

export function DeliveryInfoSection({ deliveryType, deliveryInfo, setDeliveryInfo }: DeliveryInfoSectionProps) {
  return (
    <div className="space-y-4 pt-4 border-t border-border">
      <h3 className="font-medium text-lg bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">Delivery Information</h3>
      <p className="text-sm text-muted-foreground">
        Configure the digital access details that will be provided to the customer after purchase.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {deliveryType === "LICENSE_KEY" && (
          <>
            <div className="space-y-2">
              <Label>Product Key</Label>
              <Input 
                value={deliveryInfo.productKey || ""} 
                onChange={e => setDeliveryInfo({ ...deliveryInfo, productKey: e.target.value })} 
                placeholder="XXXX-XXXX-XXXX-XXXX" 
              />
            </div>
            <div className="space-y-2">
              <Label>Activation Instructions</Label>
              <textarea 
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={deliveryInfo.instructions || ""} 
                onChange={e => setDeliveryInfo({ ...deliveryInfo, instructions: e.target.value })} 
                placeholder="How to activate the key..." 
              />
            </div>
          </>
        )}

        {(deliveryType === "ACCOUNT_CREDENTIALS" || deliveryType === "SUBSCRIPTION_ACCESS") && (
          <>
            <div className="space-y-2">
              <Label>Login Email / Username</Label>
              <Input 
                value={deliveryInfo.loginEmail || ""} 
                onChange={e => setDeliveryInfo({ ...deliveryInfo, loginEmail: e.target.value })} 
                placeholder="user@example.com" 
              />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input 
                value={deliveryInfo.password || ""} 
                onChange={e => setDeliveryInfo({ ...deliveryInfo, password: e.target.value })} 
                placeholder="SecretPassword123" 
              />
            </div>
            <div className="space-y-2">
              <Label>Subscription Duration (Optional)</Label>
              <Input 
                value={deliveryInfo.duration || ""} 
                onChange={e => setDeliveryInfo({ ...deliveryInfo, duration: e.target.value })} 
                placeholder="e.g. 1 Year, Lifetime" 
              />
            </div>
            <div className="space-y-2">
              <Label>Additional Notes</Label>
              <textarea 
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={deliveryInfo.notes || ""} 
                onChange={e => setDeliveryInfo({ ...deliveryInfo, notes: e.target.value })} 
                placeholder="Rules or extra instructions..." 
              />
            </div>
          </>
        )}

        {deliveryType === "DOWNLOAD_FILE" && (
          <>
            <div className="space-y-2">
              <Label>Download Link</Label>
              <Input 
                value={deliveryInfo.downloadLink || ""} 
                onChange={e => setDeliveryInfo({ ...deliveryInfo, downloadLink: e.target.value })} 
                placeholder="https://mega.nz/..." 
              />
            </div>
            <div className="space-y-2">
              <Label>Download Instructions</Label>
              <textarea 
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={deliveryInfo.instructions || ""} 
                onChange={e => setDeliveryInfo({ ...deliveryInfo, instructions: e.target.value })} 
                placeholder="Password for archive, how to extract..." 
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
