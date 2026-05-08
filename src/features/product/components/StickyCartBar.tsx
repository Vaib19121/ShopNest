import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
  show: boolean
  onAddToCart: () => void
  onBuyNow: () => void
}

export function StickyCartBar({ show, onAddToCart, onBuyNow }: Props) {
  if (!show) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg p-4 z-50 lg:hidden">
      <div className="flex gap-3">
        <Button
          className="flex-1 h-12 bg-indigo-600 hover:bg-indigo-700"
          onClick={onAddToCart}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart
        </Button>
        <Button variant="outline" className="flex-1 h-12" onClick={onBuyNow}>
          Buy Now
        </Button>
      </div>
    </div>
  )
}
