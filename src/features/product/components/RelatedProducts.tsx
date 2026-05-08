import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { relatedProducts } from "@/features/product/data/mockProduct"

export function RelatedProducts() {
  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Related Products</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-4 pb-4">
          {relatedProducts.map((relProduct) => (
            <Card
              key={relProduct.id}
              className="w-60 shrink-0 group cursor-pointer hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-0">
                <div className="relative aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={relProduct.image}
                    alt={relProduct.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-sm mb-2 line-clamp-2">{relProduct.title}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex items-center gap-1 bg-green-600 text-white px-1.5 py-0.5 rounded text-xs">
                      <span className="font-semibold">{relProduct.rating}</span>
                      <Star className="w-2.5 h-2.5 fill-white" />
                    </div>
                  </div>
                  <p className="text-lg font-bold">₹{relProduct.price.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
