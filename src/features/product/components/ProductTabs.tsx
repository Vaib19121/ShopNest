import { Star, ThumbsUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import type { ProductDetail } from "@/features/product/types/productDetail.types"

interface Props {
  product: ProductDetail
}

export function ProductTabs({ product }: Props) {
  return (
    <div className="mt-12" id="reviews-section">
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="w-full justify-start h-auto p-1 bg-muted/50">
          <TabsTrigger value="description" className="text-base">
            Description
          </TabsTrigger>
          <TabsTrigger value="specifications" className="text-base">
            Specifications
          </TabsTrigger>
          <TabsTrigger value="reviews" className="text-base">
            Reviews ({product.reviewCount})
          </TabsTrigger>
          <TabsTrigger value="qna" className="text-base">
            Q&A
          </TabsTrigger>
        </TabsList>

        {/* Description Tab */}
        <TabsContent value="description" className="mt-6">
          <div className="prose prose-sm max-w-none">
            <h3 className="text-lg font-semibold mb-4">Product Description</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">{product.description}</p>
            <h4 className="text-base font-semibold mb-3">Key Features:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Premium cotton blend fabric for all-day comfort</li>
              <li>• Slim fit design that flatters your physique</li>
              <li>• Breathable material perfect for any season</li>
              <li>• Easy care - machine washable</li>
              <li>• Versatile style suitable for casual and smart-casual occasions</li>
              <li>• Durable construction with reinforced stitching</li>
            </ul>
          </div>
        </TabsContent>

        {/* Specifications Tab */}
        <TabsContent value="specifications" className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Product Specifications</h3>
          {product.specifications.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/3">Specification</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {product.specifications.map((spec, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{spec.label}</TableCell>
                    <TableCell className="text-muted-foreground">{spec.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-sm text-muted-foreground">No specifications available.</p>
          )}
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Rating Summary */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Reviews</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-5xl font-bold mb-2">{product.rating}</div>
                    <div className="flex justify-center mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "w-5 h-5",
                            i < Math.floor(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300",
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Based on {product.reviewCount.toLocaleString()} reviews
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    {product.ratingDistribution.map((dist) => (
                      <div key={dist.stars} className="flex items-center gap-3">
                        <span className="text-sm w-8">{dist.stars} ★</span>
                        <Progress value={dist.percentage} className="flex-1 h-2" />
                        <span className="text-sm text-muted-foreground w-10 text-right">
                          {dist.percentage}%
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Reviews List */}
            <div className="lg:col-span-2 space-y-4">
              {product.reviews.length > 0 ? (
                product.reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="pt-6">
                      <div className="flex gap-4">
                        <Avatar>
                          <AvatarImage src={review.avatar} />
                          <AvatarFallback>{review.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="font-semibold">{review.name}</p>
                              <p className="text-xs text-muted-foreground">{review.date}</p>
                            </div>
                            <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-xs">
                              <span className="font-semibold">{review.rating}</span>
                              <Star className="w-3 h-3 fill-white" />
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{review.comment}</p>
                          <Button variant="ghost" size="sm" className="h-auto p-0 text-xs">
                            <ThumbsUp className="w-3 h-3 mr-1" />
                            Helpful ({review.helpful})
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No reviews yet. Be the first to review!
                </p>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Q&A Tab */}
        <TabsContent value="qna" className="mt-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Questions & Answers</h3>
              <Button variant="outline">Ask a Question</Button>
            </div>

            <div className="space-y-4">
              {product.qna.length > 0 ? (
                product.qna.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="pt-6 space-y-3">
                      <div>
                        <div className="flex items-start gap-2 mb-2">
                          <span className="font-semibold text-indigo-600 text-sm">Q:</span>
                          <p className="font-medium text-sm">{item.question}</p>
                        </div>
                        <p className="text-xs text-muted-foreground ml-5">
                          Asked by {item.askedBy}
                        </p>
                      </div>
                      <div className="ml-5 pl-4 border-l-2 border-indigo-200">
                        <div className="flex items-start gap-2 mb-2">
                          <span className="font-semibold text-green-600 text-sm">A:</span>
                          <p className="text-sm text-muted-foreground">{item.answer}</p>
                        </div>
                        <p className="text-xs text-muted-foreground ml-5">
                          Answered on {item.answeredDate}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No questions yet.</p>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
