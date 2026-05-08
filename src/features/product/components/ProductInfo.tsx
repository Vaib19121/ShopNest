import { Link } from "react-router-dom"
import { Heart, Minus, Plus, ShoppingCart, Star, Truck, Ruler, Tag, Store } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import type { ProductDetail, ProductColor } from "@/features/product/types/productDetail.types"

interface Props {
  product: ProductDetail
  selectedColor: ProductColor | null
  setSelectedColor: (color: ProductColor) => void
  selectedSize: string
  setSelectedSize: (size: string) => void
  quantity: number
  setQuantity: (q: number) => void
  wishlisted: boolean
  onAddToCart: () => void
  onBuyNow: () => void
  onWishlist: () => void
  onScrollToReviews: () => void
}

export function ProductInfo({
  product,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity,
  wishlisted,
  onAddToCart,
  onBuyNow,
  onWishlist,
  onScrollToReviews,
}: Props) {
  return (
    <div className="space-y-6">
      {/* Brand & Title */}
      <div>
        {product.brand && (
          <p className="text-sm text-muted-foreground mb-1">{product.brand}</p>
        )}
        <h1 className="text-3xl font-bold text-foreground mb-3">{product.title}</h1>

        {/* Rating */}
        <button
          onClick={onScrollToReviews}
          className="flex items-center gap-2 text-sm hover:underline"
        >
          <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-0.5 rounded">
            <span className="font-semibold">{product.rating}</span>
            <Star className="w-3 h-3 fill-white" />
          </div>
          <span className="text-muted-foreground">
            {product.reviewCount.toLocaleString()} ratings & reviews
          </span>
        </button>
      </div>

      <Separator />

      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-foreground">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-lg text-muted-foreground line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
          {product.discountPercentage && product.discountPercentage > 0 && (
            <Badge variant="destructive" className="text-sm">
              {product.discountPercentage}% OFF
            </Badge>
          )}
        </div>
        {product.originalPrice &&
          product.discountPercentage &&
          product.discountPercentage > 0 && (
            <p className="text-sm text-green-600 font-medium">
              You save ₹{(product.originalPrice - product.price).toLocaleString()}
            </p>
          )}
      </div>

      <Separator />

      {/* Description */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Description</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
      </div>

      <Separator />

      {/* Color Selector */}
      {product.colors.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold">
              Color:{" "}
              <span className="font-normal text-muted-foreground">{selectedColor?.name}</span>
            </h3>
          </div>
          <div className="flex gap-3">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => color.available && setSelectedColor(color)}
                disabled={!color.available}
                className={cn(
                  "w-10 h-10 rounded-full border-2 transition-all relative",
                  selectedColor?.name === color.name
                    ? "border-indigo-600 ring-2 ring-indigo-200 scale-110"
                    : "border-muted hover:border-indigo-300",
                  !color.available && "opacity-50 cursor-not-allowed",
                )}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              >
                {!color.available && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-0.5 bg-red-500 rotate-45" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size Selector */}
      {product.sizes.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold">Select Size</h3>
            <button className="text-sm text-indigo-600 hover:underline flex items-center gap-1">
              <Ruler className="w-4 h-4" />
              Size Guide
            </button>
          </div>
          <div className="flex gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={cn(
                  "w-14 h-12 rounded-lg border-2 font-medium text-sm transition-all",
                  selectedSize === size
                    ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                    : "border-muted hover:border-indigo-300",
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Quantity</h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center border rounded-lg">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="w-12 text-center font-semibold">{quantity}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setQuantity(Math.min(10, quantity + 1))}
              disabled={quantity >= 10}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <span className="text-sm text-muted-foreground">(Max 10 per order)</span>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="space-y-3 pt-2">
        <div className="flex gap-3">
          <Button
            className="flex-1 h-12 bg-indigo-600 hover:bg-indigo-700"
            onClick={onAddToCart}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={cn("h-12 w-12", wishlisted && "bg-red-50 border-red-200")}
            onClick={onWishlist}
          >
            <Heart
              className={cn("w-5 h-5", wishlisted && "fill-red-500 text-red-500")}
            />
          </Button>
        </div>
        <Button variant="outline" className="w-full h-12" onClick={onBuyNow}>
          Buy Now
        </Button>
      </div>

      <Separator />

      {/* Delivery Info */}
      {(product.estimatedDelivery || product.freeShipping) && (
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Truck className="w-5 h-5 text-muted-foreground" />
            <div>
              {product.estimatedDelivery && (
                <p className="font-medium">
                  Delivery by{" "}
                  <span className="text-green-600">{product.estimatedDelivery}</span>
                </p>
              )}
              {product.freeShipping && (
                <p className="text-xs text-muted-foreground">Free shipping on this order</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Offers */}
      {product.offers.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Available Offers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {product.offers.map((offer, index) => (
              <div key={index} className="flex gap-3 text-sm">
                <Tag className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{offer.title}</p>
                  <p className="text-xs text-muted-foreground">{offer.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Seller Info */}
      {product.seller && (
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <Store className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">{product.seller.name}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span>{product.seller.rating} rating</span>
              </div>
            </div>
          </div>
          <Button variant="link" className="text-indigo-600 h-auto p-0" asChild>
            <Link to={`/seller/${product.seller.id}`}>View Store</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
