import { useState } from "react"
import { ZoomIn } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Props {
  images: string[]
  title: string
  isNew: boolean
  discountPercentage: number | null
}

export function ProductImageGallery({ images, title, isNew, discountPercentage }: Props) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted group">
        <img
          src={images[selectedImage]}
          alt={title}
          className={cn(
            "w-full h-full object-cover transition-transform duration-300",
            isZoomed
              ? "scale-150 cursor-zoom-out"
              : "group-hover:scale-110 cursor-zoom-in",
          )}
          onClick={() => setIsZoomed(!isZoomed)}
        />
        {isNew && (
          <Badge className="absolute top-4 left-4 bg-indigo-600 hover:bg-indigo-700">
            New
          </Badge>
        )}
        {discountPercentage && discountPercentage > 0 && (
          <Badge
            variant="destructive"
            className="absolute top-4 right-4 bg-red-600 hover:bg-red-700"
          >
            -{discountPercentage}% OFF
          </Badge>
        )}
        <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
          <ZoomIn className="w-3 h-3" />
          Click to zoom
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={cn(
              "relative aspect-square w-20 rounded-lg border-2 overflow-hidden transition-all",
              selectedImage === index
                ? "border-indigo-600 ring-2 ring-indigo-200"
                : "border-muted hover:border-indigo-300",
            )}
          >
            <img
              src={image}
              alt={`View ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
