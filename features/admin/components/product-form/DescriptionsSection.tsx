import { Label } from "@/components/ui/label";

type DescriptionsSectionProps = {
  initialData?: any;
};

export function DescriptionsSection({ initialData }: DescriptionsSectionProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="shortDescription">Short Description *</Label>
        <textarea
          id="shortDescription"
          name="shortDescription"
          required
          defaultValue={initialData?.shortDescription}
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Brief overview of the product..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Full Description *</Label>
        <textarea
          id="description"
          name="description"
          required
          defaultValue={initialData?.description}
          className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Detailed description, features, etc..."
        />
      </div>
    </div>
  );
}
