interface ProductGalleryProps {
  imageUrl: string | null;
  name: string;
}

export function ProductGallery({ imageUrl, name }: ProductGalleryProps) {
  return (
    <div className="space-y-6">
      <div className="aspect-[4/3] rounded-3xl bg-muted border border-border flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-muted-foreground font-medium">Product Box Art / Image</span>
        )}
      </div>
    </div>
  );
}
