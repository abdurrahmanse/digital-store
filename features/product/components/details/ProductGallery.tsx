import Image from "next/image";

interface ProductGalleryProps {
  imageUrl: string | null;
  name: string;
}

export function ProductGallery({ imageUrl, name }: ProductGalleryProps) {
  return (
    <div className="space-y-6">
      <div className="aspect-[4/3] rounded-3xl bg-muted border border-border flex items-center justify-center overflow-hidden relative">
        {imageUrl ? (
          <Image 
            src={imageUrl} 
            alt={name} 
            fill
            className="object-cover" 
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        ) : (
          <span className="text-muted-foreground font-medium">Product Box Art / Image</span>
        )}
      </div>
    </div>
  );
}
